'use client';

import { ArrowLeft, TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';
import { topicTrends, spotlights } from '@/data/conversationIntelligence';
import { pharmaTopics } from '@/data/pharmaTopics';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface TopicsPanelProps {
  onBack: () => void;
}

export default function TopicsPanel({ onBack }: TopicsPanelProps) {
  const getTrendIcon = (direction: string) => {
    if (direction === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (direction === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === 'positive') return 'text-green-600 bg-green-50';
    if (sentiment === 'negative') return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getSentimentTrendIcon = (trend: string) => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '➡️';
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
          <h2 className="text-2xl font-bold text-gray-900">Gen AI Topics & Trending Data</h2>
          <p className="text-sm text-gray-600 mt-1">
            Monitor trending conversation topics and sentiment patterns
          </p>
        </div>
      </div>

      {/* Related Spotlights */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-sm p-6 border border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Topic-Related Insights</h3>
        </div>
        <div className="space-y-3">
          {spotlights.filter(s => s.topicId).slice(0, 4).map((spotlight) => {
            const topic = pharmaTopics.find(t => t.id === spotlight.topicId);
            return (
              <div key={spotlight.id} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {topic && (
                        <span
                          className="text-xs font-medium px-2 py-1 rounded"
                          style={{ backgroundColor: topic.color + '20', color: topic.color }}
                        >
                          {topic.name}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">{spotlight.timeFrame}</span>
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">{spotlight.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{spotlight.description}</p>
                    {spotlight.actionRecommended && (
                      <p className="text-xs text-gray-700 bg-blue-50 rounded px-2 py-1 inline-block">
                        💡 {spotlight.actionRecommended}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topic Trends Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Trending Topics</h3>
          <p className="text-sm text-gray-600 mt-1">
            Conversation topics ranked by volume and sentiment trends
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mentions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sentiment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  7-Day Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topicTrends.map((trend) => {
                const topic = pharmaTopics.find(t => t.id === trend.topicId);
                return (
                  <tr key={trend.topicId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: trend.color }}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {trend.topicName}
                          </div>
                          {topic && (
                            <div className="text-xs text-gray-500">{topic.category}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {trend.mentions.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        vs {trend.previousMentions.toLocaleString()} prev
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getTrendIcon(trend.trendDirection)}
                        <span className={`text-sm font-medium ${
                          trend.trendDirection === 'up' ? 'text-green-600' :
                          trend.trendDirection === 'down' ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {Math.abs(trend.trendPercentage)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getSentimentColor(trend.avgSentiment)}`}>
                          {trend.avgSentiment}
                        </span>
                        <span className="text-sm">
                          {getSentimentTrendIcon(trend.sentimentTrend)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Score: {trend.sentimentScore.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {trend.conversationCount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ResponsiveContainer width={100} height={40}>
                        <LineChart data={trend.sparklineData.map((value, index) => ({ value }))}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={trend.color}
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Out-of-Box Topics Reference */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Pharma-Specific Out-of-Box Topics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pharmaTopics.map((topic) => (
            <div
              key={topic.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg"
                  style={{ backgroundColor: topic.color }}
                >
                  {topic.icon ? topic.icon.charAt(0) : '📌'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm text-gray-900">{topic.name}</h4>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {topic.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{topic.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {topic.keywords.slice(0, 4).map((keyword) => (
                      <span
                        key={keyword}
                        className="text-xs text-gray-700 bg-gray-100 px-2 py-0.5 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
