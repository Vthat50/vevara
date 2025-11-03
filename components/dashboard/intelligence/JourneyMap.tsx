'use client';

import { AlertTriangle, CheckCircle, MessageCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { ConversationAnalytics, AnalyzedMessage } from '@/types/conversationIntelligence';

interface JourneyMapProps {
  conversation: ConversationAnalytics;
}

interface JourneyMoment {
  index: number;
  time: string;
  type: 'start' | 'concern' | 'friction' | 'solution' | 'resolution' | 'positive';
  label: string;
  message: AnalyzedMessage;
  sentiment: number;
}

export default function JourneyMap({ conversation }: JourneyMapProps) {
  // Extract key moments from the conversation
  const extractKeyMoments = (): JourneyMoment[] => {
    const moments: JourneyMoment[] = [];
    const transcript = conversation.transcript;

    // Start moment
    if (transcript.length > 0) {
      moments.push({
        index: 0,
        time: transcript[0].timestamp,
        type: 'start',
        label: 'Conversation Started',
        message: transcript[0],
        sentiment: transcript[0].sentimentScore,
      });
    }

    // Find friction points
    transcript.forEach((msg, idx) => {
      if (msg.frictionDetected && idx > 0) {
        moments.push({
          index: idx,
          time: msg.timestamp,
          type: 'friction',
          label: 'Friction Detected',
          message: msg,
          sentiment: msg.sentimentScore,
        });
      }

      // Find concerns (negative sentiment from patient)
      if (msg.speaker === 'patient' && msg.sentimentScore < -0.4 && idx > 0) {
        const existingFriction = moments.find(m => m.index === idx);
        if (!existingFriction) {
          moments.push({
            index: idx,
            time: msg.timestamp,
            type: 'concern',
            label: 'Concern Expressed',
            message: msg,
            sentiment: msg.sentimentScore,
          });
        }
      }

      // Find solutions (positive turn after negative)
      if (idx > 0 && msg.speaker === 'ai' && msg.sentimentScore > 0.3) {
        const prevMsg = transcript[idx - 1];
        if (prevMsg.sentimentScore < 0) {
          moments.push({
            index: idx,
            time: msg.timestamp,
            type: 'solution',
            label: 'Solution Offered',
            message: msg,
            sentiment: msg.sentimentScore,
          });
        }
      }

      // Find positive moments
      if (msg.speaker === 'patient' && msg.sentimentScore > 0.7 && idx > moments[moments.length - 1]?.index) {
        moments.push({
          index: idx,
          time: msg.timestamp,
          type: 'positive',
          label: 'Positive Response',
          message: msg,
          sentiment: msg.sentimentScore,
        });
      }
    });

    // Resolution moment
    if (transcript.length > 1) {
      const lastMsg = transcript[transcript.length - 1];
      moments.push({
        index: transcript.length - 1,
        time: lastMsg.timestamp,
        type: 'resolution',
        label: conversation.outcomeAchieved ? 'Successfully Resolved' : 'Conversation Ended',
        message: lastMsg,
        sentiment: lastMsg.sentimentScore,
      });
    }

    return moments.sort((a, b) => a.index - b.index);
  };

  const keyMoments = extractKeyMoments();

  // Generate sentiment wave data points
  const sentimentWaveData = conversation.transcript.map((msg, idx) => ({
    index: idx,
    sentiment: msg.sentimentScore,
    speaker: msg.speaker,
  }));

  const getMomentIcon = (type: JourneyMoment['type']) => {
    switch (type) {
      case 'start':
        return <MessageCircle className="h-4 w-4 text-blue-600" />;
      case 'concern':
        return <TrendingDown className="h-4 w-4 text-orange-600" />;
      case 'friction':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'solution':
        return <TrendingUp className="h-4 w-4 text-purple-600" />;
      case 'positive':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'resolution':
        return conversation.outcomeAchieved ?
          <CheckCircle className="h-4 w-4 text-green-600" /> :
          <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMomentColor = (type: JourneyMoment['type']) => {
    switch (type) {
      case 'start':
        return 'bg-blue-100 border-blue-300 text-blue-900';
      case 'concern':
        return 'bg-orange-100 border-orange-300 text-orange-900';
      case 'friction':
        return 'bg-red-100 border-red-300 text-red-900';
      case 'solution':
        return 'bg-purple-100 border-purple-300 text-purple-900';
      case 'positive':
        return 'bg-green-100 border-green-300 text-green-900';
      case 'resolution':
        return conversation.outcomeAchieved ?
          'bg-green-100 border-green-300 text-green-900' :
          'bg-gray-100 border-gray-300 text-gray-900';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-blue-600" />
        Patient Journey Map
      </h3>

      {/* Journey Timeline */}
      <div className="relative">
        {/* Sentiment Wave Background */}
        <div className="mb-6 h-24 relative bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#6B7280" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Draw sentiment wave */}
            <polyline
              fill="url(#sentimentGradient)"
              stroke="#3B82F6"
              strokeWidth="2"
              points={sentimentWaveData.map((point, idx) => {
                const x = (idx / (sentimentWaveData.length - 1)) * 100;
                const y = 50 - (point.sentiment * 30); // Center at 50%, scale sentiment
                return `${x},${y}`;
              }).join(' ')}
            />

            {/* Center line */}
            <line x1="0" y1="50" x2="100" y2="50" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4" />
          </svg>

          {/* Labels */}
          <div className="absolute top-1 left-2 text-xs text-green-600 font-medium">Positive</div>
          <div className="absolute bottom-1 left-2 text-xs text-red-600 font-medium">Negative</div>
        </div>

        {/* Key Moments Timeline */}
        <div className="space-y-4">
          {keyMoments.map((moment, idx) => (
            <div key={`moment-${idx}`} className="flex gap-4">
              {/* Time indicator */}
              <div className="w-16 flex-shrink-0 text-right">
                <span className="text-xs text-gray-500 font-mono">{moment.time}</span>
              </div>

              {/* Timeline dot and line */}
              <div className="relative flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full border-2 ${
                  moment.type === 'friction' || moment.type === 'concern' ? 'bg-red-500 border-red-600' :
                  moment.type === 'solution' || moment.type === 'positive' ? 'bg-green-500 border-green-600' :
                  'bg-blue-500 border-blue-600'
                }`} />
                {idx < keyMoments.length - 1 && (
                  <div className="w-0.5 h-12 bg-gray-300" />
                )}
              </div>

              {/* Moment card */}
              <div className="flex-1 pb-6">
                <div className={`${getMomentColor(moment.type)} border rounded-lg p-3`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getMomentIcon(moment.type)}
                    <span className="font-semibold text-sm">{moment.label}</span>
                  </div>

                  <p className="text-sm italic mb-2">
                    "{moment.message.message.slice(0, 120)}{moment.message.message.length > 120 ? '...' : ''}"
                  </p>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-medium">{moment.message.speakerLabel}</span>
                    <span className="text-gray-600">•</span>
                    <span>Sentiment: {moment.sentiment > 0 ? '+' : ''}{moment.sentiment.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Journey Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-sm text-gray-900 mb-3">Journey Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-600 mb-1">Total Duration</p>
            <p className="text-sm font-bold text-gray-900">
              {Math.floor(conversation.duration / 60)}m {conversation.duration % 60}s
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Sentiment Shift</p>
            <p className="text-sm font-bold text-gray-900">
              {conversation.sentimentShift > 0 ? '+' : ''}{conversation.sentimentShift.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Key Moments</p>
            <p className="text-sm font-bold text-gray-900">{keyMoments.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Resolution</p>
            <p className="text-sm font-bold text-gray-900">
              {conversation.outcomeAchieved ? '✓ Achieved' : '✗ Partial'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
