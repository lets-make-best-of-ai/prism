'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TestimonialsCarousel() {
  const testimonials = [
    {
      id: 1,
      name: 'Michael Chen',
      title: 'Founder & CEO',
      company: 'Quantum Software',
      text: 'Prism\'s strategic approach saved us $280K in our first year alone. More importantly, they built a structure that scales with our growth.',
      image: '👨‍💼',
      savings: '$280K+',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      title: 'Principal',
      company: 'SJ Capital Partners',
      text: 'Real estate tax optimization at this level is rare. Their cost segregation and entity structuring paid for their services 15x over in year one.',
      image: '👩‍💼',
      savings: '$450K+',
    },
    {
      id: 3,
      name: 'David Rodriguez',
      title: 'CEO & Founder',
      company: 'Global Commerce Inc',
      text: 'The difference between my old CPA and Prism is like night and day. They think strategically about wealth building, not just transaction recording.',
      image: '🧑‍💼',
      savings: '$150K+',
    },
    {
      id: 4,
      name: 'Jennifer Wei',
      title: 'Managing Partner',
      company: 'Ascent Investment Group',
      text: 'Their proactive identification of tax planning opportunities has been exceptional. We would have left millions on the table without their expertise.',
      image: '👩‍💻',
      savings: '$320K+',
    },
  ]

  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section className="relative w-full py-32 sm:py-48 overflow-hidden">
      {/* Background accent */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute top-1/2 -left-40 w-96 h-96 border border-emerald-primary/10 rounded-full pointer-events-none transform -translate-y-1/2"
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
            Trusted by
            <br />
            <span className="gradient-text">Elite Entrepreneurs & Investors</span>
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-light">
            See what high-net-worth business leaders have to say about their experience working with us.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative h-auto sm:min-h-[480px] flex items-center">
            <AnimatePresence initial={false} custom={current}>
              <motion.div
                key={current}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                }}
                className="absolute inset-0 w-full"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="fintech-card p-10 sm:p-12 lg:p-16 rounded-2xl border border-fintech-border h-full flex flex-col"
                >
                  {/* Savings badge */}
                  <div className="inline-block w-fit mb-8 px-4 py-2 rounded-lg bg-emerald-primary/10 border border-emerald-primary/30">
                    <p className="text-sm font-bold text-emerald-primary">
                      {testimonials[current].savings} Saved
                    </p>
                  </div>

                  {/* Testimonial quote */}
                  <p className="text-lg sm:text-2xl text-text-primary leading-relaxed font-light mb-12 flex-1">
                    "{testimonials[current].text}"
                  </p>

                  {/* Author info */}
                  <div className="flex items-center gap-6 pt-10 border-t border-fintech-border">
                    <div className="text-4xl sm:text-5xl">
                      {testimonials[current].image}
                    </div>
                    <div>
                      <p className="font-bold text-text-primary text-base sm:text-lg">
                        {testimonials[current].name}
                      </p>
                      <p className="text-xs sm:text-sm text-text-muted uppercase tracking-widest font-medium">
                        {testimonials[current].title}
                      </p>
                      <p className="text-xs sm:text-sm text-emerald-primary font-semibold">
                        {testimonials[current].company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="mt-12 sm:mt-16 flex items-center justify-between">
            {/* Left button */}
            <motion.button
              whileHover={{ x: -4 }}
              whileTap={{ x: 0 }}
              onClick={prev}
              className="p-3 rounded-xl border border-fintech-border hover:border-emerald-primary/50 hover:bg-fintech-surface transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-text-secondary hover:text-emerald-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Indicator dots */}
            <div className="flex gap-3">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === current
                      ? 'bg-emerald-primary w-8'
                      : 'bg-fintech-border hover:bg-fintech-hover'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Right button */}
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ x: 0 }}
              onClick={next}
              className="p-3 rounded-xl border border-fintech-border hover:border-emerald-primary/50 hover:bg-fintech-surface transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-text-secondary hover:text-emerald-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Counter */}
          <div className="mt-8 text-center">
            <p className="text-sm text-text-muted font-medium uppercase tracking-wider">
              {current + 1} of {testimonials.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
