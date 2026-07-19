'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CoreStrategiesSection() {
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

  const strategies = [
    {
      icon: '🏛️',
      title: 'Entity Optimization',
      description: 'Strategic selection and restructuring of business entities (LLC, S-Corp, C-Corp, partnerships) to minimize tax liability while maintaining operational flexibility.',
      metrics: 'Typical Savings: 15-25%',
    },
    {
      icon: '💰',
      title: 'Income Splitting Strategies',
      description: 'Distribute income across multiple entities, family members, and trusts to push down effective tax rates and keep more capital in your ecosystem.',
      metrics: 'Typical Savings: 10-18%',
    },
    {
      icon: '📊',
      title: 'Tax Deferral Mechanisms',
      description: 'Leverage opportunity zones, retirement plans, charitable vehicles, and timing techniques to defer or eliminate tax on capital gains and income.',
      metrics: 'Typical Savings: 20-40%',
    },
    {
      icon: '🏠',
      title: 'Real Estate Wealth Building',
      description: 'Deploy cost segregation, bonus depreciation, and 1031 exchanges to accelerate deductions while building long-term equity.',
      metrics: 'Typical Savings: 25-35%',
    },
    {
      icon: '💼',
      title: 'Executive Compensation Design',
      description: 'Structure salaries, bonuses, equity packages, and benefits to maximize tax efficiency while retaining and incentivizing top talent.',
      metrics: 'Typical Savings: 12-22%',
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Generational Wealth Transfer',
      description: 'Use trusts, gifting strategies, and estate planning to transfer wealth across generations while minimizing estate and gift taxes.',
      metrics: 'Typical Savings: 30-50%',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section ref={ref as any} className="relative w-full py-32 sm:py-48 overflow-hidden bg-fintech-surface/30">
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.06 : 0 }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-primary/5 rounded-full blur-3xl pointer-events-none transform translate-x-1/2"
      />

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20 sm:mb-28"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-text-primary">
            Core Tax Strategies
            <br />
            <span className="gradient-text">At Your Service</span>
          </h2>

          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-light">
            We deploy a comprehensive arsenal of proven strategies, each customized to your unique situation, risk profile, and long-term wealth objectives.
          </p>
        </motion.div>

        {/* Strategies grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          {strategies.map((strategy, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group p-10 rounded-2xl border border-fintech-border bg-fintech-canvas hover:bg-fintech-surface hover:border-emerald-primary/30 transition-all duration-300 cursor-default"
            >
              {/* Icon */}
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {strategy.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-text-primary leading-tight">
                {strategy.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6 font-light">
                {strategy.description}
              </p>

              {/* Metrics badge */}
              <div className="pt-6 border-t border-fintech-border">
                <p className="text-xs sm:text-sm font-semibold text-emerald-primary uppercase tracking-wider">
                  {strategy.metrics}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
