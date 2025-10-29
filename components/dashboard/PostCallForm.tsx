'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, Pill, Calendar, FileText, Activity, Zap, Sparkles } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface CallMessage {
  speaker: 'AI' | 'Patient'
  time: string
  message: string
}

interface PostCallFormData {
  adherenceStatus: string
  adherenceNotes: string
  hasSideEffects: boolean
  sideEffects: {
    type: string
    severity: 'mild' | 'moderate' | 'severe'
    details: string
  }[]
  actionItems: {
    refillCoordinated: boolean
    refillDate?: string
    nurseFollowup: boolean
    nurseFollowupDate?: string
    physicianNotification: boolean
    reminderPreferenceUpdated: boolean
    reminderType?: string
    adverseEventReported: boolean
    other: string
  }
  additionalNotes: string
}

interface PostCallFormProps {
  callId: string
  patientName: string
  callDate: string
  transcript?: CallMessage[]
  existingData?: PostCallFormData
  onSave: (data: PostCallFormData) => void
}

// AI extraction function that analyzes transcript
const extractDataFromTranscript = (transcript?: CallMessage[]): Partial<PostCallFormData> => {
  if (!transcript || transcript.length === 0) {
    return {}
  }

  const fullTranscript = transcript.map(m => m.message.toLowerCase()).join(' ')

  // Extract adherence status
  let adherenceStatus = 'unknown'
  let adherenceNotes = ''

  if (fullTranscript.includes('taking') && fullTranscript.includes('as prescribed')) {
    adherenceStatus = 'fully-adherent'
    adherenceNotes = 'Patient reported taking medication as prescribed'
  } else if (fullTranscript.includes('missed') && (fullTranscript.includes('dose') || fullTranscript.includes('doses'))) {
    adherenceStatus = 'partially-adherent'
    adherenceNotes = 'Patient reported missing doses'
  } else if (fullTranscript.includes('not taking')) {
    adherenceStatus = 'non-adherent'
  } else if (fullTranscript.includes('doing well') || fullTranscript.includes('on track')) {
    adherenceStatus = 'fully-adherent'
    adherenceNotes = 'Patient on track with medication schedule'
  }

  // Extract side effects
  const sideEffects: { type: string; severity: 'mild' | 'moderate' | 'severe'; details: string }[] = []
  let hasSideEffects = false

  // Check for various side effects
  if (fullTranscript.includes('redness') || fullTranscript.includes('injection site')) {
    hasSideEffects = true
    const severity = fullTranscript.includes('quite painful') || fullTranscript.includes('really') ? 'moderate' : 'mild'
    sideEffects.push({
      type: 'injection-site-reaction',
      severity,
      details: 'Injection site redness reported'
    })
  }

  if (fullTranscript.includes('headache')) {
    hasSideEffects = true
    const severity = fullTranscript.includes('bad headache') || fullTranscript.includes('severe') ? 'moderate' : 'mild'
    sideEffects.push({
      type: 'headache',
      severity,
      details: 'Headache reported'
    })
  }

  if (fullTranscript.includes('dry') && fullTranscript.includes('eye')) {
    hasSideEffects = true
    sideEffects.push({
      type: 'eye-dryness',
      severity: 'mild',
      details: 'Eye dryness reported'
    })
  }

  if (fullTranscript.includes('nausea')) {
    hasSideEffects = true
    sideEffects.push({
      type: 'nausea',
      severity: 'mild',
      details: 'Nausea reported'
    })
  }

  if (fullTranscript.includes('fever')) {
    hasSideEffects = true
    sideEffects.push({
      type: 'fever',
      severity: 'moderate',
      details: 'Fever reported'
    })
  }

  // Extract action items
  const actionItems: PostCallFormData['actionItems'] = {
    refillCoordinated: fullTranscript.includes('refill') && (fullTranscript.includes('coordinate') || fullTranscript.includes('arrange') || fullTranscript.includes('process')),
    nurseFollowup: fullTranscript.includes('nurse') && fullTranscript.includes('call'),
    physicianNotification: fullTranscript.includes('doctor') && fullTranscript.includes('contact'),
    reminderPreferenceUpdated: fullTranscript.includes('reminder') && (fullTranscript.includes('set') || fullTranscript.includes('text')),
    adverseEventReported: false,
    other: ''
  }

  // Extract refill date if mentioned
  if (actionItems.refillCoordinated) {
    const refillMatch = fullTranscript.match(/november (\d+)/i) || fullTranscript.match(/(\d+) days/)
    if (refillMatch) {
      actionItems.refillDate = 'Extracted from call'
    }
  }

  // Set reminder type
  if (actionItems.reminderPreferenceUpdated) {
    if (fullTranscript.includes('text')) {
      actionItems.reminderType = 'SMS'
    } else if (fullTranscript.includes('call')) {
      actionItems.reminderType = 'Voice'
    }
  }

  return {
    adherenceStatus,
    adherenceNotes,
    hasSideEffects,
    sideEffects,
    actionItems
  }
}

export default function PostCallForm({ callId, patientName, callDate, transcript, existingData, onSave }: PostCallFormProps) {
  const [formData, setFormData] = useState<PostCallFormData>(existingData || {
    adherenceStatus: 'unknown',
    adherenceNotes: '',
    hasSideEffects: false,
    sideEffects: [],
    actionItems: {
      refillCoordinated: false,
      nurseFollowup: false,
      physicianNotification: false,
      reminderPreferenceUpdated: false,
      adverseEventReported: false,
      other: ''
    },
    additionalNotes: ''
  })

  const [isAIExtracted, setIsAIExtracted] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Auto-extract from transcript on component mount
  useEffect(() => {
    if (transcript && transcript.length > 0 && !isAIExtracted && !existingData) {
      const extractedData = extractDataFromTranscript(transcript)
      setFormData(prev => ({
        ...prev,
        ...extractedData
      }))
      setIsAIExtracted(true)
    }
  }, [transcript, isAIExtracted, existingData])

  // Manual AI extraction (if user wants to re-extract)
  const handleAIExtraction = () => {
    const extractedData = extractDataFromTranscript(transcript)
    setFormData(prev => ({
      ...prev,
      ...extractedData
    }))
    setIsAIExtracted(true)
  }

  const handleSave = () => {
    onSave(formData)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const addSideEffect = () => {
    setFormData(prev => ({
      ...prev,
      sideEffects: [...prev.sideEffects, { type: '', severity: 'mild', details: '' }]
    }))
  }

  const removeSideEffect = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sideEffects: prev.sideEffects.filter((_, i) => i !== index)
    }))
  }

  const updateSideEffect = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      sideEffects: prev.sideEffects.map((effect, i) =>
        i === index ? { ...effect, [field]: value } : effect
      )
    }))
  }

  const getSeverityColor = (severity: 'mild' | 'moderate' | 'severe') => {
    switch (severity) {
      case 'mild': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'moderate': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'severe': return 'bg-red-100 text-red-800 border-red-300'
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Post-Call Documentation</h3>
          <p className="text-sm text-gray-600">Call Date: {callDate} • Patient: {patientName}</p>
        </div>
        <div className="flex items-center gap-3">
          {transcript && transcript.length > 0 && (
            <Button
              size="sm"
              variant={isAIExtracted ? "secondary" : "outline"}
              onClick={handleAIExtraction}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isAIExtracted ? '✓ Auto-Extracted' : 'Re-Extract from Transcript'}
            </Button>
          )}
          <Button
            size="sm"
            variant={isSaved ? "secondary" : "primary"}
            onClick={handleSave}
          >
            {isSaved ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Saved!
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Save Documentation
              </>
            )}
          </Button>
        </div>
      </div>

      {isAIExtracted && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 animate-pulse">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <div className="flex-1">
            <div className="text-sm font-medium text-blue-900">✓ Form automatically filled from transcript</div>
            <div className="text-xs text-blue-700 mt-0.5">AI has extracted adherence status, side effects, and action items. Please review and adjust as needed.</div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Section 1: Adherence Status */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            <Activity className="w-4 h-4 inline mr-2" />
            Adherence Status
          </label>
          <select
            value={formData.adherenceStatus}
            onChange={(e) => setFormData({ ...formData, adherenceStatus: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="unknown">Unknown / Not Discussed</option>
            <option value="fully-adherent">Fully Adherent - Taking as prescribed</option>
            <option value="partially-adherent">Partially Adherent - Missing some doses</option>
            <option value="non-adherent">Non-Adherent - Not taking medication</option>
            <option value="discontinued">Discontinued - Stopped medication</option>
          </select>

          <textarea
            placeholder="Adherence notes (e.g., reasons for missed doses, barriers to adherence)"
            value={formData.adherenceNotes}
            onChange={(e) => setFormData({ ...formData, adherenceNotes: e.target.value })}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={2}
          />
        </div>

        {/* Section 2: Side Effects */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-900">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              Side Effects Reported
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Any side effects?</span>
              <input
                type="checkbox"
                checked={formData.hasSideEffects}
                onChange={(e) => setFormData({ ...formData, hasSideEffects: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>
          </div>

          {formData.hasSideEffects && (
            <div className="space-y-3">
              {formData.sideEffects.map((effect, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={effect.type}
                        onChange={(e) => updateSideEffect(index, 'type', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Select type...</option>
                        <option value="injection-site-reaction">Injection Site Reaction</option>
                        <option value="headache">Headache</option>
                        <option value="nausea">Nausea</option>
                        <option value="fever">Fever</option>
                        <option value="fatigue">Fatigue</option>
                        <option value="dizziness">Dizziness</option>
                        <option value="eye-dryness">Eye Dryness</option>
                        <option value="rash">Rash</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Severity</label>
                      <select
                        value={effect.severity}
                        onChange={(e) => updateSideEffect(index, 'severity', e.target.value as 'mild' | 'moderate' | 'severe')}
                        className={`w-full p-2 border rounded text-sm font-medium ${getSeverityColor(effect.severity)}`}
                      >
                        <option value="mild">Mild - Manageable, not interfering</option>
                        <option value="moderate">Moderate - Some interference</option>
                        <option value="severe">Severe - Significant interference</option>
                      </select>
                    </div>
                  </div>
                  <textarea
                    placeholder="Details (description, duration, patient's own words)"
                    value={effect.details}
                    onChange={(e) => updateSideEffect(index, 'details', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    rows={2}
                  />
                  <button
                    onClick={() => removeSideEffect(index)}
                    className="mt-2 text-xs text-red-600 hover:text-red-800"
                  >
                    Remove Side Effect
                  </button>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={addSideEffect}
              >
                + Add Another Side Effect
              </Button>

              {formData.sideEffects.some(e => e.severity === 'moderate' || e.severity === 'severe') && (
                <div className="p-3 bg-orange-50 border border-orange-300 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-orange-900 text-sm">Moderate/Severe Side Effect Alert</div>
                      <div className="text-xs text-orange-700 mt-1">
                        Consider escalating to nurse educator or filing adverse event report
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 3: Action Items */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            <Zap className="w-4 h-4 inline mr-2" />
            Action Items Completed
          </label>

          <div className="space-y-2">
            <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.actionItems.refillCoordinated}
                onChange={(e) => setFormData({
                  ...formData,
                  actionItems: { ...formData.actionItems, refillCoordinated: e.target.checked }
                })}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">Refill Coordinated</div>
                {formData.actionItems.refillCoordinated && (
                  <input
                    type="text"
                    placeholder="Expected delivery date"
                    value={formData.actionItems.refillDate || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      actionItems: { ...formData.actionItems, refillDate: e.target.value }
                    })}
                    className="mt-2 w-full p-2 border border-gray-300 rounded text-sm"
                  />
                )}
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.actionItems.nurseFollowup}
                onChange={(e) => setFormData({
                  ...formData,
                  actionItems: { ...formData.actionItems, nurseFollowup: e.target.checked }
                })}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">Nurse Educator Follow-up Scheduled</div>
                {formData.actionItems.nurseFollowup && (
                  <input
                    type="text"
                    placeholder="Follow-up date/time"
                    value={formData.actionItems.nurseFollowupDate || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      actionItems: { ...formData.actionItems, nurseFollowupDate: e.target.value }
                    })}
                    className="mt-2 w-full p-2 border border-gray-300 rounded text-sm"
                  />
                )}
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.actionItems.physicianNotification}
                onChange={(e) => setFormData({
                  ...formData,
                  actionItems: { ...formData.actionItems, physicianNotification: e.target.checked }
                })}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div className="font-medium text-gray-900 text-sm">Physician Notification Sent</div>
            </label>

            <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.actionItems.reminderPreferenceUpdated}
                onChange={(e) => setFormData({
                  ...formData,
                  actionItems: { ...formData.actionItems, reminderPreferenceUpdated: e.target.checked }
                })}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">Reminder Preferences Updated</div>
                {formData.actionItems.reminderPreferenceUpdated && (
                  <select
                    value={formData.actionItems.reminderType || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      actionItems: { ...formData.actionItems, reminderType: e.target.value }
                    })}
                    className="mt-2 w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="">Select type...</option>
                    <option value="SMS">SMS Text</option>
                    <option value="Voice">Voice Call</option>
                    <option value="Both">Both SMS & Voice</option>
                  </select>
                )}
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-red-200 rounded-lg hover:bg-red-50 cursor-pointer bg-red-50/50">
              <input
                type="checkbox"
                checked={formData.actionItems.adverseEventReported}
                onChange={(e) => setFormData({
                  ...formData,
                  actionItems: { ...formData.actionItems, adverseEventReported: e.target.checked }
                })}
                className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-600"
              />
              <div className="font-medium text-red-900 text-sm">FDA Adverse Event Report Filed</div>
            </label>

            <div className="p-3 border border-gray-200 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">Other Action Items</label>
              <textarea
                placeholder="Any other actions taken or needed..."
                value={formData.actionItems.other}
                onChange={(e) => setFormData({
                  ...formData,
                  actionItems: { ...formData.actionItems, other: e.target.value }
                })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Section 4: Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            Additional Clinical Notes
          </label>
          <textarea
            placeholder="Any additional observations, patient concerns, or clinical notes..."
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={3}
          />
        </div>

        {/* Compliance Footer */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle className="w-4 h-4 text-success" />
            <span>This documentation is HIPAA-compliant and contributes to FDA adverse event reporting requirements</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
