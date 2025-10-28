'use client'

import { motion } from 'framer-motion'
import { Phone, MessageSquare, Shield, TrendingUp } from 'lucide-react'
import Button from './Button'

export default function Hero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">HIPAA-Compliant Voice AI</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI-Powered Patient Support Platform
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transform medication adherence with intelligent voice AI that provides 24/7 support,
              automated outreach, and personalized patient engagement.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg">
                Schedule Demo
              </Button>
              <Button variant="outline" size="lg">
                View Dashboard
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">99%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">&lt;1s</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-gray-600">Availability</div>
              </div>
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              {/* Mock AI conversation interface */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">AI Assistant</div>
                    <div className="text-xs text-success flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-success rounded-full" />
                      Active Call
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4 rounded-tl-none">
                    <p className="text-sm text-gray-700">
                      Hi Sarah! This is a reminder to take your medication today. How are you feeling?
                    </p>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-4 rounded-tr-none ml-8">
                    <p className="text-sm text-gray-700">
                      I'm feeling good, but I had some questions about side effects.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 rounded-tl-none">
                    <p className="text-sm text-gray-700">
                      I'd be happy to help! What specific side effects are you experiencing?
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button className="flex items-center gap-2 justify-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <MessageSquare className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Escalate</span>
                  </button>
                  <button className="flex items-center gap-2 justify-center px-4 py-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary">Analytics</span>
                  </button>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-success text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">HIPAA Compliant</span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
