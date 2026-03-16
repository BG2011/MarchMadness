import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '2026 March Madness Brackets – NCAA Predictions',
  description:
    'View AI-generated bracket predictions for the 2026 NCAA Division I Men\'s Basketball Tournament. Compare primary and alternate bracket scenarios across all four regions.',
  keywords: ['March Madness', 'NCAA', '2026', 'brackets', 'predictions', 'basketball'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
