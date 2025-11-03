'use client';

import { ArrowLeft, User, Bot, AlertTriangle, ThumbsUp, ThumbsDown, Minus, Clock, Target, TrendingUp, Award, Shield, Heart, Bookmark, Tag, MessageCircle } from 'lucide-react';
import type { ConversationAnalytics, AnalyzedMessage, SentimentType } from '@/types/conversationIntelligence';
import { pharmaTopics } from '@/data/pharmaTopics';
import JourneyMap from './JourneyMap';
import { colors, spacing, typography, components } from '@/lib/design-system';

interface ConversationDetailProps {
  conversation: ConversationAnalytics;
  onBack: () => void;
}

export default function ConversationDetail({ conversation, onBack }: ConversationDetailProps) {
  const getSentimentIcon = (sentiment: SentimentType) => {
    if (sentiment === 'positive') return <ThumbsUp className="h-3 w-3" />;
    if (sentiment === 'negative') return <ThumbsDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  const getSentimentColor = (sentiment: SentimentType) => {
    if (sentiment === 'positive') return colors.status.success;
    if (sentiment === 'negative') return colors.status.error;
    return colors.neutral[600];
  };

  const getSentimentBgColor = (sentiment: SentimentType) => {
    if (sentiment === 'positive') return colors.status.successBg;
    if (sentiment === 'negative') return colors.status.errorBg;
    return colors.neutral[50];
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div style={{ padding: spacing[6], backgroundColor: colors.background.page, display: 'flex', flexDirection: 'column', gap: spacing[6] }}>
      {/* Header */}
      <div className="flex items-center" style={{ gap: spacing[4] }}>
        <button
          onClick={onBack}
          className="hover:bg-neutral-100 rounded transition-colors"
          style={{ padding: spacing[2] }}
        >
          <ArrowLeft style={{ width: '20px', height: '20px', color: colors.neutral[600] }} />
        </button>
        <div style={{ flex: 1 }}>
          <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.semibold }}>Conversation Details</h2>
          <p className="text-neutral-500" style={{ fontSize: typography.fontSize.sm, marginTop: spacing[1] }}>
            {conversation.patientName} • {new Date(conversation.callDate).toLocaleDateString()} at {conversation.callTime}
          </p>
        </div>
        <button className="border border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded transition-colors" style={{ padding: `${spacing[2]} ${spacing[4]}`, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>
          <Bookmark style={{ width: '16px', height: '16px', display: 'inline', marginRight: spacing[1] }} />
          Save Snippet
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: spacing[4] }}>
        <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
          <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[2] }}>
            Overall Sentiment
          </div>
          <div className="capitalize" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold, color: getSentimentColor(conversation.overallSentiment) }}>
            {conversation.overallSentiment}
          </div>
          <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>
            Score: {conversation.sentimentScore.toFixed(2)}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
          <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[2] }}>
            Quality Score
          </div>
          <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>
            {conversation.qualityScore}
            <span className="text-neutral-500" style={{ fontSize: typography.fontSize.base }}>/100</span>
          </div>
          <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>
            CSAT: {conversation.csatScore || 'N/A'}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
          <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[2] }}>
            Duration
          </div>
          <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>
            {formatDuration(conversation.duration)}
          </div>
          <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>
            Resolution: {formatDuration(conversation.resolutionTime)}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
          <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[2] }}>
            Risk Level
          </div>
          <div className="capitalize" style={{
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.semibold,
            color: conversation.riskLevel === 'high' || conversation.riskLevel === 'critical' ? colors.status.error :
                   conversation.riskLevel === 'medium' ? colors.status.warning :
                   colors.status.success
          }}>
            {conversation.riskLevel}
          </div>
          <div className="text-neutral-400" style={{ fontSize: typography.fontSize.xs, marginTop: spacing[1] }}>
            Churn risk: {conversation.churnRisk}%
          </div>
        </div>
      </div>

      {/* Patient Journey Map - Authenticx-style visual journey */}
      <JourneyMap conversation={conversation} />

      {/* Additional Metrics */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h3 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>Performance Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: spacing[6] }}>
          <div>
            <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
              Compliance
            </div>
            <div className="text-neutral-900" style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold }}>{conversation.complianceScore}%</div>
          </div>
          <div>
            <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
              Empathy
            </div>
            <div className="text-neutral-900" style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold }}>{conversation.empathyScore}%</div>
          </div>
          <div>
            <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
              Outcome
            </div>
            <div className="text-neutral-900" style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold }}>
              {conversation.outcomeAchieved ? 'Achieved' : 'Not Achieved'}
            </div>
          </div>
          <div>
            <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
              Sentiment Shift
            </div>
            <div className="text-neutral-900" style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold }}>
              {conversation.sentimentShift > 0 ? '+' : ''}{conversation.sentimentShift.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Topics & Tags */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h3 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>Topics Detected</h3>
        <div className="flex flex-wrap" style={{ gap: spacing[2] }}>
          {conversation.topicsDetected.map((topicId) => {
            const topic = pharmaTopics.find(t => t.id === topicId);
            return topic ? (
              <span
                key={topicId}
                className="rounded"
                style={{
                  padding: `${spacing[2]} ${spacing[3]}`,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  backgroundColor: colors.neutral[100],
                  color: colors.neutral[700]
                }}
              >
                {topic.name}
              </span>
            ) : null;
          })}
        </div>
        {conversation.primaryTopic && (
          <div className="text-neutral-600" style={{ marginTop: spacing[3], fontSize: typography.fontSize.sm }}>
            Primary Topic: <span className="text-neutral-900" style={{ fontWeight: typography.fontWeight.medium }}>
              {pharmaTopics.find(t => t.id === conversation.primaryTopic)?.name}
            </span>
          </div>
        )}
      </div>

      {/* Friction Points */}
      {conversation.frictionPoints.length > 0 && (
        <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
          <div className="flex items-center" style={{ gap: spacing[2], marginBottom: spacing[4] }}>
            <AlertTriangle style={{ width: '20px', height: '20px', color: colors.status.warning }} />
            <h3 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>
              Friction Points Detected ({conversation.frictionPoints.length})
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
            {conversation.frictionPoints.map((friction) => (
              <div key={friction.id} className="border border-neutral-200 rounded-md" style={{ padding: spacing[4], backgroundColor: colors.neutral[50] }}>
                <div className="flex items-start justify-between" style={{ marginBottom: spacing[2] }}>
                  <span className="rounded uppercase" style={{
                    fontSize: typography.fontSize.xs,
                    fontWeight: typography.fontWeight.medium,
                    padding: `${spacing[1]} ${spacing[2]}`,
                    backgroundColor: friction.severity === 'high' ? colors.status.errorBg :
                                    friction.severity === 'medium' ? colors.status.warningBg :
                                    colors.neutral[100],
                    color: friction.severity === 'high' ? colors.status.error :
                           friction.severity === 'medium' ? colors.status.warning :
                           colors.neutral[700]
                  }}>
                    {friction.severity} severity
                  </span>
                  <span className="capitalize text-neutral-600" style={{ fontSize: typography.fontSize.xs }}>
                    {friction.barrierType} barrier
                  </span>
                </div>
                <p className="text-neutral-900" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, marginBottom: spacing[2] }}>{friction.description}</p>
                <p className="text-neutral-600 italic" style={{ fontSize: typography.fontSize.sm, marginBottom: spacing[2] }}>"{friction.snippet}"</p>
                {friction.resolved && friction.resolutionAction && (
                  <div className="border rounded" style={{
                    backgroundColor: colors.status.successBg,
                    borderColor: colors.status.success,
                    padding: spacing[2],
                    fontSize: typography.fontSize.xs,
                    color: colors.status.success
                  }}>
                    Resolved: {friction.resolutionAction}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="border border-neutral-200 rounded" style={{ marginTop: spacing[4], padding: spacing[3], backgroundColor: colors.neutral[50] }}>
            <p className="text-neutral-700" style={{ fontSize: typography.fontSize.sm }}>
              <span style={{ fontWeight: typography.fontWeight.semibold }}>Friction Score: {conversation.frictionScore}/100</span> -
              {conversation.frictionScore < 30 ? ' Low friction conversation' :
               conversation.frictionScore < 60 ? ' Moderate friction detected' :
               ' High friction - requires attention'}
            </p>
          </div>
        </div>
      )}

      {/* Abandonment Signals */}
      {conversation.abandonmentSignals.length > 0 && (
        <div className="bg-white border rounded-md" style={{ borderColor: colors.status.error, padding: spacing[6] }}>
          <div className="flex items-center" style={{ gap: spacing[2], marginBottom: spacing[3] }}>
            <AlertTriangle style={{ width: '20px', height: '20px', color: colors.status.error }} />
            <h3 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>
              Therapy Abandonment Signals Detected
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
            {conversation.abandonmentSignals.map((signal, index) => (
              <div key={index} className="flex items-start" style={{ gap: spacing[2] }}>
                <span style={{ color: colors.status.error }}>•</span>
                <span className="text-neutral-700" style={{ fontSize: typography.fontSize.sm }}>{signal}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Transcript */}
      <div className="bg-white border border-neutral-200 rounded-md">
        <div className="border-b border-neutral-200" style={{ padding: spacing[6] }}>
          <div className="flex items-center" style={{ gap: spacing[2] }}>
            <MessageCircle style={{ width: '20px', height: '20px', color: colors.neutral[600] }} />
            <h3 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>Full Transcript with Sentiment Analysis</h3>
          </div>
        </div>
        <div className="max-h-[600px] overflow-y-auto" style={{ padding: spacing[6], display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
          {conversation.transcript.map((message, index) => {
            const isAI = message.speaker === 'ai';
            return (
              <div
                key={index}
                className={`flex ${message.keyMoment ? 'border rounded' : ''}`}
                style={message.keyMoment ? { gap: spacing[4], padding: spacing[3], borderColor: colors.status.warning, backgroundColor: colors.status.warningBg } : { gap: spacing[4] }}
              >
                <div style={{ flexShrink: 0 }}>
                  {isAI ? (
                    <div className="rounded-full flex items-center justify-center" style={{ width: '40px', height: '40px', backgroundColor: colors.neutral[100] }}>
                      <Bot style={{ width: '20px', height: '20px', color: colors.neutral[600] }} />
                    </div>
                  ) : (
                    <div className="rounded-full flex items-center justify-center" style={{ width: '40px', height: '40px', backgroundColor: colors.neutral[200] }}>
                      <User style={{ width: '20px', height: '20px', color: colors.neutral[700] }} />
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="flex items-center flex-wrap" style={{ gap: spacing[2], marginBottom: spacing[1] }}>
                    <span className="text-neutral-900" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold }}>
                      {message.speakerLabel}
                    </span>
                    <span className="text-neutral-500" style={{ fontSize: typography.fontSize.xs }}>{message.timestamp}</span>
                    <span className="rounded flex items-center" style={{
                      padding: `2px ${spacing[2]}`,
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.medium,
                      gap: spacing[1],
                      backgroundColor: getSentimentBgColor(message.sentiment),
                      color: getSentimentColor(message.sentiment)
                    }}>
                      {getSentimentIcon(message.sentiment)}
                      {message.sentimentScore.toFixed(2)}
                    </span>
                    {message.keyMoment && (
                      <span className="rounded" style={{
                        fontSize: typography.fontSize.xs,
                        backgroundColor: colors.status.warningBg,
                        color: colors.status.warning,
                        padding: `2px ${spacing[2]}`,
                        fontWeight: typography.fontWeight.medium
                      }}>
                        Key Moment
                      </span>
                    )}
                    {message.frictionDetected && (
                      <span className="rounded" style={{
                        fontSize: typography.fontSize.xs,
                        backgroundColor: colors.status.warningBg,
                        color: colors.status.warning,
                        padding: `2px ${spacing[2]}`,
                        fontWeight: typography.fontWeight.medium
                      }}>
                        Friction
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-900 border rounded" style={{
                    fontSize: typography.fontSize.sm,
                    padding: spacing[3],
                    backgroundColor: getSentimentBgColor(message.sentiment),
                    borderColor: colors.neutral[200]
                  }}>
                    {message.message}
                  </p>
                  {message.detectedTopics.length > 0 && (
                    <div className="flex flex-wrap" style={{ gap: spacing[1], marginTop: spacing[2] }}>
                      {message.detectedTopics.map((topicId) => {
                        const topic = pharmaTopics.find(t => t.id === topicId);
                        return topic ? (
                          <span
                            key={topicId}
                            className="rounded"
                            style={{
                              fontSize: typography.fontSize.xs,
                              padding: `2px ${spacing[2]}`,
                              backgroundColor: colors.neutral[100],
                              color: colors.neutral[600]
                            }}
                          >
                            {topic.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI-Generated Summary */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h3 className="text-neutral-900 flex items-center" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[3], gap: spacing[2] }}>
          <MessageCircle style={{ width: '20px', height: '20px', color: colors.neutral[600] }} />
          AI-Generated Summary
        </h3>
        <p className="text-neutral-700" style={{ fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.relaxed }}>
          {conversation.overallSentiment === 'positive' && conversation.outcomeAchieved ? (
            `This was a successful ${conversation.callDriver.toLowerCase()} conversation with ${conversation.patientName}.
            The interaction maintained a positive sentiment throughout (score: ${conversation.sentimentScore.toFixed(2)})
            and achieved the desired outcome. ${conversation.frictionPoints.length > 0 ?
            `${conversation.frictionPoints.length} friction point(s) were identified and successfully resolved. ` : ''}
            Quality score of ${conversation.qualityScore}/100 indicates excellent execution.`
          ) : conversation.riskLevel === 'high' || conversation.riskLevel === 'critical' ? (
            `This ${conversation.callDriver.toLowerCase()} conversation with ${conversation.patientName} requires attention.
            ${conversation.abandonmentSignals.length > 0 ?
            `Multiple therapy abandonment signals were detected: ${conversation.abandonmentSignals.join(', ')}. ` : ''}
            ${conversation.frictionPoints.length > 0 ?
            `${conversation.frictionPoints.length} friction point(s) were identified. ` : ''}
            Sentiment was ${conversation.overallSentiment} (${conversation.sentimentScore.toFixed(2)})
            with a churn risk of ${conversation.churnRisk}%. ${conversation.escalated ? 'The issue was escalated for further attention.' : 'Follow-up is recommended.'}`
          ) : (
            `Standard ${conversation.callDriver.toLowerCase()} conversation with ${conversation.patientName}.
            Overall sentiment was ${conversation.overallSentiment} (${conversation.sentimentScore.toFixed(2)}).
            ${conversation.frictionPoints.length > 0 ?
            `${conversation.frictionPoints.length} friction point(s) were addressed. ` : ''}
            The interaction ${conversation.outcomeAchieved ? 'achieved' : 'did not fully achieve'} its intended outcome.`
          )}
        </p>
        <div className="border-t border-neutral-200" style={{ marginTop: spacing[4], paddingTop: spacing[4] }}>
          <p className="text-neutral-900" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, marginBottom: spacing[2] }}>Next Actions:</p>
          <ul className="text-neutral-700" style={{ fontSize: typography.fontSize.sm, display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
            {conversation.escalated && <li>• Follow up on escalated issue with {conversation.escalationReason}</li>}
            {conversation.riskLevel === 'high' && <li>• Schedule proactive outreach within 24-48 hours</li>}
            {conversation.abandonmentSignals.length > 0 && <li>• Address barriers to therapy continuation</li>}
            {!conversation.outcomeAchieved && <li>• Schedule callback to complete unresolved items</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
