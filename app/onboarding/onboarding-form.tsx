'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Step1PersonalInfo from './steps/step1-personal-info'
import Step2FinancialInfo from './steps/step2-financial-info'
import Step3Expenses from './steps/step3-expenses'

interface OnboardingData {
  step1: Record<string, any>
  step2: Record<string, any>
  step3: Record<string, any>
}

const STEPS = [
  { id: 1, label: 'Personal & Family', icon: 'person', short: 'Personal' },
  { id: 2, label: 'Income', icon: 'payments', short: 'Financial' },
  { id: 3, label: 'Expenses', icon: 'receipt_long', short: 'Expenses' },
]

export default function OnboardingForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    step1: {},
    step2: {},
    step3: {},
  })

  const handleStepData = (stepNumber: number, stepData: Record<string, any>) => {
    setData(prev => ({
      ...prev,
      [`step${stepNumber}`]: stepData,
    }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/onboarding/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step1_data: data.step1,
          step2_data: data.step2,
          step3_data: data.step3,
        }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to save onboarding data')
      }

      router.push('/dashboard')
    } catch (error) {
      console.error('Onboarding submission error:', error)
      alert('Failed to save your information. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const currentStepData = STEPS[currentStep - 1]
  const completionPercent = Math.round((currentStep / 3) * 100)

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop py-4 bg-surface-container/70 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-2">
          <h1 className="font-display-lg-mobile text-display-lg-mobile tracking-tighter text-primary">Prism</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">help</span>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">account_circle</span>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <div className="flex flex-1 pt-16">
        <aside className="hidden lg:flex flex-col w-72 py-stack-lg bg-surface-container-low/50 backdrop-blur-md border-r border-white/5 px-6">
          <div className="mb-8">
            <h2 className="font-headline-md text-headline-md text-on-surface">Onboarding</h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-2">Step {currentStep} of {STEPS.length}</p>
          </div>

          <nav className="space-y-1 flex-1">
            {STEPS.map(step => (
              <button
                key={step.id}
                onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg transition-all text-left ${
                  step.id === currentStep
                    ? 'text-primary bg-primary-container/10 border-r-4 border-primary'
                    : step.id < currentStep
                    ? 'text-on-surface-variant hover:bg-surface-variant/30'
                    : 'text-on-surface-variant cursor-not-allowed opacity-50'
                }`}
                disabled={step.id > currentStep}
              >
                <span className="material-symbols-outlined text-lg">{step.icon}</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest">{step.label}</span>
              </button>
            ))}
          </nav>

          {/* Progress Summary */}
          <div className="glass-card p-4 rounded-xl">
            <p className="font-label-sm text-label-sm text-primary uppercase mb-3">Progress</p>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-on-surface-variant">Completion</span>
              <span className="font-numeric-data text-numeric-data text-primary">{completionPercent}%</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all" style={{ width: `${completionPercent}%` }} />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-margin-mobile md:px-margin-desktop py-stack-lg max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="relative z-10 mb-stack-lg">
            <h2 className="font-display-lg text-display-lg text-on-surface mb-2">Complete Your Profile</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Help us tailor your tax strategy. We'll use this info to provide personalized recommendations.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-stack-lg md:hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-on-surface-variant uppercase">Step {currentStep} of {STEPS.length}</span>
              <span className="text-xs font-semibold text-on-surface-variant">{completionPercent}%</span>
            </div>
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all" style={{ width: `${completionPercent}%` }} />
            </div>
          </div>

          {/* Step Tabs */}
          <div className="flex gap-3 mb-stack-lg md:hidden overflow-x-auto pb-2">
            {STEPS.map(step => (
              <button
                key={step.id}
                onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                disabled={step.id > currentStep}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  step.id === currentStep
                    ? 'bg-primary text-on-primary'
                    : step.id < currentStep
                    ? 'bg-primary/10 text-primary'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {step.short}
              </button>
            ))}
          </div>

          {/* Content Card */}
          <div className="glass-card rounded-xl p-stack-lg mb-stack-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/20 p-2 rounded-lg">
                <span className="material-symbols-outlined text-primary">{currentStepData.icon}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">{currentStepData.label}</h3>
            </div>

            {currentStep === 1 && (
              <Step1PersonalInfo
                data={data.step1}
                onDataChange={(stepData) => handleStepData(1, stepData)}
              />
            )}
            {currentStep === 2 && (
              <Step2FinancialInfo
                data={data.step2}
                onDataChange={(stepData) => handleStepData(2, stepData)}
              />
            )}
            {currentStep === 3 && (
              <Step3Expenses
                data={data.step3}
                onDataChange={(stepData) => handleStepData(3, stepData)}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1 || isLoading}
              className="px-8 py-3 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-variant transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">arrow_back</span> Save & Exit
            </button>
            <button
              onClick={currentStep < 3 ? handleNext : handleSubmit}
              disabled={isLoading}
              className="px-10 py-3 rounded-full bg-primary text-on-primary font-semibold hover:brightness-110 shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? 'Saving...' : currentStep < 3 ? 'Next Step' : 'Complete'}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
