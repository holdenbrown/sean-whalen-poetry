import { expect, test } from "@playwright/test"

for (const route of ["/", "/work/"]) {
  test(`${route} keeps every publication title, venue and action separated at responsive widths`, async ({
    page,
  }) => {
    for (const width of [
      320, 390, 768, 820, 1015, 1023, 1024, 1120, 1121, 1280, 1440,
    ]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto(route)
      await page.evaluate(() => document.fonts.ready)
      const result = await page.locator(".publication-row").evaluateAll((rows) => {
        const rectangle = (rect: DOMRect) => ({
          left: rect.left,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
        })
        const overlaps = (first: DOMRect, second: DOMRect) =>
          Math.min(first.right, second.right) - Math.max(first.left, second.left) > 1 &&
          Math.min(first.bottom, second.bottom) - Math.max(first.top, second.top) > 1
        const sectionTitle = document.querySelector("#selected-publications-title")
        const sectionRange = document.createRange()
        if (sectionTitle) sectionRange.selectNodeContents(sectionTitle)
        const sectionRects = sectionTitle ? [...sectionRange.getClientRects()] : []
        return rows.map((row) => {
          const bounds = row.getBoundingClientRect()
          const fields = [
            "h3",
            ".publication-row-metadata",
            ".publication-row-action",
          ].map((selector) => {
            const element = row.querySelector(selector)!
            const range = document.createRange()
            range.selectNodeContents(element)
            const rects = [
              ...range.getClientRects(),
              ...[...element.querySelectorAll("svg")].map((svg) =>
                svg.getBoundingClientRect()
              ),
            ].filter((rect) => rect.width > 0 && rect.height > 0)
            return { selector, rects }
          })
          const collisions: string[] = []
          for (const [index, firstField] of fields.entries()) {
            for (const secondField of fields.slice(index + 1)) {
              if (
                firstField.rects.some((first) =>
                  secondField.rects.some((second) => overlaps(first, second))
                )
              )
                collisions.push(`${firstField.selector} / ${secondField.selector}`)
            }
            if (
              firstField.rects.some((rect) =>
                sectionRects.some((title) => overlaps(rect, title))
              )
            )
              collisions.push(`Section title / ${firstField.selector}`)
          }
          const outside = fields.flatMap((field) =>
            field.rects
              .filter(
                (rect) =>
                  rect.left < bounds.left - 1 ||
                  rect.right > bounds.right + 1 ||
                  rect.top < bounds.top - 1 ||
                  rect.bottom > bounds.bottom + 1
              )
              .map(() => field.selector)
          )
          return {
            title: row.querySelector("h3")!.textContent,
            collisions,
            outside,
            bounds: rectangle(bounds),
          }
        })
      })
      expect(result.length).toBeGreaterThan(0)
      expect(
        result.filter((row) => row.collisions.length || row.outside.length),
        `${route} at ${width}px`
      ).toEqual([])
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        `${route} must fit ${width}px`
      ).toBeLessThanOrEqual(width)
    }
  })
}
