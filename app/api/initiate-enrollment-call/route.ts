import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, patientName, metadata } = await request.json()

    // Validate required fields
    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Get environment variables
    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY
    const agentId = process.env.ELEVENLABS_AGENT_ID || 'agent_6501k8mk22a9exetppcf4vdr1twh'
    const phoneNumberId = process.env.ELEVENLABS_PHONE_NUMBER_ID

    // Validate configuration
    if (!elevenLabsApiKey || !agentId || !phoneNumberId) {
      console.error('Missing Eleven Labs configuration:', {
        hasApiKey: !!elevenLabsApiKey,
        hasAgentId: !!agentId,
        hasPhoneNumberId: !!phoneNumberId,
      })
      return NextResponse.json(
        { error: 'Eleven Labs configuration is incomplete. Please check environment variables.' },
        { status: 500 }
      )
    }

    // Format phone number (ensure it starts with +)
    let formattedNumber = phoneNumber.trim()
    if (!formattedNumber.startsWith('+')) {
      // Assume US number if no country code
      formattedNumber = '+1' + formattedNumber.replace(/\D/g, '')
    }

    console.log('Initiating enrollment call to:', formattedNumber, 'for patient:', patientName)

    // Call Eleven Labs API
    const response = await fetch('https://api.elevenlabs.io/v1/convai/twilio/outbound-call', {
      method: 'POST',
      headers: {
        'xi-api-key': elevenLabsApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
        agent_phone_number_id: phoneNumberId,
        to_number: formattedNumber,
        metadata: {
          patient_name: patientName || 'Patient',
          call_type: 'enrollment',
          ...metadata,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Eleven Labs API error:', errorText)
      return NextResponse.json(
        { error: `Failed to initiate call: ${errorText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Call initiated successfully:', data)

    return NextResponse.json({
      success: true,
      conversationId: data.conversation_id,
      callSid: data.call_sid,
      message: `Enrollment call initiated to ${formattedNumber}`,
      data,
    })
  } catch (error: any) {
    console.error('Error initiating enrollment call:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to initiate call' },
      { status: 500 }
    )
  }
}
