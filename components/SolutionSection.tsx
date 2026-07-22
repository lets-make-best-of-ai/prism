'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function SolutionSection() {
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

  const solutions = [
    {
      number: '01',
      title: 'Strategic Asset Shielding',
      description: 'We dissect your entire operation to identify and legally protect every dollar from unnecessary taxation through optimized structure and timing strategies.',
      details: 'Entity selection, income splitting, timing strategies',
    },
    {
      number: '02',
      title: 'Wealth Compounding & Growth',
      description: 'Tax savings are redirected into high-velocity, equity-building vehicles designed to accelerate net worth multiplication over decades.',
      details: 'Investment optimization, opportunity zones, pass-throughs',
    },
    {
      number: '03',
      title: 'Multi-Generational Legacy Building',
      description: 'We structure your empire to preserve wealth across generations while minimizing estate, gift, and income taxes through advanced planning.',
      details: 'Estate planning, trusts, succession strategies',
    },
  ]

  const benefits = [
    'Legally Bulletproof',
    'Fully Customized',
    'Ongoing Optimization',
    'Measurable Impact',
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
    <section id="solution" ref={ref as any} className="relative w-full py-32 sm:py-48 overflow-hidden">
      {/* Background accents */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.05 : 0 }}
        transition={{ duration: 1.2 }}
        className="absolute -top-40 -left-40 w-96 h-96 border border-emerald-primary/10 rounded-full pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.08 : 0 }}
        transition={{ duration: 1.2 }}
        className="absolute -bottom-20 -right-40 w-80 h-80 bg-emerald-primary/3 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Section header - premium spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20 sm:mb-28"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-text-primary">
            How We Split the Tax Code
            <br />
            <span className="gradient-text">In Your Favor</span>
          </h2>

          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-light">
            Our proprietary framework distills complex tax law into three strategic pillars, each designed to maximize your wealth retention and long-term growth.
          </p>
        </motion.div>

        {/* Solution cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8 sm:gap-10 mb-20 sm:mb-28"
        >
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="fintech-card p-10 sm:p-12 rounded-2xl border border-fintech-border hover:border-emerald-primary/30 transition-all duration-300 group"
            >
              {/* Number badge */}
              <div className="mb-8">
                <span className="text-6xl sm:text-7xl font-bold gradient-text opacity-20 group-hover:opacity-30 transition-opacity">
                  {solution.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-text-primary leading-tight">
                {solution.title}
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 font-light">
                {solution.description}
              </p>

              {/* Details tag */}
              <div className="pt-8 border-t border-fintech-border">
                <p className="text-xs uppercase tracking-widest text-emerald-primary font-semibold">
                  {solution.details}
                </p>
              </div>

              {/* Hover CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 inline-flex items-center gap-2 text-emerald-primary font-semibold group-hover:gap-3 transition-all"
              >
                <span>Explore Strategy</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits grid - clean, minimal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-20 sm:pt-28 border-t border-fintech-border"
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="py-8 px-6 text-center hover:bg-fintech-surface/50 rounded-xl transition-all duration-300"
            >
              <p className="text-lg sm:text-xl font-semibold text-text-primary leading-relaxed">
                {benefit}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
