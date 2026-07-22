'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function ProblemSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { label: 'Average Tax Overpayment', value: '$50K—$500K+' },
    { label: 'Time Wasted on Tax Planning', value: '40+ Hours/Year' },
    { label: 'Missed Deductions Annually', value: '60%+ Unrealized' },
    { label: 'Wealth Erosion Rate', value: '35–40% Per Year' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section id="problem" ref={ref} className="relative w-full py-32 sm:py-48 overflow-hidden">
      {/* Decorative accent - top right */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: isVisible ? 0.06 : 0, x: isVisible ? 0 : 100 }}
        transition={{ duration: 1 }}
        className="absolute -top-20 -right-20 w-96 h-96 border-2 border-emerald-primary/10 rounded-full pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20 sm:mb-28"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-text-primary">
            The Problem
            <br />
            <span className="gradient-text">Nobody Tells You About</span>
          </h2>

          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-light max-w-2xl">
            You work hard. You take risks. You sacrifice time with your family. Yet, your standard accountant simply records your history and hands you a massive tax bill. They work for the calendar—we work for your legacy.
          </p>
        </motion.div>

        {/* Statistics grid - clean isolation with generous gaps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group fintech-card p-8 sm:p-10 hover:shadow-lg transition-all duration-300 cursor-default"
            >
              <p className="text-xs sm:text-sm text-text-muted uppercase tracking-widest font-medium mb-4 group-hover:text-emerald-primary transition-colors">
                {stat.label}
              </p>
              <p className="text-3xl sm:text-4xl font-bold gradient-text leading-tight">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Supporting narrative - extra spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 sm:mt-28 max-w-3xl"
        >
          <div className="space-y-6">
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-light">
              Retail tax preparers operate reactively—they record what happened last year and file your return. Meanwhile, thousands of legitimate deductions, strategic structures, and wealth-preservation tactics go untapped.
            </p>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-light">
              This isn't just inefficient. It's expensive. Every year, high-net-worth individuals leave millions in provable, legal tax savings on the table.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
