'use client'

import { useState } from 'react'
import { Clock, Phone, CheckCircle, AlertTriangle, Package, Calendar, TrendingUp } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

export default function RefillAutomation() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)

  const refillQueue = [
    {
      id: 'P001',
      name: 'Sarah Johnson',
      medication: 'Ozempic 0.5mg',
      daysUntilDue: 3,
      lastRefill: '2024-09-27',
      pharmacyStatus: 'Ready for pickup',
      adherence: 94,
      risk: 'low',
      autoCallScheduled: '2024-10-30 10:00 AM',
      preferredContact: 'Phone'
    },
    {
      id: 'P002',
      name: 'Michael Chen',
      medication: 'Humira 40mg',
      daysUntilDue: 5,
      lastRefill: '2024-09-22',
      pharmacyStatus: 'In transit - Arrives Oct 29',
      adherence: 88,
      risk: 'medium',
      autoCallScheduled: '2024-10-28 2:00 PM',
      preferredContact: 'Phone'
    },
    {
      id: 'P003',
      name: 'Emma Davis',
      medication: 'Trulicity 1.5mg',
      daysUntilDue: -2,
      lastRefill: '2024-08-25',
      pharmacyStatus: 'Not ordered',
      adherence: 62,
      risk: 'high',
      autoCallScheduled: 'Immediate escalation',
      preferredContact: 'SMS + Phone'
    },
    {
      id: 'P004',
      name: 'Robert Martinez',
      medication: 'Enbrel 50mg',
      daysUntilDue: 7,
      lastRefill: '2024-09-20',
      pharmacyStatus: 'Prior auth pending',
      adherence: 91,
      risk: 'medium',
      autoCallScheduled: '2024-10-26 11:00 AM',
      preferredContact: 'Phone'
    },
    {
      id: 'P005',
      name: 'Linda Williams',
      medication: 'Ozempic 1mg',
      daysUntilDue: 1,
      lastRefill: '2024-09-26',
      pharmacyStatus: 'Ready for pickup',
      adherence: 97,
      risk: 'low',
      autoCallScheduled: '2024-10-31 9:00 AM',
      preferredContact: 'Phone'
    }
  ]

  const performanceMetrics = {
    beforeAI: {
      refillRate: 67,
      lateRefills: 33,
      avgDelayDays: 8.4,
      manualFollowups: 847
    },
    afterAI: {
      refillRate: 89,
      lateRefills: 11,
      avgDelayDays: 1.2,
      manualFollowups: 89
    }
  }

  const improvement = {
    refillRate: ((performanceMetrics.afterAI.refillRate - performanceMetrics.beforeAI.refillRate) / performanceMetrics.beforeAI.refillRate * 100).toFixed(1),
    lateRefills: ((performanceMetrics.beforeAI.lateRefills - performanceMetrics.afterAI.lateRefills) / performanceMetrics.beforeAI.lateRefills * 100).toFixed(1),
    manualWork: ((performanceMetrics.beforeAI.manualFollowups - performanceMetrics.afterAI.manualFollowups) / performanceMetrics.beforeAI.manualFollowups * 100).toFixed(1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Refill Automation Intelligence</h2>
        <p className="text-gray-600">AI automatically identifies refill windows and initiates proactive outreach</p>
      </div>

      {/* Impact Comparison */}
      <Card className="p-6 bg-gradient-to-r from-primary to-primary-dark text-white">
        <h3 className="text-xl font-bold mb-6">Before vs After AI Automation</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm opacity-90 mb-2">On-Time Refill Rate</div>
            <div className="flex items-baseline gap-3">
              <div className="text-3xl font-bold">{performanceMetrics.afterAI.refillRate}%</div>
              <div className="text-sm bg-white/20 px-2 py-1 rounded">+{improvement.refillRate}%</div>
            </div>
            <div className="text-sm opacity-75 mt-1">Was {performanceMetrics.beforeAI.refillRate}%</div>
          </div>
          <div>
            <div className="text-sm opacity-90 mb-2">Late Refills</div>
            <div className="flex items-baseline gap-3">
              <div className="text-3xl font-bold">{performanceMetrics.afterAI.lateRefills}%</div>
              <div className="text-sm bg-white/20 px-2 py-1 rounded">-{improvement.lateRefills}%</div>
            </div>
            <div className="text-sm opacity-75 mt-1">Was {performanceMetrics.beforeAI.lateRefills}%</div>
          </div>
          <div>
            <div className="text-sm opacity-90 mb-2">Manual Follow-ups/Month</div>
            <div className="flex items-baseline gap-3">
              <div className="text-3xl font-bold">{performanceMetrics.afterAI.manualFollowups}</div>
              <div className="text-sm bg-white/20 px-2 py-1 rounded">-{improvement.manualWork}%</div>
            </div>
            <div className="text-sm opacity-75 mt-1">Was {performanceMetrics.beforeAI.manualFollowups}</div>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 bg-orange-500/5">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <div className="text-sm font-medium text-gray-700">Immediate Action</div>
          </div>
          <div className="text-2xl font-bold text-orange-600">1</div>
          <div className="text-xs text-gray-600">Overdue refills</div>
        </Card>

        <Card className="p-4 bg-primary/5">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <div className="text-sm font-medium text-gray-700">This Week</div>
          </div>
          <div className="text-2xl font-bold text-primary">3</div>
          <div className="text-xs text-gray-600">Due in 0-5 days</div>
        </Card>

        <Card className="p-4 bg-success/5">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <div className="text-sm font-medium text-gray-700">Auto-Scheduled</div>
          </div>
          <div className="text-2xl font-bold text-success">5</div>
          <div className="text-xs text-gray-600">AI calls scheduled</div>
        </Card>

        <Card className="p-4 bg-purple-500/5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <div className="text-sm font-medium text-gray-700">Success Rate</div>
          </div>
          <div className="text-2xl font-bold text-purple-600">89%</div>
          <div className="text-xs text-gray-600">Completed refills</div>
        </Card>
      </div>

      {/* Refill Queue */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Automated Refill Queue
        </h3>
        <div className="space-y-3">
          {refillQueue.map((patient) => (
            <div
              key={patient.id}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                patient.risk === 'high'
                  ? 'border-red-200 bg-red-50'
                  : patient.risk === 'medium'
                  ? 'border-orange-200 bg-orange-50'
                  : 'border-gray-200 bg-white'
              } ${selectedPatient === patient.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedPatient(patient.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="font-bold text-gray-900">{patient.name}</div>
                    <div className="text-sm text-gray-600">ID: {patient.id}</div>
                    {patient.daysUntilDue < 0 && (
                      <div className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
                        OVERDUE {Math.abs(patient.daysUntilDue)} days
                      </div>
                    )}
                    {patient.daysUntilDue >= 0 && patient.daysUntilDue <= 5 && (
                      <div className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
                        Due in {patient.daysUntilDue} days
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-600">Medication</div>
                      <div className="font-medium text-gray-900">{patient.medication}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Last Refill</div>
                      <div className="font-medium text-gray-900">{patient.lastRefill}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Pharmacy Status</div>
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        {patient.pharmacyStatus}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Adherence Score</div>
                      <div className="font-medium text-gray-900">{patient.adherence}%</div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="font-medium text-primary">Auto-call scheduled: {patient.autoCallScheduled}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Call Now
                  </Button>
                  <Button size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* How It Works */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">How Refill Automation Works</h3>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold text-primary">1</span>
            </div>
            <div className="font-medium text-gray-900 mb-1">Monitor</div>
            <div className="text-sm text-gray-600">AI tracks all patient refill schedules 24/7</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold text-primary">2</span>
            </div>
            <div className="font-medium text-gray-900 mb-1">Identify</div>
            <div className="text-sm text-gray-600">5-day advance warning for upcoming refills</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold text-primary">3</span>
            </div>
            <div className="font-medium text-gray-900 mb-1">Check Status</div>
            <div className="text-sm text-gray-600">Verify pharmacy has medication ready</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold text-primary">4</span>
            </div>
            <div className="font-medium text-gray-900 mb-1">Proactive Call</div>
            <div className="text-sm text-gray-600">AI calls patient to arrange pickup/delivery</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div className="font-medium text-gray-900 mb-1">Confirm</div>
            <div className="text-sm text-gray-600">Track completion and update adherence</div>
          </div>
        </div>
      </Card>

      {/* ROI Impact */}
      <Card className="p-6 bg-gradient-to-br from-success/10 to-primary/10">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Revenue Impact</h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">$2.8M</div>
            <div className="text-sm text-gray-700">Additional annual revenue from improved adherence</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-success mb-2">22.8%</div>
            <div className="text-sm text-gray-700">Improvement in on-time refill rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">89%</div>
            <div className="text-sm text-gray-700">Reduction in manual intervention workload</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
