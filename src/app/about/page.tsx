import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { ContourLines } from "@/components/editorial/contour-lines"
import { FactList } from "@/components/editorial/fact-list"
import { FieldSection } from "@/components/editorial/field-section"
import { ExternalLink } from "@/components/external-link"
import { StructuredData } from "@/components/structured-data"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { aboutContent } from "@/content/about"
import { absoluteUrl, withBasePath } from "@/lib/deployment"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "About Sean Whalen, Iowa Poet",
  description:
    "Biography of Sean Whalen, an Iowa poet near Pilot Mound whose work spans ecology, memory, labor, history, and the uncanny.",
  path: "/about",
  absoluteTitle: true,
})

const aboutUrl = absoluteUrl("/about", siteConfig.url)
const websiteId = absoluteUrl("/#website", siteConfig.url)
const personId = absoluteUrl("/#sean-whalen", siteConfig.url)
const portraitId = aboutUrl + "#portrait"

const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": aboutUrl + "#profile",
      url: aboutUrl,
      name: "About Sean Whalen, Iowa Poet",
      description:
        "Biography of Sean Whalen, an Iowa poet near Pilot Mound whose work spans ecology, memory, labor, history, and the uncanny.",
      inLanguage: siteConfig.language,
      isPartOf: {
        "@id": websiteId,
      },
      mainEntity: {
        "@id": personId,
      },
      primaryImageOfPage: {
        "@id": portraitId,
      },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      url: aboutUrl,
      jobTitle: "Poet",
      description:
        "Iowa poet from rural Boone County near Pilot Mound, retired health-and-safety professional, and volunteer fire chief.",
      image: {
        "@id": portraitId,
      },
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
    {
      "@type": "ImageObject",
      "@id": portraitId,
      contentUrl: absoluteUrl(aboutContent.portrait.src, siteConfig.url),
      width: 1638,
      height: 2048,
      caption: aboutContent.portrait.alt,
      creator: {
        "@type": "Person",
        name: "Stacy McDonald",
        url: aboutContent.portrait.creditHref,
      },
      creditText: aboutContent.portrait.credit,
      copyrightNotice: "Stacy McDonald - The Photician",
    },
  ],
}

export default function AboutPage() {
  return (
    <div className="site-frame overflow-hidden">
      <StructuredData data={aboutSchema} />
      <FieldSection
        railLabel={aboutContent.railLabels.biography}
        aria-labelledby="about-title"
        className="relative border-b border-border"
        contentClassName="relative pt-site-xl pb-site-2xl lg:pt-site-xl lg:pb-site-2xl"
      >
        <ContourLines className="contour-right text-primary opacity-5" />
        <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-7">
            <h1 id="about-title" className="display-page">
              {aboutContent.title}
            </h1>
            <p className="mt-5 max-w-4xl font-heading text-3xl leading-snug sm:text-4xl">
              {aboutContent.introduction}
            </p>
            <div className="mt-6 max-w-3xl space-y-4 font-heading text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {aboutContent.biography.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <figure className="max-w-md lg:col-span-5 lg:max-w-lg lg:justify-self-end">
            <div className="border border-border bg-secondary p-2">
              <Image
                src={withBasePath(aboutContent.portrait.src)}
                alt={aboutContent.portrait.alt}
                width={1638}
                height={2048}
                sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 30vw, (min-width: 640px) 28rem, 100vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
              Portrait:{" "}
              <ExternalLink
                href={aboutContent.portrait.creditHref}
                className="focus-editorial underline decoration-border underline-offset-4 hover:text-foreground"
              >
                {aboutContent.portrait.credit}
              </ExternalLink>
              {" · "}
              <ExternalLink
                href={aboutContent.portrait.sourceHref}
                className="focus-editorial underline decoration-border underline-offset-4 hover:text-foreground"
              >
                Source image
              </ExternalLink>
            </figcaption>
          </figure>
          <div className="lg:col-span-12">
            <FactList facts={aboutContent.facts} variant="columns" />
          </div>
        </div>
      </FieldSection>

      <FieldSection
        railLabel={aboutContent.railLabels.poetics}
        aria-labelledby="on-the-page-title"
        className="relative overflow-hidden bg-primary text-primary-foreground"
        railClassName="border-primary-foreground/30"
        railMarkClassName="!text-primary-foreground"
        contentClassName="relative grid gap-10 py-site-3xl lg:grid-cols-3 lg:gap-16 lg:py-site-4xl"
      >
        <ContourLines className="contour-right text-primary-foreground opacity-5" />
        <div className="relative">
          <h2 id="on-the-page-title" className="display-section">
            {aboutContent.editorialDescription.title}
          </h2>
          <div className="mt-6 h-0.5 w-16 bg-signal" aria-hidden="true" />
        </div>
        <div className="relative space-y-6 lg:col-span-2">
          {aboutContent.editorialDescription.paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-3xl font-heading text-2xl leading-snug">
              {paragraph}
            </p>
          ))}
        </div>
      </FieldSection>

      <FieldSection
        railLabel={aboutContent.railLabels.work}
        aria-label="About page actions"
        className="border-b border-border"
        contentClassName="py-site-2xl"
      >
        <Button asChild size="lg" variant="outline" className="rounded-none">
          <Link href={aboutContent.action.href}>
            {aboutContent.action.label}
            <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
          </Link>
        </Button>
      </FieldSection>
    </div>
  )
}
