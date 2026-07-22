'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import React from 'react'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [onboardingChecked, setOnboardingChecked] = React.useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
      return
    }

    // Check if onboarding is completed
    if (!isLoading && isAuthenticated && user) {
      // For now, redirect all users to onboarding
      // In production, this would check if they completed it
      router.push('/onboarding')
      setOnboardingChecked(true)
    }
  }, [isAuthenticated, isLoading, router, user])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-fintech-canvas flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-4 border-fintech-border border-t-emerald-primary rounded-full"
        />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-fintech-canvas text-text-primary">
      {/* Header */}
      <div className="border-b border-fintech-border bg-fintech-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-2">Welcome back, {user?.name}!</p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Quick stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fintech-card p-10 rounded-2xl border border-fintech-border hover:border-emerald-primary/30 transition-all duration-300"
          >
            <p className="text-text-muted text-sm uppercase tracking-widest mb-4">Account Status</p>
            <p className="text-4xl font-bold text-emerald-primary mb-4">Active</p>
            <p className="text-text-secondary text-sm">Your account is verified and active</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="fintech-card p-10 rounded-2xl border border-fintech-border hover:border-emerald-primary/30 transition-all duration-300"
          >
            <p className="text-text-muted text-sm uppercase tracking-widest mb-4">Member Since</p>
            <p className="text-4xl font-bold text-emerald-primary mb-4">
              {new Date(user?.createdAt || '').toLocaleDateString()}
            </p>
            <p className="text-text-secondary text-sm">Join date of your account</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="fintech-card p-10 rounded-2xl border border-fintech-border hover:border-emerald-primary/30 transition-all duration-300"
          >
            <p className="text-text-muted text-sm uppercase tracking-widest mb-4">Email Verified</p>
            <p className="text-4xl font-bold text-emerald-primary mb-4">✓</p>
            <p className="text-text-secondary text-sm">{user?.email}</p>
          </motion.div>
        </div>

        {/* Coming soon features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="fintech-card p-12 rounded-2xl border border-fintech-border"
        >
          <h2 className="text-2xl font-bold text-text-primary mb-6">Portal Features (Coming Soon)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Tax Strategy Portal', description: 'Access your customized tax strategy and recommendations' },
              { title: 'Document Management', description: 'Upload and manage tax documents securely' },
              { title: 'Consultation Booking', description: 'Schedule consultations with our experts' },
              { title: 'Analytics Dashboard', description: 'View your tax savings and financial metrics' },
              { title: 'Team Collaboration', description: 'Invite team members to collaborate on strategies' },
              { title: 'Reporting & Exports', description: 'Generate and export detailed reports' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-fintech-surface border border-fintech-border hover:border-emerald-primary/30 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center p-12 rounded-2xl bg-gradient-to-br from-fintech-surface to-fintech-hover border border-fintech-border"
        >
          <h2 className="text-3xl font-bold text-text-primary mb-4">Ready to Get Started?</h2>
          <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Schedule a consultation with one of our tax strategy experts to build your personalized wealth plan.
          </p>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className="px-8 py-4 rounded-xl font-semibold text-lg bg-emerald-primary hover:bg-emerald-hover text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Schedule Consultation
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
