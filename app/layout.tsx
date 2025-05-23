import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Analytics } from "@/components/analytics"
import { SkipLink } from "@/components/skip-link"
import { getProfile } from "@/lib/content"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

// Define base URL for production and development
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://shenawy.xyz"

// Define default metadata
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Ahmed Shenawy - Mobile Network Specialist",
    template: "%s | Ahmed Shenawy",
  },
  description:
    "Personal portfolio of Ahmed Shenawy, specializing in Mobile Core Network Services and Roaming Services optimization.",
  icons: {
    icon: "/fav.png",
    apple: "/fav.png",
  },
  keywords: [
    "Ahmed Shenawy",
    "Mobile Network",
    "Telecommunications",
    "Roaming Services",
    "Network Optimization",
    "Core Network",
  ],
  authors: [
    {
      name: "Ahmed Shenawy",
      url: baseUrl,
    },
  ],
  creator: "Ahmed Shenawy",
  publisher: "Ahmed Shenawy",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Ahmed Shenawy - Mobile Network Specialist",
    description:
      "Personal portfolio of Ahmed Shenawy, specializing in Mobile Core Network Services and Roaming Services optimization.",
    siteName: "Ahmed Shenawy",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Ahmed Shenawy - Mobile Network Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Shenawy - Mobile Network Specialist",
    description:
      "Personal portfolio of Ahmed Shenawy, specializing in Mobile Core Network Services and Roaming Services optimization.",
    images: [`${baseUrl}/og-image.jpg`],
    creator: "@ahmedshenawy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes if available
    // google: "verification_code",
    // yandex: "verification_code",
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": baseUrl,
    },
  },
    generator: 'v0.dev'
}

// Define viewport settings
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#18191a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true, // Allow user scaling for accessibility
}

// Add TypeScript interface for window.gtag
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Accessibility meta tags */}
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#18191a" />
      </head>
      <body className="font-sans">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <SkipLink />
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main id="main-content" className="flex-1" tabIndex={-1}>
                {children}
              </main>
              <Footer profile={profile} />
            </div>
          </Suspense>
        </ThemeProvider>
        {/* Update the Google Analytics ID to G-S11E6B0BXM */}
        <Analytics />
      </body>
    </html>
  )
}
