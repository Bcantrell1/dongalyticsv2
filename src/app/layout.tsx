import { ThemeProvider } from "@/providers/theme-provideer"
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dongalytics | 🍆 | For Team So Pure',
  description: 'Check your dong size and current Rank. All from Turbo only matches.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<Providers>{children}</Providers>
				</ThemeProvider>
      </body>
    </html>
  )
}