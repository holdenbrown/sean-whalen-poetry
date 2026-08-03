import { appendFile, readFile, rename, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

const additionsPath = path.join(process.cwd(), "src", "content", "works.additions.json")
const researchWorksPath = path.join(
  process.cwd(),
  "docs",
  "research",
  "sean-whalen",
  "works.json"
)
const actionLabels = {
  online: "Read online",
  pdf: "Open issue PDF",
  scan: "Open issue scan",
  record: "View publication record",
}
const currentYear = new Date().getUTCFullYear()

export async function main(
  environment = process.env,
  argumentsList = process.argv.slice(2)
) {
  const dryRun =
    argumentsList.includes("--dry-run") ||
    parseBooleanInput(environment.PUBLICATION_DRY_RUN ?? "false", "dry-run")
  const candidate = buildCandidate(environment)
  const [additions, research] = await Promise.all([
    readJsonArray(additionsPath, "publication additions"),
    readJsonObject(researchWorksPath, "research work index"),
  ])

  if (!Array.isArray(research.works)) {
    throw new TypeError("Research work index must contain a works array")
  }

  const identities = [
    ...research.works.map((work, index) =>
      readIdentity(work, `Research work ${index + 1}`)
    ),
    ...additions.map((work, index) =>
      readIdentity(work, `Publication addition ${index + 1}`)
    ),
  ]
  const knownIds = new Map()
  const knownTitles = new Map()

  for (const identity of identities) {
    const normalizedTitle = normalizeTitle(identity.title)
    const titleForId = knownIds.get(identity.id)
    const idForTitle = knownTitles.get(normalizedTitle)

    if (titleForId && titleForId !== normalizedTitle) {
      throw new TypeError(`Existing duplicate work id: ${identity.id}`)
    }

    if (idForTitle && idForTitle !== identity.id) {
      throw new TypeError(`Existing duplicate work title: ${identity.title}`)
    }

    knownIds.set(identity.id, normalizedTitle)
    knownTitles.set(normalizedTitle, identity.id)
  }

  if (knownIds.has(candidate.id)) {
    throw new TypeError(`Duplicate work id: ${candidate.id}`)
  }

  if (knownTitles.has(normalizeTitle(candidate.title))) {
    throw new TypeError(
      `Duplicate work title: ${candidate.title}. Update the existing record for a reprint.`
    )
  }

  if (dryRun) {
    console.log(
      `Validated ${candidate.id}; dry run left works.additions.json unchanged.`
    )
    console.log(JSON.stringify(candidate, null, 2))
    await writeOutput(environment.GITHUB_OUTPUT, candidate.id, true)
    return candidate
  }

  const updatedAdditions = [...additions, candidate].sort(comparePublications)
  const temporaryPath = `${additionsPath}.${process.pid}.tmp`

  try {
    await writeFile(
      temporaryPath,
      `${JSON.stringify(updatedAdditions, null, 2)}\n`,
      "utf8"
    )
    await rename(temporaryPath, additionsPath)
  } finally {
    await rm(temporaryPath, { force: true })
  }

  await writeOutput(environment.GITHUB_OUTPUT, candidate.id, false)
  console.log(`Added ${candidate.id} to works.additions.json.`)
  return candidate
}

export function buildCandidate(environment) {
  if (!parseBooleanInput(environment.PUBLICATION_CONFIRMED, "confirmation")) {
    throw new TypeError("Publication confirmation must be accepted")
  }

  const title = readRequiredInput(environment.PUBLICATION_TITLE, "title", 200)
  const venue = readRequiredInput(environment.PUBLICATION_VENUE, "venue", 160)
  const yearInput = readRequiredInput(environment.PUBLICATION_YEAR, "year", 4)

  if (!/^\d{4}$/.test(yearInput)) {
    throw new TypeError("year must be a four-digit integer")
  }

  const year = Number(yearInput)

  if (year < 1900 || year > currentYear) {
    throw new TypeError(`year must be between 1900 and ${currentYear}`)
  }

  const dateDisplay = readRequiredInput(
    environment.PUBLICATION_DATE_DISPLAY,
    "display date",
    80
  )

  if (!dateDisplay.includes(yearInput)) {
    throw new TypeError("display date must contain its publication year")
  }

  const issue = readOptionalInput(environment.PUBLICATION_ISSUE, "issue", 120)
  const page = readOptionalPage(environment.PUBLICATION_PAGE)
  const href = readRequiredInput(environment.PUBLICATION_HREF, "source URL", 2048)
  let sourceUrl

  try {
    sourceUrl = new URL(href)
  } catch {
    throw new TypeError("source URL must be a valid URL")
  }

  if (sourceUrl.protocol !== "https:" || sourceUrl.username || sourceUrl.password) {
    throw new TypeError("source URL must use HTTPS and must not contain credentials")
  }

  const access = readRequiredInput(environment.PUBLICATION_ACCESS, "access type", 20)

  if (!(access in actionLabels)) {
    throw new TypeError(
      `access type must be one of: ${Object.keys(actionLabels).join(", ")}`
    )
  }

  const id = slugifyTitle(title)

  if (!id || id.length > 100) {
    throw new TypeError("title could not produce a valid ID of 100 characters or fewer")
  }

  return {
    id,
    title,
    year,
    dateDisplay,
    venue,
    ...(issue ? { issue } : {}),
    ...(page ? { page } : {}),
    href,
    access,
    actionLabel: actionLabels[access],
    thesisOverlap: parseBooleanInput(
      environment.PUBLICATION_THESIS_OVERLAP,
      "thesis overlap"
    ),
  }
}

export function normalizeTitle(title) {
  return title.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US")
}

export function slugifyTitle(title) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-US")
    .replace(/&/g, " and ")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function comparePublications(left, right) {
  return (
    Number(right.year) - Number(left.year) ||
    normalizeTitle(String(left.title)).localeCompare(
      normalizeTitle(String(right.title)),
      "en"
    ) ||
    String(left.id).localeCompare(String(right.id), "en")
  )
}

function readIdentity(value, label) {
  if (!isRecord(value)) {
    throw new TypeError(`${label} must be an object`)
  }

  return {
    id: readRequiredInput(value.id, `${label} id`, 100),
    title: readRequiredInput(value.title, `${label} title`, 200),
  }
}

function readRequiredInput(value, label, maximumLength) {
  if (typeof value !== "string" || value.length === 0) {
    throw new TypeError(`${label} must be a non-empty string`)
  }

  if (value !== value.trim()) {
    throw new TypeError(`${label} must not have leading or trailing whitespace`)
  }

  if (/[\u0000-\u001f\u007f]/.test(value)) {
    throw new TypeError(`${label} must not contain control characters`)
  }

  if (value.length > maximumLength) {
    throw new TypeError(`${label} must be ${maximumLength} characters or fewer`)
  }

  return value
}

function readOptionalInput(value, label, maximumLength) {
  return value === undefined || value === ""
    ? undefined
    : readRequiredInput(value, label, maximumLength)
}

function readOptionalPage(value) {
  if (value === undefined || value === "") {
    return undefined
  }

  if (!/^\d+$/.test(value)) {
    throw new TypeError("page must be a positive integer")
  }

  const page = Number(value)

  if (!Number.isSafeInteger(page) || page < 1 || page > 10_000) {
    throw new TypeError("page must be a positive integer no greater than 10000")
  }

  return page
}

function parseBooleanInput(value, label) {
  if (value === true || value === "true") {
    return true
  }

  if (value === false || value === "false") {
    return false
  }

  throw new TypeError(`${label} must be true or false`)
}

async function readJsonArray(file, label) {
  const value = await readJson(file, label)

  if (!Array.isArray(value)) {
    throw new TypeError(`${label} must be a JSON array`)
  }

  return value
}

async function readJsonObject(file, label) {
  const value = await readJson(file, label)

  if (!isRecord(value)) {
    throw new TypeError(`${label} must be a JSON object`)
  }

  return value
}

async function readJson(file, label) {
  try {
    return JSON.parse(await readFile(file, "utf8"))
  } catch (error) {
    throw new TypeError(`${label} could not be read: ${error.message}`)
  }
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

async function writeOutput(outputPath, id, dryRun) {
  if (!outputPath) {
    return
  }

  await appendFile(outputPath, `id=${id}\ndry_run=${dryRun}\n`, "utf8")
}

const executedFile = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href
  : undefined

if (executedFile === import.meta.url) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
}
