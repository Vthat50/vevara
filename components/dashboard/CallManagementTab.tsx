'use client'

import { useState } from 'react'
import { PhoneIncoming, Clock, Phone, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface InboundCall {
  id: string
  patientName: string
  patientAge: number
  insurance: string
  phone: string
  email: string
  medication: string
  reason: string
  timestamp: string
  status: 'waiting' | 'in-progress' | 'completed'
  duration?: string
  adherence?: number
}

interface InboundTranscriptMessage {
  speaker: 'AI' | 'Patient'
  time: string
  message: string
}

interface InboundTranscript {
  callId: string
  messages: InboundTranscriptMessage[]
  resolution: string
}

const inboundCalls: InboundCall[] = [
  {
    id: 'IB001',
    patientName: 'Alice Johnson',
    patientAge: 52,
    insurance: 'Aetna',
    phone: '(555) 789-0123',
    email: 'alice.j@email.com',
    medication: 'Lantus 100 units/mL',
    reason: 'Refill Request',
    timestamp: 'Now',
    status: 'in-progress',
    duration: '3:24',
    adherence: 89
  },
  {
    id: 'IB002',
    patientName: 'Bob Smith',
    patientAge: 47,
    insurance: 'United Healthcare',
    phone: '(555) 890-1234',
    email: 'bob.smith@email.com',
    medication: 'Victoza 1.2mg',
    reason: 'Side Effect Report',
    timestamp: '1 hour ago',
    status: 'completed',
    duration: '5:12',
    adherence: 85
  },
  {
    id: 'IB003',
    patientName: 'Carol White',
    patientAge: 63,
    insurance: 'Medicare',
    phone: '(555) 901-2345',
    email: 'carol.w@email.com',
    medication: 'Jardiance 10mg',
    reason: 'Medication Question',
    timestamp: '2 hours ago',
    status: 'completed',
    duration: '4:35',
    adherence: 92
  }
]

const inboundTranscripts: InboundTranscript[] = [
  {
    callId: 'IB001',
    resolution: 'Refill processed and scheduled for pickup',
    messages: [
      { speaker: 'AI', time: '14:20:03', message: "Hello, this is the Vevara patient support line. How can I help you today?" },
      { speaker: 'Patient', time: '14:20:08', message: "Hi, I need to refill my Lantus prescription. I'm running low and should have called earlier." },
      { speaker: 'AI', time: '14:20:15', message: "No worries at all, Alice! I can help you with that right away. Let me pull up your account... I see you've been on Lantus 100 units/mL for about 6 months now. Let me check your prescription status." },
      { speaker: 'Patient', time: '14:20:28', message: "Yes, that's right. I take it every evening." },
      { speaker: 'AI', time: '14:20:35', message: "Perfect! I can see you're due for a refill. Your last refill was on October 1st. Which pharmacy would you like me to send this to? I have Walgreens on Oak Street on file from your last refill." },
      { speaker: 'Patient', time: '14:20:48', message: "Yes, Walgreens on Oak Street is still my pharmacy. That would be great." },
      { speaker: 'AI', time: '14:20:55', message: "Excellent! I'm sending your Lantus refill to Walgreens on Oak Street now. Let me verify your insurance... You have Aetna, correct?" },
      { speaker: 'Patient', time: '14:21:03', message: "Yes, that's correct." },
      { speaker: 'AI', time: '14:21:08', message: "Great! Your insurance is active and the refill is approved. Your copay will be $30 with your current insurance coverage. The prescription will be ready for pickup tomorrow after 2 PM. You'll receive a text confirmation when it's ready for pickup." },
      { speaker: 'Patient', time: '14:21:25', message: "That's perfect. Will I get a reminder before my next refill? I sometimes lose track of time." },
      { speaker: 'AI', time: '14:21:35', message: "Absolutely! I'll call you 5 days before your next refill is due, which will be around November 25th. I've also noticed your adherence rate is 89% - that's good, but we can help you get to 95% or higher. Would you like me to set up weekly reminder calls to help you stay on track?" },
      { speaker: 'Patient', time: '14:21:55', message: "Yes, that would be really helpful. Sometimes I forget when I'm busy with work." },
      { speaker: 'AI', time: '14:22:05', message: "I completely understand! I've scheduled weekly check-in calls every Monday at 10 AM. You'll also receive a text reminder the day before each call. These calls will be quick - just a 2-3 minute check-in to make sure you have your medication and see if you have any questions." },
      { speaker: 'Patient', time: '14:22:22', message: "That sounds great. Thank you so much!" },
      { speaker: 'AI', time: '14:22:28', message: "You're very welcome, Alice! Is there anything else I can help you with today? Any questions about your medication or side effects you'd like to discuss?" },
      { speaker: 'Patient', time: '14:22:38', message: "No, that covers everything. I really appreciate your help!" },
      { speaker: 'AI', time: '14:22:45', message: "My pleasure! Remember, you can call us anytime if you have questions. Have a wonderful rest of your day, and we'll talk to you on Monday for your first check-in call!" },
      { speaker: 'Patient', time: '14:22:55', message: "Thank you! Goodbye!" }
    ]
  },
  {
    callId: 'IB002',
    resolution: 'Side effects documented, follow-up scheduled with nurse',
    messages: [
      { speaker: 'AI', time: '13:15:02', message: "Hello, this is the Vevara patient support line. How can I assist you today?" },
      { speaker: 'Patient', time: '13:15:08', message: "Hi, I've been having some nausea after taking my Victoza. Is this normal? I'm getting worried." },
      { speaker: 'AI', time: '13:15:18', message: "Hi Bob, thank you for calling. I'm sorry to hear you're experiencing nausea. I want to assure you that we'll get this sorted out. Let me pull up your medical record... I see you're on Victoza 1.2mg. First, how long have you been on this medication?" },
      { speaker: 'Patient', time: '13:15:35', message: "About two weeks now. I just started it on October 13th." },
      { speaker: 'AI', time: '13:15:43', message: "Okay, thank you. Two weeks is still early in treatment. Can you tell me more about the nausea? When does it typically occur - is it right after your injection, or later in the day?" },
      { speaker: 'Patient', time: '13:15:58', message: "It usually happens about an hour after I take the injection. It lasts for maybe 2-3 hours." },
      { speaker: 'AI', time: '13:16:08', message: "I understand. Nausea is actually one of the more common side effects when starting Victoza, especially in the first few weeks as your body adjusts to the medication. However, I want to make sure we document this properly and get you the right support. On a scale of 1-10, how severe is the nausea?" },
      { speaker: 'Patient', time: '13:16:28', message: "I'd say about a 6 or 7. It's uncomfortable but manageable. I haven't thrown up or anything." },
      { speaker: 'AI', time: '13:16:40', message: "Thank you for being so specific - that's really helpful. I'm documenting all of this in your record right now. Have you noticed if eating before your injection makes any difference?" },
      { speaker: 'Patient', time: '13:16:55', message: "I haven't really paid attention to that. I usually take it in the morning before breakfast." },
      { speaker: 'AI', time: '13:17:05', message: "That could be part of the issue. I'd like to schedule a follow-up call with our nurse specialist tomorrow to discuss this in detail. She can review your dosing schedule and may recommend some adjustments. Would 11 AM work for you?" },
      { speaker: 'Patient', time: '13:17:22', message: "Yes, 11 AM tomorrow works fine." },
      { speaker: 'AI', time: '13:17:28', message: "Perfect! I've scheduled that call with Nurse Jennifer. She'll call you at 11 AM tomorrow at this number. In the meantime, I'd recommend trying to take your injection with food rather than before eating. Also, stay well hydrated throughout the day - that can help reduce nausea." },
      { speaker: 'Patient', time: '13:17:50', message: "Okay, I'll try that. Should I keep taking the medication?" },
      { speaker: 'AI', time: '13:17:58', message: "Yes, continue with your regular schedule unless the nausea becomes severe. The nurse will discuss other strategies with you tomorrow, and she may adjust your dosing schedule if needed. However, if the nausea becomes severe, you experience vomiting, or you have any other concerning symptoms, please call your doctor immediately or go to urgent care." },
      { speaker: 'Patient', time: '13:18:20', message: "Understood. I feel better knowing this is being taken care of." },
      { speaker: 'AI', time: '13:18:28', message: "I'm glad I could help! Is there anything else you'd like to discuss today?" },
      { speaker: 'Patient', time: '13:18:35', message: "No, that's everything. Thank you for your help." },
      { speaker: 'AI', time: '13:18:42', message: "You're very welcome, Bob! You'll hear from Nurse Jennifer tomorrow at 11 AM. Take care, and don't hesitate to call back if you need anything before then." }
    ]
  },
  {
    callId: 'IB003',
    resolution: 'Medication questions answered, patient educated',
    messages: [
      { speaker: 'AI', time: '12:10:05', message: "Hello, this is the Vevara patient support line. How can I help you today?" },
      { speaker: 'Patient', time: '12:10:12', message: "Hi, I have a question about when to take my Jardiance. Should it be in the morning or evening? My doctor didn't specify." },
      { speaker: 'AI', time: '12:10:25', message: "Hi Carol! That's a great question, and I'm happy to help clarify. Let me pull up your information... I see you're on Jardiance 10mg. The good news is that Jardiance can be taken at any time of day, but it's best to take it at the same time every day for consistency. What time typically works best with your schedule?" },
      { speaker: 'Patient', time: '12:10:48', message: "I usually take my other medications in the morning with breakfast. Would that work for Jardiance too?" },
      { speaker: 'AI', time: '12:10:58', message: "Morning with breakfast is perfect! That's actually when most patients prefer to take it, and it's a great way to build it into your daily routine. Taking it with food can also help reduce any potential stomach upset, although Jardiance is generally well-tolerated." },
      { speaker: 'Patient', time: '12:11:18', message: "Okay, good to know. I've been taking it at different times and wasn't sure if that was okay." },
      { speaker: 'AI', time: '12:11:28', message: "For best results, try to stick to the same time each day moving forward - your body will appreciate the consistency. Have you been experiencing any issues with the medication? Any side effects or concerns?" },
      { speaker: 'Patient', time: '12:11:45', message: "No issues at all. I've actually been feeling pretty good. I just wanted to make sure I was taking it correctly." },
      { speaker: 'AI', time: '12:11:55', message: "That's wonderful to hear! Looking at your records, your adherence rate is excellent at 92% - you're doing a great job staying on track with your medication. Just remember to take it at the same time each day, and you'll be all set." },
      { speaker: 'Patient', time: '12:12:12', message: "Perfect! Is there anything else I should know about taking Jardiance?" },
      { speaker: 'AI', time: '12:12:22', message: "Yes, a couple of things to keep in mind. Jardiance can increase urination - that's actually part of how it works to help manage blood sugar. So make sure you're staying well hydrated throughout the day. Also, if you miss a dose, just take your next scheduled dose - don't double up." },
      { speaker: 'Patient', time: '12:12:45', message: "I have noticed I'm using the bathroom more often. Good to know that's normal!" },
      { speaker: 'AI', time: '12:12:55', message: "Exactly! That's completely expected and nothing to worry about. Just keep drinking plenty of water. Is there anything else you'd like to know about your medication?" },
      { speaker: 'Patient', time: '12:13:08', message: "No, that covers everything. Thank you so much for the information!" },
      { speaker: 'AI', time: '12:13:15', message: "You're very welcome, Carol! You're doing an excellent job managing your medication. If you have any other questions in the future, don't hesitate to call us anytime. Have a wonderful day!" },
      { speaker: 'Patient', time: '12:13:28', message: "You too, thank you! Goodbye!" }
    ]
  }
]

export default function CallManagementTab() {
  const [selectedInbound, setSelectedInbound] = useState<InboundCall | null>(inboundCalls[0])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Inbound Patient Support</h2>
        <p className="text-gray-600">Manage and respond to incoming patient calls in real-time</p>
      </div>

      {/* Inbound Support View */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Inbound List */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Inbound Support Calls</h3>
            <div className="space-y-3">
              {inboundCalls.map((call) => (
                <div
                  key={call.id}
                  onClick={() => setSelectedInbound(call)}
                  className={`p-4 rounded-lg border-2 cursor-pointer ${
                    selectedInbound?.id === call.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <PhoneIncoming className="w-4 h-4 text-success" />
                        <span className="font-bold text-gray-900">{call.patientName}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{call.reason}</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium border ${
                      call.status === 'completed' ? 'bg-success/10 text-success border-success/20' :
                      call.status === 'in-progress' ? 'bg-primary/10 text-primary border-primary/20' :
                      'bg-orange-500/10 text-orange-600 border-orange-500/20'
                    }`}>
                      {call.status.toUpperCase().replace(/-/g, ' ')}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{call.timestamp}</span>
                    {call.duration && <span>Duration: {call.duration}</span>}
                  </div>
                </div>
              ))}
            </div>
        </Card>

        {/* Inbound Details */}
        <Card className="p-6 overflow-y-auto max-h-[calc(100vh-400px)]">
            {selectedInbound ? (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Call Details</h3>
                <div className="space-y-4">
                  {/* Patient Info */}
                  <div className="pb-4 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-bold text-xl text-gray-900">{selectedInbound.patientName}, {selectedInbound.patientAge}</div>
                        <div className="text-sm text-gray-600">{selectedInbound.medication}</div>
                        <div className="text-sm text-gray-600">{selectedInbound.insurance}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium border ${
                        selectedInbound.status === 'completed' ? 'bg-success/10 text-success border-success/20' :
                        selectedInbound.status === 'in-progress' ? 'bg-primary/10 text-primary border-primary/20' :
                        'bg-orange-500/10 text-orange-600 border-orange-500/20'
                      }`}>
                        {selectedInbound.status.toUpperCase().replace(/-/g, ' ')}
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm text-gray-600 mt-2">
                      <span>📞 {selectedInbound.phone}</span>
                      <span>✉️ {selectedInbound.email}</span>
                    </div>
                  </div>

                  {/* Call Info */}
                  <div className="pb-4 border-b border-gray-200">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-gray-600 mb-1">Call Reason</div>
                        <div className="font-medium text-gray-900">{selectedInbound.reason}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Time</div>
                        <div className="font-medium text-gray-900">{selectedInbound.timestamp}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Duration</div>
                        <div className="font-medium text-gray-900">{selectedInbound.duration}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Adherence</div>
                        <div className="font-medium text-gray-900">{selectedInbound.adherence}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Call Transcript */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Call Transcript</h4>
                    <div className="space-y-3">
                      {inboundTranscripts.find(t => t.callId === selectedInbound.id)?.messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.speaker === 'AI' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[85%] rounded-lg p-3 ${
                            msg.speaker === 'AI'
                              ? 'bg-primary/10 border border-primary/20'
                              : 'bg-gray-100 border border-gray-200'
                          }`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-bold ${msg.speaker === 'AI' ? 'text-primary' : 'text-gray-700'}`}>
                                {msg.speaker}
                              </span>
                              <span className="text-xs text-gray-500">{msg.time}</span>
                            </div>
                            <p className="text-sm text-gray-900">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Resolution */}
                    <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success">
                      <div className="text-sm">
                        <span className="font-bold text-success">Resolution: </span>
                        <span className="text-gray-900">{inboundTranscripts.find(t => t.callId === selectedInbound.id)?.resolution}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p>Select an inbound call to view details</p>
              </div>
            )}
        </Card>
      </div>
    </div>
  )
}
