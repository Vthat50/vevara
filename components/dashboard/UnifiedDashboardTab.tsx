'use client';

import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Users,
  FileCheck,
  Phone,
  DollarSign,
  Shield,
  Activity,
  ArrowRight
} from 'lucide-react';
import { colors, spacing, typography } from '@/lib/design-system';

interface UnifiedDashboardTabProps {
  onNavigate: (tab: string) => void;
}

export default function UnifiedDashboardTab({ onNavigate }: UnifiedDashboardTabProps) {
  // Critical Alerts
  const criticalAlerts = [
    {
      id: 1,
      severity: 'critical',
      title: 'Prior Authorization mentions up 67% this week',
      description: 'Significant increase in PA-related calls. Top payer: UnitedHealthcare (89 calls)',
      action: 'View PA Intelligence',
      targetTab: 'access-reimbursement',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      severity: 'warning',
      title: '23 high-risk patients identified',
      description: 'Patients showing abandonment signals requiring immediate outreach',
      action: 'View At-Risk Patients',
      targetTab: 'patient-operations',
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      severity: 'warning',
      title: 'Agent satisfaction declining',
      description: 'Average CSAT dropped from 4.2 to 3.6 over past 7 days',
      action: 'View Agent Performance',
      targetTab: 'contact-center',
      timestamp: '1 day ago'
    }
  ];

  // 6 Hero KPIs - The most critical metrics
  const heroMetrics = [
    {
      label: 'Active Patients',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      target: 'patient-operations',
      icon: Users,
      description: '30-day active count'
    },
    {
      label: 'PA Approval Rate',
      value: '83%',
      change: '+3%',
      trend: 'up',
      target: 'access-reimbursement',
      icon: FileCheck,
      description: '7.4 day avg processing'
    },
    {
      label: 'Patient Friction Score',
      value: '969',
      change: '+18%',
      trend: 'up',
      target: 'intelligence',
      icon: Activity,
      description: '559 patients affected',
      isNegative: true
    },
    {
      label: 'Call Volume',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      target: 'contact-center',
      icon: Phone,
      description: '8.3 min avg handle time'
    },
    {
      label: 'Compliance Score',
      value: '97%',
      change: '+2%',
      trend: 'up',
      target: 'compliance-safety',
      icon: Shield,
      description: '47 AEs this month'
    },
    {
      label: 'High-Risk Patients',
      value: '23',
      change: '+15%',
      trend: 'up',
      target: 'patient-operations',
      icon: AlertTriangle,
      description: 'Require immediate outreach',
      isNegative: true
    }
  ];

  const topFrictionPoints = [
    { barrier: 'Prior Authorization Delays', count: 289, severity: 'critical', impact: 'High' },
    { barrier: 'High Out-of-Pocket Costs', count: 234, severity: 'critical', impact: 'High' },
    { barrier: 'Injection Site Reactions', count: 156, severity: 'high', impact: 'Medium' },
    { barrier: 'Shipping Delays', count: 134, severity: 'high', impact: 'Medium' }
  ];

  // Weekly trend data for visualization
  const weeklyTrends = [
    { label: 'Mon', paApprovals: 85, frictionEvents: 120 },
    { label: 'Tue', paApprovals: 82, frictionEvents: 135 },
    { label: 'Wed', paApprovals: 84, frictionEvents: 145 },
    { label: 'Thu', paApprovals: 83, frictionEvents: 158 },
    { label: 'Fri', paApprovals: 81, frictionEvents: 172 },
    { label: 'Sat', paApprovals: 86, frictionEvents: 115 },
    { label: 'Sun', paApprovals: 83, frictionEvents: 124 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return colors.status.error;
      case 'warning': return colors.status.warning;
      default: return colors.status.info;
    }
  };

  const HeroMetricCard = ({ metric }: { metric: any }) => {
    const Icon = metric.icon;
    return (
      <div
        className="bg-white border border-neutral-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer"
        style={{ padding: spacing[5] }}
        onClick={() => onNavigate(metric.target)}
      >
        <div className="flex items-start justify-between" style={{ marginBottom: spacing[3] }}>
          <div className="rounded-lg" style={{
            padding: spacing[2],
            backgroundColor: colors.primary[50]
          }}>
            <Icon style={{ width: '20px', height: '20px', color: colors.primary[600] }} />
          </div>
          {metric.trend !== 'stable' && (
            <div className="flex items-center" style={{
              gap: spacing[1],
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              color: metric.trend === 'up' ?
                (metric.isNegative ? colors.status.error : colors.status.success) :
                (metric.isNegative ? colors.status.success : colors.status.error)
            }}>
              {metric.trend === 'up' ? <TrendingUp style={{ width: '16px', height: '16px' }} /> : <TrendingDown style={{ width: '16px', height: '16px' }} />}
              {metric.change}
            </div>
          )}
        </div>
        <div className="text-neutral-500" style={{
          fontSize: typography.fontSize.xs,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: spacing[1],
          fontWeight: typography.fontWeight.medium
        }}>
          {metric.label}
        </div>
        <div className="text-neutral-900" style={{
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.semibold,
          marginBottom: spacing[1]
        }}>
          {metric.value}
        </div>
        <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs }}>
          {metric.description}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: spacing[6], backgroundColor: colors.background.page, display: 'flex', flexDirection: 'column', gap: spacing[6] }}>
      {/* Header */}
      <div>
        <h1 className="text-neutral-900" style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
          Dashboard
        </h1>
        <p className="text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>
          Key metrics and insights across your patient services hub
        </p>
      </div>

      {/* Critical Alerts */}
      <div className="bg-white border border-neutral-200 rounded-lg" style={{ padding: spacing[6] }}>
        <div className="flex items-center justify-between" style={{ marginBottom: spacing[4] }}>
          <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>
            Critical Alerts
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {criticalAlerts.map((alert) => (
            <div
              key={alert.id}
              className="border border-neutral-200 rounded-md hover:border-neutral-300 transition-colors cursor-pointer"
              style={{ padding: spacing[4] }}
              onClick={() => onNavigate(alert.targetTab)}
            >
              <div className="flex items-start justify-between" style={{ marginBottom: spacing[2] }}>
                <div className="flex items-center" style={{ gap: spacing[2] }}>
                  <AlertTriangle style={{ width: '20px', height: '20px', color: getSeverityColor(alert.severity) }} />
                  <span className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>
                    {alert.title}
                  </span>
                </div>
                <span className="text-neutral-400" style={{ fontSize: typography.fontSize.xs }}>
                  {alert.timestamp}
                </span>
              </div>
              <p className="text-neutral-600" style={{ fontSize: typography.fontSize.sm, marginBottom: spacing[2], marginLeft: '28px' }}>
                {alert.description}
              </p>
              <button
                className="flex items-center hover:bg-neutral-50 rounded transition-colors"
                style={{ gap: spacing[1], padding: `${spacing[1]} ${spacing[2]}`, marginLeft: '28px', fontSize: typography.fontSize.sm, color: colors.primary[600] }}
              >
                {alert.action}
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Metrics - 6 Primary KPIs */}
      <div>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Key Performance Indicators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3" style={{ gap: spacing[4] }}>
          {heroMetrics.map((metric, index) => (
            <HeroMetricCard key={index} metric={metric} />
          ))}
        </div>
      </div>

      {/* Trends Visualization */}
      <div className="bg-white border border-neutral-200 rounded-lg" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Weekly Trends
        </h2>
        <div className="grid grid-cols-2" style={{ gap: spacing[6] }}>
          {/* PA Approval Trend */}
          <div>
            <div className="flex items-center justify-between" style={{ marginBottom: spacing[3] }}>
              <div>
                <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
                  PA Approval Rate
                </div>
                <div className="text-neutral-900" style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold }}>
                  83% avg
                </div>
              </div>
              <div className="flex items-center" style={{ gap: spacing[1], fontSize: typography.fontSize.sm, color: colors.status.success }}>
                <TrendingUp style={{ width: '16px', height: '16px' }} />
                +3%
              </div>
            </div>
            <div className="flex items-end justify-between" style={{ height: '120px', gap: spacing[2] }}>
              {weeklyTrends.map((day, index) => (
                <div key={index} className="flex flex-col items-center" style={{ flex: 1, gap: spacing[1] }}>
                  <div className="w-full bg-primary-200 rounded-t" style={{
                    height: `${day.paApprovals}%`,
                    backgroundColor: colors.primary[200],
                    minHeight: '4px'
                  }} />
                  <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs }}>
                    {day.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Friction Events Trend */}
          <div>
            <div className="flex items-center justify-between" style={{ marginBottom: spacing[3] }}>
              <div>
                <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
                  Daily Friction Events
                </div>
                <div className="text-neutral-900" style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold }}>
                  138 avg
                </div>
              </div>
              <div className="flex items-center" style={{ gap: spacing[1], fontSize: typography.fontSize.sm, color: colors.status.error }}>
                <TrendingUp style={{ width: '16px', height: '16px' }} />
                +18%
              </div>
            </div>
            <div className="flex items-end justify-between" style={{ height: '120px', gap: spacing[2] }}>
              {weeklyTrends.map((day, index) => (
                <div key={index} className="flex flex-col items-center" style={{ flex: 1, gap: spacing[1] }}>
                  <div className="w-full bg-red-200 rounded-t" style={{
                    height: `${(day.frictionEvents / 200) * 100}%`,
                    backgroundColor: colors.status.errorBg,
                    minHeight: '4px'
                  }} />
                  <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs }}>
                    {day.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Friction Points */}
      <div className="bg-white border border-neutral-200 rounded-lg" style={{ padding: spacing[6] }}>
        <div className="flex items-center justify-between" style={{ marginBottom: spacing[4] }}>
          <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>
            Top Friction Points
          </h2>
          <button
            onClick={() => onNavigate('intelligence')}
            className="text-neutral-700 hover:text-neutral-900 transition-colors"
            style={{ fontSize: typography.fontSize.sm, display: 'flex', alignItems: 'center', gap: spacing[1] }}
          >
            View All <ArrowRight style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {topFrictionPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b cursor-pointer hover:bg-neutral-50 transition-colors"
              style={{ paddingBottom: spacing[3], borderColor: colors.neutral[200] }}
              onClick={() => onNavigate('intelligence')}
            >
              <div className="flex items-center" style={{ gap: spacing[3] }}>
                <AlertTriangle style={{
                  width: '16px',
                  height: '16px',
                  color: point.severity === 'critical' ? colors.status.error : colors.status.warning
                }} />
                <span className="text-neutral-900" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>
                  {point.barrier}
                </span>
                <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                  {point.count} occurrences
                </span>
              </div>
              <span className="rounded" style={{
                padding: `2px ${spacing[2]}`,
                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.medium,
                backgroundColor: point.severity === 'critical' ? colors.status.errorBg : colors.status.warningBg,
                color: point.severity === 'critical' ? colors.status.error : colors.status.warning
              }}>
                {point.impact} Impact
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
