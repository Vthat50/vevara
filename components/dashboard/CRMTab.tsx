'use client'

import { useState } from 'react'
import { Database, Users, TrendingUp, Target, CheckCircle, RefreshCw } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface CRMRecord {
  id: string
  patientName: string
  segment: string
  lastInteraction: string
  engagementScore: number
  status: 'active' | 'inactive' | 'at-risk'
}

const crmRecords: CRMRecord[] = [
  { id: 'CRM001', patientName: 'Sarah Johnson', segment: 'High Adherence', lastInteraction: '2 hours ago', engagementScore: 94, status: 'active' },
  { id: 'CRM002', patientName: 'Michael Chen', segment: 'Side Effect Monitoring', lastInteraction: '5 hours ago', engagementScore: 76, status: 'active' },
  { id: 'CRM003', patientName: 'Emma Davis', segment: 'At-Risk', lastInteraction: '1 day ago', engagementScore: 42, status: 'at-risk' },
  { id: 'CRM004', patientName: 'John Williams', segment: 'Refill Due', lastInteraction: '3 hours ago', engagementScore: 88, status: 'active' }
]

export default function CRMTab() {
  const [selectedRecord, setSelectedRecord] = useState<CRMRecord | null>(crmRecords[0])
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing'>('idle')

  const handleSync = () => {
    setSyncStatus('syncing')
    setTimeout(() => setSyncStatus('idle'), 2000)
  }

  const getStatusColor = (status: CRMRecord['status']) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20'
      case 'inactive': return 'bg-gray-200 text-gray-600 border-gray-300'
      case 'at-risk': return 'bg-red-500/10 text-red-600 border-red-500/20'
    }
  }

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-success'
    if (score >= 60) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
            <Database className="w-6 h-6 text-primary" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">1,247</div>
          <div className="text-sm text-gray-600">Total Records</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-3">
            <Users className="w-6 h-6 text-success" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">894</div>
          <div className="text-sm text-gray-600">Active Patients</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">78</div>
          <div className="text-sm text-gray-600">Avg Engagement Score</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
            <Target className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
          <div className="text-sm text-gray-600">Active Campaigns</div>
        </Card>
      </div>

      {/* Sync Controls */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">CRM Integration</h3>
            <p className="text-sm text-gray-600 mt-1">Connected to Salesforce • Last sync: 5 minutes ago</p>
          </div>
          <Button
            onClick={handleSync}
            disabled={syncStatus === 'syncing'}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}
          </Button>
        </div>
      </Card>

      {/* CRM Records */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Patient Records</h3>
        <div className="space-y-3">
          {crmRecords.map((record) => (
            <div
              key={record.id}
              onClick={() => setSelectedRecord(record)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedRecord?.id === record.id ? 'border-primary bg-primary/5' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-gray-900">{record.patientName}</div>
                  <div className="text-sm text-gray-600">{record.segment}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(record.status)}`}>
                  {record.status.toUpperCase()}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">Last: {record.lastInteraction}</span>
                <span className={`font-medium ${getEngagementColor(record.engagementScore)}`}>
                  Engagement: {record.engagementScore}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Integration Features */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">CRM Integration Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Patient Record Sync</div>
              <div className="text-sm text-gray-600">Automatic updates and creation</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Interaction History</div>
              <div className="text-sm text-gray-600">Complete call and engagement logs</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Segmentation Support</div>
              <div className="text-sm text-gray-600">Automatic patient categorization</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">Campaign Integration</div>
              <div className="text-sm text-gray-600">Salesforce, Veeva, and more</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
