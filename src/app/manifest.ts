import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { withBasePath } from "@/lib/deployment"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: withBasePath("/"),
    scope: withBasePath("/"),
    display: "standalone",
    background_color: "#f2efe5",
    theme_color: "#f2efe5",
    icons: [
      {
        src: withBasePath("/icon.svg"),
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  }
}
