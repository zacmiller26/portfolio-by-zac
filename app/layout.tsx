import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import AppearanceProvider from '@/lib/contexts/appearance-context'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Zac Miller',
  description: 'A web portfolio for Zac Miller.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        <AppearanceProvider>{children}</AppearanceProvider>
        <Analytics />
      </body>
    </html>
  )
}
