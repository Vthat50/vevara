'use client'

import { useState } from 'react'
import { AlertCircle, Activity, TrendingDown, Shield, CheckCircle } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface SideEffectReport {
  id: string
  patientName: string
  medication: string
  symptom: string
  severity: number
  status: 'monitoring' | 'escalated' | 'resolved'
  reportedDate: string
}

const reports: SideEffectReport[] = [
  { id: 'SE001', patientName: 'Michael Chen', medication: 'Humira 40mg', symptom: 'Injection site reaction', severity: 3, status: 'monitoring', reportedDate: 'Oct 27' },
  { id: 'SE002', patientName: 'Emma Davis', medication: 'Trulicity 1.5mg', symptom: 'Nausea', severity: 5, status: 'escalated', reportedDate: 'Oct 26' },
  { id: 'SE003', patientName: 'David Kim', medication: 'Enbrel 50mg', symptom: 'Headache', severity: 2, status: 'resolved', reportedDate: 'Oct 25' }
]

export default function SideEffectsTab() {
  const [selectedReport, setSelectedReport] = useState<SideEffectReport | null>(reports[0])

  const getSeverityColor = (severity: number) => {
    if (severity >= 7) return 'text-red-600'
    if (severity >= 4) return 'text-orange-600'
    return 'text-yellow-600'
  }

  const getStatusColor = (status: SideEffectReport['status']) => {
    switch (status) {
      case 'monitoring': return 'bg-primary/10 text-primary border-primary/20'
      case 'escalated': return 'bg-red-500/10 text-red-600 border-red-500/20'
      case 'resolved': return 'bg-success/10 text-success border-success/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">24</div>
          <div className="text-sm text-gray-600">Active Reports</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-3">
            <TrendingDown className="w-6 h-6 text-success" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">2.3</div>
          <div className="text-sm text-gray-600">Avg Severity Score</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
          <div className="text-sm text-gray-600">High Priority</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">94%</div>
          <div className="text-sm text-gray-600">FDA Compliance</div>
        </Card>
      </div>

      {/* Reports */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Side Effect Reports</h3>
        <div className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedReport?.id === report.id ? 'border-primary bg-primary/5' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-gray-900">{report.patientName}</div>
                  <div className="text-sm text-gray-600">{report.symptom}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(report.status)}`}>
                  {report.status.toUpperCase()}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">{report.medication}</span>
                <span className={`font-medium ${getSeverityColor(report.severity)}`}>
                  Severity: {report.severity}/10
                </span>
                <span className="text-gray-600">{report.reportedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Check-in Schedule */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Side Effect Check-in Schedule</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Day 3 Check-in</div>
              <div className="text-sm text-gray-600">Initial side effect assessment</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Day 7 Check-in</div>
              <div className="text-sm text-gray-600">Early monitoring</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Day 14 Check-in</div>
              <div className="text-sm text-gray-600">Mid-term assessment</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Day 30 Check-in</div>
              <div className="text-sm text-gray-600">Long-term monitoring</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
