'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Phone,
  Users,
  BarChart3,
  Megaphone,
  Settings,
  LogOut,
  Menu,
  X,
  Database,
  Building2,
  Shield,
  Mic,
  CreditCard,
  Repeat,
  PhoneCall,
  Calendar,
  UserPlus,
  MessageSquare,
  PhoneOutgoing,
  PhoneIncoming,
  BookOpen,
  AlertCircle,
  UserCheck,
  Stethoscope,
  FileCheck,
  FileText,
  Pill,
  Bot
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated')
    if (!isAuth) {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    router.push('/')
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'patients', label: 'Referrals & Intake', icon: FileText },
    { id: 'prior-authorization', label: 'Prior Authorization', icon: FileCheck },
    { id: 'outbound-enrollment', label: 'Copay Assistance', icon: PhoneOutgoing },
    { id: 'calls', label: 'Inbound Support', icon: PhoneIncoming },
    { id: 'medication-adherence', label: 'Medication Adherence', icon: Pill },
    { id: 'generative-engine', label: 'Generative Engine', icon: Bot },
    { id: 'integrations', label: 'Integrations', icon: Database },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          {isSidebarOpen && (
            <h1 className="text-2xl font-bold text-primary">Vevara</h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary border-r-4 border-primary'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium">{tab.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">AD</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
