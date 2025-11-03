'use client';

import { Sparkles, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { spotlights } from '@/data/conversationIntelligence';

export default function SpotlightsPanel() {
  const severityConfig = {
    critical: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      badge: 'Critical',
      badgeBg: 'bg-red-100 text-red-700',
    },
    warning: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
      badge: 'Warning',
      badgeBg: 'bg-yellow-100 text-yellow-700',
    },
    positive: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      badge: 'Success',
      badgeBg: 'bg-green-100 text-green-700',
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      icon: <Info className="h-5 w-5 text-blue-600" />,
      badge: 'Info',
      badgeBg: 'bg-blue-100 text-blue-700',
    },
  };

  const typeLabels = {
    'emerging-issue': 'Emerging Issue',
    'positive-trend': 'Positive Trend',
    'risk-alert': 'Risk Alert',
    'operational-win': 'Operational Win',
  };

  return (
    <div className="space-y-4">
      {spotlights.map((spotlight) => {
        const config = severityConfig[spotlight.severity];
        return (
          <div
            key={spotlight.id}
            className={`${config.bgColor} ${config.borderColor} border rounded-lg p-5`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{config.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${config.badgeBg}`}>
                    {typeLabels[spotlight.type]}
                  </span>
                  <span className="text-xs text-gray-500">{spotlight.timeFrame}</span>
                </div>
                <h4 className={`font-semibold text-base mb-1 ${config.textColor}`}>
                  {spotlight.title}
                </h4>
                <p className={`text-sm mb-3 ${config.textColor}`}>
                  {spotlight.description}
                </p>
                {spotlight.metric && (
                  <div className="inline-flex items-center gap-2 bg-white rounded px-3 py-1 mb-3">
                    <TrendingUp className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      {spotlight.metric}
                    </span>
                  </div>
                )}
                {spotlight.actionRecommended && (
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-xs font-medium text-gray-700">
                      💡 Recommended Action:
                    </p>
                    <p className="text-sm text-gray-900 mt-1">
                      {spotlight.actionRecommended}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                  <span>{spotlight.affectedConversations} conversations affected</span>
                  <span>•</span>
                  <span>Detected on {new Date(spotlight.dateDetected).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
