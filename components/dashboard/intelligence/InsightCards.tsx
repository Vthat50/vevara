'use client';

import { AlertTriangle, TrendingUp, CheckCircle, Lightbulb, ArrowRight, Users, Activity } from 'lucide-react';
import { analyzedConversations } from '@/data/conversationIntelligence';

interface Insight {
  id: string;
  type: 'critical' | 'opportunity' | 'success' | 'alert';
  title: string;
  description: string;
  metric?: string;
  affectedCount: number;
  action: string;
  actionLink?: string;
  priority: number;
}

export default function InsightCards() {
  // Generate insights from conversation data
  const generateInsights = (): Insight[] => {
    const insights: Insight[] = [];

    // Check for high-risk patients
    const highRiskConvos = analyzedConversations.filter(c => c.riskLevel === 'high' || c.riskLevel === 'critical');
    if (highRiskConvos.length > 0) {
      insights.push({
        id: 'high-risk',
        type: 'critical',
        title: `${highRiskConvos.length} Patient${highRiskConvos.length > 1 ? 's' : ''} at High Risk`,
        description: 'Therapy abandonment signals detected in recent conversations',
        metric: `${highRiskConvos.length}/${analyzedConversations.length}`,
        affectedCount: highRiskConvos.length,
        action: 'View affected patients',
        priority: 1,
      });
    }

    // Check for side effect patterns
    const sideEffectConvos = analyzedConversations.filter(c =>
      c.topicsDetected.includes('topic-side-effects')
    );
    if (sideEffectConvos.length > 0) {
      const escalatedSideEffects = sideEffectConvos.filter(c => c.escalated);
      const escalationRate = (escalatedSideEffects.length / sideEffectConvos.length) * 100;

      insights.push({
        id: 'side-effects',
        type: escalationRate > 50 ? 'alert' : 'opportunity',
        title: 'Side Effect Management Opportunity',
        description: `${sideEffectConvos.length} patients reported side effects. ${Math.round(escalationRate)}% required escalation.`,
        metric: `${escalationRate.toFixed(0)}% escalation rate`,
        affectedCount: sideEffectConvos.length,
        action: 'Review management protocols',
        priority: 2,
      });
    }

    // Check for adherence improvements
    const adherenceConvos = analyzedConversations.filter(c =>
      c.conversationType === 'adherence-checkin' || c.conversationType === 'refill-reminder'
    );
    const resolvedAdherence = adherenceConvos.filter(c => c.resolutionStatus === 'resolved' && c.outcomeAchieved);
    if (adherenceConvos.length > 0) {
      const successRate = (resolvedAdherence.length / adherenceConvos.length) * 100;

      insights.push({
        id: 'adherence-success',
        type: 'success',
        title: 'Strong Adherence Support Performance',
        description: `${successRate.toFixed(0)}% of adherence conversations achieved positive outcomes`,
        metric: `${resolvedAdherence.length}/${adherenceConvos.length} resolved`,
        affectedCount: resolvedAdherence.length,
        action: 'View success patterns',
        priority: 3,
      });
    }

    // Check for refill coordination efficiency
    const refillConvos = analyzedConversations.filter(c =>
      c.topicsDetected.includes('topic-refill')
    );
    const quickRefills = refillConvos.filter(c => c.duration < 240); // under 4 minutes
    if (refillConvos.length > 0) {
      const efficiencyRate = (quickRefills.length / refillConvos.length) * 100;

      if (efficiencyRate > 60) {
        insights.push({
          id: 'refill-efficiency',
          type: 'success',
          title: 'Efficient Refill Coordination',
          description: `${efficiencyRate.toFixed(0)}% of refill requests handled in under 4 minutes`,
          metric: 'Avg: ' + Math.floor(refillConvos.reduce((sum, c) => sum + c.duration, 0) / refillConvos.length / 60) + 'm',
          affectedCount: quickRefills.length,
          action: 'Document best practices',
          priority: 4,
        });
      }
    }

    // Check for missed dose patterns
    const missedDoseConvos = analyzedConversations.filter(c =>
      c.transcript.some(m => m.message.toLowerCase().includes('missed') || m.message.toLowerCase().includes('forgot'))
    );
    if (missedDoseConvos.length > 0) {
      insights.push({
        id: 'missed-doses',
        type: 'opportunity',
        title: 'Missed Dose Prevention Opportunity',
        description: `${missedDoseConvos.length} patients mentioned forgetting or missing doses`,
        metric: `${missedDoseConvos.length} patients`,
        affectedCount: missedDoseConvos.length,
        action: 'Set up reminder programs',
        priority: 2,
      });
    }

    // Check for positive sentiment trends
    const positiveConvos = analyzedConversations.filter(c => c.overallSentiment === 'positive');
    const satisfactionRate = (positiveConvos.length / analyzedConversations.length) * 100;

    if (satisfactionRate > 60) {
      insights.push({
        id: 'positive-sentiment',
        type: 'success',
        title: 'High Patient Satisfaction',
        description: `${satisfactionRate.toFixed(0)}% of conversations had positive sentiment`,
        metric: `${positiveConvos.length}/${analyzedConversations.length} positive`,
        affectedCount: positiveConvos.length,
        action: 'See what\'s working',
        priority: 5,
      });
    }

    return insights.sort((a, b) => a.priority - b.priority);
  };

  const insights = generateInsights();

  const getInsightStyle = (type: Insight['type']) => {
    switch (type) {
      case 'critical':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-300',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          icon: AlertTriangle,
        };
      case 'alert':
        return {
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-300',
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          icon: Activity,
        };
      case 'opportunity':
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-300',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          icon: Lightbulb,
        };
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-300',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          icon: CheckCircle,
        };
    }
  };

  if (insights.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">All systems operating normally. No critical insights at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Priority Insights</h3>
        <span className="text-sm text-gray-500">{insights.length} insights detected</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {insights.map((insight) => {
          const style = getInsightStyle(insight.type);
          const Icon = style.icon;

          return (
            <div
              key={insight.id}
              className={`${style.bgColor} ${style.borderColor} border-2 rounded-lg p-5 transition-all hover:shadow-md`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`${style.iconBg} rounded-lg p-3 flex-shrink-0`}>
                  <Icon className={`h-6 w-6 ${style.iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-base font-bold text-gray-900 mb-1">{insight.title}</h4>
                      <p className="text-sm text-gray-700">{insight.description}</p>
                    </div>
                    {insight.metric && (
                      <div className="bg-white rounded px-3 py-1 ml-4 flex-shrink-0">
                        <p className="text-xs font-medium text-gray-600">Metric</p>
                        <p className="text-sm font-bold text-gray-900">{insight.metric}</p>
                      </div>
                    )}
                  </div>

                  {/* Affected count */}
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      {insight.affectedCount} {insight.affectedCount === 1 ? 'patient' : 'patients'} affected
                    </span>
                  </div>

                  {/* Action button */}
                  <button
                    className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors group"
                  >
                    <span>{insight.action}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
