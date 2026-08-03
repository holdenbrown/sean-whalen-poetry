import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

const outputRoot = path.join(process.cwd(), "out")
const htmlFiles = (await walk(outputRoot)).filter((file) => {
  const relative = path.relative(outputRoot, file)

  return (
    file.endsWith("index.html") &&
    !relative.startsWith("_next" + path.sep) &&
    !relative.startsWith("_not-found" + path.sep) &&
    !relative.startsWith("404" + path.sep)
  )
})
const failures = []
const titles = new Map()
const canonicals = new Map()

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8")
  const relative = path.relative(outputRoot, file)
  const title = getTagText(html, "title")
  const description = getMetaContent(html, "description")
  const canonical = getLinkHref(html, "canonical")
  const openGraphTitle = getMetaPropertyContent(html, "og:title")
  const openGraphUrl = getMetaPropertyContent(html, "og:url")
  const openGraphImage = getMetaPropertyContent(html, "og:image")
  const h1Count = (html.match(/<h1(?:\s|>)/g) ?? []).length

  requireValue(relative, "title", title)
  requireValue(relative, "description", description)
  requireValue(relative, "canonical", canonical)
  requireValue(relative, "og:title", openGraphTitle)
  requireValue(relative, "og:url", openGraphUrl)
  requireValue(relative, "og:image", openGraphImage)

  if (canonical && openGraphUrl && canonical !== openGraphUrl) {
    failures.push(relative + " has different canonical and og:url values")
  }

  if (process.env.REQUIRE_PRODUCTION_URL === "true") {
    validateProductionUrl(relative, "canonical", canonical)
    validateProductionUrl(relative, "og:url", openGraphUrl)
    validateProductionUrl(relative, "og:image", openGraphImage)
  }

  if (h1Count !== 1) {
    failures.push(relative + " has " + h1Count + " h1 elements; expected exactly 1")
  }

  recordUnique(titles, title, relative, "title")
  recordUnique(canonicals, canonical, relative, "canonical")
}

const notFoundPath = path.join(outputRoot, "404.html")
const notFoundHtml = await readFile(notFoundPath, "utf8")
const notFoundRobots = getMetaContent(notFoundHtml, "robots")

if (!notFoundRobots?.toLowerCase().includes("noindex")) {
  failures.push("404.html must include a noindex robots directive")
}

if (getLinkHref(notFoundHtml, "canonical")) {
  failures.push("404.html must not publish a canonical URL")
}

if ((notFoundHtml.match(/<h1(?:\s|>)/g) ?? []).length !== 1) {
  failures.push("404.html must contain exactly one h1")
}

if (failures.length > 0) {
  console.error("SEO policy failed:\n" + failures.join("\n"))
  process.exit(1)
}

console.log("Exported page metadata and heading policy passed.")

function requireValue(file, label, value) {
  if (!value) {
    failures.push(file + " is missing " + label)
  }
}

function recordUnique(values, value, file, label) {
  if (!value) {
    return
  }

  const existing = values.get(value)

  if (existing) {
    failures.push(file + " duplicates " + label + " from " + existing + ": " + value)
  } else {
    values.set(value, file)
  }
}

function validateProductionUrl(file, label, value) {
  if (!value) {
    return
  }

  try {
    const url = new URL(value)
    const hostname = url.hostname.toLowerCase()
    const isPlaceholder =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      hostname === "example.com" ||
      hostname.endsWith(".example")

    if (url.protocol !== "https:" || isPlaceholder) {
      failures.push(file + " has a non-production " + label + ": " + value)
    }
  } catch {
    failures.push(file + " has an invalid " + label + ": " + value)
  }
}

function getTagText(html, tagName) {
  const match = html.match(
    new RegExp("<" + tagName + "[^>]*>([^<]*)</" + tagName + ">")
  )
  return match?.[1]?.trim()
}

function getMetaContent(html, name) {
  return findAttribute(html, "meta", "name", name, "content")
}

function getMetaPropertyContent(html, property) {
  return findAttribute(html, "meta", "property", property, "content")
}

function getLinkHref(html, rel) {
  return findAttribute(html, "link", "rel", rel, "href")
}

function findAttribute(html, tagName, key, expected, resultKey) {
  const tags = html.match(new RegExp("<" + tagName + "\\b[^>]*>", "g")) ?? []

  for (const tag of tags) {
    const attributes = Object.fromEntries(
      [...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map((match) => [
        match[1],
        match[2],
      ])
    )

    if (attributes[key] === expected) {
      return attributes[resultKey]
    }
  }

  return undefined
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const target = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await walk(target)))
    } else {
      files.push(target)
    }
  }

  return files
}
