import { describe, expect, it } from "vitest"

import {
  absoluteUrl,
  getBasePath,
  getSiteUrl,
  normalizeBasePath,
  withBasePath,
} from "@/lib/deployment"

describe("deployment paths", () => {
  it("normalizes explicit base paths", () => {
    expect(normalizeBasePath("project/")).toBe("/project")
    expect(normalizeBasePath("/project/")).toBe("/project")
    expect(normalizeBasePath("/")).toBe("")
    expect(normalizeBasePath("")).toBe("")
  })

  it("derives a GitHub project Pages base path", () => {
    expect(
      getBasePath({
        GITHUB_ACTIONS: "true",
        GITHUB_REPOSITORY: "owner/project",
      })
    ).toBe("/project")
  })

  it("keeps user and organization Pages at the root", () => {
    expect(
      getBasePath({
        GITHUB_ACTIONS: "true",
        GITHUB_REPOSITORY: "owner/owner.github.io",
      })
    ).toBe("")
  })

  it("lets an explicit empty base path override automation", () => {
    expect(
      getBasePath({
        NEXT_PUBLIC_BASE_PATH: "",
        GITHUB_ACTIONS: "true",
        GITHUB_REPOSITORY: "owner/project",
      })
    ).toBe("")
  })

  it("derives the canonical GitHub Pages URL", () => {
    expect(
      getSiteUrl({
        GITHUB_ACTIONS: "true",
        GITHUB_REPOSITORY: "owner/project",
      })
    ).toBe("https://owner.github.io/project")
  })

  it("prefixes public assets once", () => {
    const env = { NEXT_PUBLIC_BASE_PATH: "/project" }

    expect(withBasePath("/icon.svg", env)).toBe("/project/icon.svg")
    expect(withBasePath("/project/icon.svg", env)).toBe("/project/icon.svg")
    expect(withBasePath("https://cdn.example.com/image.png", env)).toBe(
      "https://cdn.example.com/image.png"
    )
  })

  it("builds absolute route URLs without dropping a project path", () => {
    expect(absoluteUrl("/about/", "https://owner.github.io/project")).toBe(
      "https://owner.github.io/project/about/"
    )
  })
})
