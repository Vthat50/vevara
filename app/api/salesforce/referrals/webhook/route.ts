import { NextRequest, NextResponse } from 'next/server';
import type { SalesforceReferralWebhook } from '@/types/salesforce';
import { transformSalesforceToStartForm, validateStartForm } from '@/lib/salesforce-transformer';
import { downloadStartFormPDF, downloadStartFormByDocumentId } from '@/lib/salesforce-client';
import crypto from 'crypto';

/**
 * POST /api/salesforce/referrals/webhook
 *
 * Receives new referral webhooks from Salesforce Health Cloud
 *
 * Expected payload: SalesforceReferralWebhook (Platform Event)
 * Returns: { success: boolean, referralId: string }
 */
export async function POST(request: NextRequest) {
  try {
    console.log('[Salesforce Webhook] Received referral webhook');

    // Validate webhook signature (security)
    const isValid = await validateWebhookSignature(request);
    if (!isValid) {
      console.error('[Salesforce Webhook] Invalid signature');
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    // Parse webhook payload
    const webhook: SalesforceReferralWebhook = await request.json();

    console.log('[Salesforce Webhook] Processing referral:', {
      serviceRequestId: webhook.payload.ServiceRequest__c.id,
      patientName: webhook.payload.Patient__c.name[0]?.text,
      priority: webhook.payload.Priority__c,
      hasDocument: !!(webhook.payload.ContentVersion_Id__c || webhook.payload.ContentDocument_Id__c),
    });

    // Download START form PDF if available
    let pdfPath: string | undefined;

    if (webhook.payload.ContentVersion_Id__c) {
      try {
        console.log('[Salesforce Webhook] Downloading START form PDF:', webhook.payload.ContentVersion_Id__c);
        const downloadResult = await downloadStartFormPDF(webhook.payload.ContentVersion_Id__c);
        pdfPath = downloadResult.filePath;
        console.log('[Salesforce Webhook] PDF downloaded successfully:', pdfPath);
      } catch (error: any) {
        console.error('[Salesforce Webhook] Failed to download PDF:', error.message);
        // Continue without PDF - form data is still valuable
      }
    } else if (webhook.payload.ContentDocument_Id__c) {
      try {
        console.log('[Salesforce Webhook] Downloading START form by ContentDocument ID:', webhook.payload.ContentDocument_Id__c);
        const downloadResult = await downloadStartFormByDocumentId(webhook.payload.ContentDocument_Id__c);
        pdfPath = downloadResult.filePath;
        console.log('[Salesforce Webhook] PDF downloaded successfully:', pdfPath);
      } catch (error: any) {
        console.error('[Salesforce Webhook] Failed to download PDF:', error.message);
        // Continue without PDF - form data is still valuable
      }
    } else {
      console.warn('[Salesforce Webhook] No ContentVersion or ContentDocument ID provided - no PDF to download');
    }

    // Transform FHIR data to START form format
    const startForm = transformSalesforceToStartForm(webhook, pdfPath);

    // Validate completeness
    const validation = validateStartForm(startForm);
    if (!validation.valid) {
      console.warn('[Salesforce Webhook] Incomplete referral data:', validation.missingInfo);
      startForm.status = 'incomplete';
      startForm.missingInfo = validation.missingInfo;
      startForm.nextAction = 'Request additional information from provider';
    }

    // TODO: Save to database
    // In a production app, you would:
    // 1. Save to database (Prisma, MongoDB, etc.)
    // 2. Trigger benefits investigation workflow if complete
    // 3. Send real-time notification to UI via WebSocket/SSE
    // 4. Log to audit trail

    console.log('[Salesforce Webhook] Transformed START form:', {
      id: startForm.id,
      patientName: startForm.patientName,
      status: startForm.status,
      hasInsurance: !!startForm.insurance,
      hasMedication: !!startForm.medication,
    });

    // For now, store in-memory or return for demonstration
    // You would typically emit this via WebSocket to update the UI in real-time

    return NextResponse.json({
      success: true,
      referralId: startForm.id,
      status: startForm.status,
      message: 'Referral received and processed successfully',
      data: startForm,
    });

  } catch (error: any) {
    console.error('[Salesforce Webhook] Error processing webhook:', error);

    return NextResponse.json(
      {
        error: 'Failed to process referral webhook',
        details: error.message
      },
      { status: 500 }
    );
  }
}

/**
 * Validate webhook signature to ensure request is from Salesforce
 *
 * Salesforce includes a signature in the request headers that we can verify
 * using HMAC-SHA256 with our webhook secret
 */
async function validateWebhookSignature(request: NextRequest): Promise<boolean> {
  const webhookSecret = process.env.SALESFORCE_WEBHOOK_SECRET;

  // Skip validation in development if no secret configured
  if (!webhookSecret) {
    console.warn('[Salesforce Webhook] No webhook secret configured - skipping signature validation');
    return true; // Allow in development
  }

  try {
    const signature = request.headers.get('x-salesforce-signature');
    if (!signature) {
      return false;
    }

    // Get raw body
    const body = await request.clone().text();

    // Calculate expected signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('base64');

    // Compare signatures (constant-time comparison to prevent timing attacks)
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );

  } catch (error) {
    console.error('[Salesforce Webhook] Signature validation error:', error);
    return false;
  }
}

/**
 * GET /api/salesforce/referrals/webhook
 *
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'Salesforce referral webhook endpoint is active',
    webhookUrl: '/api/salesforce/referrals/webhook',
    acceptedMethods: ['POST'],
  });
}
