'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Users, Phone, Activity, PhoneOff } from 'lucide-react'
import Card from '@/components/Card'

export default function AnalyticsTab() {
  const adherenceData = [
    { month: 'Jan', adherence: 88, baseline: 72, target: 90 },
    { month: 'Feb', adherence: 89, baseline: 73, target: 90 },
    { month: 'Mar', adherence: 91, baseline: 74, target: 90 },
    { month: 'Apr', adherence: 92, baseline: 74, target: 90 },
    { month: 'May', adherence: 93, baseline: 75, target: 90 },
    { month: 'Jun', adherence: 94, baseline: 75, target: 90 },
  ]

  const callVolumeData = [
    { day: 'Mon', outbound: 245, inbound: 156, resolved: 380 },
    { day: 'Tue', outbound: 267, inbound: 178, resolved: 420 },
    { day: 'Wed', outbound: 289, inbound: 192, resolved: 455 },
    { day: 'Thu', outbound: 256, inbound: 168, resolved: 400 },
    { day: 'Fri', outbound: 234, inbound: 145, resolved: 360 },
    { day: 'Sat', outbound: 156, inbound: 98, resolved: 240 },
    { day: 'Sun', outbound: 123, inbound: 87, resolved: 198 },
  ]

  const callTypeData = [
    { name: 'Refill Reminders', value: 450, color: '#2563EB' },
    { name: 'Side Effects', value: 280, color: '#10B981' },
    { name: 'Copay Enrollment', value: 180, color: '#F59E0B' },
    { name: 'Education', value: 350, color: '#8B5CF6' },
    { name: 'Other', value: 140, color: '#EC4899' },
  ]

  const sideEffectsData = [
    { severity: 'Mild', count: 234 },
    { severity: 'Moderate', count: 89 },
    { severity: 'Severe', count: 12 },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className="flex items-center gap-1 text-success text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              +12%
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">94.2%</div>
          <div className="text-sm text-gray-600">Adherence Rate</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-success" />
            </div>
            <div className="flex items-center gap-1 text-success text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              +8%
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">2,453</div>
          <div className="text-sm text-gray-600">Total Calls This Week</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
              <TrendingDown className="w-4 h-4" />
              -2.1%
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">4.3%</div>
          <div className="text-sm text-gray-600">Escalation Rate</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-success" />
            </div>
            <div className="flex items-center gap-1 text-success text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              +15%
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">$124K</div>
          <div className="text-sm text-gray-600">Cost Savings (MTD)</div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Adherence Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Adherence Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adherenceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis dataKey="month" stroke="#666666" />
              <YAxis stroke="#666666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="adherence"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ fill: '#2563EB', r: 4 }}
                name="With Vevara"
              />
              <Line
                type="monotone"
                dataKey="baseline"
                stroke="#A3A3A3"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Industry Baseline"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#10B981"
                strokeWidth={2}
                strokeDasharray="3 3"
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Call Volume */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Call Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={callVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis dataKey="day" stroke="#666666" />
              <YAxis stroke="#666666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Bar dataKey="outbound" fill="#2563EB" radius={[4, 4, 0, 0]} name="Outbound" />
              <Bar dataKey="inbound" fill="#10B981" radius={[4, 4, 0, 0]} name="Inbound" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Call Type Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Call Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={callTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {callTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Side Effects */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Side Effect Reports</h3>
          <div className="space-y-4">
            {sideEffectsData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{item.severity}</span>
                  <span className="text-sm font-medium text-gray-700">{item.count} reports</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      item.severity === 'Mild'
                        ? 'bg-success'
                        : item.severity === 'Moderate'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${(item.count / 335) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total This Month</div>
            <div className="text-2xl font-bold text-gray-900">335</div>
          </div>
        </Card>

        {/* Cost Savings */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Cost Impact</h3>
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">Agent Cost Reduction</div>
              <div className="text-2xl font-bold text-primary mb-2">$124K</div>
              <div className="text-xs text-gray-600">This month</div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Adherence ROI</div>
              <div className="text-2xl font-bold text-success mb-2">$2.1M</div>
              <div className="text-xs text-gray-600">Annual projection</div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Per-Patient Savings</div>
              <div className="text-2xl font-bold text-gray-900 mb-2">$87</div>
              <div className="text-xs text-gray-600">Annual average</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Inbound vs Outbound Performance */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Inbound Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Total Calls Today</div>
                <div className="text-3xl font-bold text-primary">842</div>
              </div>
              <Phone className="w-12 h-12 text-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">AI Resolved</div>
                <div className="text-2xl font-bold text-success">71%</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Escalated</div>
                <div className="text-2xl font-bold text-orange-500">29%</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-900 mb-2">Top Categories</div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Refills</span>
                <span className="font-medium text-gray-900">324 calls</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Copay Questions</span>
                <span className="font-medium text-gray-900">187 calls</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Side Effects</span>
                <span className="font-medium text-gray-900">143 calls</span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm font-medium text-gray-900 mb-2">Peak Times</div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">9-11 AM</span>
                <span className="font-medium text-primary">342 calls (41%)</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-600">2-4 PM</span>
                <span className="font-medium text-primary">289 calls (34%)</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Outbound Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-success/5 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Proactive Calls Today</div>
                <div className="text-3xl font-bold text-success">442</div>
              </div>
              <PhoneOff className="w-12 h-12 text-success" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Connected</div>
                <div className="text-2xl font-bold text-success">76%</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">No Answer</div>
                <div className="text-2xl font-bold text-gray-500">24%</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-900 mb-2">Campaign Results</div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">Refill Reminders</span>
                  <span className="text-sm font-medium text-success">75% connected</span>
                </div>
                <div className="text-xs text-gray-600">118 patients refilled</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">Late-to-Refill</span>
                  <span className="text-sm font-medium text-success">78% connected</span>
                </div>
                <div className="text-xs text-gray-600">52 refilled (22.8% improvement)</div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm font-medium text-gray-900 mb-2">Optimal Call Windows</div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">10:00 AM</span>
                <span className="font-medium text-success">83% connect rate</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-600">3:00 PM</span>
                <span className="font-medium text-success">79% connect rate</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Metrics</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div>
            <div className="text-sm text-gray-600 mb-2">AI Resolution Rate</div>
            <div className="text-3xl font-bold text-primary mb-1">94.2%</div>
            <div className="text-xs text-success">+2.3% from last month</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Avg Response Time</div>
            <div className="text-3xl font-bold text-primary mb-1">0.8s</div>
            <div className="text-xs text-success">-0.2s from last month</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Patient Satisfaction</div>
            <div className="text-3xl font-bold text-primary mb-1">4.8/5</div>
            <div className="text-xs text-success">+0.2 from last month</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Avg Call Duration</div>
            <div className="text-3xl font-bold text-primary mb-1">2:34</div>
            <div className="text-xs text-success">-15s from last month</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Missed Appointments</div>
            <div className="text-3xl font-bold text-primary mb-1">8.3%</div>
            <div className="text-xs text-success">-3.2% from last month</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
