'use client'

import { useState } from 'react'
import { Phone, Clock, CheckCircle, XCircle, FileCheck, UserCheck, Activity, CreditCard, Shield, Mail, MessageSquare, DollarSign, AlertCircle, Users, TrendingUp, CheckCircle2 } from 'lucide-react'
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
  callDuration?: string
}

interface OutboundTranscriptMessage {
  speaker: 'AI' | 'Patient'
  time: string
  message: string
}

interface OutboundTranscript {
  callId: string
  messages: OutboundTranscriptMessage[]
  outcome: string
}

interface CopayEnrollment {
  id: string
  patientName: string
  medication: string
  insurance: string
  phone: string
  email: string
  status: 'eligibility-check' | 'verification-pending' | 'approved' | 'enrolled' | 'declined'
  eligibilityStatus?: 'eligible' | 'not-eligible' | 'pending'
  copayAmount?: string
  savingsAmount?: string
  cardNumber?: string
  activationDate?: string
  expirationDate?: string
  lastUpdated: string
  enrollmentDate?: string
  confirmationSent?: boolean
  followUpScheduled?: string
}

interface EnrollmentTranscript {
  enrollmentId: string
  messages: Array<{
    speaker: 'AI' | 'Patient'
    time: string
    message: string
  }>
  outcome: string
}

const outboundCalls: OutboundCall[] = [
  {
    id: 'OB001',
    patientName: 'Michael Anderson',
    prescribingDoctor: 'Dr. Michael Cheng',
    medication: 'AVONEX (interferon beta-1a)',
    phone: '5519882979',
    doctorConsentStatus: 'obtained',
    doctorConsentDate: 'Oct 26, 2024',
    patientConsentStatus: 'accepted',
    callAttempts: 1,
    lastCallAttempt: 'Today 3:15 PM',
    callStatus: 'enrolled',
    enrollmentDate: 'Today',
    callDuration: '5:23'
  },
  {
    id: 'OB002',
    patientName: 'Jennifer Martinez',
    prescribingDoctor: 'Dr. Sarah Williams',
    medication: 'Dupixent 300mg',
    phone: '+15551234789',
    doctorConsentStatus: 'obtained',
    doctorConsentDate: 'Oct 25, 2024',
    patientConsentStatus: 'accepted',
    callAttempts: 1,
    lastCallAttempt: 'Today 2:30 PM',
    callStatus: 'enrolled',
    enrollmentDate: 'Today',
    callDuration: '4:45'
  },
  {
    id: 'OB003',
    patientName: 'Sarah Thompson',
    prescribingDoctor: 'Dr. Michael Chen',
    medication: 'Humira 40mg',
    phone: '+15551234568',
    doctorConsentStatus: 'obtained',
    doctorConsentDate: 'Oct 26, 2024',
    patientConsentStatus: 'accepted',
    callAttempts: 1,
    lastCallAttempt: 'Today 10:15 AM',
    callStatus: 'ready-to-call'
  },
  {
    id: 'OB004',
    patientName: 'James Wilson',
    prescribingDoctor: 'Dr. James Liu',
    medication: 'Ozempic 0.5mg',
    phone: '+15551234569',
    doctorConsentStatus: 'obtained',
    doctorConsentDate: 'Oct 27, 2024',
    patientConsentStatus: 'pending',
    callAttempts: 2,
    lastCallAttempt: 'Today 11:00 AM',
    scheduledCallTime: 'Today 3:00 PM',
    callStatus: 'attempted'
  },
  {
    id: 'OB005',
    patientName: 'Emily Rodriguez',
    prescribingDoctor: 'Dr. Emily Rodriguez',
    medication: 'Trulicity 1.5mg',
    phone: '+15551234570',
    doctorConsentStatus: 'pending',
    patientConsentStatus: 'not-contacted',
    callAttempts: 0,
    callStatus: 'awaiting-doctor-consent'
  },
  {
    id: 'OB006',
    patientName: 'Robert Chen',
    prescribingDoctor: 'Dr. Robert Johnson',
    medication: 'Enbrel 50mg',
    phone: '+15551234571',
    doctorConsentStatus: 'declined',
    doctorConsentDate: 'Oct 26, 2024',
    patientConsentStatus: 'not-contacted',
    callAttempts: 0,
    callStatus: 'declined'
  }
]

const outboundTranscripts: OutboundTranscript[] = [
  {
    callId: 'OB001',
    outcome: 'Patient successfully enrolled in AVONEX copay assistance program',
    messages: [
      { speaker: 'AI', time: '15:15:00', message: "Hello, is this Michael Anderson?" },
      { speaker: 'Patient', time: '15:15:03', message: "Yes, this is Michael speaking." },
      { speaker: 'AI', time: '15:15:05', message: "Hi Michael! My name is Sarah, and I'm calling from the Biogen patient support program. Your doctor, Dr. Michael Cheng, recently prescribed AVONEX for your Multiple Sclerosis and referred you to our copay assistance program. Do you have a few minutes to chat about this?" },
      { speaker: 'Patient', time: '15:15:22', message: "Oh yes! Dr. Cheng mentioned something about this. I'd love to hear more." },
      { speaker: 'AI', time: '15:15:28', message: "Wonderful! Our copay assistance program is designed to help reduce your out-of-pocket costs for AVONEX. Many patients find that their insurance copay can be quite high, and this program can help significantly. Let me check your eligibility in real-time." },
      { speaker: 'Patient', time: '15:15:52', message: "That sounds really helpful. My insurance copay is $175 per month, which is pretty steep for my MS treatment." },
      { speaker: 'AI', time: '15:16:02', message: "I completely understand your concerns. Let me pull up your insurance information... Great news! You're eligible for our copay assistance program. With your Blue Cross Blue Shield insurance, we can reduce your copay from $175 per month to just $0 per month." },
      { speaker: 'Patient', time: '15:16:25', message: "Wait, zero dollars? That's incredible! How does this work?" },
      { speaker: 'AI', time: '15:16:31', message: "It's actually quite simple! This is a manufacturer-sponsored program. When you pick up your AVONEX prescription, you'll provide your pharmacist with a copay card along with your regular insurance card. The pharmacy processes both, and the copay assistance automatically reduces your out-of-pocket cost to $0." },
      { speaker: 'Patient', time: '15:16:55', message: "And there's no catch? This is really free?" },
      { speaker: 'AI', time: '15:17:00', message: "Absolutely no catch! The card is valid for 12 months and can save you up to $175 per month - that's up to $2,100 per year. The goal is simply to help patients like you afford your medication and stay on track with your MS treatment." },
      { speaker: 'Patient', time: '15:17:20', message: "Well that's amazing. I'm definitely interested. What do I need to do to sign up?" },
      { speaker: 'AI', time: '15:17:26', message: "Great! I just need to verify a few details and get your consent. First, can you confirm your date of birth for me?" },
      { speaker: 'Patient', time: '15:17:34', message: "Sure, it's January 1st, 1976." },
      { speaker: 'AI', time: '15:17:39', message: "Perfect, thank you. And I have your insurance as Blue Cross Blue Shield, policy number f2. Is that correct?" },
      { speaker: 'Patient', time: '15:17:48', message: "Yes, that's correct." },
      { speaker: 'AI', time: '15:17:50', message: "Excellent. Now, to enroll you in the copay assistance program, I need your verbal consent. This program will provide you with a copay card that reduces your out-of-pocket costs. Do you consent to participate in this program?" },
      { speaker: 'Patient', time: '15:18:10', message: "Yes, I consent. I'm happy to participate." },
      { speaker: 'AI', time: '15:18:14', message: "Wonderful! Thank you, Michael. I'm processing your enrollment now... Your copay card has been activated! Your card number ends in 5623, and it's valid through October 28th, 2025." },
      { speaker: 'Patient', time: '15:18:40', message: "That's fantastic! How will I get the card information?" },
      { speaker: 'AI', time: '15:18:45', message: "You'll receive both a text message and an email within the next 5 minutes with all your card details and instructions. You can show the digital card on your phone at the pharmacy, or you can print it out if you prefer." },
      { speaker: 'Patient', time: '15:18:58', message: "Perfect. And I just give this to the pharmacist when I pick up my AVONEX prescription?" },
      { speaker: 'AI', time: '15:19:02', message: "Exactly! Just present both your insurance card and your copay card to the pharmacist. They'll process both, and you'll see your copay reduced to $0. It's that simple." },
      { speaker: 'Patient', time: '15:19:20', message: "This is such a relief. I was worried about affording this medication long-term with my MS." },
      { speaker: 'AI', time: '15:19:24', message: "I'm so glad we could help! We want to make sure cost isn't a barrier to your treatment. I've also scheduled a follow-up call for next week to make sure everything went smoothly at the pharmacy and answer any questions you might have." },
      { speaker: 'Patient', time: '15:19:45', message: "That would be great. Thank you so much for all your help!" },
      { speaker: 'AI', time: '15:19:52', message: "You're very welcome, Michael! Remember, if you have any questions about using your copay card before our follow-up call, you can reach our support line 24/7. Is there anything else I can help you with today?" },
      { speaker: 'Patient', time: '15:20:08', message: "No, I think that covers everything. I really appreciate this." },
      { speaker: 'AI', time: '15:20:18', message: "My pleasure! Watch for that confirmation text and email in the next few minutes. We're excited to support you on your MS treatment journey. Have a wonderful day, Michael!" },
      { speaker: 'Patient', time: '15:20:40', message: "You too! Thanks again!" },
      { speaker: 'AI', time: '15:20:47', message: "You're welcome! Goodbye!" }
    ]
  },
  {
    callId: 'OB002',
    outcome: 'Patient successfully enrolled in Dupixent copay assistance program',
    messages: [
      { speaker: 'AI', time: '14:30:00', message: "Hello, is this Jennifer Martinez?" },
      { speaker: 'Patient', time: '14:30:03', message: "Yes, this is Jennifer speaking." },
      { speaker: 'AI', time: '14:30:05', message: "Hi Jennifer! My name is Alex, and I'm calling from the patient support program. Your doctor, Dr. Sarah Williams, recently prescribed Dupixent for your Atopic Dermatitis and referred you to our copay assistance program. Do you have a few minutes to talk?" },
      { speaker: 'Patient', time: '14:30:22', message: "Yes! Dr. Williams mentioned this. I'd love to hear about it." },
      { speaker: 'AI', time: '14:30:28', message: "Wonderful! Our copay assistance program helps reduce your out-of-pocket costs for Dupixent. Let me check your eligibility..." },
      { speaker: 'Patient', time: '14:30:42', message: "That would be really helpful. My copay is $150 per month." },
      { speaker: 'AI', time: '14:30:52', message: "Great news! You're eligible. With your Blue Cross Blue Shield insurance, we can reduce your copay from $150 per month to $0 per month." },
      { speaker: 'Patient', time: '14:31:15', message: "Zero dollars? That's amazing! How does it work?" },
      { speaker: 'AI', time: '14:31:21', message: "You'll receive a copay card to present at the pharmacy along with your insurance card. The pharmacy processes both, reducing your cost to $0." },
      { speaker: 'Patient', time: '14:31:45', message: "I'm ready to sign up!" },
      { speaker: 'AI', time: '14:31:50', message: "Perfect! Let me verify your date of birth." },
      { speaker: 'Patient', time: '14:31:58', message: "May 12th, 1985." },
      { speaker: 'AI', time: '14:32:03', message: "Thank you. Your copay card has been activated and ends in 4521. You'll receive confirmation via text and email shortly." },
      { speaker: 'Patient', time: '14:32:28', message: "Thank you so much! This is such a relief!" },
      { speaker: 'AI', time: '14:32:35', message: "You're welcome, Jennifer! Have a great day!" }
    ]
  }
]

const copayEnrollments: CopayEnrollment[] = [
  {
    id: 'CP001',
    patientName: 'Michael Anderson',
    medication: 'AVONEX (interferon beta-1a)',
    insurance: 'Blue Cross Blue Shield',
    phone: '5519882979',
    email: 'Michael.A@gmail.com',
    status: 'enrolled',
    eligibilityStatus: 'eligible',
    copayAmount: '$0',
    savingsAmount: '$175/month',
    cardNumber: '****-****-****-5623',
    activationDate: 'Today',
    expirationDate: 'Oct 28, 2025',
    lastUpdated: 'Today 3:20 PM',
    enrollmentDate: 'Today',
    confirmationSent: true,
    followUpScheduled: 'Nov 5, 2024'
  },
  {
    id: 'CP002',
    patientName: 'Jennifer Martinez',
    medication: 'Dupixent 300mg',
    insurance: 'Blue Cross Blue Shield',
    phone: '+15551234789',
    email: 'jennifer.m@email.com',
    status: 'enrolled',
    eligibilityStatus: 'eligible',
    copayAmount: '$0',
    savingsAmount: '$150/month',
    cardNumber: '****-****-****-4521',
    activationDate: 'Today',
    expirationDate: 'Oct 28, 2025',
    lastUpdated: 'Today 2:35 PM',
    enrollmentDate: 'Today',
    confirmationSent: true,
    followUpScheduled: 'Nov 4, 2024'
  },
  {
    id: 'CP003',
    patientName: 'Sarah Thompson',
    medication: 'Humira 40mg',
    insurance: 'United Healthcare',
    phone: '+15551234568',
    email: 'sarah.t@email.com',
    status: 'approved',
    eligibilityStatus: 'eligible',
    copayAmount: '$5',
    savingsAmount: '$200/month',
    lastUpdated: 'Today 10:15 AM',
    confirmationSent: false
  },
  {
    id: 'CP004',
    patientName: 'James Wilson',
    medication: 'Ozempic 0.5mg',
    insurance: 'Aetna',
    phone: '+15551234569',
    email: 'james.w@email.com',
    status: 'verification-pending',
    eligibilityStatus: 'pending',
    lastUpdated: 'Today 11:00 AM'
  },
  {
    id: 'CP005',
    patientName: 'Emily Rodriguez',
    medication: 'Trulicity 1.5mg',
    insurance: 'Cigna',
    phone: '+15551234570',
    email: 'emily.r@email.com',
    status: 'eligibility-check',
    eligibilityStatus: 'pending',
    lastUpdated: 'Today 11:45 AM'
  },
  {
    id: 'CP006',
    patientName: 'Robert Chen',
    medication: 'Enbrel 50mg',
    insurance: 'Medicare',
    phone: '+15551234571',
    email: 'robert.c@email.com',
    status: 'declined',
    eligibilityStatus: 'not-eligible',
    lastUpdated: 'Oct 26, 2024'
  }
]

const enrollmentTranscripts: EnrollmentTranscript[] = [
  {
    enrollmentId: 'CP001',
    outcome: 'Patient enrolled successfully, copay card activated',
    messages: [
      { speaker: 'AI', time: '14:15:00', message: "Hi Michael, this is the patient support program calling about your Dupixent prescription. I have some great news about copay assistance. Do you have a moment?" },
      { speaker: 'Patient', time: '14:15:12', message: "Yes, hi! I was hoping to hear about this. My insurance copay is pretty high." },
      { speaker: 'AI', time: '14:15:20', message: "I completely understand. That's exactly why I'm calling. I've reviewed your insurance information, and you qualify for our copay assistance program. Let me check your eligibility in real-time... One moment please." },
      { speaker: 'Patient', time: '14:15:35', message: "Okay, thank you!" },
      { speaker: 'AI', time: '14:15:42', message: "Great news! You're eligible for the program. With your Blue Cross Blue Shield insurance, your current copay would be $150 per month. With our copay card, your out-of-pocket cost would be reduced to $0 per month." },
      { speaker: 'Patient', time: '14:16:05', message: "Wait, zero dollars? That's incredible! What's the catch?" },
      { speaker: 'AI', time: '14:16:12', message: "No catch at all! This is a manufacturer-sponsored program designed to help patients afford their medication. The card is valid for 12 months and can save you up to $150 per month. You could save up to $1,800 per year." },
      { speaker: 'Patient', time: '14:16:35', message: "Wow, that's amazing. How do I sign up?" },
      { speaker: 'AI', time: '14:16:40', message: "I can enroll you right now over the phone. I just need to verify some information and get your consent. Can you confirm your date of birth?" },
      { speaker: 'Patient', time: '14:16:52', message: "Sure, it's March 8th, 1982." },
      { speaker: 'AI', time: '14:16:58', message: "Perfect. And I have your insurance as Blue Cross Blue Shield, policy number ending in 8492. Is that correct?" },
      { speaker: 'Patient', time: '14:17:10', message: "Yes, that's right." },
      { speaker: 'AI', time: '14:17:13', message: "Excellent. Let me explain how the card works. When you pick up your Dupixent prescription, you'll give your pharmacist this copay card information along with your regular insurance card. The pharmacy will process both, and the copay assistance will automatically reduce your out-of-pocket cost to $0." },
      { speaker: 'Patient', time: '14:17:40', message: "That sounds really simple. Do I need to do anything special?" },
      { speaker: 'AI', time: '14:17:46', message: "Not at all! The card activates immediately upon enrollment. I'll text and email you the card details right after this call. You can show the digital card on your phone at the pharmacy, or print it out if you prefer." },
      { speaker: 'Patient', time: '14:18:05', message: "Perfect. I'm ready to enroll!" },
      { speaker: 'AI', time: '14:18:09', message: "Wonderful! I'm processing your enrollment now... Your copay card has been activated! Your card number ends in 3847, and it's valid through October 25th, 2025." },
      { speaker: 'Patient', time: '14:18:30', message: "This is such a relief. Thank you so much!" },
      { speaker: 'AI', time: '14:18:35', message: "You're very welcome! You should receive a confirmation text and email within the next 5 minutes with all your card details and instructions. I've also scheduled a follow-up call for next week to make sure everything went smoothly at the pharmacy. Is there anything else I can help you with?" },
      { speaker: 'Patient', time: '14:18:55', message: "No, that's everything. I really appreciate your help!" },
      { speaker: 'AI', time: '14:19:00', message: "My pleasure, Michael! Remember, if you have any questions about using your copay card, you can call our support line 24/7. Have a great day!" }
    ]
  }
]

export default function OutboundEnrollmentTab() {
  const [selectedOutbound, setSelectedOutbound] = useState<OutboundCall | null>(outboundCalls[0])
  const [isInitiatingCall, setIsInitiatingCall] = useState(false)
  const [selectedEnrollment, setSelectedEnrollment] = useState<CopayEnrollment | null>(copayEnrollments[0])
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false)
  const [isEnrolling, setIsEnrolling] = useState(false)

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

  const handleCheckEligibility = async (enrollment: CopayEnrollment) => {
    setIsCheckingEligibility(true)
    setTimeout(() => {
      setIsCheckingEligibility(false)
      alert(`✅ Eligibility check completed for ${enrollment.patientName}\n\nStatus: Eligible\nEstimated Savings: $150/month`)
    }, 2000)
  }

  const handleEnroll = async (enrollment: CopayEnrollment) => {
    setIsEnrolling(true)
    setTimeout(() => {
      setIsEnrolling(false)
      alert(`✅ ${enrollment.patientName} enrolled successfully!\n\nCopay Card Activated\nConfirmation sent via email and SMS`)
    }, 2000)
  }

  const getStatusColor = (status: CopayEnrollment['status']) => {
    switch (status) {
      case 'enrolled': return 'bg-success/10 text-success border-success/20'
      case 'approved': return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'verification-pending': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'eligibility-check': return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
      case 'declined': return 'bg-red-500/10 text-red-600 border-red-500/20'
    }
  }

  const getEligibilityColor = (status?: CopayEnrollment['eligibilityStatus']) => {
    switch (status) {
      case 'eligible': return 'bg-success/10 text-success border-success/20'
      case 'not-eligible': return 'bg-red-500/10 text-red-600 border-red-500/20'
      case 'pending': return 'bg-gray-200 text-gray-600 border-gray-300'
      default: return 'bg-gray-200 text-gray-600 border-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      {/* Enrollment Funnel */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Copay Assistance Pipeline</h3>
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

      {/* Outbound Enrollment Pipeline */}
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
        <Card className="p-6 overflow-y-auto max-h-[calc(100vh-400px)]">
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

                {selectedOutbound.callDuration && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Call Duration</div>
                    <div className="font-bold text-gray-900">{selectedOutbound.callDuration}</div>
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

                {/* Outbound Call Transcript */}
                {selectedOutbound.callStatus === 'enrolled' && outboundTranscripts.find(t => t.callId === selectedOutbound.id) && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3">Enrollment Call Transcript</h4>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {outboundTranscripts.find(t => t.callId === selectedOutbound.id)?.messages.map((msg, idx) => (
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

                    {/* Outcome */}
                    <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success">
                      <div className="text-sm">
                        <span className="font-bold text-success">Outcome: </span>
                        <span className="text-gray-900">{outboundTranscripts.find(t => t.callId === selectedOutbound.id)?.outcome}</span>
                      </div>
                    </div>
                  </div>
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
    </div>
  )
}
