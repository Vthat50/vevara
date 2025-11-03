'use client';

import { ArrowLeft, TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle, Clock, Users, MessageSquare } from 'lucide-react';
import { rootCauseAnalysis } from '@/data/conversationIntelligence';
import { pharmaTopics } from '@/data/pharmaTopics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface RootCauseAnalysisProps {
  onBack: () => void;
}

export default function RootCauseAnalysis({ onBack }: RootCauseAnalysisProps) {
  const getTrendIcon = (direction: string) => {
    if (direction === 'up') return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (direction === 'down') return <TrendingDown className="h-4 w-4 text-green-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const barrierColors: Record<string, string> = {
    insurance: '#3B82F6',
    affordability: '#EF4444',
    access: '#F59E0B',
    clinical: '#8B5CF6',
    process: '#06B6D4',
    'support-quality': '#10B981',
  };

  const distributionData = rootCauseAnalysis.map(barrier => ({
    name: barrier.barrierName,
    value: barrier.occurrences,
    color: barrierColors[barrier.barrierType],
  }));

  const resolutionData = rootCauseAnalysis.map(barrier => ({
    name: barrier.barrierName.split(' ')[0],
    resolved: barrier.resolutionRate,
    unresolved: 100 - barrier.resolutionRate,
  }));

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
          <h2 className="text-2xl font-bold text-gray-900">Root Cause Analysis</h2>
          <p className="text-sm text-gray-600 mt-1">
            Identify barriers, friction points, and process breakdowns driving negative outcomes
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Total Barriers</span>
            <AlertCircle className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {rootCauseAnalysis.reduce((sum, b) => sum + b.occurrences, 0)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Across {rootCauseAnalysis.length} categories</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Avg Resolution</span>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(rootCauseAnalysis.reduce((sum, b) => sum + b.resolutionRate, 0) / rootCauseAnalysis.length)}%
          </div>
          <div className="text-xs text-gray-500 mt-1">Success rate</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Avg Time to Resolve</span>
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(rootCauseAnalysis.reduce((sum, b) => sum + b.avgTimeToResolve, 0) / rootCauseAnalysis.length / 60)}m
          </div>
          <div className="text-xs text-gray-500 mt-1">Average duration</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Affected Patients</span>
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {rootCauseAnalysis.reduce((sum, b) => sum + b.affectedPatients, 0)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Unique patients</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Barrier Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Barrier Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Resolution Rates */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resolution Rates by Barrier</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="resolved" stackId="a" fill="#10B981" name="Resolved" />
              <Bar dataKey="unresolved" stackId="a" fill="#EF4444" name="Unresolved" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="space-y-4">
        {rootCauseAnalysis.map((barrier) => (
          <div key={barrier.barrierType} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div
              className="p-6 border-l-4"
              style={{ borderLeftColor: barrierColors[barrier.barrierType] }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{barrier.barrierName}</h3>
                    <span
                      className="text-xs font-medium px-2 py-1 rounded uppercase"
                      style={{ backgroundColor: barrierColors[barrier.barrierType] + '20', color: barrierColors[barrier.barrierType] }}
                    >
                      {barrier.barrierType}
                    </span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(barrier.trendDirection)}
                      <span className={`text-sm font-medium ${
                        barrier.trendDirection === 'up' ? 'text-red-600' :
                        barrier.trendDirection === 'down' ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        Trending {barrier.trendDirection}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{barrier.occurrences}</div>
                  <div className="text-sm text-gray-600">occurrences</div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">% of Total</div>
                  <div className="text-lg font-bold text-gray-900">{barrier.percentOfTotal}%</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Avg Severity</div>
                  <div className="text-lg font-bold text-gray-900">{barrier.avgSeverity}/100</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Resolution Rate</div>
                  <div className="text-lg font-bold text-green-600">{barrier.resolutionRate}%</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Time to Resolve</div>
                  <div className="text-lg font-bold text-gray-900">{Math.round(barrier.avgTimeToResolve / 60)}m</div>
                </div>
              </div>

              {/* Affected Patients */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {barrier.affectedPatients} patients affected
                  </span>
                </div>
              </div>

              {/* Related Topics */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Correlated Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {barrier.correlatedTopics.map((topicId) => {
                    const topic = pharmaTopics.find(t => t.id === topicId);
                    return topic ? (
                      <span
                        key={topicId}
                        className="text-xs px-2 py-1 rounded font-medium"
                        style={{ backgroundColor: topic.color + '20', color: topic.color }}
                      >
                        {topic.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Common Phrases */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Common Phrases:</h4>
                <div className="flex flex-wrap gap-2">
                  {barrier.commonPhrases.map((phrase) => (
                    <span
                      key={phrase}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded border border-gray-200"
                    >
                      "{phrase}"
                    </span>
                  ))}
                </div>
              </div>

              {/* Example Snippets */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Example Patient Statements:
                </h4>
                <div className="space-y-2">
                  {barrier.exampleSnippets.map((snippet, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded p-3 text-sm text-gray-700 italic">
                      "{snippet}"
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Recommendations */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Recommended Actions:</h4>
                <ul className="space-y-1">
                  {barrier.actionRecommendations.map((action, index) => (
                    <li key={index} className="text-sm text-blue-900 flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
