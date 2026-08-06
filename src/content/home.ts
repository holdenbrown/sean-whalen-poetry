import { heroArtwork } from "@/content/media"
import { publicationYears, uniqueWorkCount } from "@/content/works"

export const homeContent = {
  hero: {
    railLabel: "INTRO / 01",
    title: "Sean Whalen",
    description:
      "Poems attentive to land, labor, memory, and the precise strangeness of rural life.",
    primaryAction: {
      label: "Read selected work",
      href: "/#selected-publications",
    },
    secondaryAction: {
      label: "About Sean",
      href: "/about",
    },
    identity: "Poet · Rural Boone County, Iowa",
    artwork: heroArtwork,
  },
  socialSummary:
    "Poems attentive to land, labor, memory, and the precise strangeness of rural life.",
  selectedPublications: {
    railLabel: "WORK / 02",
    title: "Selected publications",
    description:
      "A small selection of Sean’s work, linked to the journals and issues where it appeared.",
    previewWorkIds: [
      "iowa-perspective",
      "solstice",
      "transcontinental",
      "crow-at-dawn",
    ],
    workIds: [
      "iowa-perspective",
      "at-the-press-conference-during-the-fire",
      "edward-pointing-north",
      "hubris-effigy-mounds-national-monument",
      "4-99",
      "crow-at-dawn",
    ],
    action: {
      label: `View all ${uniqueWorkCount} verified works`,
      href: "/work",
    },
  },
  about: {
    railLabel: "ABOUT / 03",
    title: "About Sean",
    paragraphs: [
      "Sean Whalen lives near Pilot Mound in rural Boone County, Iowa. He holds an M.A. in Creative Writing from Iowa State University.",
      "A retired health-and-safety professional and volunteer fire chief, he returned to writing after retirement following a nineteen-year hiatus.",
    ],
    facts: [
      {
        term: "PLACE",
        detail: "Rural Boone County, Iowa",
      },
      {
        term: "EDUCATION",
        detail: "M.A., Creative Writing · Iowa State University",
      },
      {
        term: "WORK",
        detail: "Retired health-and-safety professional",
      },
      {
        term: "COMMUNITY",
        detail: "Volunteer fire chief",
      },
    ],
    action: {
      label: "More about Sean",
      href: "/about",
    },
  },
  archive: {
    railLabel: "INDEX / 04",
    title: `Work, ${publicationYears.earliest}–present`,
    description: `Explore ${uniqueWorkCount} documented works across journal publications, print records, forthcoming work, and the 2004 thesis Small ecologies.`,
    action: {
      label: "Explore the full index",
      href: "/work",
    },
  },
} as const
