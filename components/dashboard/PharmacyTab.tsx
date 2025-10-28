'use client'

import { useState } from 'react'
import { Building2, CheckCircle, Clock, Package, RefreshCw } from 'lucide-react'
import Card from '@/components/Card'

interface PharmacyRequest {
  id: string
  patientName: string
  pharmacy: string
  medication: string
  type: 'refill' | 'new-rx' | 'transfer'
  status: 'processing' | 'ready' | 'completed'
  submittedDate: string
}

const requests: PharmacyRequest[] = [
  { id: 'PH001', patientName: 'John Williams', pharmacy: 'CVS Main Street', medication: 'Enbrel 50mg', type: 'refill', status: 'ready', submittedDate: 'Oct 27' },
  { id: 'PH002', patientName: 'Lisa Anderson', pharmacy: 'Walgreens Downtown', medication: 'Stelara 90mg', type: 'new-rx', status: 'processing', submittedDate: 'Oct 27' },
  { id: 'PH003', patientName: 'Robert Taylor', pharmacy: 'Rite Aid', medication: 'Humira 40mg', type: 'transfer', status: 'completed', submittedDate: 'Oct 26' }
]

export default function PharmacyTab() {
  const [selectedRequest, setSelectedRequest] = useState<PharmacyRequest | null>(requests[0])

  const getStatusColor = (status: PharmacyRequest['status']) => {
    switch (status) {
      case 'processing': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'ready': return 'bg-primary/10 text-primary border-primary/20'
      case 'completed': return 'bg-success/10 text-success border-success/20'
    }
  }

  const getTypeLabel = (type: PharmacyRequest['type']) => {
    switch (type) {
      case 'refill': return 'Refill Request'
      case 'new-rx': return 'New Prescription'
      case 'transfer': return 'Transfer'
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
            <Package className="w-6 h-6 text-primary" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
          <div className="text-sm text-gray-600">Requests Today</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-3">
            <CheckCircle className="w-6 h-6 text-success" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">94%</div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3">
            <Building2 className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">20+</div>
          <div className="text-sm text-gray-600">Integrated Pharmacies</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">3.2h</div>
          <div className="text-sm text-gray-600">Avg Processing Time</div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Pharmacy Requests</h3>
        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedRequest(req)}
              className={`p-4 rounded-lg border-2 cursor-pointer ${
                selectedRequest?.id === req.id ? 'border-primary bg-primary/5' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-gray-900">{req.patientName}</div>
                  <div className="text-sm text-gray-600">{req.pharmacy}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(req.status)}`}>
                  {req.status.toUpperCase()}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{req.medication}</span>
                <span>{getTypeLabel(req.type)}</span>
                <span>{req.submittedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Integrated Pharmacy Systems</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div className="font-medium text-gray-900">CVS Pharmacy</div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div className="font-medium text-gray-900">Walgreens</div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div className="font-medium text-gray-900">Rite Aid</div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div className="font-medium text-gray-900">Kroger Pharmacy</div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div className="font-medium text-gray-900">Walmart Pharmacy</div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-primary" />
            <div className="font-medium text-gray-900">+15 More Systems</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
