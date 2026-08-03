import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

test("the primary reading path works", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/^Sean Whalen$/)
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

test("the work index exposes every verified publication and the thesis archive", async ({
  page,
}) => {
  await page.goto("/work/")

  await expect(page).toHaveTitle(/^Work \| Sean Whalen$/)
  await expect(page.getByRole("heading", { level: 1, name: "Work" })).toBeVisible()
  await expect(
    page.getByRole("heading", { level: 2, name: "Small ecologies" })
  ).toBeVisible()
  await expect(
    page.locator("#published-work-index").locator('a[target="_blank"]')
  ).toHaveCount(42)
  await expect(
    page.getByRole("link", { name: /Institutional record/ })
  ).toHaveAttribute("href", "https://dr.lib.iastate.edu/handle/20.500.12876/69962")
})

test("the about page presents the verified biography", async ({ page }) => {
  await page.goto("/about/")

  await expect(page).toHaveTitle(/^About \| Sean Whalen$/)
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

  for (const label of ["Home", "Work", "About", "Read the work"]) {
    await expect(
      mobileNavigation.getByRole("link", { name: label, exact: true })
    ).toBeVisible()
  }

  await mobileNavigation.getByRole("link", { name: "Work", exact: true }).click()

  await expect(page).toHaveURL(/\/work\/?$/)
  await expect(page.getByRole("heading", { level: 1, name: "Work" })).toBeVisible()
  await expect(mobileNavigation).not.toHaveAttribute("open", "")
})
