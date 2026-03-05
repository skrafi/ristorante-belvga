import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Ristorante Pescheria Belvga | Fresh Mediterranean Seafood in Lugano',
  description: 'Experience fine Mediterranean seafood on the shores of Lake Lugano. Fresh ingredients, elegant ambiance, and unforgettable dining.',
  openGraph: {
    title: 'Ristorante Pescheria Belvga',
    description: 'Fresh Mediterranean seafood on the shores of Lake Lugano',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
