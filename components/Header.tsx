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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-fintech-canvas/95 border-b border-fintech-border">
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="text-2xl sm:text-3xl font-bold tracking-tighter">
            <span className="gradient-text">Prism</span>
            <span className="text-text-primary ml-2">Equity</span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <motion.button
            whileHover={{ color: '#10B981' }}
            onClick={() => scrollToSection('solution')}
            className="text-text-secondary hover:text-emerald-primary transition-colors font-medium text-sm"
          >
            Strategy
          </motion.button>
          <motion.button
            whileHover={{ color: '#10B981' }}
            onClick={() => scrollToSection('cta')}
            className="text-text-secondary hover:text-emerald-primary transition-colors font-medium text-sm"
          >
            Process
          </motion.button>
          <Suspense fallback={<div className="w-9 h-9" />}>
            <ThemeToggle />
          </Suspense>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={() => scrollToSection('cta')}
            className="px-6 py-2.5 rounded-xl font-semibold text-sm
              bg-emerald-primary hover:bg-emerald-hover text-white
              transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Book Session
          </motion.button>
        </div>

        {/* Mobile menu button & theme toggle */}
        <div className="md:hidden flex items-center gap-3">
          <Suspense fallback={<div className="w-9 h-9" />}>
            <ThemeToggle />
          </Suspense>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-emerald-primary hover:text-emerald-hover transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t border-fintech-border bg-fintech-canvas px-4 py-6 space-y-4"
        >
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => scrollToSection('solution')}
            className="block w-full text-left px-4 py-3 text-text-primary hover:text-emerald-primary transition-colors font-medium"
          >
            Strategy
          </motion.button>
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => scrollToSection('cta')}
            className="block w-full text-left px-4 py-3 text-text-primary hover:text-emerald-primary transition-colors font-medium"
          >
            Process
          </motion.button>
          <button
            onClick={() => scrollToSection('cta')}
            className="w-full px-6 py-3 rounded-xl font-semibold
              bg-emerald-primary hover:bg-emerald-hover text-white
              transition-all"
          >
            Book Session
          </button>
        </motion.div>
      )}
    </header>
  )
}
