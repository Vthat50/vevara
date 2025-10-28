'use client'

import { useState } from 'react'
import { PhoneOutgoing, PhoneIncoming, Clock, Phone, CheckCircle, XCircle, AlertCircle, FileCheck, UserCheck, Activity } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface OutboundCall {
  id: string
  patientName: string
  prescribingDoctor: string
  medication: string
  phone: string
  doctorConsentStatus: 'pending' | 'obtained' | 'declined'
  doctorConsentDate?: string
  patientConsentStatus: 'not-contacted' | 'pending' | 'accepted' | 'declined'
  callAttempts: number
  lastCallAttempt?: string
  scheduledCallTime?: string
  callStatus: 'awaiting-doctor-consent' | 'ready-to-call' | 'attempted' | 'enrolled' | 'declined'
  enrollmentDate?: string
}

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

const outboundCalls: OutboundCall[] = [
  {
    id: 'OB001',
    patientName: 'Jennifer Martinez',
    prescribingDoctor: 'Dr. Sarah Williams',
    medication: 'Ozempic 0.5mg',
    phone: '+15551234001',
    doctorConsentStatus: 'obtained',
    doctorConsentDate: 'Oct 25, 2024',
    patientConsentStatus: 'accepted',
    callAttempts: 1,
    lastCallAttempt: 'Oct 27, 2:00 PM',
    callStatus: 'enrolled',
    enrollmentDate: 'Oct 27, 2024'
  },
  {
    id: 'OB002',
    patientName: 'Robert Taylor',
    prescribingDoctor: 'Dr. Michael Chen',
    medication: 'Humira 40mg',
    phone: '+15551234002',
    doctorConsentStatus: 'obtained',
    doctorConsentDate: 'Oct 26, 2024',
    patientConsentStatus: 'not-contacted',
    callAttempts: 0,
    scheduledCallTime: 'Today 3:30 PM',
    callStatus: 'ready-to-call'
  },
  {
    id: 'OB003',
    patientName: 'Patricia Anderson',
    prescribingDoctor: 'Dr. James Liu',
    medication: 'Trulicity 1.5mg',
    phone: '+15551234003',
    doctorConsentStatus: 'obtained',
    doctorConsentDate: 'Oct 27, 2024',
    patientConsentStatus: 'pending',
    callAttempts: 2,
    lastCallAttempt: 'Oct 27, 11:00 AM',
    scheduledCallTime: 'Today 5:00 PM',
    callStatus: 'attempted'
  },
  {
    id: 'OB004',
    patientName: 'David Kim',
    prescribingDoctor: 'Dr. Emily Rodriguez',
    medication: 'Enbrel 50mg',
    phone: '+15551234004',
    doctorConsentStatus: 'pending',
    patientConsentStatus: 'not-contacted',
    callAttempts: 0,
    callStatus: 'awaiting-doctor-consent'
  },
  {
    id: 'OB005',
    patientName: 'Linda White',
    prescribingDoctor: 'Dr. Robert Johnson',
    medication: 'Stelara 90mg',
    phone: '+15551234005',
    doctorConsentStatus: 'declined',
    doctorConsentDate: 'Oct 26, 2024',
    patientConsentStatus: 'not-contacted',
    callAttempts: 0,
    callStatus: 'declined'
  }
]

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
  const [view, setView] = useState<'outbound' | 'inbound'>('outbound')
  const [selectedOutbound, setSelectedOutbound] = useState<OutboundCall | null>(outboundCalls[0])
  const [selectedInbound, setSelectedInbound] = useState<InboundCall | null>(inboundCalls[0])
  const [isInitiatingCall, setIsInitiatingCall] = useState(false)

  const handleInitiateEnrollmentCall = async (call: OutboundCall) => {
    setIsInitiatingCall(true)

    try {
      const testPhoneNumber = '+15519982979'
      console.log('Initiating enrollment call for:', call.patientName, 'to test number:', testPhoneNumber)

      const response = await fetch('/api/initiate-enrollment-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: testPhoneNumber,
          patientName: call.patientName,
          metadata: {
            medication: call.medication,
            prescribing_doctor: call.prescribingDoctor,
            patient_id: call.id,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert(`✅ Enrollment call initiated successfully to ${call.patientName}!\n\nPhone: ${call.phone}\nConversation ID: ${data.conversationId}`)
      } else {
        alert(`❌ Failed to initiate call\n\nError: ${data.error}`)
      }
    } catch (error) {
      console.error('Error initiating enrollment call:', error)
      alert(`❌ Failed to initiate call\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsInitiatingCall(false)
    }
  }

  const getDoctorConsentColor = (status: OutboundCall['doctorConsentStatus']) => {
    switch (status) {
      case 'obtained': return 'bg-success/10 text-success border-success/20'
      case 'pending': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'declined': return 'bg-red-500/10 text-red-600 border-red-500/20'
    }
  }

  const getCallStatusColor = (status: OutboundCall['callStatus']) => {
    switch (status) {
      case 'enrolled': return 'bg-success/10 text-success border-success/20'
      case 'ready-to-call': return 'bg-primary/10 text-primary border-primary/20'
      case 'attempted': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'awaiting-doctor-consent': return 'bg-gray-200 text-gray-600 border-gray-300'
      case 'declined': return 'bg-red-500/10 text-red-600 border-red-500/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Enrollment Funnel */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Digital Companion Enrollment Funnel</h3>
        <div className="grid grid-cols-5 gap-6">
          {/* Stage 1: Doctor Consent */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-success">
                +{Math.round((outboundCalls.filter(c => c.callStatus === 'attempted' || c.callStatus === 'ready-to-call').length / outboundCalls.filter(c => c.doctorConsentStatus === 'obtained').length) * 100)}%
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {outboundCalls.filter(c => c.doctorConsentStatus === 'obtained').length}
            </div>
            <div className="text-sm text-gray-600">Doctor Consent</div>
          </Card>

          {/* Stage 2: Patient Contacted */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-500" />
              </div>
              <span className="text-sm font-medium text-success">
                +{Math.round((outboundCalls.filter(c => c.callStatus === 'enrolled').length / outboundCalls.filter(c => c.callStatus === 'attempted' || c.callStatus === 'ready-to-call').length) * 100)}%
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {outboundCalls.filter(c => c.callStatus === 'attempted' || c.callStatus === 'ready-to-call').length}
            </div>
            <div className="text-sm text-gray-600">Patient Contacted</div>
          </Card>

          {/* Stage 3: Enrolled */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-success" />
              </div>
              <span className="text-sm font-medium text-success">+100%</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {outboundCalls.filter(c => c.callStatus === 'enrolled').length}
            </div>
            <div className="text-sm text-gray-600">Enrolled</div>
          </Card>

          {/* Stage 4: Active */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-success">+94%</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {outboundCalls.filter(c => c.callStatus === 'enrolled').length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </Card>

          {/* Stage 5: Adherent */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <span className="text-sm font-medium text-success">+2.1%</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {Math.round(outboundCalls.filter(c => c.callStatus === 'enrolled').length * 0.94)}
            </div>
            <div className="text-sm text-gray-600">Adherent Patients</div>
          </Card>
        </div>
      </div>

      {/* View Toggle */}
      <Card className="p-6">
        <div className="flex gap-3">
          <Button variant={view === 'outbound' ? 'primary' : 'outline'} size="sm" onClick={() => setView('outbound')}>
            <PhoneOutgoing className="w-4 h-4 mr-2" />
            Proactive Patient Outreach
          </Button>
          <Button variant={view === 'inbound' ? 'primary' : 'outline'} size="sm" onClick={() => setView('inbound')}>
            <PhoneIncoming className="w-4 h-4 mr-2" />
            Inbound Patient Support
          </Button>
        </div>
      </Card>

      {/* Outbound View */}
      {view === 'outbound' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Outbound List */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Outbound Enrollment Pipeline</h3>
            <div className="space-y-3">
              {outboundCalls.map((call) => (
                <div
                  key={call.id}
                  onClick={() => setSelectedOutbound(call)}
                  className={`p-4 rounded-lg border-2 cursor-pointer ${
                    selectedOutbound?.id === call.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-gray-900">{call.patientName}</div>
                      <div className="text-sm text-gray-600">{call.medication}</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium border ${getCallStatusColor(call.callStatus)}`}>
                      {call.callStatus.toUpperCase().replace(/-/g, ' ')}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded border ${getDoctorConsentColor(call.doctorConsentStatus)}`}>
                      {call.doctorConsentStatus === 'obtained' ? <CheckCircle className="w-3 h-3" /> :
                       call.doctorConsentStatus === 'declined' ? <XCircle className="w-3 h-3" /> :
                       <Clock className="w-3 h-3" />}
                      <span>Dr: {call.doctorConsentStatus}</span>
                    </div>
                    <span className="text-gray-600">Attempts: {call.callAttempts}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Outbound Details */}
          <Card className="p-6">
            {selectedOutbound ? (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Enrollment Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Patient</div>
                    <div className="font-bold text-gray-900">{selectedOutbound.patientName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Prescribing Doctor</div>
                    <div className="font-bold text-gray-900">{selectedOutbound.prescribingDoctor}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Medication</div>
                    <div className="font-bold text-gray-900">{selectedOutbound.medication}</div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3">Consent Workflow</h4>

                    {/* Doctor Consent */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">1. Doctor Consent</span>
                        <div className={`px-2 py-1 rounded text-xs font-medium border ${getDoctorConsentColor(selectedOutbound.doctorConsentStatus)}`}>
                          {selectedOutbound.doctorConsentStatus === 'obtained' && <><CheckCircle className="w-3 h-3 inline mr-1" />Obtained</>}
                          {selectedOutbound.doctorConsentStatus === 'pending' && <><Clock className="w-3 h-3 inline mr-1" />Pending</>}
                          {selectedOutbound.doctorConsentStatus === 'declined' && <><XCircle className="w-3 h-3 inline mr-1" />Declined</>}
                        </div>
                      </div>
                      {selectedOutbound.doctorConsentDate && (
                        <div className="text-xs text-gray-600">Date: {selectedOutbound.doctorConsentDate}</div>
                      )}
                    </div>

                    {/* Patient Outreach */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">2. Patient Outreach</span>
                        <span className="text-xs text-gray-600">Attempts: {selectedOutbound.callAttempts}</span>
                      </div>
                      {selectedOutbound.lastCallAttempt && (
                        <div className="text-xs text-gray-600 mb-1">Last attempt: {selectedOutbound.lastCallAttempt}</div>
                      )}
                      {selectedOutbound.scheduledCallTime && (
                        <div className="text-xs text-primary font-medium">Next call: {selectedOutbound.scheduledCallTime}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Current Status</div>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getCallStatusColor(selectedOutbound.callStatus)}`}>
                      {selectedOutbound.callStatus.toUpperCase().replace(/-/g, ' ')}
                    </div>
                  </div>

                  {selectedOutbound.enrollmentDate && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Enrollment Date</div>
                      <div className="font-bold text-success">{selectedOutbound.enrollmentDate}</div>
                    </div>
                  )}

                  {selectedOutbound.doctorConsentStatus === 'obtained' && selectedOutbound.callStatus === 'ready-to-call' && (
                    <Button
                      className="w-full mt-4 flex items-center justify-center gap-2"
                      onClick={() => handleInitiateEnrollmentCall(selectedOutbound)}
                      disabled={isInitiatingCall}
                    >
                      <Phone className="w-4 h-4" />
                      {isInitiatingCall ? 'Initiating Call...' : 'Initiate Enrollment Call'}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p>Select an outbound call to view details</p>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Inbound View */}
      {view === 'inbound' && (
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
      )}
    </div>
  )
}
