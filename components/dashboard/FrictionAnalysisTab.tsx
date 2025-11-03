'use client';

import { useState } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Minus, DollarSign, FileText, Pill, MessageSquare, Clock, MapPin } from 'lucide-react';
import { colors, spacing, typography } from '@/lib/design-system';

export default function FrictionAnalysisTab() {
  const [selectedBarrier, setSelectedBarrier] = useState<string | null>(null);

  // Mock barrier data
  const barriers = [
    {
      id: 1,
      category: 'financial',
      name: 'High Out-of-Pocket Costs',
      frequency: 234,
      affectedPatients: 189,
      impact: 'critical',
      trend: 'increasing',
      trendValue: '+23%',
      avgTimeToResolve: '12.3 days',
      resolutionRate: 67,
      suggestedIntervention: 'Enroll in copay assistance program'
    },
    {
      id: 2,
      category: 'insurance',
      name: 'Prior Authorization Delays',
      frequency: 289,
      affectedPatients: 245,
      impact: 'critical',
      trend: 'increasing',
      trendValue: '+67%',
      avgTimeToResolve: '8.7 days',
      resolutionRate: 78,
      suggestedIntervention: 'Expedite PA submission with medical necessity letter'
    },
    {
      id: 3,
      category: 'side-effects',
      name: 'Injection Site Reactions',
      frequency: 156,
      affectedPatients: 142,
      impact: 'high',
      trend: 'stable',
      trendValue: '-2%',
      avgTimeToResolve: '3.2 days',
      resolutionRate: 92,
      suggestedIntervention: 'Provide injection technique education'
    },
    {
      id: 4,
      category: 'logistics',
      name: 'Shipping Delays',
      frequency: 134,
      affectedPatients: 98,
      impact: 'high',
      trend: 'increasing',
      trendValue: '+31%',
      avgTimeToResolve: '5.1 days',
      resolutionRate: 85,
      suggestedIntervention: 'Switch to expedited shipping'
    },
    {
      id: 5,
      category: 'complexity',
      name: 'Difficulty Understanding Dosing',
      frequency: 89,
      affectedPatients: 76,
      impact: 'medium',
      trend: 'decreasing',
      trendValue: '-12%',
      avgTimeToResolve: '2.1 days',
      resolutionRate: 94,
      suggestedIntervention: 'Send simplified dosing instructions'
    },
    {
      id: 6,
      category: 'misunderstanding',
      name: 'Unclear Prior Authorization Process',
      frequency: 67,
      affectedPatients: 54,
      impact: 'medium',
      trend: 'stable',
      trendValue: '+3%',
      avgTimeToResolve: '4.5 days',
      resolutionRate: 81,
      suggestedIntervention: 'Provide PA status tracker access'
    }
  ];

  const categoryIcons = {
    financial: DollarSign,
    insurance: FileText,
    'side-effects': Pill,
    logistics: MapPin,
    complexity: MessageSquare,
    misunderstanding: AlertTriangle
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return TrendingUp;
      case 'decreasing': return TrendingDown;
      default: return Minus;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return colors.status.error;
      case 'decreasing': return colors.status.success;
      default: return colors.neutral[600];
    }
  };

  // Calculate summary stats
  const totalBarriers = barriers.reduce((sum, b) => sum + b.frequency, 0);
  const totalPatients = new Set(barriers.flatMap(b => Array(b.affectedPatients).fill(b.id))).size;
  const avgResolutionRate = Math.round(barriers.reduce((sum, b) => sum + b.resolutionRate, 0) / barriers.length);
  const criticalBarriers = barriers.filter(b => b.impact === 'critical').length;

  return (
    <div style={{ padding: spacing[6], backgroundColor: colors.background.page, display: 'flex', flexDirection: 'column', gap: spacing[6] }}>
      {/* Header */}
      <div>
        <h1 className="text-neutral-900" style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
          Friction Analysis
        </h1>
        <p className="text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>
          Identify and analyze patient barriers impacting therapy access and adherence
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: spacing[4] }}>
        <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
          <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
            Total Friction Events
          </div>
          <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>
            {totalBarriers}
          </div>
          <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>Last 30 days</div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
          <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
            Affected Patients
          </div>
          <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>
            {totalPatients}
          </div>
          <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>Unique patients</div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
          <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
            Avg Resolution Rate
          </div>
          <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>
            {avgResolutionRate}%
          </div>
          <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>Across all barriers</div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
          <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
            Critical Barriers
          </div>
          <div style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold, color: colors.status.error }}>
            {criticalBarriers}
          </div>
          <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>Requiring immediate action</div>
        </div>
      </div>

      {/* Friction Heat Map */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Top Patient Barriers
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {barriers.map((barrier) => {
            const Icon = categoryIcons[barrier.category as keyof typeof categoryIcons] || AlertTriangle;
            const TrendIcon = getTrendIcon(barrier.trend);

            return (
              <div key={barrier.id}
                   className="border border-neutral-200 rounded-md hover:border-neutral-300 transition-colors cursor-pointer"
                   style={{ padding: spacing[4] }}
                   onClick={() => setSelectedBarrier(selectedBarrier === barrier.name ? null : barrier.name)}>
                <div className="flex items-start justify-between" style={{ marginBottom: spacing[3] }}>
                  <div className="flex items-start" style={{ gap: spacing[3], flex: 1 }}>
                    <Icon style={{ width: '20px', height: '20px', color: getImpactColor(barrier.impact), flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ flex: 1 }}>
                      <div className="flex items-center flex-wrap" style={{ gap: spacing[2], marginBottom: spacing[1] }}>
                        <h3 className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>
                          {barrier.name}
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
                        <div className="flex items-center" style={{ gap: spacing[1] }}>
                          <TrendIcon style={{ width: '14px', height: '14px', color: getTrendColor(barrier.trend) }} />
                          <span style={{ fontSize: typography.fontSize.xs, color: getTrendColor(barrier.trend) }}>
                            {barrier.trendValue}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center" style={{ gap: spacing[4] }}>
                        <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                          <span style={{ fontWeight: typography.fontWeight.semibold }}>{barrier.frequency}</span> occurrences
                        </span>
                        <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                          <span style={{ fontWeight: typography.fontWeight.semibold }}>{barrier.affectedPatients}</span> patients
                        </span>
                        <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                          <span style={{ fontWeight: typography.fontWeight.semibold }}>{barrier.resolutionRate}%</span> resolved
                        </span>
                        <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                          <Clock style={{ width: '14px', height: '14px', display: 'inline', marginRight: '4px' }} />
                          {barrier.avgTimeToResolve} avg
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedBarrier === barrier.name && (
                  <div className="border-t border-neutral-200" style={{ paddingTop: spacing[3], marginTop: spacing[3] }}>
                    <div className="bg-neutral-50 border border-neutral-200 rounded" style={{ padding: spacing[3] }}>
                      <div className="text-neutral-700" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, marginBottom: spacing[1] }}>
                        Recommended Intervention:
                      </div>
                      <div className="text-neutral-900" style={{ fontSize: typography.fontSize.sm }}>
                        {barrier.suggestedIntervention}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Barrier Category Breakdown */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Barriers by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: spacing[4] }}>
          {Object.entries({
            Financial: { count: 234, color: colors.status.error },
            Insurance: { count: 289, color: colors.status.warning },
            'Side Effects': { count: 156, color: colors.status.info },
            Logistics: { count: 134, color: colors.neutral[600] },
            Complexity: { count: 89, color: colors.neutral[600] },
            Misunderstanding: { count: 67, color: colors.neutral[600] }
          }).map(([category, data]) => (
            <div key={category} className="border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
              <div className="text-neutral-600" style={{ fontSize: typography.fontSize.sm, marginBottom: spacing[1] }}>
                {category}
              </div>
              <div style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold, color: data.color }}>
                {data.count}
              </div>
              <div className="bg-neutral-200 rounded-full" style={{ height: '4px', marginTop: spacing[2] }}>
                <div className="rounded-full" style={{
                  height: '100%',
                  width: `${(data.count / totalBarriers) * 100}%`,
                  backgroundColor: data.color
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
