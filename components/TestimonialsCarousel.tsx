'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TestimonialsCarousel() {
  const testimonials = [
    {
      id: 1,
      name: 'Michael Chen',
      title: 'CEO, Tech Startup',
      text: 'Prism saved us $280K in our first year. Their tax strategy is bulletproof and the team is incredibly responsive.',
      image: '👨‍💼',
      savings: '$280K+',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      title: 'Real Estate Developer',
      text: 'Finally, someone who understands real estate tax optimization. Their entity structuring alone paid for their services 10x over.',
      image: '👩‍💼',
      savings: '$450K+',
    },
    {
      id: 3,
      name: 'David Rodriguez',
      title: 'E-Commerce Founder',
      text: 'The difference between my old CPA and Prism is night and day. They think strategically, not just transactionally.',
      image: '🧑‍💼',
      savings: '$150K+',
    },
    {
      id: 4,
      name: 'Jennifer Wei',
      title: 'Investment Manager',
      text: 'Exceptional service. Their team proactively identifies tax planning opportunities we would have never found on our own.',
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

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-prism-navy/50 to-prism-dark">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Trusted by Wealth Creators
            <br />
            <span className="gradient-text">Real Results from Real Clients</span>
          </h2>
          <p className="text-lg text-prism-gray max-w-2xl mx-auto">
            See how we've helped successful entrepreneurs and business owners take control of their tax destiny.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Carousel */}
          <div className="relative h-80 sm:h-72 mb-8">
            <AnimatePresence initial={false} custom={current} mode="wait">
              {testimonials.map((testimonial, idx) => (
                idx === current && (
                  <motion.div
                    key={testimonial.id}
                    custom={idx > current ? 1 : -1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.5 },
                    }}
                    drag="x"
                    dragElastic={0.2}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x)
                      if (swipe < -swipeConfidenceThreshold) {
                        next()
                      } else if (swipe > swipeConfidenceThreshold) {
                        prev()
                      }
                    }}
                    className="absolute inset-0 card-glass p-8 sm:p-12 rounded-xl cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex flex-col h-full justify-between">
                      {/* Quote */}
                      <div>
                        <div className="text-4xl mb-4 text-prism-emerald">"</div>
                        <p className="text-lg sm:text-xl text-white leading-relaxed mb-6">
                          {testimonial.text}
                        </p>
                      </div>

                      {/* Author */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">{testimonial.image}</div>
                          <div>
                            <p className="font-bold text-white">{testimonial.name}</p>
                            <p className="text-sm text-prism-gray">{testimonial.title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-prism-gray uppercase tracking-widest mb-1">Saved</p>
                          <p className="text-2xl font-bold gradient-text">{testimonial.savings}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="p-3 rounded-lg bg-prism-emerald/20 hover:bg-prism-emerald/40
                text-prism-emerald border border-prism-emerald/50 transition-all"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === current
                      ? 'bg-prism-emerald w-8'
                      : 'bg-prism-gold/30 hover:bg-prism-gold/60 w-2'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="p-3 rounded-lg bg-prism-emerald/20 hover:bg-prism-emerald/40
                text-prism-emerald border border-prism-emerald/50 transition-all"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Slide Counter */}
          <p className="text-center text-prism-gray text-sm mt-6">
            {current + 1} / {testimonials.length}
          </p>
        </div>
      </div>
    </section>
  )
}
