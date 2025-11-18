import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Copper State Foods',
  description: 'Have a question? We\'d love to hear from you. Contact Copper State Foods for inquiries about our products, fundraising, wholesale, or co-packing services.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

