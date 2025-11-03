// Salesforce Health Cloud FHIR R4 Types for Referral Integration

export interface SalesforceFHIRPatient {
  resourceType: 'Patient';
  id: string;
  identifier?: Array<{
    system?: string;
    value: string;
  }>;
  name: Array<{
    use?: 'official' | 'usual';
    family?: string;
    given?: string[];
    text?: string;
  }>;
  telecom?: Array<{
    system: 'phone' | 'email';
    value: string;
    use?: 'home' | 'work' | 'mobile';
  }>;
  gender?: 'male' | 'female' | 'other' | 'unknown';
  birthDate?: string; // YYYY-MM-DD format
  address?: Array<{
    use?: 'home' | 'work';
    line?: string[];
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    text?: string;
  }>;
}

export interface SalesforceFHIRCoverage {
  resourceType: 'Coverage';
  id: string;
  status: 'active' | 'cancelled' | 'draft' | 'entered-in-error';
  beneficiary: {
    reference: string; // Reference to Patient
  };
  payor: Array<{
    display?: string; // Insurance carrier name
  }>;
  subscriberId?: string; // Policy number
  class?: Array<{
    type: {
      coding: Array<{
        code: string; // group, plan, etc.
      }>;
    };
    value: string; // Group number, etc.
  }>;
}

export interface SalesforceFHIRPractitioner {
  resourceType: 'Practitioner';
  id: string;
  identifier?: Array<{
    system?: string; // e.g., "http://hl7.org/fhir/sid/us-npi"
    value: string; // NPI number
  }>;
  name: Array<{
    text?: string;
    family?: string;
    given?: string[];
    prefix?: string[]; // Dr., etc.
  }>;
  telecom?: Array<{
    system: 'phone' | 'email' | 'fax';
    value: string;
  }>;
}

export interface SalesforceFHIRMedicationRequest {
  resourceType: 'MedicationRequest';
  id: string;
  status: 'active' | 'on-hold' | 'cancelled' | 'completed';
  intent: 'proposal' | 'plan' | 'order';
  medicationCodeableConcept?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string; // Medication name
    }>;
    text?: string;
  };
  subject: {
    reference: string; // Reference to Patient
  };
  dosageInstruction?: Array<{
    text?: string; // e.g., "300mg every 2 weeks"
    timing?: any;
  }>;
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string; // Diagnosis code
      display?: string; // Diagnosis name
    }>;
    text?: string;
  }>;
}

export interface SalesforceFHIRServiceRequest {
  resourceType: 'ServiceRequest';
  id: string;
  status: 'draft' | 'active' | 'on-hold' | 'revoked' | 'completed' | 'entered-in-error';
  intent: 'proposal' | 'plan' | 'directive' | 'order' | 'original-order';
  priority?: 'routine' | 'urgent' | 'asap' | 'stat';
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string; // Service description
  };
  subject: {
    reference: string; // Reference to Patient
  };
  requester?: {
    reference: string; // Reference to Practitioner
  };
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  supportingInfo?: Array<{
    reference: string; // References to Coverage, MedicationRequest, etc.
  }>;
  note?: Array<{
    text: string;
  }>;
  authoredOn?: string; // ISO 8601 timestamp
}

// Salesforce ContentVersion (File/Document)
export interface SalesforceContentVersion {
  Id: string;
  ContentDocumentId: string;
  Title: string;
  FileExtension: string;
  ContentSize: number;
  VersionData?: string; // URL path to download content
  VersionNumber?: string;
  PathOnClient?: string;
  CreatedDate: string;
}

// Salesforce Webhook Payload (Platform Event)
export interface SalesforceReferralWebhook {
  event: {
    replayId: number;
    createdDate: string;
  };
  payload: {
    ServiceRequest__c: SalesforceFHIRServiceRequest;
    Patient__c: SalesforceFHIRPatient;
    Coverage__c?: SalesforceFHIRCoverage;
    Practitioner__c?: SalesforceFHIRPractitioner;
    MedicationRequest__c?: SalesforceFHIRMedicationRequest;
    // START Form Document Information
    ContentDocument_Id__c?: string; // ContentDocument ID for the START form PDF
    ContentVersion_Id__c?: string; // ContentVersion ID (version of the document)
    Document_Title__c?: string; // e.g., "START Form - John Doe.pdf"
    Document_Pages__c?: number; // Number of pages in PDF
    // Custom Salesforce fields
    Referral_Source__c?: string; // 'Fax: (555) 123-4567', 'Portal', 'EHR', etc.
    Priority__c?: 'High' | 'Medium' | 'Low';
    Pages_Received__c?: number;
    External_Referral_Id__c?: string;
  };
}

// Vevara START Form (from ReferralsIntakeTab.tsx)
export interface VevaraStartForm {
  id: string;
  patientName: string;
  dateReceived: string;
  status: 'new' | 'reviewing' | 'benefits-investigation' | 'complete' | 'incomplete';
  pagesReceived: number;
  source: string;
  priority: 'high' | 'medium' | 'low';
  salesforceId?: string; // Track Salesforce ServiceRequest ID
  patientInfo?: {
    dob: string;
    phone: string;
    email: string;
    address: string;
  };
  insurance?: {
    carrier: string;
    policyNumber: string;
    groupNumber: string;
    verified: boolean;
    eligibilityStatus?: 'active' | 'inactive';
    verifiedDate?: string;
  };
  medication?: {
    name: string;
    dosage: string;
    diagnosisCode: string;
  };
  prescriber?: {
    name: string;
    npi: string;
    phone: string;
  };
  benefitsInvestigation?: {
    eligibilityChecked: boolean;
    formularyStatus?: 'covered' | 'not-covered' | 'tier-3' | 'tier-4';
    paRequired: boolean;
    estimatedCopay?: string;
    copayEligible: boolean;
    estimatedSavings?: string;
    completedDate?: string;
  };
  missingInfo?: string[];
  nextAction?: string;
  pdfPath?: string;
}

// Status sync payload (Vevara → Salesforce)
export interface SalesforceStatusUpdate {
  serviceRequestId: string;
  status: 'draft' | 'active' | 'on-hold' | 'revoked' | 'completed' | 'entered-in-error';
  vevaraStatus: VevaraStartForm['status'];
  benefitsInvestigationComplete?: boolean;
  paRequired?: boolean;
  paStatus?: 'not-started' | 'submitted' | 'approved' | 'denied' | 'pending';
  enrollmentStatus?: 'not-contacted' | 'contacted' | 'enrolled' | 'declined';
  notes?: string;
  updatedAt: string;
}

// Salesforce connection configuration
export interface SalesforceConfig {
  instanceUrl: string; // e.g., https://yourorg.my.salesforce.com
  clientId: string;
  clientSecret: string;
  accessToken?: string;
  refreshToken?: string;
  webhookSecret?: string; // For validating incoming webhooks
  enabled: boolean;
}
