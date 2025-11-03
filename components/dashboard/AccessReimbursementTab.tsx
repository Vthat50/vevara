'use client';

import { useState } from 'react';
import { FileCheck, TrendingUp, TrendingDown, DollarSign, Clock, AlertCircle, CheckCircle, XCircle, FileText, Users, Target } from 'lucide-react';
import { colors, spacing, typography } from '@/lib/design-system';

export default function AccessReimbursementTab() {
  const [selectedPayer, setSelectedPayer] = useState<string | null>(null);

  // Mock PA data by payer
  const payerPAData = [
    {
      payer: 'UnitedHealthcare',
      totalPAs: 289,
      approved: 223,
      denied: 52,
      pending: 14,
      approvalRate: 77,
      avgProcessingTime: '8.7 days',
      trend: '+12%',
      trendDirection: 'up',
      topDenialReasons: [
        { reason: 'Insufficient medical necessity documentation', count: 23 },
        { reason: 'Prior therapy requirements not met', count: 18 },
        { reason: 'Formulary alternative available', count: 11 }
      ]
    },
    {
      payer: 'Aetna',
      totalPAs: 234,
      approved: 198,
      denied: 28,
      pending: 8,
      approvalRate: 85,
      avgProcessingTime: '6.2 days',
      trend: '+5%',
      trendDirection: 'up',
      topDenialReasons: [
        { reason: 'Step therapy not completed', count: 15 },
        { reason: 'Diagnostic criteria not met', count: 8 },
        { reason: 'Missing lab results', count: 5 }
      ]
    },
    {
      payer: 'Cigna',
      totalPAs: 198,
      approved: 167,
      denied: 24,
      pending: 7,
      approvalRate: 84,
      avgProcessingTime: '7.1 days',
      trend: '-3%',
      trendDirection: 'down',
      topDenialReasons: [
        { reason: 'Incomplete provider documentation', count: 12 },
        { reason: 'Alternative therapy required first', count: 9 },
        { reason: 'Lack of clinical rationale', count: 3 }
      ]
    },
    {
      payer: 'Blue Cross Blue Shield',
      totalPAs: 176,
      approved: 154,
      denied: 18,
      pending: 4,
      approvalRate: 88,
      avgProcessingTime: '5.8 days',
      trend: '+8%',
      trendDirection: 'up',
      topDenialReasons: [
        { reason: 'Pre-authorization not submitted timely', count: 7 },
        { reason: 'Formulary tier restrictions', count: 6 },
        { reason: 'Missing prior auth form', count: 5 }
      ]
    },
    {
      payer: 'Humana',
      totalPAs: 145,
      approved: 119,
      denied: 21,
      pending: 5,
      approvalRate: 82,
      avgProcessingTime: '9.3 days',
      trend: '+15%',
      trendDirection: 'up',
      topDenialReasons: [
        { reason: 'Medical necessity not established', count: 10 },
        { reason: 'Off-label use not covered', count: 6 },
        { reason: 'Generic available', count: 5 }
      ]
    }
  ];

  const paMetrics = [
    { label: 'Total PA Requests (30d)', value: '1,042', change: '+12%', trend: 'up' },
    { label: 'Overall Approval Rate', value: '83%', change: '+3%', trend: 'up' },
    { label: 'Avg Processing Time', value: '7.4 days', change: '-0.8d', trend: 'down' },
    { label: 'Appeals Won', value: '67%', change: '+5%', trend: 'up' }
  ];

  const copayAssistance = {
    totalEnrolled: 342,
    eligibleNotEnrolled: 156,
    enrollmentRate: 69,
    avgSavingsPerPatient: '$285/mo',
    totalSavingsGenerated: '$97,470/mo',
    trend: '+23%'
  };

  const financialBarriers = [
    {
      barrier: 'High Deductible Not Met',
      affectedPatients: 89,
      avgOOP: '$650',
      enrolledInAssistance: 34,
      enrollmentRate: 38,
      impact: 'critical'
    },
    {
      barrier: 'High Copay (>$100/mo)',
      affectedPatients: 67,
      avgOOP: '$285',
      enrolledInAssistance: 52,
      enrollmentRate: 78,
      impact: 'high'
    },
    {
      barrier: 'Coinsurance (20-30%)',
      affectedPatients: 54,
      avgOOP: '$420',
      enrolledInAssistance: 38,
      enrollmentRate: 70,
      impact: 'high'
    },
    {
      barrier: 'No Insurance Coverage',
      affectedPatients: 23,
      avgOOP: '$1,200',
      enrolledInAssistance: 18,
      enrollmentRate: 78,
      impact: 'critical'
    }
  ];

  const appealInsights = [
    { stage: 'Initial Denial', count: 123, successRate: 67 },
    { stage: 'First Appeal', count: 78, successRate: 72 },
    { stage: 'Second Appeal', count: 34, successRate: 58 },
    { stage: 'External Review', count: 12, successRate: 83 }
  ];

  const getTrendColor = (direction: string) => {
    return direction === 'up' ? colors.status.success : colors.status.error;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return colors.status.error;
      case 'high': return colors.status.warning;
      default: return colors.neutral[600];
    }
  };

  const getImpactBgColor = (impact: string) => {
    switch (impact) {
      case 'critical': return colors.status.errorBg;
      case 'high': return colors.status.warningBg;
      default: return colors.neutral[100];
    }
  };

  return (
    <div style={{ padding: spacing[6], backgroundColor: colors.background.page, display: 'flex', flexDirection: 'column', gap: spacing[6] }}>
      {/* Header */}
      <div>
        <h1 className="text-neutral-900" style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
          Access & Reimbursement Intelligence
        </h1>
        <p className="text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>
          Prior authorization analytics and financial assistance program insights
        </p>
      </div>

      {/* PA Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: spacing[4] }}>
        {paMetrics.map((metric, index) => (
          <div key={index} className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
            <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
              {metric.label}
            </div>
            <div className="flex items-baseline" style={{ gap: spacing[2], marginBottom: spacing[1] }}>
              <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>
                {metric.value}
              </div>
              <div className="flex items-center" style={{
                gap: spacing[1],
                fontSize: typography.fontSize.sm,
                color: getTrendColor(metric.trend)
              }}>
                {metric.trend === 'up' ? <TrendingUp style={{ width: '16px', height: '16px' }} /> : <TrendingDown style={{ width: '16px', height: '16px' }} />}
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prior Authorization by Payer */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Prior Authorization Performance by Payer
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {payerPAData.map((payer) => (
            <div key={payer.payer}
                 className="border border-neutral-200 rounded-md hover:border-neutral-300 transition-colors cursor-pointer"
                 style={{ padding: spacing[4] }}
                 onClick={() => setSelectedPayer(selectedPayer === payer.payer ? null : payer.payer)}>
              <div className="flex items-start justify-between" style={{ marginBottom: spacing[2] }}>
                <div style={{ flex: 1 }}>
                  <div className="flex items-center flex-wrap" style={{ gap: spacing[3], marginBottom: spacing[2] }}>
                    <h3 className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>
                      {payer.payer}
                    </h3>
                    <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                      {payer.totalPAs} total requests
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5" style={{ gap: spacing[4] }}>
                    <div>
                      <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, marginBottom: spacing[1] }}>
                        Approval Rate
                      </div>
                      <div className="flex items-center" style={{ gap: spacing[1] }}>
                        <div style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, color: payer.approvalRate >= 85 ? colors.status.success : colors.status.warning }}>
                          {payer.approvalRate}%
                        </div>
                        <span style={{ fontSize: typography.fontSize.sm, color: getTrendColor(payer.trendDirection) }}>
                          {payer.trend}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, marginBottom: spacing[1] }}>
                        Approved
                      </div>
                      <div className="flex items-center" style={{ gap: spacing[1] }}>
                        <CheckCircle style={{ width: '14px', height: '14px', color: colors.status.success }} />
                        <span className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium }}>
                          {payer.approved}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, marginBottom: spacing[1] }}>
                        Denied
                      </div>
                      <div className="flex items-center" style={{ gap: spacing[1] }}>
                        <XCircle style={{ width: '14px', height: '14px', color: colors.status.error }} />
                        <span className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium }}>
                          {payer.denied}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, marginBottom: spacing[1] }}>
                        Pending
                      </div>
                      <div className="flex items-center" style={{ gap: spacing[1] }}>
                        <Clock style={{ width: '14px', height: '14px', color: colors.neutral[600] }} />
                        <span className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium }}>
                          {payer.pending}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, marginBottom: spacing[1] }}>
                        Avg Processing
                      </div>
                      <div className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium }}>
                        {payer.avgProcessingTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedPayer === payer.payer && (
                <div className="border-t border-neutral-200" style={{ paddingTop: spacing[3], marginTop: spacing[3] }}>
                  <div className="text-neutral-700" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, marginBottom: spacing[2] }}>
                    Top Denial Reasons:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
                    {payer.topDenialReasons.map((denial, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-neutral-50 rounded" style={{ padding: spacing[2] }}>
                        <span className="text-neutral-700" style={{ fontSize: typography.fontSize.sm }}>
                          {denial.reason}
                        </span>
                        <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>
                          {denial.count} cases
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Copay Assistance Program */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Copay Assistance Program Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: spacing[4], marginBottom: spacing[6] }}>
          <div className="border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
            <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
              Enrollment Rate
            </div>
            <div style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold, color: copayAssistance.enrollmentRate >= 70 ? colors.status.success : colors.status.warning, marginBottom: spacing[1] }}>
              {copayAssistance.enrollmentRate}%
            </div>
            <div className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
              {copayAssistance.totalEnrolled} enrolled / {copayAssistance.eligibleNotEnrolled} eligible not enrolled
            </div>
          </div>
          <div className="border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
            <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
              Avg Savings Per Patient
            </div>
            <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
              {copayAssistance.avgSavingsPerPatient}
            </div>
            <div className="flex items-center" style={{ gap: spacing[1] }}>
              <TrendingUp style={{ width: '14px', height: '14px', color: colors.status.success }} />
              <span style={{ fontSize: typography.fontSize.sm, color: colors.status.success }}>
                {copayAssistance.trend} vs last month
              </span>
            </div>
          </div>
          <div className="border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
            <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
              Total Savings Generated
            </div>
            <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
              {copayAssistance.totalSavingsGenerated}
            </div>
            <div className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
              For {copayAssistance.totalEnrolled} patients
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200" style={{ paddingTop: spacing[4] }}>
          <div className="bg-neutral-50 border border-neutral-200 rounded" style={{ padding: spacing[3] }}>
            <div className="flex items-start" style={{ gap: spacing[2] }}>
              <AlertCircle style={{ width: '16px', height: '16px', color: colors.status.warning, flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div className="text-neutral-700" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, marginBottom: spacing[1] }}>
                  Opportunity Identified:
                </div>
                <div className="text-neutral-900" style={{ fontSize: typography.fontSize.sm }}>
                  {copayAssistance.eligibleNotEnrolled} eligible patients not yet enrolled in copay assistance. Proactive enrollment could prevent {Math.round(copayAssistance.eligibleNotEnrolled * 0.23)} potential abandonments.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Barriers */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Financial Barriers Analysis
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {financialBarriers.map((barrier, index) => (
            <div key={index} className="border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
              <div className="flex items-start justify-between" style={{ marginBottom: spacing[2] }}>
                <div style={{ flex: 1 }}>
                  <div className="flex items-center flex-wrap" style={{ gap: spacing[2], marginBottom: spacing[2] }}>
                    <h3 className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>
                      {barrier.barrier}
                    </h3>
                    <span className="rounded" style={{
                      padding: `2px ${spacing[2]}`,
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.medium,
                      textTransform: 'uppercase',
                      backgroundColor: getImpactBgColor(barrier.impact),
                      color: getImpactColor(barrier.impact)
                    }}>
                      {barrier.impact}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: spacing[4] }}>
                    <div>
                      <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, marginBottom: spacing[1] }}>
                        Affected Patients
                      </div>
                      <div className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>
                        {barrier.affectedPatients}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, marginBottom: spacing[1] }}>
                        Avg Out-of-Pocket
                      </div>
                      <div className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>
                        {barrier.avgOOP}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, marginBottom: spacing[1] }}>
                        Enrolled in Assistance
                      </div>
                      <div className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>
                        {barrier.enrolledInAssistance}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, marginBottom: spacing[1] }}>
                        Enrollment Rate
                      </div>
                      <div style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold, color: barrier.enrollmentRate >= 70 ? colors.status.success : colors.status.error }}>
                        {barrier.enrollmentRate}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appeal Success Rates */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Appeals Process Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: spacing[4] }}>
          {appealInsights.map((appeal, index) => (
            <div key={index} className="border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
              <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
                {appeal.stage}
              </div>
              <div style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold, color: appeal.successRate >= 70 ? colors.status.success : colors.status.warning, marginBottom: spacing[2] }}>
                {appeal.successRate}%
              </div>
              <div className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                {appeal.count} cases
              </div>
              <div className="bg-neutral-200 rounded-full" style={{ height: '4px', marginTop: spacing[2] }}>
                <div className="rounded-full" style={{
                  height: '100%',
                  width: `${appeal.successRate}%`,
                  backgroundColor: appeal.successRate >= 70 ? colors.status.success : colors.status.warning
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
