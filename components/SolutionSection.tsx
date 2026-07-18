'use client'

import { useEffect, useRef, useState } from 'react'

export default function SolutionSection() {
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

  const solutions = [
    {
      number: '01',
      title: 'Shielding Assets',
      description: 'We scan your entire operation to legally trap and protect every dollar from unnecessary taxation.',
      icon: '🛡️',
    },
    {
      number: '02',
      title: 'Compounding Value',
      description: 'We reroute your tax savings directly into wealth-generating, equity-building vehicles.',
      icon: '📈',
    },
    {
      number: '03',
      title: 'Legacy Defense',
      description: 'We structure your long-term estate so your fortune stays exactly where it belongs: with your family.',
      icon: '👥',
    },
  ]

  return (
    <section id="solution" ref={ref} className="relative py-24 sm:py-32 bg-prism-navy/50">
      <div className="section-container">
        <div className="mb-16 max-w-3xl">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              How We Split the Tax Code
              <br />
              <span className="gradient-text">In Your Favor</span>
            </h2>
            <p className="text-lg text-prism-gray">
              Our proprietary "Prism Framework" breaks down complex tax regulations into three strategic pillars designed to maximize your wealth retention.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, idx) => (
            <div
              key={idx}
              className={`card-glass p-8 rounded-xl transition-all duration-700 hover:shadow-glow
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">{solution.icon}</span>
                <span className="text-5xl font-bold gradient-text opacity-30">{solution.number}</span>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white">{solution.title}</h3>
              <p className="text-prism-gray leading-relaxed mb-6">{solution.description}</p>

              <div className="flex items-center gap-2 text-prism-emerald font-semibold">
                <span>Explore More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Legal & Bulletproof', 'Customized Strategy', 'Ongoing Support', 'Measurable Results'].map((benefit, idx) => (
            <div
              key={idx}
              className={`card-glass p-6 rounded-lg text-center transition-all duration-700 hover:shadow-glow-gold
                ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${300 + idx * 75}ms` }}
            >
              <p className="font-semibold text-white">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
