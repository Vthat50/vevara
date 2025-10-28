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
  transcript?: Array<{
    speaker: 'ai' | 'patient'
    message: string
    timestamp: string
  }>
  callDuration?: string
  outcome?: string
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
  },
  {
    id: 'CALL006',
    patientName: 'Michael Chen',
    callType: 'welcome',
    scheduledTime: 'Today 12:30 PM',
    medication: 'Dupixent 300mg',
    status: 'completed',
    priority: 'high',
    callDuration: '4:23',
    outcome: 'Patient onboarded successfully',
    transcript: [
      { speaker: 'ai', message: 'Hi Michael, this is Sarah from the patient support program. I\'m calling to welcome you and help you get started with Dupixent. Is now a good time to talk?', timestamp: '0:00' },
      { speaker: 'patient', message: 'Yes, hi! I was actually hoping to hear from someone. I just picked up my prescription.', timestamp: '0:12' },
      { speaker: 'ai', message: 'Perfect timing! I\'m here to walk you through everything you need to know about your medication. First, do you have your medication with you right now?', timestamp: '0:18' },
      { speaker: 'patient', message: 'Yes, I have it here in front of me.', timestamp: '0:28' },
      { speaker: 'ai', message: 'Great! Let\'s start with how to administer it. Dupixent is an injection that you\'ll take every two weeks. Have you received any instructions from your doctor about the injection process?', timestamp: '0:32' },
      { speaker: 'patient', message: 'They showed me briefly, but I\'m still a bit nervous about doing it myself.', timestamp: '0:48' },
      { speaker: 'ai', message: 'That\'s completely normal. Let me walk you through it step by step. The injection should be administered in your thigh or abdomen. Make sure to let the pre-filled syringe warm to room temperature for about 45 minutes before use. Would you like me to send you a video tutorial as well?', timestamp: '0:54' },
      { speaker: 'patient', message: 'Yes, that would be really helpful!', timestamp: '1:12' },
      { speaker: 'ai', message: 'I\'ll send that to your phone right after this call. Now, regarding side effects—most people tolerate Dupixent well, but you might experience some injection site reactions like redness or itching. If you notice any eye problems or severe allergic reactions, contact your doctor immediately. Does that make sense?', timestamp: '1:16' },
      { speaker: 'patient', message: 'Yes. What about the copay program I heard about?', timestamp: '1:38' },
      { speaker: 'ai', message: 'I\'m glad you asked! You may be eligible for copay assistance that could reduce your out-of-pocket costs. I can help you enroll right now if you\'d like, or schedule a separate call just for that. What works better for you?', timestamp: '1:43' },
      { speaker: 'patient', message: 'Can we do it now? I\'d rather get everything done at once.', timestamp: '1:58' },
      { speaker: 'ai', message: 'Absolutely. I\'ll need to verify a few details. Can you confirm your date of birth and insurance provider?', timestamp: '2:02' },
      { speaker: 'patient', message: 'Sure, it\'s March 15th, 1978, and I have Blue Cross Blue Shield.', timestamp: '2:10' },
      { speaker: 'ai', message: 'Thank you. Let me check your eligibility... Good news! You qualify for the copay assistance program. This could reduce your copay to as low as $0 per month. I\'m enrolling you now, and you\'ll receive a confirmation email within 24 hours.', timestamp: '2:18' },
      { speaker: 'patient', message: 'Wow, that\'s amazing! Thank you so much.', timestamp: '2:38' },
      { speaker: 'ai', message: 'You\'re very welcome! Before we wrap up, I want to schedule a follow-up call for next week to check in on how you\'re doing with your first dose. Does next Thursday at 2 PM work for you?', timestamp: '2:42' },
      { speaker: 'patient', message: 'Yes, that works perfectly.', timestamp: '2:56' },
      { speaker: 'ai', message: 'Perfect! I\'ve scheduled that. You\'ll receive the video tutorial, copay confirmation, and appointment reminder via text and email. If you have any questions before then, you can call our support line 24/7. Is there anything else I can help you with today?', timestamp: '3:00' },
      { speaker: 'patient', message: 'No, I think that covers everything. Thank you for being so thorough!', timestamp: '3:20' },
      { speaker: 'ai', message: 'It\'s my pleasure, Michael. We\'re here to support you every step of the way. Have a great day!', timestamp: '3:26' }
    ]
  },
  {
    id: 'CALL007',
    patientName: 'Sarah Johnson',
    callType: 'refill-reminder',
    scheduledTime: 'Today 11:00 AM',
    medication: 'Trulicity 1.5mg',
    status: 'completed',
    priority: 'medium',
    callDuration: '2:45',
    outcome: 'Refill scheduled',
    transcript: [
      { speaker: 'ai', message: 'Hi Sarah, this is the patient support program calling. I\'m reaching out because your Trulicity refill is coming due in 5 days. How are you doing today?', timestamp: '0:00' },
      { speaker: 'patient', message: 'Oh hi! I\'m doing well, thanks. I actually forgot about my refill.', timestamp: '0:14' },
      { speaker: 'ai', message: 'No worries, that\'s what I\'m here for! I can help you get your refill scheduled right now. Are you planning to pick it up from your usual pharmacy at CVS on Main Street?', timestamp: '0:20' },
      { speaker: 'patient', message: 'Yes, that would be great.', timestamp: '0:32' },
      { speaker: 'ai', message: 'Perfect. I\'m processing your refill request now. It should be ready for pickup by Friday afternoon. I\'ll send you a text reminder when it\'s ready. How has the medication been working for you?', timestamp: '0:35' },
      { speaker: 'patient', message: 'Really well actually. My blood sugar levels have been much more stable.', timestamp: '0:50' },
      { speaker: 'ai', message: 'That\'s wonderful to hear! Have you experienced any side effects or concerns since your last refill?', timestamp: '0:56' },
      { speaker: 'patient', message: 'No, everything has been fine.', timestamp: '1:04' },
      { speaker: 'ai', message: 'Excellent. Just a reminder to continue taking it once weekly, and make sure to rotate your injection sites. Is there anything else I can help you with today?', timestamp: '1:08' },
      { speaker: 'patient', message: 'No, I think I\'m all set. Thanks for calling!', timestamp: '1:22' },
      { speaker: 'ai', message: 'You\'re welcome, Sarah! I\'ll call again before your next refill. Take care!', timestamp: '1:26' }
    ]
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
                {selectedCall.callDuration && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Call Duration</div>
                    <div className="font-bold text-gray-900">{selectedCall.callDuration}</div>
                  </div>
                )}
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
                {selectedCall.outcome && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Outcome</div>
                    <div className="font-medium text-success">{selectedCall.outcome}</div>
                  </div>
                )}

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

      {/* Call Transcript */}
      {selectedCall?.transcript && (
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Call Transcript</h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {selectedCall.transcript.map((entry, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  entry.speaker === 'ai' ? '' : 'flex-row-reverse'
                }`}
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      entry.speaker === 'ai'
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {entry.speaker === 'ai' ? 'AI' : 'P'}
                  </div>
                </div>
                <div className={`flex-1 ${entry.speaker === 'ai' ? '' : 'text-right'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">
                      {entry.speaker === 'ai' ? 'AI Assistant' : selectedCall.patientName}
                    </span>
                    <span className="text-xs text-gray-400">{entry.timestamp}</span>
                  </div>
                  <div
                    className={`inline-block px-4 py-2 rounded-2xl ${
                      entry.speaker === 'ai'
                        ? 'bg-gray-100 text-gray-900 rounded-tl-sm'
                        : 'bg-primary/10 text-gray-900 rounded-tr-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{entry.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

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
