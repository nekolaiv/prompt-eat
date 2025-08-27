import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PrompEAT - AI Prompt Library',
  description: 'Encode. Adapt. Transform. A growing open-source prompt library.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <nav className="border-b bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <a href="/library" className="text-xl font-bold">
                PrompEAT
              </a>
              <div className="flex items-center gap-6">
                <a href="/library" className="text-sm hover:text-primary">
                  Library
                </a>
                <a 
                  href="https://github.com/nekolaiv/prompt-eat" 
                  className="text-sm hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}