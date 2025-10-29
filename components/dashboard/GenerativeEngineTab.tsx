'use client'

import { useState } from 'react'
import { Bot, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Search, Database, Clock, BarChart3, Target, Zap, RefreshCw } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface MedicationProgram {
  id: string
  medication: string
  manufacturer: string
  copayProgram: string
  visibility: number
  accuracy: number
  mentions: number
  position: number
  trend: 'up' | 'down' | 'stable'
  trendValue: number
  lastUpdated: string
  competitors: {
    name: string
    mentions: number
  }[]
}

interface LLMResponse {
  id: string
  query: string
  medication: string
  gptResponse: string
  geminiResponse: string
  gptMentioned: boolean
  geminiMentioned: boolean
  gptAccurate: boolean
  geminiAccurate: boolean
  gptPosition: number
  geminiPosition: number
  timestamp: string
}

const medicationPrograms: MedicationProgram[] = [
  {
    id: 'MP001',
    medication: 'AVONEX',
    manufacturer: 'Biogen',
    copayProgram: 'AVONEX Copay Assistance',
    visibility: 68,
    accuracy: 85,
    mentions: 136,
    position: 2.3,
    trend: 'down',
    trendValue: 4,
    lastUpdated: '3:45 AM Today',
    competitors: [
      { name: 'Rebif', mentions: 52 },
      { name: 'Gilenya', mentions: 41 }
    ]
  },
  {
    id: 'MP002',
    medication: 'Dupixent',
    manufacturer: 'Sanofi',
    copayProgram: 'Dupixent MyWay',
    visibility: 82,
    accuracy: 92,
    mentions: 164,
    position: 1.8,
    trend: 'up',
    trendValue: 6,
    lastUpdated: '3:45 AM Today',
    competitors: [
      { name: 'Rinvoq', mentions: 38 },
      { name: 'Cibinqo', mentions: 29 }
    ]
  },
  {
    id: 'MP003',
    medication: 'Humira',
    manufacturer: 'AbbVie',
    copayProgram: 'Humira Complete',
    visibility: 91,
    accuracy: 95,
    mentions: 182,
    position: 1.2,
    trend: 'stable',
    trendValue: 1,
    lastUpdated: '3:45 AM Today',
    competitors: [
      { name: 'Enbrel', mentions: 104 },
      { name: 'Stelara', mentions: 62 }
    ]
  },
  {
    id: 'MP004',
    medication: 'Enbrel',
    manufacturer: 'Amgen',
    copayProgram: 'Enbrel Support',
    visibility: 76,
    accuracy: 88,
    mentions: 152,
    position: 2.1,
    trend: 'up',
    trendValue: 3,
    lastUpdated: '3:45 AM Today',
    competitors: [
      { name: 'Humira', mentions: 182 },
      { name: 'Cosentyx', mentions: 61 }
    ]
  },
  {
    id: 'MP005',
    medication: 'Stelara',
    manufacturer: 'Janssen',
    copayProgram: 'Stelara Copay Card',
    visibility: 65,
    accuracy: 81,
    mentions: 130,
    position: 2.8,
    trend: 'down',
    trendValue: 7,
    lastUpdated: '3:45 AM Today',
    competitors: [
      { name: 'Humira', mentions: 182 },
      { name: 'Skyrizi', mentions: 48 }
    ]
  }
]

const sampleQueries: LLMResponse[] = [
  {
    id: 'Q001',
    query: 'What copay assistance is available for AVONEX?',
    medication: 'AVONEX',
    gptResponse: 'AVONEX offers the AVONEX Copay Assistance Program for eligible patients. This program helps reduce out-of-pocket costs for commercially insured patients...',
    geminiResponse: 'Biogen provides copay support for AVONEX through their patient assistance program. Eligible patients may pay as little as $0 per month...',
    gptMentioned: true,
    geminiMentioned: true,
    gptAccurate: true,
    geminiAccurate: true,
    gptPosition: 1,
    geminiPosition: 2,
    timestamp: '3:15 AM Today'
  },
  {
    id: 'Q002',
    query: 'How much does AVONEX copay assistance save patients?',
    medication: 'AVONEX',
    gptResponse: 'The AVONEX copay program can help eligible patients save significantly on their out-of-pocket costs, with some patients paying as low as $0...',
    geminiResponse: 'Patients using AVONEX may be eligible for financial assistance. Savings vary based on insurance coverage and individual circumstances...',
    gptMentioned: true,
    geminiMentioned: false,
    gptAccurate: true,
    geminiAccurate: false,
    gptPosition: 1,
    geminiPosition: 0,
    timestamp: '3:16 AM Today'
  },
  {
    id: 'Q003',
    query: 'Who qualifies for Dupixent MyWay copay card?',
    medication: 'Dupixent',
    gptResponse: 'Dupixent MyWay copay card is available for commercially insured patients. Patients may pay as little as $0 per month with a maximum annual benefit...',
    geminiResponse: 'The Dupixent MyWay program offers copay assistance to eligible patients with commercial insurance. Medicare and Medicaid patients are not eligible...',
    gptMentioned: true,
    geminiMentioned: true,
    gptAccurate: true,
    geminiAccurate: true,
    gptPosition: 1,
    geminiPosition: 1,
    timestamp: '3:20 AM Today'
  }
]

interface RecommendationRules {
  critical: {
    visibilityThreshold: number
    trending: 'declining' | 'any'
    label: string
  }
  high: {
    visibilityThreshold: number
    accuracyThreshold: number
    label: string
  }
  medium: {
    positionThreshold: number
    trending: 'declining' | 'any'
    label: string
  }
}

export default function GenerativeEngineTab() {
  const [selectedProgram, setSelectedProgram] = useState<MedicationProgram | null>(null)
  const [selectedQuery, setSelectedQuery] = useState<LLMResponse | null>(null)
  const [viewMode, setViewMode] = useState<'overview' | 'drug-analysis'>('overview')
  const [showDetailedReport, setShowDetailedReport] = useState(false)
  const [isEditingRules, setIsEditingRules] = useState(false)
  const [rules, setRules] = useState<RecommendationRules>({
    critical: {
      visibilityThreshold: 50,
      trending: 'declining',
      label: 'Critical Low Visibility Issue'
    },
    high: {
      visibilityThreshold: 70,
      accuracyThreshold: 80,
      label: 'Needs Immediate Attention'
    },
    medium: {
      positionThreshold: 3.0,
      trending: 'declining',
      label: 'Optimization Opportunity'
    }
  })

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-success" />
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />
      case 'stable': return <RefreshCw className="w-4 h-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-success'
      case 'down': return 'text-red-600'
      case 'stable': return 'text-gray-600'
    }
  }

  const getVisibilityColor = (visibility: number) => {
    if (visibility >= 80) return 'text-success'
    if (visibility >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-success'
    if (accuracy >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  // Calculate aggregate metrics
  const avgVisibility = Math.round(
    medicationPrograms.reduce((sum, p) => sum + p.visibility, 0) / medicationPrograms.length
  )
  const avgAccuracy = Math.round(
    medicationPrograms.reduce((sum, p) => sum + p.accuracy, 0) / medicationPrograms.length
  )
  const totalQueries = 200 * medicationPrograms.length
  const totalAPIcalls = totalQueries * 2 // ChatGPT + Gemini

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">Live</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{medicationPrograms.length}</div>
          <div className="text-sm text-gray-600">Active Programs</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">+2%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{avgVisibility}%</div>
          <div className="text-sm text-gray-600">Avg Visibility</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">Excellent</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{avgAccuracy}%</div>
          <div className="text-sm text-gray-600">Avg Accuracy</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">Daily</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{totalAPIcalls}</div>
          <div className="text-sm text-gray-600">API Calls/Day</div>
        </Card>
      </div>

      {/* Last Run Status */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <div>
              <span className="font-medium text-gray-900">Last Run: Today at 3:45 AM</span>
              <span className="text-sm text-gray-600 ml-3">Next Run: Tomorrow at 3:00 AM</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-success/10 text-success border-success/20">
              <CheckCircle className="w-3 h-3 mr-1" />
              Completed Successfully
            </Badge>
            <Button size="sm" variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Run Now
            </Button>
          </div>
        </div>
      </Card>

      {/* Navigation Breadcrumbs */}
      {viewMode === 'drug-analysis' && selectedProgram && (
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => {
              setViewMode('overview')
              setSelectedProgram(null)
            }}
            className="text-primary hover:underline"
          >
            ← Back to All Programs
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{selectedProgram.medication} Analysis</span>
        </div>
      )}

      {/* Overview Mode */}
      {viewMode === 'overview' && (
        <>
          {/* Program Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {medicationPrograms.map((program) => (
              <Card
                key={program.id}
                className="p-6 cursor-pointer transition-all hover:shadow-lg hover:border-primary"
                onClick={() => {
                  setSelectedProgram(program)
                  setViewMode('drug-analysis')
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{program.medication}</h3>
                    <p className="text-sm text-gray-600">{program.copayProgram}</p>
                    <p className="text-xs text-gray-500 mt-1">{program.manufacturer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(program.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(program.trend)}`}>
                      {program.trend === 'up' ? '+' : program.trend === 'down' ? '-' : ''}
                      {program.trendValue}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-600">Visibility</div>
                    <div className={`text-2xl font-bold ${getVisibilityColor(program.visibility)}`}>
                      {program.visibility}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                    <div className={`text-2xl font-bold ${getAccuracyColor(program.accuracy)}`}>
                      {program.accuracy}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Mentions</div>
                    <div className="text-2xl font-bold text-primary">{program.mentions}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-xs text-gray-600">Avg Position</div>
                    <div className="text-sm font-medium text-gray-900">Paragraph {program.position}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {program.lastUpdated}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Drug-Specific Analysis */}
      {viewMode === 'drug-analysis' && selectedProgram && (
        <div className="space-y-6">
          {/* Header with Download Button */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedProgram.medication}</h2>
                <p className="text-gray-600">{selectedProgram.copayProgram}</p>
                <p className="text-sm text-gray-500 mt-1">{selectedProgram.manufacturer}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {getTrendIcon(selectedProgram.trend)}
                  <span className={`text-lg font-bold ${getTrendColor(selectedProgram.trend)}`}>
                    {selectedProgram.trend === 'up' ? '+' : selectedProgram.trend === 'down' ? '-' : ''}
                    {selectedProgram.trendValue}%
                  </span>
                </div>
                <Button
                  size="sm"
                  variant={showDetailedReport ? "primary" : "outline"}
                  onClick={() => setShowDetailedReport(!showDetailedReport)}
                >
                  <Search className="w-4 h-4 mr-2" />
                  {showDetailedReport ? 'Hide Details' : 'Detailed Report'}
                </Button>
                <Button size="sm" variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Visibility</div>
                <div className={`text-3xl font-bold ${getVisibilityColor(selectedProgram.visibility)}`}>
                  {selectedProgram.visibility}%
                </div>
                <div className="text-xs text-gray-600 mt-1">{selectedProgram.mentions} / 200 queries</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Accuracy</div>
                <div className={`text-3xl font-bold ${getAccuracyColor(selectedProgram.accuracy)}`}>
                  {selectedProgram.accuracy}%
                </div>
                <div className="text-xs text-gray-600 mt-1">Information correctness</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Avg Position</div>
                <div className="text-3xl font-bold text-primary">
                  {selectedProgram.position}
                </div>
                <div className="text-xs text-gray-600 mt-1">Paragraph placement</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Last Updated</div>
                <div className="text-lg font-bold text-gray-900">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Today
                </div>
                <div className="text-xs text-gray-600 mt-1">{selectedProgram.lastUpdated}</div>
              </div>
            </div>
          </Card>

          {/* Analysis Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Analysis Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="font-medium text-gray-900 mb-2">Performance Overview:</div>
                <p className="text-sm text-gray-700">
                  {selectedProgram.medication} has a visibility score of {selectedProgram.visibility}% across ChatGPT and Gemini responses,
                  with {selectedProgram.accuracy}% accuracy in information provided. The copay card is typically mentioned in paragraph {selectedProgram.position} of responses.
                  {selectedProgram.trend === 'down' && ` Visibility has declined by ${selectedProgram.trendValue}% compared to yesterday.`}
                  {selectedProgram.trend === 'up' && ` Visibility has improved by ${selectedProgram.trendValue}% compared to yesterday.`}
                  {selectedProgram.trend === 'stable' && ` Visibility remains stable with minimal change.`}
                </p>
              </div>

              <div>
                <div className="font-medium text-gray-900 mb-2">LLM Performance Breakdown:</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded">
                    <div className="text-sm font-medium text-blue-900 mb-1">ChatGPT (GPT-4)</div>
                    <div className="text-xs text-blue-700">Mentioned in 87% of relevant queries with 92% accuracy</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded">
                    <div className="text-sm font-medium text-purple-900 mb-1">Google Gemini</div>
                    <div className="text-xs text-purple-700">Mentioned in 73% of relevant queries with 85% accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Key Insights */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Key Insights</h3>
            <div className="space-y-3">
              {selectedProgram.visibility >= 80 && (
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-success mb-1">Strong Visibility</div>
                    <div className="text-sm text-gray-700">Program is well-represented across LLM responses with {selectedProgram.visibility}% visibility</div>
                  </div>
                </div>
              )}

              {selectedProgram.visibility < 70 && (
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-red-900 mb-1">Low Visibility Alert</div>
                    <div className="text-sm text-gray-700">Only {selectedProgram.visibility}% visibility - copay card not mentioned frequently enough in LLM responses</div>
                  </div>
                </div>
              )}

              {selectedProgram.accuracy >= 90 && (
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-900 mb-1">High Accuracy</div>
                    <div className="text-sm text-gray-700">{selectedProgram.accuracy}% of information provided by LLMs is correct and up-to-date</div>
                  </div>
                </div>
              )}

              {selectedProgram.accuracy < 85 && (
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-orange-900 mb-1">Accuracy Issues</div>
                    <div className="text-sm text-gray-700">Some LLMs are providing incorrect information about the copay program - only {selectedProgram.accuracy}% accuracy</div>
                  </div>
                </div>
              )}

              {selectedProgram.trend === 'down' && (
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-red-900 mb-1">Declining Trend</div>
                    <div className="text-sm text-gray-700">Visibility decreased by {selectedProgram.trendValue}% from yesterday - requires immediate attention</div>
                  </div>
                </div>
              )}

              {selectedProgram.position <= 2 && (
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Target className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-success mb-1">Prominent Positioning</div>
                    <div className="text-sm text-gray-700">Copay card mentioned early in responses (paragraph {selectedProgram.position}) - high visibility to users</div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Action Plan */}
          <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Action Plan</h3>

            <div className="space-y-4">
              {selectedProgram.visibility < 70 && (
                <div className="border-l-4 border-orange-600 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-orange-600 text-white">HIGH PRIORITY</Badge>
                    <span className="font-medium text-gray-900">Improve Visibility</span>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>1. Update copay program website - ensure savings amounts ($X copay, $X,XXX max benefit) are in first paragraph</li>
                    <li>2. Add FAQ section with key questions: "Who qualifies?", "How much will I save?", "How do I enroll?"</li>
                    <li>3. Ensure program details are clear and accessible on official pages</li>
                  </ul>
                  <div className="mt-2 text-xs text-gray-600">Timeline: Complete within 1 week | Owner: Digital Content Team</div>
                </div>
              )}

              {selectedProgram.accuracy < 85 && (
                <div className="border-l-4 border-yellow-600 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-yellow-600 text-white">MEDIUM PRIORITY</Badge>
                    <span className="font-medium text-gray-900">Improve Accuracy</span>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>1. Audit current program materials for outdated information</li>
                    <li>2. Update all public-facing content with current copay amounts and eligibility</li>
                    <li>3. Ensure consistency across website, brochures, and press releases</li>
                  </ul>
                  <div className="mt-2 text-xs text-gray-600">Timeline: Complete within 2 weeks | Owner: Brand Manager</div>
                </div>
              )}

              {selectedProgram.trend === 'down' && (
                <div className="border-l-4 border-red-600 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-red-600 text-white">URGENT</Badge>
                    <span className="font-medium text-gray-900">Address Declining Trend</span>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>1. Investigate cause of visibility decline - check for recent content changes or competitor activity</li>
                    <li>2. Review and refresh program content immediately</li>
                    <li>3. Monitor daily for further changes</li>
                  </ul>
                  <div className="mt-2 text-xs text-gray-600">Timeline: Start immediately | Owner: Marketing Director</div>
                </div>
              )}

              {selectedProgram.visibility >= 70 && selectedProgram.accuracy >= 85 && selectedProgram.trend !== 'down' && (
                <div className="border-l-4 border-green-600 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium text-gray-900">Maintain Current Strategy</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Program is performing well. Continue current content strategy and monitor for any changes in visibility or accuracy.
                  </p>
                  <div className="mt-2 text-xs text-gray-600">Review: Weekly monitoring | Owner: Brand Manager</div>
                </div>
              )}
            </div>
          </Card>

          {/* Detailed Report Section */}
          {showDetailedReport && (
            <>
              {/* Query Results Breakdown */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Query Results Breakdown
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Sample queries tested across ChatGPT (GPT-4) and Google Gemini to measure visibility and accuracy.
                </p>

                <div className="space-y-4">
                  {sampleQueries
                    .filter(q => q.medication === selectedProgram.medication)
                    .map((query) => (
                      <div key={query.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="font-medium text-gray-900 mb-3">
                          Query: "{query.query}"
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          {/* ChatGPT Response */}
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-blue-900">ChatGPT (GPT-4)</span>
                              <div className="flex gap-2">
                                {query.gptMentioned ? (
                                  <Badge className="bg-green-600 text-white text-xs">Mentioned</Badge>
                                ) : (
                                  <Badge className="bg-red-600 text-white text-xs">Not Mentioned</Badge>
                                )}
                                {query.gptAccurate ? (
                                  <Badge className="bg-blue-600 text-white text-xs">Accurate</Badge>
                                ) : (
                                  <Badge className="bg-orange-600 text-white text-xs">Inaccurate</Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-blue-800 mb-2">{query.gptResponse}</p>
                            {query.gptMentioned && (
                              <div className="text-xs text-blue-700">
                                Position: Paragraph {query.gptPosition}
                              </div>
                            )}
                          </div>

                          {/* Gemini Response */}
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-purple-900">Google Gemini</span>
                              <div className="flex gap-2">
                                {query.geminiMentioned ? (
                                  <Badge className="bg-green-600 text-white text-xs">Mentioned</Badge>
                                ) : (
                                  <Badge className="bg-red-600 text-white text-xs">Not Mentioned</Badge>
                                )}
                                {query.geminiAccurate ? (
                                  <Badge className="bg-purple-600 text-white text-xs">Accurate</Badge>
                                ) : (
                                  <Badge className="bg-orange-600 text-white text-xs">Inaccurate</Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-purple-800 mb-2">{query.geminiResponse}</p>
                            {query.geminiMentioned && (
                              <div className="text-xs text-purple-700">
                                Position: Paragraph {query.geminiPosition}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3 inline mr-1" />
                          Tested: {query.timestamp}
                        </div>
                      </div>
                    ))}
                </div>
              </Card>

              {/* Accuracy Issues */}
              <Card className="p-6 bg-orange-50 border-orange-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Accuracy Issues Detected
                </h3>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1">Incorrect Savings Amount</div>
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Issue:</span> Some LLM responses state max annual benefit as $15,000 when the actual amount is $16,000
                        </div>
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Impact:</span> Patients may underestimate available assistance
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <div className="p-2 bg-red-50 rounded border border-red-200">
                            <div className="text-xs font-medium text-red-900 mb-1">❌ Incorrect</div>
                            <div className="text-xs text-red-800">"...max annual benefit of $15,000"</div>
                          </div>
                          <div className="p-2 bg-green-50 rounded border border-green-200">
                            <div className="text-xs font-medium text-green-900 mb-1">✓ Correct</div>
                            <div className="text-xs text-green-800">"...max annual benefit of $16,000"</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1">Outdated Eligibility Criteria</div>
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Issue:</span> Some responses mention outdated income limits that were updated in 2024
                        </div>
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Impact:</span> Eligible patients may believe they don't qualify
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <div className="p-2 bg-red-50 rounded border border-red-200">
                            <div className="text-xs font-medium text-red-900 mb-1">❌ Outdated</div>
                            <div className="text-xs text-red-800">"...household income below $85,000"</div>
                          </div>
                          <div className="p-2 bg-green-50 rounded border border-green-200">
                            <div className="text-xs font-medium text-green-900 mb-1">✓ Current</div>
                            <div className="text-xs text-green-800">"...household income below $100,000"</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1">Missing Program Benefits</div>
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Issue:</span> LLMs often omit the free home delivery benefit included in the program
                        </div>
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Impact:</span> Patients miss key value-add services
                        </div>
                        <div className="p-2 bg-yellow-50 rounded border border-yellow-200 mt-3">
                          <div className="text-xs font-medium text-yellow-900 mb-1">⚠️ Often Missing</div>
                          <div className="text-xs text-yellow-800">Free home delivery, 24/7 support hotline, nurse education services</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Detailed Action Items */}
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Detailed Action Items
                </h3>

                <div className="space-y-6">
                  {/* Action 1 */}
                  <div className="bg-white p-5 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-red-600 text-white">URGENT</Badge>
                      <h4 className="font-bold text-gray-900">Update Official Website Content</h4>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">1</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">Homepage Hero Section</div>
                          <div className="text-sm text-gray-700">Update first paragraph to include: "Eligible patients pay as little as $0 copay with up to $16,000 in annual benefits"</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">2</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">Eligibility Page</div>
                          <div className="text-sm text-gray-700">Clearly state updated income limits: "Household income up to $100,000 annually"</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">3</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">Benefits Section</div>
                          <div className="text-sm text-gray-700">Add bulleted list: Copay assistance, Free home delivery, 24/7 support hotline, Nurse education services</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Timeline:</span> Complete within 3 business days
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Owner:</span> Digital Content Team
                      </div>
                    </div>
                  </div>

                  {/* Action 2 */}
                  <div className="bg-white p-5 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-orange-600 text-white">HIGH</Badge>
                      <h4 className="font-bold text-gray-900">Create Comprehensive FAQ</h4>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">1</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">Add Top 10 Questions</div>
                          <div className="text-sm text-gray-700">Include: "Who qualifies?", "How much will I save?", "What's the max benefit?", "Does it include delivery?"</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">2</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">Use Clear Language</div>
                          <div className="text-sm text-gray-700">Write answers in plain English, avoid medical jargon, include specific dollar amounts</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">3</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">Schema Markup</div>
                          <div className="text-sm text-gray-700">Add FAQ schema markup to help LLMs parse information correctly</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Timeline:</span> Complete within 1 week
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Owner:</span> Content Strategy Team
                      </div>
                    </div>
                  </div>

                  {/* Action 3 */}
                  <div className="bg-white p-5 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-yellow-600 text-white">MEDIUM</Badge>
                      <h4 className="font-bold text-gray-900">Press Release & News Updates</h4>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">1</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">Issue Updated Press Release</div>
                          <div className="text-sm text-gray-700">Highlight 2024 program enhancements: increased benefit cap, expanded eligibility, added services</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">2</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">Share with Medical News Sites</div>
                          <div className="text-sm text-gray-700">Distribute to healthcare-focused publications that LLMs often reference</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">3</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">Monitor Pickup</div>
                          <div className="text-sm text-gray-700">Track which outlets publish the information and measure impact on LLM visibility</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Timeline:</span> Complete within 2 weeks
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Owner:</span> PR & Communications
                      </div>
                    </div>
                  </div>

                  {/* Action 4 */}
                  <div className="bg-white p-5 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-blue-600 text-white">ONGOING</Badge>
                      <h4 className="font-bold text-gray-900">Continuous Monitoring</h4>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">1</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">Daily Automated Checks</div>
                          <div className="text-sm text-gray-700">System runs 200 queries per program daily across ChatGPT and Gemini</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">2</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">Alert on Significant Changes</div>
                          <div className="text-sm text-gray-700">Automatic email alerts when visibility drops {'>'}5% or accuracy falls below 85%</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">3</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">Weekly Performance Review</div>
                          <div className="text-sm text-gray-700">Marketing team reviews trends and adjusts content strategy as needed</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Timeline:</span> Ongoing
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Owner:</span> Marketing Analytics Team
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}
