'use client'

import { Suspense } from 'react'
import SignInForm from './signin-form'

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-fintech-canvas" />}>
      <SignInForm />
    </Suspense>
  )
}

