'use client';

import { useState, useEffect } from 'react';
import { Cloud, CheckCircle, XCircle, AlertCircle, Copy, RefreshCw } from 'lucide-react';

interface SalesforceConfig {
  enabled: boolean;
  configured: boolean;
  instanceUrl: string;
}

export default function SalesforceIntegrationSettings() {
  const [config, setConfig] = useState<SalesforceConfig>({
    enabled: false,
    configured: false,
    instanceUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [webhookUrlCopied, setWebhookUrlCopied] = useState(false);

  // Webhook URL that Salesforce should call
  const webhookUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/api/salesforce/referrals/webhook`
    : '';

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/salesforce/referrals/status');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Failed to fetch Salesforce config:', error);
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    setTesting(true);
    try {
      const response = await fetch('/api/salesforce/referrals/webhook');
      if (response.ok) {
        alert('Webhook endpoint is active and ready to receive referrals!');
      } else {
        alert('Webhook endpoint test failed. Please check server logs.');
      }
    } catch (error) {
      alert('Failed to test connection: ' + (error as Error).message);
    } finally {
      setTesting(false);
    }
  };

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    setWebhookUrlCopied(true);
    setTimeout(() => setWebhookUrlCopied(false), 2000);
  };

  const getStatusBadge = () => {
    if (!config.configured) {
      return (
        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
          <AlertCircle className="w-4 h-4" />
          Not Configured
        </div>
      );
    }

    if (!config.enabled) {
      return (
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          <XCircle className="w-4 h-4" />
          Disabled
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
        <CheckCircle className="w-4 h-4" />
        Connected
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Cloud className="w-6 h-6 text-blue-600 animate-pulse" />
          <h3 className="text-lg font-semibold text-gray-900">Loading Salesforce Integration...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Cloud className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Salesforce Health Cloud Integration</h3>
          </div>
          {getStatusBadge()}
        </div>

        {config.instanceUrl && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Connected Instance</div>
            <div className="font-mono text-sm text-gray-900">{config.instanceUrl}</div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Webhook URL for Salesforce</h4>
            <p className="text-sm text-gray-600 mb-2">
              Configure this URL in your Salesforce Platform Event subscription to receive referrals automatically.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={webhookUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono bg-gray-50"
              />
              <button
                onClick={copyWebhookUrl}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                {webhookUrlCopied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={testConnection}
              disabled={testing}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
              {testing ? 'Testing...' : 'Test Connection'}
            </button>

            <button
              onClick={fetchConfig}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Refresh Status
            </button>
          </div>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Setup Instructions</h4>
        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <div className="font-medium text-gray-900 mb-1">1. Configure Environment Variables</div>
            <div className="font-mono text-xs bg-gray-50 p-3 rounded border border-gray-200 space-y-1">
              <div>SALESFORCE_INSTANCE_URL=https://yourorg.my.salesforce.com</div>
              <div>SALESFORCE_CLIENT_ID=your_connected_app_client_id</div>
              <div>SALESFORCE_CLIENT_SECRET=your_client_secret</div>
              <div>SALESFORCE_ACCESS_TOKEN=your_oauth_access_token</div>
              <div>SALESFORCE_REFRESH_TOKEN=your_refresh_token</div>
              <div>SALESFORCE_WEBHOOK_SECRET=your_webhook_signing_secret</div>
              <div>SALESFORCE_ENABLED=true</div>
            </div>
          </div>

          <div>
            <div className="font-medium text-gray-900 mb-1">2. Create Platform Event in Salesforce</div>
            <div>
              In Salesforce Setup, create a Platform Event with fields matching the FHIR ServiceRequest structure.
              Include Patient, Coverage, Practitioner, and MedicationRequest references.
            </div>
          </div>

          <div>
            <div className="font-medium text-gray-900 mb-1">3. Configure Platform Event Trigger</div>
            <div>
              Set up a trigger or Flow in Salesforce to publish a Platform Event when a new ClinicalServiceRequest
              (referral) is created. The event should include all required patient, insurance, and medication data.
            </div>
          </div>

          <div>
            <div className="font-medium text-gray-900 mb-1">4. Subscribe to Platform Event</div>
            <div>
              Use Salesforce's Streaming API or create an Outbound Message to call the webhook URL above
              when new referral events are published.
            </div>
          </div>

          <div>
            <div className="font-medium text-gray-900 mb-1">5. Test the Integration</div>
            <div>
              Create a test referral in Salesforce Health Cloud and verify it appears in the Referrals & Intake tab.
            </div>
          </div>
        </div>
      </div>

      {/* Data Flow Diagram */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Integration Flow</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold flex-shrink-0">
              1
            </div>
            <div>
              <div className="font-medium text-gray-900">Provider creates referral in Salesforce Health Cloud</div>
              <div className="text-gray-600">ClinicalServiceRequest with patient demographics, insurance, medication</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold flex-shrink-0">
              2
            </div>
            <div>
              <div className="font-medium text-gray-900">Salesforce triggers Platform Event</div>
              <div className="text-gray-600">Event payload contains FHIR-formatted referral data</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold flex-shrink-0">
              3
            </div>
            <div>
              <div className="font-medium text-gray-900">Vevara receives webhook</div>
              <div className="text-gray-600">Validates signature, transforms FHIR → START form format</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold flex-shrink-0">
              4
            </div>
            <div>
              <div className="font-medium text-gray-900">Referral appears in Referrals & Intake tab</div>
              <div className="text-gray-600">Automatically triggers benefits investigation workflow</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold flex-shrink-0">
              5
            </div>
            <div>
              <div className="font-medium text-gray-900">Status updates sync back to Salesforce</div>
              <div className="text-gray-600">Benefits investigation complete, PA status, enrollment status</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
