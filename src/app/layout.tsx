import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css";
import AdSection from './components/AdSection';
import Footer from './components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff'
}

export const metadata: Metadata = {
  title: {
    template: '%s | Free Online Tools',
    default: 'Free Online Tools - Collection of Useful Web Utilities'
  },
  description: 'Free collection of online tools and utilities for text conversion, calculations, development, and more. No registration required.',
  keywords: ['online tools', 'web utilities', 'free tools', 'text converter', 'calculator', 'developer tools'],
  authors: [{ name: 'Free Online Tools' }],
  creator: 'Free Online Tools',
  publisher: 'Free Online Tools',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL('https://online-tools-site.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free Online Tools - Collection of Useful Web Utilities',
    description: 'Free collection of online tools and utilities for text conversion, calculations, development, and more. No registration required.',
    url: 'https://online-tools-site.vercel.app',
    siteName: 'Free Online Tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools - Collection of Useful Web Utilities',
    description: 'Free collection of online tools and utilities for text conversion, calculations, development, and more.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        {/* Structured data for search engines */}
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Free Online Tools",
            "url": "https://online-tools-site.vercel.app",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://online-tools-site.vercel.app/tools?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "description": "Free collection of online tools and utilities for text conversion, calculations, development, and more."
          })}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Main navigation">
            <a href="/" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors" aria-label="Free Online Tools Home">
              Free Online Tools
            </a>
            <div className="flex space-x-4">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100" aria-current={typeof window !== 'undefined' && window.location.pathname === '/' ? 'page' : undefined}>Home</a>
              <a href="/tools" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100" aria-current={typeof window !== 'undefined' && window.location.pathname === '/tools' ? 'page' : undefined}>All Tools</a>
            </div>
          </nav>
        </header>

        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          {/* Top Ad */}
          <AdSection position="top" />

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow p-6">
            {children}
          </div>

          {/* Bottom Ad */}
          <div className="mt-8">
            <AdSection position="bottom" />
          </div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
