import { describe, expect, it } from "vitest"

import { selectedWorks, thesisArchive, works, worksByYear } from "@/content/works"

describe("Sean Whalen work records", () => {
  it("keeps the verified standalone bibliography at 42 unique titles", () => {
    expect(works).toHaveLength(42)
    expect(new Set(works.map((work) => work.id)).size).toBe(42)
  })

  it("keeps the thesis archive counts aligned with the research packet", () => {
    expect(thesisArchive.poemCount).toBe(46)
    expect(thesisArchive.exactTitleAdditions).toBe(40)
    expect(thesisArchive.uniqueWorksOverall).toBe(82)
    expect(new URL(thesisArchive.repositoryHref).protocol).toBe("https:")
    expect(new URL(thesisArchive.doiHref).protocol).toBe("https:")
  })

  it("keeps every outbound source on HTTPS", () => {
    for (const work of works) {
      expect(new URL(work.href).protocol).toBe("https:")
    }
  })

  it("groups every work once in newest-first order", () => {
    const groupedIds = worksByYear.flatMap((group) =>
      group.works.map((work) => work.id)
    )

    expect(groupedIds).toHaveLength(works.length)
    expect(new Set(groupedIds).size).toBe(works.length)
    expect(worksByYear.map((group) => group.year)).toEqual(
      [...worksByYear.map((group) => group.year)].sort((a, b) => b - a)
    )
  })

  it("uses only verified records in the homepage selection", () => {
    const knownIds = new Set<string>(works.map((work) => work.id))

    expect(selectedWorks).toHaveLength(6)
    expect(selectedWorks.every((work) => knownIds.has(work.id))).toBe(true)
  })
})
