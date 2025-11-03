'use client';

import { useState } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, User, Clock, DollarSign, Calendar, Phone, Mail, MessageSquare, Target } from 'lucide-react';
import { colors, spacing, typography } from '@/lib/design-system';

export default function PatientRiskTab() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  // Mock high-risk patient data
  const highRiskPatients = [
    {
      id: 'P-1001',
      name: 'Jennifer Martinez',
      initials: 'JM',
      riskScore: 92,
      riskLevel: 'critical',
      lastContact: '12 days ago',
      nextRefill: '3 days',
      riskFactors: [
        { factor: 'Missed 2 consecutive refills', severity: 'critical' },
        { factor: 'Financial concern expressed', severity: 'high' },
        { factor: 'No copay assistance enrolled', severity: 'medium' }
      ],
      recommendedAction: 'Immediate outreach - Enroll in copay program and schedule nurse education call',
      priority: 1,
      daysUntilAbandonment: 3
    },
    {
      id: 'P-1002',
      name: 'Robert Thompson',
      initials: 'RT',
      riskScore: 87,
      riskLevel: 'critical',
      lastContact: '8 days ago',
      nextRefill: '5 days',
      riskFactors: [
        { factor: 'PA denial - appeal pending', severity: 'critical' },
        { factor: 'Called 3x about PA status', severity: 'high' },
        { factor: 'Expressed frustration', severity: 'medium' }
      ],
      recommendedAction: 'Expedite PA appeal with medical necessity letter. Proactive status update call.',
      priority: 2,
      daysUntilAbandonment: 5
    },
    {
      id: 'P-1003',
      name: 'Sarah Williams',
      initials: 'SW',
      riskScore: 79,
      riskLevel: 'high',
      lastContact: '15 days ago',
      nextRefill: '7 days',
      riskFactors: [
        { factor: 'Side effect concerns (injection site)', severity: 'high' },
        { factor: 'Declining adherence trend', severity: 'high' },
        { factor: 'No recent nurse contact', severity: 'medium' }
      ],
      recommendedAction: 'Schedule injection technique education with nurse. Provide reaction management resources.',
      priority: 3,
      daysUntilAbandonment: 7
    },
    {
      id: 'P-1004',
      name: 'Michael Davis',
      initials: 'MD',
      riskScore: 71,
      riskLevel: 'high',
      lastContact: '6 days ago',
      nextRefill: '10 days',
      riskFactors: [
        { factor: 'High out-of-pocket cost ($450/mo)', severity: 'high' },
        { factor: 'Asked about generic alternatives', severity: 'medium' },
        { factor: 'Mentioned budget concerns', severity: 'medium' }
      ],
      recommendedAction: 'Verify copay assistance eligibility. Explore manufacturer savings programs.',
      priority: 4,
      daysUntilAbandonment: 10
    },
    {
      id: 'P-1005',
      name: 'Lisa Anderson',
      initials: 'LA',
      riskScore: 68,
      riskLevel: 'medium',
      lastContact: '4 days ago',
      nextRefill: '14 days',
      riskFactors: [
        { factor: 'Shipping delays (2x)', severity: 'medium' },
        { factor: 'Requested faster delivery', severity: 'low' },
        { factor: 'Lives in rural area', severity: 'low' }
      ],
      recommendedAction: 'Switch to expedited shipping. Set up delivery notifications.',
      priority: 5,
      daysUntilAbandonment: 14
    }
  ];

  const riskDistribution = [
    { level: 'Critical Risk (90-100)', count: 23, color: colors.status.error, patients: 23 },
    { level: 'High Risk (70-89)', count: 47, color: colors.status.warning, patients: 47 },
    { level: 'Medium Risk (50-69)', count: 89, color: colors.neutral[600], patients: 89 },
    { level: 'Low Risk (<50)', count: 341, color: colors.status.success, patients: 341 }
  ];

  const topRiskFactors = [
    { factor: 'Financial Barriers', patients: 67, trend: '+23%', severity: 'critical' },
    { factor: 'Prior Authorization Issues', patients: 54, trend: '+45%', severity: 'critical' },
    { factor: 'Adherence Decline', patients: 42, trend: '+12%', severity: 'high' },
    { factor: 'Side Effect Concerns', patients: 38, trend: '-5%', severity: 'high' },
    { factor: 'Shipping/Logistics', patients: 29, trend: '+18%', severity: 'medium' }
  ];

  const interventionOutcomes = [
    { intervention: 'Copay Assistance Enrollment', success: 87, total: 102, successRate: 85 },
    { intervention: 'Nurse Education Call', success: 76, total: 89, successRate: 85 },
    { intervention: 'PA Expedite Support', success: 64, total: 87, successRate: 74 },
    { intervention: 'Proactive Refill Reminder', success: 112, total: 134, successRate: 84 }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return colors.status.error;
      case 'high': return colors.status.warning;
      case 'medium': return colors.neutral[600];
      default: return colors.status.success;
    }
  };

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case 'critical': return colors.status.errorBg;
      case 'high': return colors.status.warningBg;
      case 'medium': return colors.neutral[100];
      default: return colors.status.successBg;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return colors.status.error;
      case 'high': return colors.status.warning;
      case 'medium': return colors.neutral[600];
      default: return colors.neutral[500];
    }
  };

  return (
    <div style={{ padding: spacing[6], backgroundColor: colors.background.page, display: 'flex', flexDirection: 'column', gap: spacing[6] }}>
      {/* Header */}
      <div>
        <h1 className="text-neutral-900" style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
          Patient Risk Intelligence
        </h1>
        <p className="text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>
          Predictive analytics identifying at-risk patients requiring proactive intervention
        </p>
      </div>

      {/* Risk Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: spacing[4] }}>
        {riskDistribution.map((risk, index) => (
          <div key={index} className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
            <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
              {risk.level}
            </div>
            <div style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold, color: risk.color, marginBottom: spacing[2] }}>
              {risk.count}
            </div>
            <div className="bg-neutral-200 rounded-full" style={{ height: '4px' }}>
              <div className="rounded-full" style={{
                height: '100%',
                width: `${(risk.patients / 500) * 100}%`,
                backgroundColor: risk.color
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* High-Priority Patients */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <div className="flex items-center justify-between" style={{ marginBottom: spacing[4] }}>
          <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>
            High-Priority Patients Requiring Immediate Intervention
          </h2>
          <div className="flex items-center" style={{ gap: spacing[2] }}>
            <span className="text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>
              {highRiskPatients.filter(p => p.riskLevel === 'critical').length} Critical
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>
              {highRiskPatients.filter(p => p.riskLevel === 'high').length} High Risk
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {highRiskPatients.map((patient) => (
            <div key={patient.id}
                 className="border border-neutral-200 rounded-md hover:border-neutral-300 transition-colors cursor-pointer"
                 style={{ padding: spacing[4] }}
                 onClick={() => setSelectedPatient(selectedPatient === patient.id ? null : patient.id)}>
              <div className="flex items-start justify-between" style={{ marginBottom: spacing[3] }}>
                <div className="flex items-start" style={{ gap: spacing[3], flex: 1 }}>
                  <div className="rounded-full flex items-center justify-center" style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: getRiskBgColor(patient.riskLevel),
                    color: getRiskColor(patient.riskLevel),
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.medium,
                    flexShrink: 0
                  }}>
                    {patient.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center flex-wrap" style={{ gap: spacing[2], marginBottom: spacing[1] }}>
                      <h3 className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>
                        {patient.name}
                      </h3>
                      <span className="text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>
                        {patient.id}
                      </span>
                      <span className="rounded" style={{
                        padding: `2px ${spacing[2]}`,
                        fontSize: typography.fontSize.xs,
                        fontWeight: typography.fontWeight.medium,
                        textTransform: 'uppercase',
                        backgroundColor: getRiskBgColor(patient.riskLevel),
                        color: getRiskColor(patient.riskLevel)
                      }}>
                        {patient.riskLevel} Risk
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center" style={{ gap: spacing[4], marginBottom: spacing[2] }}>
                      <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                        Risk Score: <span style={{ fontWeight: typography.fontWeight.semibold, color: getRiskColor(patient.riskLevel) }}>{patient.riskScore}</span>
                      </span>
                      <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                        <Clock style={{ width: '14px', height: '14px', display: 'inline', marginRight: '4px' }} />
                        Last contact: {patient.lastContact}
                      </span>
                      <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                        <Calendar style={{ width: '14px', height: '14px', display: 'inline', marginRight: '4px' }} />
                        Next refill: {patient.nextRefill}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[2] }}>
                      {patient.riskFactors.map((factor, idx) => (
                        <span key={idx} className="rounded" style={{
                          padding: `${spacing[1]} ${spacing[2]}`,
                          fontSize: typography.fontSize.xs,
                          backgroundColor: colors.neutral[100],
                          color: getSeverityColor(factor.severity),
                          border: `1px solid ${getSeverityColor(factor.severity)}`
                        }}>
                          {factor.factor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right" style={{ marginLeft: spacing[4] }}>
                  <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, marginBottom: spacing[1] }}>
                    Est. Abandonment
                  </div>
                  <div style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, color: getRiskColor(patient.riskLevel) }}>
                    {patient.daysUntilAbandonment}d
                  </div>
                </div>
              </div>

              {selectedPatient === patient.id && (
                <div className="border-t border-neutral-200" style={{ paddingTop: spacing[3], marginTop: spacing[3] }}>
                  <div className="bg-neutral-50 border border-neutral-200 rounded" style={{ padding: spacing[3], marginBottom: spacing[3] }}>
                    <div className="flex items-start" style={{ gap: spacing[2] }}>
                      <Target style={{ width: '16px', height: '16px', color: colors.primary[600], flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div className="text-neutral-700" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, marginBottom: spacing[1] }}>
                          Recommended Intervention:
                        </div>
                        <div className="text-neutral-900" style={{ fontSize: typography.fontSize.sm }}>
                          {patient.recommendedAction}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex" style={{ gap: spacing[2] }}>
                    <button className="border border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded transition-colors"
                            style={{ padding: `${spacing[2]} ${spacing[3]}`, fontSize: typography.fontSize.sm, display: 'flex', alignItems: 'center', gap: spacing[1] }}>
                      <Phone style={{ width: '14px', height: '14px' }} />
                      Schedule Outreach Call
                    </button>
                    <button className="border border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded transition-colors"
                            style={{ padding: `${spacing[2]} ${spacing[3]}`, fontSize: typography.fontSize.sm, display: 'flex', alignItems: 'center', gap: spacing[1] }}>
                      <Mail style={{ width: '14px', height: '14px' }} />
                      Send Automated SMS
                    </button>
                    <button className="border border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded transition-colors"
                            style={{ padding: `${spacing[2]} ${spacing[3]}`, fontSize: typography.fontSize.sm }}>
                      View Full Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Top Risk Factors */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Top Risk Factors Across Patient Population
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {topRiskFactors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between" style={{ paddingBottom: spacing[3], borderBottom: index < topRiskFactors.length - 1 ? `1px solid ${colors.neutral[200]}` : 'none' }}>
              <div className="flex items-center" style={{ gap: spacing[3] }}>
                <AlertTriangle style={{ width: '16px', height: '16px', color: getSeverityColor(factor.severity) }} />
                <span className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium }}>
                  {factor.factor}
                </span>
                <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                  {factor.patients} patients
                </span>
              </div>
              <div className="flex items-center" style={{ gap: spacing[2] }}>
                <span style={{
                  fontSize: typography.fontSize.sm,
                  color: factor.trend.startsWith('+') ? colors.status.error : colors.status.success
                }}>
                  {factor.trend}
                </span>
                {factor.trend.startsWith('+') ? (
                  <TrendingUp style={{ width: '14px', height: '14px', color: colors.status.error }} />
                ) : (
                  <TrendingDown style={{ width: '14px', height: '14px', color: colors.status.success }} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intervention Effectiveness */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Intervention Effectiveness (Last 30 Days)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: spacing[4] }}>
          {interventionOutcomes.map((outcome, index) => (
            <div key={index} className="border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
              <div className="flex items-start justify-between" style={{ marginBottom: spacing[3] }}>
                <div>
                  <div className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
                    {outcome.intervention}
                  </div>
                  <div className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                    {outcome.success} successful / {outcome.total} attempted
                  </div>
                </div>
                <div style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold, color: outcome.successRate >= 80 ? colors.status.success : colors.status.warning }}>
                  {outcome.successRate}%
                </div>
              </div>
              <div className="bg-neutral-200 rounded-full" style={{ height: '8px' }}>
                <div className="rounded-full" style={{
                  height: '100%',
                  width: `${outcome.successRate}%`,
                  backgroundColor: outcome.successRate >= 80 ? colors.status.success : colors.status.warning
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
