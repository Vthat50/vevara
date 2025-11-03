'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, Phone, Mail, CheckCircle, Shield, FileCheck, AlertCircle, DollarSign, CreditCard } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

// Mock data - in real app this would come from API/database
const startFormsData: any = {
  'SF001': {
    id: 'SF001',
    patientName: 'Michael Anderson',
    dateReceived: 'Oct 26, 2024 2:30 PM',
    status: 'complete',
    pagesReceived: 4,
    source: 'Fax: 1-855-474-3067',
    priority: 'high',
    patientInfo: {
      dob: '01/01/1976',
      phone: '5519882979',
      email: 'Michael.A@gmail.com',
      address: '525 Gough street, San Francisco, CA 94102'
    },
    insurance: {
      carrier: 'Blue Cross Blue Shield',
      policyNumber: 'f2',
      groupNumber: '1257w',
      verified: true,
      eligibilityStatus: 'active',
      verifiedDate: 'Oct 26, 2024 2:32 PM'
    },
    medication: {
      name: 'AVONEX (interferon beta-1a)',
      dosage: 'Pre-filled Syringe 1-1/4" 23 Gauge',
      diagnosisCode: 'G35 (Multiple Sclerosis)'
    },
    prescriber: {
      name: 'Dr. Michael Cheng',
      npi: '1386',
      phone: '651-998-3039'
    },
    benefitsInvestigation: {
      eligibilityChecked: true,
      formularyStatus: 'tier-3',
      paRequired: true,
      estimatedCopay: '$175/month',
      copayEligible: true,
      estimatedSavings: '$175/month',
      completedDate: 'Oct 26, 2024 2:35 PM'
    },
    pdfPath: '/start-forms/michael-anderson-avonex-page-4.pdf'
  }
}

export default function StartFormViewerPage() {
  const params = useParams()
  const router = useRouter()
  const formId = params.id as string

  const form = startFormsData[formId]

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="p-6">
            <p className="text-center text-gray-500">Form not found</p>
            <Button className="mt-4" onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{form.patientName} - START Form</h1>
            <p className="text-gray-600">Form ID: {form.id} • Received: {form.dateReceived}</p>
          </div>
        </div>

        {/* Main Content - Side by Side */}
        <div className="grid grid-cols-2 gap-6">
          {/* LEFT: PDF Document */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">START Form Document</h2>
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden" style={{ height: 'calc(100vh - 250px)' }}>
              <iframe
                src={form.pdfPath}
                className="w-full h-full"
                title="START Form PDF"
              />
            </div>
          </Card>

          {/* RIGHT: Extracted Information */}
          <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Extracted Patient Information</h2>

              {/* Patient Information */}
              {form.patientInfo && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3">Patient Demographics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">DOB:</span>
                      <span className="font-medium text-gray-900">{form.patientInfo.dob}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium text-gray-900">{form.patientInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900">{form.patientInfo.email}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-gray-600">Address:</span>
                      <div className="font-medium text-gray-900">{form.patientInfo.address}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Insurance Information */}
              {form.insurance && (
                <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h3 className="font-bold text-green-900">Insurance Verification</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Carrier:</span>
                      <span className="font-medium text-gray-900">{form.insurance.carrier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Policy #:</span>
                      <span className="font-medium text-gray-900">{form.insurance.policyNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Group #:</span>
                      <span className="font-medium text-gray-900">{form.insurance.groupNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium text-success uppercase">{form.insurance.eligibilityStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Verified:</span>
                      <span className="font-medium text-gray-900">{form.insurance.verifiedDate}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Medication Information */}
              {form.medication && (
                <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-3">Medication & Diagnosis</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Medication:</span>
                      <div className="font-medium text-gray-900">{form.medication.name}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Dosage:</span>
                      <div className="font-medium text-gray-900">{form.medication.dosage}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Diagnosis:</span>
                      <div className="font-medium text-gray-900">{form.medication.diagnosisCode}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Prescriber Information */}
              {form.prescriber && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">Prescriber Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900">{form.prescriber.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">NPI:</span>
                      <span className="font-medium text-gray-900">{form.prescriber.npi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium text-gray-900">{form.prescriber.phone}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits Investigation */}
              {form.benefitsInvestigation && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-blue-900">Benefits Investigation</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Insurance Eligibility</div>
                        <div className="text-sm text-gray-600">Verified: Active coverage</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileCheck className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Formulary Status</div>
                        <div className="text-sm text-gray-600 uppercase">{form.benefitsInvestigation.formularyStatus}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Prior Authorization</div>
                        <div className="text-sm text-gray-600">
                          {form.benefitsInvestigation.paRequired ? (
                            <span className="text-orange-600 font-medium">PA REQUIRED</span>
                          ) : (
                            'Not Required'
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <DollarSign className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Estimated Out-of-Pocket</div>
                        <div className="text-sm text-gray-600">{form.benefitsInvestigation.estimatedCopay}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CreditCard className="w-4 h-4 text-success mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Copay Assistance Pre-Screen</div>
                        <div className="text-sm text-gray-600">
                          {form.benefitsInvestigation.copayEligible ? (
                            <>
                              <span className="text-success font-medium">ELIGIBLE</span>
                              <br />
                              Estimated savings: {form.benefitsInvestigation.estimatedSavings} → $0
                            </>
                          ) : (
                            <span className="text-red-600 font-medium">NOT ELIGIBLE</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {form.benefitsInvestigation.completedDate && (
                      <div className="text-xs text-blue-600 pt-2 border-t border-blue-200">
                        All checks completed: {form.benefitsInvestigation.completedDate}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <Card className="p-4">
                <h3 className="font-bold text-gray-900 mb-3">Next Actions</h3>
                <div className="space-y-2">
                  {form.status === 'complete' && form.benefitsInvestigation?.paRequired && (
                    <Button className="w-full" onClick={() => window.location.href = '/dashboard?tab=access-reimbursement'}>
                      Track PA Status (Doctor Submitted)
                    </Button>
                  )}
                  {form.status === 'complete' && form.benefitsInvestigation?.copayEligible && !form.benefitsInvestigation?.paRequired && (
                    <Button className="w-full" onClick={() => window.location.href = '/dashboard?tab=contact-center'}>
                      Schedule Patient Welcome Call
                    </Button>
                  )}
                  <Button variant="secondary" className="w-full" onClick={() => window.print()}>
                    Print Form
                  </Button>
                  <Button variant="secondary" className="w-full" onClick={() => window.location.href = '/dashboard?tab=patient-operations'}>
                    Back to Referrals & Intake
                  </Button>
                </div>
              </Card>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
