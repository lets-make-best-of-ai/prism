'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TaxCalculator() {
  const [income, setIncome] = useState(500000)
  const [businessType, setBusinessType] = useState('s-corp')
  const [state, setState] = useState('texas')

  const calculateSavings = () => {
    let baseTax = income * 0.37
    let efficiency = 0

    if (businessType === 'llc') efficiency = 0.25
    else if (businessType === 's-corp') efficiency = 0.35
    else if (businessType === 'c-corp') efficiency = 0.30
    else efficiency = 0.15

    const stateMultiplier = state === 'california' ? 0.093 : state === 'texas' ? 0 : 0.05

    const savings = baseTax * efficiency + income * stateMultiplier * 0.4
    return Math.round(savings)
  }

  const savings = calculateSavings()
  const monthlyRecovery = Math.round(savings / 12)
  const formattedIncome = income.toLocaleString()
  const formattedSavings = savings.toLocaleString()

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  }

  const businessTypes = [
    { value: 'llc', label: 'LLC' },
    { value: 's-corp', label: 'S-Corp' },
    { value: 'c-corp', label: 'C-Corp' },
    { value: 'sole', label: 'Sole Proprietor' },
  ]

  const states = [
    { value: 'california', label: 'California (9.3% tax)' },
    { value: 'texas', label: 'Texas (0% tax)' },
    { value: 'florida', label: 'Florida (5.5% avg)' },
    { value: 'new-york', label: 'New York (6.85% tax)' },
  ]

  return (
    <section className="relative w-full py-32 sm:py-48 overflow-hidden">
      {/* Background accent */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute top-1/3 right-0 w-96 h-96 border border-emerald-primary/10 rounded-full pointer-events-none transform translate-x-1/2"
      />

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20 sm:mb-28"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-text-primary">
            See Your
            <br />
            <span className="gradient-text">Tax Savings Potential</span>
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-light">
            Interactive calculator showing real, personalized tax savings based on your income, structure, and location.
          </p>
        </motion.div>

        {/* Calculator grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid lg:grid-cols-2 gap-10 sm:gap-12 max-w-5xl mx-auto"
        >
          {/* Input section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="fintech-card p-10 sm:p-12 rounded-2xl border border-fintech-border"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-10 text-text-primary">
              Your Profile
            </h3>

            <div className="space-y-10">
              {/* Annual Income */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-text-muted font-medium mb-6">
                  Annual Income
                </label>
                <div className="mb-4 p-4 rounded-lg bg-fintech-surface/50">
                  <p className="text-4xl sm:text-5xl font-bold text-emerald-primary">
                    ${formattedIncome}
                  </p>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="50000"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-2 bg-fintech-border rounded-lg appearance-none cursor-pointer accent-emerald-primary"
                />
                <div className="flex justify-between text-xs text-text-muted mt-4 font-medium">
                  <span>$100K</span>
                  <span>$5M</span>
                </div>
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-text-muted font-medium mb-6">
                  Business Structure
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {businessTypes.map((type) => (
                    <motion.button
                      key={type.value}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      onClick={() => setBusinessType(type.value)}
                      className={`p-4 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                        businessType === type.value
                          ? 'bg-emerald-primary text-white shadow-lg'
                          : 'bg-fintech-surface border border-fintech-border text-text-secondary hover:border-emerald-primary/30'
                      }`}
                    >
                      {type.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* State */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-text-muted font-medium mb-6">
                  Operating State
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-4 rounded-xl bg-fintech-surface border border-fintech-border
                    text-text-primary font-semibold
                    focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20
                    transition-all outline-none cursor-pointer"
                >
                  {states.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Results section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8 sm:gap-10"
          >
            {/* Annual savings - premium card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="fintech-card p-10 sm:p-12 rounded-2xl border-2 border-emerald-primary/30 hover:border-emerald-primary/50 transition-all duration-300"
            >
              <p className="text-xs uppercase tracking-widest text-text-muted font-medium mb-4">
                Estimated Annual Savings
              </p>
              <div className="mb-8">
                <p className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text leading-tight">
                  ${formattedSavings}
                </p>
              </div>
              <div className="space-y-4 pt-8 border-t border-fintech-border">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary text-sm">Monthly Recovery</span>
                  <span className="font-bold text-text-primary text-lg">
                    ${monthlyRecovery.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary text-sm">5-Year Cumulative</span>
                  <span className="font-bold text-emerald-primary text-lg">
                    ${(savings * 5).toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Benefits list */}
            <div className="space-y-4">
              {[
                'Based on current tax law & proven strategies',
                'Assumes engaged, ongoing optimization',
                'Results vary by individual situation',
                'Consultation required for final analysis',
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start text-sm text-text-secondary leading-relaxed"
                >
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA button */}
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-auto px-8 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg
                bg-emerald-primary hover:bg-emerald-hover text-white
                transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Discuss Your Strategy
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 text-center text-xs sm:text-sm text-text-muted max-w-2xl mx-auto leading-relaxed font-light"
        >
          This calculator provides estimates for informational purposes only and does not constitute financial or tax advice. Actual results depend on your complete financial situation, applicable tax law, and personalized strategy implementation.
        </motion.p>
      </div>
    </section>
  )
}
