import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { ContourLines } from "@/components/editorial/contour-lines"
import { FactList } from "@/components/editorial/fact-list"
import { FieldSection } from "@/components/editorial/field-section"
import { PublicationRow } from "@/components/editorial/publication-row"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { homeContent } from "@/content/home"
import { selectedWorks } from "@/content/works"
import { withBasePath } from "@/lib/deployment"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: `${siteConfig.name} — Iowa Poet`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
})

export default function HomePage() {
  return (
    <div className="site-frame overflow-hidden">
      <FieldSection
        railLabel={homeContent.hero.railLabel}
        aria-labelledby="home-title"
        className="border-b border-border"
        contentClassName="hero-field-content"
      >
        <div className="hero-copy reveal-up">
          <h1 id="home-title" className="display-hero max-w-3xl">
            {homeContent.hero.title}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed">
            {homeContent.hero.description}
          </p>
        </div>

        <div className="hero-media">
          <picture className="hero-picture">
            <source
              media="(max-width: 47.999rem)"
              type="image/webp"
              srcSet={withBasePath(homeContent.hero.artwork.mobileSrcWebp)}
            />
            <source
              media="(min-width: 48rem)"
              type="image/webp"
              srcSet={withBasePath(homeContent.hero.artwork.srcWebp)}
            />
            <source
              media="(max-width: 47.999rem)"
              srcSet={withBasePath(homeContent.hero.artwork.mobileSrc)}
            />
            <Image
              src={withBasePath(homeContent.hero.artwork.src)}
              alt={homeContent.hero.artwork.alt}
              width={homeContent.hero.artwork.width}
              height={homeContent.hero.artwork.height}
              sizes="(min-width: 768px) 55vw, 100vw"
              loading="eager"
              fetchPriority="high"
              placeholder="blur"
              blurDataURL={homeContent.hero.artwork.blurDataURL}
              className="hero-artwork"
            />
          </picture>
          <a
            href={homeContent.hero.artwork.sourceHref}
            className="hero-photo-credit focus-editorial"
            target="_blank"
            rel="noopener noreferrer"
          >
            {homeContent.hero.artwork.credit}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div className="hero-actions reveal-up">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" variant="cta" className="rounded-none">
              <Link href={homeContent.hero.primaryAction.href}>
                {homeContent.hero.primaryAction.label}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-none">
              <Link href={homeContent.hero.secondaryAction.href}>
                {homeContent.hero.secondaryAction.label}
              </Link>
            </Button>
          </div>
          <p className="mt-10 font-mono text-sm text-muted-foreground">
            {homeContent.hero.identity}
          </p>
        </div>
      </FieldSection>

      <FieldSection
        id="selected-publications"
        railLabel={homeContent.selectedPublications.railLabel}
        aria-labelledby="selected-publications-title"
        className="scroll-mt-20 border-b border-border"
        contentClassName="pt-site-md pb-site-3xl lg:pt-site-md lg:pb-site-4xl"
      >
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-16">
          <div>
            <h2 id="selected-publications-title" className="display-selected">
              {homeContent.selectedPublications.title}
            </h2>
            <div className="editorial-rule mt-6" aria-hidden="true" />
            <p className="mt-7 max-w-sm text-base leading-relaxed text-muted-foreground">
              {homeContent.selectedPublications.description}
            </p>
          </div>

          <div className="lg:col-span-3">
            <ul className="border-t border-border pt-site-lg lg:pt-site-2xl">
              {selectedWorks.map((work) => (
                <li key={work.id}>
                  <PublicationRow
                    work={work}
                    metadata={selectedMetadata(work)}
                    actionLabel={selectedActionLabel(work)}
                  />
                </li>
              ))}
            </ul>
            <Link
              href={homeContent.selectedPublications.action.href}
              className="focus-editorial group mt-7 inline-flex min-h-11 items-center gap-4 font-mono text-sm text-primary"
            >
              {homeContent.selectedPublications.action.label}
              <ArrowRightIcon
                aria-hidden="true"
                className="size-5 text-signal transition-transform duration-150 ease-fluid group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>
      </FieldSection>

      <FieldSection
        railLabel={homeContent.about.railLabel}
        aria-labelledby="home-about-title"
        className="relative overflow-hidden border-b border-border"
        contentClassName="relative py-site-3xl lg:py-site-4xl"
      >
        <ContourLines className="contour-right text-primary opacity-5" />
        <div className="relative grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 id="home-about-title" className="display-section">
              {homeContent.about.title}
            </h2>
            <div className="editorial-rule mt-6" aria-hidden="true" />
            <div className="mt-8 max-w-2xl space-y-7">
              {homeContent.about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-heading text-2xl leading-snug sm:text-3xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href={homeContent.about.action.href}
              className="focus-editorial group mt-9 inline-flex min-h-11 items-center gap-4 font-mono text-sm text-primary"
            >
              {homeContent.about.action.label}
              <ArrowRightIcon
                aria-hidden="true"
                className="size-5 text-signal transition-transform duration-150 ease-fluid group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </div>
          <div className="self-center">
            <FactList facts={homeContent.about.facts} />
          </div>
        </div>
      </FieldSection>

      <FieldSection
        railLabel={homeContent.archive.railLabel}
        aria-labelledby="archive-title"
        className="bg-dark-band text-dark-band-foreground"
        railClassName="border-dark-band-foreground/35"
        railMarkClassName="!text-dark-band-foreground"
        contentClassName="grid items-center gap-10 py-site-3xl lg:grid-cols-[1fr_auto] lg:py-site-4xl"
      >
        <div>
          <h2 id="archive-title" className="display-section">
            {homeContent.archive.title}
          </h2>
          <div className="editorial-rule mt-6" aria-hidden="true" />
          <p className="mt-7 max-w-2xl font-mono text-base leading-relaxed text-dark-band-foreground/75">
            {homeContent.archive.description}
          </p>
        </div>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="w-full rounded-none border-dark-band-foreground/50 bg-transparent text-dark-band-foreground hover:bg-dark-band-foreground hover:text-dark-band sm:w-auto"
        >
          <Link href={homeContent.archive.action.href}>
            {homeContent.archive.action.label}
            <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
          </Link>
        </Button>
      </FieldSection>
    </div>
  )
}

function selectedMetadata(work: (typeof selectedWorks)[number]) {
  if (work.id === "crow-at-dawn") {
    return "2002 · The Midwest Quarterly · Reprinted 2026"
  }

  return `${work.year} · ${work.venue}`
}

function selectedActionLabel(work: (typeof selectedWorks)[number]) {
  if (work.id === "crow-at-dawn") {
    return "Read at Gyroscope Review"
  }

  return work.access === "online" ? `Read at ${work.venue}` : work.actionLabel
}
