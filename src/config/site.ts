import { getSiteUrl } from "@/lib/deployment"

export const siteConfig = {
  name: "Sean Whalen",
  shortName: "Sean Whalen",
  description:
    "Poems attentive to land, labor, memory, and the precise strangeness of rural life.",
  url: getSiteUrl(process.env),
  locale: "en_US",
  language: "en",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
  ],
  studioCredit: {
    label: "Website by Holden Brown — get help with your site",
    href: "https://holden-sites.pages.dev/",
  },
} as const

export type SiteConfig = typeof siteConfig
