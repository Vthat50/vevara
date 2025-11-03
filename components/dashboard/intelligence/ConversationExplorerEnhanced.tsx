'use client';

import { useState, useMemo } from 'react';
import { ArrowLeft, Search, Filter, Eye, ThumbsUp, ThumbsDown, Minus, AlertTriangle, Clock, MessageSquare, Bookmark, Star, SlidersHorizontal, X, Save, Plus, Tag } from 'lucide-react';
import { analyzedConversations } from '@/data/conversationIntelligence';
import { pharmaTopics } from '@/data/pharmaTopics';
import ConversationDetail from './ConversationDetail';
import type { ConversationAnalytics, SentimentType, ConversationType } from '@/types/conversationIntelligence';

interface ConversationExplorerProps {
  onBack: () => void;
}

interface SavedSearch {
  id: string;
  name: string;
  filters: SearchFilters;
}

interface SearchFilters {
  searchQuery: string;
  sentiment: SentimentType | 'all';
  type: ConversationType | 'all';
  riskLevel: string;
  topic: string;
  dateRange: string;
  qualityScore: string;
  hasFriction: string;
  escalated: string;
  outcomeAchieved: string;
}

export default function ConversationExplorerEnhanced({ onBack }: ConversationExplorerProps) {
  const [selectedConversation, setSelectedConversation] = useState<ConversationAnalytics | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showSaveSearch, setShowSaveSearch] = useState(false);
  const [savedSearchName, setSavedSearchName] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'risk' | 'sentiment' | 'quality'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: '',
    sentiment: 'all',
    type: 'all',
    riskLevel: 'all',
    topic: 'all',
    dateRange: 'all',
    qualityScore: 'all',
    hasFriction: 'all',
    escalated: 'all',
    outcomeAchieved: 'all',
  });

  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    {
      id: 'preset-1',
      name: '⚠️ High Risk Patients',
      filters: { ...filters, riskLevel: 'high' },
    },
    {
      id: 'preset-2',
      name: '🚨 Unresolved Friction',
      filters: { ...filters, hasFriction: 'yes', outcomeAchieved: 'no' },
    },
    {
      id: 'preset-3',
      name: '💊 Side Effects',
      filters: { ...filters, topic: 'topic-side-effects' },
    },
    {
      id: 'preset-4',
      name: '💰 Cost Concerns',
      filters: { ...filters, topic: 'topic-copay' },
    },
  ]);

  if (selectedConversation) {
    return (
      <ConversationDetail
        conversation={selectedConversation}
        onBack={() => setSelectedConversation(null)}
      />
    );
  }

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: SavedSearch) => {
    setFilters(preset.filters);
    setShowAdvancedFilters(true);
  };

  const saveCurrentSearch = () => {
    if (savedSearchName.trim()) {
      const newSearch: SavedSearch = {
        id: `custom-${Date.now()}`,
        name: savedSearchName,
        filters: { ...filters },
      };
      setSavedSearches([...savedSearches, newSearch]);
      setSavedSearchName('');
      setShowSaveSearch(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      sentiment: 'all',
      type: 'all',
      riskLevel: 'all',
      topic: 'all',
      dateRange: 'all',
      qualityScore: 'all',
      hasFriction: 'all',
      escalated: 'all',
      outcomeAchieved: 'all',
    });
  };

  const filteredAndSortedConversations = useMemo(() => {
    let results = analyzedConversations.filter((conv) => {
      // Basic search - includes patient name, call driver, and transcript content
      const matchesSearch = filters.searchQuery === '' ||
        conv.patientName.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        conv.callDriver.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        conv.transcript.some(m => m.message.toLowerCase().includes(filters.searchQuery.toLowerCase()));

      // Sentiment filter
      const matchesSentiment = filters.sentiment === 'all' || conv.overallSentiment === filters.sentiment;

      // Type filter
      const matchesType = filters.type === 'all' || conv.conversationType === filters.type;

      // Risk level filter
      const matchesRisk = filters.riskLevel === 'all' ||
        (filters.riskLevel === 'high' && (conv.riskLevel === 'high' || conv.riskLevel === 'critical')) ||
        (filters.riskLevel === 'medium' && conv.riskLevel === 'medium') ||
        (filters.riskLevel === 'low' && conv.riskLevel === 'low');

      // Topic filter
      const matchesTopic = filters.topic === 'all' || conv.topicsDetected.includes(filters.topic);

      // Date range filter
      const convDate = new Date(conv.callDate);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - convDate.getTime()) / (1000 * 60 * 60 * 24));
      const matchesDate = filters.dateRange === 'all' ||
        (filters.dateRange === '7d' && daysDiff <= 7) ||
        (filters.dateRange === '30d' && daysDiff <= 30) ||
        (filters.dateRange === '90d' && daysDiff <= 90);

      // Quality score filter
      const matchesQuality = filters.qualityScore === 'all' ||
        (filters.qualityScore === 'high' && conv.qualityScore >= 80) ||
        (filters.qualityScore === 'medium' && conv.qualityScore >= 60 && conv.qualityScore < 80) ||
        (filters.qualityScore === 'low' && conv.qualityScore < 60);

      // Friction filter
      const matchesFriction = filters.hasFriction === 'all' ||
        (filters.hasFriction === 'yes' && conv.frictionPoints.length > 0) ||
        (filters.hasFriction === 'no' && conv.frictionPoints.length === 0);

      // Escalated filter
      const matchesEscalated = filters.escalated === 'all' ||
        (filters.escalated === 'yes' && conv.escalated) ||
        (filters.escalated === 'no' && !conv.escalated);

      // Outcome achieved filter
      const matchesOutcome = filters.outcomeAchieved === 'all' ||
        (filters.outcomeAchieved === 'yes' && conv.outcomeAchieved) ||
        (filters.outcomeAchieved === 'no' && !conv.outcomeAchieved);

      return matchesSearch && matchesSentiment && matchesType && matchesRisk &&
             matchesTopic && matchesDate && matchesQuality && matchesFriction &&
             matchesEscalated && matchesOutcome;
    });

    // Sort results
    results.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.callDate).getTime() - new Date(b.callDate).getTime();
          break;
        case 'risk':
          comparison = a.churnRisk - b.churnRisk;
          break;
        case 'sentiment':
          comparison = a.sentimentScore - b.sentimentScore;
          break;
        case 'quality':
          comparison = a.qualityScore - b.qualityScore;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return results;
  }, [filters, sortBy, sortOrder]);

  const activeFilterCount = Object.entries(filters).filter(([key, value]) =>
    key !== 'searchQuery' && value !== 'all'
  ).length;

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
      <div className="flex items-center justify-between">
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
              Advanced search with multi-criteria filtering and saved searches
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowSaveSearch(!showSaveSearch)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Save className="h-4 w-4" />
          Save Search
        </button>
      </div>

      {/* Save Search Dialog */}
      {showSaveSearch && (
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Save Current Search</h3>
            <button onClick={() => setShowSaveSearch(false)}>
              <X className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter search name..."
              value={savedSearchName}
              onChange={(e) => setSavedSearchName(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <button
              onClick={saveCurrentSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Quick Filter Presets */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            Quick Filters
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {savedSearches.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm font-medium transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient, topic, or message content..."
              value={filters.searchQuery}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sentiment Filter */}
          <select
            value={filters.sentiment}
            onChange={(e) => updateFilter('sentiment', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>

          {/* Risk Filter */}
          <select
            value={filters.riskLevel}
            onChange={(e) => updateFilter('riskLevel', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Risk Levels</option>
            <option value="high">High/Critical Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-3">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
          <div className="flex items-center gap-4">
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Clear All
              </button>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              <span>{filteredAndSortedConversations.length} of {analyzedConversations.length} conversations</span>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
            {/* Type Filter */}
            <select
              value={filters.type}
              onChange={(e) => updateFilter('type', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Types</option>
              <option value="inbound">Inbound</option>
              <option value="outbound-enrollment">Outbound Enrollment</option>
              <option value="adherence-checkin">Adherence Check-in</option>
              <option value="refill-reminder">Refill Reminder</option>
            </select>

            {/* Topic Filter */}
            <select
              value={filters.topic}
              onChange={(e) => updateFilter('topic', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Topics</option>
              {pharmaTopics.map(topic => (
                <option key={topic.id} value={topic.id}>{topic.name}</option>
              ))}
            </select>

            {/* Date Range */}
            <select
              value={filters.dateRange}
              onChange={(e) => updateFilter('dateRange', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Time</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>

            {/* Quality Score */}
            <select
              value={filters.qualityScore}
              onChange={(e) => updateFilter('qualityScore', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Quality Scores</option>
              <option value="high">High (80+)</option>
              <option value="medium">Medium (60-79)</option>
              <option value="low">Low (&lt;60)</option>
            </select>

            {/* Has Friction */}
            <select
              value={filters.hasFriction}
              onChange={(e) => updateFilter('hasFriction', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">Friction - All</option>
              <option value="yes">Has Friction</option>
              <option value="no">No Friction</option>
            </select>

            {/* Escalated */}
            <select
              value={filters.escalated}
              onChange={(e) => updateFilter('escalated', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">Escalation - All</option>
              <option value="yes">Escalated</option>
              <option value="no">Not Escalated</option>
            </select>

            {/* Outcome Achieved */}
            <select
              value={filters.outcomeAchieved}
              onChange={(e) => updateFilter('outcomeAchieved', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">Outcome - All</option>
              <option value="yes">Achieved</option>
              <option value="no">Not Achieved</option>
            </select>

            {/* Sort Options */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="risk">Sort by Risk</option>
                <option value="sentiment">Sort by Sentiment</option>
                <option value="quality">Sort by Quality</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        )}
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
              {filteredAndSortedConversations.map((conv) => (
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

      {filteredAndSortedConversations.length === 0 && (
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
