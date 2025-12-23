import QRCode from 'qrcode';

export interface QRCodeOptions {
  teamId: string;
  playerId?: string;
  productHandle?: string;
  width?: number;
}

/**
 * Generate a QR code URL for a team/player
 * Works on both client and server
 */
export function generateQRCodeURL(options: QRCodeOptions): string {
  // Always use production domain for QR codes
  // This ensures QR codes work correctly regardless of where they're generated
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://copperstatefoods.com';
  
  // Use dedicated fundraising route - simpler and cleaner
  const params = new URLSearchParams({
    team: options.teamId,
  });
  
  if (options.playerId) {
    params.append('player', options.playerId);
  }
  
  return `${baseUrl}/fundraise?${params.toString()}`;
}

/**
 * Generate QR code as data URL (for displaying in browser)
 */
export async function generateQRCodeDataURL(
  url: string,
  width: number = 300
): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(url, {
      width,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });
    return dataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Generate QR code as buffer (for API responses)
 */
export async function generateQRCodeBuffer(
  url: string,
  width: number = 300
): Promise<Buffer> {
  try {
    const buffer = await QRCode.toBuffer(url, {
      width,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });
    return buffer;
  } catch (error) {
    console.error('Error generating QR code buffer:', error);
    throw new Error('Failed to generate QR code buffer');
  }
}

/**
 * Generate QR code for a team
 */
export async function generateTeamQRCode(
  options: QRCodeOptions
): Promise<{ url: string; dataUrl: string }> {
  const qrUrl = generateQRCodeURL(options);
  const dataUrl = await generateQRCodeDataURL(qrUrl, options.width);
  
  return {
    url: qrUrl,
    dataUrl,
  };
}

