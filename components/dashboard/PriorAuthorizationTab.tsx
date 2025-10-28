'use client'

import { useState } from 'react'
import { FileCheck, Clock, CheckCircle, XCircle, AlertCircle, Building2, Calendar, FileText, Phone } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface PriorAuthorizationTabProps {
  onNavigate?: (tab: string) => void
}

interface PriorAuthorization {
  id: string
  patientName: string
  medication: string
  insurance: string
  prescribingDoctor: string
  status: 'submitted' | 'pending-info' | 'approved' | 'denied' | 'appealing'
  submittedDate: string
  daysPending: number
  lastUpdate: string
  priority: 'high' | 'medium' | 'low'
  notes?: string
  denialReason?: string
  requiredDocs?: string[]
}

const priorAuthorizations: PriorAuthorization[] = [
  {
    id: 'PA008',
    patientName: 'Michael Anderson',
    medication: 'AVONEX (interferon beta-1a)',
    insurance: 'Blue Cross Blue Shield',
    prescribingDoctor: 'Dr. Michael Cheng',
    status: 'submitted',
    submittedDate: 'Today',
    daysPending: 0,
    lastUpdate: 'Just now',
    priority: 'high',
    notes: 'PA submitted by Dr. Cheng\'s office - tracking status with insurance'
  },
  {
    id: 'PA001',
    patientName: 'Jennifer Martinez',
    medication: 'Dupixent 300mg',
    insurance: 'Blue Cross Blue Shield',
    prescribingDoctor: 'Dr. Sarah Williams',
    status: 'approved',
    submittedDate: 'Oct 25, 2024',
    daysPending: 3,
    lastUpdate: 'Today 2:30 PM',
    priority: 'high',
    notes: 'PA approved by insurance - patient now eligible for copay assistance enrollment'
  },
  {
    id: 'PA002',
    patientName: 'Sarah Thompson',
    medication: 'Humira 40mg',
    insurance: 'United Healthcare',
    prescribingDoctor: 'Dr. Michael Chen',
    status: 'submitted',
    submittedDate: 'Oct 26, 2024',
    daysPending: 2,
    lastUpdate: 'Today 10:15 AM',
    priority: 'medium'
  },
  {
    id: 'PA003',
    patientName: 'James Wilson',
    medication: 'Enbrel 50mg',
    insurance: 'Aetna',
    prescribingDoctor: 'Dr. James Liu',
    status: 'pending-info',
    submittedDate: 'Oct 20, 2024',
    daysPending: 8,
    lastUpdate: 'Today 11:00 AM',
    priority: 'high',
    requiredDocs: ['Updated lab results', 'Previous medication trial documentation'],
    notes: 'Payer requested additional clinical information'
  },
  {
    id: 'PA004',
    patientName: 'Emily Rodriguez',
    medication: 'Stelara 90mg',
    insurance: 'Cigna',
    prescribingDoctor: 'Dr. Emily Rodriguez',
    status: 'denied',
    submittedDate: 'Oct 18, 2024',
    daysPending: 10,
    lastUpdate: 'Oct 27, 2024',
    priority: 'high',
    denialReason: 'Step therapy required - must try Humira first',
    notes: 'Preparing appeal with documentation of Humira trial failure'
  },
  {
    id: 'PA005',
    patientName: 'Robert Chen',
    medication: 'Ozempic 0.5mg',
    insurance: 'Medicare Part D',
    prescribingDoctor: 'Dr. Robert Johnson',
    status: 'appealing',
    submittedDate: 'Oct 15, 2024',
    daysPending: 13,
    lastUpdate: 'Oct 26, 2024',
    priority: 'high',
    denialReason: 'Not medically necessary',
    notes: 'Appeal submitted with additional clinical justification'
  },
  {
    id: 'PA006',
    patientName: 'Lisa Martinez',
    medication: 'Trulicity 1.5mg',
    insurance: 'Anthem',
    prescribingDoctor: 'Dr. Lisa Anderson',
    status: 'submitted',
    submittedDate: 'Oct 27, 2024',
    daysPending: 1,
    lastUpdate: 'Today 9:00 AM',
    priority: 'low'
  },
  {
    id: 'PA007',
    patientName: 'David Kim',
    medication: 'Cosentyx 150mg',
    insurance: 'Humana',
    prescribingDoctor: 'Dr. David Martinez',
    status: 'approved',
    submittedDate: 'Oct 23, 2024',
    daysPending: 5,
    lastUpdate: 'Oct 27, 2024',
    priority: 'low',
    notes: 'Approved for 6 months'
  }
]

export default function PriorAuthorizationTab({ onNavigate }: PriorAuthorizationTabProps) {
  const [selectedPA, setSelectedPA] = useState<PriorAuthorization | null>(priorAuthorizations[0])
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const handleSubmitAdditionalInfo = () => {
    if (!selectedPA) return
    alert(`📄 Submit Additional Information for ${selectedPA.patientName}\n\nRequired documents:\n${selectedPA.requiredDocs?.map(doc => `• ${doc}`).join('\n')}\n\nThis would open a document upload interface.`)
  }

  const handleFileAppeal = () => {
    if (!selectedPA) return
    alert(`⚖️ File Appeal for ${selectedPA.patientName}\n\nDenial Reason: ${selectedPA.denialReason}\n\nThis would open the appeal submission form with:\n• Clinical justification letter\n• Supporting documentation\n• Previous treatment history`)
  }

  const handleProceedToEnrollment = () => {
    if (!selectedPA) return
    const proceed = window.confirm(`✅ PA Approved - Proceed to Enrollment\n\nPatient: ${selectedPA.patientName}\nMedication: ${selectedPA.medication}\n\nNavigate to Copay Assistance tab to:\n1. Schedule enrollment call\n2. Process copay card application\n3. Complete patient enrollment\n\nGo to Copay Assistance tab now?`)

    if (proceed && onNavigate) {
      onNavigate('outbound-enrollment')
    }
  }

  const handleContactInsurance = () => {
    if (!selectedPA) return
    const insurancePhones: { [key: string]: string } = {
      'Blue Cross Blue Shield': '1-800-262-2583',
      'United Healthcare': '1-800-328-5979',
      'Aetna': '1-800-872-3862',
      'Cigna': '1-800-244-6224',
      'Medicare Part D': '1-800-633-4227',
      'Anthem': '1-800-331-1476',
      'Humana': '1-800-448-6262'
    }
    const phone = insurancePhones[selectedPA.insurance] || '1-800-XXX-XXXX'
    alert(`📞 Contact ${selectedPA.insurance}\n\nPhone: ${phone}\n\nPA Reference: ${selectedPA.id}\nPatient: ${selectedPA.patientName}\nMedication: ${selectedPA.medication}\nDays Pending: ${selectedPA.daysPending}\n\nThis would initiate a call or copy details to clipboard for manual calling.`)
  }

  const handleViewFullHistory = () => {
    if (!selectedPA) return
    alert(`📋 Full PA History - ${selectedPA.patientName}\n\nPA ID: ${selectedPA.id}\nStatus: ${selectedPA.status.toUpperCase()}\n\nTimeline:\n• ${selectedPA.submittedDate} - PA Submitted\n• ${selectedPA.lastUpdate} - Last Update\n${selectedPA.denialReason ? `• Denial: ${selectedPA.denialReason}\n` : ''}${selectedPA.notes ? `• Note: ${selectedPA.notes}\n` : ''}\nThis would show the complete audit trail with all status changes, communications, and documents.`)
  }

  const getStatusColor = (status: PriorAuthorization['status']) => {
    switch (status) {
      case 'approved': return 'bg-success/10 text-success border-success/20'
      case 'submitted': return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'pending-info': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'denied': return 'bg-red-500/10 text-red-600 border-red-500/20'
      case 'appealing': return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
    }
  }

  const getStatusIcon = (status: PriorAuthorization['status']) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-success" />
      case 'submitted': return <Clock className="w-5 h-5 text-blue-600" />
      case 'pending-info': return <AlertCircle className="w-5 h-5 text-orange-600" />
      case 'denied': return <XCircle className="w-5 h-5 text-red-600" />
      case 'appealing': return <FileText className="w-5 h-5 text-purple-600" />
    }
  }

  const getPriorityColor = (priority: PriorAuthorization['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredPAs = filterStatus === 'all'
    ? priorAuthorizations
    : priorAuthorizations.filter(pa => pa.status === filterStatus)

  // Calculate metrics
  const totalPending = priorAuthorizations.filter(pa =>
    pa.status === 'submitted' || pa.status === 'pending-info' || pa.status === 'appealing'
  ).length

  const approvalRate = Math.round(
    (priorAuthorizations.filter(pa => pa.status === 'approved').length / priorAuthorizations.length) * 100
  )

  const avgDays = Math.round(
    priorAuthorizations.reduce((sum, pa) => sum + pa.daysPending, 0) / priorAuthorizations.length
  )

  const needsAction = priorAuthorizations.filter(pa =>
    pa.status === 'pending-info' || pa.status === 'denied'
  ).length

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Active</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{totalPending}</div>
          <div className="text-sm text-gray-600">PAs Pending</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">+5%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{approvalRate}%</div>
          <div className="text-sm text-gray-600">Approval Rate</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-success">-1 day</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{avgDays}</div>
          <div className="text-sm text-gray-600">Avg Days to Approval</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600">Action Required</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{needsAction}</div>
          <div className="text-sm text-gray-600">Needs Follow-up</div>
        </Card>
      </div>

      {/* Status Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filterStatus === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({priorAuthorizations.length})
          </button>
          <button
            onClick={() => setFilterStatus('submitted')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filterStatus === 'submitted' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Submitted ({priorAuthorizations.filter(pa => pa.status === 'submitted').length})
          </button>
          <button
            onClick={() => setFilterStatus('pending-info')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filterStatus === 'pending-info' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending Info ({priorAuthorizations.filter(pa => pa.status === 'pending-info').length})
          </button>
          <button
            onClick={() => setFilterStatus('approved')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filterStatus === 'approved' ? 'bg-success text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Approved ({priorAuthorizations.filter(pa => pa.status === 'approved').length})
          </button>
          <button
            onClick={() => setFilterStatus('denied')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filterStatus === 'denied' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Denied ({priorAuthorizations.filter(pa => pa.status === 'denied').length})
          </button>
        </div>
      </Card>

      {/* PA List and Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: PA List */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Prior Authorizations</h3>
          <div className="space-y-3" style={{ maxHeight: 'calc(100vh - 400px)', overflowY: 'auto' }}>
            {filteredPAs.map((pa) => (
              <div
                key={pa.id}
                onClick={() => setSelectedPA(pa)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPA?.id === pa.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="font-bold text-gray-900">{pa.patientName}</div>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(pa.priority)}`}>
                        {pa.priority}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">{pa.medication}</div>
                  </div>
                  {getStatusIcon(pa.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(pa.status)}`}>
                    {pa.status.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-600">{pa.daysPending} days</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: PA Details */}
        <Card className="p-6">
          {selectedPA ? (
            <div className="space-y-6" style={{ maxHeight: 'calc(100vh - 400px)', overflowY: 'auto' }}>
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedPA.patientName}</h3>
                    <p className="text-sm text-gray-600">{selectedPA.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-md text-sm font-medium border ${getStatusColor(selectedPA.status)}`}>
                    {selectedPA.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Days Pending</div>
                    <div className="text-2xl font-bold text-gray-900">{selectedPA.daysPending}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Priority</div>
                    <div className={`inline-block px-2 py-1 rounded text-sm font-bold ${getPriorityColor(selectedPA.priority)}`}>
                      {selectedPA.priority.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Medication:</span>
                    <span className="font-medium text-gray-900">{selectedPA.medication}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Insurance:</span>
                    <span className="font-medium text-gray-900">{selectedPA.insurance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Prescriber:</span>
                    <span className="font-medium text-gray-900">{selectedPA.prescribingDoctor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Submitted:</span>
                    <span className="font-medium text-gray-900">{selectedPA.submittedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Last Update:</span>
                    <span className="font-medium text-gray-900">{selectedPA.lastUpdate}</span>
                  </div>
                </div>
              </div>

              {selectedPA.denialReason && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <h4 className="font-bold text-red-900">Denial Reason</h4>
                  </div>
                  <p className="text-sm text-red-700">{selectedPA.denialReason}</p>
                </div>
              )}

              {selectedPA.requiredDocs && selectedPA.requiredDocs.length > 0 && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <h4 className="font-bold text-orange-900">Required Documents</h4>
                  </div>
                  <ul className="space-y-1">
                    {selectedPA.requiredDocs.map((doc, idx) => (
                      <li key={idx} className="text-sm text-orange-700 flex items-start gap-2">
                        <span className="text-orange-600">•</span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedPA.notes && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">Notes</h4>
                  <p className="text-sm text-blue-700">{selectedPA.notes}</p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">Actions</h4>
                <div className="space-y-2">
                  {selectedPA.status === 'pending-info' && (
                    <Button className="w-full" onClick={handleSubmitAdditionalInfo}>
                      Submit Additional Information
                    </Button>
                  )}
                  {selectedPA.status === 'denied' && (
                    <Button className="w-full" onClick={handleFileAppeal}>
                      File Appeal
                    </Button>
                  )}
                  {selectedPA.status === 'approved' && (
                    <Button className="w-full" onClick={handleProceedToEnrollment}>
                      Proceed to Enrollment
                    </Button>
                  )}
                  <Button variant="secondary" className="w-full" onClick={handleContactInsurance}>
                    Contact Insurance
                  </Button>
                  <Button variant="secondary" className="w-full" onClick={handleViewFullHistory}>
                    View Full History
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Select a PA to view details
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
