'use client'

import { useState } from 'react'
import { BookOpen, PlayCircle, CheckCircle, AlertCircle, Search } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

const educationTopics = [
  { id: '1', title: 'Injection Instructions', medication: 'Ozempic', views: 342, completion: 94 },
  { id: '2', title: 'Dosing Schedule', medication: 'Humira', views: 289, completion: 91 },
  { id: '3', title: 'Storage & Handling', medication: 'Trulicity', views: 256, completion: 88 },
  { id: '4', title: 'Side Effect Management', medication: 'Enbrel', views: 234, completion: 86 },
  { id: '5', title: 'What to Do if Dose Missed', medication: 'Stelara', views: 198, completion: 82 },
  { id: '6', title: 'Diet & Lifestyle Tips', medication: 'Ozempic', views: 187, completion: 79 }
]

export default function MedicationEducationTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTopic, setSelectedTopic] = useState(educationTopics[0])

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">35+</div>
          <div className="text-sm text-gray-600">Education Topics</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-3">
            <PlayCircle className="w-6 h-6 text-success" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">1,247</div>
          <div className="text-sm text-gray-600">Sessions Today</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3">
            <CheckCircle className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">87%</div>
          <div className="text-sm text-gray-600">Completion Rate</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">8:34</div>
          <div className="text-sm text-gray-600">Avg Session Time</div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search education topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </Card>

      {/* Topics */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Topics</h3>
        <div className="space-y-3">
          {educationTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedTopic?.id === topic.id ? 'border-primary bg-primary/5' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-gray-900">{topic.title}</div>
                  <div className="text-sm text-gray-600">{topic.medication}</div>
                </div>
                <PlayCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{topic.views} views</span>
                <span className="text-success">{topic.completion}% completion</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Features */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Education Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Interactive Guidance</div>
              <div className="text-sm text-gray-600">Step-by-step medication administration</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Visual Confirmation</div>
              <div className="text-sm text-gray-600">Injection technique verification</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Side Effect Education</div>
              <div className="text-sm text-gray-600">Common effects and management</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">When to Seek Help</div>
              <div className="text-sm text-gray-600">Red flag detection guidance</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
