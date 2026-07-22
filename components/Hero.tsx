'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-32">
      {/* Premium abstract background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Top-left accent */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-primary/5 rounded-full blur-3xl" />
        {/* Bottom-right accent */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-primary/3 rounded-full blur-3xl" />
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-emerald-primary/5 via-transparent to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>

      {/* Elegant geometric accent - top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isLoaded ? 0.08 : 0, scale: isLoaded ? 1 : 0.8 }}
        transition={{ duration: 1.2 }}
        className="absolute top-20 right-20 w-80 h-80 border border-emerald-primary/20 rounded-3xl transform rotate-45 pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main headline - ultra refined */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.15] mb-8 text-text-primary"
          >
            Keep What
            <br />
            <span className="gradient-text">You Earn.</span>
            <br />
            Build What
            <br />
            <span className="gradient-text">You Dream.</span>
          </motion.h1>

          {/* Subheadline - generous spacing */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-12 font-light"
          >
            Aggressive, bulletproof tax strategies designed for high-net-worth individuals and visionary entrepreneurs. We protect your profits and scale your wealth.
          </motion.p>

          {/* Dual-button CTA group - clean separation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          >
            <motion.button
              whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(0, 95, 157, 0.25)' }}
              whileTap={{ y: 0 }}
              onClick={() => scrollToSection('cta')}
              className="px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg
                bg-emerald-primary hover:bg-emerald-hover text-white
                transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              Schedule Your Consultation
            </motion.button>
            <motion.button
              whileHover={{ y: -3, borderColor: 'rgb(0, 95, 157)' }}
              whileTap={{ y: 0 }}
              onClick={() => scrollToSection('solution')}
              className="px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg
                border-2 border-emerald-primary/50 text-emerald-primary
                hover:bg-emerald-primary/10 transition-all duration-300"
            >
              Learn Our Strategy
            </motion.button>
          </motion.div>

          {/* Trust indicators - extensive spacing & premium typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="pt-16 border-t border-fintech-border"
          >
            <p className="text-xs sm:text-sm text-text-muted uppercase tracking-widest font-medium mb-8">
              Trusted By Leading Business Minds
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
              {[
                'Fortune 500 CEOs',
                'Private Equity Founders',
                'C-Suite Executives',
                'Serial Entrepreneurs',
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoaded ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + idx * 0.05 }}
                  className="text-xs sm:text-sm font-semibold text-emerald-primary uppercase tracking-wider"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <svg className="w-6 h-6 text-emerald-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
