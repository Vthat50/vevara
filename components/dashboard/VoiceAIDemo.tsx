'use client'

import { useState, useEffect } from 'react'
import { Mic, MicOff, Phone, Volume2, MessageSquare, Zap, Globe } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

export default function VoiceAIDemo() {
  const [isCallActive, setIsCallActive] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const conversation = [
    {
      speaker: 'AI',
      message: "Hi Maria! This is your Ozempic support assistant. I'm calling to help with your first injection tomorrow. Do you have a few minutes to talk?",
      timestamp: '0:00'
    },
    {
      speaker: 'Patient',
      message: "Yes, I have time. I'm actually pretty nervous about the injection.",
      timestamp: '0:08'
    },
    {
      speaker: 'AI',
      message: "That's completely normal. Let me walk you through it step by step. First, have you done injections before, or is this your first time?",
      timestamp: '0:15'
    },
    {
      speaker: 'Patient',
      message: "This is my first time doing any kind of injection myself.",
      timestamp: '0:23'
    },
    {
      speaker: 'AI',
      message: "No problem! I'll make it simple. The Ozempic pen is designed to be easy. Can you tell me - do you have your pen with you right now?",
      timestamp: '0:28'
    },
    {
      speaker: 'Patient',
      message: "Yes, I picked it up from the pharmacy yesterday.",
      timestamp: '0:36'
    },
    {
      speaker: 'AI',
      message: "Perfect. Before we talk about the injection, I want to make sure you know about the copay savings card. Without it, your copay would be $120 per month. With the savings card, it's only $25. Would you like me to enroll you right now?",
      timestamp: '0:41'
    },
    {
      speaker: 'Patient',
      message: "Oh wow, yes! I didn't know about that.",
      timestamp: '0:54'
    },
    {
      speaker: 'AI',
      message: "Great! I just need to confirm your insurance information. You have Blue Cross Blue Shield, correct? [Patient confirms] Perfect, you're enrolled! Your savings card is active immediately. You'll save $95 every month.",
      timestamp: '0:58'
    },
    {
      speaker: 'Patient',
      message: "That's amazing, thank you!",
      timestamp: '1:15'
    },
    {
      speaker: 'AI',
      message: "You're welcome! Now let's go back to the injection. I'll call you tomorrow at 9 AM to walk you through it step-by-step. Does that time work for you?",
      timestamp: '1:18'
    },
    {
      speaker: 'Patient',
      message: "Yes, that works perfectly.",
      timestamp: '1:28'
    },
    {
      speaker: 'AI',
      message: "Excellent. I'll also check in with you on day 3 to see how you're feeling and answer any questions about side effects. Sound good?",
      timestamp: '1:31'
    },
    {
      speaker: 'Patient',
      message: "Yes, thank you so much. I feel much better about this now.",
      timestamp: '1:41'
    },
    {
      speaker: 'AI',
      message: "I'm glad I could help! Remember, you can call or text me anytime if you have questions. Talk to you tomorrow at 9 AM!",
      timestamp: '1:46'
    }
  ]

  const startDemo = () => {
    setIsCallActive(true)
    setCurrentMessage(0)
    playConversation()
  }

  const playConversation = () => {
    let index = 0
    const interval = setInterval(() => {
      if (index < conversation.length) {
        setCurrentMessage(index)
        setIsSpeaking(true)
        setTimeout(() => setIsSpeaking(false), 2000)
        index++
      } else {
        setIsCallActive(false)
        clearInterval(interval)
      }
    }, 4000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Interactive Voice AI Demo</h2>
        <p className="text-lg text-gray-600">See how AI handles patient support with <span className="text-primary font-bold">&lt;1 second response time</span></p>
      </div>

      {/* Key Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 bg-primary/5">
          <div className="text-2xl font-bold text-primary mb-1">99%</div>
          <div className="text-sm text-gray-600">Medical Accuracy</div>
        </Card>
        <Card className="p-4 bg-success/5">
          <div className="text-2xl font-bold text-success mb-1">&lt;1s</div>
          <div className="text-sm text-gray-600">Response Time</div>
        </Card>
        <Card className="p-4 bg-purple-500/5">
          <div className="text-2xl font-bold text-purple-600 mb-1">71%</div>
          <div className="text-sm text-gray-600">AI Resolution Rate</div>
        </Card>
        <Card className="p-4 bg-orange-500/5">
          <div className="text-2xl font-bold text-orange-600 mb-1">20+</div>
          <div className="text-sm text-gray-600">Languages Supported</div>
        </Card>
      </div>

      {/* Main Demo Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Conversation Display */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isCallActive ? 'bg-success animate-pulse' : 'bg-gray-200'
              }`}>
                {isCallActive ? (
                  <Phone className="w-6 h-6 text-white" />
                ) : (
                  <Phone className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div>
                <div className="font-bold text-gray-900">Welcome Call - New Prescription</div>
                <div className="text-sm text-gray-600">
                  {isCallActive ? (
                    <span className="text-success flex items-center gap-1">
                      <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                      Call in progress
                    </span>
                  ) : (
                    'Ready to start demo'
                  )}
                </div>
              </div>
            </div>
            {!isCallActive && (
              <Button onClick={startDemo} className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Start Demo Call
              </Button>
            )}
          </div>

          {/* Conversation Transcript */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {conversation.slice(0, currentMessage + 1).map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.speaker === 'AI' ? 'justify-start' : 'justify-end'} animate-fadeIn`}
              >
                <div className={`max-w-[80%] rounded-lg p-4 ${
                  msg.speaker === 'AI'
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-gray-100 border border-gray-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-gray-700">{msg.speaker}</span>
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    {idx === currentMessage && isSpeaking && (
                      <Volume2 className="w-3 h-3 text-primary animate-pulse" />
                    )}
                  </div>
                  <p className="text-sm text-gray-900 leading-relaxed">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {isCallActive && currentMessage < conversation.length - 1 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span>AI is responding...</span>
            </div>
          )}
        </Card>

        {/* Features Highlight */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              What Happened in This Call
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-success/10 rounded flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-success">1</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Patient Education</div>
                  <div className="text-gray-600">AI adapted to first-time injector</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-success/10 rounded flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-success">2</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Copay Enrollment</div>
                  <div className="text-gray-600">$95/month savings activated</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-success/10 rounded flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-success">3</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Follow-up Scheduled</div>
                  <div className="text-gray-600">Day 1 injection support + Day 3 check-in</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-success/10 rounded flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-success">4</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Anxiety Reduced</div>
                  <div className="text-gray-600">Patient feels supported and confident</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-purple-500/10">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Multi-Language Support
            </h3>
            <p className="text-sm text-gray-700 mb-3">AI automatically detects and speaks 20+ languages:</p>
            <div className="flex flex-wrap gap-2">
              {['English', 'Spanish', 'Mandarin', 'Hindi', 'Arabic', 'French', 'Portuguese', 'German'].map((lang) => (
                <span key={lang} className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700">
                  {lang}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-3">Call Outcome</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-900">1:55</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resolution:</span>
                <span className="font-medium text-success">✓ AI Resolved</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Copay Enrolled:</span>
                <span className="font-medium text-success">✓ Yes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Follow-up Set:</span>
                <span className="font-medium text-success">✓ Yes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Patient Satisfaction:</span>
                <span className="font-medium text-gray-900">5/5 ⭐</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Value Proposition */}
      <Card className="p-6 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">307,000+</div>
            <div className="text-sm opacity-90">Simulated patient interactions proving 99% accuracy</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">90%</div>
            <div className="text-sm opacity-90">Reduction in manpower costs through automation</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">26%</div>
            <div className="text-sm opacity-90">Higher adherence with copay support</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

function Play({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
