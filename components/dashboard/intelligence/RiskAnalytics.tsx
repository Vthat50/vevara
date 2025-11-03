'use client';

import { ArrowLeft, AlertTriangle, TrendingUp, TrendingDown, Clock, Shield, Users, Target, Activity, Zap } from 'lucide-react';
import { analyzedConversations } from '@/data/conversationIntelligence';
import { pharmaTopics } from '@/data/pharmaTopics';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ScatterChart, Scatter, ZAxis } from 'recharts';

interface RiskAnalyticsProps {
  onBack: () => void;
}

interface RiskTrendPoint {
  date: string;
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
}

interface PredictiveRiskPatient {
  id: string;
  name: string;
  currentRisk: number;
  predictedRisk: number;
  riskTrend: 'increasing' | 'stable' | 'decreasing';
  riskFactors: { factor: string; weight: number; impact: string }[];
  timeToIntervene: number; // days
  lastContactDate: string;
  recommendedActions: string[];
  riskTrajectory: { day: number; risk: number }[];
}

export default function RiskAnalytics({ onBack }: RiskAnalyticsProps) {
  // Calculate predictive risk scores
  const calculatePredictiveRisk = (): PredictiveRiskPatient[] => {
    const patients: PredictiveRiskPatient[] = [];

    analyzedConversations.forEach((conv) => {
      const currentRisk = conv.churnRisk;

      // Calculate risk factors and weights
      const riskFactors: { factor: string; weight: number; impact: string }[] = [];

      // Factor 1: Abandonment signals
      if (conv.abandonmentSignals.length > 0) {
        riskFactors.push({
          factor: 'Therapy abandonment signals',
          weight: conv.abandonmentSignals.length * 15,
          impact: 'Very High',
        });
      }

      // Factor 2: Negative sentiment
      if (conv.overallSentiment === 'negative') {
        riskFactors.push({
          factor: 'Negative sentiment in recent interactions',
          weight: Math.abs(conv.sentimentScore) * 20,
          impact: 'High',
        });
      }

      // Factor 3: Unresolved friction
      const unresolvedFriction = conv.frictionPoints.filter(f => !f.resolved).length;
      if (unresolvedFriction > 0) {
        riskFactors.push({
          factor: `${unresolvedFriction} unresolved friction point${unresolvedFriction > 1 ? 's' : ''}`,
          weight: unresolvedFriction * 12,
          impact: 'High',
        });
      }

      // Factor 4: Failed outcomes
      if (!conv.outcomeAchieved) {
        riskFactors.push({
          factor: 'Previous interaction did not achieve outcome',
          weight: 10,
          impact: 'Medium',
        });
      }

      // Factor 5: Cost concerns
      if (conv.topicsDetected.includes('topic-copay') && conv.overallSentiment !== 'positive') {
        riskFactors.push({
          factor: 'Unresolved cost/affordability concerns',
          weight: 18,
          impact: 'Very High',
        });
      }

      // Factor 6: Side effects without resolution
      const sideEffectUnresolved = conv.topicsDetected.includes('topic-side-effects') &&
                                    !conv.outcomeAchieved;
      if (sideEffectUnresolved) {
        riskFactors.push({
          factor: 'Side effects reported without clear resolution',
          weight: 16,
          impact: 'High',
        });
      }

      // Factor 7: Adherence issues
      const adherenceIssue = conv.transcript.some(m =>
        m.message.toLowerCase().includes('missed') ||
        m.message.toLowerCase().includes('forgot')
      );
      if (adherenceIssue) {
        riskFactors.push({
          factor: 'Adherence challenges identified',
          weight: 14,
          impact: 'High',
        });
      }

      // Calculate predicted risk (current + weighted factors)
      const additionalRisk = riskFactors.reduce((sum, f) => sum + f.weight, 0);
      const predictedRisk = Math.min(100, currentRisk + additionalRisk);

      // Determine risk trend
      let riskTrend: 'increasing' | 'stable' | 'decreasing';
      const riskIncrease = predictedRisk - currentRisk;
      if (riskIncrease > 10) {
        riskTrend = 'increasing';
      } else if (riskIncrease < -5) {
        riskTrend = 'decreasing';
      } else {
        riskTrend = 'stable';
      }

      // Calculate time to intervene (urgency)
      let timeToIntervene: number;
      if (predictedRisk >= 80) {
        timeToIntervene = 1; // Immediate
      } else if (predictedRisk >= 60) {
        timeToIntervene = 3; // 3 days
      } else if (predictedRisk >= 40) {
        timeToIntervene = 7; // 1 week
      } else {
        timeToIntervene = 14; // 2 weeks
      }

      // Generate recommended actions
      const recommendedActions: string[] = [];
      if (conv.abandonmentSignals.includes('Cost/affordability concerns')) {
        recommendedActions.push('Immediately offer copay assistance or financial support programs');
      }
      if (unresolvedFriction > 0) {
        recommendedActions.push('Schedule follow-up call to address unresolved issues');
      }
      if (conv.overallSentiment === 'negative') {
        recommendedActions.push('Assign to senior specialist for empathetic outreach');
      }
      if (sideEffectUnresolved) {
        recommendedActions.push('Connect patient with clinical team for side effect management');
      }
      if (predictedRisk >= 70 && recommendedActions.length === 0) {
        recommendedActions.push('Proactive wellness check-in to assess patient satisfaction');
      }
      if (recommendedActions.length === 0) {
        recommendedActions.push('Continue regular monitoring and scheduled check-ins');
      }

      // Generate risk trajectory (7-day forecast)
      const riskTrajectory: { day: number; risk: number }[] = [];
      for (let day = 0; day <= 7; day++) {
        const dayRisk = currentRisk + (riskIncrease * (day / 7));
        riskTrajectory.push({ day, risk: Math.round(dayRisk) });
      }

      patients.push({
        id: conv.patientId,
        name: conv.patientName,
        currentRisk,
        predictedRisk: Math.round(predictedRisk),
        riskTrend,
        riskFactors,
        timeToIntervene,
        lastContactDate: conv.callDate,
        recommendedActions,
        riskTrajectory,
      });
    });

    return patients.sort((a, b) => b.predictedRisk - a.predictedRisk);
  };

  const patients = calculatePredictiveRisk();

  // Generate risk trend data (simulate historical data)
  const generateRiskTrend = (): RiskTrendPoint[] => {
    const today = new Date();
    const data: RiskTrendPoint[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Simulate trend data based on current patient distribution
      const highRiskCount = patients.filter(p => p.predictedRisk >= 70).length;
      const mediumRiskCount = patients.filter(p => p.predictedRisk >= 40 && p.predictedRisk < 70).length;
      const lowRiskCount = patients.filter(p => p.predictedRisk < 40).length;

      // Add some variation to show trend
      const variance = (Math.random() - 0.5) * 2;

      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        highRisk: Math.max(0, highRiskCount + Math.floor(variance)),
        mediumRisk: Math.max(0, mediumRiskCount + Math.floor(variance * 2)),
        lowRisk: Math.max(0, lowRiskCount - Math.floor(variance)),
      });
    }

    return data;
  };

  const riskTrendData = generateRiskTrend();

  // Calculate summary stats
  const highRiskCount = patients.filter(p => p.predictedRisk >= 70).length;
  const increasingTrendCount = patients.filter(p => p.riskTrend === 'increasing').length;
  const urgentInterventionCount = patients.filter(p => p.timeToIntervene <= 1).length;
  const avgPredictedRisk = Math.round(patients.reduce((sum, p) => sum + p.predictedRisk, 0) / patients.length);

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return 'text-red-600';
    if (risk >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getRiskBg = (risk: number) => {
    if (risk >= 70) return 'bg-red-50 border-red-300';
    if (risk >= 40) return 'bg-yellow-50 border-yellow-300';
    return 'bg-green-50 border-green-300';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'increasing') return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (trend === 'decreasing') return <TrendingDown className="h-4 w-4 text-green-500" />;
    return <Activity className="h-4 w-4 text-gray-400" />;
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
          <h2 className="text-2xl font-bold text-gray-900">Predictive Risk Analytics</h2>
          <p className="text-sm text-gray-600 mt-1">
            AI-powered risk scoring with trend prediction and intervention recommendations
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 rounded-lg shadow-sm p-4 border-2 border-red-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-red-700">High Risk Patients</span>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-600">{highRiskCount}</div>
          <div className="text-xs text-red-600 mt-1">Predicted risk ≥ 70%</div>
        </div>

        <div className="bg-orange-50 rounded-lg shadow-sm p-4 border-2 border-orange-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-700">Increasing Risk</span>
            <TrendingUp className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-orange-600">{increasingTrendCount}</div>
          <div className="text-xs text-orange-600 mt-1">Risk trending upward</div>
        </div>

        <div className="bg-purple-50 rounded-lg shadow-sm p-4 border-2 border-purple-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-700">Urgent Action</span>
            <Zap className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-purple-600">{urgentInterventionCount}</div>
          <div className="text-xs text-purple-600 mt-1">Immediate intervention needed</div>
        </div>

        <div className="bg-blue-50 rounded-lg shadow-sm p-4 border-2 border-blue-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Avg Predicted Risk</span>
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600">{avgPredictedRisk}%</div>
          <div className="text-xs text-blue-600 mt-1">Across all patients</div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <Shield className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">About Predictive Risk Scoring</h3>
            <p className="text-sm text-gray-700 mb-3">
              Our AI-powered risk engine analyzes multiple signals from patient interactions to predict churn risk
              and therapy abandonment. Each patient receives a weighted risk score based on abandonment signals,
              sentiment, unresolved issues, and behavioral patterns.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-sm font-medium text-gray-900 mb-1">📈 Trend Prediction</div>
                <div className="text-xs text-gray-600">7-day risk trajectory forecast</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-sm font-medium text-gray-900 mb-1">⚖️ Factor Weighting</div>
                <div className="text-xs text-gray-600">Prioritized risk contributors</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-sm font-medium text-gray-900 mb-1">⏰ Time to Intervene</div>
                <div className="text-xs text-gray-600">Urgency-based recommendations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Trend Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution Trend (7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={riskTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="highRisk" stackId="a" fill="#EF4444" name="High Risk" />
            <Bar dataKey="mediumRisk" stackId="a" fill="#F59E0B" name="Medium Risk" />
            <Bar dataKey="lowRisk" stackId="a" fill="#10B981" name="Low Risk" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Patient Risk Cards */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Risk Profiles</h3>
        <div className="space-y-4">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className={`rounded-lg shadow-sm border-2 overflow-hidden ${getRiskBg(patient.predictedRisk)}`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{patient.name}</h4>
                      <span className={`px-3 py-1 text-sm font-bold rounded-full ${getRiskBg(patient.predictedRisk)}`}>
                        {patient.predictedRisk}% Risk
                      </span>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(patient.riskTrend)}
                        <span className={`text-sm font-medium capitalize ${
                          patient.riskTrend === 'increasing' ? 'text-red-600' :
                          patient.riskTrend === 'decreasing' ? 'text-green-600' :
                          'text-gray-600'
                        }`}>
                          {patient.riskTrend}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Current: {patient.currentRisk}%</span>
                      <span>•</span>
                      <span>Predicted: {patient.predictedRisk}%</span>
                      <span>•</span>
                      <span>Last contact: {new Date(patient.lastContactDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg border-2 ${
                    patient.timeToIntervene <= 1 ? 'bg-red-100 border-red-400' :
                    patient.timeToIntervene <= 3 ? 'bg-orange-100 border-orange-400' :
                    'bg-yellow-100 border-yellow-400'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs font-medium">Time to Intervene</span>
                    </div>
                    <div className="text-lg font-bold">
                      {patient.timeToIntervene === 1 ? 'Immediate' : `${patient.timeToIntervene} days`}
                    </div>
                  </div>
                </div>

                {/* Risk Trajectory Chart */}
                <div className="mb-4 bg-white rounded-lg p-4 border border-gray-200">
                  <h5 className="text-sm font-semibold text-gray-900 mb-2">7-Day Risk Trajectory Forecast</h5>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={patient.riskTrajectory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 10 }} label={{ value: 'Days', position: 'insideBottom', offset: -5 }} />
                      <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="risk"
                        stroke={patient.predictedRisk >= 70 ? '#EF4444' : patient.predictedRisk >= 40 ? '#F59E0B' : '#10B981'}
                        strokeWidth={2}
                        dot={{ fill: '#fff', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Risk Factors */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-900 mb-2">Weighted Risk Factors:</h5>
                  <div className="space-y-2">
                    {patient.riskFactors.map((factor, index) => (
                      <div key={index} className="flex items-center justify-between bg-white rounded p-2 border border-gray-200">
                        <div className="flex-1">
                          <span className="text-sm text-gray-900">{factor.factor}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            factor.impact === 'Very High' ? 'bg-red-100 text-red-700' :
                            factor.impact === 'High' ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {factor.impact}
                          </span>
                          <span className="text-sm font-bold text-gray-900">+{factor.weight}%</span>
                        </div>
                      </div>
                    ))}
                    {patient.riskFactors.length === 0 && (
                      <div className="text-sm text-gray-500 italic">No significant risk factors identified</div>
                    )}
                  </div>
                </div>

                {/* Recommended Actions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Recommended Actions:
                  </h5>
                  <ul className="space-y-1">
                    {patient.recommendedActions.map((action, index) => (
                      <li key={index} className="text-sm text-blue-900 flex items-start gap-2">
                        <span className="text-blue-600 font-bold">{index + 1}.</span>
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

      {patients.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200 text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Risk Data Available</h3>
          <p className="text-sm text-gray-600">
            Risk analytics require conversation data to generate predictions.
          </p>
        </div>
      )}
    </div>
  );
}
