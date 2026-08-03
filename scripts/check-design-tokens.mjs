import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

const sourceRoot = path.join(process.cwd(), "src")
const allowedLiteralFiles = new Set([
  path.normalize("src/app/globals.css"),
  path.normalize("src/app/icon.svg"),
  path.normalize("src/app/layout.tsx"),
  path.normalize("src/app/manifest.ts"),
  path.normalize("src/app/opengraph-image.png/route.ts"),
])
const sourceExtensions = new Set([".css", ".ts", ".tsx"])
const rawColorUtility =
  /(?:bg|text|border|outline|ring|from|via|to|fill|stroke)-\[(?:#|rgba?\(|hsla?\(|oklch\()/g
const namedColorUtility =
  /\b(?:bg|text|border|outline|ring|from|via|to|fill|stroke)-(?:black|white|slate(?:-\d{2,3})?|gray(?:-\d{2,3})?|zinc(?:-\d{2,3})?|neutral(?:-\d{2,3})?|stone(?:-\d{2,3})?|red(?:-\d{2,3})?|orange(?:-\d{2,3})?|amber(?:-\d{2,3})?|yellow(?:-\d{2,3})?|lime(?:-\d{2,3})?|green(?:-\d{2,3})?|emerald(?:-\d{2,3})?|teal(?:-\d{2,3})?|cyan(?:-\d{2,3})?|sky(?:-\d{2,3})?|blue(?:-\d{2,3})?|indigo(?:-\d{2,3})?|violet(?:-\d{2,3})?|purple(?:-\d{2,3})?|fuchsia(?:-\d{2,3})?|pink(?:-\d{2,3})?|rose(?:-\d{2,3})?)(?:\/\d{1,3})?\b/g
const rawCssColor = /(?:#[0-9a-f]{3,8}\b|(?:rgb|hsl|oklch)\()/gi
const rawDesignUtility =
  /\b(?:m[trblxy]?|p[trblxy]?|gap(?:-[xy])?|space-[xy]|rounded|shadow|duration|ease|font|text|tracking|leading)-\[[^\]]+\]/g
const violations = []

for (const file of await walk(sourceRoot)) {
  if (!sourceExtensions.has(path.extname(file))) {
    continue
  }

  const relative = path.normalize(path.relative(process.cwd(), file))

  if (allowedLiteralFiles.has(relative)) {
    continue
  }

  const content = await readFile(file, "utf8")
  const utilityMatches = [...content.matchAll(rawColorUtility)]
  const namedUtilityMatches = [...content.matchAll(namedColorUtility)]
  const colorMatches = [...content.matchAll(rawCssColor)]
  const designUtilityMatches = [...content.matchAll(rawDesignUtility)]

  for (const match of [
    ...utilityMatches,
    ...namedUtilityMatches,
    ...colorMatches,
    ...designUtilityMatches,
  ]) {
    const line = content.slice(0, match.index).split("\n").length
    violations.push(relative + ":" + line + " uses raw design value " + match[0])
  }
}

await validateStaticOutputColors()

if (violations.length > 0) {
  console.error("Design-token policy failed:\n" + violations.join("\n"))
  process.exit(1)
}

console.log("Design-token policy passed.")

async function validateStaticOutputColors() {
  const globalStyles = await readFile(
    path.join(process.cwd(), "src/app/globals.css"),
    "utf8"
  )
  const rootBlocks = [...globalStyles.matchAll(/:root\s*\{([^}]*)\}/g)].map(
    (match) => match[1] ?? ""
  )
  const light = rootBlocks[0]
  const dark = rootBlocks[1]

  if (!light || !dark) {
    violations.push("src/app/globals.css must define light and dark :root token blocks")
    return
  }

  const expectations = [
    {
      file: "src/app/layout.tsx",
      values: [readToken(light, "--background"), readToken(dark, "--background")],
    },
    {
      file: "src/app/manifest.ts",
      values: [readToken(light, "--background")],
    },
    {
      file: "src/app/opengraph-image.png/route.ts",
      values: [
        readToken(light, "--background"),
        readToken(light, "--foreground"),
        readToken(light, "--muted-foreground"),
        readToken(light, "--ring"),
      ],
    },
    {
      file: "src/app/icon.svg",
      values: [readToken(light, "--primary"), readToken(light, "--primary-foreground")],
    },
  ]

  for (const expectation of expectations) {
    const content = await readFile(path.join(process.cwd(), expectation.file), "utf8")

    for (const value of expectation.values) {
      if (!value) {
        violations.push(
          expectation.file + " depends on a design token that could not be resolved"
        )
      } else if (!content.includes(value)) {
        violations.push(
          expectation.file + " is not synchronized with design-token value " + value
        )
      }
    }
  }
}

function readToken(block, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return block.match(new RegExp(escapedName + "\\s*:\\s*([^;]+);"))?.[1]?.trim()
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
