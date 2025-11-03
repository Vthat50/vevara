# Salesforce Health Cloud Integration Guide

## Overview

This guide explains how to integrate Vevara with Salesforce Health Cloud to automatically receive patient referrals and sync status updates.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│ Salesforce Health Cloud                                         │
│  • START Form arrives (fax/email/portal)                       │
│  • Stored as ContentVersion (PDF)                              │
│  • Linked to ClinicalServiceRequest                            │
│  • Patient Demographics (FHIR)                                  │
│  • Coverage (Insurance)                                         │
│  • Practitioner (Prescriber)                                    │
│  • MedicationRequest                                            │
└────────────────┬────────────────────────────────────────────────┘
                 │ Platform Event / Webhook
                 │ (includes ContentVersion ID)
                 ↓
┌─────────────────────────────────────────────────────────────────┐
│ Vevara Webhook Endpoint                                         │
│  POST /api/salesforce/referrals/webhook                        │
│   • Validates signature                                         │
│   • Downloads START form PDF from Salesforce                   │
│   • Transforms FHIR → START form                               │
│   • Saves PDF to local storage                                 │
│   • Creates referral in system                                  │
└────────────────┬────────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────────┐
│ Vevara Referrals & Intake Tab                                  │
│   • Shows new referral with PDF                                │
│   • Click to view full START form PDF                          │
│   • Triggers benefits investigation                             │
│   • Processes enrollment workflow                               │
└────────────────┬────────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────────┐
│ Bi-directional Status Sync                                      │
│  POST /api/salesforce/referrals/status                         │
│   • Benefits investigation complete → Salesforce                │
│   • PA submitted/approved → Salesforce                          │
│   • Patient enrolled → Salesforce                               │
└─────────────────────────────────────────────────────────────────┘
```

## Setup Instructions

### 1. Environment Variables

Add these to your `.env.local` file:

```bash
# Salesforce OAuth Configuration
SALESFORCE_INSTANCE_URL=https://yourorg.my.salesforce.com
SALESFORCE_CLIENT_ID=your_connected_app_client_id
SALESFORCE_CLIENT_SECRET=your_connected_app_client_secret

# OAuth Tokens (obtain via OAuth flow)
SALESFORCE_ACCESS_TOKEN=your_oauth_access_token
SALESFORCE_REFRESH_TOKEN=your_oauth_refresh_token

# Webhook Security
SALESFORCE_WEBHOOK_SECRET=your_webhook_signing_secret_min_32_chars

# Enable/Disable Integration
SALESFORCE_ENABLED=true
```

### 2. Salesforce Connected App Setup

1. In Salesforce Setup, navigate to **App Manager**
2. Click **New Connected App**
3. Fill in basic information:
   - Connected App Name: `Vevara Patient Hub Integration`
   - API Name: `Vevara_Patient_Hub`
   - Contact Email: your-email@example.com

4. Enable OAuth Settings:
   - Callback URL: `https://your-vevara-domain.com/api/auth/salesforce/callback`
   - Selected OAuth Scopes:
     - `api` - Access the Salesforce API
     - `refresh_token` - Refresh access token
     - `full` - Full access (for development only)

5. Click **Save** and note down:
   - Consumer Key (use as `SALESFORCE_CLIENT_ID`)
   - Consumer Secret (use as `SALESFORCE_CLIENT_SECRET`)

### 3. Create Platform Event in Salesforce

Create a Platform Event to publish referral data:

1. In Setup, go to **Platform Events**
2. Click **New Platform Event**
3. Platform Event Label: `Patient Referral Event`
4. Plural Label: `Patient Referral Events`
5. Object Name: `Patient_Referral_Event__e`

Add custom fields:

| Field Label | API Name | Data Type | Description |
|-------------|----------|-----------|-------------|
| Service Request ID | ServiceRequest_Id__c | Text(18) | Salesforce ServiceRequest ID |
| Patient ID | Patient_Id__c | Text(18) | Salesforce Patient ID |
| Coverage ID | Coverage_Id__c | Text(18) | Salesforce Coverage ID |
| Practitioner ID | Practitioner_Id__c | Text(18) | Salesforce Practitioner ID |
| Medication Request ID | MedicationRequest_Id__c | Text(18) | Salesforce MedicationRequest ID |
| Priority | Priority__c | Picklist | High, Medium, Low |
| Referral Source | Referral_Source__c | Text(50) | Fax, Portal, EHR, Email |
| Pages Received | Pages_Received__c | Number | Number of pages in referral |
| External Referral ID | External_Referral_Id__c | Text(50) | External tracking ID |
| Content Document ID | ContentDocument_Id__c | Text(18) | ID of START form PDF (ContentDocument) |
| Content Version ID | ContentVersion_Id__c | Text(18) | ID of START form PDF version (ContentVersion) |
| Document Title | Document_Title__c | Text(255) | Filename of START form PDF |
| Document Pages | Document_Pages__c | Number | Number of pages in PDF |
| Payload JSON | Payload_JSON__c | Long Text Area | Full FHIR payload as JSON |

## How START Form PDFs Work

### Salesforce Side: Storing START Forms

When a START form arrives in Salesforce (via fax, email, or portal upload):

1. **Store as ContentVersion**
   - The PDF is stored in Salesforce Files (ContentVersion object)
   - Each file has a ContentDocumentId and ContentVersionId
   - ContentVersion supports versioning (multiple versions of same document)

2. **Link to ClinicalServiceRequest**
   - Use ContentDocumentLink to attach the PDF to the referral record
   - Example: A faxed START form PDF is uploaded and linked to the ServiceRequest

3. **Include in Platform Event**
   - When publishing the Platform Event, include the ContentVersion ID
   - Vevara uses this ID to download the actual PDF file

### Vevara Side: Downloading PDFs

When Vevara receives a referral webhook:

1. **Extract ContentVersion ID** from webhook payload
2. **Call Salesforce REST API**:
   ```
   GET /services/data/v60.0/sobjects/ContentVersion/{id}/VersionData
   Authorization: Bearer {access_token}
   ```
3. **Download binary PDF content**
4. **Save to local storage**: `/public/start-forms/{filename}.pdf`
5. **Display in Referrals tab**: Users can click "View START Form" to see the PDF

### Benefits of This Approach

✅ **Single Source of Truth** - PDF stored in Salesforce, not duplicated
✅ **Version Control** - Salesforce tracks all versions automatically
✅ **On-Demand Download** - Vevara only downloads when needed
✅ **Security** - PDF access controlled by Salesforce OAuth tokens
✅ **Audit Trail** - All file access logged in Salesforce

### 4. Create Apex Trigger to Publish Events

Create an Apex trigger on `ClinicalServiceRequest` to publish events when new referrals are created:

```apex
trigger PublishReferralEvent on ClinicalServiceRequest (after insert, after update) {
    List<Patient_Referral_Event__e> events = new List<Patient_Referral_Event__e>();

    for (ClinicalServiceRequest sr : Trigger.new) {
        // Only publish for new referrals
        if (Trigger.isInsert ||
            (Trigger.isUpdate && sr.Status != Trigger.oldMap.get(sr.Id).Status)) {

            // Get related records
            ClinicalServiceRequest fullSR = [
                SELECT Id, Status, Priority, Code, Subject, Requester,
                       AuthoredOn, ReasonCode,
                       Subject.Name, Subject.BirthDate, Subject.Phone,
                       Subject.Email, Subject.MailingAddress,
                       Coverage__r.Payor, Coverage__r.SubscriberId,
                       Practitioner__r.Name, Practitioner__r.NPI__c,
                       MedicationRequest__r.Medication,
                       MedicationRequest__r.Dosage,
                       MedicationRequest__r.ReasonCode
                FROM ClinicalServiceRequest
                WHERE Id = :sr.Id
                LIMIT 1
            ];

            // Get attached START form PDF (if any)
            String contentVersionId = null;
            String contentDocumentId = null;
            String documentTitle = null;
            Integer documentPages = 0;

            List<ContentDocumentLink> links = [
                SELECT ContentDocumentId
                FROM ContentDocumentLink
                WHERE LinkedEntityId = :sr.Id
                AND ContentDocument.FileType = 'PDF'
                ORDER BY ContentDocument.CreatedDate DESC
                LIMIT 1
            ];

            if (!links.isEmpty()) {
                contentDocumentId = links[0].ContentDocumentId;

                List<ContentVersion> versions = [
                    SELECT Id, Title, PageCount
                    FROM ContentVersion
                    WHERE ContentDocumentId = :contentDocumentId
                    AND IsLatest = true
                    LIMIT 1
                ];

                if (!versions.isEmpty()) {
                    contentVersionId = versions[0].Id;
                    documentTitle = versions[0].Title;
                    documentPages = versions[0].PageCount != null ? Integer.valueOf(versions[0].PageCount) : 0;
                }
            }

            // Build FHIR-like payload
            Map<String, Object> payload = new Map<String, Object>{
                'ServiceRequest__c' => buildServiceRequest(fullSR),
                'Patient__c' => buildPatient(fullSR.Subject),
                'Coverage__c' => buildCoverage(fullSR.Coverage__r),
                'Practitioner__c' => buildPractitioner(fullSR.Practitioner__r),
                'MedicationRequest__c' => buildMedicationRequest(fullSR.MedicationRequest__r),
                'Priority__c' => fullSR.Priority,
                'Referral_Source__c' => 'Fax: (555) 123-4567', // Replace with actual source
                'External_Referral_Id__c' => fullSR.Id,
                'ContentDocument_Id__c' => contentDocumentId,
                'ContentVersion_Id__c' => contentVersionId,
                'Document_Title__c' => documentTitle,
                'Document_Pages__c' => documentPages
            };

            Patient_Referral_Event__e event = new Patient_Referral_Event__e(
                ServiceRequest_Id__c = sr.Id,
                Patient_Id__c = fullSR.Subject.Id,
                ContentDocument_Id__c = contentDocumentId,
                ContentVersion_Id__c = contentVersionId,
                Document_Title__c = documentTitle,
                Document_Pages__c = documentPages,
                Payload_JSON__c = JSON.serialize(payload)
            );

            events.add(event);
        }
    }

    if (!events.isEmpty()) {
        EventBus.publish(events);
    }
}
```

### 5. Subscribe to Platform Events (Option A: Flow)

Create a Platform Event-Triggered Flow:

1. In Setup, go to **Flows**
2. Create New Flow → Platform Event-Triggered Flow
3. Select `Patient_Referral_Event__e`
4. Add action: **Send Platform Event to External System**
   - Endpoint URL: `https://your-vevara-domain.com/api/salesforce/referrals/webhook`
   - Method: POST
   - Body: Map fields from event

### 6. Subscribe to Platform Events (Option B: Streaming API)

Use Salesforce Streaming API client (CometD) to subscribe:

```javascript
// Example: Subscribe to Platform Events via Streaming API
const jsforce = require('jsforce');

const conn = new jsforce.Connection({
  instanceUrl: process.env.SALESFORCE_INSTANCE_URL,
  accessToken: process.env.SALESFORCE_ACCESS_TOKEN
});

conn.streaming.topic('/event/Patient_Referral_Event__e').subscribe((message) => {
  console.log('Received referral event:', message);

  // Forward to Vevara webhook
  fetch('https://your-vevara-domain.com/api/salesforce/referrals/webhook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  });
});
```

### 7. Configure Webhook Signature Validation

Generate a secure webhook secret (32+ characters):

```bash
openssl rand -base64 32
```

Add to `.env.local`:
```
SALESFORCE_WEBHOOK_SECRET=your_generated_secret_here
```

In Salesforce, configure the outbound webhook to sign requests using HMAC-SHA256.

## Data Mapping

### FHIR Patient → Vevara START Form

| Salesforce FHIR Field | Vevara Field | Notes |
|----------------------|--------------|-------|
| `Patient.name[0].text` | `patientName` | Full name |
| `Patient.birthDate` | `patientInfo.dob` | Format: MM/DD/YYYY |
| `Patient.telecom[phone]` | `patientInfo.phone` | Primary phone |
| `Patient.telecom[email]` | `patientInfo.email` | Primary email |
| `Patient.address[0].text` | `patientInfo.address` | Full address |
| `Coverage.payor[0].display` | `insurance.carrier` | Insurance name |
| `Coverage.subscriberId` | `insurance.policyNumber` | Policy number |
| `Coverage.class[group].value` | `insurance.groupNumber` | Group number |
| `MedicationRequest.medicationCodeableConcept.text` | `medication.name` | Medication name |
| `MedicationRequest.dosageInstruction[0].text` | `medication.dosage` | Dosage instructions |
| `MedicationRequest.reasonCode[0].coding[0]` | `medication.diagnosisCode` | ICD-10 code |
| `Practitioner.name[0].text` | `prescriber.name` | Prescriber name |
| `Practitioner.identifier[NPI]` | `prescriber.npi` | NPI number |
| `Practitioner.telecom[phone]` | `prescriber.phone` | Prescriber phone |

### Vevara Status → Salesforce Status

| Vevara Status | Salesforce Status | Description |
|--------------|------------------|-------------|
| `new` | `draft` | New referral received |
| `reviewing` | `active` | Under review |
| `benefits-investigation` | `active` | Checking benefits |
| `complete` | `completed` | Fully processed |
| `incomplete` | `on-hold` | Missing information |

## Testing the Integration

### 1. Test Webhook Endpoint

```bash
# Check if webhook is active
curl https://your-vevara-domain.com/api/salesforce/referrals/webhook

# Expected response:
{
  "status": "active",
  "message": "Salesforce referral webhook endpoint is active",
  "webhookUrl": "/api/salesforce/referrals/webhook",
  "acceptedMethods": ["POST"]
}
```

### 2. Test with Sample Payload

```bash
curl -X POST https://your-vevara-domain.com/api/salesforce/referrals/webhook \
  -H "Content-Type: application/json" \
  -d @sample-referral.json
```

Sample payload in `sample-referral.json`:

```json
{
  "event": {
    "replayId": 1,
    "createdDate": "2025-01-15T10:30:00Z"
  },
  "payload": {
    "ServiceRequest__c": {
      "resourceType": "ServiceRequest",
      "id": "SR001",
      "status": "active",
      "intent": "order",
      "priority": "routine"
    },
    "Patient__c": {
      "resourceType": "Patient",
      "id": "PAT001",
      "name": [{ "text": "John Doe", "given": ["John"], "family": "Doe" }],
      "birthDate": "1985-05-12",
      "telecom": [
        { "system": "phone", "value": "+15551234567" },
        { "system": "email", "value": "john.doe@example.com" }
      ],
      "address": [{ "text": "123 Main St, San Francisco, CA 94102" }]
    },
    "Coverage__c": {
      "resourceType": "Coverage",
      "id": "COV001",
      "status": "active",
      "payor": [{ "display": "Blue Cross Blue Shield" }],
      "subscriberId": "ABC123456"
    },
    "Priority__c": "High",
    "Referral_Source__c": "Fax: (555) 123-4567",
    "External_Referral_Id__c": "TEST-001",
    "ContentVersion_Id__c": "068xx000000ABCDabc",
    "ContentDocument_Id__c": "069xx000000XYZabc",
    "Document_Title__c": "START_Form_John_Doe.pdf",
    "Document_Pages__c": 4
  }
}
```

### 3. Verify in Vevara Dashboard

1. Log into Vevara dashboard
2. Navigate to **Referrals & Intake** tab
3. Look for new referral with patient name "John Doe"
4. Status should be "NEW"
5. All patient info should be populated

## Troubleshooting

### Webhook Not Receiving Data

1. Check Salesforce Setup:
   - Verify Platform Event is published
   - Check Flow or Streaming API subscription is active
   - Review Salesforce Debug Logs

2. Check Vevara Logs:
   ```bash
   # View Next.js server logs
   npm run dev
   ```

   Look for: `[Salesforce Webhook] Received referral webhook`

3. Verify webhook URL is accessible:
   - Must be publicly accessible (not localhost)
   - Use ngrok for local testing: `ngrok http 3000`

### Signature Validation Failing

1. Ensure `SALESFORCE_WEBHOOK_SECRET` matches Salesforce configuration
2. Check signature header name: `x-salesforce-signature`
3. Verify HMAC-SHA256 algorithm is used

### Data Mapping Issues

1. Check Salesforce field names match expected FHIR structure
2. Verify FHIR resource types are correct
3. Review transformation logs: `[Salesforce Webhook] Transformed START form`

### Access Token Expired

The integration automatically attempts to refresh tokens. If failing:

1. Verify `SALESFORCE_REFRESH_TOKEN` is set
2. Check Connected App permissions
3. Manually refresh token:
   ```bash
   curl -X POST https://yourorg.my.salesforce.com/services/oauth2/token \
     -d "grant_type=refresh_token" \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "refresh_token=YOUR_REFRESH_TOKEN"
   ```

### PDF Download Failing

If START form PDFs are not downloading:

1. **Check ContentVersion ID**: Verify the `ContentVersion_Id__c` field is included in webhook payload
2. **Verify File Permissions**: Ensure OAuth token has access to ContentVersion object:
   - Go to Salesforce Setup → Connected Apps → Your App
   - Check "Perform requests on your behalf at any time" permission
3. **Check Storage**: Ensure `/public/start-forms/` directory exists and is writable
4. **Review Logs**: Look for `[Salesforce Client] Downloading START form PDF` in server logs
5. **Test Download Manually**:
   ```bash
   curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     https://yourorg.my.salesforce.com/services/data/v60.0/sobjects/ContentVersion/YOUR_CV_ID/VersionData \
     --output test.pdf
   ```

### PDF Not Linked to ServiceRequest

If ContentVersion exists but isn't being sent:

1. **Verify ContentDocumentLink**: Ensure the PDF is linked to the ClinicalServiceRequest record
2. **Check Apex Trigger**: Make sure the trigger queries ContentDocumentLink and includes ContentVersion ID in event
3. **File Type Filter**: The trigger filters for `FileType = 'PDF'` - verify the file extension is correct

## Security Best Practices

1. **Use HTTPS**: Always use HTTPS for webhook endpoints
2. **Validate Signatures**: Never disable signature validation in production
3. **Rotate Secrets**: Regularly rotate webhook secrets and OAuth tokens
4. **Principle of Least Privilege**: Grant only necessary Salesforce permissions
5. **Monitor Logs**: Set up alerting for failed webhook deliveries
6. **Rate Limiting**: Implement rate limiting on webhook endpoints
7. **IP Allowlisting**: Restrict webhook endpoint to Salesforce IP ranges

## Support

For questions or issues with Salesforce integration:
- Check server logs: Look for `[Salesforce Webhook]` entries
- Review Salesforce Debug Logs in Setup → Debug Logs
- Test webhook endpoint: GET /api/salesforce/referrals/webhook

## Related Documentation

- [Salesforce Health Cloud Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.health_cloud.meta/health_cloud/)
- [Salesforce Platform Events](https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/)
- [FHIR R4 Specification](https://hl7.org/fhir/R4/)
