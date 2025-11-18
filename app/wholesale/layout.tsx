import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wholesale Popcorn Supplier | Copper State Foods',
  description: 'Become a retail partner with Copper State Foods. We offer wholesale pricing on our premium gourmet and health-focused popcorn lines. Contact us to stock your shelves today.',
};

export default function WholesaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

