// Data transformation utilities: Salesforce FHIR → Vevara START Form

import type {
  SalesforceReferralWebhook,
  SalesforceFHIRPatient,
  SalesforceFHIRCoverage,
  SalesforceFHIRPractitioner,
  SalesforceFHIRMedicationRequest,
  VevaraStartForm,
} from '@/types/salesforce';

/**
 * Transform Salesforce FHIR Patient to Vevara patient info
 */
export function transformPatient(patient: SalesforceFHIRPatient): VevaraStartForm['patientInfo'] {
  const primaryName = patient.name[0];
  const patientName = primaryName?.text ||
    `${primaryName?.given?.join(' ') || ''} ${primaryName?.family || ''}`.trim();

  // Extract phone
  const phoneContact = patient.telecom?.find(t => t.system === 'phone');
  const phone = phoneContact?.value || '';

  // Extract email
  const emailContact = patient.telecom?.find(t => t.system === 'email');
  const email = emailContact?.value || '';

  // Extract address
  const primaryAddress = patient.address?.[0];
  const address = primaryAddress?.text ||
    `${primaryAddress?.line?.join(', ') || ''}, ${primaryAddress?.city || ''}, ${primaryAddress?.state || ''} ${primaryAddress?.postalCode || ''}`.trim();

  // Format birth date from YYYY-MM-DD to MM/DD/YYYY
  const dob = patient.birthDate
    ? formatDateFromISO(patient.birthDate)
    : '';

  return {
    dob,
    phone,
    email,
    address,
  };
}

/**
 * Transform Salesforce FHIR Coverage to Vevara insurance info
 */
export function transformCoverage(coverage: SalesforceFHIRCoverage | undefined): VevaraStartForm['insurance'] {
  if (!coverage) return undefined;

  const carrier = coverage.payor?.[0]?.display || 'Unknown Carrier';
  const policyNumber = coverage.subscriberId || '';

  // Extract group number from class array
  const groupClass = coverage.class?.find(c =>
    c.type.coding.some(code => code.code === 'group')
  );
  const groupNumber = groupClass?.value || '';

  return {
    carrier,
    policyNumber,
    groupNumber,
    verified: false, // Will be verified during benefits investigation
    eligibilityStatus: coverage.status === 'active' ? 'active' : 'inactive',
  };
}

/**
 * Transform Salesforce FHIR Practitioner to Vevara prescriber info
 */
export function transformPractitioner(practitioner: SalesforceFHIRPractitioner | undefined): VevaraStartForm['prescriber'] {
  if (!practitioner) return undefined;

  const name = practitioner.name[0]?.text ||
    `${practitioner.name[0]?.prefix?.join(' ') || ''} ${practitioner.name[0]?.given?.join(' ') || ''} ${practitioner.name[0]?.family || ''}`.trim();

  // Extract NPI
  const npiIdentifier = practitioner.identifier?.find(id =>
    id.system?.includes('npi') || id.system?.includes('NPI')
  );
  const npi = npiIdentifier?.value || '';

  // Extract phone
  const phoneContact = practitioner.telecom?.find(t => t.system === 'phone');
  const phone = phoneContact?.value || '';

  return {
    name,
    npi,
    phone,
  };
}

/**
 * Transform Salesforce FHIR MedicationRequest to Vevara medication info
 */
export function transformMedication(medicationRequest: SalesforceFHIRMedicationRequest | undefined): VevaraStartForm['medication'] {
  if (!medicationRequest) return undefined;

  const name = medicationRequest.medicationCodeableConcept?.text ||
    medicationRequest.medicationCodeableConcept?.coding?.[0]?.display ||
    'Unknown Medication';

  const dosage = medicationRequest.dosageInstruction?.[0]?.text || '';

  // Extract diagnosis code
  const diagnosisCodeObj = medicationRequest.reasonCode?.[0]?.coding?.[0];
  const diagnosisCode = diagnosisCodeObj
    ? `${diagnosisCodeObj.code} (${diagnosisCodeObj.display})`
    : medicationRequest.reasonCode?.[0]?.text || '';

  return {
    name,
    dosage,
    diagnosisCode,
  };
}

/**
 * Map Salesforce priority to Vevara priority
 */
export function transformPriority(salesforcePriority?: string): VevaraStartForm['priority'] {
  if (!salesforcePriority) return 'medium';

  const priority = salesforcePriority.toLowerCase();
  if (priority === 'high' || priority === 'urgent' || priority === 'stat' || priority === 'asap') {
    return 'high';
  }
  if (priority === 'low' || priority === 'routine') {
    return 'low';
  }
  return 'medium';
}

/**
 * Format ISO date (YYYY-MM-DD) to MM/DD/YYYY
 */
function formatDateFromISO(isoDate: string): string {
  try {
    const [year, month, day] = isoDate.split('-');
    return `${month}/${day}/${year}`;
  } catch {
    return isoDate;
  }
}

/**
 * Format current timestamp for display
 */
function formatTimestamp(): string {
  const now = new Date();
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = now.toDateString() === today.toDateString();
  const isYesterday = now.toDateString() === yesterday.toDateString();

  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  if (isToday) {
    return `Today ${time}`;
  } else if (isYesterday) {
    return `Yesterday ${time}`;
  } else {
    return now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
}

/**
 * Main transformation function: Salesforce webhook → Vevara START form
 * @param pdfPath - Optional path to downloaded PDF file
 */
export function transformSalesforceToStartForm(
  webhook: SalesforceReferralWebhook,
  pdfPath?: string
): VevaraStartForm {
  const { payload } = webhook;
  const serviceRequest = payload.ServiceRequest__c;
  const patient = payload.Patient__c;
  const coverage = payload.Coverage__c;
  const practitioner = payload.Practitioner__c;
  const medicationRequest = payload.MedicationRequest__c;

  // Extract patient name
  const primaryName = patient.name[0];
  const patientName = primaryName?.text ||
    `${primaryName?.given?.join(' ') || ''} ${primaryName?.family || ''}`.trim();

  // Determine source - use the actual source from Salesforce
  const source = payload.Referral_Source__c || 'Salesforce Health Cloud';

  // Generate unique ID
  const id = payload.External_Referral_Id__c || `SF-${serviceRequest.id}`;

  // Get pages received (prefer document pages if available, fallback to payload)
  const pagesReceived = payload.Document_Pages__c || payload.Pages_Received__c || 0;

  return {
    id,
    patientName,
    dateReceived: formatTimestamp(),
    status: 'new', // All new referrals start as 'new'
    pagesReceived,
    source,
    priority: transformPriority(payload.Priority__c || serviceRequest.priority),
    salesforceId: serviceRequest.id,
    patientInfo: transformPatient(patient),
    insurance: transformCoverage(coverage),
    prescriber: transformPractitioner(practitioner),
    medication: transformMedication(medicationRequest),
    pdfPath, // Path to the downloaded START form PDF
    nextAction: 'Review and verify completeness',
  };
}

/**
 * Validate required fields in START form
 */
export function validateStartForm(form: VevaraStartForm): { valid: boolean; missingInfo: string[] } {
  const missingInfo: string[] = [];

  if (!form.patientInfo?.dob) {
    missingInfo.push('Patient date of birth');
  }
  if (!form.patientInfo?.phone && !form.patientInfo?.email) {
    missingInfo.push('Patient contact information (phone or email)');
  }
  if (!form.patientInfo?.address) {
    missingInfo.push('Patient address');
  }
  if (!form.insurance?.carrier) {
    missingInfo.push('Insurance carrier');
  }
  if (!form.insurance?.policyNumber) {
    missingInfo.push('Insurance policy number');
  }
  if (!form.medication?.name) {
    missingInfo.push('Medication name');
  }
  if (!form.medication?.diagnosisCode) {
    missingInfo.push('Diagnosis code');
  }
  if (!form.prescriber?.name) {
    missingInfo.push('Prescriber name');
  }
  if (!form.prescriber?.npi) {
    missingInfo.push('Prescriber NPI');
  }

  return {
    valid: missingInfo.length === 0,
    missingInfo,
  };
}
