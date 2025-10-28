'use client'

import { useState } from 'react'
import { Phone, Calendar, Clock, Users, Play, Pause, Settings, CheckCircle2 } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface ScheduledCall {
  id: string
  patientName: string
  callType: 'welcome' | 'refill-reminder' | 'late-refill' | 'side-effect' | 'copay-enrollment'
  scheduledTime: string
  medication: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  priority: 'high' | 'medium' | 'low'
}

const scheduledCalls: ScheduledCall[] = [
  {
    id: 'CALL001',
    patientName: 'Jennifer Martinez',
    callType: 'welcome',
    scheduledTime: 'Today 2:00 PM',
    medication: 'Ozempic 0.5mg',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'CALL002',
    patientName: 'Robert Taylor',
    callType: 'refill-reminder',
    scheduledTime: 'Today 3:30 PM',
    medication: 'Humira 40mg',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 'CALL003',
    patientName: 'Patricia Anderson',
    callType: 'late-refill',
    scheduledTime: 'Today 4:00 PM',
    medication: 'Trulicity 1.5mg',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'CALL004',
    patientName: 'David Kim',
    callType: 'side-effect',
    scheduledTime: 'Today 4:30 PM',
    medication: 'Enbrel 50mg',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'CALL005',
    patientName: 'Linda White',
    callType: 'copay-enrollment',
    scheduledTime: 'Today 5:00 PM',
    medication: 'Stelara 90mg',
    status: 'pending',
    priority: 'medium'
  }
]

export default function OutboundCallsTab() {
  const [selectedCall, setSelectedCall] = useState<ScheduledCall | null>(scheduledCalls[0])
  const [filterType, setFilterType] = useState<string>('all')

  const getCallTypeLabel = (type: ScheduledCall['callType']) => {
    switch (type) {
      case 'welcome': return 'Welcome Call'
      case 'refill-reminder': return 'Refill Reminder'
      case 'late-refill': return 'Late Refill Intervention'
      case 'side-effect': return 'Side Effect Check-in'
      case 'copay-enrollment': return 'Copay Enrollment'
    }
  }

  const getStatusColor = (status: ScheduledCall['status']) => {
    switch (status) {
      case 'pending': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'in-progress': return 'bg-primary/10 text-primary border-primary/20'
      case 'completed': return 'bg-success/10 text-success border-success/20'
      case 'failed': return 'bg-red-500/10 text-red-600 border-red-500/20'
    }
  }

  const getPriorityColor = (priority: ScheduledCall['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-orange-600'
      case 'low': return 'text-gray-600'
    }
  }

  const filteredCalls = filterType === 'all'
    ? scheduledCalls
    : scheduledCalls.filter(c => c.callType === filterType)

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-success">+15%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">247</div>
          <div className="text-sm text-gray-600">Calls Scheduled Today</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">+8%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">89%</div>
          <div className="text-sm text-gray-600">Connection Rate</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-primary">12 Active</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">5:34</div>
          <div className="text-sm text-gray-600">Avg Call Duration</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-success">+22%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
          <div className="text-sm text-gray-600">Completed Today</div>
        </Card>
      </div>

      {/* Call Type Filters */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Call Types</h3>
        <div className="grid md:grid-cols-6 gap-3">
          <Button
            variant={filterType === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterType('all')}
          >
            All Calls
          </Button>
          <Button
            variant={filterType === 'welcome' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterType('welcome')}
          >
            Welcome
          </Button>
          <Button
            variant={filterType === 'refill-reminder' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterType('refill-reminder')}
          >
            Refill Reminder
          </Button>
          <Button
            variant={filterType === 'late-refill' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterType('late-refill')}
          >
            Late Refill
          </Button>
          <Button
            variant={filterType === 'side-effect' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterType('side-effect')}
          >
            Side Effects
          </Button>
          <Button
            variant={filterType === 'copay-enrollment' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterType('copay-enrollment')}
          >
            Copay
          </Button>
        </div>
      </Card>

      {/* Scheduled Calls */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calls List */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Scheduled Calls ({filteredCalls.length})
          </h3>
          <div className="space-y-3">
            {filteredCalls.map((call) => (
              <div
                key={call.id}
                onClick={() => setSelectedCall(call)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedCall?.id === call.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-gray-900">{call.patientName}</div>
                    <div className="text-sm text-gray-600">{getCallTypeLabel(call.callType)}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(call.status)}`}>
                    {call.status.toUpperCase()}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600">{call.scheduledTime}</span>
                  <span className={`font-medium ${getPriorityColor(call.priority)}`}>
                    {call.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Call Details */}
        <Card className="p-6">
          {selectedCall ? (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Call Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Patient</div>
                  <div className="font-bold text-gray-900">{selectedCall.patientName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Call Type</div>
                  <div className="font-bold text-gray-900">{getCallTypeLabel(selectedCall.callType)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Medication</div>
                  <div className="font-bold text-gray-900">{selectedCall.medication}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Scheduled Time</div>
                  <div className="font-bold text-gray-900">{selectedCall.scheduledTime}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Priority</div>
                  <div className={`font-bold ${getPriorityColor(selectedCall.priority)}`}>
                    {selectedCall.priority.toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Status</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedCall.status)}`}>
                    {selectedCall.status.toUpperCase()}
                  </div>
                </div>

                {selectedCall.status === 'pending' && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex gap-3">
                      <Button className="flex-1 flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" />
                        Start Call Now
                      </Button>
                      <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Reschedule
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p>Select a call to view details</p>
            </div>
          )}
        </Card>
      </div>

      {/* Call Configuration */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Call Automation Rules</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Welcome Calls</div>
              <div className="text-sm text-gray-600">Within 24 hours of new Rx</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Refill Reminders</div>
              <div className="text-sm text-gray-600">7 days before due date</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Late Refill Intervention</div>
              <div className="text-sm text-gray-600">3 days after missed refill</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Side Effect Check-ins</div>
              <div className="text-sm text-gray-600">Days 3, 7, 14, 30</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
