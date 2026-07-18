import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import SolutionSection from '@/components/SolutionSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="flex-1">
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <CTASection />
      <Footer />
    </main>
  )
}
