'use client';

import { ArrowLeft, Plus, BookOpen, TrendingUp, Tag, Eye, Settings } from 'lucide-react';
import { pharmaPlaybooks } from '@/data/conversationIntelligence';
import { pharmaTopics } from '@/data/pharmaTopics';

interface PlaybookManagerProps {
  onBack: () => void;
}

export default function PlaybookManager({ onBack }: PlaybookManagerProps) {
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
            <h2 className="text-2xl font-bold text-gray-900">Playbook Manager</h2>
            <p className="text-sm text-gray-600 mt-1">
              Create and manage custom topic collections for targeted conversation analysis
            </p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Playbook
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <BookOpen className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What are Playbooks?</h3>
            <p className="text-sm text-gray-700 mb-3">
              Playbooks are collections of topics that help you track specific conversation themes across your patient interactions.
              Use pre-built pharma-specific templates or create custom playbooks tailored to your medication programs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-sm font-medium text-gray-900 mb-1">📋 Out-of-Box Templates</div>
                <div className="text-xs text-gray-600">Pre-configured for common pharma workflows</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-sm font-medium text-gray-900 mb-1">✂️ Snippet Library</div>
                <div className="text-xs text-gray-600">Save conversation excerpts for training</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-sm font-medium text-gray-900 mb-1">📊 Auto-Tracking</div>
                <div className="text-xs text-gray-600">Metrics update automatically as calls occur</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Playbooks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pharmaPlaybooks.map((playbook) => {
          const categoryColors: Record<string, string> = {
            'hub-services': '#3B82F6',
            'adherence': '#10B981',
            'clinical': '#EF4444',
            'access': '#F59E0B',
            'custom': '#8B5CF6',
          };

          const categoryColor = categoryColors[playbook.category];

          return (
            <div
              key={playbook.id}
              className="bg-white rounded-lg shadow-sm border-2 border-gray-200 hover:border-blue-300 transition-all"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: categoryColor }}
                      >
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{playbook.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-xs font-medium px-2 py-0.5 rounded uppercase"
                            style={{ backgroundColor: categoryColor + '20', color: categoryColor }}
                          >
                            {playbook.category.replace('-', ' ')}
                          </span>
                          {playbook.isTemplate && (
                            <span className="text-xs font-medium px-2 py-0.5 bg-purple-100 text-purple-700 rounded">
                              Template
                            </span>
                          )}
                          {playbook.active && (
                            <span className="text-xs font-medium px-2 py-0.5 bg-green-100 text-green-700 rounded">
                              ● Active
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Settings className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">{playbook.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Conversations Analyzed</div>
                    <div className="text-xl font-bold text-gray-900">
                      {playbook.metrics.conversationsAnalyzed.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Topics Detected</div>
                    <div className="text-xl font-bold text-gray-900">
                      {playbook.metrics.topicsDetected.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Avg Sentiment</div>
                    <div className="text-xl font-bold text-green-600">
                      {Math.round(playbook.metrics.avgSentiment * 100)}%
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Friction Points</div>
                    <div className="text-xl font-bold text-orange-600">
                      {playbook.metrics.frictionPointsFound}
                    </div>
                  </div>
                </div>

                {/* Topics */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      {playbook.topics.length} Topics Tracked
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {playbook.topics.map((topicId) => {
                      const topic = pharmaTopics.find(t => t.id === topicId);
                      return topic ? (
                        <span
                          key={topicId}
                          className="text-xs px-2 py-1 rounded font-medium border"
                          style={{
                            backgroundColor: topic.color + '15',
                            borderColor: topic.color + '40',
                            color: topic.color
                          }}
                        >
                          {topic.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Created {new Date(playbook.createdAt).toLocaleDateString()}</span>
                    <span>Updated {new Date(playbook.lastModified).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Custom Playbook CTA */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-dashed border-purple-300 rounded-lg p-8 text-center">
        <div className="max-w-md mx-auto">
          <Plus className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Create Custom Playbook</h3>
          <p className="text-sm text-gray-600 mb-4">
            Build your own playbook with custom topics tailored to your specific medication programs, therapeutic areas, or operational workflows.
          </p>
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
            Get Started
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Auto-Detection</h4>
          <p className="text-sm text-gray-600">
            Topics are automatically detected in conversations using AI-powered keyword and context analysis
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Tag className="h-6 w-6 text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Custom Keywords</h4>
          <p className="text-sm text-gray-600">
            Define your own keywords and phrases to track specific drug names, programs, or therapeutic concepts
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Low Configuration</h4>
          <p className="text-sm text-gray-600">
            Pre-built pharma templates work out-of-the-box. Custom playbooks are optional for specific needs
          </p>
        </div>
      </div>
    </div>
  );
}
