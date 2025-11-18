import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Allstar Popcorn Fundraising | Raise Money with Copper State Foods',
  description: 'Looking for profitable and easy fundraising ideas for your sports team? Our Allstar Popcorn Fundraising program offers delicious products that sell themselves. Start today!',
};

export default function FundraisingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

