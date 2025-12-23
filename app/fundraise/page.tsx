import { redirect } from 'next/navigation';

interface FundraisePageProps {
  searchParams: Promise<{ team?: string; player?: string }>;
}

/**
 * Fundraising landing page
 * Redirects to products listing page with team tracking
 * URL: /fundraise?team=TEAM_ID
 */
export default async function FundraisePage({ searchParams }: FundraisePageProps) {
  const { team, player } = await searchParams;
  
  // Build redirect URL with team parameter
  const params = new URLSearchParams();
  if (team) {
    params.set('team', team);
  }
  if (player) {
    params.set('player', player);
  }
  
  // Redirect to products listing page with team tracking
  redirect(`/products?${params.toString()}`);
}

