import type React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";
import { SkipLink } from "@/components/skip-link";
import { getProfile } from "@/lib/content";
import { Suspense } from "react";
import { inter, playfair, jetbrainsMono } from "@/lib/fonts";

// Define base URL for production and development
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://shenawy.xyz";

// Define default metadata
export const metadata: Metadata = {
  title: {
    default: "Ahmed Shenawy - Mobile Network Specialist",
    template: "%s | Ahmed Shenawy",
  },
  description:
    "Senior Roaming Engineer specializing in mobile core network and roaming services optimization.",
  icons: {
    icon: { url: "/fav.png", type: "image/png" },
    shortcut: { url: "/fav.png", type: "image/png" },
    apple: { url: "/fav.png", type: "image/png" },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

// Add TypeScript interface for window.gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-background text-foreground">
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SkipLink />
            <Header profile={profile} />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              {children}
            </main>
            <Footer profile={profile} />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
