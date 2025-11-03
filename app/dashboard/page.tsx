'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import UnifiedDashboardTab from '@/components/dashboard/UnifiedDashboardTab'
import PatientOperationsTab from '@/components/dashboard/PatientOperationsTab'
import AccessReimbursementTab from '@/components/dashboard/AccessReimbursementTab'
import ContactCenterTab from '@/components/dashboard/ContactCenterTab'
import IntelligenceTab from '@/components/dashboard/IntelligenceTab'
import ComplianceSafetyTab from '@/components/dashboard/ComplianceSafetyTab'

function DashboardContent() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(tabParam || 'dashboard')

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <UnifiedDashboardTab onNavigate={setActiveTab} />
      case 'patient-operations':
        return <PatientOperationsTab onNavigate={setActiveTab} />
      case 'access-reimbursement':
        return <AccessReimbursementTab />
      case 'contact-center':
        return <ContactCenterTab />
      case 'intelligence':
        return <IntelligenceTab onNavigate={setActiveTab} />
      case 'compliance-safety':
        return <ComplianceSafetyTab />
      default:
        return <UnifiedDashboardTab onNavigate={setActiveTab} />
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
