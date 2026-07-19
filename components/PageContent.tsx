'use client'

import Header from './Header'
import Hero from './Hero'
import ProblemSection from './ProblemSection'
import SolutionSection from './SolutionSection'
import CoreStrategiesSection from './CoreStrategiesSection'
import CaseStudiesSection from './CaseStudiesSection'
import ProcessSection from './ProcessSection'
import TaxCalculator from './TaxCalculator'
import TestimonialsCarousel from './TestimonialsCarousel'
import CTASection from './CTASection'
import Footer from './Footer'

export default function PageContent() {
  return (
    <main className="flex-1 w-full bg-fintech-canvas text-text-primary">
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <CoreStrategiesSection />
      <CaseStudiesSection />
      <ProcessSection />
      <TaxCalculator />
      <TestimonialsCarousel />
      <CTASection />
      <Footer />
    </main>
  )
}
