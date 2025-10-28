'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, AlertCircle, Phone, Users, Zap } from 'lucide-react'
import Card from '@/components/Card'
import Button from '@/components/Button'

export default function CopayCardCenter() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <div className="space-y-6">
      {/* Before vs After */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-red-50 border-2 border-red-200">
          <h3 className="text-xl font-bold text-red-900 mb-4">❌ Traditional Enrollment (3%)</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span>Patients must discover program on their own</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span>Complex forms and eligibility requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span>Separate portal login required</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span>Often find out after paying full price</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span>High abandonment due to sticker shock</span>
            </li>
          </ul>
          <div className="mt-6 p-4 bg-red-100 rounded-lg border border-red-300">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">3%</div>
              <div className="text-sm text-gray-700">Enrollment Rate</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-success/10 border-2 border-success">
          <h3 className="text-xl font-bold text-success mb-4">✓ AI Proactive Enrollment (78%)</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-success font-bold">✓</span>
              <span>AI calls patient within 24 hours automatically</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success font-bold">✓</span>
              <span>Eligibility verified in real-time during call</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success font-bold">✓</span>
              <span>Enrolled in 60 seconds - no forms</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success font-bold">✓</span>
              <span>Savings applied before first prescription</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success font-bold">✓</span>
              <span>Patient saves $95/month immediately</span>
            </li>
          </ul>
          <div className="mt-6 p-4 bg-success/20 rounded-lg border border-success">
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-1">78%</div>
              <div className="text-sm text-gray-700">Enrollment Rate</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Impact Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6 bg-primary/5">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-1">26x</div>
            <div className="text-sm text-gray-600">Better enrollment vs traditional</div>
          </div>
        </Card>

        <Card className="p-6 bg-success/5">
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div className="text-3xl font-bold text-success mb-1">+26%</div>
            <div className="text-sm text-gray-600">Adherence improvement</div>
          </div>
        </Card>

        <Card className="p-6 bg-orange-500/5">
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-1">$1,140</div>
            <div className="text-sm text-gray-600">Avg annual savings/patient</div>
          </div>
        </Card>

        <Card className="p-6 bg-purple-500/5">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">3.8x</div>
            <div className="text-sm text-gray-600">ROI on copay investment</div>
          </div>
        </Card>
      </div>

      {/* How It Works */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How AI Enrollment Works</h2>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <div className="font-bold text-gray-900 mb-2">Prescription Written</div>
            <div className="text-sm text-gray-600">EHR integration detects new prescription instantly</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <div className="font-bold text-gray-900 mb-2">AI Welcome Call</div>
            <div className="text-sm text-gray-600">Within 24 hours, AI calls to onboard patient</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <div className="font-bold text-gray-900 mb-2">Mention Savings</div>
            <div className="text-sm text-gray-600">"Your copay could be $25 instead of $120"</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-primary">4</span>
            </div>
            <div className="font-bold text-gray-900 mb-2">Instant Enrollment</div>
            <div className="text-sm text-gray-600">Real-time eligibility check, enrolled in 60 seconds</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-success" />
            </div>
            <div className="font-bold text-gray-900 mb-2">Immediate Savings</div>
            <div className="text-sm text-gray-600">Patient saves $95/month starting today</div>
          </div>
        </div>
      </Card>

      {/* Demo Section */}
      <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-purple-500/5">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">See It In Action</h2>
        <p className="text-gray-600 mb-6">
          Watch how AI enrolls a patient in a copay program during the welcome call
        </p>
        <Button
          size="lg"
          onClick={() => setShowDemo(!showDemo)}
          className="flex items-center gap-2 mx-auto"
        >
          <Phone className="w-5 h-5" />
          {showDemo ? 'Hide Demo' : 'Play Demo Call'}
        </Button>

        {showDemo && (
          <div className="mt-6 p-6 bg-white rounded-lg border-2 border-primary text-left">
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="bg-primary/10 rounded-lg p-4 max-w-[80%]">
                  <div className="text-xs font-bold text-primary mb-1">AI</div>
                  <div className="text-sm text-gray-900">Hi Maria! This is your Ozempic support assistant. I'm calling to help you get started. Do you have a moment?</div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                  <div className="text-xs font-bold text-gray-700 mb-1">Patient</div>
                  <div className="text-sm text-gray-900">Yes, I have a moment.</div>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-primary/10 rounded-lg p-4 max-w-[80%]">
                  <div className="text-xs font-bold text-primary mb-1">AI</div>
                  <div className="text-sm text-gray-900">Great! Before we discuss your medication, I want to make sure you know about the copay savings program. Without it, your copay would be $120 per month. With the savings card, it's only $25. Would you like me to enroll you right now?</div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                  <div className="text-xs font-bold text-gray-700 mb-1">Patient</div>
                  <div className="text-sm text-gray-900">Oh wow, yes! I didn't know about that.</div>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-success/10 rounded-lg p-4 max-w-[80%] border-2 border-success">
                  <div className="text-xs font-bold text-success mb-1">AI</div>
                  <div className="text-sm text-gray-900">Perfect! I just verified your insurance - you're eligible. You're enrolled! Your savings card is active immediately. You'll save $95 every month.</div>
                </div>
              </div>

              <div className="p-4 bg-success/20 rounded-lg border border-success text-center">
                <div className="font-bold text-success mb-1">✓ Enrollment Complete</div>
                <div className="text-sm text-gray-700">Total time: 60 seconds | Annual savings: $1,140</div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Business Impact */}
      <Card className="p-8 bg-gradient-to-r from-success to-primary text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">The Business Impact</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold mb-3">3% → 78%</div>
            <div className="text-lg opacity-90">Enrollment Rate Improvement</div>
            <div className="text-sm opacity-75 mt-2">26x more patients enrolled</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-3">$2.8M</div>
            <div className="text-lg opacity-90">Additional Revenue per 10K Patients</div>
            <div className="text-sm opacity-75 mt-2">From improved adherence</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-3">81%</div>
            <div className="text-lg opacity-90">Of Patients Want This</div>
            <div className="text-sm opacity-75 mt-2">Believe pharma should help them access care</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
