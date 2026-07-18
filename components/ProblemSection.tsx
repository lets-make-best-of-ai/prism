'use client'

import { useEffect, useRef, useState } from 'react'

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
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="problem" ref={ref} className="relative py-24 sm:py-32">
      <div className="section-container">
        <div className="max-w-3xl">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Stop Tipping the Government.
            </h2>

            <div className="space-y-6">
              <p className="text-lg sm:text-xl text-prism-gray leading-relaxed">
                You work hard, take the risks, and sacrifice your time. Yet, standard retail accountants just record your history and hand you a massive tax bill. They work for the calendar—we work for your legacy.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  { label: 'Average Tax Overpayment', value: '$50K - $500K+' },
                  { label: 'Time Wasted on Tax Planning', value: '40+ Hours/Year' },
                  { label: 'Missed Deductions', value: '60%+ Unrealized' },
                  { label: 'Wealth Erosion Rate', value: '35-40% Annually' },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`card-glass p-4 transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <p className="text-prism-gray text-sm uppercase tracking-widest mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
