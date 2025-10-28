'use client'

import { Users, TrendingUp, DollarSign, Calendar, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react'
import Card from '@/components/Card'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function DatabaseTab() {
  const enrollmentData = [
    { status: 'Active', count: 8342, color: '#10B981' },
    { status: 'Pending', count: 2847, color: '#F59E0B' },
    { status: 'Inactive', count: 1658, color: '#EF4444' },
  ]

  const insuranceSegmentation = [
    { type: 'Commercial', count: 6234, color: '#2563EB' },
    { type: 'Medicare', count: 3847, color: '#8B5CF6' },
    { type: 'Medicaid', count: 1923, color: '#EC4899' },
    { type: 'Cash Pay', count: 843, color: '#F59E0B' },
  ]

  const communicationPrefs = [
    { channel: 'Phone', count: 6842, preferred: true },
    { channel: 'SMS', count: 4234, preferred: true },
    { channel: 'Email', count: 3891, preferred: false },
    { channel: 'Mail', count: 892, preferred: false },
  ]

  const milestones = [
    { milestone: 'First Fills', count: 234, period: 'This Week', trend: '+12%' },
    { milestone: '3-Month', count: 892, period: 'This Month', trend: '+8%' },
    { milestone: '6-Month', count: 1247, period: 'This Month', trend: '+15%' },
    { milestone: '1-Year', count: 423, period: 'This Month', trend: '+22%' },
  ]

  const copayUsage = {
    totalBenefits: 842000,
    activeCards: 7234,
    avgSavings: 287,
    topMedications: [
      { name: 'Humira', cards: 2342, savings: 312000 },
      { name: 'Enbrel', cards: 1847, savings: 234000 },
      { name: 'Dupixent', cards: 1423, savings: 187000 },
      { name: 'Stelara', cards: 892, savings: 89000 },
      { name: 'Other', cards: 730, savings: 20000 },
    ]
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-success">+8.2%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">12,847</div>
          <div className="text-sm text-gray-600">Total Enrolled Patients</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">+2.1%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">8,342</div>
          <div className="text-sm text-gray-600">Active Patients</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success">+15.3%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">$842K</div>
          <div className="text-sm text-gray-600">Total Copay Benefits</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-success">+12%</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">234</div>
          <div className="text-sm text-gray-600">New Enrollments (Week)</div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enrollment Status */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Enrollment Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={enrollmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {enrollmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {enrollmentData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-700">{item.status}</span>
                </div>
                <span className="font-medium text-gray-900">{item.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Insurance Segmentation */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Insurance Type Segmentation</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={insuranceSegmentation}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis dataKey="type" stroke="#666666" />
              <YAxis stroke="#666666" />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {insuranceSegmentation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Communication Preferences */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Communication Preferences</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {communicationPrefs.map((pref, idx) => (
            <div key={idx} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                pref.preferred ? 'bg-primary/10' : 'bg-gray-100'
              }`}>
                {pref.channel === 'Phone' && <Phone className={`w-8 h-8 ${pref.preferred ? 'text-primary' : 'text-gray-400'}`} />}
                {pref.channel === 'SMS' && <MessageSquare className={`w-8 h-8 ${pref.preferred ? 'text-primary' : 'text-gray-400'}`} />}
                {pref.channel === 'Email' && <Mail className={`w-8 h-8 ${pref.preferred ? 'text-primary' : 'text-gray-400'}`} />}
                {pref.channel === 'Mail' && <Calendar className={`w-8 h-8 ${pref.preferred ? 'text-primary' : 'text-gray-400'}`} />}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{pref.count.toLocaleString()}</div>
              <div className="text-sm text-gray-600">{pref.channel}</div>
              {pref.preferred && (
                <div className="mt-2">
                  <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">Most Preferred</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Milestones & Copay Usage */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Program Milestones */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Program Milestones</h3>
          <div className="space-y-4">
            {milestones.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{item.milestone}</div>
                    <div className="text-sm text-gray-600">{item.period}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{item.count}</div>
                  <div className="text-sm text-success">{item.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Copay Card Analytics */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Copay Card Analytics</h3>
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success mb-1">${(copayUsage.totalBenefits / 1000).toFixed(0)}K</div>
                <div className="text-xs text-gray-700">Total Benefits</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">{copayUsage.activeCards.toLocaleString()}</div>
                <div className="text-xs text-gray-700">Active Cards</div>
              </div>
              <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">${copayUsage.avgSavings}</div>
                <div className="text-xs text-gray-700">Avg Savings</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 text-sm">Top Medications by Copay Usage</h4>
            {copayUsage.topMedications.map((med, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{med.name}</span>
                    <span className="text-sm text-gray-600">${(med.savings / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${(med.savings / copayUsage.totalBenefits) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
