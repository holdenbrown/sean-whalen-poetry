import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Newsreader } from "next/font/google"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { StructuredData } from "@/components/structured-data"
import { siteConfig } from "@/config/site"
import { absoluteUrl } from "@/lib/deployment"
import { cn } from "@/lib/utils"

import "./globals.css"

const bodyFont = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const codeFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
})

const displayFont = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url + "/"),
  title: {
    default: siteConfig.name,
    template: "%s | " + siteConfig.name,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2efe5" },
    { media: "(prefers-color-scheme: dark)", color: "#f2efe5" },
  ],
  colorScheme: "light",
}

const websiteId = absoluteUrl("/#website", siteConfig.url)
const personId = absoluteUrl("/#sean-whalen", siteConfig.url)
const aboutUrl = absoluteUrl("/about", siteConfig.url)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: absoluteUrl("/", siteConfig.url),
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        about: {
          "@id": personId,
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        url: aboutUrl,
        jobTitle: "Poet",
        description: "Iowa poet from rural Boone County near Pilot Mound.",
        mainEntityOfPage: aboutUrl,
        homeLocation: {
          "@type": "Place",
          name: "Near Pilot Mound in rural Boone County, Iowa",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Iowa State University",
        },
        subjectOf: [
          {
            "@type": "ProfilePage",
            name: "Sean Whalen at Stone Poetry Quarterly",
            url: "https://stonepoetryjournal.com/sean-whalen/",
          },
          {
            "@type": "ProfilePage",
            name: "Poet Pick: Sean Whalen",
            url: "https://www.gyroscopereview.com/2026/04/poet-pick-sean-whalen/",
          },
          {
            "@type": "ProfilePage",
            name: "Sean Whalen at Thimble Literary Magazine",
            url: "https://www.thimblelitmag.com/author/swhalen/",
          },
        ],
      },
    ],
  }

  return (
    <html
      lang={siteConfig.language}
      className={cn(bodyFont.variable, codeFont.variable, displayFont.variable)}
    >
      <body className="flex min-h-svh flex-col">
        <a
          href="#main-content"
          className="fixed top-3 left-3 z-60 -translate-y-24 rounded-md bg-foreground px-4 py-3 text-sm font-medium text-background transition-transform duration-150 ease-fluid focus:translate-y-0"
        >
          Skip to content
        </a>
        <StructuredData data={websiteSchema} />
        <SiteHeader />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
