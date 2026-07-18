'use client'

import { useState } from 'react'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  return (
    <section id="cta" className="relative py-24 sm:py-32">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="card-glass p-8 sm:p-12 rounded-2xl border-2 border-prism-emerald/30 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Your Wealth.
              <br />
              <span className="gradient-text">Your Rules.</span>
            </h2>

            <p className="text-lg text-prism-gray mb-8 max-w-2xl mx-auto">
              Stop leaving money on the table. Schedule a confidential consultation with our tax strategists and discover how much you can legitimately save.
            </p>

            {submitted ? (
              <div className="mb-8 p-4 bg-prism-emerald/20 border border-prism-emerald rounded-lg">
                <p className="text-prism-emerald font-semibold">
                  ✓ Thank you! We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-lg bg-prism-navy/50 border border-white/10
                      text-white placeholder-prism-gray focus:outline-none focus:border-prism-emerald
                      focus:ring-2 focus:ring-prism-emerald/30 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-lg font-bold transition-all duration-300
                      bg-gradient-to-r from-prism-emerald to-prism-gold text-prism-dark
                      hover:shadow-glow hover:scale-105 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'Scheduling...' : 'Book Session'}
                  </button>
                </div>
              </form>
            )}

            <button
              onClick={() => window.open('tel:+1-555-0100')}
              className="inline-flex items-center gap-2 text-prism-emerald hover:text-prism-gold transition-colors"
            >
              <span>Or call us directly</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <p className="text-xs text-prism-gray mt-6">
              We respect your privacy. Your information is secure and will only be used to schedule your consultation.
            </p>
          </div>

          {/* Additional trust signals */}
          <div className="grid sm:grid-cols-3 gap-6 mt-16 text-center">
            {[
              { stat: '500+', label: 'Clients Served' },
              { stat: '$2B+', label: 'Tax Savings Unlocked' },
              { stat: '20+', label: 'Years Experience' },
            ].map((item, idx) => (
              <div key={idx} className="card-glass p-6 rounded-lg">
                <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{item.stat}</p>
                <p className="text-prism-gray text-sm uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
