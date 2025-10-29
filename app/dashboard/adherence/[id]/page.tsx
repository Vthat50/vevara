'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Phone, MessageSquare, AlertCircle, CheckCircle, Clock, TrendingUp, Activity, Calendar, Pill, User, CreditCard } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'
import PostCallForm from '@/components/dashboard/PostCallForm'

interface AdherencePatient {
  id: string
  patientName: string
  medication: string
  adherenceRate: number
  lastRefillDate: string
  nextRefillDue: string
  daysSupplyRemaining: number
  riskLevel: 'low' | 'medium' | 'high'
  phoneNumber: string
  preferredContact: 'voice' | 'sms' | 'both'
  copayStatus: 'active' | 'inactive'
  totalCalls: number
  lastCallDate: string
  lastCallType: string
}

interface VoiceCallRecord {
  id: string
  patientId: string
  patientName: string
  callType: 'refill-reminder' | 'symptom-check' | 'adherence-checkin' | 'side-effect-monitoring'
  callDate: string
  callTime: string
  duration: string
  outcome: 'completed' | 'voicemail' | 'no-answer' | 'callback-requested'
  adherenceStatus?: string
  smsBackupSent: boolean
  transcript?: CallMessage[]
  notes?: string
}

interface CallMessage {
  speaker: 'AI' | 'Patient'
  time: string
  message: string
}

// Mock data - same as in MedicationAdherenceTab
const adherencePatients: { [key: string]: AdherencePatient } = {
  'AP001': {
    id: 'AP001',
    patientName: 'Michael Anderson',
    medication: 'AVONEX (interferon beta-1a)',
    adherenceRate: 92,
    lastRefillDate: 'Oct 15, 2024',
    nextRefillDue: 'Nov 12, 2024',
    daysSupplyRemaining: 15,
    riskLevel: 'low',
    phoneNumber: '5519882979',
    preferredContact: 'voice',
    copayStatus: 'active',
    totalCalls: 8,
    lastCallDate: 'Oct 28, 2024',
    lastCallType: 'Symptom Check'
  },
  'AP002': {
    id: 'AP002',
    patientName: 'Jennifer Martinez',
    medication: 'Dupixent 300mg',
    adherenceRate: 88,
    lastRefillDate: 'Oct 20, 2024',
    nextRefillDue: 'Nov 17, 2024',
    daysSupplyRemaining: 20,
    riskLevel: 'low',
    phoneNumber: '5551234789',
    preferredContact: 'both',
    copayStatus: 'active',
    totalCalls: 6,
    lastCallDate: 'Oct 27, 2024',
    lastCallType: 'Adherence Check-in'
  },
  'AP003': {
    id: 'AP003',
    patientName: 'Robert Johnson',
    medication: 'Humira 40mg',
    adherenceRate: 65,
    lastRefillDate: 'Oct 10, 2024',
    nextRefillDue: 'Nov 07, 2024',
    daysSupplyRemaining: 10,
    riskLevel: 'high',
    phoneNumber: '5559876543',
    preferredContact: 'voice',
    copayStatus: 'active',
    totalCalls: 12,
    lastCallDate: 'Oct 26, 2024',
    lastCallType: 'Refill Reminder'
  },
  'AP004': {
    id: 'AP004',
    patientName: 'Sarah Thompson',
    medication: 'Enbrel 50mg',
    adherenceRate: 78,
    lastRefillDate: 'Oct 18, 2024',
    nextRefillDue: 'Nov 15, 2024',
    daysSupplyRemaining: 18,
    riskLevel: 'medium',
    phoneNumber: '5552223333',
    preferredContact: 'sms',
    copayStatus: 'inactive',
    totalCalls: 5,
    lastCallDate: 'Oct 25, 2024',
    lastCallType: 'Side Effect Monitoring'
  },
  'AP005': {
    id: 'AP005',
    patientName: 'David Chen',
    medication: 'Stelara 90mg',
    adherenceRate: 95,
    lastRefillDate: 'Oct 22, 2024',
    nextRefillDue: 'Dec 17, 2024',
    daysSupplyRemaining: 50,
    riskLevel: 'low',
    phoneNumber: '5553334444',
    preferredContact: 'voice',
    copayStatus: 'active',
    totalCalls: 4,
    lastCallDate: 'Oct 22, 2024',
    lastCallType: 'Adherence Check-in'
  }
}

const voiceCallRecords: VoiceCallRecord[] = [
  {
    id: 'VC001',
    patientId: 'AP001',
    patientName: 'Michael Anderson',
    callType: 'symptom-check',
    callDate: 'Oct 28, 2024',
    callTime: '10:30 AM',
    duration: '4:23',
    outcome: 'completed',
    adherenceStatus: 'On track with medication',
    smsBackupSent: false,
    notes: 'Patient reported mild injection site redness, provided education on management',
    transcript: [
      { speaker: 'AI', time: '10:30:00', message: "Hello, this is calling from the AVONEX Patient Support Program. May I speak with Michael Anderson?" },
      { speaker: 'Patient', time: '10:30:05', message: "Yes, this is Michael speaking." },
      { speaker: 'AI', time: '10:30:08', message: "Hi Michael! This is a routine check-in call to see how you're doing with your AVONEX treatment. Do you have a few minutes to talk?" },
      { speaker: 'Patient', time: '10:30:15', message: "Sure, I can talk now." },
      { speaker: 'AI', time: '10:30:18', message: "Great! First, I wanted to check - have you been taking your AVONEX injections as prescribed?" },
      { speaker: 'Patient', time: '10:30:25', message: "Yes, I've been doing my weekly injections on schedule." },
      { speaker: 'AI', time: '10:30:30', message: "That's excellent! Now, I'd like to ask about any symptoms you may be experiencing. Have you noticed any side effects since your last injection?" },
      { speaker: 'Patient', time: '10:30:40', message: "Actually, yes. I've had some redness at the injection site. It's not too bad, but I wanted to mention it." },
      { speaker: 'AI', time: '10:30:50', message: "Thank you for letting me know. Mild redness at the injection site is actually quite common with AVONEX. Can you tell me - is the redness painful, warm to touch, or spreading?" },
      { speaker: 'Patient', time: '10:31:00', message: "It's a little warm but not really painful. It usually goes away after a day or two." },
      { speaker: 'AI', time: '10:31:10', message: "That sounds like a normal reaction. To help manage this, you can apply a cool compress to the area for 10-15 minutes after injection. Also, make sure you're rotating injection sites each week. Are you doing that?" },
      { speaker: 'Patient', time: '10:31:25', message: "I am rotating, but I'll try the cool compress. That's helpful." },
      { speaker: 'AI', time: '10:31:30', message: "Perfect! Have you experienced any other symptoms like flu-like symptoms, fever, or unusual fatigue?" },
      { speaker: 'Patient', time: '10:31:40', message: "No, nothing like that. Just the redness." },
      { speaker: 'AI', time: '10:31:45', message: "That's good to hear. Your next refill is due on November 12th. You currently have about 15 days of supply remaining. Would you like me to help coordinate your refill?" },
      { speaker: 'Patient', time: '10:31:55', message: "Yes, that would be great. Can you have it shipped to my home address?" },
      { speaker: 'AI', time: '10:32:00', message: "Absolutely! I'll make a note for the pharmacy to ship it to your home address on file. You should receive it a few days before you run out. Is there anything else you'd like to discuss about your treatment?" },
      { speaker: 'Patient', time: '10:32:15', message: "No, I think that covers everything. Thank you for checking in." },
      { speaker: 'AI', time: '10:32:20', message: "You're very welcome, Michael! We'll continue to monitor your progress and check in regularly. If you have any concerns before our next call, please don't hesitate to reach out to the support line. Take care!" },
      { speaker: 'Patient', time: '10:32:30', message: "Thanks, will do. Goodbye!" }
    ]
  },
  {
    id: 'VC002',
    patientId: 'AP002',
    patientName: 'Jennifer Martinez',
    callType: 'adherence-checkin',
    callDate: 'Oct 27, 2024',
    callTime: '2:15 PM',
    duration: '3:45',
    outcome: 'completed',
    adherenceStatus: 'Good adherence, continuing treatment',
    smsBackupSent: false,
    notes: 'Patient adherent, reported improvement in symptoms',
    transcript: [
      { speaker: 'AI', time: '14:15:00', message: "Hello, this is calling from your Dupixent Patient Support Program. Is this Jennifer Martinez?" },
      { speaker: 'Patient', time: '14:15:04', message: "Yes, this is Jennifer." },
      { speaker: 'AI', time: '14:15:07', message: "Hi Jennifer! I'm calling for your routine adherence check-in. How have you been doing with your Dupixent injections?" },
      { speaker: 'Patient', time: '14:15:15', message: "I've been doing really well! I haven't missed any doses." },
      { speaker: 'AI', time: '14:15:20', message: "That's wonderful to hear! Consistency is so important for Dupixent to work effectively. Have you noticed any improvements in your atopic dermatitis symptoms?" },
      { speaker: 'Patient', time: '14:15:30', message: "Yes, actually. My skin is much better. The itching has decreased a lot, and I'm sleeping better because of it." },
      { speaker: 'AI', time: '14:15:40', message: "That's fantastic progress, Jennifer! It's great that the treatment is working well for you. Are you experiencing any side effects or concerns with the medication?" },
      { speaker: 'Patient', time: '14:15:50', message: "Not really. Sometimes my eyes feel a little dry, but it's manageable." },
      { speaker: 'AI', time: '14:16:00', message: "Eye dryness can occur with Dupixent. Are you using artificial tears or any eye drops for this?" },
      { speaker: 'Patient', time: '14:16:08', message: "Yes, I have some over-the-counter eye drops that help." },
      { speaker: 'AI', time: '14:16:15', message: "Perfect. If the dryness gets worse or you notice any vision changes, please contact your doctor right away. Now, let's talk about your refills. Your next refill is due on November 17th. Would you like me to coordinate that for you?" },
      { speaker: 'Patient', time: '14:16:30', message: "Yes, please. Same as usual - delivery to my home." },
      { speaker: 'AI', time: '14:16:35', message: "I'll arrange that for you. You should receive your shipment by November 15th. Also, I wanted to remind you that your copay assistance card is active and will automatically apply to your refill." },
      { speaker: 'Patient', time: '14:16:48', message: "Great, thank you! That's been such a help financially." },
      { speaker: 'AI', time: '14:16:53', message: "We're glad we can help make your treatment more affordable. Is there anything else you need assistance with today?" },
      { speaker: 'Patient', time: '14:17:00', message: "No, I think that's everything. Thank you for calling." },
      { speaker: 'AI', time: '14:17:05', message: "You're very welcome! Keep up the great work with your treatment, Jennifer. We'll check in again in a few weeks. Have a wonderful day!" },
      { speaker: 'Patient', time: '14:17:12', message: "You too, thanks!" }
    ]
  },
  {
    id: 'VC003',
    patientId: 'AP003',
    patientName: 'Robert Johnson',
    callType: 'refill-reminder',
    callDate: 'Oct 26, 2024',
    callTime: '11:00 AM',
    duration: '2:30',
    outcome: 'completed',
    adherenceStatus: 'Refill scheduled',
    smsBackupSent: true,
    notes: 'Patient was running low, immediate refill coordinated',
    transcript: [
      { speaker: 'AI', time: '11:00:00', message: "Hello, this is calling from your Humira Patient Support Program. May I speak with Robert Johnson?" },
      { speaker: 'Patient', time: '11:00:05', message: "Speaking." },
      { speaker: 'AI', time: '11:00:07', message: "Hi Robert! I'm calling to remind you that your Humira refill is due on November 7th, which is coming up soon. I see you have about 10 days of supply remaining. Have you had a chance to request your refill yet?" },
      { speaker: 'Patient', time: '11:00:20', message: "Oh no, I forgot about that. I've been really busy with work." },
      { speaker: 'AI', time: '11:00:25', message: "No worries, that's why I'm calling! I can help you coordinate your refill right now so you don't run out. Would that work for you?" },
      { speaker: 'Patient', time: '11:00:33', message: "Yes, that would be great. Thank you." },
      { speaker: 'AI', time: '11:00:37', message: "Perfect! I'll contact the specialty pharmacy and have them process your refill today. They'll ship it to your address on file. You should receive it within 3-5 business days. Is your current address still correct?" },
      { speaker: 'Patient', time: '11:00:50', message: "Yes, same address." },
      { speaker: 'AI', time: '11:00:53', message: "Great! I'm also sending you a text message confirmation with your refill details. Now, while I have you - how are you doing with taking your Humira as prescribed?" },
      { speaker: 'Patient', time: '11:01:05', message: "I've been taking it, but I'll be honest - I've missed a couple doses over the past month." },
      { speaker: 'AI', time: '11:01:15', message: "I appreciate your honesty, Robert. Staying consistent with Humira is important for managing your rheumatoid arthritis effectively. Is there anything making it difficult for you to take it regularly? Cost concerns, side effects, or just remembering?" },
      { speaker: 'Patient', time: '11:01:30', message: "Mostly just forgetting when I have a busy week." },
      { speaker: 'AI', time: '11:01:35', message: "That's a common challenge. Would you like me to set up reminder calls or text messages before each dose is due? We can customize the timing to work with your schedule." },
      { speaker: 'Patient', time: '11:01:48', message: "Yeah, text reminders would actually be really helpful." },
      { speaker: 'AI', time: '11:01:53', message: "Perfect! I'll set that up for you. You'll receive a text reminder the day before each dose is due. This should help you stay on track. Is there anything else I can help you with today?" },
      { speaker: 'Patient', time: '11:02:05', message: "No, that covers it. Thanks for the help." },
      { speaker: 'AI', time: '11:02:10', message: "You're welcome, Robert! Your refill is being processed, and you'll receive confirmation soon. Take care and we'll be in touch!" },
      { speaker: 'Patient', time: '11:02:18', message: "Thanks, bye." }
    ]
  },
  {
    id: 'VC004',
    patientId: 'AP004',
    patientName: 'Sarah Thompson',
    callType: 'side-effect-monitoring',
    callDate: 'Oct 25, 2024',
    callTime: '3:45 PM',
    duration: '5:12',
    outcome: 'completed',
    adherenceStatus: 'Monitoring needed - reported side effects',
    smsBackupSent: false,
    notes: 'Patient reported injection site reactions and headaches - escalated to nurse educator for follow-up',
    transcript: [
      { speaker: 'AI', time: '15:45:00', message: "Hello, is this Sarah Thompson?" },
      { speaker: 'Patient', time: '15:45:03', message: "Yes, this is Sarah." },
      { speaker: 'AI', time: '15:45:06', message: "Hi Sarah! This is calling from your Enbrel Patient Support Program. I'm calling to check in on how you're feeling with your treatment. Do you have a few minutes?" },
      { speaker: 'Patient', time: '15:45:15', message: "Yes, actually I'm glad you called. I've been having some issues." },
      { speaker: 'AI', time: '15:45:22', message: "I'm sorry to hear that. Can you tell me what's been going on?" },
      { speaker: 'Patient', time: '15:45:28', message: "Well, after my injections, the site gets really red and swollen. It's quite painful for a day or two. And I've been getting bad headaches." },
      { speaker: 'AI', time: '15:45:42', message: "Thank you for sharing that with me, Sarah. I want to ask a few questions to better understand what you're experiencing. First, regarding the injection site - is the redness spreading beyond the immediate injection area?" },
      { speaker: 'Patient', time: '15:45:55', message: "It's about the size of a quarter, maybe a little bigger. It's warm and tender." },
      { speaker: 'AI', time: '15:46:03', message: "And does it improve after a day or two, or does it stay red and swollen?" },
      { speaker: 'Patient', time: '15:46:10', message: "It usually gets better after two days, but it's uncomfortable while it lasts." },
      { speaker: 'AI', time: '15:46:18', message: "I understand. Now about the headaches - when do they typically occur in relation to your injection?" },
      { speaker: 'Patient', time: '15:46:28', message: "Usually within a few hours after I take it. They last most of the day." },
      { speaker: 'AI', time: '15:46:36', message: "Are these headaches severe enough that they interfere with your daily activities?" },
      { speaker: 'Patient', time: '15:46:43', message: "Sometimes, yes. I've had to take the day off work a couple times because of them." },
      { speaker: 'AI', time: '15:46:52', message: "I appreciate you sharing all this information. While some injection site reactions and mild headaches can be normal side effects of Enbrel, what you're describing sounds like it's significantly impacting your quality of life. I'd like to connect you with one of our nurse educators who can discuss this in more detail with you and potentially coordinate with your doctor." },
      { speaker: 'Patient', time: '15:47:10', message: "Okay, that sounds good. I wasn't sure if this was normal or not." },
      { speaker: 'AI', time: '15:47:16', message: "It's always better to check and make sure. In the meantime, for the injection site reaction, you can try applying a cool compress. And have you been rotating your injection sites?" },
      { speaker: 'Patient', time: '15:47:28', message: "I try to, but I mostly use my thighs." },
      { speaker: 'AI', time: '15:47:33', message: "It's important to rotate between different areas - thighs, abdomen, and upper arms if you can reach. This can help reduce site reactions. I'm going to have a nurse educator call you within the next 24 hours to discuss your symptoms more thoroughly. Is this the best number to reach you?" },
      { speaker: 'Patient', time: '15:47:52', message: "Yes, this number is fine. When should I expect the call?" },
      { speaker: 'AI', time: '15:47:58', message: "You should hear from them by tomorrow afternoon at the latest. They'll also discuss whether you need to contact your prescribing doctor. In the meantime, if your symptoms get worse - especially if you develop a fever, the redness spreads significantly, or you have severe pain - please contact your doctor right away." },
      { speaker: 'Patient', time: '15:48:18', message: "Okay, I will. Thank you for taking this seriously." },
      { speaker: 'AI', time: '15:48:23', message: "Of course, Sarah. Your comfort and safety are our top priority. Before I let you go - are you still planning to continue with your medication, or have these side effects made you consider stopping?" },
      { speaker: 'Patient', time: '15:48:38', message: "I want to keep taking it because it does help my psoriasis. I just wish the side effects weren't so bad." },
      { speaker: 'AI', time: '15:48:48', message: "That's understandable. The nurse will work with you to see if there are ways to manage these side effects better. Is there anything else you'd like to discuss?" },
      { speaker: 'Patient', time: '15:48:58', message: "No, I think that covers everything. I'll wait for the nurse to call." },
      { speaker: 'AI', time: '15:49:03', message: "Perfect. Thank you for being so open about your experience, Sarah. We're here to support you. Take care, and someone will be in touch soon!" },
      { speaker: 'Patient', time: '15:49:12', message: "Thank you, goodbye." }
    ]
  },
  {
    id: 'VC005',
    patientId: 'AP001',
    patientName: 'Michael Anderson',
    callType: 'refill-reminder',
    callDate: 'Oct 15, 2024',
    callTime: '9:00 AM',
    duration: '1:45',
    outcome: 'voicemail',
    smsBackupSent: true,
    notes: 'Left voicemail, sent SMS backup reminder'
  },
  {
    id: 'VC006',
    patientId: 'AP005',
    patientName: 'David Chen',
    callType: 'adherence-checkin',
    callDate: 'Oct 22, 2024',
    callTime: '4:30 PM',
    duration: '2:15',
    outcome: 'completed',
    adherenceStatus: 'Excellent adherence',
    smsBackupSent: false,
    notes: 'Patient highly adherent, no concerns reported'
  }
]

export default function PatientAdherencePage() {
  const params = useParams()
  const router = useRouter()
  const patientId = params.id as string

  const patient = adherencePatients[patientId]
  const patientCalls = voiceCallRecords.filter(call => call.patientId === patientId)

  // State for managing form data for each call
  const [callFormData, setCallFormData] = useState<{ [callId: string]: any }>({})
  const [expandedForms, setExpandedForms] = useState<{ [callId: string]: boolean }>({})

  // Auto-expand and auto-fill forms for calls with transcripts on page load
  useEffect(() => {
    if (patientCalls.length > 0) {
      const initialExpandedState: { [callId: string]: boolean } = {}
      patientCalls.forEach(call => {
        // Auto-expand if call has transcript and no saved data yet
        if (call.transcript && call.transcript.length > 0 && !callFormData[call.id]) {
          initialExpandedState[call.id] = true
        }
      })
      setExpandedForms(initialExpandedState)
    }
  }, [patientCalls.length]) // Only run on mount

  const handleSaveFormData = (callId: string, data: any) => {
    setCallFormData(prev => ({
      ...prev,
      [callId]: data
    }))
    console.log('Saved form data for call:', callId, data)
    // In production, this would send to backend API
  }

  const toggleFormExpanded = (callId: string) => {
    setExpandedForms(prev => ({
      ...prev,
      [callId]: !prev[callId]
    }))
  }

  // Highlight medical keywords in transcript (like Nurodot)
  const highlightKeywords = (text: string) => {
    const keywords = {
      sideEffects: ['redness', 'headache', 'pain', 'painful', 'swollen', 'nausea', 'fever', 'fatigue', 'dizziness', 'dry', 'rash', 'reaction', 'injection site'],
      adherence: ['taking', 'prescribed', 'schedule', 'on track', 'adherent', 'doing well', 'missed', 'forgot'],
      positive: ['improved', 'better', 'helpful', 'working', 'great']
    }

    const allKeywords = [...keywords.sideEffects, ...keywords.adherence, ...keywords.positive]
    const regex = new RegExp(`\\b(${allKeywords.join('|')})\\w*\\b`, 'gi')

    const parts = text.split(regex)

    return parts.map((part, index) => {
      const lowerPart = part.toLowerCase()
      if (keywords.sideEffects.some(kw => lowerPart.includes(kw))) {
        return (
          <span key={index} className="bg-yellow-200 text-yellow-900 font-semibold px-1 rounded">
            {part}
          </span>
        )
      }
      if (keywords.adherence.some(kw => lowerPart.includes(kw))) {
        return (
          <span key={index} className="bg-green-200 text-green-900 font-semibold px-1 rounded">
            {part}
          </span>
        )
      }
      if (keywords.positive.some(kw => lowerPart.includes(kw))) {
        return (
          <span key={index} className="bg-blue-200 text-blue-900 font-semibold px-1 rounded">
            {part}
          </span>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="p-6">
            <p className="text-center text-gray-500">Patient not found</p>
            <Button className="mt-4" onClick={() => router.push('/dashboard?tab=medication-adherence')}>
              Back to Medication Adherence
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  const getRiskColor = (risk: AdherencePatient['riskLevel']) => {
    switch (risk) {
      case 'low': return 'bg-success/10 text-success border-success/20'
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/20'
    }
  }

  const getAdherenceColor = (rate: number) => {
    if (rate >= 80) return 'text-success'
    if (rate >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getCallTypeLabel = (type: VoiceCallRecord['callType']) => {
    switch (type) {
      case 'refill-reminder': return 'Refill Reminder'
      case 'symptom-check': return 'Symptom Check'
      case 'adherence-checkin': return 'Adherence Check-in'
      case 'side-effect-monitoring': return 'Side Effect Monitoring'
    }
  }

  const getCallTypeIcon = (type: VoiceCallRecord['callType']) => {
    switch (type) {
      case 'refill-reminder': return <Pill className="w-4 h-4" />
      case 'symptom-check': return <Activity className="w-4 h-4" />
      case 'adherence-checkin': return <CheckCircle className="w-4 h-4" />
      case 'side-effect-monitoring': return <AlertCircle className="w-4 h-4" />
    }
  }

  const getOutcomeColor = (outcome: VoiceCallRecord['outcome']) => {
    switch (outcome) {
      case 'completed': return 'bg-success/10 text-success'
      case 'voicemail': return 'bg-blue-500/10 text-blue-600'
      case 'no-answer': return 'bg-gray-500/10 text-gray-600'
      case 'callback-requested': return 'bg-yellow-500/10 text-yellow-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={() => router.push('/dashboard?tab=medication-adherence')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Patients
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{patient.patientName} - Adherence Tracking</h1>
            <p className="text-gray-600">{patient.medication}</p>
          </div>
        </div>

        {/* Patient Overview */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Patient Overview</h2>
          <div className="grid md:grid-cols-5 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">Adherence Rate</div>
              <div className={`text-3xl font-bold ${getAdherenceColor(patient.adherenceRate)}`}>
                {patient.adherenceRate}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Risk Level</div>
              <span className={`inline-block px-3 py-1 rounded-md text-sm font-medium border ${getRiskColor(patient.riskLevel)}`}>
                {patient.riskLevel.toUpperCase()}
              </span>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Days Supply Left</div>
              <div className="text-3xl font-bold text-gray-900">{patient.daysSupplyRemaining}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Total Calls</div>
              <div className="text-3xl font-bold text-primary">{patient.totalCalls}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Copay Card</div>
              <div className={`text-sm font-bold ${patient.copayStatus === 'active' ? 'text-success' : 'text-red-600'}`}>
                {patient.copayStatus === 'active' ? '✓ ACTIVE' : '✗ INACTIVE'}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Calendar className="w-4 h-4" />
                Last Refill
              </div>
              <div className="font-medium text-gray-900">{patient.lastRefillDate}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Calendar className="w-4 h-4" />
                Next Refill Due
              </div>
              <div className="font-medium text-gray-900">{patient.nextRefillDue}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Phone className="w-4 h-4" />
                Contact
              </div>
              <div className="font-medium text-gray-900">{patient.phoneNumber}</div>
              <div className="text-xs text-gray-500 mt-1">
                Preferred: {patient.preferredContact.toUpperCase()}
              </div>
            </div>
          </div>
        </Card>

        {/* Call History & Transcripts */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Call History & Transcripts</h2>
          <div className="space-y-6">
            {patientCalls.length > 0 ? (
              patientCalls.map((call) => (
                <div key={call.id} className="border border-gray-200 rounded-lg p-4">
                  {/* Call Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        {getCallTypeIcon(call.callType)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{getCallTypeLabel(call.callType)}</div>
                        <div className="text-sm text-gray-600">{call.callDate} at {call.callTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded text-sm font-medium ${getOutcomeColor(call.outcome)}`}>
                        {call.outcome.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">{call.duration}</span>
                    </div>
                  </div>

                  {/* SMS Backup & Notes */}
                  {(call.smsBackupSent || call.notes) && (
                    <div className="flex items-center gap-4 mb-4">
                      {call.smsBackupSent && (
                        <div className="flex items-center gap-1 text-sm text-blue-600">
                          <MessageSquare className="w-4 h-4" />
                          SMS backup sent
                        </div>
                      )}
                      {call.notes && (
                        <div className="flex-1 p-3 bg-blue-50 rounded-lg">
                          <div className="text-xs font-medium text-blue-900 mb-1">Call Summary:</div>
                          <div className="text-sm text-blue-700">{call.notes}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Adherence Status */}
                  {call.adherenceStatus && (
                    <div className="mb-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium text-success">{call.adherenceStatus}</span>
                      </div>
                    </div>
                  )}

                  {/* Post-Call Documentation Form */}
                  <div className="mb-4">
                    <button
                      onClick={() => toggleFormExpanded(call.id)}
                      className="w-full text-left px-4 py-3 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="font-medium text-primary text-sm">
                            {callFormData[call.id] ? '✓ Documentation Completed' : 'Complete Post-Call Documentation'}
                          </span>
                        </div>
                        <span className="text-xs text-primary">
                          {expandedForms[call.id] ? 'Hide Form' : 'Show Form'}
                        </span>
                      </div>
                    </button>

                    {expandedForms[call.id] && (
                      <div className="mt-3">
                        <PostCallForm
                          callId={call.id}
                          patientName={patient.patientName}
                          callDate={call.callDate}
                          transcript={call.transcript}
                          existingData={callFormData[call.id]}
                          onSave={(data) => handleSaveFormData(call.id, data)}
                        />
                      </div>
                    )}
                  </div>

                  {/* Transcript - Nurodot Style */}
                  {call.transcript ? (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4 text-xl">Full Transcript</h3>
                      <div className="space-y-4 min-h-[600px] max-h-[800px] overflow-y-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-lg">
                        {call.transcript.map((message, idx) => (
                          <div key={idx} className={`flex gap-4 ${message.speaker === 'AI' ? '' : 'flex-row-reverse'}`}>
                            {/* Avatar Circle */}
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                              message.speaker === 'AI' ? 'bg-blue-500' : 'bg-green-500'
                            }`}>
                              {message.speaker === 'AI' ? (
                                <MessageSquare className="h-5 w-5 text-white" />
                              ) : (
                                <User className="h-5 w-5 text-white" />
                              )}
                            </div>

                            {/* Message Bubble */}
                            <div className="flex-1 max-w-[75%]">
                              <div className={`${message.speaker === 'Patient' ? 'ml-auto' : ''} inline-block p-4 rounded-lg shadow-sm ${
                                message.speaker === 'AI'
                                  ? 'bg-white border border-slate-200'
                                  : 'bg-green-100 border border-green-200'
                              }`}>
                                <p className="text-sm sm:text-base text-slate-900 leading-relaxed">
                                  {highlightKeywords(message.message)}
                                </p>
                                <p className="text-xs text-slate-500 mt-2">{message.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-lg">
                      <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm">No transcript available for this call</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No call history for this patient
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
