'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import OverviewTab from '@/components/dashboard/OverviewTab'
import ReferralsIntakeTab from '@/components/dashboard/ReferralsIntakeTab'
import CallManagementTab from '@/components/dashboard/CallManagementTab'
import OutboundEnrollmentTab from '@/components/dashboard/OutboundEnrollmentTab'
import PriorAuthorizationTab from '@/components/dashboard/PriorAuthorizationTab'
import MedicationAdherenceTab from '@/components/dashboard/MedicationAdherenceTab'
import GenerativeEngineTab from '@/components/dashboard/GenerativeEngineTab'
import IntegrationsTab from '@/components/dashboard/IntegrationsTab'

function DashboardContent() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(tabParam || 'overview')

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab onNavigate={setActiveTab} />
      case 'patients':
        return <ReferralsIntakeTab onNavigate={setActiveTab} />
      case 'calls':
        return <CallManagementTab />
      case 'outbound-enrollment':
        return <OutboundEnrollmentTab />
      case 'prior-authorization':
        return <PriorAuthorizationTab onNavigate={setActiveTab} />
      case 'medication-adherence':
        return <MedicationAdherenceTab />
      case 'generative-engine':
        return <GenerativeEngineTab />
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

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
