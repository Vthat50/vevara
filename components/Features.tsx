'use client'

import { motion } from 'framer-motion'
import {
  Phone,
  PhoneCall,
  MessageCircle,
  GraduationCap,
  CreditCard,
  Activity,
  Users
} from 'lucide-react'
import FeatureCard from './FeatureCard'

export default function Features() {
  const features = [
    {
      icon: MessageCircle,
      title: 'Conversational AI Engine',
      description: 'Natural language understanding with <1 second response time and 99% medical accuracy. Context-aware responses based on patient history.',
    },
    {
      icon: PhoneCall,
      title: 'Outbound Call Automation',
      description: 'Automated welcome calls, refill reminders, and side effect check-ins. Smart scheduling based on patient behavior patterns.',
    },
    {
      icon: Phone,
      title: 'Inbound Call Handling',
      description: '24/7 availability with intelligent routing. Patient authentication via voice biometrics and seamless human escalation.',
    },
    {
      icon: GraduationCap,
      title: 'Medication Education Q&A',
      description: 'Interactive guidance for medication administration, dosing schedules, side effects, and when to seek medical attention.',
    },
    {
      icon: CreditCard,
      title: 'Copay Card Enrollment',
      description: 'Real-time eligibility checking and automated enrollment workflow. Plain language benefit explanations with SMS confirmation.',
    },
    {
      icon: Activity,
      title: 'Side Effect Monitoring',
      description: 'Structured check-ins with severity assessment. Red flag detection for severe reactions with automatic escalation.',
    },
    {
      icon: Users,
      title: 'Human Escalation',
      description: 'Seamless warm transfer to live agents with full context. Average wait time under 60 seconds with quality assurance.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="features" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-medium text-primary">CORE CAPABILITIES</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive Patient Support
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered voice technology that handles every aspect of patient engagement,
            from initial onboarding to ongoing medication adherence support.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>

        {/* Integration callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white rounded-2xl border border-gray-200 p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Seamless Integration
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Connect with your existing pharmacy systems, insurance verification,
                and CRM platforms. HIPAA-compliant with end-to-end encryption.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                  CVS
                </div>
                <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                  Walgreens
                </div>
                <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                  Salesforce
                </div>
                <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                  Veeva
                </div>
                <div className="px-4 py-2 bg-primary/10 rounded-lg text-sm font-medium text-primary">
                  +20 more
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
                <div className="text-3xl font-bold text-primary mb-2">30+</div>
                <div className="text-sm text-gray-700">Medication Topics</div>
              </div>
              <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-lg p-6">
                <div className="text-3xl font-bold text-success mb-2">100%</div>
                <div className="text-sm text-gray-700">Call Recording</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-lg p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
                <div className="text-sm text-gray-700">Languages</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">FDA</div>
                <div className="text-sm text-gray-700">PDURS Compliant</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
