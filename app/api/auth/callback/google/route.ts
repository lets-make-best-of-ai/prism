import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      return NextResponse.redirect(
        new URL(`/auth/signin?error=${error}`, request.url)
      )
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/auth/signin?error=no_code', request.url)
      )
    }

    // Exchange code for token from Google
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/callback/google`,
      }),
    })

    if (!tokenResponse.ok) {
      return NextResponse.redirect(
        new URL('/auth/signin?error=token_exchange_failed', request.url)
      )
    }

    const tokens = await tokenResponse.json()

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    if (!userResponse.ok) {
      return NextResponse.redirect(
        new URL('/auth/signin?error=user_info_failed', request.url)
      )
    }

    const googleUser = await userResponse.json()

    // Create or update user in database
    const user = {
      id: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      image: googleUser.picture,
      createdAt: new Date().toISOString(),
    }

    // Create session
    const response = NextResponse.redirect(
      new URL('/dashboard', request.url)
    )

    response.cookies.set({
      name: 'auth-session',
      value: JSON.stringify(user),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Google OAuth callback error:', error)
    return NextResponse.redirect(
      new URL('/auth/signin?error=callback_error', request.url)
    )
  }
}
