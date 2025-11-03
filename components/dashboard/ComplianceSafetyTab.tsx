'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock, TrendingUp, TrendingDown, FileText, Phone, Activity, Bell, AlertOctagon } from 'lucide-react';
import { colors, spacing, typography } from '@/lib/design-system';

export default function ComplianceSafetyTab() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Mock adverse event data
  const adverseEvents = [
    {
      id: 'AE-1001',
      severity: 'serious',
      eventType: 'Severe Injection Site Reaction',
      patientId: 'P-4567',
      reportedDate: '2024-01-15',
      status: 'reported',
      daysToReport: 2,
      description: 'Patient reported severe swelling and redness at injection site lasting >72 hours',
      actionTaken: 'Reported to FDA MedWatch within 24 hours. Patient education provided.',
      followUpRequired: true
    },
    {
      id: 'AE-1002',
      severity: 'moderate',
      eventType: 'Allergic Reaction',
      patientId: 'P-3421',
      reportedDate: '2024-01-14',
      status: 'under-review',
      daysToReport: 1,
      description: 'Patient experienced hives and itching within 2 hours of administration',
      actionTaken: 'Case under medical review. Patient advised to discontinue pending physician consult.',
      followUpRequired: true
    },
    {
      id: 'AE-1003',
      severity: 'moderate',
      eventType: 'Nausea/Vomiting',
      patientId: 'P-7890',
      reportedDate: '2024-01-13',
      status: 'reported',
      daysToReport: 3,
      description: 'Persistent nausea and vomiting for 48 hours post-injection',
      actionTaken: 'Reported to pharmacovigilance. Symptomatic treatment recommended.',
      followUpRequired: false
    },
    {
      id: 'AE-1004',
      severity: 'mild',
      eventType: 'Headache',
      patientId: 'P-2345',
      reportedDate: '2024-01-12',
      status: 'documented',
      daysToReport: 1,
      description: 'Mild headache lasting 6 hours, resolved with OTC medication',
      actionTaken: 'Documented in patient record. No regulatory reporting required.',
      followUpRequired: false
    }
  ];

  const safetyMetrics = [
    { label: 'Total Adverse Events (30d)', value: '47', change: '-8%', trend: 'down' },
    { label: 'Serious AEs', value: '3', change: '0', trend: 'stable' },
    { label: 'Avg Time to Report', value: '1.8 days', change: '-0.4d', trend: 'down' },
    { label: 'Compliance Score', value: '97%', change: '+2%', trend: 'up' }
  ];

  const safetySignals = [
    { signal: 'Injection Site Reactions', mentions: 47, trend: '+12%', severity: 'moderate', threshold: 'Normal range' },
    { signal: 'Nausea/GI Issues', mentions: 23, trend: '-5%', severity: 'mild', threshold: 'Normal range' },
    { signal: 'Headache', mentions: 18, trend: '+3%', severity: 'mild', threshold: 'Normal range' },
    { signal: 'Allergic Reactions', mentions: 6, trend: '+50%', severity: 'serious', threshold: 'Above baseline' },
    { signal: 'Dizziness', mentions: 12, trend: '-15%', severity: 'mild', threshold: 'Normal range' }
  ];

  const complianceChecks = [
    { category: 'HIPAA Compliance', score: 98, issues: 2, lastAudit: '7 days ago', status: 'pass' },
    { category: 'Adverse Event Reporting', score: 96, issues: 3, lastAudit: '3 days ago', status: 'pass' },
    { category: 'Call Recording Consent', score: 100, issues: 0, lastAudit: '2 days ago', status: 'pass' },
    { category: 'Medical Information Standards', score: 94, issues: 5, lastAudit: '5 days ago', status: 'warning' },
    { category: 'Off-Label Discussion Monitoring', score: 99, issues: 1, lastAudit: '1 day ago', status: 'pass' }
  ];

  const productComplaints = [
    { complaint: 'Autoinjector Malfunction', count: 8, trend: '+60%', severity: 'high', reportingRequired: true },
    { complaint: 'Packaging Damage', count: 12, trend: '+20%', severity: 'medium', reportingRequired: true },
    { complaint: 'Missing Components', count: 4, trend: '-25%', severity: 'medium', reportingRequired: true },
    { complaint: 'Product Appearance Issue', count: 3, trend: '0%', severity: 'low', reportingRequired: false }
  ];

  const reportingTimelines = [
    { type: 'Serious AEs (FDA)', timeline: '15 days', compliance: 100, avgTime: '2.1 days' },
    { type: 'Non-Serious AEs', timeline: '90 days', compliance: 98, avgTime: '8.3 days' },
    { type: 'Product Complaints', timeline: '7 days', compliance: 95, avgTime: '3.2 days' },
    { type: 'Safety Signal Review', timeline: 'Monthly', compliance: 100, avgTime: 'On schedule' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'serious': return colors.status.error;
      case 'moderate': return colors.status.warning;
      case 'high': return colors.status.warning;
      case 'medium': return colors.neutral[600];
      default: return colors.neutral[500];
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case 'serious': return colors.status.errorBg;
      case 'moderate': return colors.status.warningBg;
      case 'high': return colors.status.warningBg;
      case 'medium': return colors.neutral[100];
      default: return colors.neutral[50];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return colors.status.success;
      case 'warning': return colors.status.warning;
      case 'fail': return colors.status.error;
      default: return colors.neutral[600];
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'pass': return colors.status.successBg;
      case 'warning': return colors.status.warningBg;
      case 'fail': return colors.status.errorBg;
      default: return colors.neutral[100];
    }
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return colors.status.success;
      case 'under-review': return colors.status.warning;
      case 'documented': return colors.neutral[600];
      default: return colors.neutral[500];
    }
  };

  return (
    <div style={{ padding: spacing[6], backgroundColor: colors.background.page, display: 'flex', flexDirection: 'column', gap: spacing[6] }}>
      {/* Header */}
      <div>
        <h1 className="text-neutral-900" style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
          Compliance & Safety Monitoring
        </h1>
        <p className="text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>
          Adverse event detection, regulatory compliance tracking, and safety signal monitoring
        </p>
      </div>

      {/* Safety Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: spacing[4] }}>
        {safetyMetrics.map((metric, index) => (
          <div key={index} className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
            <div className="text-neutral-500" style={{ fontSize: typography.fontSize.xs, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing[1] }}>
              {metric.label}
            </div>
            <div className="flex items-baseline" style={{ gap: spacing[2], marginBottom: spacing[1] }}>
              <div className="text-neutral-900" style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold }}>
                {metric.value}
              </div>
              {metric.trend !== 'stable' && (
                <div className="flex items-center" style={{
                  gap: spacing[1],
                  fontSize: typography.fontSize.sm,
                  color: metric.trend === 'down' ? colors.status.success : colors.status.error
                }}>
                  {metric.trend === 'down' ? <TrendingDown style={{ width: '16px', height: '16px' }} /> : <TrendingUp style={{ width: '16px', height: '16px' }} />}
                  {metric.change}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Adverse Events */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <div className="flex items-center justify-between" style={{ marginBottom: spacing[4] }}>
          <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>
            Recent Adverse Events
          </h2>
          <button className="border border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded transition-colors"
                  style={{ padding: `${spacing[2]} ${spacing[3]}`, fontSize: typography.fontSize.sm }}>
            View All Events
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {adverseEvents.map((event) => (
            <div key={event.id}
                 className="border border-neutral-200 rounded-md hover:border-neutral-300 transition-colors cursor-pointer"
                 style={{ padding: spacing[4] }}
                 onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}>
              <div className="flex items-start justify-between" style={{ marginBottom: spacing[2] }}>
                <div style={{ flex: 1 }}>
                  <div className="flex items-center flex-wrap" style={{ gap: spacing[2], marginBottom: spacing[2] }}>
                    <span className="rounded" style={{
                      padding: `2px ${spacing[2]}`,
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.medium,
                      textTransform: 'uppercase',
                      backgroundColor: getSeverityBgColor(event.severity),
                      color: getSeverityColor(event.severity)
                    }}>
                      {event.severity}
                    </span>
                    <h3 className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold }}>
                      {event.eventType}
                    </h3>
                    <span className="text-neutral-500" style={{ fontSize: typography.fontSize.sm }}>
                      {event.id}
                    </span>
                    <span className="rounded" style={{
                      padding: `2px ${spacing[2]}`,
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.medium,
                      backgroundColor: getEventStatusColor(event.status) === colors.status.success ? colors.status.successBg :
                                      getEventStatusColor(event.status) === colors.status.warning ? colors.status.warningBg : colors.neutral[100],
                      color: getEventStatusColor(event.status)
                    }}>
                      {event.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center" style={{ gap: spacing[4] }}>
                    <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                      Patient: {event.patientId}
                    </span>
                    <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                      Reported: {event.reportedDate}
                    </span>
                    <span className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                      <Clock style={{ width: '14px', height: '14px', display: 'inline', marginRight: '4px' }} />
                      {event.daysToReport} days to report
                    </span>
                    {event.followUpRequired && (
                      <span className="rounded" style={{
                        padding: `2px ${spacing[2]}`,
                        fontSize: typography.fontSize.xs,
                        backgroundColor: colors.status.warningBg,
                        color: colors.status.warning
                      }}>
                        Follow-up required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {selectedEvent === event.id && (
                <div className="border-t border-neutral-200" style={{ paddingTop: spacing[3], marginTop: spacing[3] }}>
                  <div style={{ marginBottom: spacing[3] }}>
                    <div className="text-neutral-700" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, marginBottom: spacing[1] }}>
                      Description:
                    </div>
                    <div className="text-neutral-900" style={{ fontSize: typography.fontSize.sm }}>
                      {event.description}
                    </div>
                  </div>
                  <div className="bg-neutral-50 border border-neutral-200 rounded" style={{ padding: spacing[3] }}>
                    <div className="text-neutral-700" style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, marginBottom: spacing[1] }}>
                      Action Taken:
                    </div>
                    <div className="text-neutral-900" style={{ fontSize: typography.fontSize.sm }}>
                      {event.actionTaken}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Safety Signals */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Safety Signal Tracking
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {safetySignals.map((signal, index) => (
            <div key={index} className="flex items-center justify-between" style={{ paddingBottom: spacing[3], borderBottom: index < safetySignals.length - 1 ? `1px solid ${colors.neutral[200]}` : 'none' }}>
              <div className="flex items-center" style={{ gap: spacing[3], flex: 1 }}>
                <AlertTriangle style={{ width: '16px', height: '16px', color: getSeverityColor(signal.severity) }} />
                <div>
                  <div className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium }}>
                    {signal.signal}
                  </div>
                  <div className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                    {signal.mentions} mentions • {signal.threshold}
                  </div>
                </div>
              </div>
              <div className="flex items-center" style={{ gap: spacing[3] }}>
                <span style={{
                  fontSize: typography.fontSize.sm,
                  color: signal.trend.startsWith('+') ? colors.status.error : colors.status.success
                }}>
                  {signal.trend}
                </span>
                <span className="rounded" style={{
                  padding: `2px ${spacing[2]}`,
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.medium,
                  textTransform: 'uppercase',
                  backgroundColor: getSeverityBgColor(signal.severity),
                  color: getSeverityColor(signal.severity)
                }}>
                  {signal.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Checks */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Regulatory Compliance Monitoring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: spacing[4] }}>
          {complianceChecks.map((check, index) => (
            <div key={index} className="border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
              <div className="flex items-start justify-between" style={{ marginBottom: spacing[3] }}>
                <div>
                  <div className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
                    {check.category}
                  </div>
                  <div className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                    Last audit: {check.lastAudit}
                  </div>
                </div>
                <span className="rounded" style={{
                  padding: `${spacing[1]} ${spacing[2]}`,
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.medium,
                  textTransform: 'uppercase',
                  backgroundColor: getStatusBgColor(check.status),
                  color: getStatusColor(check.status)
                }}>
                  {check.status}
                </span>
              </div>
              <div className="flex items-center justify-between" style={{ marginBottom: spacing[2] }}>
                <div style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold, color: getStatusColor(check.status) }}>
                  {check.score}%
                </div>
                <div className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                  {check.issues} {check.issues === 1 ? 'issue' : 'issues'}
                </div>
              </div>
              <div className="bg-neutral-200 rounded-full" style={{ height: '6px' }}>
                <div className="rounded-full" style={{
                  height: '100%',
                  width: `${check.score}%`,
                  backgroundColor: getStatusColor(check.status)
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Complaints */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Product Quality Complaints
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {productComplaints.map((complaint, index) => (
            <div key={index} className="border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center" style={{ gap: spacing[3], flex: 1 }}>
                  <AlertOctagon style={{ width: '16px', height: '16px', color: getSeverityColor(complaint.severity) }} />
                  <div>
                    <div className="flex items-center" style={{ gap: spacing[2] }}>
                      <span className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium }}>
                        {complaint.complaint}
                      </span>
                      {complaint.reportingRequired && (
                        <span className="rounded" style={{
                          padding: `2px ${spacing[2]}`,
                          fontSize: typography.fontSize.xs,
                          backgroundColor: colors.status.infoBg,
                          color: colors.status.info
                        }}>
                          Reporting required
                        </span>
                      )}
                    </div>
                    <div className="text-neutral-600" style={{ fontSize: typography.fontSize.sm, marginTop: spacing[1] }}>
                      {complaint.count} complaints
                    </div>
                  </div>
                </div>
                <div className="flex items-center" style={{ gap: spacing[2] }}>
                  <span style={{
                    fontSize: typography.fontSize.sm,
                    color: complaint.trend.startsWith('+') ? colors.status.error : complaint.trend.startsWith('-') ? colors.status.success : colors.neutral[600]
                  }}>
                    {complaint.trend}
                  </span>
                  <span className="rounded" style={{
                    padding: `2px ${spacing[2]}`,
                    fontSize: typography.fontSize.xs,
                    fontWeight: typography.fontWeight.medium,
                    textTransform: 'uppercase',
                    backgroundColor: getSeverityBgColor(complaint.severity),
                    color: getSeverityColor(complaint.severity)
                  }}>
                    {complaint.severity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reporting Timelines */}
      <div className="bg-white border border-neutral-200 rounded-md" style={{ padding: spacing[6] }}>
        <h2 className="text-neutral-900" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[4] }}>
          Regulatory Reporting Timelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: spacing[4] }}>
          {reportingTimelines.map((timeline, index) => (
            <div key={index} className="border border-neutral-200 rounded-md" style={{ padding: spacing[4] }}>
              <div className="flex items-start justify-between" style={{ marginBottom: spacing[3] }}>
                <div>
                  <div className="text-neutral-900" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold, marginBottom: spacing[1] }}>
                    {timeline.type}
                  </div>
                  <div className="text-neutral-600" style={{ fontSize: typography.fontSize.sm }}>
                    Required timeline: {timeline.timeline}
                  </div>
                </div>
                <div style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold, color: timeline.compliance >= 95 ? colors.status.success : colors.status.warning }}>
                  {timeline.compliance}%
                </div>
              </div>
              <div className="text-neutral-700" style={{ fontSize: typography.fontSize.sm }}>
                Avg actual time: <span style={{ fontWeight: typography.fontWeight.medium }}>{timeline.avgTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
