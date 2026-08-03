import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { ContourLines } from "@/components/editorial/contour-lines"
import { FactList } from "@/components/editorial/fact-list"
import { FieldSection } from "@/components/editorial/field-section"
import { ExternalLink } from "@/components/external-link"
import { Button } from "@/components/ui/button"
import { aboutContent } from "@/content/about"
import { withBasePath } from "@/lib/deployment"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Iowa poet Sean Whalen, his return to writing, and the places and practical vocabularies that shape his work.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <div className="site-frame overflow-hidden">
      <FieldSection
        railLabel={aboutContent.railLabel}
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
        railLabel=""
        aria-labelledby="on-the-page-title"
        className="relative overflow-hidden bg-primary text-primary-foreground"
        railClassName="border-primary-foreground/30"
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
        railLabel=""
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
