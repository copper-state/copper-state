'use client';

import { useState } from 'react';
import { generateTeamQRCode, generateQRCodeURL } from '@/lib/qr-code';
import { Download, QrCode } from 'lucide-react';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    teamId: '',
  });
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.teamId.trim()) {
      setError('Team ID is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const options = {
        teamId: formData.teamId.trim(),
        width: 300,
      };

      const url = generateQRCodeURL(options);
      const { dataUrl } = await generateTeamQRCode(options);

      setQrCodeUrl(url);
      setQrCodeDataUrl(dataUrl);
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrCodeDataUrl) {
      return;
    }

    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    const filename = `qr-${formData.teamId}.png`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setFormData({
      teamId: '',
    });
    setQrCodeDataUrl(null);
    setQrCodeUrl(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              QR Code Generator
            </h1>
            <p className="text-gray-700 mt-2">
              Generate QR codes for fundraising teams and players
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team ID *
              </label>
              <input
                type="text"
                value={formData.teamId}
                onChange={(e) =>
                  setFormData({ ...formData, teamId: e.target.value })
                }
                placeholder="soccer-2024"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-600 mt-1">
                Unique identifier for the team
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <QrCode className="w-5 h-5" />
                {loading ? 'Generating...' : 'Generate QR Code'}
              </button>

              {qrCodeDataUrl && (
                <>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Download className="w-5 h-5" />
                    Download QR Code
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
          </form>

          {/* QR Code Display */}
          {qrCodeDataUrl && qrCodeUrl && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated QR Code</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 flex-shrink-0">
                  <img
                    src={qrCodeDataUrl}
                    alt="QR Code"
                    className="w-64 h-64 mx-auto"
                  />
                </div>
                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        QR Code URL
                      </label>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <code className="text-sm text-blue-700 break-all font-mono">
                          {qrCodeUrl}
                        </code>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        This URL is encoded in the QR code. When scanned, it will
                        direct customers to the product page with team/player tracking.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preview Link
                      </label>
                      <a
                        href={qrCodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-800 underline text-sm font-medium"
                      >
                        {qrCodeUrl}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

