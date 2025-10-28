'use client'

import { useState } from 'react'
import { CreditCard, CheckCircle2, CheckCircle, Clock, XCircle, Shield, Mail, MessageSquare, Phone, DollarSign, AlertCircle, Users, TrendingUp } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

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

const copayEnrollments: CopayEnrollment[] = [
  {
    id: 'CP001',
    patientName: 'Michael Anderson',
    medication: 'Dupixent 300mg',
    insurance: 'Blue Cross Blue Shield',
    phone: '+15551234567',
    email: 'michael.a@email.com',
    status: 'enrolled',
    eligibilityStatus: 'eligible',
    copayAmount: '$0',
    savingsAmount: '$150/month',
    cardNumber: '****-****-****-3847',
    activationDate: 'Oct 25, 2024',
    expirationDate: 'Oct 25, 2025',
    lastUpdated: 'Oct 25, 2024 2:30 PM',
    enrollmentDate: 'Oct 25, 2024',
    confirmationSent: true,
    followUpScheduled: 'Nov 1, 2024'
  },
  {
    id: 'CP002',
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
    id: 'CP003',
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
    id: 'CP004',
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
    id: 'CP005',
    patientName: 'Robert Chen',
    medication: 'Enbrel 50mg',
    insurance: 'Medicare',
    phone: '+15551234571',
    email: 'robert.c@email.com',
    status: 'declined',
    eligibilityStatus: 'not-eligible',
    lastUpdated: 'Oct 26, 2024',
    confirmationSent: true
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

export default function CopayEnrollmentTab() {
  const [selectedEnrollment, setSelectedEnrollment] = useState<CopayEnrollment | null>(copayEnrollments[0])
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false)
  const [isEnrolling, setIsEnrolling] = useState(false)

  const handleCheckEligibility = async (enrollment: CopayEnrollment) => {
    setIsCheckingEligibility(true)
    // Simulate API call
    setTimeout(() => {
      setIsCheckingEligibility(false)
      alert(`✅ Eligibility check completed for ${enrollment.patientName}\n\nStatus: Eligible\nEstimated Savings: $150/month`)
    }, 2000)
  }

  const handleEnroll = async (enrollment: CopayEnrollment) => {
    setIsEnrolling(true)
    // Simulate API call
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
      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-3">
            <Users className="w-6 h-6 text-success" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">78%</div>
          <div className="text-sm text-gray-600">Enrollment Rate</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
            <DollarSign className="w-6 h-6 text-primary" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">$97</div>
          <div className="text-sm text-gray-600">Avg Monthly Savings</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">+26%</div>
          <div className="text-sm text-gray-600">Adherence Improvement</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">60s</div>
          <div className="text-sm text-gray-600">Avg Enrollment Time</div>
        </Card>
      </div>

      {/* Enrollment Pipeline */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Enrollments List */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Copay Assistance Pipeline</h3>
          <div className="space-y-3">
            {copayEnrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                onClick={() => setSelectedEnrollment(enrollment)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedEnrollment?.id === enrollment.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-gray-900">{enrollment.patientName}</div>
                    <div className="text-sm text-gray-600">{enrollment.medication}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(enrollment.status)}`}>
                    {enrollment.status.toUpperCase().replace(/-/g, ' ')}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded border ${getEligibilityColor(enrollment.eligibilityStatus)}`}>
                    {enrollment.eligibilityStatus === 'eligible' ? <CheckCircle2 className="w-3 h-3" /> :
                     enrollment.eligibilityStatus === 'not-eligible' ? <XCircle className="w-3 h-3" /> :
                     <Clock className="w-3 h-3" />}
                    <span>Eligibility: {enrollment.eligibilityStatus || 'pending'}</span>
                  </div>
                  {enrollment.copayAmount && (
                    <span className="font-medium text-success">{enrollment.copayAmount}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Enrollment Details */}
        <Card className="p-6 overflow-y-auto max-h-[calc(100vh-400px)]">
          {selectedEnrollment ? (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Copay Card Details</h3>
              <div className="space-y-4">
                {/* Patient Info */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Patient</div>
                  <div className="font-bold text-gray-900">{selectedEnrollment.patientName}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Medication</div>
                    <div className="font-medium text-gray-900">{selectedEnrollment.medication}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Insurance</div>
                    <div className="font-medium text-gray-900">{selectedEnrollment.insurance}</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm font-bold text-gray-900 mb-2">Contact Information</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4" />
                      {selectedEnrollment.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="w-4 h-4" />
                      {selectedEnrollment.email}
                    </div>
                  </div>
                </div>

                {/* Eligibility Status */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm font-bold text-gray-900 mb-2">Eligibility Status</div>
                  <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${getEligibilityColor(selectedEnrollment.eligibilityStatus)}`}>
                    {selectedEnrollment.eligibilityStatus === 'eligible' ? <CheckCircle2 className="w-4 h-4" /> :
                     selectedEnrollment.eligibilityStatus === 'not-eligible' ? <XCircle className="w-4 h-4" /> :
                     <Clock className="w-4 h-4" />}
                    <span className="font-medium text-sm">
                      {selectedEnrollment.eligibilityStatus === 'eligible' ? 'Eligible' :
                       selectedEnrollment.eligibilityStatus === 'not-eligible' ? 'Not Eligible' :
                       'Pending Verification'}
                    </span>
                  </div>
                </div>

                {/* Benefits */}
                {selectedEnrollment.eligibilityStatus === 'eligible' && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm font-bold text-gray-900 mb-3">Program Benefits</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                        <div className="text-xs text-gray-600 mb-1">New Copay</div>
                        <div className="text-2xl font-bold text-success">{selectedEnrollment.copayAmount || '$0'}</div>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="text-xs text-gray-600 mb-1">Monthly Savings</div>
                        <div className="text-2xl font-bold text-primary">{selectedEnrollment.savingsAmount || '$150'}</div>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div className="text-xs text-blue-900">
                          <span className="font-bold">Plain Language Explanation:</span> Your insurance copay would normally be $150 per month. With this copay assistance card, you'll pay {selectedEnrollment.copayAmount || '$0'} instead, saving you {selectedEnrollment.savingsAmount || '$150/month'}.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Information */}
                {selectedEnrollment.cardNumber && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm font-bold text-gray-900 mb-3">Card Information</div>
                    <div className="p-4 bg-gradient-to-r from-primary to-primary-dark rounded-lg text-white">
                      <div className="flex items-center gap-2 mb-3">
                        <CreditCard className="w-5 h-5" />
                        <span className="font-bold">Copay Assistance Card</span>
                      </div>
                      <div className="text-sm mb-2">Card Number</div>
                      <div className="text-xl font-mono mb-4">{selectedEnrollment.cardNumber}</div>
                      <div className="flex justify-between text-xs">
                        <div>
                          <div className="opacity-75">Activated</div>
                          <div className="font-medium">{selectedEnrollment.activationDate}</div>
                        </div>
                        <div>
                          <div className="opacity-75">Expires</div>
                          <div className="font-medium">{selectedEnrollment.expirationDate}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Confirmation Status */}
                {selectedEnrollment.status === 'enrolled' && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm font-bold text-gray-900 mb-3">Confirmation Status</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-gray-700">Email confirmation sent</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-gray-700">SMS confirmation sent</span>
                      </div>
                      {selectedEnrollment.followUpScheduled && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-gray-700">Follow-up call: {selectedEnrollment.followUpScheduled}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-200">
                  {selectedEnrollment.status === 'eligibility-check' && (
                    <Button
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => handleCheckEligibility(selectedEnrollment)}
                      disabled={isCheckingEligibility}
                    >
                      <Shield className="w-4 h-4" />
                      {isCheckingEligibility ? 'Checking Eligibility...' : 'Run Eligibility Check'}
                    </Button>
                  )}
                  {selectedEnrollment.status === 'approved' && (
                    <Button
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => handleEnroll(selectedEnrollment)}
                      disabled={isEnrolling}
                    >
                      <CreditCard className="w-4 h-4" />
                      {isEnrolling ? 'Enrolling...' : 'Complete Enrollment & Activate Card'}
                    </Button>
                  )}
                </div>

                {/* Enrollment Transcript */}
                {selectedEnrollment.status === 'enrolled' && enrollmentTranscripts.find(t => t.enrollmentId === selectedEnrollment.id) && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3">Enrollment Call Transcript</h4>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {enrollmentTranscripts.find(t => t.enrollmentId === selectedEnrollment.id)?.messages.map((msg, idx) => (
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
                        <span className="text-gray-900">{enrollmentTranscripts.find(t => t.enrollmentId === selectedEnrollment.id)?.outcome}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p>Select an enrollment to view details</p>
            </div>
          )}
        </Card>
      </div>

      {/* Workflow */}
      <Card className="p-6 bg-gradient-to-r from-success/5 to-primary/5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Enrollment Workflow</h3>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-primary">1</span>
            </div>
            <div className="font-medium text-gray-900 text-sm">Real-time Eligibility Check</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-primary">2</span>
            </div>
            <div className="font-medium text-gray-900 text-sm">Insurance Verification</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-primary">3</span>
            </div>
            <div className="font-medium text-gray-900 text-sm">Automated Enrollment</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-primary">4</span>
            </div>
            <div className="font-medium text-gray-900 text-sm">Card Activation</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div className="font-medium text-gray-900 text-sm">Confirmation</div>
          </div>
        </div>
      </Card>

      {/* Benefits */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Program Benefits</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">78% Enrollment Rate</div>
              <div className="text-sm text-gray-600">26x better than traditional (3%)</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">60 Second Enrollment</div>
              <div className="text-sm text-gray-600">No forms, no portals required</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">$1,140 Annual Savings</div>
              <div className="text-sm text-gray-600">Average per patient</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">+26% Adherence</div>
              <div className="text-sm text-gray-600">Patients stay on medication longer</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
