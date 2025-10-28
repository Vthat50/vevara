'use client'

import { useState } from 'react'
import { CreditCard, TrendingUp, DollarSign, Users, CheckCircle, Clock } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface EnrollmentRecord {
  id: string
  patientName: string
  medication: string
  status: 'pending' | 'eligible' | 'enrolled' | 'not-eligible'
  monthlySavings: number
  enrolledDate: string
}

const enrollments: EnrollmentRecord[] = [
  { id: 'E001', patientName: 'Sarah Johnson', medication: 'Ozempic 0.5mg', status: 'enrolled', monthlySavings: 95, enrolledDate: 'Oct 27, 2024' },
  { id: 'E002', patientName: 'Michael Chen', medication: 'Humira 40mg', status: 'eligible', monthlySavings: 110, enrolledDate: '-' },
  { id: 'E003', patientName: 'Emma Davis', medication: 'Trulicity 1.5mg', status: 'enrolled', monthlySavings: 90, enrolledDate: 'Oct 26, 2024' },
  { id: 'E004', patientName: 'John Williams', medication: 'Enbrel 50mg', status: 'pending', monthlySavings: 105, enrolledDate: '-' }
]

export default function CopayEnrollmentTab() {
  const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentRecord | null>(enrollments[0])

  const getStatusColor = (status: EnrollmentRecord['status']) => {
    switch (status) {
      case 'enrolled': return 'bg-success/10 text-success border-success/20'
      case 'eligible': return 'bg-primary/10 text-primary border-primary/20'
      case 'pending': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'not-eligible': return 'bg-red-500/10 text-red-600 border-red-500/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-3">
            <Users className="w-6 h-6 text-success" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">78%</div>
          <div className="text-sm text-gray-600">Enrollment Rate</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
            <DollarSign className="w-6 h-6 text-primary" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">$97</div>
          <div className="text-sm text-gray-600">Avg Monthly Savings</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">+26%</div>
          <div className="text-sm text-gray-600">Adherence Improvement</div>
        </Card>
        <Card className="p-6">
          <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">60s</div>
          <div className="text-sm text-gray-600">Avg Enrollment Time</div>
        </Card>
      </div>

      {/* Enrollment Records */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Enrollment Records</h3>
        <div className="space-y-3">
          {enrollments.map((record) => (
            <div
              key={record.id}
              onClick={() => setSelectedEnrollment(record)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedEnrollment?.id === record.id ? 'border-primary bg-primary/5' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-gray-900">{record.patientName}</div>
                  <div className="text-sm text-gray-600">{record.medication}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(record.status)}`}>
                  {record.status.toUpperCase()}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-success font-medium">${record.monthlySavings}/mo savings</span>
                {record.enrolledDate !== '-' && (
                  <span className="text-gray-600">Enrolled: {record.enrolledDate}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Workflow */}
      <Card className="p-6 bg-gradient-to-r from-success/5 to-primary/5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Enrollment Workflow</h3>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-primary">1</span>
            </div>
            <div className="font-medium text-gray-900 text-sm">Real-time Eligibility Check</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-primary">2</span>
            </div>
            <div className="font-medium text-gray-900 text-sm">Insurance Verification</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-primary">3</span>
            </div>
            <div className="font-medium text-gray-900 text-sm">Automated Enrollment</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-primary">4</span>
            </div>
            <div className="font-medium text-gray-900 text-sm">Card Activation</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div className="font-medium text-gray-900 text-sm">Confirmation</div>
          </div>
        </div>
      </Card>

      {/* Benefits */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Program Benefits</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">78% Enrollment Rate</div>
              <div className="text-sm text-gray-600">26x better than traditional (3%)</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">60 Second Enrollment</div>
              <div className="text-sm text-gray-600">No forms, no portals required</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">$1,140 Annual Savings</div>
              <div className="text-sm text-gray-600">Average per patient</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="font-medium text-gray-900">+26% Adherence</div>
              <div className="text-sm text-gray-600">Patients stay on medication longer</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
