import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

import { heroArtwork } from "../../src/content/media"

test("the primary reading path works", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/^Sean Whalen — Iowa Poet$/)
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Sean Whalen",
    })
  ).toBeVisible()

  await page.getByRole("main").getByRole("link", { name: "Read selected work" }).click()

  await expect(page).toHaveURL(/\/#selected-publications$/)
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Selected publications",
    })
  ).toBeVisible()
})

test("the footer links to the studio without displacing Sean's identity", async ({
  page,
}) => {
  await page.goto("/")

  const studioCredit = page.getByRole("contentinfo").getByRole("link", {
    name: /Website by Holden Brown — get help with your site/,
  })

  await expect(studioCredit).toHaveAttribute("href", "https://holden-sites.pages.dev/")
  await expect(studioCredit).toHaveAttribute("target", "_blank")
  await expect(studioCredit).toHaveAttribute("rel", "noopener noreferrer")
})

const railLabelsByRoute = {
  "/": ["INTRO / 01", "WORK / 02", "ABOUT / 03", "INDEX / 04"],
  "/work/": ["OVERVIEW / 01", "THESIS / 02", "INDEX / 03"],
  "/about/": ["BIO / 01", "POETICS / 02", "WORK / 03"],
} as const

for (const [route, labels] of Object.entries(railLabelsByRoute)) {
  test(`${route} uses meaningful sequential field labels`, async ({ page }) => {
    await page.goto(route)

    await expect(page.locator(".field-rail-mark")).toHaveText([...labels])
  })
}

test("the hero uses responsive WebP sources and a decodable blur placeholder", async ({
  page,
}, testInfo) => {
  await page.goto("/")

  await expect(page.locator('.hero-picture source[type="image/webp"]')).toHaveCount(2)

  const currentSource = await page
    .locator(".hero-artwork")
    .evaluate((image: HTMLImageElement) => image.currentSrc)
  const expectedVariant = testInfo.project.name === "mobile-chromium" ? "960" : "1920"

  expect(currentSource).toContain(`northeast-iowa-aerial-${expectedVariant}.webp`)

  const blurDimensions = await page.evaluate(
    (blurDataURL) =>
      new Promise<{ width: number; height: number }>((resolve, reject) => {
        const image = new Image()

        image.onload = () => {
          resolve({ width: image.naturalWidth, height: image.naturalHeight })
        }
        image.onerror = () => {
          reject(new Error("The hero blur placeholder failed to decode."))
        }
        image.src = blurDataURL
      }),
    heroArtwork.blurDataURL
  )

  expect(blurDimensions).toEqual({ width: 10, height: 7 })
})

for (const route of ["/", "/work/", "/about/"]) {
  test(`${route} has no serious or critical axe violations`, async ({ page }) => {
    await page.goto(route)

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()
    const materialViolations = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? "")
    )

    expect(materialViolations).toEqual([])
  })
}

test("the work index exposes every bibliography record and the thesis archive", async ({
  page,
}) => {
  await page.goto("/work/")

  await expect(page).toHaveTitle(/^Poems & Publications by Sean Whalen$/)
  await expect(page.getByRole("heading", { level: 1, name: "Work" })).toBeVisible()
  await expect(
    page.getByRole("heading", { level: 2, name: "Small ecologies" })
  ).toBeVisible()

  const publicationSummary = page.getByText(/^\d+ bibliography records ·/)
  const publicationSummaryText = await publicationSummary.innerText()
  const summaryMatch = requireMatch(
    publicationSummaryText.match(
      /^(\d+) bibliography records · (\d+) published · (\d+) forthcoming · (\d+) verified works overall$/
    ),
    "publication summary"
  )
  const bibliography = matchNumber(summaryMatch, 1)
  const published = matchNumber(summaryMatch, 2)
  const forthcoming = matchNumber(summaryMatch, 3)
  const unique = matchNumber(summaryMatch, 4)

  await expect(page.locator("#published-work-index").locator("li")).toHaveCount(
    bibliography
  )

  const descriptionText = await page.getByText(/^A documented index of/).innerText()
  const descriptionMatch = requireMatch(
    descriptionText.match(
      /^A documented index of (\d+) published or forthcoming poems, (\d+) accepted-but-unpublished record(?:s)?, and the (\d+)-poem thesis Small ecologies, representing (\d+) unique verified works\.$/
    ),
    "work-page description"
  )
  const publication = matchNumber(descriptionMatch, 1)
  const unpublished = matchNumber(descriptionMatch, 2)
  const thesisPoems = matchNumber(descriptionMatch, 3)
  const describedUnique = matchNumber(descriptionMatch, 4)

  const thesisDetailsText = await page
    .getByText(/exact-title additions extend beyond/)
    .innerText()
  const thesisDetailsMatch = requireMatch(
    thesisDetailsText.match(
      /^(\d+) exact-title additions extend beyond the bibliography records below; (\d+) titles overlap\. Together, the verified sources account for (\d+) unique works\.$/
    ),
    "thesis detail"
  )
  const thesisOnly = matchNumber(thesisDetailsMatch, 1)
  const thesisOverlap = matchNumber(thesisDetailsMatch, 2)
  const thesisUnique = matchNumber(thesisDetailsMatch, 3)

  expect(publication).toBe(published + forthcoming)
  expect(bibliography).toBe(publication + unpublished)
  expect(thesisPoems).toBe(46)
  expect(thesisOnly).toBe(thesisPoems - thesisOverlap)
  expect(unique).toBe(bibliography + thesisOnly)
  expect(describedUnique).toBe(unique)
  expect(thesisUnique).toBe(unique)

  await expect(
    page.getByText("POEMS", { exact: true }).locator("xpath=following-sibling::dd")
  ).toHaveText(String(thesisPoems))
  await expect(
    page
      .getByText("ARCHIVE-ONLY", { exact: true })
      .locator("xpath=following-sibling::dd")
  ).toHaveText(String(thesisOnly))
  await expect(
    page
      .getByText("UNIQUE WORKS", { exact: true })
      .locator("xpath=following-sibling::dd")
  ).toHaveText(String(unique))
  await expect(page.getByText(/Forthcoming · Lyrical Iowa/)).toBeVisible()
  await expect(page.getByText(/Accepted; unpublished · Lakeshore Review/)).toBeVisible()
  await expect(
    page.getByRole("link", { name: /Institutional record/ })
  ).toHaveAttribute("href", "https://dr.lib.iastate.edu/handle/20.500.12876/69962")
})

test("the homepage work total stays synchronized with the full index", async ({
  page,
}) => {
  await page.goto("/")

  const workIndexLink = page.getByRole("link", {
    name: /^View all \d+ verified works$/,
  })
  const homeLinkText = await workIndexLink.innerText()
  const homeUniqueCount = matchNumber(
    requireMatch(homeLinkText.match(/(\d+)/), "homepage work total"),
    1
  )

  await workIndexLink.click()
  await expect(page).toHaveURL(/\/work\/$/)

  const workSummaryText = await page
    .getByText(/^\d+ bibliography records ·/)
    .innerText()
  const workUniqueCount = matchNumber(
    requireMatch(
      workSummaryText.match(/(\d+) verified works overall$/),
      "work-page unique total"
    ),
    1
  )

  expect(homeUniqueCount).toBe(workUniqueCount)
})

test("the about page presents the verified biography", async ({ page }) => {
  await page.goto("/about/")

  await expect(page).toHaveTitle(/^About Sean Whalen, Iowa Poet$/)
  await expect(page.getByRole("heading", { level: 1, name: "About" })).toBeVisible()
  await expect(
    page.getByText("M.A., Creative Writing · Iowa State University")
  ).toBeVisible()
  await expect(
    page.getByRole("img", {
      name: "Sean Whalen seated against a dark studio backdrop, wearing glasses and a dark sweater.",
    })
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: /Stacy McDonald \/ The Photician/ })
  ).toHaveAttribute("href", "https://photician.com/")
  await expect(page.getByText(/approved by Sean before launch/i)).toHaveCount(0)
})

test("mobile navigation exposes every shared link", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium")

  await page.goto("/")
  await page.locator("summary").click()

  const mobileNavigation = page.locator("details")

  for (const label of ["Home", "Work", "About"]) {
    await expect(
      mobileNavigation.getByRole("link", { name: label, exact: true })
    ).toBeVisible()
  }

  await mobileNavigation.getByRole("link", { name: "Work", exact: true }).click()

  await expect(page).toHaveURL(/\/work\/?$/)
  await expect(page.getByRole("heading", { level: 1, name: "Work" })).toBeVisible()
  await expect(mobileNavigation).not.toHaveAttribute("open", "")
})

function requireMatch(match: RegExpMatchArray | null, label: string): RegExpMatchArray {
  if (!match) {
    throw new Error(`Unable to parse ${label}`)
  }

  return match
}

function matchNumber(match: RegExpMatchArray, index: number) {
  const value = match[index]

  if (value === undefined) {
    throw new Error(`Missing numeric capture ${index}`)
  }

  return Number(value)
}
