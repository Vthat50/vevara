'use client'

import { useState } from 'react'
import { Search, Play, Pause, RotateCcw, Send, Clock, CheckCircle, XCircle } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface Conversation {
  id: string
  patientName: string
  topic: string
  timestamp: string
  duration: string
  status: 'active' | 'completed' | 'error'
  accuracy: number
  responseTime: number
}

const conversations: Conversation[] = [
  {
    id: 'CONV001',
    patientName: 'Sarah Johnson',
    topic: 'Injection Instructions',
    timestamp: '2 min ago',
    duration: '5:24',
    status: 'active',
    accuracy: 99.2,
    responseTime: 0.8
  },
  {
    id: 'CONV002',
    patientName: 'Michael Chen',
    topic: 'Side Effects Query',
    timestamp: '15 min ago',
    duration: '3:45',
    status: 'completed',
    accuracy: 99.8,
    responseTime: 0.6
  },
  {
    id: 'CONV003',
    patientName: 'Emma Davis',
    topic: 'Dosing Schedule',
    timestamp: '1 hour ago',
    duration: '4:12',
    status: 'completed',
    accuracy: 99.5,
    responseTime: 0.7
  }
]

const topics = [
  'Injection Instructions',
  'Side Effects',
  'Dosing Schedule',
  'Storage & Handling',
  'Missed Dose',
  'Drug Interactions',
  'Diet Recommendations',
  'When to Call Doctor'
]

export default function ConversationalAITab() {
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(conversations[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [testQuery, setTestQuery] = useState('')
  const [testResponse, setTestResponse] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleTestQuery = () => {
    if (!testQuery.trim()) return

    setIsProcessing(true)
    // Simulate AI processing
    setTimeout(() => {
      setTestResponse(`Based on your question about "${testQuery}", here's the response: This is a simulated AI response with >99% medical accuracy. The system uses natural language understanding to provide context-aware responses based on patient history and medication information.`)
      setIsProcessing(false)
    }, 800)
  }

  const getStatusColor = (status: Conversation['status']) => {
    switch (status) {
      case 'active': return 'bg-primary/10 text-primary border-primary/20'
      case 'completed': return 'bg-success/10 text-success border-success/20'
      case 'error': return 'bg-red-500/10 text-red-600 border-red-500/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">+0.3%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">99.4%</div>
          <div className="text-sm text-gray-600">Medical Accuracy</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-success">-0.2s</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">0.7s</div>
          <div className="text-sm text-gray-600">Avg Response Time</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-success">+12%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">342</div>
          <div className="text-sm text-gray-600">Conversations Today</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Play className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-primary">12 Active</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">35+</div>
          <div className="text-sm text-gray-600">Supported Topics</div>
        </Card>
      </div>

      {/* Test AI Engine */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Test AI Engine</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Patient Query
            </label>
            <textarea
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              placeholder="e.g., How do I inject Ozempic?"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={3}
            />
          </div>
          <Button
            onClick={handleTestQuery}
            disabled={isProcessing || !testQuery.trim()}
            className="flex items-center gap-2"
          >
            {isProcessing ? <Pause className="w-4 h-4 animate-pulse" /> : <Send className="w-4 h-4" />}
            {isProcessing ? 'Processing...' : 'Test Query'}
          </Button>

          {testResponse && (
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <div className="font-bold text-gray-900 mb-1">AI Response (0.8s)</div>
                  <p className="text-sm text-gray-700">{testResponse}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-4 text-xs text-gray-600">
                <span>Accuracy: 99.8%</span>
                <span>Context-Aware: Yes</span>
                <span>HIPAA Compliant: Yes</span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Supported Topics */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Supported Topics (35+)</h3>
        <div className="grid md:grid-cols-4 gap-3">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{topic}</span>
                <CheckCircle className="w-4 h-4 text-success" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Conversations */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Conversations</h3>
        <div className="space-y-3">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConv(conv)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedConv?.id === conv.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-gray-900">{conv.patientName}</div>
                  <div className="text-sm text-gray-600">{conv.topic}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(conv.status)}`}>
                  {conv.status.toUpperCase()}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{conv.timestamp}</span>
                <span>Duration: {conv.duration}</span>
                <span className="text-success">Accuracy: {conv.accuracy}%</span>
                <span className="text-primary">Response: {conv.responseTime}s</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Requirements */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">System Requirements Status</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Response Time: 0.7s</div>
              <div className="text-sm text-gray-600">Target: &lt;1 second</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Medical Accuracy: 99.4%</div>
              <div className="text-sm text-gray-600">Target: &gt;99%</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Topics Supported: 35+</div>
              <div className="text-sm text-gray-600">Target: 30+ topics</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">HIPAA Compliance: Active</div>
              <div className="text-sm text-gray-600">All conversations encrypted</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
