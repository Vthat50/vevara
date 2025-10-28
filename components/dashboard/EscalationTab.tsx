'use client'

import { useState } from 'react'
import { UserCheck, Clock, PhoneForwarded, Users, TrendingDown } from 'lucide-react'
import Card from '@/components/Card'

interface Escalation {
  id: string
  patientName: string
  reason: string
  timestamp: string
  waitTime: number
  agent: string
  status: 'pending' | 'connected' | 'resolved'
}

const escalations: Escalation[] = [
  { id: 'ESC001', patientName: 'David Brown', reason: 'Complex medical question', timestamp: '2:34 PM', waitTime: 12, agent: 'Nurse Sarah', status: 'connected' },
  { id: 'ESC002', patientName: 'Amy Wilson', reason: 'Severe side effects', timestamp: '2:41 PM', waitTime: 8, agent: 'Dr. Martinez', status: 'connected' },
  { id: 'ESC003', patientName: 'Tom Harris', reason: 'Prior auth support', timestamp: '3:12 PM', waitTime: 25, agent: 'Pending', status: 'pending' }
]

export default function EscalationTab() {
  const [selectedEscalation, setSelectedEscalation] = useState<Escalation | null>(escalations[0])

  const getStatusColor = (status: Escalation['status']) => {
    switch (status) {
      case 'pending': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'connected': return 'bg-primary/10 text-primary border-primary/20'
      case 'resolved': return 'bg-success/10 text-success border-success/20'
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
            <PhoneForwarded className="w-6 h-6 text-primary" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">18</div>
          <div className="text-sm text-gray-600">Escalations Today</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-3">
            <Clock className="w-6 h-6 text-success" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">22s</div>
          <div className="text-sm text-gray-600">Avg Wait Time</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
          <div className="text-sm text-gray-600">Available Agents</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
            <TrendingDown className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">8%</div>
          <div className="text-sm text-gray-600">Escalation Rate</div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Active Escalations</h3>
        <div className="space-y-3">
          {escalations.map((esc) => (
            <div
              key={esc.id}
              onClick={() => setSelectedEscalation(esc)}
              className={`p-4 rounded-lg border-2 cursor-pointer ${
                selectedEscalation?.id === esc.id ? 'border-primary bg-primary/5' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-gray-900">{esc.patientName}</div>
                  <div className="text-sm text-gray-600">{esc.reason}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(esc.status)}`}>
                  {esc.status.toUpperCase()}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{esc.timestamp}</span>
                <span>Wait: {esc.waitTime}s</span>
                <span>Agent: {esc.agent}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
