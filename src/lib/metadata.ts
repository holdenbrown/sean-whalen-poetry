import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { absoluteUrl } from "@/lib/deployment"

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  absoluteTitle?: boolean
}

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path, siteConfig.url)
  const imageUrl = absoluteUrl("/opengraph-image.png", siteConfig.url)

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  }
}
