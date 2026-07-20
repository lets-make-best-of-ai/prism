// Authentication configuration for Google OAuth
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''

export const isAuthConfigured = (): boolean => {
  return !!(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET)
}

// OAuth scopes
export const GOOGLE_OAUTH_SCOPES = [
  'openid',
  'profile',
  'email',
]

// Auth redirect paths
export const AUTH_ROUTES = {
  SIGNIN: '/auth/signin',
  SIGNUP: '/auth/signup',
  CALLBACK: '/auth/callback',
  DASHBOARD: '/dashboard',
  LANDING: '/',
}
