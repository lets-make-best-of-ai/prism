import { Suspense } from 'react'
import OnboardingForm from './onboarding-form'

export const metadata = {
  title: 'New Client Onboarding | Prism Equity Partners',
  description: 'Complete your profile and financial information',
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-fintech-canvas flex items-center justify-center">Loading...</div>}>
      <OnboardingForm />
    </Suspense>
  )
}
