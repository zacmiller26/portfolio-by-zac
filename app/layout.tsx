import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { SetInitialTheme } from '@/app/components/windows/SettingsWindow/ThemeSelector'
import { cn } from '@/lib/utils'
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
      {/* This will set the initial theme based on the user's system preference. */}
      <SetInitialTheme />
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        {children}
      </body>
    </html>
  )
}
