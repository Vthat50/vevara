import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ProblemStatement from '@/components/ProblemStatement'
import Features from '@/components/Features'
import Dashboard from '@/components/Dashboard'
import Analytics from '@/components/Analytics'
import WhyNow from '@/components/WhyNow'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <ProblemStatement />
      <Features />
      <Dashboard />
      <Analytics />
      <WhyNow />
      <CTA />
      <Footer />
    </main>
  )
}
