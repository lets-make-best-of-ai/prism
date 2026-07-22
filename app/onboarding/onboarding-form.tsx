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

export default function OnboardingForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    step1: {},
    step2: {},
    step3: {},
  })

  // Don't redirect - let user fill form without auth for now
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/auth/signin')
  //   }
  // }, [isAuthenticated, router])

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

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Complete Your Profile</h1>
          <p className="text-sm text-slate-600">
            Help us tailor your tax strategy. We'll use this info to provide personalized recommendations.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600 uppercase">Step {currentStep} of 3</span>
            <span className="text-xs font-semibold text-slate-600">{Math.round((currentStep / 3) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Tabs */}
        <div className="flex gap-3 mb-8">
          {[
            { num: 1, label: 'Personal' },
            { num: 2, label: 'Financial' },
            { num: 3, label: 'Expenses' },
          ].map(step => (
            <button
              key={step.num}
              onClick={() => step.num < currentStep && setCurrentStep(step.num)}
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                step.num === currentStep
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : step.num < currentStep
                  ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
              disabled={step.num > currentStep}
            >
              {step.label}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-6 shadow-sm">
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

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1 || isLoading}
            className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isLoading ? 'Saving...' : 'Complete'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
