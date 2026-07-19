'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TaxCalculator() {
  const [income, setIncome] = useState(500000)
  const [businessType, setBusinessType] = useState('llc')
  const [state, setState] = useState('california')

  const calculateSavings = () => {
    let baseTax = income * 0.37
    let efficiency = 0

    if (businessType === 'llc') efficiency = 0.25
    else if (businessType === 's-corp') efficiency = 0.35
    else if (businessType === 'c-corp') efficiency = 0.30

    const stateMultiplier = state === 'california' ? 0.093 : state === 'texas' ? 0 : 0.05

    const savings = baseTax * efficiency + income * stateMultiplier * 0.4
    return Math.round(savings)
  }

  const savings = calculateSavings()
  const monthlyRecovery = Math.round(savings / 12)

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  }

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-prism-dark to-prism-navy/50">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Your Personalized
              <br />
              <span className="gradient-text">Tax Savings Blueprint</span>
            </h2>
            <p className="text-lg text-prism-gray max-w-2xl mx-auto">
              See exactly how much you could save with a custom tax strategy tailored to your business structure and location.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="card-glass p-8 rounded-xl"
            >
              <h3 className="text-xl font-bold mb-6 text-white">Business Profile</h3>

              <div className="space-y-6">
                {/* Annual Income */}
                <motion.div
                  custom={0}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                >
                  <label className="block text-sm font-semibold text-prism-gray mb-3 uppercase tracking-widest">
                    Annual Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-2xl font-bold text-prism-emerald">$</span>
                    <input
                      type="range"
                      min="100000"
                      max="5000000"
                      step="50000"
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                      className="w-full h-2 bg-prism-navy/50 rounded-lg appearance-none cursor-pointer accent-prism-emerald"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-2xl font-bold gradient-text">
                      {income.toLocaleString()}
                    </p>
                    <p className="text-xs text-prism-gray mt-1">Range: $100K - $5M</p>
                  </div>
                </motion.div>

                {/* Business Type */}
                <motion.div
                  custom={1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                >
                  <label className="block text-sm font-semibold text-prism-gray mb-3 uppercase tracking-widest">
                    Business Structure
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'llc', label: 'LLC', icon: '🏢' },
                      { id: 's-corp', label: 'S-Corp', icon: '📊' },
                      { id: 'c-corp', label: 'C-Corp', icon: '🏛️' },
                      { id: 'sole', label: 'Sole Prop', icon: '👤' },
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setBusinessType(type.id)}
                        className={`p-3 rounded-lg font-semibold transition-all duration-300 ${
                          businessType === type.id
                            ? 'bg-prism-emerald text-prism-dark shadow-glow'
                            : 'bg-prism-navy/50 text-white hover:bg-prism-navy/70'
                        }`}
                      >
                        <div className="text-lg mb-1">{type.icon}</div>
                        <div className="text-xs">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* State Selection */}
                <motion.div
                  custom={2}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                >
                  <label className="block text-sm font-semibold text-prism-gray mb-3 uppercase tracking-widest">
                    State of Operation
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-prism-navy/50 border border-white/10
                      text-white focus:outline-none focus:border-prism-emerald focus:ring-2 focus:ring-prism-emerald/30
                      transition-all cursor-pointer"
                  >
                    <option value="california">California (9.3%)</option>
                    <option value="texas">Texas (0%)</option>
                    <option value="florida">Florida (0%)</option>
                    <option value="new-york">New York (6.85%)</option>
                    <option value="other">Other State (5%)</option>
                  </select>
                </motion.div>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-4"
            >
              {/* Main Savings Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="card-glass p-8 rounded-xl border-2 border-prism-emerald/50 hover:border-prism-emerald transition-all cursor-pointer shadow-glow"
              >
                <p className="text-prism-gray text-sm uppercase tracking-widest mb-2">Potential Annual Savings</p>
                <p className="text-5xl sm:text-6xl font-bold gradient-text mb-3">${savings.toLocaleString()}</p>
                <p className="text-prism-gray">
                  That's approximately <span className="text-prism-gold font-bold">${monthlyRecovery.toLocaleString()}/month</span> in your pocket
                </p>
              </motion.div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Tax Efficiency', value: `${Math.round((savings / (income * 0.37)) * 100)}%`, icon: '📈' },
                  { label: 'Annual Return', value: `${((savings / income) * 100).toFixed(1)}%`, icon: '💰' },
                ].map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="card-glass p-4 rounded-lg text-center hover:shadow-glow-gold transition-all"
                  >
                    <div className="text-2xl mb-2">{benefit.icon}</div>
                    <p className="text-xs text-prism-gray uppercase tracking-widest mb-1">{benefit.label}</p>
                    <p className="text-2xl font-bold gradient-text">{benefit.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300
                  bg-gradient-to-r from-prism-emerald to-prism-gold text-prism-dark
                  hover:shadow-glow cursor-pointer"
              >
                Lock In Your Custom Strategy
              </motion.button>

              {/* Disclaimer */}
              <p className="text-xs text-prism-gray text-center italic">
                * This is an estimate. Actual savings depend on your complete financial picture and current tax laws.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
