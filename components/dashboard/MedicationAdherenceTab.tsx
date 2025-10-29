'use client'

import { useState } from 'react'
import { Phone, MessageSquare, AlertCircle, CheckCircle, Clock, TrendingUp, Activity, Calendar, Pill, User } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

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

const adherencePatients: AdherencePatient[] = [
  {
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
  {
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
  {
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
  {
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
  {
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
]

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

export default function MedicationAdherenceTab() {
  const [filterRisk, setFilterRisk] = useState<string>('all')

  const filteredPatients = filterRisk === 'all'
    ? adherencePatients
    : adherencePatients.filter(p => p.riskLevel === filterRisk)

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

  // Calculate metrics
  const avgAdherence = Math.round(
    adherencePatients.reduce((sum, p) => sum + p.adherenceRate, 0) / adherencePatients.length
  )
  const highRiskCount = adherencePatients.filter(p => p.riskLevel === 'high').length
  const totalCallsThisMonth = voiceCallRecords.length
  const callCompletionRate = Math.round(
    (voiceCallRecords.filter(c => c.outcome === 'completed').length / voiceCallRecords.length) * 100
  )

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">+3%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{avgAdherence}%</div>
          <div className="text-sm text-gray-600">Avg Adherence Rate</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">Needs Attention</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{highRiskCount}</div>
          <div className="text-sm text-gray-600">High Risk Patients</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">This Month</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{totalCallsThisMonth}</div>
          <div className="text-sm text-gray-600">Voice AI Calls</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">Success Rate</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{callCompletionRate}%</div>
          <div className="text-sm text-gray-600">Call Completion</div>
        </Card>
      </div>

      {/* Risk Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setFilterRisk('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filterRisk === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Patients ({adherencePatients.length})
          </button>
          <button
            onClick={() => setFilterRisk('high')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filterRisk === 'high' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            High Risk ({adherencePatients.filter(p => p.riskLevel === 'high').length})
          </button>
          <button
            onClick={() => setFilterRisk('medium')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filterRisk === 'medium' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Medium Risk ({adherencePatients.filter(p => p.riskLevel === 'medium').length})
          </button>
          <button
            onClick={() => setFilterRisk('low')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filterRisk === 'low' ? 'bg-success text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Low Risk ({adherencePatients.filter(p => p.riskLevel === 'low').length})
          </button>
        </div>
      </Card>

      {/* Patient List */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Patients</h3>
        <div className="space-y-3" style={{ maxHeight: 'calc(100vh - 400px)', overflowY: 'auto' }}>
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => {
                window.location.href = `/dashboard/adherence/${patient.id}`
              }}
              className="p-4 rounded-lg border-2 cursor-pointer transition-all border-gray-200 hover:border-primary hover:bg-primary/5"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{patient.patientName}</div>
                  <div className="text-xs text-gray-600 mt-1">{patient.medication}</div>
                </div>
                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getRiskColor(patient.riskLevel)}`}>
                  {patient.riskLevel.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <div className="text-xs text-gray-600">Adherence</div>
                  <div className={`text-lg font-bold ${getAdherenceColor(patient.adherenceRate)}`}>
                    {patient.adherenceRate}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Days Left</div>
                  <div className="text-lg font-bold text-gray-900">{patient.daysSupplyRemaining}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Total Calls</div>
                  <div className="text-lg font-bold text-primary">{patient.totalCalls}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600">
                Last call: {patient.lastCallDate} • {patient.lastCallType}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
