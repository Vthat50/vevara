'use client'

import { useState, useEffect } from 'react'
import { Phone, PhoneOff, Clock, User, Mic, MicOff, Volume2 } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface Call {
  id: string
  patientName: string
  patientId: string
  medication: string
  callType: string
  duration: number
  status: 'active' | 'on-hold' | 'ended'
  sentiment: 'positive' | 'neutral' | 'concerned'
  transcript: Array<{ speaker: string; message: string; timestamp: string }>
}

export default function LiveCallsTab() {
  const [activeCalls, setActiveCalls] = useState<Call[]>([
    {
      id: '1',
      patientName: 'Sarah Johnson',
      patientId: 'PT-1001',
      medication: 'Humira',
      callType: 'Refill Reminder',
      duration: 154,
      status: 'active',
      sentiment: 'positive',
      transcript: [
        { speaker: 'AI', message: 'Hi Sarah! This is Vevara calling with a reminder about your Humira prescription. How are you feeling today?', timestamp: '2:15 PM' },
        { speaker: 'Patient', message: 'Hi! I\'m doing well, thank you for calling.', timestamp: '2:15 PM' },
        { speaker: 'AI', message: 'That\'s great to hear! I see your next refill is due in 5 days. Would you like me to help you schedule a pickup?', timestamp: '2:16 PM' },
        { speaker: 'Patient', message: 'Yes, that would be helpful.', timestamp: '2:16 PM' },
      ],
    },
    {
      id: '2',
      patientName: 'Michael Chen',
      patientId: 'PT-1002',
      medication: 'Enbrel',
      callType: 'Side Effect Check-in',
      duration: 72,
      status: 'active',
      sentiment: 'neutral',
      transcript: [
        { speaker: 'AI', message: 'Hello Michael, this is your scheduled check-in call. How have you been feeling since starting Enbrel?', timestamp: '2:17 PM' },
        { speaker: 'Patient', message: 'Overall okay, but I have some questions.', timestamp: '2:17 PM' },
      ],
    },
    {
      id: '3',
      patientName: 'Emma Davis',
      patientId: 'PT-1003',
      medication: 'Dupixent',
      callType: 'Copay Enrollment',
      duration: 225,
      status: 'on-hold',
      sentiment: 'concerned',
      transcript: [
        { speaker: 'AI', message: 'Hi Emma, I\'m calling to help you enroll in the copay assistance program for Dupixent.', timestamp: '2:10 PM' },
        { speaker: 'Patient', message: 'I need to speak with someone about the costs.', timestamp: '2:11 PM' },
        { speaker: 'AI', message: 'I understand. Let me transfer you to a specialist. Please hold.', timestamp: '2:12 PM' },
      ],
    },
  ])

  const [selectedCall, setSelectedCall] = useState<Call | null>(activeCalls[0])
  const [isMuted, setIsMuted] = useState(false)

  // Simulate call duration updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCalls((calls) =>
        calls.map((call) =>
          call.status === 'active'
            ? { ...call, duration: call.duration + 1 }
            : call
        )
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleEndCall = (callId: string) => {
    setActiveCalls((calls) =>
      calls.map((call) =>
        call.id === callId ? { ...call, status: 'ended' } : call
      )
    )
    if (selectedCall?.id === callId) {
      setSelectedCall(null)
    }
  }

  const handleEscalate = (callId: string) => {
    setActiveCalls((calls) =>
      calls.map((call) =>
        call.id === callId ? { ...call, status: 'on-hold' } : call
      )
    )
    alert('Call escalated to human agent. Transfer in progress...')
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Active Calls</span>
            <Phone className="w-5 h-5 text-success" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {activeCalls.filter((c) => c.status === 'active').length}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">On Hold</span>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {activeCalls.filter((c) => c.status === 'on-hold').length}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Avg Duration</span>
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-gray-900">2:34</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">AI Resolution</span>
            <User className="w-5 h-5 text-success" />
          </div>
          <div className="text-3xl font-bold text-gray-900">94%</div>
        </Card>
      </div>

      {/* Calls Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Call List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Active Calls</h3>
          {activeCalls.filter((c) => c.status !== 'ended').map((call) => (
            <div
              key={call.id}
              onClick={() => setSelectedCall(call)}
            >
              <Card
                className={`p-4 cursor-pointer transition-all ${
                  selectedCall?.id === call.id
                    ? 'ring-2 ring-primary'
                    : 'hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-medium text-gray-900">{call.patientName}</div>
                    <div className="text-sm text-gray-600">{call.patientId}</div>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      call.status === 'active' ? 'bg-success animate-pulse' : 'bg-orange-500'
                    }`}
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium text-gray-900">{call.callType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Medication:</span>
                    <span className="font-medium text-gray-900">{call.medication}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-gray-900">{formatDuration(call.duration)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sentiment:</span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        call.sentiment === 'positive'
                          ? 'bg-success/10 text-success'
                          : call.sentiment === 'neutral'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-orange-500/10 text-orange-600'
                      }`}
                    >
                      {call.sentiment}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          ))}

          {activeCalls.filter((c) => c.status !== 'ended').length === 0 && (
            <Card className="p-8 text-center">
              <Phone className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No active calls</p>
            </Card>
          )}
        </div>

        {/* Call Detail */}
        <div className="lg:col-span-2">
          {selectedCall ? (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedCall.patientName}</h3>
                  <p className="text-sm text-gray-600">{selectedCall.patientId} • {selectedCall.callType}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{formatDuration(selectedCall.duration)}</div>
                    <div className="text-xs text-gray-600">Call Duration</div>
                  </div>
                </div>
              </div>

              {/* Transcript */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-96 overflow-y-auto space-y-4">
                {selectedCall.transcript.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.speaker === 'AI' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.speaker === 'AI'
                          ? 'bg-white border border-gray-200'
                          : 'bg-primary text-white'
                      }`}
                    >
                      <div className="text-xs font-medium mb-1 opacity-70">{msg.speaker}</div>
                      <div className="text-sm">{msg.message}</div>
                      <div className="text-xs opacity-70 mt-1">{msg.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <Button
                  variant={isMuted ? 'secondary' : 'primary'}
                  size="md"
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex items-center gap-2"
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isMuted ? 'Unmute' : 'Mute'}
                </Button>

                <Button variant="secondary" size="md" className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  Listen
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={() => handleEscalate(selectedCall.id)}
                  disabled={selectedCall.status === 'on-hold'}
                >
                  {selectedCall.status === 'on-hold' ? 'Agent Connecting...' : 'Escalate to Human'}
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => handleEndCall(selectedCall.id)}
                  className="ml-auto bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
                >
                  <PhoneOff className="w-4 h-4" />
                  End Call
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <Phone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Call Selected</h3>
              <p className="text-gray-600">Select a call from the list to view details and controls</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
