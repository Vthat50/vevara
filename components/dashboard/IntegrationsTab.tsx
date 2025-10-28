'use client'

import { useState } from 'react'
import { Building2, Shield, Database, CheckCircle, RefreshCw, DollarSign, ArrowRight, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

export default function IntegrationsTab() {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing'>('idle')
  const [expandedIntegration, setExpandedIntegration] = useState<string | null>('brand-hub')

  const handleSync = () => {
    setSyncStatus('syncing')
    setTimeout(() => setSyncStatus('idle'), 2000)
  }

  const toggleIntegration = (integrationId: string) => {
    setExpandedIntegration(expandedIntegration === integrationId ? null : integrationId)
  }

  return (
    <div className="space-y-6">
      {/* Brand Hub Integrations */}
      <Card className="p-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleIntegration('brand-hub')}
        >
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">Brand Hub Integration</h3>
              <p className="text-sm text-gray-600">Pharmaceutical patient support platforms</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-bold text-success">8 Active</div>
              <div className="text-xs text-gray-600">1,247 patients</div>
            </div>
            {expandedIntegration === 'brand-hub' ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {expandedIntegration === 'brand-hub' && (
          <div className="mt-6 space-y-6">
            {/* Data Flow Diagram */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4">Data Flow</h4>
              <div className="grid grid-cols-3 gap-4 items-center">
                {/* Brand Hubs */}
                <div className="bg-white rounded-lg p-4 border-2 border-primary">
                  <div className="text-sm font-bold text-gray-900 mb-2">Brand Hubs</div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Ozempic, Humira</div>
                    <div>Trulicity, Enbrel</div>
                    <div>Stelara, Lantus</div>
                    <div>Victoza, Jardiance</div>
                  </div>
                </div>

                {/* Arrows */}
                <div className="space-y-4">
                  {/* Inbound */}
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-900">Pulls Data In</div>
                      <div className="text-xs text-gray-600">Patient enrollments, eligibility, program rules</div>
                    </div>
                  </div>
                  {/* Outbound */}
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5 text-success" />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-900">Sends Data Out</div>
                      <div className="text-xs text-gray-600">Call outcomes, enrollment status, adherence data</div>
                    </div>
                  </div>
                </div>

                {/* Vevara */}
                <div className="bg-primary rounded-lg p-4 text-white">
                  <div className="text-sm font-bold mb-2">Vevara Voice AI</div>
                  <div className="text-xs space-y-1">
                    <div>342 Active Programs</div>
                    <div>1,247 Total Patients</div>
                    <div>Real-time sync</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connected Brands */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Connected Brand Hubs</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Ozempic Hub</span>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div className="text-xs text-gray-600">289 patients</div>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Humira Hub</span>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div className="text-xs text-gray-600">198 patients</div>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Trulicity Hub</span>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div className="text-xs text-gray-600">156 patients</div>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Enbrel Hub</span>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div className="text-xs text-gray-600">134 patients</div>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Stelara Hub</span>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div className="text-xs text-gray-600">127 patients</div>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Lantus Hub</span>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div className="text-xs text-gray-600">112 patients</div>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Victoza Hub</span>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div className="text-xs text-gray-600">98 patients</div>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Jardiance Hub</span>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div className="text-xs text-gray-600">133 patients</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Pharmacy Integration */}
      <Card className="p-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleIntegration('pharmacy')}
        >
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">Pharmacy Integration</h3>
              <p className="text-sm text-gray-600">Prescription fulfillment networks</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-bold text-success">20+ Systems</div>
              <div className="text-xs text-gray-600">156 requests today</div>
            </div>
            {expandedIntegration === 'pharmacy' ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {expandedIntegration === 'pharmacy' && (
          <div className="mt-6 space-y-6">
            {/* Data Flow Diagram */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4">Data Flow</h4>
              <div className="grid grid-cols-3 gap-4 items-center">
                {/* Pharmacy Networks */}
                <div className="bg-white rounded-lg p-4 border-2 border-primary">
                  <div className="text-sm font-bold text-gray-900 mb-2">Pharmacy Networks</div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>CVS Pharmacy</div>
                    <div>Walgreens</div>
                    <div>Rite Aid</div>
                    <div>+ 17 more systems</div>
                  </div>
                </div>

                {/* Arrows */}
                <div className="space-y-4">
                  {/* Inbound */}
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-900">Pulls Data In</div>
                      <div className="text-xs text-gray-600">Prescription status, fill dates, pickup confirmations</div>
                    </div>
                  </div>
                  {/* Outbound */}
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5 text-success" />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-900">Sends Data Out</div>
                      <div className="text-xs text-gray-600">Refill requests, patient pharmacy preferences</div>
                    </div>
                  </div>
                </div>

                {/* Vevara */}
                <div className="bg-primary rounded-lg p-4 text-white">
                  <div className="text-sm font-bold mb-2">Vevara Voice AI</div>
                  <div className="text-xs space-y-1">
                    <div>156 Requests Today</div>
                    <div>94% Success Rate</div>
                    <div>3.2h Avg Processing</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">156</div>
                <div className="text-sm text-gray-600">Requests Today</div>
              </div>
              <div className="p-4 bg-success/5 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">94%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">3.2h</div>
                <div className="text-sm text-gray-600">Avg Processing</div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Insurance Integration */}
      <Card className="p-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleIntegration('insurance')}
        >
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">Insurance Verification</h3>
              <p className="text-sm text-gray-600">Real-time benefits & eligibility</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-bold text-success">89% Success</div>
              <div className="text-xs text-gray-600">2.4s avg response</div>
            </div>
            {expandedIntegration === 'insurance' ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {expandedIntegration === 'insurance' && (
          <div className="mt-6 space-y-6">
            {/* Data Flow Diagram */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4">Data Flow</h4>
              <div className="grid grid-cols-3 gap-4 items-center">
                {/* Insurance Networks */}
                <div className="bg-white rounded-lg p-4 border-2 border-primary">
                  <div className="text-sm font-bold text-gray-900 mb-2">Insurance Networks</div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Aetna, UHC</div>
                    <div>Medicare, Medicaid</div>
                    <div>BCBS, Cigna</div>
                    <div>Humana, CVS Health</div>
                  </div>
                </div>

                {/* Arrows */}
                <div className="space-y-4">
                  {/* Inbound */}
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-900">Pulls Data In</div>
                      <div className="text-xs text-gray-600">Coverage status, benefits, copay amounts, prior auth status</div>
                    </div>
                  </div>
                  {/* Outbound */}
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5 text-success" />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-900">Sends Data Out</div>
                      <div className="text-xs text-gray-600">Eligibility requests, prior auth submissions</div>
                    </div>
                  </div>
                </div>

                {/* Vevara */}
                <div className="bg-primary rounded-lg p-4 text-white">
                  <div className="text-sm font-bold mb-2">Vevara Voice AI</div>
                  <div className="text-xs space-y-1">
                    <div>89% Success Rate</div>
                    <div>2.4s Verification</div>
                    <div>$47 Avg Copay</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm p-3 bg-success/5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Real-time Benefits Check</span>
              </div>
              <div className="flex items-center gap-2 text-sm p-3 bg-success/5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Copay Calculation</span>
              </div>
              <div className="flex items-center gap-2 text-sm p-3 bg-success/5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Prior Auth Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-sm p-3 bg-success/5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Coverage Alternatives</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">2.4s</div>
                <div className="text-sm text-gray-600">Avg Verification</div>
              </div>
              <div className="p-4 bg-orange-500/5 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">42</div>
                <div className="text-sm text-gray-600">Prior Auths Pending</div>
              </div>
              <div className="p-4 bg-success/5 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">$47</div>
                <div className="text-sm text-gray-600">Avg Copay</div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* CRM Integration */}
      <Card className="p-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleIntegration('crm')}
        >
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">CRM Integration</h3>
              <p className="text-sm text-gray-600">Salesforce • Last sync: 5 min ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={(e) => {
                e.stopPropagation()
                handleSync()
              }}
              disabled={syncStatus === 'syncing'}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
              {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}
            </Button>
            {expandedIntegration === 'crm' ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {expandedIntegration === 'crm' && (
          <div className="mt-6 space-y-6">
            {/* Data Flow Diagram */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4">Data Flow</h4>
              <div className="grid grid-cols-3 gap-4 items-center">
                {/* CRM Systems */}
                <div className="bg-white rounded-lg p-4 border-2 border-primary">
                  <div className="text-sm font-bold text-gray-900 mb-2">CRM Systems</div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Salesforce</div>
                    <div>Veeva CRM</div>
                    <div>Health Cloud</div>
                    <div>Patient databases</div>
                  </div>
                </div>

                {/* Arrows */}
                <div className="space-y-4">
                  {/* Inbound */}
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-900">Pulls Data In</div>
                      <div className="text-xs text-gray-600">Patient records, contact history, campaign lists, field rep notes</div>
                    </div>
                  </div>
                  {/* Outbound */}
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5 text-success" />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-900">Sends Data Out</div>
                      <div className="text-xs text-gray-600">Call transcripts, engagement metrics, enrollment updates, patient feedback</div>
                    </div>
                  </div>
                </div>

                {/* Vevara */}
                <div className="bg-primary rounded-lg p-4 text-white">
                  <div className="text-sm font-bold mb-2">Vevara Voice AI</div>
                  <div className="text-xs space-y-1">
                    <div>1,247 Total Records</div>
                    <div>894 Active Patients</div>
                    <div>Bidirectional sync</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm p-3 bg-success/5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Patient Record Sync</span>
              </div>
              <div className="flex items-center gap-2 text-sm p-3 bg-success/5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Interaction History</span>
              </div>
              <div className="flex items-center gap-2 text-sm p-3 bg-success/5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Segmentation Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm p-3 bg-success/5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Campaign Integration</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">1,247</div>
                <div className="text-sm text-gray-600">Total Records</div>
              </div>
              <div className="p-4 bg-success/5 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">894</div>
                <div className="text-sm text-gray-600">Active Patients</div>
              </div>
              <div className="p-4 bg-purple-500/5 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">78</div>
                <div className="text-sm text-gray-600">Avg Engagement</div>
              </div>
              <div className="p-4 bg-orange-500/5 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-sm text-gray-600">Active Campaigns</div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
