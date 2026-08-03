import { access } from "node:fs/promises"
import path from "node:path"

const outputRoot = path.join(process.cwd(), "out")
const requiredPaths = [
  ".nojekyll",
  "404.html",
  "icon.svg",
  "index.html",
  "manifest.webmanifest",
  "opengraph-image.png",
  "robots.txt",
  "sitemap.xml",
]
const missing = []

for (const relative of requiredPaths) {
  try {
    await access(path.join(outputRoot, relative))
  } catch {
    missing.push(relative)
  }
}

if (missing.length > 0) {
  console.error("Static export is missing:\n" + missing.join("\n"))
  process.exit(1)
}

console.log("Static export contains all required files.")
