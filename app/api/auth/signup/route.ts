import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, name, password } = await request.json()

    if (!email || !name || !password) {
      return NextResponse.json(
        { message: 'Email, name, and password required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // In production, hash password and save to database
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      image: null,
      createdAt: new Date().toISOString(),
    }

    // Create session cookie
    const response = NextResponse.json(
      { message: 'Account created successfully', user },
      { status: 201 }
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
      { message: 'Sign up failed' },
      { status: 500 }
    )
  }
}
