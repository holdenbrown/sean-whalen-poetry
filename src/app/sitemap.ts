import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { absoluteUrl } from "@/lib/deployment"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { path: "/", changeFrequency: "monthly" as const, priority: 1 },
    { path: "/work", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/about", changeFrequency: "yearly" as const, priority: 0.7 },
  ].map((entry) => ({
    url: absoluteUrl(entry.path, siteConfig.url),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
}
