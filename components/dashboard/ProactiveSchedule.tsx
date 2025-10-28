'use client'

import { useState } from 'react'
import { Phone, Calendar, Clock, Bell, Activity, Pill, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react'
import Card from '@/components/Card'

export default function ProactiveSchedule() {
  const [selectedPatient, setSelectedPatient] = useState('maria')

  const patients = {
    maria: {
      name: 'Maria Rodriguez',
      medication: 'Ozempic 0.5mg',
      startDate: '2024-10-15',
      status: 'Active - Week 2'
    },
    michael: {
      name: 'Michael Chen',
      medication: 'Humira 40mg',
      startDate: '2024-09-01',
      status: 'Active - Week 7'
    },
    sarah: {
      name: 'Sarah Johnson',
      medication: 'Trulicity 1.5mg',
      startDate: '2024-10-20',
      status: 'Active - Week 1'
    }
  }

  const scheduledCalls = [
    {
      day: 1,
      title: 'Welcome Call',
      type: 'scheduled',
      icon: Phone,
      status: 'completed',
      timing: '24 hours after prescription',
      purpose: 'Initial onboarding, medication education, copay enrollment',
      duration: '9 min',
      outcome: 'Patient enrolled in copay program, injection support scheduled',
      color: 'success'
    },
    {
      day: 2,
      title: 'First Injection Support',
      type: 'scheduled',
      icon: Activity,
      status: 'completed',
      timing: 'Day of first dose',
      purpose: 'Live walkthrough of injection process, address anxiety',
      duration: '12 min',
      outcome: 'Successful injection completed, patient confident',
      color: 'success'
    },
    {
      day: 3,
      title: 'Side Effect Check-in',
      type: 'scheduled',
      icon: AlertCircle,
      status: 'completed',
      timing: '48 hours after first dose',
      purpose: 'Monitor for side effects, provide management tips',
      duration: '6 min',
      outcome: 'Mild nausea reported, management strategies provided',
      color: 'success'
    },
    {
      day: 7,
      title: 'Week 1 Progress Review',
      type: 'scheduled',
      icon: TrendingUp,
      status: 'completed',
      timing: 'End of first week',
      purpose: 'Assess adherence, address concerns, reinforce benefits',
      duration: '8 min',
      outcome: 'Patient adherent, side effects improving',
      color: 'success'
    },
    {
      day: 14,
      title: 'Week 2 Check-in',
      type: 'scheduled',
      icon: CheckCircle,
      status: 'scheduled',
      timing: 'End of second week',
      purpose: 'Continued adherence support, answer questions',
      duration: 'Est. 5-7 min',
      outcome: 'Pending - Scheduled for 10/29 at 10:00 AM',
      color: 'primary'
    },
    {
      day: 25,
      title: 'Refill Reminder',
      type: 'scheduled',
      icon: Pill,
      status: 'pending',
      timing: '5 days before refill due',
      purpose: 'Ensure timely refill, verify pharmacy status',
      duration: 'Est. 4-5 min',
      outcome: 'Not yet initiated',
      color: 'gray'
    },
    {
      day: 30,
      title: 'Month 1 Milestone',
      type: 'scheduled',
      icon: Calendar,
      status: 'pending',
      timing: '30 days after start',
      purpose: 'Celebrate adherence, discuss long-term plan',
      duration: 'Est. 10 min',
      outcome: 'Not yet initiated',
      color: 'gray'
    }
  ]

  const eventTriggeredCalls = [
    {
      trigger: 'Missed Dose',
      icon: AlertCircle,
      description: 'Patient misses scheduled injection',
      timing: 'Within 24 hours',
      action: 'AI calls to understand barriers and reschedule',
      frequency: 'As needed',
      color: 'orange'
    },
    {
      trigger: 'Pharmacy Issue',
      icon: Pill,
      description: 'Prescription not picked up after 3 days',
      timing: 'Immediate',
      action: 'AI investigates barriers (cost, transportation, etc.)',
      frequency: 'As needed',
      color: 'red'
    },
    {
      trigger: 'Side Effect Report',
      icon: Activity,
      description: 'Patient reports concerning symptoms',
      timing: 'Within 2 hours',
      action: 'AI assesses severity, provides guidance or escalates',
      frequency: 'As needed',
      color: 'purple'
    },
    {
      trigger: 'Lab Results',
      icon: TrendingUp,
      description: 'Abnormal lab values detected',
      timing: 'Within 4 hours',
      action: 'AI reviews with patient, discusses with care team',
      frequency: 'As needed',
      color: 'blue'
    }
  ]

  const programMetrics = {
    totalCallsScheduled: 7842,
    completionRate: 87,
    avgCallDuration: 7.2,
    patientSatisfaction: 4.7,
    adherenceImprovement: 31,
    interventionRate: 94
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Proactive Call Schedule</h2>
        <p className="text-gray-600">AI-powered support timeline for every patient journey</p>
      </div>

      {/* Program Metrics */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4 bg-primary/5">
          <div className="text-2xl font-bold text-primary mb-1">{programMetrics.totalCallsScheduled.toLocaleString()}</div>
          <div className="text-xs text-gray-600">Calls Scheduled This Month</div>
        </Card>
        <Card className="p-4 bg-success/5">
          <div className="text-2xl font-bold text-success mb-1">{programMetrics.completionRate}%</div>
          <div className="text-xs text-gray-600">Completion Rate</div>
        </Card>
        <Card className="p-4 bg-purple-500/5">
          <div className="text-2xl font-bold text-purple-600 mb-1">{programMetrics.avgCallDuration} min</div>
          <div className="text-xs text-gray-600">Avg Call Duration</div>
        </Card>
        <Card className="p-4 bg-orange-500/5">
          <div className="text-2xl font-bold text-orange-600 mb-1">{programMetrics.patientSatisfaction}/5</div>
          <div className="text-xs text-gray-600">Patient Satisfaction</div>
        </Card>
        <Card className="p-4 bg-blue-500/5">
          <div className="text-2xl font-bold text-blue-600 mb-1">+{programMetrics.adherenceImprovement}%</div>
          <div className="text-xs text-gray-600">Adherence Improvement</div>
        </Card>
        <Card className="p-4 bg-green-500/5">
          <div className="text-2xl font-bold text-green-600 mb-1">{programMetrics.interventionRate}%</div>
          <div className="text-xs text-gray-600">Early Intervention Rate</div>
        </Card>
      </div>

      {/* Patient Selector */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Select Patient to View Schedule</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(patients).map(([key, patient]) => (
            <button
              key={key}
              onClick={() => setSelectedPatient(key)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedPatient === key
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-bold text-gray-900 mb-1">{patient.name}</div>
              <div className="text-sm text-gray-600 mb-1">{patient.medication}</div>
              <div className="text-xs text-gray-500">Started: {patient.startDate}</div>
              <div className="text-xs font-medium text-primary mt-2">{patient.status}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Timeline */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          30-Day Proactive Support Timeline - {patients[selectedPatient as keyof typeof patients].name}
        </h3>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-6">
            {scheduledCalls.map((call, idx) => {
              const Icon = call.icon
              const isCompleted = call.status === 'completed'
              const isScheduled = call.status === 'scheduled'

              return (
                <div key={idx} className="relative flex items-start gap-6">
                  {/* Day marker */}
                  <div className="flex-shrink-0 w-16 text-right">
                    <div className="text-lg font-bold text-gray-900">Day {call.day}</div>
                  </div>

                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center relative z-10 ${
                    isCompleted
                      ? 'bg-success text-white'
                      : isScheduled
                      ? 'bg-primary text-white animate-pulse'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : (
                      <Icon className="w-8 h-8" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 p-5 rounded-lg border-2 ${
                    isCompleted
                      ? 'border-success/30 bg-success/5'
                      : isScheduled
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-lg font-bold text-gray-900">{call.title}</div>
                        <div className="text-sm text-gray-600">{call.timing}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isCompleted
                          ? 'bg-success text-white'
                          : isScheduled
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {call.status === 'completed' ? '✓ Completed' : call.status === 'scheduled' ? 'Scheduled' : 'Pending'}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600 font-medium mb-1">Purpose:</div>
                        <div className="text-gray-900">{call.purpose}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 font-medium mb-1">Duration:</div>
                        <div className="text-gray-900">{call.duration}</div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-gray-600 font-medium text-sm mb-1">Outcome:</div>
                      <div className={`text-sm ${
                        isCompleted ? 'text-success font-medium' : 'text-gray-700'
                      }`}>
                        {call.outcome}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Event-Triggered Calls */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Event-Triggered Calls</h3>
        <p className="text-gray-600 mb-6">In addition to scheduled calls, AI automatically responds to these patient events:</p>

        <div className="grid md:grid-cols-2 gap-4">
          {eventTriggeredCalls.map((event, idx) => {
            const Icon = event.icon

            return (
              <div key={idx} className="p-5 rounded-lg border-2 border-gray-200 hover:border-primary/50 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${event.color}-500/10`}>
                    <Icon className={`w-6 h-6 text-${event.color}-600`} />
                  </div>
                  <div className="font-bold text-gray-900">{event.trigger}</div>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Trigger: </span>
                    <span className="text-gray-900">{event.description}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Response Time: </span>
                    <span className="text-gray-900 font-medium">{event.timing}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">AI Action: </span>
                    <span className="text-gray-900">{event.action}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Impact */}
      <Card className="p-6 bg-gradient-to-r from-primary to-primary-dark text-white">
        <h3 className="text-2xl font-bold mb-6">Why Proactive Scheduling Works</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl font-bold mb-2">31%</div>
            <div className="text-sm opacity-90 mb-3">Higher adherence vs. reactive-only support</div>
            <div className="text-xs opacity-75">Patients stay on track with regular check-ins</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">94%</div>
            <div className="text-sm opacity-90 mb-3">Early intervention rate for at-risk patients</div>
            <div className="text-xs opacity-75">Problems caught before they become crises</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">4.7/5</div>
            <div className="text-sm opacity-90 mb-3">Patient satisfaction score</div>
            <div className="text-xs opacity-75">Patients feel supported throughout their journey</div>
          </div>
        </div>
      </Card>

      {/* How It Works */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">How Proactive Scheduling Works</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <div className="font-bold text-gray-900 mb-2">Intelligent Scheduling</div>
            <div className="text-sm text-gray-600">AI creates personalized timeline based on medication, patient history, and risk factors</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bell className="w-8 h-8 text-primary" />
            </div>
            <div className="font-bold text-gray-900 mb-2">Automated Triggers</div>
            <div className="text-sm text-gray-600">System monitors events and automatically initiates calls when needed</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <div className="font-bold text-gray-900 mb-2">Timely Outreach</div>
            <div className="text-sm text-gray-600">Calls made at optimal times when patients are most likely to engage</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
            <div className="font-bold text-gray-900 mb-2">Continuous Learning</div>
            <div className="text-sm text-gray-600">AI adapts schedule based on patient responses and adherence patterns</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
