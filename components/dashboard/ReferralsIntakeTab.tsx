'use client'

import { useState } from 'react'
import { FileText, CheckCircle, Clock, AlertCircle, XCircle, DollarSign, Shield, Activity, FileCheck, CreditCard, Building2, Phone, Mail, Calendar } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface ReferralsIntakeTabProps {
  onNavigate?: (tab: string) => void
}

interface StartForm {
  id: string
  patientName: string
  dateReceived: string
  status: 'new' | 'reviewing' | 'benefits-investigation' | 'complete' | 'incomplete'
  pagesReceived: number
  source: string
  priority: 'high' | 'medium' | 'low'
  patientInfo?: {
    dob: string
    phone: string
    email: string
    address: string
  }
  insurance?: {
    carrier: string
    policyNumber: string
    groupNumber: string
    verified: boolean
    eligibilityStatus?: 'active' | 'inactive'
    verifiedDate?: string
  }
  medication?: {
    name: string
    dosage: string
    diagnosisCode: string
  }
  prescriber?: {
    name: string
    npi: string
    phone: string
  }
  benefitsInvestigation?: {
    eligibilityChecked: boolean
    formularyStatus?: 'covered' | 'not-covered' | 'tier-3' | 'tier-4'
    paRequired: boolean
    estimatedCopay?: string
    copayEligible: boolean
    estimatedSavings?: string
    completedDate?: string
  }
  missingInfo?: string[]
  nextAction?: string
  pdfPath?: string
}

const startForms: StartForm[] = [
  {
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
    nextAction: 'Submit Prior Authorization',
    pdfPath: '/start-forms/michael-anderson-avonex-page-4.pdf'
  },
  {
    id: 'SF002',
    patientName: 'Jennifer Martinez',
    dateReceived: 'Today 9:15 AM',
    status: 'complete',
    pagesReceived: 8,
    source: 'Fax: (555) 123-4567',
    priority: 'high',
    patientInfo: {
      dob: '05/12/1985',
      phone: '+15551234789',
      email: 'jennifer.m@email.com',
      address: '123 Main St, Los Angeles, CA 90001'
    },
    insurance: {
      carrier: 'Blue Cross Blue Shield',
      policyNumber: 'ABC123456789',
      groupNumber: 'GRP001',
      verified: true,
      eligibilityStatus: 'active',
      verifiedDate: 'Today 9:16 AM'
    },
    medication: {
      name: 'Dupixent 300mg',
      dosage: '300mg every 2 weeks',
      diagnosisCode: 'L20.9 (Atopic Dermatitis)'
    },
    prescriber: {
      name: 'Dr. Sarah Williams',
      npi: '1234567890',
      phone: '(555) 123-4567'
    },
    benefitsInvestigation: {
      eligibilityChecked: true,
      formularyStatus: 'tier-3',
      paRequired: true,
      estimatedCopay: '$150/month',
      copayEligible: true,
      estimatedSavings: '$150/month',
      completedDate: 'Today 9:20 AM'
    },
    nextAction: 'Submit Prior Authorization'
  },
  {
    id: 'SF002',
    patientName: 'Robert Johnson',
    dateReceived: 'Today 10:30 AM',
    status: 'benefits-investigation',
    pagesReceived: 7,
    source: 'Portal Upload',
    priority: 'medium',
    patientInfo: {
      dob: '08/22/1978',
      phone: '+15559876543',
      email: 'robert.j@email.com',
      address: '456 Oak Ave, San Francisco, CA 94102'
    },
    insurance: {
      carrier: 'United Healthcare',
      policyNumber: 'UHC987654321',
      groupNumber: 'GRP002',
      verified: true,
      eligibilityStatus: 'active',
      verifiedDate: 'Today 10:32 AM'
    },
    medication: {
      name: 'Humira 40mg',
      dosage: '40mg every 2 weeks',
      diagnosisCode: 'M05.9 (Rheumatoid Arthritis)'
    },
    prescriber: {
      name: 'Dr. Michael Chen',
      npi: '9876543210',
      phone: '(555) 987-6543'
    },
    benefitsInvestigation: {
      eligibilityChecked: true,
      formularyStatus: 'tier-3',
      paRequired: true,
      estimatedCopay: '$200/month',
      copayEligible: true,
      estimatedSavings: '$200/month',
      completedDate: undefined
    },
    nextAction: 'Waiting for formulary check...'
  },
  {
    id: 'SF003',
    patientName: 'Patricia Williams',
    dateReceived: 'Today 11:45 AM',
    status: 'incomplete',
    pagesReceived: 5,
    source: 'Fax: (555) 456-7890',
    priority: 'medium',
    patientInfo: {
      dob: '03/15/1990',
      phone: '+15551112222',
      email: 'patricia.w@email.com',
      address: '789 Pine St, Seattle, WA 98101'
    },
    missingInfo: ['Insurance card back copy', 'HIPAA authorization signature', 'Diagnosis code'],
    nextAction: 'Request additional information from provider'
  },
  {
    id: 'SF004',
    patientName: 'David Chen',
    dateReceived: 'Today 8:20 AM',
    status: 'complete',
    pagesReceived: 9,
    source: 'Fax: (555) 789-0123',
    priority: 'low',
    patientInfo: {
      dob: '11/30/1982',
      phone: '+15553334444',
      email: 'david.c@email.com',
      address: '321 Elm Blvd, Boston, MA 02101'
    },
    insurance: {
      carrier: 'Aetna',
      policyNumber: 'AET456789123',
      groupNumber: 'GRP003',
      verified: true,
      eligibilityStatus: 'active',
      verifiedDate: 'Today 8:25 AM'
    },
    medication: {
      name: 'Enbrel 50mg',
      dosage: '50mg weekly',
      diagnosisCode: 'L40.0 (Psoriasis)'
    },
    prescriber: {
      name: 'Dr. Emily Rodriguez',
      npi: '4567891230',
      phone: '(555) 456-7890'
    },
    benefitsInvestigation: {
      eligibilityChecked: true,
      formularyStatus: 'tier-3',
      paRequired: true,
      estimatedCopay: '$175/month',
      copayEligible: true,
      estimatedSavings: '$175/month',
      completedDate: 'Today 8:30 AM'
    },
    nextAction: 'Submit Prior Authorization'
  },
  {
    id: 'SF005',
    patientName: 'Maria Garcia',
    dateReceived: 'Yesterday 4:30 PM',
    status: 'new',
    pagesReceived: 6,
    source: 'Fax: (555) 234-5678',
    priority: 'medium',
    nextAction: 'Review and verify completeness'
  }
]

export default function ReferralsIntakeTab({ onNavigate }: ReferralsIntakeTabProps) {

  const getStatusColor = (status: StartForm['status']) => {
    switch (status) {
      case 'new': return 'bg-red-500/10 text-red-600 border-red-500/20'
      case 'reviewing': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
      case 'benefits-investigation': return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'complete': return 'bg-success/10 text-success border-success/20'
      case 'incomplete': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
    }
  }

  const getStatusIcon = (status: StartForm['status']) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-5 h-5 text-red-600" />
      case 'reviewing': return <Clock className="w-5 h-5 text-yellow-600" />
      case 'benefits-investigation': return <Activity className="w-5 h-5 text-blue-600 animate-pulse" />
      case 'complete': return <CheckCircle className="w-5 h-5 text-success" />
      case 'incomplete': return <XCircle className="w-5 h-5 text-orange-600" />
    }
  }

  const getPriorityColor = (priority: StartForm['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: StartForm['status']) => {
    switch (status) {
      case 'new': return 'NEW'
      case 'reviewing': return 'REVIEWING'
      case 'benefits-investigation': return 'BENEFITS CHECK'
      case 'complete': return 'COMPLETE'
      case 'incomplete': return 'INCOMPLETE'
    }
  }

  // Calculate metrics
  const newForms = startForms.filter(f => f.status === 'new').length
  const processing = startForms.filter(f => f.status === 'reviewing' || f.status === 'benefits-investigation').length
  const paNeeded = startForms.filter(f => f.status === 'complete' && f.benefitsInvestigation?.paRequired).length
  const completedToday = startForms.filter(f => f.status === 'complete' && f.dateReceived.includes('Today')).length

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">New</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{newForms}</div>
          <div className="text-sm text-gray-600">New Forms</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">Active</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{processing}</div>
          <div className="text-sm text-gray-600">Processing</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600">Ready</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{paNeeded}</div>
          <div className="text-sm text-gray-600">PA Needed</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">+{completedToday}</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{completedToday}</div>
          <div className="text-sm text-gray-600">Completed Today</div>
        </Card>
      </div>

      {/* START Forms List */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">START Forms Received</h3>
        <div className="space-y-3" style={{ maxHeight: 'calc(100vh - 400px)', overflowY: 'auto' }}>
          {startForms.map((form) => (
            <div
              key={form.id}
              onClick={() => {
                // Navigate to dedicated form viewer page
                window.location.href = `/dashboard/forms/${form.id}`
              }}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all border-gray-200 hover:border-primary hover:bg-primary/5`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-bold text-gray-900">{form.patientName}</div>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(form.priority)}`}>
                      {form.priority}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">{form.dateReceived}</div>
                  <div className="text-xs text-gray-500 mt-1">{form.source}</div>
                </div>
                {getStatusIcon(form.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(form.status)}`}>
                  {getStatusLabel(form.status)}
                </span>
                <span className="text-xs text-gray-600">{form.pagesReceived} pages</span>
              </div>
              {form.status === 'benefits-investigation' && (
                <div className="mt-2 text-xs text-blue-600 flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse" />
                  Checking insurance...
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
