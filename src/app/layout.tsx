import { ThemeProvider } from "@/providers/theme-provideer"
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Steam Auth App',
  description: 'Next.js app with Steam authentication',
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