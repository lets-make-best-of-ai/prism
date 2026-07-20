import { NextRequest, NextResponse } from 'next/server'

export async function POST(_request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: 'Signed out successfully' },
      { status: 200 }
    )

    // Clear auth session cookie
    response.cookies.delete('auth-session')

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Sign out failed' },
      { status: 500 }
    )
  }
}
