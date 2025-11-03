'use client';

import { useState } from 'react';
import { ArrowLeft, Search, Filter, Eye, ThumbsUp, ThumbsDown, Minus, AlertTriangle, Clock, MessageSquare } from 'lucide-react';
import { analyzedConversations } from '@/data/conversationIntelligence';
import { pharmaTopics } from '@/data/pharmaTopics';
import ConversationDetail from './ConversationDetail';
import type { ConversationAnalytics, SentimentType, ConversationType } from '@/types/conversationIntelligence';

interface ConversationExplorerProps {
  onBack: () => void;
}

export default function ConversationExplorer({ onBack }: ConversationExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentType | 'all'>('all');
  const [selectedType, setSelectedType] = useState<ConversationType | 'all'>('all');
  const [selectedConversation, setSelectedConversation] = useState<ConversationAnalytics | null>(null);

  if (selectedConversation) {
    return (
      <ConversationDetail
        conversation={selectedConversation}
        onBack={() => setSelectedConversation(null)}
      />
    );
  }

  const filteredConversations = analyzedConversations.filter((conv) => {
    const matchesSearch = searchQuery === '' ||
      conv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.callDriver.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSentiment = selectedSentiment === 'all' || conv.overallSentiment === selectedSentiment;
    const matchesType = selectedType === 'all' || conv.conversationType === selectedType;

    return matchesSearch && matchesSentiment && matchesType;
  });

  const getSentimentIcon = (sentiment: SentimentType) => {
    if (sentiment === 'positive') return <ThumbsUp className="h-4 w-4 text-green-600" />;
    if (sentiment === 'negative') return <ThumbsDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getSentimentColor = (sentiment: SentimentType) => {
    if (sentiment === 'positive') return 'bg-green-100 text-green-700';
    if (sentiment === 'negative') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'critical' || risk === 'high') return 'bg-red-100 text-red-700';
    if (risk === 'medium') return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Conversation Explorer</h2>
          <p className="text-sm text-gray-600 mt-1">
            Search, filter, and analyze individual conversations
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient or call driver..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sentiment Filter */}
          <select
            value={selectedSentiment}
            onChange={(e) => setSelectedSentiment(e.target.value as SentimentType | 'all')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as ConversationType | 'all')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="inbound">Inbound</option>
            <option value="outbound-enrollment">Outbound Enrollment</option>
            <option value="adherence-checkin">Adherence Check-in</option>
            <option value="refill-reminder">Refill Reminder</option>
            <option value="side-effect-monitoring">Side Effect Monitoring</option>
          </select>
        </div>

        <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
          <Filter className="h-4 w-4" />
          <span>Showing {filteredConversations.length} of {analyzedConversations.length} conversations</span>
        </div>
      </div>

      {/* Conversations Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient & Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sentiment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Topics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredConversations.map((conv) => (
                <tr key={conv.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{conv.patientName}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(conv.callDate).toLocaleDateString()} at {conv.callTime}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{conv.callDriver}</div>
                    <div className="text-xs text-gray-500 capitalize">
                      {conv.conversationType.replace(/-/g, ' ')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 ${getSentimentColor(conv.overallSentiment)}`}>
                        {getSentimentIcon(conv.overallSentiment)}
                        {conv.overallSentiment}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Score: {conv.sentimentScore.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {conv.topicsDetected.slice(0, 3).map((topicId) => {
                        const topic = pharmaTopics.find(t => t.id === topicId);
                        return topic ? (
                          <span
                            key={topicId}
                            className="text-xs px-2 py-0.5 rounded"
                            style={{ backgroundColor: topic.color + '20', color: topic.color }}
                          >
                            {topic.name}
                          </span>
                        ) : null;
                      })}
                      {conv.topicsDetected.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{conv.topicsDetected.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      <Clock className="h-3 w-3 text-gray-400" />
                      {formatDuration(conv.duration)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded uppercase ${getRiskColor(conv.riskLevel)}`}>
                      {conv.riskLevel}
                    </span>
                    {conv.frictionPoints.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                        <AlertTriangle className="h-3 w-3" />
                        {conv.frictionPoints.length} friction
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedConversation(conv)}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredConversations.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200 text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No conversations found</h3>
          <p className="text-sm text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
