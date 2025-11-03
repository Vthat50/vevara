'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';
import { analyzedConversations } from '@/data/conversationIntelligence';
import ConversationDetail from './intelligence/ConversationDetail';
import type { ConversationAnalytics } from '@/types/conversationIntelligence';

export default function ConversationIntelligenceTabSimple() {
  const [selectedConversation, setSelectedConversation] = useState<ConversationAnalytics | null>(null);

  if (selectedConversation) {
    return (
      <ConversationDetail
        conversation={selectedConversation}
        onBack={() => setSelectedConversation(null)}
      />
    );
  }

  // Simple metrics
  const totalCalls = analyzedConversations.length;
  const resolved = analyzedConversations.filter(c => c.outcomeAchieved).length;
  const highRisk = analyzedConversations.filter(c => c.riskLevel === 'high' || c.riskLevel === 'critical').length;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Conversation Intelligence</h2>
        <p className="text-sm text-gray-600 mt-1">View and analyze patient conversations</p>
      </div>

      {/* Simple Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Total Conversations</div>
          <div className="text-3xl font-bold text-gray-900">{totalCalls}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Resolved</div>
          <div className="text-3xl font-bold text-green-600">{resolved}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Need Attention</div>
          <div className="text-3xl font-bold text-red-600">{highRisk}</div>
        </div>
      </div>

      {/* Simple Conversation List */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Recent Conversations</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {analyzedConversations.map((conv) => (
            <div key={conv.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{conv.patientName}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(conv.callDate).toLocaleDateString()} • {conv.callDriver}
                  </div>
                  <div className="mt-2 flex gap-2">
                    {conv.outcomeAchieved ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        ✓ Resolved
                      </span>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        ⏳ In Progress
                      </span>
                    )}
                    {(conv.riskLevel === 'high' || conv.riskLevel === 'critical') && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                        ⚠️ High Risk
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedConversation(conv)}
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
