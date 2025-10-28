'use client'

import { useState, useEffect } from 'react'
import { Phone, AlertTriangle, User, Clock, MessageSquare, ChevronRight, CheckCircle, Activity } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

export default function HumanEscalation() {
  const [isDemo, setIsDemo] = useState(false)
  const [demoStep, setDemoStep] = useState(0)
  const [countdown, setCountdown] = useState(10)

  const escalationTriggers = [
    {
      trigger: 'Severe Symptoms',
      keywords: ['chest pain', 'difficulty breathing', 'severe allergic reaction', 'loss of consciousness'],
      severity: 'critical',
      responseTime: '< 10 seconds',
      action: 'Immediate nurse transfer',
      color: 'red'
    },
    {
      trigger: 'Moderate Symptoms',
      keywords: ['persistent vomiting', 'high fever', 'severe pain', 'unusual bleeding'],
      severity: 'high',
      responseTime: '< 30 seconds',
      action: 'Clinical assessment queue',
      color: 'orange'
    },
    {
      trigger: 'Patient Request',
      keywords: ['speak to doctor', 'talk to nurse', 'need medical advice'],
      severity: 'medium',
      responseTime: '< 1 minute',
      action: 'Transfer to care team',
      color: 'yellow'
    },
    {
      trigger: 'Complex Question',
      keywords: ['drug interaction', 'changing medication', 'surgery', 'pregnancy'],
      severity: 'medium',
      responseTime: '< 2 minutes',
      action: 'Pharmacist consultation',
      color: 'blue'
    },
    {
      trigger: 'Multiple Failed Attempts',
      keywords: ['AI unable to resolve', 'repeated question', 'escalating frustration'],
      severity: 'low',
      responseTime: '< 3 minutes',
      action: 'Patient support specialist',
      color: 'purple'
    }
  ]

  const demoSteps = [
    {
      step: 0,
      title: 'AI Call in Progress',
      description: 'Patient Maria Rodriguez discussing side effects',
      transcript: [
        { speaker: 'AI', message: "Hi Maria, I'm checking in on how you're feeling after your second Ozempic injection. How are you doing today?" },
        { speaker: 'Patient', message: "I've been having some nausea, but that's normal right?" }
      ],
      status: 'normal',
      color: 'primary'
    },
    {
      step: 1,
      title: 'Critical Keyword Detected',
      description: 'AI identifies emergency symptom requiring immediate escalation',
      transcript: [
        { speaker: 'AI', message: "Yes, mild nausea is common. It usually improves over time. Are you experiencing any other symptoms?" },
        { speaker: 'Patient', message: "Well, I'm also having some chest pain and it's hard to breathe..." }
      ],
      status: 'alert',
      color: 'red',
      alert: '⚠️ CRITICAL: "chest pain" + "hard to breathe" detected'
    },
    {
      step: 2,
      title: 'Immediate AI Response',
      description: 'AI acknowledges emergency and initiates transfer protocol',
      transcript: [
        { speaker: 'AI', message: "I understand you're experiencing chest pain and difficulty breathing. This is important and you need to speak with a nurse right away. I'm transferring you immediately. Please stay on the line." }
      ],
      status: 'escalating',
      color: 'orange',
      alert: 'Escalation protocol initiated - Finding available nurse'
    },
    {
      step: 3,
      title: 'Context Transfer',
      description: 'Full conversation history and patient data sent to nurse',
      status: 'transferring',
      color: 'yellow',
      contextData: {
        patient: 'Maria Rodriguez, Age 54',
        medication: 'Ozempic 0.5mg - 2nd injection (Day 8)',
        chiefComplaint: 'Chest pain + Difficulty breathing',
        callDuration: '2:34',
        conversationSummary: 'Patient called for routine check-in, reported expected nausea, then mentioned chest pain and breathing difficulty',
        medicalHistory: 'Type 2 diabetes, no cardiac history',
        allergies: 'None documented',
        recentLabs: 'A1C: 8.2% (2 weeks ago)',
        emergencyContact: 'Verified on file'
      }
    },
    {
      step: 4,
      title: 'Human Agent Connected',
      description: 'Nurse Sarah takes over with full context',
      transcript: [
        { speaker: 'Nurse Sarah', message: "Hi Maria, this is Nurse Sarah. I can see you're having chest pain and trouble breathing. I'm here to help. On a scale of 1-10, how severe is your chest pain right now?" }
      ],
      status: 'connected',
      color: 'success',
      transferTime: '8 seconds'
    }
  ]

  useEffect(() => {
    if (isDemo && demoStep < demoSteps.length - 1) {
      const timer = setTimeout(() => {
        setDemoStep(demoStep + 1)
        setCountdown(10)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isDemo, demoStep])

  useEffect(() => {
    if (isDemo && countdown > 0 && demoStep === 2) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown, isDemo, demoStep])

  const startDemo = () => {
    setIsDemo(true)
    setDemoStep(0)
    setCountdown(10)
  }

  const resetDemo = () => {
    setIsDemo(false)
    setDemoStep(0)
    setCountdown(10)
  }

  const metrics = {
    totalEscalations: 847,
    avgTransferTime: 12,
    aiResolutionRate: 71,
    humanResolutionRate: 29,
    criticalEscalations: 23,
    patientSatisfaction: 4.8
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Human Escalation Demo</h2>
          <p className="text-gray-600">AI detects emergencies and seamlessly transfers to human agents</p>
        </div>
        {!isDemo ? (
          <Button onClick={startDemo} size="lg" className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Start Emergency Demo
          </Button>
        ) : (
          <Button onClick={resetDemo} size="lg" variant="outline">
            Reset Demo
          </Button>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4 bg-primary/5">
          <div className="text-2xl font-bold text-primary mb-1">{metrics.totalEscalations}</div>
          <div className="text-xs text-gray-600">Total Escalations/Month</div>
        </Card>
        <Card className="p-4 bg-success/5">
          <div className="text-2xl font-bold text-success mb-1">{metrics.avgTransferTime}s</div>
          <div className="text-xs text-gray-600">Avg Transfer Time</div>
        </Card>
        <Card className="p-4 bg-purple-500/5">
          <div className="text-2xl font-bold text-purple-600 mb-1">{metrics.aiResolutionRate}%</div>
          <div className="text-xs text-gray-600">AI Resolution Rate</div>
        </Card>
        <Card className="p-4 bg-orange-500/5">
          <div className="text-2xl font-bold text-orange-600 mb-1">{metrics.humanResolutionRate}%</div>
          <div className="text-xs text-gray-600">Require Human Support</div>
        </Card>
        <Card className="p-4 bg-red-500/5">
          <div className="text-2xl font-bold text-red-600 mb-1">{metrics.criticalEscalations}</div>
          <div className="text-xs text-gray-600">Critical Escalations</div>
        </Card>
        <Card className="p-4 bg-blue-500/5">
          <div className="text-2xl font-bold text-blue-600 mb-1">{metrics.patientSatisfaction}/5</div>
          <div className="text-xs text-gray-600">Patient Satisfaction</div>
        </Card>
      </div>

      {/* Live Demo */}
      {isDemo && (
        <Card className="p-6 border-4 border-primary">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full animate-pulse ${
                  demoSteps[demoStep].color === 'red' ? 'bg-red-600' :
                  demoSteps[demoStep].color === 'orange' ? 'bg-orange-500' :
                  demoSteps[demoStep].color === 'yellow' ? 'bg-yellow-500' :
                  demoSteps[demoStep].color === 'success' ? 'bg-success' :
                  'bg-primary'
                }`} />
                <div>
                  <div className="text-xl font-bold text-gray-900">{demoSteps[demoStep].title}</div>
                  <div className="text-sm text-gray-600">{demoSteps[demoStep].description}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">Step {demoStep + 1} of {demoSteps.length}</div>
            </div>

            {demoSteps[demoStep].alert && (
              <div className={`p-4 rounded-lg mb-4 ${
                demoSteps[demoStep].color === 'red' ? 'bg-red-100 border-2 border-red-600' :
                'bg-orange-100 border-2 border-orange-500'
              }`}>
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`w-6 h-6 ${
                    demoSteps[demoStep].color === 'red' ? 'text-red-600' : 'text-orange-600'
                  }`} />
                  <div className={`font-bold ${
                    demoSteps[demoStep].color === 'red' ? 'text-red-900' : 'text-orange-900'
                  }`}>
                    {demoSteps[demoStep].alert}
                  </div>
                </div>
              </div>
            )}

            {demoSteps[demoStep].transcript && (
              <div className="space-y-3 mb-4">
                {demoSteps[demoStep].transcript?.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.speaker === 'AI' || msg.speaker.includes('Nurse') ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-lg ${
                      msg.speaker === 'AI'
                        ? 'bg-primary/10 border border-primary/20'
                        : msg.speaker.includes('Nurse')
                        ? 'bg-success/10 border border-success/20'
                        : 'bg-gray-100 border border-gray-200'
                    }`}>
                      <div className="text-xs font-bold text-gray-700 mb-1">{msg.speaker}</div>
                      <div className="text-sm text-gray-900">{msg.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {demoSteps[demoStep].contextData && (
              <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <div className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Context Transferred to Nurse
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-xs">
                  {Object.entries(demoSteps[demoStep].contextData).map(([key, value]) => (
                    <div key={key} className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-600 font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {demoStep === 2 && (
              <div className="mt-4 p-6 bg-orange-50 rounded-lg border-2 border-orange-200 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">{countdown}s</div>
                <div className="text-sm text-gray-700 animate-pulse">Finding available nurse...</div>
              </div>
            )}

            {demoSteps[demoStep].transferTime && (
              <div className="mt-4 p-4 bg-success/10 rounded-lg border-2 border-success">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-1">✓ Connected in {demoSteps[demoStep].transferTime}</div>
                  <div className="text-sm text-gray-700">Patient now speaking with qualified nurse</div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Escalation Triggers */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Automatic Escalation Triggers</h3>
        <p className="text-gray-600 mb-6">AI monitors every conversation for these keywords and scenarios:</p>

        <div className="space-y-3">
          {escalationTriggers.map((trigger, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 ${
                trigger.severity === 'critical' ? 'border-red-200 bg-red-50' :
                trigger.severity === 'high' ? 'border-orange-200 bg-orange-50' :
                trigger.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className={`w-5 h-5 ${
                      trigger.severity === 'critical' ? 'text-red-600' :
                      trigger.severity === 'high' ? 'text-orange-600' :
                      trigger.severity === 'medium' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                    <div className="font-bold text-gray-900">{trigger.trigger}</div>
                    <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      trigger.severity === 'critical' ? 'bg-red-600 text-white' :
                      trigger.severity === 'high' ? 'bg-orange-500 text-white' :
                      trigger.severity === 'medium' ? 'bg-yellow-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {trigger.severity}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600 font-medium mb-1">Keywords:</div>
                      <div className="flex flex-wrap gap-1">
                        {trigger.keywords.map((keyword, kidx) => (
                          <span key={kidx} className="px-2 py-0.5 bg-white rounded text-xs border border-gray-200">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 font-medium mb-1">Response Time:</div>
                      <div className="font-bold text-gray-900">{trigger.responseTime}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 font-medium mb-1">Action:</div>
                      <div className="font-medium text-gray-900">{trigger.action}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Why This Matters */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-success" />
            Benefits of Smart Escalation
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-success">1</span>
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">Patient Safety</div>
                <div className="text-gray-600">Critical symptoms identified and escalated in &lt;10 seconds</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-success">2</span>
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">Zero Context Loss</div>
                <div className="text-gray-600">Full conversation history transferred to human agent</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-success">3</span>
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">Efficient Resource Use</div>
                <div className="text-gray-600">71% AI resolution means nurses focus on complex cases</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-success">4</span>
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">Compliance & Documentation</div>
                <div className="text-gray-600">Every escalation automatically logged for quality review</div>
              </div>
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-purple-500/10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Escalation Statistics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm text-gray-700">AI Resolution (No Escalation)</span>
                <span className="text-2xl font-bold text-primary">{metrics.aiResolutionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-primary h-3 rounded-full" style={{ width: `${metrics.aiResolutionRate}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm text-gray-700">Human Escalation Required</span>
                <span className="text-2xl font-bold text-orange-600">{metrics.humanResolutionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-orange-500 h-3 rounded-full" style={{ width: `${metrics.humanResolutionRate}%` }} />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-700 mb-2">Average Transfer Time</div>
              <div className="text-3xl font-bold text-success">{metrics.avgTransferTime} seconds</div>
              <div className="text-xs text-gray-600 mt-1">Industry standard: 2-3 minutes</div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-700 mb-2">Patient Satisfaction Post-Escalation</div>
              <div className="text-3xl font-bold text-primary">{metrics.patientSatisfaction}/5 ⭐</div>
              <div className="text-xs text-gray-600 mt-1">Patients appreciate seamless handoff</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
