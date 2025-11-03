'use client';

import { useState } from 'react';
import { ArrowLeft, Search, Tag, Bookmark, TrendingUp, TrendingDown, Eye, Filter } from 'lucide-react';
import { analyzedConversations } from '@/data/conversationIntelligence';
import { pharmaTopics } from '@/data/pharmaTopics';
import ConversationDetail from './ConversationDetail';
import type { ConversationAnalytics } from '@/types/conversationIntelligence';

interface ConversationInsightsProps {
  onBack: () => void;
}

interface ConversationExcerpt {
  id: string;
  patient: string;
  date: string;
  theme: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentChange: string;
  outcome: string;
  patientQuote: string;
  barrierType: string;
  timestamp: string;
  agentResponse: string;
  agentTimestamp: string;
  scriptFollowed: boolean;
  actionTaken: string;
  resolution: string;
  conversation: ConversationAnalytics;
}

export default function ConversationInsights({ onBack }: ConversationInsightsProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');
  const [selectedOutcome, setSelectedOutcome] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<ConversationAnalytics | null>(null);

  if (selectedConversation) {
    return (
      <ConversationDetail
        conversation={selectedConversation}
        onBack={() => setSelectedConversation(null)}
      />
    );
  }

  // Generate insights from conversation data
  const generatePatterns = () => {
    const patterns = {
      rising: [] as { topic: string; count: number; change: number }[],
      improving: [] as { topic: string; count: number; change: number }[],
      newPatterns: [] as string[],
    };

    // Count topic mentions
    const topicCounts: Record<string, number> = {};
    analyzedConversations.forEach(conv => {
      conv.topicsDetected.forEach(topicId => {
        topicCounts[topicId] = (topicCounts[topicId] || 0) + 1;
      });
    });

    // Rising concerns
    if (topicCounts['topic-copay'] > 0) {
      patterns.rising.push({
        topic: 'Affordability barriers',
        count: topicCounts['topic-copay'],
        change: 25
      });
    }
    if (topicCounts['topic-side-effects'] > 0) {
      patterns.rising.push({
        topic: 'Side effect questions',
        count: topicCounts['topic-side-effects'],
        change: 18
      });
    }

    // Improving areas
    patterns.improving.push({
      topic: 'Insurance confusion',
      count: 18,
      change: -12
    });

    // New patterns
    patterns.newPatterns.push('Patients asking about generic alternatives');
    patterns.newPatterns.push('Increased questions on travel with medication');

    return patterns;
  };

  const patterns = generatePatterns();

  // Calculate sentiment flow
  const sentimentFlow = {
    startPositive: Math.round((analyzedConversations.filter(c =>
      c.transcript[0]?.sentiment === 'positive'
    ).length / analyzedConversations.length) * 100),
    startNeutral: Math.round((analyzedConversations.filter(c =>
      c.transcript[0]?.sentiment === 'neutral'
    ).length / analyzedConversations.length) * 100),
    startNegative: Math.round((analyzedConversations.filter(c =>
      c.transcript[0]?.sentiment === 'negative'
    ).length / analyzedConversations.length) * 100),
    endPositive: Math.round((analyzedConversations.filter(c =>
      c.overallSentiment === 'positive'
    ).length / analyzedConversations.length) * 100),
    endNeutral: Math.round((analyzedConversations.filter(c =>
      c.overallSentiment === 'neutral'
    ).length / analyzedConversations.length) * 100),
    endNegative: Math.round((analyzedConversations.filter(c =>
      c.overallSentiment === 'negative'
    ).length / analyzedConversations.length) * 100),
  };

  const improvedConversations = analyzedConversations.filter(c => c.sentimentShift > 0);
  const improvedAfterCopay = improvedConversations.filter(c =>
    c.topicsDetected.includes('topic-copay') || c.topicsDetected.includes('topic-financial-assistance')
  );
  const improvementRate = improvedAfterCopay.length > 0
    ? Math.round((improvedAfterCopay.length / improvedConversations.length) * 100)
    : 0;

  // Theme categories
  const themes = [
    { id: 'financial', label: 'Financial Access', count: analyzedConversations.filter(c =>
      c.topicsDetected.includes('topic-copay') || c.topicsDetected.includes('topic-financial-assistance')
    ).length },
    { id: 'clinical', label: 'Clinical Support', count: analyzedConversations.filter(c =>
      c.topicsDetected.includes('topic-side-effects') || c.topicsDetected.includes('topic-clinical-questions')
    ).length },
    { id: 'adherence', label: 'Adherence Barriers', count: analyzedConversations.filter(c =>
      c.topicsDetected.includes('topic-adherence')
    ).length },
    { id: 'program', label: 'Program Navigation', count: analyzedConversations.filter(c =>
      c.topicsDetected.includes('topic-enrollment')
    ).length },
  ];

  // Generate conversation excerpts
  const generateExcerpts = (): ConversationExcerpt[] => {
    const excerpts: ConversationExcerpt[] = [];

    analyzedConversations.forEach(conv => {
      // Find key moments with patient concerns
      conv.transcript.forEach((msg, idx) => {
        if (msg.speaker === 'patient' && msg.frictionDetected && idx < conv.transcript.length - 1) {
          const agentResponse = conv.transcript[idx + 1];

          let theme = 'Program Navigation';
          if (msg.detectedTopics.includes('topic-copay')) theme = 'Financial Access';
          if (msg.detectedTopics.includes('topic-side-effects')) theme = 'Clinical Support';
          if (msg.detectedTopics.includes('topic-adherence')) theme = 'Adherence Barriers';

          const sentimentChange = conv.sentimentShift > 0 ? '😟→😊' :
                                 conv.sentimentShift < 0 ? '😊→😟' : '😐→😐';

          excerpts.push({
            id: `${conv.id}-${idx}`,
            patient: conv.patientName,
            date: conv.callDate,
            theme,
            sentiment: msg.sentiment,
            sentimentChange,
            outcome: conv.outcomeAchieved ? 'Resolved' : conv.escalated ? 'Escalated' : 'Unresolved',
            patientQuote: msg.message,
            barrierType: conv.frictionPoints[0]?.barrierType || 'process',
            timestamp: msg.timestamp,
            agentResponse: agentResponse?.message || '',
            agentTimestamp: agentResponse?.timestamp || '',
            scriptFollowed: conv.complianceScore >= 95,
            actionTaken: conv.escalated ? 'Escalated to clinical team' :
                        conv.outcomeAchieved ? 'Resolved in conversation' : 'Pending follow-up',
            resolution: conv.outcomeAchieved ? `Patient ${conv.resolutionStatus}` : 'In progress',
            conversation: conv,
          });
        }
      });
    });

    return excerpts;
  };

  const allExcerpts = generateExcerpts();

  // Filter excerpts
  const filteredExcerpts = allExcerpts.filter(excerpt => {
    const matchesTheme = selectedTheme === 'all' || excerpt.theme === selectedTheme;
    const matchesSentiment = selectedSentiment === 'all' || excerpt.sentiment === selectedSentiment;
    const matchesOutcome = selectedOutcome === 'all' || excerpt.outcome === selectedOutcome;
    const matchesSearch = searchQuery === '' ||
      excerpt.patientQuote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.agentResponse.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTheme && matchesSentiment && matchesOutcome && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Pattern Recognition Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          💡 Pattern Recognition & Insights
        </h3>

        <div className="space-y-4">
          {/* What We're Seeing */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">🔍 What We're Seeing in Conversations</h4>

            {patterns.rising.length > 0 && (
              <div className="mb-3">
                <div className="text-sm font-medium text-gray-700 mb-2">Rising Concerns (↑ This Week):</div>
                <ul className="space-y-1">
                  {patterns.rising.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-800 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-red-500" />
                      • {item.topic}: {item.count} mentions (+{item.change}%)
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {patterns.improving.length > 0 && (
              <div className="mb-3">
                <div className="text-sm font-medium text-gray-700 mb-2">Improving Areas (↓ This Week):</div>
                <ul className="space-y-1">
                  {patterns.improving.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-800 flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-green-500" />
                      • {item.topic}: {item.count} mentions ({item.change}%)
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {patterns.newPatterns.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">New Patterns Detected:</div>
                <ul className="space-y-1">
                  {patterns.newPatterns.map((pattern, idx) => (
                    <li key={idx} className="text-sm text-gray-800">
                      • {pattern}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sentiment Patterns */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">📊 Sentiment Patterns</h4>

            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Conversations Starting Negative → Ending Positive:
                </div>
                <div className="text-sm text-gray-800">
                  {improvementRate}% improved after copay assistance offer
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">Sentiment Flow:</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-700 mb-1">Start:</div>
                    <div className="space-y-1">
                      <div>😟 {sentimentFlow.startNegative}%</div>
                      <div>😐 {sentimentFlow.startNeutral}%</div>
                      <div>😊 {sentimentFlow.startPositive}%</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 mb-1">End:</div>
                    <div className="space-y-1">
                      <div>😟 {sentimentFlow.endNegative}%</div>
                      <div>😐 {sentimentFlow.endNeutral}%</div>
                      <div>😊 {sentimentFlow.endPositive}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Conversation Themes */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">🎯 Top Conversation Themes</h4>
            <div className="space-y-2">
              {themes.map(theme => (
                <div key={theme.id} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{theme.label}</span>
                  <span className="text-sm text-gray-600">
                    {theme.count} call{theme.count !== 1 ? 's' : ''} ({Math.round((theme.count / analyzedConversations.length) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conversation Excerpts Explorer */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🔎 Conversation Excerpts Explorer</h3>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Themes</option>
              {themes.map(theme => (
                <option key={theme.id} value={theme.label}>{theme.label}</option>
              ))}
            </select>

            <select
              value={selectedSentiment}
              onChange={(e) => setSelectedSentiment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>

            <select
              value={selectedOutcome}
              onChange={(e) => setSelectedOutcome(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Outcomes</option>
              <option value="Resolved">Resolved</option>
              <option value="Escalated">Escalated</option>
              <option value="Unresolved">Unresolved</option>
            </select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search excerpts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
            <Filter className="h-4 w-4" />
            <span>Showing {filteredExcerpts.length} of {allExcerpts.length} excerpts</span>
          </div>
        </div>

        {/* Excerpt Cards */}
        <div className="p-6 space-y-4">
          {filteredExcerpts.map((excerpt) => (
            <div key={excerpt.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {excerpt.theme === 'Financial Access' && <span className="text-2xl">💰</span>}
                    {excerpt.theme === 'Clinical Support' && <span className="text-2xl">💊</span>}
                    {excerpt.theme === 'Adherence Barriers' && <span className="text-2xl">📅</span>}
                    {excerpt.theme === 'Program Navigation' && <span className="text-2xl">🧭</span>}
                    <div>
                      <div className="font-semibold text-gray-900">{excerpt.theme}</div>
                      <div className="text-xs text-gray-500">
                        {excerpt.patient} | {new Date(excerpt.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{excerpt.sentimentChange}</span>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    excerpt.outcome === 'Resolved' ? 'bg-green-100 text-green-700' :
                    excerpt.outcome === 'Escalated' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {excerpt.outcome}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {/* Patient Quote */}
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-xs font-semibold text-red-900">PATIENT</span>
                    <span className="text-xs text-red-600">⏱️ {excerpt.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-900 italic">"{excerpt.patientQuote}"</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      excerpt.barrierType === 'affordability' ? 'bg-red-100 text-red-700' :
                      excerpt.barrierType === 'clinical' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      🔴 Barrier: {excerpt.barrierType}
                    </span>
                  </div>
                </div>

                {/* Agent Response */}
                {excerpt.agentResponse && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-xs font-semibold text-blue-900">AGENT RESPONSE</span>
                      <span className="text-xs text-blue-600">⏱️ {excerpt.agentTimestamp}</span>
                    </div>
                    <p className="text-sm text-gray-900">"{excerpt.agentResponse}"</p>
                    <div className="flex items-center gap-2 mt-2">
                      {excerpt.scriptFollowed && (
                        <span className="text-xs px-2 py-0.5 rounded font-medium bg-green-100 text-green-700">
                          ✅ Script: Followed
                        </span>
                      )}
                      <span className="text-xs px-2 py-0.5 rounded font-medium bg-purple-100 text-purple-700">
                        {excerpt.actionTaken}
                      </span>
                    </div>
                  </div>
                )}

                {/* Outcome */}
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                  <div className="text-xs font-medium text-gray-700">Outcome: {excerpt.resolution}</div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedConversation(excerpt.conversation)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    View Full Transcript
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-700 font-medium">
                    <Tag className="h-4 w-4" />
                    Tag
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-700 font-medium">
                    <Bookmark className="h-4 w-4" />
                    Save Snippet
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredExcerpts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No excerpts found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
