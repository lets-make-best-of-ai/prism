'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-prism-emerald/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-prism-gold/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Prism shape with SVG */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 opacity-30">
        <svg width="400" height="400" viewBox="0 0 400 400" className="prism-hero">
          <defs>
            <linearGradient id="prismGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          {/* Central prism shape */}
          <polygon points="200,50 350,300 200,350 50,300" fill="none" stroke="url(#prismGradient)" strokeWidth="2" />
          {/* Light rays */}
          <line x1="200" y1="0" x2="200" y2="50" stroke="#fbbf24" strokeWidth="1" opacity="0.5" />
          <line x1="160" y1="30" x2="115" y2="140" stroke="#10b981" strokeWidth="1" opacity="0.4" />
          <line x1="240" y1="30" x2="285" y2="140" stroke="#10b981" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className={`section-container text-center transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto">
          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight
            animate-slide-up">
            Keep What You Earn.
            <br />
            <span className="gradient-text">Build What You Dream.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-prism-gray mb-8 max-w-2xl mx-auto leading-relaxed
            animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Uncle Sam has a plan for your money. We have a better one. Prism Equity Partners builds aggressive, bulletproof tax strategies designed to protect your profits and scale your net worth.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center
            animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300
                bg-gradient-to-r from-prism-emerald to-prism-gold text-prism-dark
                hover:shadow-glow hover:scale-105 cursor-pointer"
            >
              Schedule Your Tax Blueprint Consultation
            </button>
            <button
              onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300
                border-2 border-prism-emerald text-prism-emerald
                hover:bg-prism-emerald/10 hover:shadow-glow cursor-pointer"
            >
              Learn More
            </button>
          </div>

          {/* Trust indicator */}
          <div className="mt-16 pt-8 border-t border-white/10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-sm text-prism-gray mb-4">Trusted by high-net-worth individuals and business owners</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {['Fortune 500', 'Private Equity', 'C-Suite', 'Entrepreneurs'].map((item, idx) => (
                <div key={idx} className="text-xs sm:text-sm font-semibold text-prism-emerald uppercase tracking-widest">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
