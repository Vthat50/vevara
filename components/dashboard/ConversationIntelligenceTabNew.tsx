'use client';

import { useState } from 'react';
import { Activity, AlertTriangle, TrendingUp, MessageSquare, Shield, Users, Clock, Target, DollarSign, Pill } from 'lucide-react';
import ConversationInsightsProfessional from './intelligence/ConversationInsightsProfessional';
import { analyzedConversations } from '@/data/conversationIntelligence';
import { colors, spacing, typography, components } from '@/lib/design-system';

type TabMode = 'overview' | 'performance' | 'journey' | 'insights' | 'compliance' | 'call-detail';

export default function ConversationIntelligenceTabNew() {
  const [activeTab, setActiveTab] = useState<TabMode>('overview');

  // Calculate REAL pharma patient hub metrics
  const totalCalls = analyzedConversations.length;

  // Enrollment Rate: % of patients who started therapy after enrollment call
  const enrollmentRate = Math.round(
    (analyzedConversations.filter(c => c.outcomeAchieved).length / totalCalls) * 100
  );

  // Time to Therapy: Average days from referral to first fill (simulated)
  const avgTimeToTherapy = 7.2; // days

  // Medication Adherence: % patients staying on therapy (PDC > 80%)
  const adherenceRate = 89; // % with PDC > 80%

  // PA Approval Rate: % of prior authorizations approved
  const paApprovalRate = 94; // %

  // Copay Assistance Utilization: % patients using financial assistance
  const copayUtilization = 67; // %

  // Duration on Therapy: Average months patient stays on medication
  const avgDurationMonths = 11.4; // months

  // Critical alerts
  const highRiskPatients = analyzedConversations.filter(
    c => c.riskLevel === 'high' || c.riskLevel === 'critical'
  ).length;

  const adverseEvents = analyzedConversations.filter(
    c => c.escalated && c.escalationReason?.includes('adverse')
  ).length;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'insights', label: 'Conversation Insights', icon: MessageSquare },
  ];

  return (
    <div style={{ padding: spacing[6], backgroundColor: colors.background.page }}>
      {/* Header */}
      <div style={{ marginBottom: spacing[6] }}>
        <h1 className="text-neutral-900" style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
          Conversation Intelligence
        </h1>
        <p className="text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>
          AI-powered insights for pharma patient hub services
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ borderBottom: `1px solid ${colors.neutral[200]}`, marginBottom: spacing[6] }}>
        <nav className="flex" style={{ gap: spacing[8] }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabMode)}
                className="flex items-center transition-colors"
                style={{
                  gap: spacing[2],
                  paddingTop: spacing[3],
                  paddingBottom: spacing[3],
                  paddingLeft: spacing[1],
                  paddingRight: spacing[1],
                  borderBottom: `2px solid ${isActive ? colors.primary[500] : 'transparent'}`,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  color: isActive ? colors.neutral[900] : colors.neutral[500],
                }}
              >
                <Icon style={{ width: '16px', height: '16px' }} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[6] }}>
          {/* Key Metrics - Real Pharma Hub KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: spacing[4] }}>
            <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
              <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[2] }}>
                Enrollment Rate
              </div>
              <div className="text-neutral-900" style={{ fontSize: typography.fontSize['4xl'], fontWeight: typography.fontWeight.semibold }}>{enrollmentRate}%</div>
              <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>Patients starting therapy</div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
              <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[2] }}>
                Time to Therapy
              </div>
              <div className="text-neutral-900" style={{ fontSize: typography.fontSize['4xl'], fontWeight: typography.fontWeight.semibold }}>{avgTimeToTherapy}</div>
              <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>Days (avg)</div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
              <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[2] }}>
                Adherence Rate
              </div>
              <div className="text-neutral-900" style={{ fontSize: typography.fontSize['4xl'], fontWeight: typography.fontWeight.semibold }}>{adherenceRate}%</div>
              <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>PDC &gt;80%</div>
            </div>
          </div>

          {/* Critical Alerts */}
          {(highRiskPatients > 0 || adverseEvents > 0) && (
            <div className="bg-white border rounded-md" style={{ borderColor: colors.status.error, borderWidth: '1px', padding: spacing[4] }}>
              <div className="flex items-start" style={{ gap: spacing[3] }}>
                <AlertTriangle style={{ width: '20px', height: '20px', color: colors.status.error, flexShrink: 0, marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <h3 className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[2] }}>Critical Alerts</h3>
                  <ul className="text-neutral-700" style={{ fontSize: typography.fontSize.sm, display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
                    {highRiskPatients > 0 && (
                      <li>• {highRiskPatients} patient{highRiskPatients > 1 ? 's' : ''} at risk of discontinuation</li>
                    )}
                    {adverseEvents > 0 && (
                      <li>• {adverseEvents} adverse event{adverseEvents > 1 ? 's' : ''} reported - review required</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Metrics - Additional Hub Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: spacing[4] }}>
            <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
              <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>PA Approval Rate</div>
              <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>{paApprovalRate}%</div>
              <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>Prior authorizations</div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
              <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>Copay Assistance</div>
              <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>{copayUtilization}%</div>
              <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>Utilization rate</div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
              <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>Duration on Therapy</div>
              <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>{avgDurationMonths}</div>
              <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>Months (avg)</div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
              <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>Adverse Events</div>
              <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>{adverseEvents}</div>
              <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>Reported</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-1" style={{ gap: spacing[4] }}>
            <button
              onClick={() => setActiveTab('insights')}
              className="bg-white border border-neutral-200 rounded-md text-left transition-all hover:border-neutral-300"
              style={{ padding: spacing[6] }}
            >
              <MessageSquare style={{ width: '24px', height: '24px', color: colors.neutral[600], marginBottom: spacing[3] }} />
              <h3 className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>View Conversation Insights</h3>
              <p className="text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>
                Pattern recognition, conversation excerpts, and sentiment analysis
              </p>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <ConversationInsightsProfessional onBack={() => setActiveTab('overview')} />
      )}
    </div>
  );
}
