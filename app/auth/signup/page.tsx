'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signUp, isAuthenticated, signInWithGoogle } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      await signUp(email, name, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-fintech-canvas flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fintech-card p-8 sm:p-12 rounded-2xl border border-fintech-border max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-text-primary mb-2">Create Account</h1>
        <p className="text-text-secondary mb-8 leading-relaxed">Join us to get started with your tax strategy</p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20"
          >
            <p className="text-sm text-red-500">{error}</p>
          </motion.div>
        )}

        {/* Google Sign Up */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          onClick={signInWithGoogle}
          className="w-full mb-6 px-4 py-3 rounded-xl border-2 border-fintech-border hover:border-emerald-primary/50 text-text-primary font-semibold flex items-center justify-center gap-3 transition-all duration-300"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </motion.button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-fintech-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-fintech-canvas text-text-muted">Or sign up with email</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none"
              placeholder="you@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none"
              placeholder="Minimum 8 characters"
              required
              minLength={8}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none"
              placeholder="Confirm your password"
              required
              minLength={8}
            />
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl font-semibold text-lg bg-emerald-primary hover:bg-emerald-hover text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </motion.button>
        </form>

        {/* Sign in link */}
        <p className="mt-6 text-center text-text-secondary">
          Already have an account?{' '}
          <a href="/auth/signin" className="text-emerald-primary hover:text-emerald-hover font-semibold transition-colors">
            Sign In
          </a>
        </p>
      </motion.div>
    </div>
  )
}
