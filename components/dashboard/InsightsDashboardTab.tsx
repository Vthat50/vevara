'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Target, Activity, Bell, ArrowRight } from 'lucide-react';
import { colors, spacing, typography } from '@/lib/design-system';

interface InsightsDashboardTabProps {
  onNavigate?: (tab: string) => void;
}

export default function InsightsDashboardTab({ onNavigate }: InsightsDashboardTabProps) {
  // Mock data for insights
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Prior Authorization mentions up 67% this week',
      description: 'Significant increase in PA-related calls. Top payer: UnitedHealthcare (89 calls)',
      action: 'View PA Intelligence',
      targetTab: 'access-reimbursement',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Patient satisfaction declining for refill calls',
      description: 'Average CSAT dropped from 4.2 to 3.6 over past 7 days',
      action: 'View Agent Performance',
      targetTab: 'agent-performance',
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      type: 'info',
      title: '23 high-risk patients identified',
      description: 'Patients showing abandonment signals requiring immediate outreach',
      action: 'View At-Risk Patients',
      targetTab: 'patient-risk',
      timestamp: '1 day ago'
    }
  ];

  const insights = [
    {
      id: 1,
      type: 'positive',
      icon: TrendingUp,
      title: 'Proactive refill reminders driving adherence',
      metric: '+34% adherence rate',
      description: 'Patients receiving proactive reminders show significantly better medication adherence',
      impact: 'High'
    },
    {
      id: 2,
      type: 'opportunity',
      icon: Lightbulb,
      title: 'Injection site reaction education gap',
      metric: '47 mentions this week',
      description: 'Patients frequently ask about injection site reactions. Consider creating education materials',
      impact: 'Medium'
    },
    {
      id: 3,
      type: 'negative',
      icon: TrendingDown,
      title: 'Shipping delays causing friction',
      metric: '31% increase',
      description: 'Specialty pharmacy shipping delays driving patient complaints and potential abandonment',
      impact: 'High'
    },
    {
      id: 4,
      type: 'opportunity',
      icon: Target,
      title: 'Copay assistance program underutilized',
      metric: '42% enrollment rate',
      description: 'Many eligible patients not enrolled in copay program. Opportunity to reduce financial abandonment',
      impact: 'Medium'
    }
  ];

  const trends = [
    { label: 'Total Conversations', value: '1,247', change: '+12%', trend: 'up' },
    { label: 'Avg Resolution Time', value: '8.3 min', change: '-5%', trend: 'down' },
    { label: 'Patient Satisfaction', value: '4.1/5', change: '-0.3', trend: 'down' },
    { label: 'First Call Resolution', value: '73%', change: '+8%', trend: 'up' }
  ];

  const topCallDrivers = [
    { driver: 'Refill Request', volume: 342, change: '+5%' },
    { driver: 'Prior Authorization', volume: 289, change: '+67%' },
    { driver: 'Side Effects', volume: 156, change: '-12%' },
    { driver: 'Insurance Question', volume: 134, change: '+23%' },
    { driver: 'Enrollment', volume: 98, change: '-8%' }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return colors.status.error;
      case 'warning': return colors.status.warning;
      default: return colors.status.info;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return colors.status.success;
      case 'negative': return colors.status.error;
      default: return colors.status.info;
    }
  };

  return (
    <div style={{ padding: spacing[6], backgroundColor: colors.background.page, display: 'flex', flexDirection: 'column', gap: spacing[6] }}>
      {/* Header */}
      <div>
        <h1 className="text-neutral-900" style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
          Insights Dashboard
        </h1>
        <p className="text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>
          Auto-generated insights and intelligence from your patient conversations
        </p>
      </div>

      {/* Key Trends */}
      <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: spacing[4] }}>
        {trends.map((trend, index) => (
          <div key={index} className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
            <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
              {trend.label}
            </div>
            <div className="flex items-baseline" style={{ gap: spacing[2], marginBottom: spacing[1] }}>
              <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>
                {trend.value}
              </div>
              <div className="flex items-center" style={{
                gap: spacing[1],
                fontSize: typography.fontSize.sm,
                color: trend.trend === 'up' ? colors.status.success : colors.status.error
              }}>
                {trend.trend === 'up' ? <TrendingUp style={{ width: '16px', height: '16px' }} /> : <TrendingDown style={{ width: '16px', height: '16px' }} />}
                {trend.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <div className="flex items-center" style={{ gap: spacing[2], marginBottom: spacing[4] }}>
          <Bell style={{ width: '20px', height: '20px', color: colors.neutral[600] }} />
          <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>
            Critical Alerts
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {alerts.map((alert) => (
            <div key={alert.id} className="border border-neutral-200 rounded-md hover:border-neutral-300 transition-colors cursor-pointer"
                 style={{ padding: spacing[4] }}
                 onClick={() => onNavigate?.(alert.targetTab)}>
              <div className="flex items-start justify-between" style={{ marginBottom: spacing[2] }}>
                <div className="flex items-center" style={{ gap: spacing[2] }}>
                  <AlertTriangle style={{ width: '20px', height: '20px', color: getAlertColor(alert.type) }} />
                  <span className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>
                    {alert.title}
                  </span>
                </div>
                <span className="text-neutral-400" style={{ fontSize: typography.fontSize.xs }}>
                  {alert.timestamp}
                </span>
              </div>
              <p className="text-neutral-600" style={{ fontSize: typography.fontSize.sm, marginBottom: spacing[3], marginLeft: '28px' }}>
                {alert.description}
              </p>
              <button className="flex items-center hover:bg-neutral-50 rounded transition-colors"
                      style={{ gap: spacing[1], padding: `${spacing[1]} ${spacing[2]}`, marginLeft: '28px', fontSize: typography.fontSize.sm, color: colors.primary[600] }}>
                {alert.action}
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Auto-Generated Insights */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <div className="flex items-center" style={{ gap: spacing[2], marginBottom: spacing[4] }}>
          <Activity style={{ width: '20px', height: '20px', color: colors.neutral[600] }} />
          <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>
            AI-Generated Insights
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: spacing[4] }}>
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div key={insight.id} className="border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
                <div className="flex items-start" style={{ gap: spacing[3], marginBottom: spacing[3] }}>
                  <Icon style={{ width: '20px', height: '20px', color: getInsightColor(insight.type), flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="flex items-start justify-between" style={{ marginBottom: spacing[1] }}>
                      <h3 className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>
                        {insight.title}
                      </h3>
                      <span className="rounded" style={{
                        padding: `2px ${spacing[2]}`,
                        fontSize: typography.fontSize.xs,
                        fontWeight: typography.fontWeight.medium,
                        backgroundColor: insight.impact === 'High' ? colors.status.errorBg : colors.status.warningBg,
                        color: insight.impact === 'High' ? colors.status.error : colors.status.warning
                      }}>
                        {insight.impact} Impact
                      </span>
                    </div>
                    <div className="text-neutral-600" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[2] }}>
                      {insight.metric}
                    </div>
                    <p className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Call Drivers */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Top Call Drivers This Week
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {topCallDrivers.map((driver, index) => (
            <div key={index} className="flex items-center justify-between" style={{ paddingBottom: spacing[3], borderBottom: index < topCallDrivers.length - 1 ? `1px solid ${colors.neutral[200]}` : 'none' }}>
              <div className="flex items-center" style={{ gap: spacing[3] }}>
                <span className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium }}>
                  {driver.driver}
                </span>
                <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                  {driver.volume} calls
                </span>
              </div>
              <span style={{
                fontSize: typography.fontSize.sm,
                color: driver.change.startsWith('+') ? colors.status.success : colors.status.error
              }}>
                {driver.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
