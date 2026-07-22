import { ReactNode } from 'react'
import { AuthProvider } from '@/lib/auth-context'

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
