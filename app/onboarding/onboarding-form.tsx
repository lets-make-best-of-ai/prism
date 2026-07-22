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

  const steps = [
    { number: 1, title: 'Personal', subtitle: 'Your Information' },
    { number: 2, title: 'Financial', subtitle: 'Income & Assets' },
    { number: 3, title: 'Expenses', subtitle: 'Deductions' },
  ]

  return (
    <div className="min-h-screen bg-fintech-canvas py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-text-primary mb-3">Welcome to Prism</h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
              Let's get to know you better. This quick onboarding will help us build your personalized tax strategy.
            </p>
          </div>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-text-muted uppercase tracking-widest mb-1">Progress</p>
              <p className="text-2xl font-bold text-text-primary">Step {currentStep} of 3</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-emerald-primary">{Math.round((currentStep / 3) * 100)}%</p>
            </div>
          </div>
          <div className="h-3 bg-fintech-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-primary to-emerald-hover rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Step Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mb-16"
        >
          {steps.map(step => (
            <motion.button
              key={step.number}
              onClick={() => step.number < currentStep && setCurrentStep(step.number)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                step.number === currentStep
                  ? 'bg-emerald-primary/15 border-emerald-primary shadow-lg'
                  : step.number < currentStep
                  ? 'bg-emerald-primary/5 border-emerald-primary/50 hover:border-emerald-primary/70'
                  : 'bg-fintech-surface border-fintech-border hover:border-emerald-primary/30'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-left">
                <div
                  className={`text-sm font-semibold mb-2 transition-colors ${
                    step.number === currentStep ? 'text-emerald-primary' : 'text-text-muted'
                  }`}
                >
                  Step {step.number}
                </div>
                <div className={`text-lg font-bold ${step.number === currentStep ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {step.title}
                </div>
                <div className={`text-xs mt-1 ${step.number === currentStep ? 'text-text-secondary' : 'text-text-muted'}`}>
                  {step.subtitle}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="fintech-card p-12 rounded-2xl border border-fintech-border mb-12"
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4"
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={handlePrevious}
            disabled={currentStep === 1 || isLoading}
            className="flex-1 px-8 py-4 rounded-xl font-semibold text-lg text-text-primary border-2 border-fintech-border hover:border-emerald-primary/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
          >
            Previous
          </motion.button>

          {currentStep < 3 ? (
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={handleNext}
              className="flex-1 px-8 py-4 rounded-xl font-semibold text-lg bg-emerald-primary hover:bg-emerald-hover text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Next Step
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 px-8 py-4 rounded-xl font-semibold text-lg bg-emerald-primary hover:bg-emerald-hover text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isLoading ? 'Completing...' : 'Complete Profile'}
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  )
}
