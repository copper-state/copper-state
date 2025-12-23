'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Client component that captures team parameter from URL
 * and stores it for use during checkout
 */
export default function TeamTracker() {
  const searchParams = useSearchParams();
  const [teamId, setTeamId] = useState<string | null>(null);

  useEffect(() => {
    const team = searchParams.get('team');
    
    if (team) {
      // Store team ID in sessionStorage for checkout (clears when tab/window closes)
      sessionStorage.setItem('fundraising_team', team);
      setTeamId(team);
    } else {
      // Only check sessionStorage if no team in URL
      // This ensures we don't show team banner if they navigate away and come back
      const storedTeam = sessionStorage.getItem('fundraising_team');
      if (storedTeam) {
        setTeamId(storedTeam);
      }
    }
  }, [searchParams]);

  if (!teamId) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="text-sm text-blue-800">
        <span className="font-semibold">Supporting Team:</span>{' '}
        <span className="font-mono bg-blue-100 px-2 py-1 rounded">
          {teamId}
        </span>
      </p>
      <p className="text-xs text-blue-600 mt-1">
        Your purchase will be tracked for this team's fundraising campaign.
      </p>
    </div>
  );
}

