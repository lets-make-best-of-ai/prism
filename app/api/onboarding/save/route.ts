import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const authSession = request.cookies.get('auth-session')
    if (!authSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = JSON.parse(authSession.value)
    const { step1_data, step2_data, step3_data } = await request.json()

    if (!user.id) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 400 })
    }

    // For now, just confirm receipt (mock)
    // In production, this will save to Supabase database
    console.log('Onboarding data received:', {
      userId: user.id,
      step1_data,
      step2_data,
      step3_data,
    })

    return NextResponse.json(
      {
        message: 'Onboarding completed successfully',
        userId: user.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Onboarding save error:', error)
    return NextResponse.json(
      { error: 'Failed to save onboarding data' },
      { status: 500 }
    )
  }
}
