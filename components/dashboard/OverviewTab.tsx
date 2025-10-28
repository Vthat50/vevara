'use client'

import { Phone, Users, TrendingUp, Activity, DollarSign, AlertTriangle, CheckCircle, Clock, ThumbsUp, BarChart3, CreditCard, UserPlus } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface OverviewTabProps {
  onNavigate?: (tab: string) => void
}

export default function OverviewTab({ onNavigate }: OverviewTabProps) {
  const recentActivity = [
    { time: '2 min ago', text: 'Sarah Johnson enrolled in copay program', type: 'success' },
    { time: '5 min ago', text: 'Michael Chen scheduled refill', type: 'success' },
    { time: '12 min ago', text: 'Emma Davis completed welcome call', type: 'info' },
    { time: '18 min ago', text: 'John Williams side effect check-in', type: 'info' },
    { time: '25 min ago', text: 'Lisa Anderson adherence reminder sent', type: 'info' },
    { time: '32 min ago', text: 'Robert Martinez enrolled in copay program', type: 'success' },
    { time: '45 min ago', text: 'Patricia Lee completed refill', type: 'success' },
    { time: '1 hr ago', text: 'David Kim welcome call scheduled', type: 'info' },
  ]

  const alerts = [
    { id: 1, severity: 'high', message: 'Call volume 23% above average in last hour', time: '5 min ago' },
    { id: 2, severity: 'low', message: '3 patients with adherence below 70%', time: '1 hr ago' },
  ]

  const callVolumeHourly = [
    { hour: '8 AM', calls: 12 },
    { hour: '9 AM', calls: 28 },
    { hour: '10 AM', calls: 45 },
    { hour: '11 AM', calls: 38 },
    { hour: '12 PM', calls: 31 },
    { hour: '1 PM', calls: 42 },
    { hour: '2 PM', calls: 52 },
    { hour: '3 PM', calls: 47 },
  ]

  const maxCalls = Math.max(...callVolumeHourly.map(h => h.calls))

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-600">Real-time analytics and performance monitoring for your Voice AI platform.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">+8%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">1,247</div>
          <div className="text-sm text-gray-600">Active Patients</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-success">+12%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">342</div>
          <div className="text-sm text-gray-600">Calls Today</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">+2.1%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">94.2%</div>
          <div className="text-sm text-gray-600">Adherence Rate</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-success">+3%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">71%</div>
          <div className="text-sm text-gray-600">AI Resolution Rate</div>
        </Card>
      </div>

      {/* Live Call Volume Monitoring */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Live Call Volume</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-gray-600">Live</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="text-3xl font-bold text-gray-900 mb-1">342</div>
            <div className="text-sm text-gray-600">Total Calls Today</div>
          </div>
          <div className="p-4 bg-success/5 rounded-lg border border-success/20">
            <div className="text-3xl font-bold text-gray-900 mb-1">38</div>
            <div className="text-sm text-gray-600">Avg Per Hour</div>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Peak hour:</span>
            <span className="font-bold text-gray-900">2 PM (52 calls)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Current hour:</span>
            <span className="font-bold text-gray-900">3 PM (47 calls)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Change vs avg:</span>
            <span className="font-bold text-success">+12%</span>
          </div>
        </div>
      </Card>

      {/* Patient Satisfaction & Cost Savings */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Patient Satisfaction Scores */}
        <Card className="p-6">
          <h3 className="font-bold text-gray-900 mb-4">Patient Satisfaction</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-success/5 rounded-lg border border-success/20">
              <div className="text-4xl font-bold text-gray-900 mb-1">4.7</div>
              <div className="text-sm text-gray-600">Avg Score (out of 5.0)</div>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="text-4xl font-bold text-success mb-1">+0.3</div>
              <div className="text-sm text-gray-600">Change This Week</div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">5 Stars:</span>
              <span className="font-bold text-gray-900">68%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">4 Stars:</span>
              <span className="font-bold text-gray-900">22%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">3 Stars:</span>
              <span className="font-bold text-gray-900">7%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">1-2 Stars:</span>
              <span className="font-bold text-gray-900">3%</span>
            </div>
          </div>
        </Card>

        {/* Copay Enrollment */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-success" />
            <h3 className="font-bold text-gray-900">Copay Enrollment</h3>
          </div>
          <div className="mb-6">
            <div className="text-4xl font-bold text-success mb-2">287</div>
            <p className="text-sm text-gray-600">Total enrollments this month</p>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Active Enrollments:</span>
              <span className="font-bold text-success">264</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">New This Week:</span>
              <span className="font-bold text-primary">43</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Avg Savings Per Patient:</span>
              <span className="font-bold text-purple-600">$165/mo</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Adherence Trend */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Adherence Trend (Last 7 Days)</h3>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-sm text-success font-medium">+2.1%</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="text-3xl font-bold text-gray-900 mb-1">94.2%</div>
            <div className="text-sm text-gray-600">Current Rate</div>
          </div>
          <div className="p-4 bg-success/5 rounded-lg border border-success/20">
            <div className="text-3xl font-bold text-success mb-1">+2.1%</div>
            <div className="text-sm text-gray-600">7-Day Change</div>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-1">1,175</div>
            <div className="text-sm text-gray-600">Adherent Patients</div>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Monday:</span>
            <span className="font-bold text-gray-900">91.2%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Tuesday:</span>
            <span className="font-bold text-gray-900">92.1%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Wednesday:</span>
            <span className="font-bold text-gray-900">91.8%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Thursday:</span>
            <span className="font-bold text-gray-900">93.2%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Friday:</span>
            <span className="font-bold text-gray-900">93.9%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Saturday:</span>
            <span className="font-bold text-gray-900">94.0%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Sunday:</span>
            <span className="font-bold text-success">94.2%</span>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div onClick={() => onNavigate?.('calls')}>
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Manage Calls</h3>
            <p className="text-sm text-gray-600">View outbound and inbound call schedules</p>
          </Card>
        </div>

        <div onClick={() => onNavigate?.('patients')}>
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Browse Patients</h3>
            <p className="text-sm text-gray-600">View all patients and their call history</p>
          </Card>
        </div>

        <div onClick={() => onNavigate?.('integrations')}>
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">View Integrations</h3>
            <p className="text-sm text-gray-600">Pharmacy, insurance, and CRM integrations</p>
          </Card>
        </div>
      </div>

      {/* Today's Activity Feed */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div className="flex-shrink-0 mt-1">
                {activity.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <Clock className="w-4 h-4 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.text}</p>
                <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
