'use client'

import { useState } from 'react'
import { Search, Phone, Calendar, Download, Play, Mail, CheckCircle, AlertTriangle } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface Patient {
  id: string
  name: string
  medication: string
  lastCall: string
  status: 'enrolled' | 'pending' | 'at-risk'
  adherence: number
  age: number
  insurance: string
  phone: string
  email: string
}

interface TranscriptMessage {
  speaker: 'AI' | 'Patient'
  time: string
  message: string
}

interface PatientTranscript {
  patientId: string
  date: string
  messages: TranscriptMessage[]
  outcome: string
  duration: string
}

const patients: Patient[] = [
  {
    id: 'P001',
    name: 'Sarah Johnson',
    medication: 'Ozempic 0.5mg',
    lastCall: '2 hours ago',
    status: 'enrolled',
    adherence: 94,
    age: 54,
    insurance: 'Blue Cross Blue Shield',
    phone: '(555) 123-4567',
    email: 'sarah.j@email.com'
  },
  {
    id: 'P002',
    name: 'Michael Chen',
    medication: 'Humira 40mg',
    lastCall: '5 hours ago',
    status: 'pending',
    adherence: 88,
    age: 42,
    insurance: 'Aetna',
    phone: '(555) 234-5678',
    email: 'mchen@email.com'
  },
  {
    id: 'P003',
    name: 'Emma Davis',
    medication: 'Trulicity 1.5mg',
    lastCall: '1 day ago',
    status: 'at-risk',
    adherence: 62,
    age: 61,
    insurance: 'UnitedHealthcare',
    phone: '(555) 345-6789',
    email: 'emma.d@email.com'
  },
  {
    id: 'P004',
    name: 'John Williams',
    medication: 'Enbrel 50mg',
    lastCall: '3 hours ago',
    status: 'pending',
    adherence: 91,
    age: 58,
    insurance: 'Cigna',
    phone: '(555) 456-7890',
    email: 'jwilliams@email.com'
  },
  {
    id: 'P005',
    name: 'Lisa Anderson',
    medication: 'Stelara 90mg',
    lastCall: '1 hour ago',
    status: 'enrolled',
    adherence: 97,
    age: 47,
    insurance: 'Blue Cross Blue Shield',
    phone: '(555) 567-8901',
    email: 'lisa.a@email.com'
  }
]

const transcripts: PatientTranscript[] = [
  {
    patientId: 'P001',
    date: 'Oct 27, 10:30 AM',
    duration: '9:24',
    outcome: 'Enrolled in Copay Program',
    messages: [
      { speaker: 'AI', time: '10:30:05', message: "Hi Sarah! This is your Ozempic support assistant. I'm calling to help with your first injection tomorrow. Do you have a few minutes to talk?" },
      { speaker: 'Patient', time: '10:30:12', message: "Yes, I have time. I'm actually pretty nervous about the injection." },
      { speaker: 'AI', time: '10:30:15', message: "That's completely normal. Before we talk about the injection, I want to make sure you know about the copay savings program. Without it, your copay would be $120 per month. With the savings card, it's only $25. Would you like me to enroll you right now?" },
      { speaker: 'Patient', time: '10:30:20', message: "Oh wow, yes! I didn't know about that." },
      { speaker: 'AI', time: '10:30:25', message: "Perfect! I just verified your insurance - you're eligible. You're enrolled! Your savings card is active immediately. You'll save $95 every month." },
      { speaker: 'Patient', time: '10:30:32', message: "That's amazing, thank you!" },
      { speaker: 'AI', time: '10:30:35', message: "You're welcome! Now let's talk about your injection. I'll call you tomorrow at 9 AM to walk you through it step-by-step. Does that time work for you?" },
      { speaker: 'Patient', time: '10:30:40', message: "Yes, that works perfectly." }
    ]
  },
  {
    patientId: 'P002',
    date: 'Oct 27, 3:15 PM',
    duration: '12:45',
    outcome: 'Follow-up Required - Side Effects',
    messages: [
      { speaker: 'AI', time: '15:15:03', message: "Hello Michael, this is your Humira support assistant. I'm checking in to see how you've been feeling on your medication. Do you have a moment?" },
      { speaker: 'Patient', time: '15:15:10', message: "Yes, I can talk. I've been having some injection site reactions." },
      { speaker: 'AI', time: '15:15:15', message: "I'm sorry to hear that. Can you describe what you're experiencing? Is it redness, swelling, or pain at the injection site?" },
      { speaker: 'Patient', time: '15:15:25', message: "It's mostly redness and some swelling. It goes away after a day or two." },
      { speaker: 'AI', time: '15:15:30', message: "That's actually quite common with Humira, especially in the first few months. However, I'd like to schedule a follow-up call with our nurse specialist to review your symptoms in detail. Would tomorrow at 2 PM work for you?" },
      { speaker: 'Patient', time: '15:15:40', message: "Yes, that works for me." },
      { speaker: 'AI', time: '15:15:42', message: "Perfect! I've scheduled that call. In the meantime, you can apply a cold compress after injection to help with the swelling. Is there anything else you'd like to discuss?" },
      { speaker: 'Patient', time: '15:15:50', message: "No, that's all. Thank you." }
    ]
  },
  {
    patientId: 'P003',
    date: 'Oct 26, 9:00 AM',
    duration: '15:32',
    outcome: 'Missed Dose - Adherence Risk',
    messages: [
      { speaker: 'AI', time: '09:00:05', message: "Good morning Emma, this is your Trulicity support assistant. I noticed you missed your scheduled dose this week. Is everything okay?" },
      { speaker: 'Patient', time: '09:00:15', message: "Oh, I completely forgot. I've been so busy with work." },
      { speaker: 'AI', time: '09:00:20', message: "I understand how that can happen. Let me help you get back on track. First, let me check your copay status - I see you're not enrolled in the savings program. Your current copay is $115 per month. With the program, it would be just $25. Would you like me to enroll you?" },
      { speaker: 'Patient', time: '09:00:35', message: "Really? Yes, that would help a lot. The cost has been stressful." },
      { speaker: 'AI', time: '09:00:40', message: "I completely understand. Let me verify your eligibility... Great news! You're eligible. I'm enrolling you now... Done! Your savings card is active immediately. You'll save $90 every month." },
      { speaker: 'Patient', time: '09:00:50', message: "That's wonderful! Thank you so much." },
      { speaker: 'AI', time: '09:00:55', message: "You're very welcome! Now, would you like me to set up weekly reminder calls to help you stay on track with your medication?" },
      { speaker: 'Patient', time: '09:01:05', message: "Yes, that would be really helpful." },
      { speaker: 'AI', time: '09:01:10', message: "Perfect! I've scheduled weekly check-in calls every Sunday at 9 AM. You'll receive a text reminder the day before. Does that work for you?" },
      { speaker: 'Patient', time: '09:01:20', message: "Yes, perfect. Thank you!" }
    ]
  },
  {
    patientId: 'P004',
    date: 'Oct 27, 1:45 PM',
    duration: '8:15',
    outcome: 'Refill Scheduled',
    messages: [
      { speaker: 'AI', time: '13:45:02', message: "Hi John, this is your Enbrel support assistant. I'm calling because you're due for a refill in 3 days. Would you like me to help you schedule that?" },
      { speaker: 'Patient', time: '13:45:10', message: "Yes, that would be great. I always forget to call the pharmacy." },
      { speaker: 'AI', time: '13:45:15', message: "I'm happy to help! I can coordinate with your pharmacy directly. Which pharmacy do you use?" },
      { speaker: 'Patient', time: '13:45:20', message: "CVS on Main Street." },
      { speaker: 'AI', time: '13:45:25', message: "Perfect! I'm sending the refill request to CVS on Main Street now. They'll have it ready for pickup on October 30th. You'll receive a text when it's ready. Your copay will be $25 with your savings card." },
      { speaker: 'Patient', time: '13:45:35', message: "Excellent, thank you!" },
      { speaker: 'AI', time: '13:45:38', message: "You're welcome! I'll call you again in a month before your next refill. Have a great day!" }
    ]
  },
  {
    patientId: 'P005',
    date: 'Oct 27, 2:20 PM',
    duration: '6:50',
    outcome: 'Check-in Complete',
    messages: [
      { speaker: 'AI', time: '14:20:03', message: "Hello Lisa, this is your Stelara support assistant. I'm doing a routine check-in. How have you been feeling on your medication?" },
      { speaker: 'Patient', time: '14:20:10', message: "I've been feeling great! No issues at all." },
      { speaker: 'AI', time: '14:20:15', message: "That's wonderful to hear! Your adherence rate is excellent at 97%. Are you experiencing any side effects or have any questions about your medication?" },
      { speaker: 'Patient', time: '14:20:25', message: "No side effects. Everything is going smoothly." },
      { speaker: 'AI', time: '14:20:30', message: "Excellent! Just a reminder that your next dose is scheduled for November 3rd. You'll receive a reminder text 2 days before. Is there anything else I can help you with today?" },
      { speaker: 'Patient', time: '14:20:40', message: "No, that's all. Thank you!" },
      { speaker: 'AI', time: '14:20:43', message: "You're welcome, Lisa! Keep up the great work. We'll talk again next month." }
    ]
  }
]

export default function PatientsTab() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(patients[0])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.medication.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'enrolled': return 'bg-success/10 text-success border-success/20'
      case 'pending': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'at-risk': return 'bg-red-500/10 text-red-600 border-red-500/20'
    }
  }

  const getStatusLabel = (status: Patient['status']) => {
    switch (status) {
      case 'enrolled': return 'Enrolled'
      case 'pending': return 'Pending'
      case 'at-risk': return 'At Risk'
    }
  }

  const currentTranscript = transcripts.find(t => t.patientId === selectedPatient?.id)

  return (
    <div className="flex gap-6 h-[calc(100vh-200px)]">
      {/* LEFT PANEL - Patient List (40%) */}
      <div className="w-2/5 flex flex-col">
        <Card className="flex-1 flex flex-col p-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Patient Cards */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPatient?.id === patient.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-gray-900">{patient.name}</div>
                    <div className="text-sm text-gray-600">{patient.medication}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(patient.status)}`}>
                    {getStatusLabel(patient.status)}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last call: {patient.lastCall}</span>
                  <span className="text-gray-900 font-medium">{patient.adherence}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* RIGHT PANEL - Patient Details (60%) */}
      <div className="w-3/5 flex flex-col">
        {selectedPatient ? (
          <Card className="flex-1 flex flex-col p-6 overflow-y-auto">
            {/* Patient Header */}
            <div className="pb-4 border-b border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}, {selectedPatient.age}</h2>
                  <p className="text-gray-600">{selectedPatient.medication} • {selectedPatient.insurance}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium border-2 ${getStatusColor(selectedPatient.status)}`}>
                  {getStatusLabel(selectedPatient.status)}
                </div>
              </div>
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{selectedPatient.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{selectedPatient.email}</span>
                </div>
              </div>
            </div>

            {/* Eligibility Section */}
            <div className="py-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">ELIGIBILITY</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-gray-700">Commercial Insurance: Eligible</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-gray-700">Copay Program: $95/mo savings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-gray-700">Refill Status: Due in 5 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-700">Prior Auth: Pending</span>
                </div>
              </div>
            </div>

            {/* Call Transcript */}
            <div className="py-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">CALL TRANSCRIPT</h3>
                <span className="text-sm text-gray-600">{currentTranscript?.date}</span>
              </div>

              <div className="space-y-4">
                {currentTranscript?.messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.speaker === 'AI' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] rounded-lg p-4 ${
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

              <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-success">Outcome: {currentTranscript?.outcome}</span>
                  <span className="text-gray-600">Duration: {currentTranscript?.duration}</span>
                </div>
              </div>
            </div>

            {/* Call History */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">CALL HISTORY</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Oct 27, 10:30 AM - Welcome Call</span>
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Oct 24, 9:00 AM - Initial Contact</span>
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Play Audio
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 mt-4">
              <Button className="flex-1 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call Patient Now
              </Button>
              <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Follow-up
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="flex-1 flex items-center justify-center p-12">
            <div className="text-center text-gray-500">
              <p>Select a patient to view details</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
