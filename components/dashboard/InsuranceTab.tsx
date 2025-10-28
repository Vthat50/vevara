'use client'

import { useState } from 'react'
import { Shield, CheckCircle, DollarSign, FileText, AlertTriangle } from 'lucide-react'
import Card from '@/components/Card'

interface InsuranceVerification {
  id: string
  patientName: string
  insurance: string
  medication: string
  status: 'verified' | 'pending' | 'denied' | 'prior-auth-required'
  copayAmount: string
  verifiedDate: string
}

const verifications: InsuranceVerification[] = [
  { id: 'INS001', patientName: 'Sarah Johnson', insurance: 'Blue Cross Blue Shield', medication: 'Ozempic 0.5mg', status: 'verified', copayAmount: '$25', verifiedDate: 'Oct 27' },
  { id: 'INS002', patientName: 'Michael Chen', insurance: 'Aetna', medication: 'Humira 40mg', status: 'prior-auth-required', copayAmount: '-', verifiedDate: 'Oct 27' },
  { id: 'INS003', patientName: 'Emma Davis', insurance: 'UnitedHealthcare', medication: 'Trulicity 1.5mg', status: 'pending', copayAmount: '-', verifiedDate: '-' }
]

export default function InsuranceTab() {
  const [selectedVerification, setSelectedVerification] = useState<InsuranceVerification | null>(verifications[0])

  const getStatusColor = (status: InsuranceVerification['status']) => {
    switch (status) {
      case 'verified': return 'bg-success/10 text-success border-success/20'
      case 'pending': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'denied': return 'bg-red-500/10 text-red-600 border-red-500/20'
      case 'prior-auth-required': return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-3">
            <CheckCircle className="w-6 h-6 text-success" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">89%</div>
          <div className="text-sm text-gray-600">Verification Success Rate</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">2.4s</div>
          <div className="text-sm text-gray-600">Avg Verification Time</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">42</div>
          <div className="text-sm text-gray-600">Prior Auths Pending</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
            <DollarSign className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">$47</div>
          <div className="text-sm text-gray-600">Avg Copay</div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Insurance Verifications</h3>
        <div className="space-y-3">
          {verifications.map((ver) => (
            <div
              key={ver.id}
              onClick={() => setSelectedVerification(ver)}
              className={`p-4 rounded-lg border-2 cursor-pointer ${
                selectedVerification?.id === ver.id ? 'border-primary bg-primary/5' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-gray-900">{ver.patientName}</div>
                  <div className="text-sm text-gray-600">{ver.insurance}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(ver.status)}`}>
                  {ver.status.toUpperCase().replace(/-/g, ' ')}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{ver.medication}</span>
                {ver.copayAmount !== '-' && <span className="text-success font-medium">Copay: {ver.copayAmount}</span>}
                {ver.verifiedDate !== '-' && <span>{ver.verifiedDate}</span>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Verification Capabilities</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Real-time Benefits Check</div>
              <div className="text-sm text-gray-600">Instant coverage verification</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Copay Calculation</div>
              <div className="text-sm text-gray-600">Accurate cost estimation</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Prior Auth Status</div>
              <div className="text-sm text-gray-600">Track approval progress</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Alternative Options</div>
              <div className="text-sm text-gray-600">Coverage alternatives identified</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
