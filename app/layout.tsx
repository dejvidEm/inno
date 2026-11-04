import type React from "react"
import type { Metadata } from "next"
import { Manrope } from "next/font/google" // Changed from Inter to Manrope
import "./globals.css"
import { LanguageProvider } from "@/context/language-context"
import { SiteAnnouncementModal } from "@/components/site-announcement-modal"
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL, TITLE_SUFFIX } from "@/lib/seo"

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${TITLE_SUFFIX}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  category: "Barbershop",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
