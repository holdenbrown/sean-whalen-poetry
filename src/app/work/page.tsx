import { ArrowUpRightIcon } from "lucide-react"

import { FieldSection } from "@/components/editorial/field-section"
import { PublicationRow } from "@/components/editorial/publication-row"
import { ExternalLink } from "@/components/external-link"
import { thesisArchive, workPageContent, worksByYear } from "@/content/works"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Explore Sean Whalen's source-linked publication index and his 46-poem 2004 thesis, Small ecologies.",
  path: "/work",
})

export default function WorkPage() {
  return (
    <div className="site-frame">
      <FieldSection
        railLabel={workPageContent.railLabel}
        aria-labelledby="work-title"
        contentClassName="py-site-3xl lg:py-site-4xl"
      >
        <header className="max-w-5xl">
          <h1 id="work-title" className="display-page">
            {workPageContent.title}
          </h1>
          <p className="mt-5 font-mono text-sm text-foreground">
            {workPageContent.summary}
          </p>
          <p className="mt-8 max-w-4xl font-heading text-3xl leading-snug sm:text-4xl">
            {workPageContent.description}
          </p>
          <p className="mt-3 font-mono text-sm leading-relaxed text-muted-foreground">
            {workPageContent.note}
          </p>
        </header>
      </FieldSection>

      <FieldSection
        railLabel="ARCHIVE / 02"
        aria-labelledby="thesis-title"
        className="border-y border-primary-foreground/30 bg-primary text-primary-foreground"
        railClassName="border-primary-foreground/30"
        railMarkClassName="text-primary-foreground"
        contentClassName="py-site-2xl lg:py-site-3xl"
      >
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <header className="lg:col-span-3">
            <p className="font-mono text-xs tracking-wide text-primary-foreground/90 uppercase">
              {thesisArchive.year} · {thesisArchive.type}
            </p>
            <h2 id="thesis-title" className="display-section mt-4 italic">
              {thesisArchive.title}
            </h2>
            <p className="mt-5 max-w-3xl font-heading text-2xl leading-snug sm:text-3xl">
              {thesisArchive.author}&rsquo;s Iowa State thesis gathers{" "}
              {thesisArchive.poemCount} poems into an early ecology of fields, animals,
              weather, work, and memory.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-primary-foreground/90">
              Forty exact-title additions extend beyond the publication records below;
              six titles overlap. Together, the verified sources account for{" "}
              {thesisArchive.uniqueWorksOverall} unique works.
            </p>
          </header>

          <div className="lg:col-span-2">
            <dl className="grid grid-cols-2 border-t border-l border-primary-foreground/30">
              {[
                ["POEMS", thesisArchive.poemCount],
                ["ARCHIVE-ONLY", thesisArchive.exactTitleAdditions],
                ["UNIQUE WORKS", thesisArchive.uniqueWorksOverall],
                ["DEGREE", thesisArchive.degree],
              ].map(([term, detail]) => (
                <div
                  key={term}
                  className="border-r border-b border-primary-foreground/30 px-3 py-5"
                >
                  <dt className="font-mono text-xs text-primary-foreground/90">
                    {term}
                  </dt>
                  <dd className="mt-2 font-heading text-xl leading-tight">{detail}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-col gap-2 font-mono text-sm">
              <ArchiveLink href={thesisArchive.repositoryHref}>
                Institutional record
              </ArchiveLink>
              <ArchiveLink href={thesisArchive.doiHref}>DOI record</ArchiveLink>
            </div>
          </div>
        </div>
      </FieldSection>

      <FieldSection
        railLabel="INDEX / 03"
        aria-label="Source-linked publication records"
        className="border-b border-border"
        contentClassName="py-site-2xl lg:py-site-3xl"
      >
        <div id="published-work-index" className="border-t border-border">
          {worksByYear.map((group) => (
            <section
              key={group.year}
              aria-labelledby={`works-${group.year}`}
              className="work-year-group border-b border-border py-site-2xl"
            >
              <h2
                id={`works-${group.year}`}
                className="font-heading text-6xl leading-none font-normal tracking-tight sm:text-7xl"
              >
                {group.year}
              </h2>
              <ul className="border-t border-border">
                {group.works.map((work) => (
                  <li key={work.id}>
                    <PublicationRow
                      work={work}
                      variant="compact"
                      metadata={workMetadata(work)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-site-2xl max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
          {workPageContent.updateNote}
        </p>
      </FieldSection>
    </div>
  )
}

function ArchiveLink({ href, children }: { href: string; children: string }) {
  return (
    <ExternalLink
      href={href}
      className="focus-editorial flex min-h-11 items-center justify-between border-b border-primary-foreground/30 py-2 transition-colors hover:bg-primary-foreground/10"
    >
      <span>{children}</span>
      <ArrowUpRightIcon aria-hidden="true" className="size-4" strokeWidth={1.5} />
    </ExternalLink>
  )
}

function workMetadata(work: (typeof worksByYear)[number]["works"][number]) {
  const details = [work.venue, work.issue, work.page ? `p. ${work.page}` : undefined]
  return details.filter(Boolean).join(" · ")
}
