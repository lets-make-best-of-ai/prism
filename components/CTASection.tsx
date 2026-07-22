'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  const stats = [
    { stat: '500+', label: 'Clients Served' },
    { stat: '$2B+', label: 'Tax Savings Unlocked' },
    { stat: '20+', label: 'Years Experience' },
  ]

  return (
    <section id="cta" className="relative w-full py-32 sm:py-48 overflow-hidden">
      {/* Background accents */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 1.2 }}
        className="absolute -bottom-40 -right-20 w-96 h-96 border border-emerald-primary/10 rounded-full pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 1.2 }}
        className="absolute top-1/2 -left-40 w-96 h-96 bg-emerald-primary/3 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Main CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="fintech-card p-12 sm:p-16 lg:p-20 rounded-3xl border border-fintech-border text-center mb-20 sm:mb-28"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-text-primary">
            Your Wealth.
            <br />
            <span className="gradient-text">Your Rules.</span>
          </h2>

          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-12 font-light">
            Stop leaving money on the table. Schedule a confidential consultation with our tax strategists and discover how much you can legitimately save.
          </p>

          {/* Form or success message */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-12 p-6 sm:p-8 bg-emerald-primary/10 border border-emerald-primary/30 rounded-2xl"
            >
              <p className="text-lg sm:text-xl text-emerald-primary font-semibold">
                ✓ Thank you! We'll contact you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mb-12 max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-6 py-4 rounded-xl bg-fintech-surface border border-fintech-border
                    text-text-primary placeholder-text-muted
                    focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20
                    transition-all duration-300 outline-none"
                />
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 sm:px-10 py-4 rounded-full font-semibold text-base sm:text-lg
                    bg-emerald-primary hover:bg-emerald-hover text-white
                    transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                    shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? 'Scheduling...' : 'Book Consultation'}
                </motion.button>
              </div>
            </form>
          )}

          {/* Phone CTA */}
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => window.open('tel:+1-555-0100')}
            className="inline-flex items-center gap-2 text-emerald-primary hover:text-emerald-hover transition-colors font-semibold"
          >
            <span>Prefer to talk? Call</span>
            <span className="text-base sm:text-lg font-bold">1 (555) 0100</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Privacy notice */}
          <p className="text-xs sm:text-sm text-text-muted mt-8 font-light">
            We respect your privacy. Your information is secure and will only be used to schedule your consultation.
          </p>
        </motion.div>

        {/* Trust stats grid - refined spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-8 sm:gap-10 pt-20 sm:pt-28 border-t border-fintech-border"
        >
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-10 sm:p-12 text-center hover:bg-fintech-surface/50 rounded-xl transition-all duration-300"
            >
              <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-4 leading-tight">
                {item.stat}
              </p>
              <p className="text-sm sm:text-base text-text-muted uppercase tracking-widest font-medium">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
