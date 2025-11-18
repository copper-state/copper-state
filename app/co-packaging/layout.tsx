import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Food Co-Packaging & Private Label | Copper State Foods',
  description: 'Leverage our state-of-the-art facility for your snack brand. Copper State Foods is a trusted food co-packing and private label partner specializing in popcorn and nutrition based healthy snacks.',
};

export default function CoPackagingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

