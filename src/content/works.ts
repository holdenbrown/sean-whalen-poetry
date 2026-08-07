import workAdditionsJson from "./works.additions.json"

export type WorkAccess = "online" | "pdf" | "record" | "scan" | "print"

export type WorkStatus = "published" | "forthcoming" | "accepted-unpublished"

export type WorkActionLabel =
  | "Read online"
  | "Open issue PDF"
  | "Open issue scan"
  | "View publication record"
  | "Print record"

export type Work = Readonly<{
  id: string
  title: string
  year: number
  dateDisplay: string
  venue: string
  issue?: string
  page?: number
  href?: string
  access: WorkAccess
  actionLabel: WorkActionLabel
  status: WorkStatus
  thesisOverlap: boolean
}>

type BaseWork = Omit<Work, "status" | "thesisOverlap"> &
  Readonly<{
    status?: WorkStatus
    thesisOverlap?: boolean
  }>

export type WorksYearGroup = Readonly<{
  year: number
  works: readonly Work[]
}>

export type WorkStatistics = Readonly<{
  bibliographyCount: number
  publishedCount: number
  forthcomingCount: number
  unpublishedCount: number
  publicationCount: number
  thesisPoemCount: number
  thesisOverlapCount: number
  thesisOnlyCount: number
  uniqueWorkCount: number
}>

export type ThesisArchive = Readonly<{
  id: string
  title: string
  author: string
  year: number
  institution: string
  degree: string
  type: string
  poemCount: number
  exactTitleAdditions: number
  uniqueWorksOverall: number
  repositoryHref: string
  doiHref: string
}>

const thesisArchiveSource = {
  id: "small-ecologies",
  title: "Small ecologies",
  author: "Sean Brian Whalen",
  year: 2004,
  institution: "Iowa State University",
  degree: "M.A. in English (Creative Writing)",
  type: "M.A. thesis",
  poemCount: 46,
  repositoryHref: "https://dr.lib.iastate.edu/handle/20.500.12876/69962",
  doiHref: "https://doi.org/10.31274/rtd-180813-6997",
} as const

const baseWorks = [
  {
    id: "iowa-perspective",
    title: "Iowa Perspective",
    year: 2026,
    dateDisplay: "January 2026",
    venue: "Floating Acorn Review",
    issue: "5",
    href: "https://floatingacornreview.com/2026/01/04/sean-whalen-iowa-perspective/",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "marooned",
    title: "Marooned",
    year: 2026,
    dateDisplay: "Winter/Spring 2026",
    venue: "Naugatuck River Review",
    issue: "35",
    page: 82,
    href: "https://openurl.ebsco.com/contentitem/gcd%3A192781052",
    access: "record",
    actionLabel: "View publication record",
  },
  {
    id: "at-the-press-conference-during-the-fire",
    title: "At the Press Conference During the Fire",
    year: 2026,
    dateDisplay: "March 2026",
    venue: "Nude Bruce Review",
    issue: "16",
    page: 22,
    href: "https://nudebrucereview.com/wp-content/uploads/2026/03/nbr-16-final-layout.pdf",
    access: "pdf",
    actionLabel: "Open issue PDF",
  },
  {
    id: "the-prodigal-leaves-again",
    title: "The Prodigal Leaves Again",
    year: 2026,
    dateDisplay: "Spring 2026",
    venue: "Flowers of the Field",
    issue: "Inaugural issue",
    href: "https://flowers-of-the-field.com/current-edition",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "solstice",
    title: "Solstice",
    year: 2026,
    dateDisplay: "Spring 2026",
    venue: "Last Leaves",
    issue: "11: Balance",
    page: 9,
    href: "https://www.lastleavesmag.com/_files/ugd/dccfc8_5585047564cd4fb8b2e51ee723c6ba6c.pdf",
    access: "pdf",
    actionLabel: "Open issue PDF",
  },
  {
    id: "the-river-otter",
    title: "The River Otter",
    year: 2026,
    dateDisplay: "2026",
    venue: "Eastern Iowa Review",
    issue: "21",
    href: "https://www.portyonderpress.com/sean-whalen---the-river-otter.html",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "hubris-effigy-mounds-national-monument",
    title: "Hubris, Effigy Mounds National Monument",
    year: 2025,
    dateDisplay: "Spring 2025",
    venue: "Right Hand Pointing",
    issue: "159",
    href: "https://www.issues.righthandpointing.net/159",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "he-mows",
    title: "He Mows",
    year: 2025,
    dateDisplay: "Spring 2025",
    venue: "Right Hand Pointing",
    issue: "159",
    href: "https://www.issues.righthandpointing.net/159",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "long-walk",
    title: "Long Walk",
    year: 2025,
    dateDisplay: "2025",
    venue: "Steam Ticket",
    issue: "28",
    page: 12,
    href: "https://www.uwlax.edu/globalassets/academics/departments/english/publications/steam-ticket-volume-28.pdf",
    access: "pdf",
    actionLabel: "Open issue PDF",
  },
  {
    id: "transcontinental",
    title: "Transcontinental",
    year: 2025,
    dateDisplay: "Summer 2025",
    venue: "Gyroscope Review",
    issue: "Summer 2025",
    page: 37,
    href: "https://www.gyroscopereview.com/wp-content/uploads/2025/06/Summer-2025-Final-Web-with-cover.pdf",
    access: "pdf",
    actionLabel: "Open issue PDF",
  },
  {
    id: "so-we-bake-cakes-then",
    title: "So…We Bake Cakes Then…",
    year: 2025,
    dateDisplay: "June 2025",
    venue: "Songs of Eretz",
    issue: "Summer 2025: In the Kitchen",
    href: "https://www.songsoferetz.com/2025/06/",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "sky-mine",
    title: "Sky Mine",
    year: 2025,
    dateDisplay: "September 2025",
    venue: "Songs of Eretz",
    issue: "Fall 2025: Digging",
    href: "https://www.songsoferetz.com/2025/09/songs-of-eretz-fall-25-digging.html",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "edward-pointing-north",
    title: "Edward, Pointing North, Teaches Me to Count Arriving Geese",
    year: 2025,
    dateDisplay: "Fall 2025",
    venue: "Canary",
    issue: "70",
    href: "https://canarylitmag.org/archive_by_issue.php?issue=70",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "false-prophet",
    title: "False Prophet",
    year: 2025,
    dateDisplay: "Fall 2025",
    venue: "Canary",
    issue: "70",
    href: "https://canarylitmag.org/archive_by_issue.php?issue=70",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "here-he-comes-dragging-his-fish",
    title: "Here He Comes, Dragging His Fish",
    year: 2025,
    dateDisplay: "December 2025",
    venue: "Men Matters Online Journal",
    issue: "11",
    href: "https://menmattersonlinejournal.com/issue-11-sean-whalen/",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "scarf",
    title: "Scarf",
    year: 2024,
    dateDisplay: "2024",
    venue: "Oakwood",
    issue: "5.2",
    page: 48,
    href: "https://openprairie.sdstate.edu/oakwood/vol5/iss2/1/",
    access: "record",
    actionLabel: "View publication record",
  },
  {
    id: "the-rifle",
    title: "The Rifle",
    year: 2024,
    dateDisplay: "2024",
    venue: "Oakwood",
    issue: "5.2",
    page: 49,
    href: "https://openprairie.sdstate.edu/oakwood/vol5/iss2/1/",
    access: "record",
    actionLabel: "View publication record",
  },
  {
    id: "the-kids-play-the-first-circle",
    title:
      "The Kids Play ‘The First Circle’ at State Jazz While Ms. Hannah Battles Stage Four Cancer",
    year: 2024,
    dateDisplay: "Summer 2024",
    venue: "Unbroken",
    issue: "42",
    href: "https://www.theunjournals.com/unbroken42",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "in-the-den-of-nagaina",
    title: "In the Den of Nagaina",
    year: 2024,
    dateDisplay: "Summer 2024",
    venue: "New Feathers Anthology",
    issue: "5.2",
    href: "https://www.newfeathersanthology.com/in-the-den-of-nagaina.html",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "4-99",
    title: "4.99",
    year: 2024,
    dateDisplay: "August 2024",
    venue: "Stone Poetry Quarterly",
    href: "https://stonepoetryjournal.com/sean-whalen/",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "trophies",
    title: "Trophies",
    year: 2024,
    dateDisplay: "August 2024",
    venue: "Stone Poetry Quarterly",
    href: "https://stonepoetryjournal.com/sean-whalen/",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "the-disinfectant-girl",
    title: "The Disinfectant Girl",
    thesisOverlap: true,
    year: 2024,
    dateDisplay: "Fall 2024",
    venue: "Thimble Literary Magazine",
    issue: "7.2",
    page: 20,
    href: "https://www.thimblelitmag.com/wp-content/uploads/7.2WithPicsAN.pdf",
    access: "pdf",
    actionLabel: "Open issue PDF",
  },
  {
    id: "the-paper-girl",
    title: "The Paper Girl",
    year: 2024,
    dateDisplay: "Fall 2024",
    venue: "Last Leaves",
    issue: "9",
    page: 11,
    href: "https://www.lastleavesmag.com/_files/ugd/dccfc8_ccf9c63a610f4142a3426e58558fce3a.pdf",
    access: "pdf",
    actionLabel: "Open issue PDF",
  },
  {
    id: "take-a-shiny-penny",
    title: "Take a Shiny Penny",
    year: 2024,
    dateDisplay: "Winter 2024",
    venue: "Assignment Literary Magazine",
    issue: "Winter 2024: Erosion",
    page: 11,
    href: "https://cdnm.heyzine.com/files/uploaded/c3e930be0ce5111fe3f05397ffe28625dc3ad001-1.pdf",
    access: "pdf",
    actionLabel: "Open issue PDF",
  },
  {
    id: "cold-front",
    title: "Cold Front",
    year: 2024,
    dateDisplay: "December 2024",
    venue: "Men Matters Online Journal",
    issue: "9",
    href: "https://menmattersonlinejournal.com/issue-9-sean-whalen/",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "self-portrait-alternatively",
    title: "Self-portrait, Alternatively",
    year: 2024,
    dateDisplay: "December 2024",
    venue: "Men Matters Online Journal",
    issue: "9",
    href: "https://menmattersonlinejournal.com/issue-9-sean-whalen/",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "across-the-section",
    title: "Across the Section",
    year: 2023,
    dateDisplay: "March 2023",
    venue: "Founder's Favourites",
    issue: "22",
    page: 13,
    href: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9sMvoO0mbq8Wuk77X7IwWU0tLiPEyenWjuk_vCG2KRuW45xeZLnrG52peGvxBxCfe2tZw-ydUoCRT-haSGToqCA_-nkKGUUVwWusnkVH45BXOX5_BLiSCHrhwcHmms5OvjEletDuscPXp9Y85F_DID2rMBi0QqJZJnqEpcAZpopLQfNcUOU7wZrgo2A/s2000/FF22%20p12,13.jpg",
    access: "scan",
    actionLabel: "Open issue scan",
  },
  {
    id: "menards-january-aisle-9",
    title: "Menard’s, January, Aisle #9",
    year: 2023,
    dateDisplay: "March 2023",
    venue: "Founder's Favourites",
    issue: "22",
    page: 12,
    href: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9sMvoO0mbq8Wuk77X7IwWU0tLiPEyenWjuk_vCG2KRuW45xeZLnrG52peGvxBxCfe2tZw-ydUoCRT-haSGToqCA_-nkKGUUVwWusnkVH45BXOX5_BLiSCHrhwcHmms5OvjEletDuscPXp9Y85F_DID2rMBi0QqJZJnqEpcAZpopLQfNcUOU7wZrgo2A/s2000/FF22%20p12,13.jpg",
    access: "scan",
    actionLabel: "Open issue scan",
  },
  {
    id: "the-sunny-lee",
    title: "The Sunny Lee",
    year: 2023,
    dateDisplay: "2023",
    venue: "Halcyon Days",
    issue: "29",
    page: 9,
    href: "https://halcyondaysmagazine.blogspot.com/p/2023.html",
    access: "record",
    actionLabel: "View publication record",
  },
  {
    id: "the-unflowering-pear",
    title: "The Unflowering Pear",
    year: 2023,
    dateDisplay: "2023",
    venue: "Halcyon Days",
    issue: "29",
    page: 12,
    href: "https://halcyondaysmagazine.blogspot.com/p/2023.html",
    access: "record",
    actionLabel: "View publication record",
  },
  {
    id: "buffet",
    title: "Buffet",
    year: 2023,
    dateDisplay: "Spring 2023",
    venue: "Last Leaves",
    issue: "6: Hunger",
    page: 61,
    href: "https://www.lastleavesmag.com/_files/ugd/dccfc8_23bc200f74354aad96484419089a7b26.pdf",
    access: "pdf",
    actionLabel: "Open issue PDF",
  },
  {
    id: "crumbs",
    title: "Crumbs",
    year: 2023,
    dateDisplay: "Spring 2023",
    venue: "Last Leaves",
    issue: "6: Hunger",
    page: 66,
    href: "https://www.lastleavesmag.com/_files/ugd/dccfc8_23bc200f74354aad96484419089a7b26.pdf",
    access: "pdf",
    actionLabel: "Open issue PDF",
  },
  {
    id: "cathedral",
    title: "Cathedral",
    year: 2023,
    dateDisplay: "Spring 2023",
    venue: "Last Leaves",
    issue: "6: Hunger",
    page: 68,
    href: "https://www.lastleavesmag.com/_files/ugd/dccfc8_23bc200f74354aad96484419089a7b26.pdf",
    access: "pdf",
    actionLabel: "Open issue PDF",
  },
  {
    id: "the-run",
    title: "The Run",
    year: 2023,
    dateDisplay: "Fall/Winter 2023",
    venue: "After Happy Hour Review",
    issue: "21",
    page: 23,
    href: "https://afterhappyhourreview.com/Issue%2021.pdf",
    access: "pdf",
    actionLabel: "Open issue PDF",
  },
  {
    id: "drainage-ditch-number-one-hundred-seven",
    title: "Drainage Ditch Number One Hundred Seven",
    year: 2023,
    dateDisplay: "Fall/Winter 2023",
    venue: "Smoky Blue Literary and Arts Magazine",
    issue: "19",
    page: 118,
    href: "https://sblaam.com/wp-content/uploads/2023/08/SBLAAM19.pdf",
    access: "pdf",
    actionLabel: "Open issue PDF",
  },
  {
    id: "the-hen",
    title: "The Hen",
    year: 2023,
    dateDisplay: "Fall/Winter 2023",
    venue: "Smoky Blue Literary and Arts Magazine",
    issue: "19",
    page: 119,
    href: "https://sblaam.com/wp-content/uploads/2023/08/SBLAAM19.pdf",
    access: "pdf",
    actionLabel: "Open issue PDF",
  },
  {
    id: "departure-arrival",
    title: "Departure, Arrival",
    thesisOverlap: true,
    year: 2004,
    dateDisplay: "Spring 2004",
    venue: "Mid-American Review",
    issue: "XXIV.2",
    href: "https://casit.bgsu.edu/midamericanreview/volume-xxiv-no-2/",
    access: "record",
    actionLabel: "View publication record",
  },
  {
    id: "crow-at-dawn",
    title: "Crow at Dawn",
    thesisOverlap: true,
    year: 2002,
    dateDisplay: "Autumn 2002",
    venue: "The Midwest Quarterly",
    issue: "XLIV.1",
    href: "https://www.gyroscopereview.com/2026/04/poet-pick-sean-whalen/",
    access: "online",
    actionLabel: "Read online",
  },
  {
    id: "a-birth-in-autumn",
    title: "A Birth in Autumn",
    year: 2002,
    dateDisplay: "2002",
    venue: "Lyrical Iowa 2002",
    page: 12,
    href: "https://books.google.com/books?id=q1Mx-5pwjbgC&pg=PA12&vq=Sean+Whalen",
    access: "scan",
    actionLabel: "Open issue scan",
  },
  {
    id: "crow-in-love",
    title: "Crow in Love",
    thesisOverlap: true,
    year: 2001,
    dateDisplay: "Fall 2001",
    venue: "Flyway",
    issue: "6.2",
    href: "https://www.poetryexplorer.net/poem26.php?pid=12599254",
    access: "record",
    actionLabel: "View publication record",
  },
  {
    id: "failed",
    title: "Failed",
    thesisOverlap: true,
    year: 1999,
    dateDisplay: "Fall/Winter 1999–2000",
    venue: "Flyway",
    issue: "5.1–2",
    href: "https://www.poetryexplorer.net/poem26.php?pid=12599255",
    access: "record",
    actionLabel: "View publication record",
  },
  {
    id: "chicken-time",
    title: "Chicken Time",
    thesisOverlap: true,
    year: 1997,
    dateDisplay: "Winter 1997",
    venue: "Flyway",
    issue: "3.3",
    href: "https://www.poetryexplorer.net/poem26.php?pid=12599252",
    access: "record",
    actionLabel: "View publication record",
  },
] as const satisfies readonly BaseWork[]

export const workActionLabels = {
  online: "Read online",
  pdf: "Open issue PDF",
  scan: "Open issue scan",
  record: "View publication record",
  print: "Print record",
} as const satisfies Record<WorkAccess, WorkActionLabel>

const workStatuses = new Set<WorkStatus>([
  "published",
  "forthcoming",
  "accepted-unpublished",
])

const workFields = new Set([
  "id",
  "title",
  "year",
  "dateDisplay",
  "venue",
  "issue",
  "page",
  "href",
  "access",
  "actionLabel",
  "status",
  "thesisOverlap",
])
const workIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const titleCollator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
})

export function normalizeWorkTitle(title: string) {
  return title.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US")
}

export function validateWorkRecords(
  value: unknown,
  existingWorks: readonly Work[] = []
): readonly Work[] {
  if (!Array.isArray(value)) {
    throw new TypeError("Work records must be an array")
  }

  const knownIds = new Set(existingWorks.map((work) => work.id))
  const knownTitles = new Set(
    existingWorks.map((work) => normalizeWorkTitle(work.title))
  )
  const currentYear = new Date().getUTCFullYear()

  return value.map((candidate, index) => {
    const location = `Work record ${index + 1}`

    if (!isRecord(candidate)) {
      throw new TypeError(`${location} must be an object`)
    }

    const unexpectedFields = Object.keys(candidate).filter(
      (field) => !workFields.has(field)
    )

    if (unexpectedFields.length > 0) {
      throw new TypeError(
        `${location} has unexpected field${unexpectedFields.length === 1 ? "" : "s"}: ${unexpectedFields.join(", ")}`
      )
    }

    const id = readRequiredString(candidate.id, `${location} id`, 100)
    const title = readRequiredString(candidate.title, `${location} title`, 200)
    const dateDisplay = readRequiredString(
      candidate.dateDisplay,
      `${location} dateDisplay`,
      80
    )
    const venue = readRequiredString(candidate.venue, `${location} venue`, 160)
    const issue = readOptionalString(candidate.issue, `${location} issue`, 120)
    const href = readOptionalString(candidate.href, `${location} href`, 2048)

    if (!workIdPattern.test(id)) {
      throw new TypeError(`${location} id must be a lowercase kebab-case slug`)
    }

    if (
      typeof candidate.year !== "number" ||
      !Number.isInteger(candidate.year) ||
      candidate.year < 1900 ||
      candidate.year > currentYear
    ) {
      throw new TypeError(`${location} year must be between 1900 and ${currentYear}`)
    }

    if (!dateDisplay.includes(String(candidate.year))) {
      throw new TypeError(`${location} dateDisplay must contain its year`)
    }

    let page: number | undefined

    if (candidate.page !== undefined) {
      if (
        typeof candidate.page !== "number" ||
        !Number.isInteger(candidate.page) ||
        candidate.page < 1 ||
        candidate.page > 10_000
      ) {
        throw new TypeError(`${location} page must be a positive integer`)
      }

      page = candidate.page
    }

    if (
      typeof candidate.access !== "string" ||
      !(candidate.access in workActionLabels)
    ) {
      throw new TypeError(`${location} access is not supported`)
    }

    const access = candidate.access as WorkAccess
    const status = candidate.status === undefined ? "published" : candidate.status

    if (typeof status !== "string" || !workStatuses.has(status as WorkStatus)) {
      throw new TypeError(`${location} status is not supported`)
    }

    if (!href && access !== "print") {
      throw new TypeError(
        `${location} must provide an HTTPS source unless it is print-only`
      )
    }

    if (href) {
      let url: URL

      try {
        url = new URL(href)
      } catch {
        throw new TypeError(`${location} href must be a valid URL`)
      }

      if (url.protocol !== "https:" || url.username || url.password) {
        throw new TypeError(
          `${location} href must use HTTPS and must not contain credentials`
        )
      }
    }
    const actionLabel = readRequiredString(
      candidate.actionLabel,
      `${location} actionLabel`,
      80
    )

    if (actionLabel !== workActionLabels[access]) {
      throw new TypeError(`${location} actionLabel does not match its access type`)
    }

    if (typeof candidate.thesisOverlap !== "boolean") {
      throw new TypeError(`${location} thesisOverlap must be a boolean`)
    }

    if (knownIds.has(id)) {
      throw new TypeError(`Duplicate work id: ${id}`)
    }

    const normalizedTitle = normalizeWorkTitle(title)

    if (knownTitles.has(normalizedTitle)) {
      throw new TypeError(`Duplicate work title: ${title}`)
    }

    knownIds.add(id)
    knownTitles.add(normalizedTitle)

    return {
      id,
      title,
      year: candidate.year,
      dateDisplay,
      venue,
      ...(issue ? { issue } : {}),
      ...(page ? { page } : {}),
      ...(href ? { href } : {}),
      access,
      actionLabel,
      status: status as WorkStatus,
      thesisOverlap: candidate.thesisOverlap,
    }
  })
}

const validatedBaseWorks = validateWorkRecords(
  baseWorks.map((work) => ({
    ...work,
    status: "status" in work ? work.status : "published",
    thesisOverlap: "thesisOverlap" in work ? work.thesisOverlap : false,
  }))
)
const validatedAdditions = validateWorkRecords(workAdditionsJson, validatedBaseWorks)

export const works: readonly Work[] = [
  ...validatedBaseWorks,
  ...validatedAdditions,
].sort(compareWorks)

export const workStatistics = summarizeWorks(works, thesisArchiveSource.poemCount)
export const {
  bibliographyCount,
  unpublishedCount,
  forthcomingCount,
  publicationCount,
  publishedCount,
  thesisOverlapCount,
  thesisOnlyCount,
  uniqueWorkCount,
} = workStatistics
export const workYears: readonly number[] = [...new Set(works.map((work) => work.year))]

if (workYears.length === 0) {
  throw new Error("At least one work record is required")
}

export const publicationYears = {
  latest: workYears[0] as number,
  earliest: workYears[workYears.length - 1] as number,
} as const

export const worksByYear: readonly WorksYearGroup[] = workYears.map((year) => ({
  year,
  works: works.filter((work) => work.year === year),
}))

export const thesisArchive = {
  ...thesisArchiveSource,
  exactTitleAdditions: thesisOnlyCount,
  uniqueWorksOverall: uniqueWorkCount,
} as const satisfies ThesisArchive

export function summarizeWorks(
  records: readonly Pick<Work, "status" | "thesisOverlap">[],
  thesisPoemCount: number
): WorkStatistics {
  if (!Number.isInteger(thesisPoemCount) || thesisPoemCount < 0) {
    throw new TypeError("Thesis poem count must be a non-negative integer")
  }

  let publishedCount = 0
  let forthcomingCount = 0
  let unpublishedCount = 0
  let thesisOverlapCount = 0

  for (const record of records) {
    switch (record.status) {
      case "published":
        publishedCount += 1
        break
      case "forthcoming":
        forthcomingCount += 1
        break
      case "accepted-unpublished":
        unpublishedCount += 1
        break
      default:
        throw new TypeError(`Unknown work status: ${String(record.status)}`)
    }

    if (record.thesisOverlap) {
      thesisOverlapCount += 1
    }
  }

  if (thesisOverlapCount > thesisPoemCount) {
    throw new Error("Thesis overlap count exceeds the thesis poem count")
  }

  const bibliographyCount = records.length
  const publicationCount = publishedCount + forthcomingCount
  const thesisOnlyCount = thesisPoemCount - thesisOverlapCount
  const uniqueWorkCount = bibliographyCount + thesisOnlyCount

  return {
    bibliographyCount,
    publishedCount,
    forthcomingCount,
    unpublishedCount,
    publicationCount,
    thesisPoemCount,
    thesisOverlapCount,
    thesisOnlyCount,
    uniqueWorkCount,
  }
}

function compareWorks(left: Work, right: Work) {
  return (
    right.year - left.year ||
    titleCollator.compare(left.title, right.title) ||
    left.id.localeCompare(right.id)
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function readRequiredString(value: unknown, label: string, maximumLength: number) {
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

function readOptionalString(value: unknown, label: string, maximumLength: number) {
  return value === undefined
    ? undefined
    : readRequiredString(value, label, maximumLength)
}

export const selectedWorkIds = [
  "iowa-perspective",
  "at-the-press-conference-during-the-fire",
  "edward-pointing-north",
  "hubris-effigy-mounds-national-monument",
  "4-99",
  "crow-at-dawn",
] as const

export const selectedWorks: readonly Work[] = selectedWorkIds.map((id) => {
  const work = works.find((candidate) => candidate.id === id)

  if (!work) {
    throw new Error(`Unknown selected work: ${id}`)
  }

  return work
})

export const workPageContent = {
  railLabels: {
    overview: "OVERVIEW / 01",
    thesis: "THESIS / 02",
    index: "INDEX / 03",
  },
  title: "Work",
  summary: `${bibliographyCount} bibliography records · ${publishedCount} published · ${forthcomingCount} forthcoming · ${uniqueWorkCount} verified works overall`,
  description: `A documented index of ${formatCount(publicationCount, "published or forthcoming poem")}, ${formatCount(unpublishedCount, "accepted-but-unpublished record")}, and the ${thesisArchive.poemCount}-poem thesis Small ecologies, representing ${formatCount(uniqueWorkCount, "unique verified work")}.`,
  note: "Print-only records come from Sean's August 3, 2026 publication list. Forthcoming and unpublished entries are labeled rather than presented as released work.",
  updateNote: `Updated from Sean's publication list dated August 3, 2026. Links lead to poem, issue, or publisher records when a secure public source is available.`,
} as const

function formatCount(count: number, singular: string) {
  return `${count} ${singular}${count === 1 ? "" : "s"}`
}
