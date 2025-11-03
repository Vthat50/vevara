import { NextRequest, NextResponse } from 'next/server';
import type { SalesforceStatusUpdate } from '@/types/salesforce';

/**
 * POST /api/salesforce/referrals/status
 *
 * Sends status updates back to Salesforce Health Cloud
 * Called when:
 * - Benefits investigation is complete
 * - PA is submitted/approved/denied
 * - Patient enrollment status changes
 * - Referral is marked complete
 */
export async function POST(request: NextRequest) {
  try {
    const statusUpdate: SalesforceStatusUpdate = await request.json();

    console.log('[Salesforce Status Sync] Sending update to Salesforce:', {
      serviceRequestId: statusUpdate.serviceRequestId,
      vevaraStatus: statusUpdate.vevaraStatus,
      paStatus: statusUpdate.paStatus,
    });

    // Get Salesforce credentials
    const salesforceConfig = await getSalesforceConfig();

    if (!salesforceConfig.enabled || !salesforceConfig.accessToken) {
      console.warn('[Salesforce Status Sync] Salesforce integration not configured');
      return NextResponse.json(
        { error: 'Salesforce integration not configured' },
        { status: 400 }
      );
    }

    // Map Vevara status to Salesforce ServiceRequest status
    const salesforceStatus = mapVevaraStatusToSalesforce(statusUpdate.vevaraStatus);

    // Prepare update payload
    const updatePayload: Record<string, any> = {
      status: salesforceStatus,
      // Custom fields
      Vevara_Status__c: statusUpdate.vevaraStatus,
      Benefits_Investigation_Complete__c: statusUpdate.benefitsInvestigationComplete || false,
      PA_Required__c: statusUpdate.paRequired || false,
      PA_Status__c: statusUpdate.paStatus || 'not-started',
      Enrollment_Status__c: statusUpdate.enrollmentStatus || 'not-contacted',
      Last_Updated_By_Vevara__c: new Date().toISOString(),
    };

    if (statusUpdate.notes) {
      updatePayload['Notes__c'] = statusUpdate.notes;
    }

    // Call Salesforce REST API to update ServiceRequest
    const salesforceUrl = `${salesforceConfig.instanceUrl}/services/data/v60.0/sobjects/ServiceRequest/${statusUpdate.serviceRequestId}`;

    const response = await fetch(salesforceUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${salesforceConfig.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Salesforce Status Sync] Update failed:', errorText);

      // If access token expired, try to refresh
      if (response.status === 401) {
        console.log('[Salesforce Status Sync] Access token expired, attempting refresh...');
        const refreshed = await refreshSalesforceToken(salesforceConfig);

        if (refreshed) {
          // Retry the request with new token
          return POST(request);
        }
      }

      return NextResponse.json(
        {
          error: 'Failed to update Salesforce',
          details: errorText,
        },
        { status: response.status }
      );
    }

    console.log('[Salesforce Status Sync] Successfully updated Salesforce');

    return NextResponse.json({
      success: true,
      message: 'Status updated in Salesforce',
      serviceRequestId: statusUpdate.serviceRequestId,
    });

  } catch (error: any) {
    console.error('[Salesforce Status Sync] Error:', error);

    return NextResponse.json(
      {
        error: 'Failed to sync status to Salesforce',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * Map Vevara status to Salesforce ServiceRequest status
 */
function mapVevaraStatusToSalesforce(vevaraStatus: string): string {
  const statusMap: Record<string, string> = {
    'new': 'draft',
    'reviewing': 'active',
    'benefits-investigation': 'active',
    'complete': 'completed',
    'incomplete': 'on-hold',
  };

  return statusMap[vevaraStatus] || 'active';
}

/**
 * Get Salesforce configuration
 * In production, this would fetch from database or secure config store
 */
async function getSalesforceConfig() {
  return {
    instanceUrl: process.env.SALESFORCE_INSTANCE_URL || '',
    clientId: process.env.SALESFORCE_CLIENT_ID || '',
    clientSecret: process.env.SALESFORCE_CLIENT_SECRET || '',
    accessToken: process.env.SALESFORCE_ACCESS_TOKEN || '',
    refreshToken: process.env.SALESFORCE_REFRESH_TOKEN || '',
    enabled: process.env.SALESFORCE_ENABLED === 'true',
  };
}

/**
 * Refresh Salesforce OAuth access token
 */
async function refreshSalesforceToken(config: any): Promise<boolean> {
  try {
    const tokenUrl = `${config.instanceUrl}/services/oauth2/token`;

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: config.clientId,
        client_secret: config.clientSecret,
        refresh_token: config.refreshToken,
      }),
    });

    if (!response.ok) {
      console.error('[Salesforce Auth] Token refresh failed');
      return false;
    }

    const data = await response.json();

    // TODO: Store new access token
    // In production, update database or environment configuration
    process.env.SALESFORCE_ACCESS_TOKEN = data.access_token;

    console.log('[Salesforce Auth] Token refreshed successfully');
    return true;

  } catch (error) {
    console.error('[Salesforce Auth] Token refresh error:', error);
    return false;
  }
}

/**
 * GET /api/salesforce/referrals/status
 *
 * Get current Salesforce sync status
 */
export async function GET() {
  const config = await getSalesforceConfig();

  return NextResponse.json({
    enabled: config.enabled,
    configured: !!(config.instanceUrl && config.clientId && config.accessToken),
    instanceUrl: config.instanceUrl,
  });
}
