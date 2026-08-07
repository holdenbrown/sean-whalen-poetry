import { describe, expect, it } from "vitest"

import { homeContent } from "@/content/home"
import {
  bibliographyCount,
  forthcomingCount,
  normalizeWorkTitle,
  publicationCount,
  publicationYears,
  publishedCount,
  selectedWorks,
  summarizeWorks,
  thesisArchive,
  thesisOnlyCount,
  thesisOverlapCount,
  uniqueWorkCount,
  unpublishedCount,
  validateWorkRecords,
  workActionLabels,
  workPageContent,
  works,
  worksByYear,
  workYears,
} from "@/content/works"

const knownThesisOverlaps = [
  "chicken-time",
  "failed",
  "crow-in-love",
  "crow-at-dawn",
  "departure-arrival",
  "the-disinfectant-girl",
]

describe("Sean Whalen work records", () => {
  it("keeps every publication identity unique", () => {
    expect(bibliographyCount).toBe(works.length)
    expect(publishedCount).toBe(
      works.filter((work) => work.status === "published").length
    )
    expect(forthcomingCount).toBe(
      works.filter((work) => work.status === "forthcoming").length
    )
    expect(unpublishedCount).toBe(
      works.filter((work) => work.status === "accepted-unpublished").length
    )
    expect(publicationCount).toBe(publishedCount + forthcomingCount)
    expect(bibliographyCount).toBe(publishedCount + forthcomingCount + unpublishedCount)
    expect(new Set(works.map((work) => work.id)).size).toBe(works.length)
    expect(new Set(works.map((work) => normalizeWorkTitle(work.title))).size).toBe(
      works.length
    )
  })

  it("derives thesis and unique-work totals without double counting", () => {
    for (const id of knownThesisOverlaps) {
      expect(works.find((work) => work.id === id)?.thesisOverlap).toBe(true)
    }

    expect(thesisArchive.poemCount).toBe(46)
    expect(thesisOverlapCount).toBeGreaterThanOrEqual(knownThesisOverlaps.length)
    expect(thesisOverlapCount).toBe(works.filter((work) => work.thesisOverlap).length)
    expect(thesisOnlyCount).toBe(thesisArchive.poemCount - thesisOverlapCount)
    expect(uniqueWorkCount).toBe(bibliographyCount + thesisOnlyCount)
    expect(thesisArchive.exactTitleAdditions).toBe(thesisOnlyCount)
    expect(thesisArchive.uniqueWorksOverall).toBe(uniqueWorkCount)
    expect(new URL(thesisArchive.repositoryHref).protocol).toBe("https:")
    expect(new URL(thesisArchive.doiHref).protocol).toBe("https:")
  })

  it("updates publication totals when new non-thesis records are added", () => {
    const nextStatistics = summarizeWorks(
      [
        ...works,
        { status: "published", thesisOverlap: false },
        { status: "forthcoming", thesisOverlap: false },
        { status: "accepted-unpublished", thesisOverlap: false },
      ],
      thesisArchive.poemCount
    )

    expect(nextStatistics.bibliographyCount).toBe(bibliographyCount + 3)
    expect(nextStatistics.publishedCount).toBe(publishedCount + 1)
    expect(nextStatistics.forthcomingCount).toBe(forthcomingCount + 1)
    expect(nextStatistics.unpublishedCount).toBe(unpublishedCount + 1)
    expect(nextStatistics.publicationCount).toBe(publicationCount + 2)
    expect(nextStatistics.thesisPoemCount).toBe(thesisArchive.poemCount)
    expect(nextStatistics.thesisOverlapCount).toBe(thesisOverlapCount)
    expect(nextStatistics.thesisOnlyCount).toBe(thesisOnlyCount)
    expect(nextStatistics.uniqueWorkCount).toBe(uniqueWorkCount + 3)
  })

  it("does not double-count a new publication record for an existing thesis poem", () => {
    const nextStatistics = summarizeWorks(
      [...works, { status: "published", thesisOverlap: true }],
      thesisArchive.poemCount
    )

    expect(nextStatistics.bibliographyCount).toBe(bibliographyCount + 1)
    expect(nextStatistics.thesisPoemCount).toBe(thesisArchive.poemCount)
    expect(nextStatistics.thesisOverlapCount).toBe(thesisOverlapCount + 1)
    expect(nextStatistics.thesisOnlyCount).toBe(thesisOnlyCount - 1)
    expect(nextStatistics.uniqueWorkCount).toBe(uniqueWorkCount)
  })

  it("uses the shared derived totals in every highlighted piece of copy", () => {
    expect(workPageContent.summary).toBe(
      `${bibliographyCount} bibliography records · ${publishedCount} published · ${forthcomingCount} forthcoming · ${uniqueWorkCount} verified works overall`
    )
    expect(workPageContent.description).toContain(
      `${publicationCount} published or forthcoming poems`
    )
    expect(workPageContent.description).toContain(
      `${unpublishedCount} accepted-but-unpublished record`
    )
    expect(homeContent.selectedPublications.action.label).toBe(
      `View all ${uniqueWorkCount} verified works`
    )
  })

  it("keeps every source secure and every action label derived from access", () => {
    for (const work of works) {
      if (work.href) {
        expect(new URL(work.href).protocol).toBe("https:")
      } else {
        expect(work.access).toBe("print")
      }
      expect(work.actionLabel).toBe(workActionLabels[work.access])
    }
  })

  it("labels forthcoming and accepted-but-unpublished records honestly", () => {
    expect(works.filter((work) => work.status === "forthcoming")).toHaveLength(3)
    const twoFish = works.find((work) => work.id === "two-fish")

    expect(twoFish).toMatchObject({
      status: "accepted-unpublished",
      access: "print",
      thesisOverlap: true,
    })
    expect(twoFish?.href).toBeUndefined()
  })

  it("groups every work once in deterministic newest-first order", () => {
    const groupedIds = worksByYear.flatMap((group) =>
      group.works.map((work) => work.id)
    )

    expect(groupedIds).toHaveLength(works.length)
    expect(new Set(groupedIds).size).toBe(works.length)
    expect(worksByYear.map((group) => group.year)).toEqual(workYears)
    expect(workYears).toEqual([...workYears].sort((left, right) => right - left))
    expect(publicationYears.latest).toBe(workYears[0])
    expect(publicationYears.earliest).toBe(workYears.at(-1))

    for (const group of worksByYear) {
      const titles = group.works.map((work) => normalizeWorkTitle(work.title))
      expect(titles).toEqual(
        [...titles].sort((left, right) => left.localeCompare(right))
      )
    }
  })

  it("uses only verified records in the curated homepage selection", () => {
    const knownIds = new Set<string>(works.map((work) => work.id))

    expect(selectedWorks).toHaveLength(6)
    expect(selectedWorks.every((work) => knownIds.has(work.id))).toBe(true)
  })

  it("allows shared source URLs while rejecting duplicate IDs and titles", () => {
    const record = validRecord()
    const sharedUrlRecord = {
      ...record,
      id: "another-test-poem",
      title: "Another Test Poem",
    }

    expect(validateWorkRecords([record, sharedUrlRecord])).toHaveLength(2)
    expect(() =>
      validateWorkRecords([record, { ...record, title: "A Different Test Poem" }])
    ).toThrow(/Duplicate work id/)
    expect(() =>
      validateWorkRecords([record, { ...record, id: "same-title", title: "test poem" }])
    ).toThrow(/Duplicate work title/)
  })

  it("rejects future years and mismatched access labels", () => {
    const futureYear = new Date().getUTCFullYear() + 1

    expect(() =>
      validateWorkRecords([
        {
          ...validRecord(),
          year: futureYear,
          dateDisplay: String(futureYear),
        },
      ])
    ).toThrow(/year must be between/)
    expect(() =>
      validateWorkRecords([
        {
          ...validRecord(),
          access: "pdf",
          actionLabel: "Read online",
        },
      ])
    ).toThrow(/actionLabel does not match/)
  })
})

function validRecord() {
  const year = new Date().getUTCFullYear()

  return {
    id: "test-poem",
    title: "Test Poem",
    year,
    dateDisplay: `Spring ${year}`,
    venue: "Test Review",
    href: "https://example.org/shared-issue.pdf",
    access: "online",
    actionLabel: "Read online",
    thesisOverlap: false,
  }
}
