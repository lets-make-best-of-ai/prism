'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Step1PersonalInfo from './steps/step1-personal-info'
import Step2FinancialInfo from './steps/step2-financial-info'
import Step3Expenses from './steps/step3-expenses'

interface OnboardingData {
  step1: Record<string, any>
  step2: Record<string, any>
  step3: Record<string, any>
}

export default function OnboardingForm() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    step1: {},
    step2: {},
    step3: {},
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin')
    }
  }, [isAuthenticated, router])

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

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Onboarding submission error:', error)
      alert('Failed to save your information. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-fintech-canvas py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-text-primary mb-2">Welcome to Prism</h1>
          <p className="text-text-secondary">Let's get to know you better. We'll use this information to provide tailored tax strategies.</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-text-primary">Step {currentStep} of 3</span>
            <span className="text-sm text-text-muted">{Math.round((currentStep / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-fintech-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex gap-4 mb-12">
          {[1, 2, 3].map(step => (
            <motion.div
              key={step}
              onClick={() => step < currentStep && setCurrentStep(step)}
              className={`flex-1 p-4 rounded-lg text-center cursor-pointer transition-all ${
                step === currentStep
                  ? 'bg-emerald-primary/20 border-2 border-emerald-primary'
                  : step < currentStep
                  ? 'bg-emerald-primary/10 border-2 border-emerald-primary/50'
                  : 'bg-fintech-surface border-2 border-fintech-border'
              }`}
              whileHover={step < currentStep ? { scale: 1.02 } : {}}
            >
              <div className="text-sm font-semibold text-text-primary">
                {['Personal', 'Financial', 'Expenses'][step - 1]}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="fintech-card p-8 rounded-2xl border border-fintech-border mb-8"
        >
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
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={handlePrevious}
            disabled={currentStep === 1 || isLoading}
            className="flex-1 px-6 py-3 rounded-xl font-semibold text-text-primary border-2 border-fintech-border hover:border-emerald-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </motion.button>

          {currentStep < 3 ? (
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={handleNext}
              className="flex-1 px-6 py-3 rounded-xl font-semibold bg-emerald-primary hover:bg-emerald-hover text-white transition-all"
            >
              Next
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 px-6 py-3 rounded-xl font-semibold bg-emerald-primary hover:bg-emerald-hover text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Saving...' : 'Complete Onboarding'}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}
