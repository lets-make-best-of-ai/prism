import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Prism Equity Partners | Tax Strategy & Wealth Building',
  description: 'Keep What You Earn. Build What You Dream. Aggressive, bulletproof tax strategies designed to protect your profits and scale your net worth.',
  keywords: ['tax strategy', 'wealth building', 'tax planning', 'equity', 'net worth'],
  openGraph: {
    title: 'Prism Equity Partners | Tax Strategy & Wealth Building',
    description: 'Keep What You Earn. Build What You Dream.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-prism-dark text-white" suppressHydrationWarning>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
