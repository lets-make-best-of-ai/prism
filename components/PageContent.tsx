'use client'

import Header from './Header'
import Hero from './Hero'
import ProblemSection from './ProblemSection'
import SolutionSection from './SolutionSection'
import TaxCalculator from './TaxCalculator'
import TestimonialsCarousel from './TestimonialsCarousel'
import CTASection from './CTASection'
import Footer from './Footer'

export default function PageContent() {
  return (
    <main className="flex-1">
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <TaxCalculator />
      <TestimonialsCarousel />
      <CTASection />
      <Footer />
    </main>
  )
}
