import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Blog App | SaaS Design & Developer Insights',
    template: '%s | Blog App',
  },
  description: 'A premium developer and product-led growth blog detailing Next.js 16, TypeScript type-safety, design systems, and remote work culture.',
  keywords: ['Next.js 16', 'Tailwind CSS v4', 'React Query', 'TypeScript', 'SaaS UI', 'UX Design'],
  authors: [{ name: 'Blog App Team' }],
  creator: 'Blog App',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Blog App',
    title: 'Blog App | SaaS Design & Developer Insights',
    description: 'A premium developer and product-led growth blog detailing Next.js 16, TypeScript type-safety, design systems, and remote work culture.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Blog App Overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog App | SaaS Design & Developer Insights',
    description: 'A premium developer and product-led growth blog detailing Next.js 16, TypeScript type-safety, design systems, and remote work culture.',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'],
    creator: '@blogapp',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased font-sans"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider>
          <QueryProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
