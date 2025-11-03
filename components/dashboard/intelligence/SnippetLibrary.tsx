'use client';

import { ArrowLeft, Scissors, Search, Filter, Star, Share2, Tag, MessageSquare, User, Bot } from 'lucide-react';
import { conversationSnippets } from '@/data/conversationIntelligence';
import { pharmaTopics } from '@/data/pharmaTopics';
import { useState } from 'react';

interface SnippetLibraryProps {
  onBack: () => void;
}

export default function SnippetLibrary({ onBack }: SnippetLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUseCase, setSelectedUseCase] = useState<string>('all');

  const filteredSnippets = conversationSnippets.filter(snippet => {
    const matchesSearch = searchQuery === '' ||
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUseCase = selectedUseCase === 'all' || snippet.useCase === selectedUseCase;

    return matchesSearch && matchesUseCase;
  });

  const useCaseColors: Record<string, string> = {
    training: 'bg-blue-100 text-blue-700',
    insight: 'bg-purple-100 text-purple-700',
    review: 'bg-yellow-100 text-yellow-700',
    example: 'bg-green-100 text-green-700',
    escalation: 'bg-red-100 text-red-700',
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
            <h2 className="text-2xl font-bold text-gray-900">Snippet Library</h2>
            <p className="text-sm text-gray-600 mt-1">
              Saved conversation excerpts for training, review, and insights
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <Scissors className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">About Conversation Snippets</h3>
            <p className="text-sm text-gray-700 mb-3">
              Snippets allow you to save key moments from conversations that relate to specific topics, demonstrate
              best practices, or help evaluate agent skills and behaviors. Use them to build training materials,
              share insights with your team, or analyze patterns across multiple interactions.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 bg-white rounded-full border border-gray-200">
                💡 Best Practice Examples
              </span>
              <span className="text-xs px-3 py-1 bg-white rounded-full border border-gray-200">
                📚 Training Materials
              </span>
              <span className="text-xs px-3 py-1 bg-white rounded-full border border-gray-200">
                🎯 Quality Evaluation
              </span>
              <span className="text-xs px-3 py-1 bg-white rounded-full border border-gray-200">
                ⚠️ Escalation Review
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Use Case Filter */}
          <select
            value={selectedUseCase}
            onChange={(e) => setSelectedUseCase(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Use Cases</option>
            <option value="training">Training</option>
            <option value="insight">Insight</option>
            <option value="review">Review</option>
            <option value="example">Example</option>
            <option value="escalation">Escalation</option>
          </select>
        </div>

        <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
          <Filter className="h-4 w-4" />
          <span>Showing {filteredSnippets.length} of {conversationSnippets.length} snippets</span>
        </div>
      </div>

      {/* Snippets Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredSnippets.map((snippet) => (
          <div key={snippet.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{snippet.title}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded capitalize ${useCaseColors[snippet.useCase]}`}>
                      {snippet.useCase}
                    </span>
                    {snippet.shared && (
                      <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded flex items-center gap-1">
                        <Share2 className="h-3 w-3" />
                        Shared
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{snippet.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Created {new Date(snippet.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>By {snippet.createdBy}</span>
                    {snippet.rating && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {snippet.rating}/5
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {snippet.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded border border-gray-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Topics */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-900">Related Topics:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {snippet.topicsRelated.map((topicId) => {
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

              {/* Conversation Excerpt */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-900">
                    Conversation Excerpt ({snippet.messages.length} messages)
                  </span>
                </div>
                <div className="space-y-3">
                  {snippet.messages.map((message, index) => {
                    const isAI = message.speaker === 'ai';
                    return (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0">
                          {isAI ? (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <Bot className="h-4 w-4 text-blue-600" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                              <User className="h-4 w-4 text-purple-600" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-xs text-gray-900">
                              {message.speakerLabel}
                            </span>
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-800 bg-white p-2 rounded border border-gray-200">
                            {message.message}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  View Full Conversation
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-700 font-medium flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-700 font-medium flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  Rate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSnippets.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200 text-center">
          <Scissors className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No snippets found</h3>
          <p className="text-sm text-gray-600">
            Try adjusting your search or filter criteria, or create new snippets from conversations
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-dashed border-purple-300 rounded-lg p-8 text-center">
        <Scissors className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">Create New Snippet</h3>
        <p className="text-sm text-gray-600 mb-4">
          Go to the Conversation Explorer to save key moments from any conversation
        </p>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
          Browse Conversations
        </button>
      </div>
    </div>
  );
}
