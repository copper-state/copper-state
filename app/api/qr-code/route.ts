import { NextRequest, NextResponse } from 'next/server';
import { generateQRCodeBuffer, generateQRCodeURL } from '@/lib/qr-code';

/**
 * GET /api/qr-code?team=TEAM_ID&player=PLAYER_ID&width=300
 * 
 * Generates a QR code image for a team/player
 * QR code points to /fundraise?team=TEAM_ID
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const teamId = searchParams.get('team');
    const playerId = searchParams.get('player') || undefined;
    const width = parseInt(searchParams.get('width') || '300', 10);

    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 }
      );
    }

    // Generate QR code URL
    const qrUrl = generateQRCodeURL({
      teamId,
      playerId,
    });

    // Generate QR code buffer
    const buffer = await generateQRCodeBuffer(qrUrl, width);

    // Return as PNG image
    // Convert Buffer to Uint8Array for NextResponse compatibility
    return new NextResponse(Uint8Array.from(buffer), {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `inline; filename="qr-${teamId}${playerId ? `-${playerId}` : ''}.png"`,
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}

