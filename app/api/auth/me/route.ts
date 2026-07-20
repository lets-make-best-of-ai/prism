import { NextRequest, NextResponse } from 'next/server'

// Get current user from session
export async function GET(request: NextRequest) {
  try {
    // Get session from cookies
    const sessionCookie = request.cookies.get('auth-session')

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // In production, validate and decode the session JWT
    // For now, we'll parse the cookie data
    const user = JSON.parse(sessionCookie.value)

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    )
  }
}
