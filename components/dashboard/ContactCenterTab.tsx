'use client';

import { useState } from 'react';
import { colors, spacing, typography } from '@/lib/design-system';
import CallManagementTab from './CallManagementTab';
import OutboundEnrollmentTab from './OutboundEnrollmentTab';
import ConversationIntelligenceTab from './ConversationIntelligenceTabNew';
import AgentPerformanceTab from './AgentPerformanceTab';

export default function ContactCenterTab() {
  const [activeSubTab, setActiveSubTab] = useState('inbound');

  const subTabs = [
    { id: 'inbound', label: 'Inbound Support' },
    { id: 'outbound', label: 'Outbound Enrollment' },
    { id: 'conversations', label: 'Conversations' },
    { id: 'agent-performance', label: 'Agent Performance' }
  ];

  const renderContent = () => {
    switch (activeSubTab) {
      case 'inbound':
        return <CallManagementTab />;
      case 'outbound':
        return <OutboundEnrollmentTab />;
      case 'conversations':
        return <ConversationIntelligenceTab />;
      case 'agent-performance':
        return <AgentPerformanceTab />;
      default:
        return <CallManagementTab />;
    }
  };

  return (
    <div>
      {/* Sub-tab Navigation */}
      <div className="bg-white border-b" style={{ borderColor: colors.neutral[200] }}>
        <div style={{ padding: `0 ${spacing[6]}`, display: 'flex', gap: spacing[1] }}>
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className="transition-colors"
              style={{
                padding: `${spacing[3]} ${spacing[4]}`,
                fontSize: typography.fontSize.sm,
                fontWeight: activeSubTab === tab.id ? typography.fontWeight.medium : typography.fontWeight.normal,
                color: activeSubTab === tab.id ? colors.primary[600] : colors.neutral[600],
                borderBottom: activeSubTab === tab.id ? `2px solid ${colors.primary[600]}` : '2px solid transparent',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                if (activeSubTab !== tab.id) {
                  e.currentTarget.style.color = colors.neutral[900];
                }
              }}
              onMouseLeave={(e) => {
                if (activeSubTab !== tab.id) {
                  e.currentTarget.style.color = colors.neutral[600];
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
}
