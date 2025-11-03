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
  Bot,
  Brain,
  Lightbulb,
  TrendingDown,
  Award,
  Target,
  DollarSign
} from 'lucide-react'
import { colors, spacing, typography, layout } from '@/lib/design-system'

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
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patient-operations', label: 'Patient Operations', icon: Users },
    { id: 'access-reimbursement', label: 'Access & Reimbursement', icon: DollarSign },
    { id: 'contact-center', label: 'Contact Center', icon: PhoneIncoming },
    { id: 'intelligence', label: 'Intelligence', icon: Brain },
    { id: 'compliance-safety', label: 'Compliance & Safety', icon: Shield },
  ]

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.background.page }}>
      {/* Sidebar */}
      <aside
        className="bg-white border-r transition-all duration-300 flex flex-col"
        style={{
          width: isSidebarOpen ? layout.sidebarWidth : '80px',
          borderColor: colors.neutral[200]
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b" style={{ height: layout.headerHeight, padding: `0 ${spacing[6]}`, borderColor: colors.neutral[200] }}>
          {isSidebarOpen && (
            <h1 className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>Vevara</h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hover:bg-neutral-100 rounded transition-colors"
            style={{ padding: spacing[2] }}
          >
            {isSidebarOpen ? <X style={{ width: '20px', height: '20px', color: colors.neutral[600] }} /> : <Menu style={{ width: '20px', height: '20px', color: colors.neutral[600] }} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1" style={{ paddingTop: spacing[6], paddingBottom: spacing[6] }}>
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="w-full flex items-center transition-colors"
                style={{
                  gap: spacing[3],
                  padding: `${spacing[3]} ${spacing[6]}`,
                  backgroundColor: isActive ? colors.neutral[50] : 'transparent',
                  color: isActive ? colors.neutral[900] : colors.neutral[600],
                  borderRight: isActive ? `3px solid ${colors.primary[500]}` : 'none',
                  fontSize: typography.fontSize.sm,
                  fontWeight: isActive ? typography.fontWeight.medium : typography.fontWeight.normal
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = colors.neutral[50]
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <Icon style={{ width: '20px', height: '20px', flexShrink: 0 }} />
                {isSidebarOpen && <span>{tab.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="border-t" style={{ borderColor: colors.neutral[200], padding: spacing[4] }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center rounded transition-colors"
            style={{
              gap: spacing[3],
              padding: `${spacing[3]} ${spacing[4]}`,
              color: colors.neutral[700],
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.status.errorBg
              e.currentTarget.style.color = colors.status.error
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = colors.neutral[700]
            }}
          >
            <LogOut style={{ width: '20px', height: '20px', flexShrink: 0 }} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b flex items-center justify-between" style={{ height: layout.headerHeight, borderColor: colors.neutral[200], padding: `0 ${spacing[8]}` }}>
          <div>
            <h2 className="text-neutral-900 capitalize" style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.semibold }}>
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center" style={{ gap: spacing[4] }}>
            <div className="rounded-full flex items-center justify-center" style={{ width: '40px', height: '40px', backgroundColor: colors.neutral[100] }}>
              <span className="text-neutral-700" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>AD</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div>
          {children}
        </div>
      </main>
    </div>
  )
}
