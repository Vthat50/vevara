'use client'

import { useState } from 'react'
import { PhoneIncoming, Clock, User, MessageSquare, UserCheck, AlertTriangle } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface InboundCall {
  id: string
  patientName: string
  callReason: string
  waitTime: string
  status: 'waiting' | 'in-progress' | 'escalated' | 'completed'
  duration: string
}

const inboundCalls: InboundCall[] = [
  { id: 'IB001', patientName: 'Alice Johnson', callReason: 'Refill Request', waitTime: '0:12', status: 'waiting', duration: '-' },
  { id: 'IB002', patientName: 'Bob Smith', callReason: 'Side Effect Report', waitTime: '0:45', status: 'in-progress', duration: '3:24' },
  { id: 'IB003', patientName: 'Carol White', callReason: 'Medication Q&A', waitTime: '0:08', status: 'completed', duration: '5:12' },
  { id: 'IB004', patientName: 'David Brown', callReason: 'Injection Help', waitTime: '1:23', status: 'escalated', duration: '8:45' }
]

export default function InboundCallsTab() {
  const [selectedCall, setSelectedCall] = useState<InboundCall | null>(inboundCalls[0])

  const getStatusColor = (status: InboundCall['status']) => {
    switch (status) {
      case 'waiting': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'in-progress': return 'bg-primary/10 text-primary border-primary/20'
      case 'escalated': return 'bg-red-500/10 text-red-600 border-red-500/20'
      case 'completed': return 'bg-success/10 text-success border-success/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
            <PhoneIncoming className="w-6 h-6 text-primary" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">142</div>
          <div className="text-sm text-gray-600">Calls Today</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-3">
            <Clock className="w-6 h-6 text-success" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
          <div className="text-sm text-gray-600">Availability</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
            <UserCheck className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">92%</div>
          <div className="text-sm text-gray-600">AI Resolution Rate</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3">
            <AlertTriangle className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">28s</div>
          <div className="text-sm text-gray-600">Avg Escalation Time</div>
        </Card>
      </div>

      {/* Active Calls */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Active Inbound Calls</h3>
        <div className="space-y-3">
          {inboundCalls.map((call) => (
            <div
              key={call.id}
              onClick={() => setSelectedCall(call)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedCall?.id === call.id ? 'border-primary bg-primary/5' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-gray-900">{call.patientName}</div>
                  <div className="text-sm text-gray-600">{call.callReason}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(call.status)}`}>
                  {call.status.toUpperCase()}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Wait: {call.waitTime}</span>
                <span>Duration: {call.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Features */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Inbound Call Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <PhoneIncoming className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">24/7 Availability</div>
              <div className="text-sm text-gray-600">Always available for patients</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Voice Biometric Auth</div>
              <div className="text-sm text-gray-600">Secure patient verification</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Medication Q&A</div>
              <div className="text-sm text-gray-600">Instant medication support</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Human Escalation</div>
              <div className="text-sm text-gray-600">Within 30 seconds</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
