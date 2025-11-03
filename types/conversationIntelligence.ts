// Conversation Intelligence Types

export type SentimentType = 'positive' | 'neutral' | 'negative';
export type TrendDirection = 'up' | 'down' | 'stable';
export type ConversationType = 'inbound' | 'outbound-enrollment' | 'adherence-checkin' | 'refill-reminder' | 'side-effect-monitoring';
export type ResolutionStatus = 'resolved' | 'escalated' | 'callback-requested' | 'unresolved';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type SpeakerType = 'ai' | 'patient' | 'agent';
export type TopicCategory = 'clinical' | 'operational' | 'access' | 'experience' | 'compliance';
export type InsightType = 'emerging-issue' | 'positive-trend' | 'risk-alert' | 'operational-win';
export type BarrierType = 'insurance' | 'affordability' | 'access' | 'clinical' | 'process' | 'support-quality';

// Message with sentiment and speaker
export interface AnalyzedMessage {
  speaker: SpeakerType;
  speakerLabel: string; // "AI Assistant", "Patient", "Agent Sarah"
  message: string;
  timestamp: string;
  sentiment: SentimentType;
  sentimentScore: number; // -1 to 1
  detectedTopics: string[]; // topic IDs mentioned
  frictionDetected?: boolean;
  keyMoment?: boolean; // critical turning point in conversation
}

// Topic definition
export interface Topic {
  id: string;
  name: string;
  category: TopicCategory;
  keywords: string[];
  description: string;
  isOutOfBox: boolean; // pre-configured vs custom
  playbooks: string[]; // playbook IDs this topic belongs to
  color: string; // for UI visualization
  icon?: string;
  alertThreshold?: number; // mention count that triggers alert
}

// Conversation analytics data
export interface ConversationAnalytics {
  id: string;
  conversationId: string; // links to original call record
  patientId: string;
  patientName: string;
  conversationType: ConversationType;
  callDate: string;
  callTime: string;
  duration: number; // in seconds

  // Transcript with analytics
  transcript: AnalyzedMessage[];

  // Overall metrics
  overallSentiment: SentimentType;
  sentimentScore: number; // average -1 to 1
  sentimentShift: number; // change from start to end

  // Topics detected
  topicsDetected: string[]; // topic IDs
  primaryTopic: string; // main topic of conversation

  // Resolution
  resolutionStatus: ResolutionStatus;
  resolutionTime: number; // seconds to resolve
  escalated: boolean;
  escalationReason?: string;

  // Quality metrics
  csatScore?: number; // 1-5 if available
  npsScore?: number; // 0-10 if available
  qualityScore: number; // 0-100 composite score
  complianceScore: number; // 0-100 HIPAA/disclaimer adherence
  empathyScore: number; // 0-100 based on language

  // Friction detection
  frictionPoints: FrictionPoint[];
  frictionScore: number; // 0-100, higher = more friction

  // Call drivers
  callDriver: string; // primary reason for call
  outcomeAchieved: boolean;

  // Risk indicators
  riskLevel: RiskLevel;
  abandonmentSignals: string[]; // detected signals
  churnRisk: number; // 0-100

  // Metadata
  tags: string[];
  notes: string;
  reviewed: boolean;
  reviewedBy?: string;
  reviewedAt?: string;
}

// Friction point detected in conversation
export interface FrictionPoint {
  id: string;
  conversationId: string;
  messageIndex: number; // which message in transcript
  barrierType: BarrierType;
  description: string;
  severity: 'low' | 'medium' | 'high';
  resolved: boolean;
  resolutionAction?: string;
  snippet: string; // excerpt from conversation
}

// Playbook - collection of topics to track
export interface Playbook {
  id: string;
  name: string;
  description: string;
  category: 'hub-services' | 'adherence' | 'clinical' | 'access' | 'custom';
  topics: string[]; // topic IDs
  isTemplate: boolean; // pre-built template
  createdBy: string;
  createdAt: string;
  lastModified: string;
  active: boolean;
  metrics: {
    conversationsAnalyzed: number;
    topicsDetected: number;
    avgSentiment: number;
    frictionPointsFound: number;
  };
}

// Saved conversation snippet
export interface ConversationSnippet {
  id: string;
  conversationId: string;
  title: string;
  description: string;
  startMessageIndex: number;
  endMessageIndex: number;
  messages: AnalyzedMessage[];
  tags: string[];
  topicsRelated: string[];
  useCase: 'training' | 'insight' | 'review' | 'example' | 'escalation';
  rating?: number; // 1-5 if rated
  createdBy: string;
  createdAt: string;
  shared: boolean;
}

// Auto-generated insight
export interface Spotlight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  metric?: string; // e.g., "45% increase"
  severity: 'info' | 'warning' | 'critical' | 'positive';
  dateDetected: string;
  timeFrame: string; // e.g., "this week", "last 30 days"
  affectedConversations: number;
  topicId?: string;
  actionRecommended?: string;
  dismissed: boolean;
}

// Topic trend data
export interface TopicTrend {
  topicId: string;
  topicName: string;
  mentions: number;
  previousMentions: number;
  trendDirection: TrendDirection;
  trendPercentage: number;
  avgSentiment: SentimentType;
  sentimentScore: number;
  sentimentTrend: TrendDirection;
  conversationCount: number;
  sparklineData: number[]; // last 7 days
  color: string;
}

// Aggregate metrics
export interface ConversationMetrics {
  // Volume
  totalConversations: number;
  conversationChange: number; // percentage change
  conversationsByType: Record<ConversationType, number>;
  callVolumeByDay: { date: string; count: number }[];

  // Sentiment
  avgSentimentScore: number;
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  sentimentTrend: TrendDirection;

  // Resolution
  avgResolutionRate: number;
  avgHandleTime: number; // seconds
  firstCallResolutionRate: number;
  escalationRate: number;

  // Quality
  avgCsatScore: number;
  avgNpsScore: number;
  avgQualityScore: number;
  avgComplianceScore: number;

  // Friction
  totalFrictionPoints: number;
  frictionByType: Record<BarrierType, number>;
  avgFrictionScore: number;

  // Risk
  highRiskConversations: number;
  abandonmentSignalsDetected: number;
  avgChurnRisk: number;

  // Topics
  topTopics: { topicId: string; topicName: string; count: number; sentiment: number }[];
  topCallDrivers: { driver: string; count: number }[];
}

// Root cause analysis data
export interface RootCauseAnalysis {
  barrierType: BarrierType;
  barrierName: string;
  occurrences: number;
  percentOfTotal: number;
  avgSeverity: number; // 0-100
  resolutionRate: number; // percentage resolved
  avgTimeToResolve: number; // seconds
  trendDirection: TrendDirection;
  affectedPatients: number;
  correlatedTopics: string[];
  commonPhrases: string[];
  exampleSnippets: string[];
  actionRecommendations: string[];
}

// Time series data point
export interface TimeSeriesDataPoint {
  date: string;
  value: number;
  label?: string;
}

// Filter options for Conversation Explorer
export interface ConversationFilters {
  dateRange?: { start: string; end: string };
  sentiment?: SentimentType[];
  topics?: string[];
  conversationType?: ConversationType[];
  resolutionStatus?: ResolutionStatus[];
  riskLevel?: RiskLevel[];
  csatScore?: { min: number; max: number };
  duration?: { min: number; max: number };
  frictionDetected?: boolean;
  searchQuery?: string;
}
