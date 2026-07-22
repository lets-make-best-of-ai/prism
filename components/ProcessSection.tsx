'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function ProcessSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      number: '01',
      title: 'Discovery & Assessment',
      description: 'We conduct a comprehensive analysis of your income sources, assets, liabilities, and long-term goals to understand your complete financial picture.',
      duration: '2 Weeks',
      items: ['Income & entity analysis', 'Tax history review', 'Risk assessment', 'Opportunity mapping'],
    },
    {
      number: '02',
      title: 'Strategy Development',
      description: 'Our team designs a customized, multi-year tax and wealth strategy with specific implementation steps, timelines, and expected outcomes.',
      duration: '3 Weeks',
      items: ['Strategy modeling', 'ROI projections', 'Risk mitigation', 'Compliance framework'],
    },
    {
      number: '03',
      title: 'Implementation & Execution',
      description: 'We coordinate with your CPA, attorney, and other advisors to execute the strategy systematically, handling all technical details.',
      duration: 'Ongoing',
      items: ['Entity restructuring', 'Document preparation', 'Advisor coordination', 'Timeline management'],
    },
    {
      number: '04',
      title: 'Monitoring & Optimization',
      description: 'We continuously monitor tax law changes, your business performance, and market conditions to optimize and adjust your strategy year-over-year.',
      duration: 'Continuous',
      items: ['Annual review', 'Law changes tracking', 'Performance analysis', 'Quarterly optimization'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  }

  return (
    <section ref={ref as any} className="relative w-full py-32 sm:py-48 overflow-hidden bg-fintech-surface/30">
      {/* Decorative accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.06 : 0 }}
        transition={{ duration: 1.2 }}
        className="absolute top-1/4 -left-40 w-96 h-96 border border-emerald-primary/10 rounded-full pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20 sm:mb-28"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-text-primary">
            Our Process
            <br />
            <span className="gradient-text">Your Timeline</span>
          </h2>

          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-light">
            Every engagement follows a proven, structured methodology. Transparency and measurable progress at every stage.
          </p>
        </motion.div>

        {/* Process steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="space-y-8 sm:space-y-10"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group"
            >
              {/* Connector line (except last) */}
              {idx < steps.length - 1 && (
                <div className="h-16 mb-8 hidden sm:block relative">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.15 }}
                    className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-emerald-primary/30 to-emerald-primary/0 origin-top"
                  />
                </div>
              )}

              {/* Step card */}
              <div className="fintech-card p-10 sm:p-12 rounded-2xl border border-fintech-border hover:border-emerald-primary/30 transition-all duration-300">
                <div className="grid md:grid-cols-5 gap-8 sm:gap-10 items-start">
                  {/* Number & duration */}
                  <div className="md:col-span-1">
                    <div className="mb-6">
                      <p className="text-6xl sm:text-7xl font-bold gradient-text opacity-30 leading-none">
                        {step.number}
                      </p>
                    </div>
                    <div className="inline-block px-4 py-2 rounded-lg bg-fintech-surface border border-fintech-border">
                      <p className="text-xs font-semibold text-emerald-primary uppercase tracking-wider">
                        {step.duration}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-4">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-text-primary leading-tight">
                      {step.title}
                    </h3>

                    <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 font-light">
                      {step.description}
                    </p>

                    {/* Items list */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {step.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-start gap-3 text-sm sm:text-base text-text-secondary"
                        >
                          <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-primary flex-shrink-0 mt-2" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom emphasis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 sm:mt-28 p-10 sm:p-12 rounded-2xl border border-emerald-primary/20 bg-emerald-primary/5"
        >
          <p className="text-lg sm:text-xl text-text-primary leading-relaxed font-light text-center">
            Throughout this entire process, you maintain complete transparency and control. We provide quarterly reports, discuss every decision, and adjust strategies as your situation evolves.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
