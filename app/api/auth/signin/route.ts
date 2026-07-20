import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password required' },
        { status: 400 }
      )
    }

    // In production, validate against real database with hashed passwords
    const user = {
      id: '1',
      email,
      name: email.split('@')[0],
      image: null,
      createdAt: new Date().toISOString(),
    }

    // Create session cookie
    const response = NextResponse.json(
      { message: 'Signed in successfully', user },
      { status: 200 }
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
    return NextResponse.json(
      { message: 'Sign in failed' },
      { status: 500 }
    )
  }
}
