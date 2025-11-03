'use client';

import { useState, useMemo } from 'react';
import { ArrowLeft, Search, Filter, Download, Calendar, Tag, Eye, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { analyzedConversations } from '@/data/conversationIntelligence';
import { pharmaTopics } from '@/data/pharmaTopics';
import ConversationDetail from './ConversationDetail';
import type { ConversationAnalytics } from '@/types/conversationIntelligence';
import { colors, spacing, typography, components } from '@/lib/design-system';

interface ConversationInsightsProfessionalProps {
  onBack: () => void;
}

export default function ConversationInsightsProfessional({ onBack }: ConversationInsightsProfessionalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [selectedConversation, setSelectedConversation] = useState<ConversationAnalytics | null>(null);
  const [dateRange, setDateRange] = useState('7d');

  // Filter and search conversations
  const filteredConversations = useMemo(() => {
    return analyzedConversations.filter(conv => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesPatient = conv.patientName.toLowerCase().includes(query);
        const matchesDriver = conv.callDriver.toLowerCase().includes(query);
        const matchesTranscript = conv.transcript.some(t =>
          t.message.toLowerCase().includes(query)
        );
        if (!matchesPatient && !matchesDriver && !matchesTranscript) {
          return false;
        }
      }

      // Topic filter
      if (selectedTopic !== 'all') {
        if (!conv.topicsDetected.includes(selectedTopic)) {
          return false;
        }
      }

      // Sentiment filter
      if (selectedSentiment !== 'all') {
        const avgSentiment = conv.transcript.reduce((sum, t) =>
          sum + (t.sentiment === 'positive' ? 1 : t.sentiment === 'negative' ? -1 : 0), 0
        ) / conv.transcript.length;

        const sentimentCategory = avgSentiment > 0.3 ? 'positive'
          : avgSentiment < -0.3 ? 'negative'
          : 'neutral';

        if (sentimentCategory !== selectedSentiment) {
          return false;
        }
      }

      // Risk filter
      if (selectedRisk !== 'all') {
        if (conv.riskLevel !== selectedRisk) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedTopic, selectedSentiment, selectedRisk]);

  // Calculate key metrics from filtered data
  const metrics = useMemo(() => {
    const total = filteredConversations.length;
    const resolved = filteredConversations.filter(c => c.outcomeAchieved).length;
    const highRisk = filteredConversations.filter(c =>
      c.riskLevel === 'high' || c.riskLevel === 'critical'
    ).length;
    const avgSentiment = filteredConversations.reduce((sum, conv) => {
      const convSentiment = conv.transcript.reduce((s, t) =>
        s + (t.sentiment === 'positive' ? 1 : t.sentiment === 'negative' ? -1 : 0), 0
      ) / conv.transcript.length;
      return sum + convSentiment;
    }, 0) / total || 0;

    const positivePercent = Math.round((avgSentiment + 1) * 50); // Convert -1 to 1 scale to 0-100%

    return {
      total,
      resolved,
      resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0,
      highRisk,
      avgSentiment: positivePercent,
    };
  }, [filteredConversations]);

  // Get unique topics for filter
  const allTopics = Array.from(new Set(analyzedConversations.flatMap(c => c.topicsDetected)));

  // Show conversation detail view
  if (selectedConversation) {
    return (
      <ConversationDetail
        conversation={selectedConversation}
        onBack={() => setSelectedConversation(null)}
      />
    );
  }

  return (
    <div style={{ padding: spacing[6], backgroundColor: colors.background.page, display: 'flex', flexDirection: 'column', gap: spacing[6] }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center" style={{ gap: spacing[3] }}>
          <button
            onClick={onBack}
            className="hover:bg-neutral-100 rounded transition-colors"
            style={{ padding: spacing[2] }}
          >
            <ArrowLeft style={{ width: '20px', height: '20px', color: colors.neutral[600] }} />
          </button>
          <div>
            <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.semibold }}>Conversation Intelligence</h2>
            <p className="text-neutral-500" style={{ fontSize: typography.fontSize.sm, marginTop: spacing[1] }}>
              {filteredConversations.length} conversation{filteredConversations.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
        <div className="flex items-center" style={{ gap: spacing[2] }}>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-neutral-300 rounded text-neutral-700 focus:outline-none focus:ring-2"
            style={{
              padding: `${spacing[2]} ${spacing[3]}`,
              fontSize: typography.fontSize.sm,
              backgroundColor: colors.background.card
            }}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>
          <button
            className="flex items-center border border-neutral-300 text-neutral-700 rounded hover:bg-neutral-50 transition-colors"
            style={{ gap: spacing[2], padding: `${spacing[2]} ${spacing[4]}`, fontSize: typography.fontSize.sm }}
          >
            <Download style={{ width: '16px', height: '16px' }} />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4" style={{ gap: spacing[4] }}>
        <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
          <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>Total Conversations</div>
          <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>{metrics.total}</div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
          <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>Resolution Rate</div>
          <div className="flex items-baseline" style={{ gap: spacing[2] }}>
            <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>{metrics.resolutionRate}%</div>
            {metrics.resolutionRate >= 70 && (
              <span className="flex items-center" style={{ fontSize: typography.fontSize.xs, color: colors.status.success, gap: '2px' }}>
                <CheckCircle2 style={{ width: '12px', height: '12px' }} /> Good
              </span>
            )}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
          <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>Avg Sentiment</div>
          <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>{metrics.avgSentiment}%</div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
          <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>High Risk</div>
          <div className="flex items-baseline" style={{ gap: spacing[2] }}>
            <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>{metrics.highRisk}</div>
            {metrics.highRisk > 0 && (
              <span className="flex items-center" style={{ fontSize: typography.fontSize.xs, color: colors.status.error, gap: '2px' }}>
                <AlertCircle style={{ width: '12px', height: '12px' }} /> Needs attention
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
        <div className="flex items-center" style={{ gap: spacing[3] }}>
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute" style={{ left: spacing[3], top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: colors.neutral[400] }} />
            <input
              type="text"
              placeholder="Search conversations, keywords, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-neutral-300 rounded text-neutral-700 focus:outline-none focus:ring-2"
              style={{
                paddingLeft: spacing[10],
                paddingRight: spacing[4],
                paddingTop: spacing[2],
                paddingBottom: spacing[2],
                fontSize: typography.fontSize.sm
              }}
            />
          </div>

          {/* Topic Filter */}
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="border border-neutral-300 rounded text-neutral-700 focus:outline-none focus:ring-2"
            style={{
              padding: `${spacing[2]} ${spacing[3]}`,
              fontSize: typography.fontSize.sm
            }}
          >
            <option value="all">All Topics</option>
            {allTopics.map(topicId => {
              const topic = pharmaTopics.find(t => t.id === topicId);
              return topic ? (
                <option key={topicId} value={topicId}>{topic.name}</option>
              ) : null;
            })}
          </select>

          {/* Sentiment Filter */}
          <select
            value={selectedSentiment}
            onChange={(e) => setSelectedSentiment(e.target.value)}
            className="border border-neutral-300 rounded text-neutral-700 focus:outline-none focus:ring-2"
            style={{
              padding: `${spacing[2]} ${spacing[3]}`,
              fontSize: typography.fontSize.sm
            }}
          >
            <option value="all">All Sentiment</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>

          {/* Risk Filter */}
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="border border-neutral-300 rounded text-neutral-700 focus:outline-none focus:ring-2"
            style={{
              padding: `${spacing[2]} ${spacing[3]}`,
              fontSize: typography.fontSize.sm
            }}
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Conversations Table */}
      <div className="bg-white border border-neutral-200 rounded-md overflow-hidden">
        <table className="w-full">
          <thead className="border-b" style={{ backgroundColor: colors.neutral[50], borderColor: colors.neutral[200] }}>
            <tr>
              <th className="text-left text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Patient / Call Driver
              </th>
              <th className="text-left text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Topics
              </th>
              <th className="text-left text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Sentiment
              </th>
              <th className="text-left text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Outcome
              </th>
              <th className="text-left text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Risk Level
              </th>
              <th className="text-left text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Date
              </th>
              <th className="text-right text-neutral-600" style={{ padding: `${spacing[3]} ${spacing[4]}`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredConversations.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-neutral-500" style={{ padding: `${spacing[8]} ${spacing[4]}`, fontSize: typography.fontSize.sm }}>
                  No conversations found matching your filters
                </td>
              </tr>
            ) : (
              filteredConversations.map((conv) => {
                // Calculate average sentiment
                const avgSentiment = conv.transcript.reduce((sum, t) =>
                  sum + (t.sentiment === 'positive' ? 1 : t.sentiment === 'negative' ? -1 : 0), 0
                ) / conv.transcript.length;

                const sentimentCategory = avgSentiment > 0.3 ? 'positive'
                  : avgSentiment < -0.3 ? 'negative'
                  : 'neutral';

                const sentimentColor = sentimentCategory === 'positive' ? 'text-green-600'
                  : sentimentCategory === 'negative' ? 'text-red-600'
                  : 'text-gray-600';

                const riskColor = conv.riskLevel === 'critical' || conv.riskLevel === 'high' ? 'text-red-600 bg-red-50'
                  : conv.riskLevel === 'medium' ? 'text-yellow-600 bg-yellow-50'
                  : 'text-gray-600 bg-gray-50';

                return (
                  <tr
                    key={conv.id}
                    className="cursor-pointer transition-colors border-b"
                    style={{ borderColor: colors.neutral[100] }}
                    onClick={() => setSelectedConversation(conv)}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.neutral[50]}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: `${spacing[3]} ${spacing[4]}` }}>
                      <div className="text-neutral-900" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>{conv.patientName}</div>
                      <div className="text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>{conv.callDriver}</div>
                    </td>
                    <td style={{ padding: `${spacing[3]} ${spacing[4]}` }}>
                      <div className="flex flex-wrap" style={{ gap: spacing[1] }}>
                        {conv.topicsDetected.slice(0, 2).map(topicId => {
                          const topic = pharmaTopics.find(t => t.id === topicId);
                          return topic ? (
                            <span
                              key={topicId}
                              className="inline-flex items-center rounded"
                              style={{
                                padding: `2px ${spacing[2]}`,
                                fontSize: typography.fontSize.xs,
                                fontWeight: typography.fontWeight.medium,
                                backgroundColor: colors.neutral[100],
                                color: colors.neutral[700]
                              }}
                            >
                              {topic.name}
                            </span>
                          ) : null;
                        })}
                        {conv.topicsDetected.length > 2 && (
                          <span className="text-neutral-500" style={{ fontSize: typography.fontSize.xs }}>
                            +{conv.topicsDetected.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: `${spacing[3]} ${spacing[4]}` }}>
                      <span className="capitalize" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: sentimentCategory === 'positive' ? colors.status.success : sentimentCategory === 'negative' ? colors.status.error : colors.neutral[600] }}>
                        {sentimentCategory}
                      </span>
                    </td>
                    <td style={{ padding: `${spacing[3]} ${spacing[4]}` }}>
                      {conv.outcomeAchieved ? (
                        <span className="inline-flex items-center" style={{ gap: spacing[1], fontSize: typography.fontSize.sm, color: colors.status.success }}>
                          <CheckCircle2 style={{ width: '14px', height: '14px' }} />
                          Resolved
                        </span>
                      ) : (
                        <span className="inline-flex items-center" style={{ gap: spacing[1], fontSize: typography.fontSize.sm, color: colors.status.warning }}>
                          <Clock style={{ width: '14px', height: '14px' }} />
                          In Progress
                        </span>
                      )}
                    </td>
                    <td style={{ padding: `${spacing[3]} ${spacing[4]}` }}>
                      <span className="inline-flex rounded capitalize" style={{
                        padding: `${spacing[1]} ${spacing[2]}`,
                        fontSize: typography.fontSize.xs,
                        fontWeight: typography.fontWeight.medium,
                        color: conv.riskLevel === 'critical' || conv.riskLevel === 'high' ? colors.status.error : conv.riskLevel === 'medium' ? colors.status.warning : colors.neutral[600],
                        backgroundColor: conv.riskLevel === 'critical' || conv.riskLevel === 'high' ? colors.status.errorBg : conv.riskLevel === 'medium' ? colors.status.warningBg : colors.neutral[50]
                      }}>
                        {conv.riskLevel}
                      </span>
                    </td>
                    <td style={{ padding: `${spacing[3]} ${spacing[4]}` }}>
                      <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                        {new Date(conv.callDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="text-right" style={{ padding: `${spacing[3]} ${spacing[4]}` }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedConversation(conv);
                        }}
                        className="inline-flex items-center rounded transition-colors hover:bg-neutral-100"
                        style={{ gap: spacing[1], padding: `${spacing[1]} ${spacing[3]}`, fontSize: typography.fontSize.sm, color: colors.neutral[700] }}
                      >
                        <Eye style={{ width: '14px', height: '14px' }} />
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Results count */}
      <div className="text-center text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>
        Showing {filteredConversations.length} of {analyzedConversations.length} conversations
      </div>
    </div>
  );
}
