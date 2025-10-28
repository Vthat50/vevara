'use client'

import { useState } from 'react'
import { Phone, Clock, CheckCircle, Database, CreditCard, Settings as SettingsIcon, Heart, ChevronRight } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

export default function WelcomeCallFlow() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const callFlow = [
    {
      step: 1,
      title: 'Prescription Detected',
      icon: Database,
      description: 'EHR integration detects new Ozempic prescription for Maria Rodriguez',
      trigger: 'Real-time API event',
      timing: '0 seconds',
      details: [
        'Patient: Maria Rodriguez, Age 54',
        'Medication: Ozempic 0.5mg weekly',
        'Prescriber: Dr. Sarah Chen',
        'Insurance: Blue Cross Blue Shield',
        'Prior medication history: First GLP-1'
      ],
      color: 'primary'
    },
    {
      step: 2,
      title: 'Welcome Call Triggered',
      icon: Phone,
      description: 'AI automatically schedules welcome call within 24 hours',
      trigger: 'Automated workflow',
      timing: '18 hours after prescription',
      details: [
        'Call scheduled: Next day 10:00 AM',
        'Patient timezone: EST',
        'Preferred contact: Mobile (verified)',
        'Language preference: English',
        'No prior calls on record'
      ],
      color: 'primary'
    },
    {
      step: 3,
      title: 'Medication Education',
      icon: Heart,
      description: 'AI provides personalized injection guidance for first-time users',
      trigger: 'During call',
      timing: 'Minutes 0-5',
      details: [
        'Detected: First-time self-injector',
        'Explained: Pen mechanism and dosing',
        'Addressed: Patient anxiety about needles',
        'Provided: Step-by-step visual guide link',
        'Scheduled: Live injection walkthrough next day'
      ],
      color: 'success'
    },
    {
      step: 4,
      title: 'Copay Card Enrollment',
      icon: CreditCard,
      description: 'AI identifies $95/month savings opportunity and enrolls patient',
      trigger: 'During call',
      timing: 'Minutes 5-7',
      details: [
        'Without card: $120/month copay',
        'With card: $25/month copay',
        'Annual savings: $1,140',
        'Enrollment: Completed in-call',
        'Card activated: Immediately'
      ],
      color: 'success'
    },
    {
      step: 5,
      title: 'Preferences Setup',
      icon: SettingsIcon,
      description: 'AI collects communication preferences and sets up proactive support',
      trigger: 'During call',
      timing: 'Minutes 7-9',
      details: [
        'Preferred contact: Phone + SMS',
        'Best time to call: Mornings 9-11 AM',
        'Pharmacy: CVS on Main Street',
        'Refill reminders: 5 days advance',
        'Side effect monitoring: Enabled'
      ],
      color: 'success'
    },
    {
      step: 6,
      title: 'Follow-up Schedule',
      icon: Clock,
      description: 'AI establishes proactive support timeline for first 30 days',
      trigger: 'After call completion',
      timing: 'Immediate',
      details: [
        'Day 1 (tomorrow): Injection support call',
        'Day 3: Side effect check-in',
        'Day 7: First week progress review',
        'Day 14: Adherence assessment',
        'Day 25: Refill reminder (5 days advance)'
      ],
      color: 'primary'
    }
  ]

  const startDemo = () => {
    setIsPlaying(true)
    setActiveStep(0)

    let step = 0
    const interval = setInterval(() => {
      step++
      if (step < callFlow.length) {
        setActiveStep(step)
      } else {
        setIsPlaying(false)
        clearInterval(interval)
      }
    }, 3000)
  }

  const callOutcome = {
    duration: '9:24',
    patientSatisfaction: 5,
    tasksCompleted: 6,
    followUpsScheduled: 5,
    savingsEnrolled: 1140
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Call Flow</h2>
          <p className="text-gray-600">AI-powered onboarding within 24 hours of prescription</p>
        </div>
        {!isPlaying && (
          <Button onClick={startDemo} size="lg" className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Start Demo
          </Button>
        )}
      </div>

      {/* Key Benefits */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 bg-primary/5">
          <div className="text-2xl font-bold text-primary mb-1">24hrs</div>
          <div className="text-sm text-gray-600">Time to first contact</div>
        </Card>
        <Card className="p-4 bg-success/5">
          <div className="text-2xl font-bold text-success mb-1">92%</div>
          <div className="text-sm text-gray-600">Connection rate</div>
        </Card>
        <Card className="p-4 bg-purple-500/5">
          <div className="text-2xl font-bold text-purple-600 mb-1">78%</div>
          <div className="text-sm text-gray-600">Copay enrollment rate</div>
        </Card>
        <Card className="p-4 bg-orange-500/5">
          <div className="text-2xl font-bold text-orange-600 mb-1">4.8/5</div>
          <div className="text-sm text-gray-600">Patient satisfaction</div>
        </Card>
      </div>

      {/* Call Flow Steps */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Complete Welcome Call Journey</h3>
        <div className="space-y-4">
          {callFlow.map((item, idx) => {
            const Icon = item.icon
            const isActive = isPlaying && idx === activeStep
            const isCompleted = isPlaying && idx < activeStep

            return (
              <div
                key={idx}
                className={`relative p-5 rounded-lg border-2 transition-all duration-500 ${
                  isActive
                    ? 'border-primary bg-primary/5 scale-[1.02] shadow-lg'
                    : isCompleted
                    ? 'border-success bg-success/5'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {/* Connector line */}
                {idx < callFlow.length - 1 && (
                  <div className={`absolute left-8 top-full w-0.5 h-4 ${
                    isCompleted ? 'bg-success' : 'bg-gray-200'
                  }`} />
                )}

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    isActive
                      ? 'bg-primary text-white animate-pulse'
                      : isCompleted
                      ? 'bg-success text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : (
                      <Icon className="w-8 h-8" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-sm font-bold text-gray-500">STEP {item.step}</div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <div className={`text-lg font-bold ${
                        isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3">{item.description}</p>

                    <div className="grid md:grid-cols-3 gap-2 mb-3 text-sm">
                      <div>
                        <span className="text-gray-600">Trigger:</span>
                        <span className="ml-2 font-medium text-gray-900">{item.trigger}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Timing:</span>
                        <span className="ml-2 font-medium text-gray-900">{item.timing}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className={`ml-2 font-medium ${
                          isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-gray-500'
                        }`}>
                          {isActive ? 'In Progress' : isCompleted ? 'Complete' : 'Pending'}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    {(isActive || isCompleted) && (
                      <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                        <div className="text-xs font-bold text-gray-700 mb-2">Details:</div>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {item.details.map((detail, detailIdx) => (
                            <li key={detailIdx} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Call Outcome */}
      {isPlaying && activeStep === callFlow.length - 1 && (
        <Card className="p-6 bg-gradient-to-r from-success to-success/80 text-white animate-fadeIn">
          <h3 className="text-2xl font-bold mb-6">✓ Welcome Call Completed Successfully</h3>
          <div className="grid md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{callOutcome.duration}</div>
              <div className="text-sm opacity-90">Call Duration</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{callOutcome.tasksCompleted}/6</div>
              <div className="text-sm opacity-90">Tasks Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{callOutcome.followUpsScheduled}</div>
              <div className="text-sm opacity-90">Follow-ups Scheduled</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">${callOutcome.savingsEnrolled.toLocaleString()}</div>
              <div className="text-sm opacity-90">Annual Savings Enrolled</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{callOutcome.patientSatisfaction}/5 ⭐</div>
              <div className="text-sm opacity-90">Patient Satisfaction</div>
            </div>
          </div>
        </Card>
      )}

      {/* Impact Metrics */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-purple-500/10">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Program Impact</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">3,847</div>
            <div className="text-sm text-gray-700 mb-1">Welcome calls completed this month</div>
            <div className="text-xs text-gray-600">92% connection rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-success mb-2">89%</div>
            <div className="text-sm text-gray-700 mb-1">Patients feel more confident</div>
            <div className="text-xs text-gray-600">Based on post-call survey</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">34%</div>
            <div className="text-sm text-gray-700 mb-1">Higher first-fill completion</div>
            <div className="text-xs text-gray-600">vs. patients without welcome call</div>
          </div>
        </div>
      </Card>

      {/* Why It Matters */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Welcome Calls Matter</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-lg font-bold text-red-600 mb-3">❌ Without Welcome Call</div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>28% of patients never pick up first prescription</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>90% unaware of copay savings programs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>High anxiety about self-injection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>No proactive support system established</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>Patients feel alone in their journey</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-lg font-bold text-success mb-3">✓ With AI Welcome Call</div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span>34% higher first-fill completion rate</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span>78% copay enrollment (saves $1,140/year avg)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span>Anxiety reduced through education and support</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span>Proactive 30-day support plan established</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span>Patients feel supported and confident</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
