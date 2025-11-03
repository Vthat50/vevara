'use client';

import { useState } from 'react';
import { Award, TrendingUp, TrendingDown, Users, Clock, CheckCircle, MessageSquare, Target } from 'lucide-react';
import { colors, spacing, typography } from '@/lib/design-system';

export default function AgentPerformanceTab() {
  const agents = [
    {
      id: 1,
      name: 'Sarah Johnson',
      initials: 'SJ',
      callsHandled: 245,
      avgHandleTime: '7.2 min',
      resolutionRate: 89,
      patientSat: 4.6,
      complianceScore: 97,
      empathyScore: 92,
      rank: 1,
      change: '+5'
    },
    {
      id: 2,
      name: 'Michael Chen',
      initials: 'MC',
      callsHandled: 198,
      avgHandleTime: '8.1 min',
      resolutionRate: 85,
      patientSat: 4.4,
      complianceScore: 95,
      empathyScore: 88,
      rank: 2,
      change: '+2'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      initials: 'ER',
      callsHandled: 212,
      avgHandleTime: '9.3 min',
      resolutionRate: 82,
      patientSat: 4.2,
      complianceScore: 93,
      empathyScore: 90,
      rank: 3,
      change: '-1'
    },
    {
      id: 4,
      name: 'James Wilson',
      initials: 'JW',
      callsHandled: 189,
      avgHandleTime: '8.8 min',
      resolutionRate: 81,
      patientSat: 4.1,
      complianceScore: 91,
      empathyScore: 85,
      rank: 4,
      change: '0'
    }
  ];

  const teamStats = [
    { label: 'Team Avg Resolution Rate', value: '84%', target: '85%', status: 'warning' },
    { label: 'Team Avg Patient Satisfaction', value: '4.3/5', target: '4.5/5', status: 'warning' },
    { label: 'Team Avg Handle Time', value: '8.4 min', target: '<9 min', status: 'success' },
    { label: 'Team Compliance Score', value: '94%', target: '>90%', status: 'success' }
  ];

  const coachingOpportunities = [
    {
      agent: 'Emily Rodriguez',
      opportunity: 'Active listening',
      description: 'Agent talk-time ratio is 65% (target: <55%). Consider training on active listening techniques.',
      priority: 'medium',
      conversationId: 'CONV-1234'
    },
    {
      agent: 'James Wilson',
      opportunity: 'Empathy expression',
      description: 'Empathy score below team average. Review conversation CONV-5678 for coaching moment.',
      priority: 'medium',
      conversationId: 'CONV-5678'
    },
    {
      agent: 'Michael Chen',
      opportunity: 'PA explanation clarity',
      description: 'Multiple patient callbacks on PA status. Consider clearer initial explanation.',
      priority: 'low',
      conversationId: 'CONV-9012'
    }
  ];

  return (
    <div style={{ padding: spacing[6], backgroundColor: colors.background.page, display: 'flex', flexDirection: 'column', gap: spacing[6] }}>
      {/* Header */}
      <div>
        <h1 className="text-neutral-900" style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
          Agent Performance
        </h1>
        <p className="text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>
          Quality management and coaching intelligence for contact center agents
        </p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: spacing[4] }}>
        {teamStats.map((stat, index) => (
          <div key={index} className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
            <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[2] }}>
              {stat.label}
            </div>
            <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
              {stat.value}
            </div>
            <div className="flex items-center" style={{ gap: spacing[1] }}>
              <span className="text-neutral-500" style={{ fontSize: typography.fontSize.xs }}>
                Target: {stat.target}
              </span>
              {stat.status === 'success' ? (
                <CheckCircle style={{ width: '14px', height: '14px', color: colors.status.success }} />
              ) : (
                <span style={{ fontSize: typography.fontSize.xs, color: colors.status.warning }}>Below target</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Agent Leaderboard */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <div className="flex items-center justify-between" style={{ marginBottom: spacing[4] }}>
          <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>
            Agent Performance Leaderboard
          </h2>
          <button className="border border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded transition-colors"
                  style={{ padding: `${spacing[2]} ${spacing[3]}`, fontSize: typography.fontSize.sm }}>
            View All Agents
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b" style={{ backgroundColor: colors.neutral[50], borderColor: colors.neutral[200] }}>
              <tr>
                <th className="text-left text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Rank
                </th>
                <th className="text-left text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Agent
                </th>
                <th className="text-left text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Calls Handled
                </th>
                <th className="text-left text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Avg Handle Time
                </th>
                <th className="text-left text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Resolution Rate
                </th>
                <th className="text-left text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Patient Sat
                </th>
                <th className="text-left text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Compliance
                </th>
                <th className="text-left text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Empathy
                </th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, index) => (
                <tr key={agent.id} className="border-b transition-colors hover:bg-neutral-50" style={{ borderColor: colors.neutral[100] }}>
                  <td style={{ padding: `${spacing[3]} ${spacing[4]}` }}>
                    <div className="flex items-center" style={{ gap: spacing[2] }}>
                      <span className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>
                        #{agent.rank}
                      </span>
                      {parseInt(agent.change) > 0 && (
                        <TrendingUp style={{ width: '14px', height: '14px', color: colors.status.success }} />
                      )}
                      {parseInt(agent.change) < 0 && (
                        <TrendingDown style={{ width: '14px', height: '14px', color: colors.status.error }} />
                      )}
                    </div>
                  </td>
                  <td style={{ padding: `${spacing[3]} ${spacing[4]}` }}>
                    <div className="flex items-center" style={{ gap: spacing[2] }}>
                      <div className="rounded-full flex items-center justify-center" style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: agent.rank === 1 ? colors.primary[100] : colors.neutral[100],
                        color: agent.rank === 1 ? colors.primary[700] : colors.neutral[700],
                        fontSize: typography.fontSize.xs,
                        fontWeight: typography.fontWeight.medium
                      }}>
                        {agent.initials}
                      </div>
                      <div>
                        <div className="text-neutral-900" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>
                          {agent.name}
                        </div>
                        {agent.rank === 1 && (
                          <div className="flex items-center" style={{ gap: spacing[1], marginTop: '2px' }}>
                            <Award style={{ width: '12px', height: '12px', color: colors.primary[600] }} />
                            <span style={{ fontSize: typography.fontSize.xs, color: colors.primary[600] }}>Top Performer</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-neutral-700" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.sm }}>
                    {agent.callsHandled}
                  </td>
                  <td className="text-neutral-700" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.sm }}>
                    {agent.avgHandleTime}
                  </td>
                  <td style={{ padding: `${spacing[3]} ${spacing[4]}` }}>
                    <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: agent.resolutionRate >= 85 ? colors.status.success : colors.neutral[700] }}>
                      {agent.resolutionRate}%
                    </span>
                  </td>
                  <td className="text-neutral-700" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.sm }}>
                    {agent.patientSat}/5
                  </td>
                  <td className="text-neutral-700" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.sm }}>
                    {agent.complianceScore}%
                  </td>
                  <td className="text-neutral-700" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.sm }}>
                    {agent.empathyScore}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coaching Opportunities */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Coaching Opportunities
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {coachingOpportunities.map((opp, index) => (
            <div key={index} className="border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
              <div className="flex items-start justify-between" style={{ marginBottom: spacing[2] }}>
                <div>
                  <div className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
                    {opp.agent}
                  </div>
                  <div style={{ fontSize: typography.fontSize.sm, color: colors.status.info, marginBottom: spacing[2] }}>
                    {opp.opportunity}
                  </div>
                </div>
                <span className="rounded" style={{
                  padding: `2px ${spacing[2]}`,
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.medium,
                  textTransform: 'uppercase',
                  backgroundColor: opp.priority === 'medium' ? colors.status.warningBg : colors.neutral[100],
                  color: opp.priority === 'medium' ? colors.status.warning : colors.neutral[600]
                }}>
                  {opp.priority}
                </span>
              </div>
              <p className="text-neutral-600" style={{ fontSize: typography.fontSize.sm, marginBottom: spacing[3] }}>
                {opp.description}
              </p>
              <button className="border border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded transition-colors"
                      style={{ padding: `${spacing[1]} ${spacing[3]}`, fontSize: typography.fontSize.sm }}>
                Review Conversation {opp.conversationId}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
