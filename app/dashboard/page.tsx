'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import OverviewTab from '@/components/dashboard/OverviewTab'
import PatientsTab from '@/components/dashboard/PatientsTab'
import CallManagementTab from '@/components/dashboard/CallManagementTab'
import OutboundEnrollmentTab from '@/components/dashboard/OutboundEnrollmentTab'
import MedicationEducationTab from '@/components/dashboard/MedicationEducationTab'
import EscalationTab from '@/components/dashboard/EscalationTab'
import IntegrationsTab from '@/components/dashboard/IntegrationsTab'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab onNavigate={setActiveTab} />
      case 'patients':
        return <PatientsTab />
      case 'calls':
        return <CallManagementTab />
      case 'outbound-enrollment':
        return <OutboundEnrollmentTab />
      case 'medication-education':
        return <MedicationEducationTab />
      case 'escalation':
        return <EscalationTab />
      case 'integrations':
        return <IntegrationsTab />
      default:
        return <OverviewTab onNavigate={setActiveTab} />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </DashboardLayout>
  )
}
