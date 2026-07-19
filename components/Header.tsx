'use client'

import { useState, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'

const ThemeToggle = lazy(() => import('./ThemeToggle'))

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-prism-navy/80 border-b border-white/10">
      <nav className="section-container flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="text-2xl font-bold tracking-tight">
            <span className="gradient-text">Prism</span>
            <span className="text-white ml-2">Equity</span>
          </div>
        </motion.div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-4">
          <Suspense fallback={<div className="w-9 h-9" />}>
            <ThemeToggle />
          </Suspense>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('cta')}
            className="px-6 py-2.5 rounded-lg font-semibold transition-all duration-300
              bg-gradient-to-r from-prism-emerald to-prism-gold text-prism-dark
              hover:shadow-glow"
          >
            Book Strategy Session
          </motion.button>
        </div>

        {/* Mobile menu button & theme toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Suspense fallback={<div className="w-9 h-9" />}>
            <ThemeToggle />
          </Suspense>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-prism-emerald hover:text-prism-gold transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-t border-white/10 bg-prism-navy/95 px-4 py-4"
        >
          <button
            onClick={() => scrollToSection('cta')}
            className="w-full px-6 py-2.5 rounded-lg font-semibold
              bg-gradient-to-r from-prism-emerald to-prism-gold text-prism-dark
              hover:shadow-glow transition-all"
          >
            Book Strategy Session
          </button>
        </motion.div>
      )}
    </header>
  )
}
