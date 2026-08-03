import { access, readdir, readFile } from "node:fs/promises"
import path from "node:path"

const outputRoot = path.join(process.cwd(), "out")
const basePath = resolveBasePath(process.env)
const htmlFiles = (await walk(outputRoot)).filter((file) => file.endsWith(".html"))
const failures = []

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8")
  const attributes = html.matchAll(/(?:href|src)=["']([^"'<>]+)["']/g)

  for (const attribute of attributes) {
    const original = decodeAttribute(attribute[1] ?? "")

    if (shouldSkip(original)) {
      continue
    }

    const withoutFragment = original.split("#")[0]?.split("?")[0] ?? ""

    if (!withoutFragment) {
      continue
    }

    const stripped = stripBasePath(withoutFragment, basePath)
    const candidates = getCandidates(stripped, htmlFile)
    const exists = await anyExists(candidates)

    if (!exists) {
      failures.push(
        path.relative(outputRoot, htmlFile) +
          " -> " +
          original +
          " (checked " +
          candidates
            .map((candidate) => path.relative(outputRoot, candidate))
            .join(", ") +
          ")"
      )
    }
  }
}

if (failures.length > 0) {
  console.error("Broken exported links or assets:\n" + failures.join("\n"))
  process.exit(1)
}

console.log("All exported internal links and assets resolve.")

function normalizeBasePath(value) {
  if (!value || value === "/") {
    return ""
  }

  return "/" + value.replace(/^\/+|\/+$/g, "")
}

function resolveBasePath(environment) {
  if (typeof environment.NEXT_PUBLIC_BASE_PATH === "string") {
    return normalizeBasePath(environment.NEXT_PUBLIC_BASE_PATH)
  }

  if (environment.GITHUB_ACTIONS !== "true" || !environment.GITHUB_REPOSITORY) {
    return ""
  }

  const repositoryName = environment.GITHUB_REPOSITORY.split("/")[1]

  if (!repositoryName || repositoryName.endsWith(".github.io")) {
    return ""
  }

  return normalizeBasePath(repositoryName)
}

function stripBasePath(value, prefix) {
  if (!prefix) {
    return value
  }

  if (value === prefix) {
    return "/"
  }

  return value.startsWith(prefix + "/") ? value.slice(prefix.length) : value
}

function shouldSkip(value) {
  return (
    value === "" ||
    value.startsWith("#") ||
    value.startsWith("data:") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("javascript:") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("//")
  )
}

function getCandidates(value, sourceFile) {
  const decoded = decodeURIComponent(value)
  const target = decoded.startsWith("/")
    ? path.join(outputRoot, decoded.slice(1))
    : path.resolve(path.dirname(sourceFile), decoded)

  if (path.extname(target)) {
    return [target]
  }

  return [target, target + ".html", path.join(target, "index.html")]
}

async function anyExists(candidates) {
  for (const candidate of candidates) {
    try {
      await access(candidate)
      return true
    } catch {
      // Try the next valid static-route shape.
    }
  }

  return false
}

function decodeAttribute(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"')
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
