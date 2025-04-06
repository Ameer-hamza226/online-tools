import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css";
import AdSection from './components/AdSection';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Free Online Tools',
  description: 'Collection of free online tools and utilities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold">Free Online Tools</h1>
            <div className="flex space-x-4">
              <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="/tools" className="text-gray-700 hover:text-gray-900">All Tools</a>
            </div>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Top Ad */}
          <AdSection />

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow p-6">
            {children}
          </div>

          {/* Bottom Ad */}
          <div className="mt-8">
            <AdSection />
          </div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
