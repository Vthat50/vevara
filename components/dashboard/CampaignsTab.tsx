'use client'

import { useState } from 'react'
import { Megaphone, Plus, Play, Pause, Edit, Trash2, Users, Phone, Mail, MessageSquare, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Campaign {
  id: string
  name: string
  type: 'phone' | 'sms' | 'email'
  status: 'active' | 'paused' | 'draft' | 'completed'
  target: number
  reached: number
  engaged: number
  converted: number
  startDate: string
  endDate: string
}

export default function CampaignsTab() {
  const [showBuilder, setShowBuilder] = useState(false)
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 'C-001',
      name: 'Welcome Series - New Patients',
      type: 'phone',
      status: 'active',
      target: 450,
      reached: 368,
      engaged: 302,
      converted: 287,
      startDate: '2025-10-01',
      endDate: '2025-10-31'
    },
    {
      id: 'C-002',
      name: 'Refill Reminder - Week 52',
      type: 'sms',
      status: 'active',
      target: 892,
      reached: 847,
      engaged: 723,
      converted: 634,
      startDate: '2025-10-15',
      endDate: '2025-10-29'
    },
    {
      id: 'C-003',
      name: 'Copay Enrollment Drive',
      type: 'email',
      status: 'paused',
      target: 1200,
      reached: 234,
      engaged: 187,
      converted: 94,
      startDate: '2025-10-10',
      endDate: '2025-11-10'
    },
    {
      id: 'C-004',
      name: 'Side Effect Check-in Series',
      type: 'phone',
      status: 'active',
      target: 342,
      reached: 289,
      engaged: 267,
      converted: 245,
      startDate: '2025-10-20',
      endDate: '2025-11-05'
    },
  ])

  const consentStats = {
    total: 12847,
    activeConsent: 12356,
    percentage: 96.1,
    optedOut: 491
  }

  const campaignPerformance = [
    { month: 'Jul', engagement: 78, conversion: 65 },
    { month: 'Aug', engagement: 81, conversion: 68 },
    { month: 'Sep', engagement: 79, conversion: 70 },
    { month: 'Oct', engagement: 82, conversion: 72 },
  ]

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(campaigns.map(c =>
      c.id === id
        ? { ...c, status: c.status === 'active' ? 'paused' : 'active' as any }
        : c
    ))
  }

  const deleteCampaign = (id: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Campaign Management</h2>
          <p className="text-gray-600">Create and manage automated patient outreach campaigns</p>
        </div>
        <Button
          size="lg"
          onClick={() => setShowBuilder(!showBuilder)}
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {showBuilder ? 'Close Builder' : 'New Campaign'}
        </Button>
      </div>

      {/* Campaign Builder */}
      {showBuilder && (
        <Card className="p-6 bg-primary/5 border-2 border-primary">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Campaign Builder</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                <input
                  type="text"
                  placeholder="e.g., Monthly Refill Reminders"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                  <option>Voice Call (AI)</option>
                  <option>SMS</option>
                  <option>Email</option>
                  <option>Multi-Channel</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                <option>All Active Patients</option>
                <option>Due for Refill (7 days)</option>
                <option>Overdue for Refill</option>
                <option>New Enrollments (30 days)</option>
                <option>High Risk Patients</option>
                <option>Custom Segment...</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Template</label>
              <textarea
                rows={4}
                placeholder="Enter your message template here..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button size="lg">
                <Play className="w-4 h-4 mr-2" />
                Launch Campaign
              </Button>
              <Button variant="outline" size="lg">
                Save as Draft
              </Button>
              <Button variant="secondary" size="lg" onClick={() => setShowBuilder(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-success">2 active</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{campaigns.length}</div>
          <div className="text-sm text-gray-600">Total Campaigns</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">+4%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">82%</div>
          <div className="text-sm text-gray-600">Avg Engagement Rate</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-success">+12%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">72%</div>
          <div className="text-sm text-gray-600">Conversion Rate</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">96.1%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{consentStats.activeConsent.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Active Consents</div>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Active Campaigns</h3>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    campaign.type === 'phone' ? 'bg-primary/10' :
                    campaign.type === 'sms' ? 'bg-success/10' : 'bg-purple-500/10'
                  }`}>
                    {campaign.type === 'phone' && <Phone className="w-5 h-5 text-primary" />}
                    {campaign.type === 'sms' && <MessageSquare className="w-5 h-5 text-success" />}
                    {campaign.type === 'email' && <Mail className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-sm text-gray-600">{campaign.id} • {campaign.type.toUpperCase()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-success/10 text-success' :
                    campaign.status === 'paused' ? 'bg-orange-500/10 text-orange-600' :
                    campaign.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                    'bg-blue-500/10 text-blue-600'
                  }`}>
                    {campaign.status}
                  </span>
                  <button
                    onClick={() => toggleCampaignStatus(campaign.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {campaign.status === 'active' ? (
                      <Pause className="w-4 h-4 text-orange-500" />
                    ) : (
                      <Play className="w-4 h-4 text-success" />
                    )}
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => deleteCampaign(campaign.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-3">
                <div>
                  <div className="text-xs text-gray-600">Target</div>
                  <div className="text-lg font-bold text-gray-900">{campaign.target}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Reached</div>
                  <div className="text-lg font-bold text-primary">{campaign.reached}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Engaged</div>
                  <div className="text-lg font-bold text-success">{campaign.engaged}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Converted</div>
                  <div className="text-lg font-bold text-purple-600">{campaign.converted}</div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Progress: {Math.round((campaign.reached / campaign.target) * 100)}%</span>
                  <span>Conversion: {Math.round((campaign.converted / campaign.reached) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-primary to-success"
                    style={{ width: `${(campaign.reached / campaign.target) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{campaign.startDate} to {campaign.endDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance & Consent */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Campaign Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={campaignPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis dataKey="month" stroke="#666666" />
              <YAxis stroke="#666666" />
              <Tooltip />
              <Bar dataKey="engagement" fill="#2563EB" radius={[4, 4, 0, 0]} name="Engagement %" />
              <Bar dataKey="conversion" fill="#10B981" radius={[4, 4, 0, 0]} name="Conversion %" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Consent Management</h3>
          <div className="space-y-4">
            <div className="p-4 bg-success/5 rounded-lg border border-success/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Active Program Consent</span>
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div className="text-3xl font-bold text-success mb-1">{consentStats.percentage}%</div>
              <div className="text-sm text-gray-600">{consentStats.activeConsent.toLocaleString()} of {consentStats.total.toLocaleString()} patients</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Phone Consent</div>
                <div className="text-2xl font-bold text-gray-900">11,847</div>
                <div className="text-xs text-gray-600">92.2%</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">SMS Consent</div>
                <div className="text-2xl font-bold text-gray-900">10,234</div>
                <div className="text-xs text-gray-600">79.7%</div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">Opted Out</div>
                  <div className="text-xs text-gray-600">Requires re-engagement</div>
                </div>
                <div className="text-2xl font-bold text-orange-600">{consentStats.optedOut}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
