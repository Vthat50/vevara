'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Vevara
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-700 hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#solutions" className="text-gray-700 hover:text-primary transition-colors">
              Solutions
            </Link>
            <Link href="#dashboard" className="text-gray-700 hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <Link href="/login">
            <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 hover:shadow-lg">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
