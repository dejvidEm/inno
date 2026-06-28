import type React from "react"
import type { Metadata } from "next"
import { Manrope } from "next/font/google" // Changed from Inter to Manrope
import "./globals.css"
import { LanguageProvider } from "@/context/language-context"
import { SiteAnnouncementModal } from "@/components/site-announcement-modal"

const manrope = Manrope({
  // Changed from Inter to Manrope
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Added more weights for flexibility
  display: "swap", // Ensures text remains visible during font loading
})

export const metadata: Metadata = {
  title: "INNOSTUDIO",
  description: "Mastering the Art of Grooming",
    generator: 'v0.dev',
    icons: {
      icon: [
        {
          url: "/favicon_light.ico",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/favicon_dark.ico",
          media: "(prefers-color-scheme: dark)",
        },
        {
          url: "/favicon_light.ico",
        },
      ],
    },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Fix for Instagram in-app browser viewport jumping
              function setViewportHeight() {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', vh + 'px');
              }
              
              // Set initial viewport height
              setViewportHeight();
              
              // Update on resize and orientation change
              window.addEventListener('resize', setViewportHeight);
              window.addEventListener('orientationchange', setViewportHeight);
              
              // Additional fix for Instagram browser
              if (window.navigator.userAgent.includes('Instagram')) {
                document.documentElement.style.setProperty('height', '100dvh');
                document.body.style.setProperty('height', '100dvh');
              }
            `,
          }}
        />
      </head>
      <body className={`${manrope.className} antialiased`}>
        {" "}
        {/* Applied Manrope and antialiasing */}
        <LanguageProvider>
          {children}
          <SiteAnnouncementModal />
        </LanguageProvider>
      </body>
    </html>
  )
}
