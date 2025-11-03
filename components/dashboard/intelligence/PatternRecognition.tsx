'use client';

import { ArrowLeft, TrendingUp, TrendingDown, CheckCircle, XCircle, Lightbulb, GitBranch, Award, AlertTriangle } from 'lucide-react';
import { analyzedConversations } from '@/data/conversationIntelligence';
import { pharmaTopics } from '@/data/pharmaTopics';

interface PatternRecognitionProps {
  onBack: () => void;
}

interface ConversationPattern {
  id: string;
  name: string;
  description: string;
  sequence: string[];
  occurrences: number;
  successRate: number;
  avgDuration: number;
  avgSentimentShift: number;
  commonTopics: string[];
  successfulExamples: string[];
  failedExamples: string[];
  recommendations: string[];
}

export default function PatternRecognition({ onBack }: PatternRecognitionProps) {
  // Detect patterns from conversation data
  const detectPatterns = (): ConversationPattern[] => {
    const patterns: ConversationPattern[] = [];

    // Pattern 1: Side Effect Concern → Empathy → Resolution
    const sideEffectConvos = analyzedConversations.filter(c =>
      c.topicsDetected.includes('topic-side-effects')
    );
    const sideEffectResolved = sideEffectConvos.filter(c =>
      c.outcomeAchieved && c.empathyScore >= 70
    );
    if (sideEffectConvos.length > 0) {
      patterns.push({
        id: 'side-effect-resolution',
        name: 'Side Effect Management',
        description: 'Patient expresses side effect concern → Agent shows empathy → Resolution achieved',
        sequence: ['Concern Expression', 'Empathetic Response', 'Clinical Guidance', 'Resolution'],
        occurrences: sideEffectConvos.length,
        successRate: (sideEffectResolved.length / sideEffectConvos.length) * 100,
        avgDuration: sideEffectConvos.reduce((sum, c) => sum + c.duration, 0) / sideEffectConvos.length,
        avgSentimentShift: sideEffectConvos.reduce((sum, c) => sum + c.sentimentShift, 0) / sideEffectConvos.length,
        commonTopics: ['topic-side-effects', 'topic-clinical-questions'],
        successfulExamples: [
          'Agent acknowledged concern, provided reassurance, offered clinical guidance',
          'Empathetic listening followed by actionable next steps',
        ],
        failedExamples: [
          'Agent dismissed concern without empathy',
          'Insufficient clinical information provided',
        ],
        recommendations: [
          'Lead with empathy when side effects are mentioned',
          'Provide clear clinical guidance and document concerns',
          'Follow up within 24-48 hours to check on symptoms',
        ],
      });
    }

    // Pattern 2: Adherence Issue → Barrier Identification → Support Offered
    const adherenceConvos = analyzedConversations.filter(c =>
      c.topicsDetected.includes('topic-adherence') || c.conversationType === 'adherence-checkin'
    );
    const adherenceResolved = adherenceConvos.filter(c =>
      c.outcomeAchieved && c.resolutionStatus === 'resolved'
    );
    if (adherenceConvos.length > 0) {
      patterns.push({
        id: 'adherence-support',
        name: 'Adherence Support Flow',
        description: 'Missed doses identified → Root cause explored → Support resources provided',
        sequence: ['Issue Discovery', 'Barrier Assessment', 'Resource Provision', 'Commitment'],
        occurrences: adherenceConvos.length,
        successRate: (adherenceResolved.length / adherenceConvos.length) * 100,
        avgDuration: adherenceConvos.reduce((sum, c) => sum + c.duration, 0) / adherenceConvos.length,
        avgSentimentShift: adherenceConvos.reduce((sum, c) => sum + c.sentimentShift, 0) / adherenceConvos.length,
        commonTopics: ['topic-adherence', 'topic-refill', 'topic-reminders'],
        successfulExamples: [
          'Agent identified barriers and offered reminder solutions',
          'Patient enrolled in refill coordination program',
        ],
        failedExamples: [
          'Agent lectured about importance without understanding barriers',
          'No follow-up plan established',
        ],
        recommendations: [
          'Ask open-ended questions to identify adherence barriers',
          'Offer concrete solutions (reminders, pill organizers, etc.)',
          'Schedule proactive follow-up to check on progress',
        ],
      });
    }

    // Pattern 3: Cost Concern → Financial Assistance → Enrollment
    const costConvos = analyzedConversations.filter(c =>
      c.topicsDetected.includes('topic-copay') || c.topicsDetected.includes('topic-financial-assistance')
    );
    const costResolved = costConvos.filter(c =>
      c.outcomeAchieved && !c.abandonmentSignals.includes('Cost/affordability concerns')
    );
    if (costConvos.length > 0) {
      patterns.push({
        id: 'financial-assistance',
        name: 'Financial Assistance Enrollment',
        description: 'Affordability concern → Assistance options presented → Patient enrolled',
        sequence: ['Cost Concern', 'Program Explanation', 'Eligibility Check', 'Enrollment'],
        occurrences: costConvos.length,
        successRate: (costResolved.length / costConvos.length) * 100,
        avgDuration: costConvos.reduce((sum, c) => sum + c.duration, 0) / costConvos.length,
        avgSentimentShift: costConvos.reduce((sum, c) => sum + c.sentimentShift, 0) / costConvos.length,
        commonTopics: ['topic-copay', 'topic-financial-assistance', 'topic-enrollment'],
        successfulExamples: [
          'Agent immediately offered copay program without hesitation',
          'Clear explanation of program benefits and simple enrollment process',
        ],
        failedExamples: [
          'Agent was unaware of available financial assistance programs',
          'Complex enrollment process discouraged patient',
        ],
        recommendations: [
          'Proactively mention financial assistance early in conversation',
          'Streamline enrollment process to reduce friction',
          'Follow up to ensure enrollment completed successfully',
        ],
      });
    }

    // Pattern 4: High Friction → Escalation → Specialist Resolution
    const highFrictionConvos = analyzedConversations.filter(c =>
      c.frictionPoints.length >= 2 && c.escalated
    );
    const frictionResolved = highFrictionConvos.filter(c =>
      c.resolutionStatus === 'resolved'
    );
    if (highFrictionConvos.length > 0) {
      patterns.push({
        id: 'escalation-pattern',
        name: 'Escalation & Resolution',
        description: 'Complex issue encountered → Appropriately escalated → Specialist resolves',
        sequence: ['Complex Issue', 'Recognition', 'Escalation', 'Specialist Handling', 'Resolution'],
        occurrences: highFrictionConvos.length,
        successRate: (frictionResolved.length / highFrictionConvos.length) * 100,
        avgDuration: highFrictionConvos.reduce((sum, c) => sum + c.duration, 0) / highFrictionConvos.length,
        avgSentimentShift: highFrictionConvos.reduce((sum, c) => sum + c.sentimentShift, 0) / highFrictionConvos.length,
        commonTopics: Array.from(new Set(highFrictionConvos.flatMap(c => c.topicsDetected))).slice(0, 3),
        successfulExamples: [
          'Agent recognized complexity early and escalated promptly',
          'Warm transfer with full context provided to specialist',
        ],
        failedExamples: [
          'Agent attempted to handle beyond their knowledge level',
          'Long hold times and multiple transfers frustrated patient',
        ],
        recommendations: [
          'Train agents to recognize escalation triggers early',
          'Implement warm transfer protocols with context sharing',
          'Empower agents with clear escalation guidelines',
        ],
      });
    }

    // Pattern 5: Positive Engagement → Education → Empowerment
    const positiveConvos = analyzedConversations.filter(c =>
      c.overallSentiment === 'positive' && c.outcomeAchieved && c.qualityScore >= 80
    );
    if (positiveConvos.length > 0) {
      patterns.push({
        id: 'positive-engagement',
        name: 'Optimal Patient Engagement',
        description: 'Positive rapport built → Patient educated → Patient feels empowered',
        sequence: ['Rapport Building', 'Active Listening', 'Education', 'Empowerment', 'Satisfaction'],
        occurrences: positiveConvos.length,
        successRate: 100,
        avgDuration: positiveConvos.reduce((sum, c) => sum + c.duration, 0) / positiveConvos.length,
        avgSentimentShift: positiveConvos.reduce((sum, c) => sum + c.sentimentShift, 0) / positiveConvos.length,
        commonTopics: Array.from(new Set(positiveConvos.flatMap(c => c.topicsDetected))).slice(0, 3),
        successfulExamples: [
          'Agent used patient\'s name, showed genuine care, provided clear guidance',
          'Patient felt heard, understood, and confident in next steps',
        ],
        failedExamples: [],
        recommendations: [
          'Train all agents on best practices from successful conversations',
          'Recognize and reward agents who consistently achieve high quality scores',
          'Share snippets of excellent interactions for peer learning',
        ],
      });
    }

    return patterns.sort((a, b) => b.successRate - a.successRate);
  };

  const patterns = detectPatterns();

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSuccessRateBg = (rate: number) => {
    if (rate >= 80) return 'bg-green-50 border-green-300';
    if (rate >= 60) return 'bg-yellow-50 border-yellow-300';
    return 'bg-red-50 border-red-300';
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
          <h2 className="text-2xl font-bold text-gray-900">Pattern Recognition</h2>
          <p className="text-sm text-gray-600 mt-1">
            Auto-detected conversation patterns, success rates, and comparative analysis
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Patterns Detected</span>
            <GitBranch className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{patterns.length}</div>
          <div className="text-xs text-gray-500 mt-1">Recurring sequences</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Avg Success Rate</span>
            <Award className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(patterns.reduce((sum, p) => sum + p.successRate, 0) / patterns.length)}%
          </div>
          <div className="text-xs text-gray-500 mt-1">Across all patterns</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Best Performing</span>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-lg font-bold text-gray-900">
            {patterns[0]?.successRate.toFixed(0)}%
          </div>
          <div className="text-xs text-gray-500 mt-1">{patterns[0]?.name}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Needs Improvement</span>
            <AlertTriangle className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-lg font-bold text-gray-900">
            {patterns[patterns.length - 1]?.successRate.toFixed(0)}%
          </div>
          <div className="text-xs text-gray-500 mt-1">{patterns[patterns.length - 1]?.name}</div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <Lightbulb className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">About Pattern Recognition</h3>
            <p className="text-sm text-gray-700 mb-3">
              Our AI analyzes thousands of conversation sequences to identify recurring patterns that lead to successful
              or unsuccessful outcomes. Use these insights to replicate what works and avoid what doesn't.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-sm font-medium text-gray-900 mb-1">🔄 Recurring Sequences</div>
                <div className="text-xs text-gray-600">Common conversation flows across interactions</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-sm font-medium text-gray-900 mb-1">📊 Success Tracking</div>
                <div className="text-xs text-gray-600">Outcome rates for each pattern type</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-sm font-medium text-gray-900 mb-1">⚖️ Comparative Analysis</div>
                <div className="text-xs text-gray-600">What works vs. what doesn't</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Cards */}
      <div className="space-y-6">
        {patterns.map((pattern) => (
          <div key={pattern.id} className="bg-white rounded-lg shadow-sm border-2 border-gray-200 overflow-hidden">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <GitBranch className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">{pattern.name}</h3>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${getSuccessRateBg(pattern.successRate)}`}>
                      {pattern.successRate.toFixed(0)}% Success Rate
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{pattern.description}</p>
                </div>
              </div>

              {/* Sequence Flow */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Conversation Sequence:</h4>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {pattern.sequence.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
                        {index + 1}. {step}
                      </div>
                      {index < pattern.sequence.length - 1 && (
                        <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Occurrences</div>
                  <div className="text-xl font-bold text-gray-900">{pattern.occurrences}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Avg Duration</div>
                  <div className="text-xl font-bold text-gray-900">
                    {Math.floor(pattern.avgDuration / 60)}m {pattern.avgDuration % 60}s
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Sentiment Shift</div>
                  <div className={`text-xl font-bold ${pattern.avgSentimentShift >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {pattern.avgSentimentShift >= 0 ? '+' : ''}{pattern.avgSentimentShift.toFixed(2)}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Success Rate</div>
                  <div className={`text-xl font-bold ${getSuccessRateColor(pattern.successRate)}`}>
                    {pattern.successRate.toFixed(0)}%
                  </div>
                </div>
              </div>

              {/* Common Topics */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Common Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {pattern.commonTopics.map((topicId) => {
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

              {/* Comparative Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Successful Examples */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h4 className="text-sm font-bold text-green-900">What Works ✓</h4>
                  </div>
                  <ul className="space-y-2">
                    {pattern.successfulExamples.map((example, index) => (
                      <li key={index} className="text-sm text-green-800 flex items-start gap-2">
                        <span className="text-green-600">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Failed Examples */}
                {pattern.failedExamples.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <h4 className="text-sm font-bold text-red-900">What Doesn't Work ✗</h4>
                    </div>
                    <ul className="space-y-2">
                      {pattern.failedExamples.map((example, index) => (
                        <li key={index} className="text-sm text-red-800 flex items-start gap-2">
                          <span className="text-red-600">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Recommended Actions to Improve Success Rate:
                </h4>
                <ul className="space-y-2">
                  {pattern.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-blue-900 flex items-start gap-2">
                      <span className="text-blue-600 font-bold">{index + 1}.</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {patterns.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200 text-center">
          <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Patterns Detected Yet</h3>
          <p className="text-sm text-gray-600">
            Pattern recognition requires more conversation data. Continue using the system to build pattern intelligence.
          </p>
        </div>
      )}
    </div>
  );
}
