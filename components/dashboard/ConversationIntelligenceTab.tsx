'use client';

import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  MessageSquare,
  ThumbsUp,
  Clock,
  Target,
  AlertTriangle,
  Activity,
  Users,
  PhoneCall,
  BarChart3,
  GitBranch,
  Shield
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { conversationMetrics, topicTrends, spotlights } from '@/data/conversationIntelligence';
import SpotlightsPanel from './intelligence/SpotlightsPanel';
import TopicsPanel from './intelligence/TopicsPanel';
import ConversationExplorer from './intelligence/ConversationExplorerEnhanced';
import RootCauseAnalysis from './intelligence/RootCauseAnalysis';
import PlaybookManager from './intelligence/PlaybookManager';
import SnippetLibrary from './intelligence/SnippetLibrary';
import InsightCards from './intelligence/InsightCards';
import PatternRecognition from './intelligence/PatternRecognition';
import RiskAnalytics from './intelligence/RiskAnalytics';

type ViewMode = 'overview' | 'topics' | 'explorer' | 'root-cause' | 'playbooks' | 'snippets' | 'patterns' | 'risk';

export default function ConversationIntelligenceTab() {
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [dateRange, setDateRange] = useState('7d');

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (value < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const sentimentChartData = [
    { name: 'Positive', value: conversationMetrics.sentimentDistribution.positive, color: '#10B981' },
    { name: 'Neutral', value: conversationMetrics.sentimentDistribution.neutral, color: '#6B7280' },
    { name: 'Negative', value: conversationMetrics.sentimentDistribution.negative, color: '#EF4444' },
  ];

  const callDriversData = conversationMetrics.topCallDrivers.map(driver => ({
    name: driver.driver,
    count: driver.count,
  }));

  if (viewMode === 'topics') {
    return <TopicsPanel onBack={() => setViewMode('overview')} />;
  }

  if (viewMode === 'explorer') {
    return <ConversationExplorer onBack={() => setViewMode('overview')} />;
  }

  if (viewMode === 'root-cause') {
    return <RootCauseAnalysis onBack={() => setViewMode('overview')} />;
  }

  if (viewMode === 'playbooks') {
    return <PlaybookManager onBack={() => setViewMode('overview')} />;
  }

  if (viewMode === 'snippets') {
    return <SnippetLibrary onBack={() => setViewMode('overview')} />;
  }

  if (viewMode === 'patterns') {
    return <PatternRecognition onBack={() => setViewMode('overview')} />;
  }

  if (viewMode === 'risk') {
    return <RiskAnalytics onBack={() => setViewMode('overview')} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Conversation Intelligence</h2>
          <p className="text-sm text-gray-600 mt-1">
            Analyze conversation trends, sentiment, and identify friction points
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Total Conversations</span>
            <MessageSquare className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {conversationMetrics.totalConversations.toLocaleString()}
            </span>
            <span className={`text-sm font-medium flex items-center gap-1 ${getTrendColor(conversationMetrics.conversationChange)}`}>
              {getTrendIcon(conversationMetrics.conversationChange)}
              {Math.abs(conversationMetrics.conversationChange)}%
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Avg Sentiment Score</span>
            <ThumbsUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {Math.round(conversationMetrics.avgSentimentScore * 100)}%
            </span>
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Positive
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Avg Handle Time</span>
            <Clock className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {Math.floor(conversationMetrics.avgHandleTime / 60)}:{String(conversationMetrics.avgHandleTime % 60).padStart(2, '0')}
            </span>
            <span className="text-sm text-gray-500">min</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Resolution Rate</span>
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {conversationMetrics.avgResolutionRate}%
            </span>
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              2%
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">CSAT Score</p>
              <p className="text-2xl font-bold text-gray-900">{conversationMetrics.avgCsatScore}</p>
              <p className="text-xs text-gray-500">out of 5.0</p>
            </div>
            <Activity className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">NPS Score</p>
              <p className="text-2xl font-bold text-gray-900">{conversationMetrics.avgNpsScore}</p>
              <p className="text-xs text-gray-500">out of 10</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Friction Points</p>
              <p className="text-2xl font-bold text-gray-900">{conversationMetrics.totalFrictionPoints}</p>
              <p className="text-xs text-gray-500">detected</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-gray-900">{conversationMetrics.highRiskConversations}</p>
              <p className="text-xs text-gray-500">conversations</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Priority Insights - Authenticx-style insight-driven approach */}
      <InsightCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Volume Trend */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Volume Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={conversationMetrics.callVolumeByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sentimentChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Call Drivers */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Call Drivers</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={callDriversData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => setViewMode('explorer')}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left"
        >
          <MessageSquare className="h-8 w-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">Conversation Explorer</h3>
          <p className="text-sm text-gray-600">
            Search and filter conversations, drill into individual details
          </p>
        </button>

        <button
          onClick={() => setViewMode('risk')}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left"
        >
          <Shield className="h-8 w-8 text-red-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">Predictive Risk Analytics</h3>
          <p className="text-sm text-gray-600">
            AI-powered risk scoring with trend prediction
          </p>
        </button>

        <button
          onClick={() => setViewMode('patterns')}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left"
        >
          <GitBranch className="h-8 w-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">Pattern Recognition</h3>
          <p className="text-sm text-gray-600">
            Auto-detect conversation patterns and success rates
          </p>
        </button>

        <button
          onClick={() => setViewMode('root-cause')}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left"
        >
          <BarChart3 className="h-8 w-8 text-orange-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">Root Cause Analysis</h3>
          <p className="text-sm text-gray-600">
            Identify barriers, friction points, and process breakdowns
          </p>
        </button>

        <button
          onClick={() => setViewMode('playbooks')}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left"
        >
          <PhoneCall className="h-8 w-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">Playbook Manager</h3>
          <p className="text-sm text-gray-600">
            Create custom topics and conversation tracking playbooks
          </p>
        </button>
      </div>
    </div>
  );
}
