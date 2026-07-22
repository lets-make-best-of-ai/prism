'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CaseStudiesSection() {
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

  const caseStudies = [
    {
      type: 'Software CEO',
      challenge: 'High W-2 income with investment portfolio generating significant capital gains',
      solution: 'Multi-entity structure with strategic income deferral and opportunity zone deployment',
      result: '$485K annual tax savings | 6-year wealth compounding = $3.2M preserved',
    },
    {
      type: 'Real Estate Developer',
      challenge: 'Multi-property portfolio with depreciation recapture and state tax exposure',
      solution: 'Cost segregation analysis, 1031 exchange sequencing, and estate planning',
      result: '$720K upfront deductions | 25% effective tax rate reduction',
    },
    {
      type: 'E-Commerce Founder',
      challenge: 'Rapid scaling with complex international revenue and employment structures',
      solution: 'Entity restructuring, IP holding structure, and R&D credit optimization',
      result: '$340K annual savings + $890K R&D tax credits over 3 years',
    },
    {
      type: 'Investment Manager',
      challenge: 'High carried interest, bonus income, and capital gains across multiple funds',
      solution: 'Opportunity funds, personal holding company strategy, and family office setup',
      result: '$1.2M annual savings | 30-year wealth transfer protection',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section ref={ref as any} className="relative w-full py-32 sm:py-48 overflow-hidden">
      {/* Background accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.08 : 0 }}
        transition={{ duration: 1.2 }}
        className="absolute -bottom-40 -left-20 w-96 h-96 border border-emerald-primary/10 rounded-full pointer-events-none"
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
            Results That
            <br />
            <span className="gradient-text">Speak Volumes</span>
          </h2>

          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-light">
            Every strategy is proven. Every result is measurable. Here's what we've delivered for high-net-worth clients across industries.
          </p>
        </motion.div>

        {/* Case studies - timeline style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="space-y-8 sm:space-y-10"
        >
          {caseStudies.map((caseStudy, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ x: 8 }}
              className="fintech-card p-10 sm:p-12 rounded-2xl border border-fintech-border hover:border-emerald-primary/30 hover:bg-fintech-surface transition-all duration-300 group"
            >
              <div className="grid md:grid-cols-4 gap-6 sm:gap-8">
                {/* Type badge */}
                <div className="md:col-span-1">
                  <div className="inline-block px-4 py-2 rounded-lg bg-emerald-primary/10 border border-emerald-primary/30">
                    <p className="text-sm font-semibold text-emerald-primary uppercase tracking-wider">
                      {caseStudy.type}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-3 space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-text-muted font-medium mb-2">
                      The Challenge
                    </p>
                    <p className="text-base sm:text-lg text-text-primary leading-relaxed font-light">
                      {caseStudy.challenge}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-text-muted font-medium mb-2">
                      Our Solution
                    </p>
                    <p className="text-base sm:text-lg text-text-primary leading-relaxed font-light">
                      {caseStudy.solution}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-fintech-border">
                    <p className="text-xs uppercase tracking-widest text-emerald-primary font-semibold mb-3">
                      ✓ The Result
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-emerald-primary leading-relaxed">
                      {caseStudy.result}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 sm:mt-28 text-center"
        >
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 font-light">
            Want to see what we can do for your specific situation?
          </p>
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg
              border-2 border-emerald-primary text-emerald-primary
              hover:bg-emerald-primary/10 transition-all duration-300"
          >
            Schedule Your Free Analysis
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
