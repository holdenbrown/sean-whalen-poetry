# Sean Whalen implementation specification

Status: accepted implementation reference for this build, refined from user review on
2026-08-03.

The 2026-08-03 review intentionally supersedes three details in the original screenshots:
the duplicate header CTA is removed, the archive headline uses an evergreen “present”
range, and the mobile hero places its landscape between the introduction and actions.

## Concept references

- `hero-desktop.png`: shared header, desktop hero, hero media, selected-work preview.
- `selected-publications.png`: selected-work row anatomy and section rhythm.
- `home-about-closing.png`: homepage About band, archive CTA, and footer.
- `work-index-desktop.png`: complete-work index page and grouped row anatomy.
- `about-desktop.png`: About page composition and editorial-description band.
- `home-mobile.png`: mobile header, hero, actions, media crop, and stacked rows.

The central production image comes from
`docs/research/sean-whalen/northeast-iowa-aerial-original.jpg`. It is a real USDA aerial
photograph of northeast Iowa made by Preston Keres from 10,000 feet on May 6, 2017. The
source record identifies the camera, exposure, capture time, and directly photographed
scene, and marks the federal-government work as public domain. The public hero serves
non-generative, resized WebP derivatives at 1,920 and 960 pixels wide, with JPEG
fallbacks and a 10-pixel inline blur placeholder. The image may be described as northeast
Iowa, but must not be described as Sean's home or a specific location connected to him.

- Source: `https://commons.wikimedia.org/wiki/File:20170506-OC-PJK-0169_(34455904506).jpg`
- Credit: USDA photo by Preston Keres
- Rights: public domain
- Archived-original SHA-256: `C2269283868A9DB7EBA793E73E1D6E86971D43CCF719CE68BE9250FC9BF6B6E4`

The unverified synthetic-looking field abstraction shown in the original concept
screenshots was removed from production on 2026-08-03. The verified photograph above is
an intentional asset-only deviation; layout, edge fade, crop behavior, palette,
typography, and copy remain governed by the accepted concepts.

## Color and typography lock

- Background: paper cream `#f2efe5`, not white.
- Foreground: crow black `#151815`.
- Primary/prairie: `#435748`.
- River slate: `#4f6970`.
- Signal/clay: `#a33c2a`, used sparingly for section marks and arrows.
- Rules: ink at low opacity; no gray card surfaces.
- Display/content serif: Newsreader-like variable serif.
- UI/body sans: Geist.
- Metadata: Geist Mono.
- Geometry: square or barely softened; no card shadows; hairline rules and open bands.

## Allowed above-the-fold copy

- Sean Whalen
- Home
- Work
- About
- Poems attentive to land, labor, memory, and the precise strangeness of rural life.
- Read selected work
- About Sean
- Poet · Rural Boone County, Iowa
- INTRO / 01
- USDA photo by Preston Keres

No eyebrow, badge, proof chip, statistic, extra subtitle, or new claim may be added.

## Rail notation system

- Every field-rail mark uses the literal format `SECTION / NN`.
- Numbering restarts at `01` on each route and increments without gaps from top to bottom.
- Labels describe the section they sit beside; atmospheric codenames are not used.
- Home: `INTRO / 01`, `WORK / 02`, `ABOUT / 03`, `INDEX / 04`.
- Work: `OVERVIEW / 01`, `THESIS / 02`, `INDEX / 03`.
- About: `BIO / 01`, `POETICS / 02`, `WORK / 03`.
- On narrow screens, the section term and ordinal occupy two deliberate lines inside the
  3.5rem rail; the browser must not wrap the notation into arbitrary fragments.
- The rail is decorative and `aria-hidden`; semantic headings continue to define the page.

## Surface inventory

### Home hero

- Large two-line name, supporting line, two actions, factual location line.
- Desktop media occupies the right half and blends into the cream content edge with a
  cream edge fade only; there is no tint or overlay over the image.
- The aerial photograph uses a 122% crop biased toward its upper-left terracing so the
  image reads as a composed landscape rather than a survey plate. Apply the desktop fade
  to the fixed media frame—not the scaled image—so the cream-to-photograph transition
  remains broad and visible at every crop.
- Mobile stacks the name and introduction, a wide intrinsic-ratio media frame, then the
  actions and factual line. The artwork is part of the hero composition rather than a
  separate block after the actions.
- Motion: the meridian draws in and content reveals gently; reduced motion disables both.

### Selected publications

- Open ruled rows, not cards.
- Desktop: title / venue metadata / action columns. Mobile: title then metadata, with the
  arrow aligned to the right.
- A single fine arrow is the only repeated icon.

### About and archive CTA

- Open asymmetric biography, factual rail, low-contrast contour-line texture.
- Archive CTA is a dark crow or prairie band with large serif heading and one action.
- Footer returns to cream and uses a ruled three-part composition.

### Work

- Intro followed by works grouped by year, newest first.
- Large serif year rail; open title rows; venue metadata; access-aware action label.
- Mobile moves each year above its rows and stacks metadata under the title.

### About page

- Large h1 and opening statement, biography copy, factual rail.
- “On the page” appears in a prairie band and is clearly editorial description, not a
  quotation attributed to Sean.
- Biography approval remains a private prelaunch gate in `docs/website-brief.md`; internal
  approval notes do not appear on the public route.

## Component and icon inventory

- Shared site header with concise Home, Work, and About navigation plus a native mobile
  `details` menu. The hero owns the reading action.
- Shared site footer.
- `FieldRail`: meridian, tick, and neutral section label.
- `ArrowLink`: text plus a thin right-arrow SVG/Lucide arrow matching the concept.
- `PublicationRow`: selected and compact work-index variants.
- `FactRow`: monospaced term/value rail.
- `ContourLines`: decorative CSS/SVG background with `aria-hidden`.
- Icons: menu (two/three fine lines) and right arrow only. Both use a consistent thin
  outline weight and inherit current color.

## Content and rights lock

- Titles, venues, dates, issues, and access labels come from the verified research packet.
- Do not display poem text, excerpts, portrait photography, private location details,
  invented contact information, or unresolved publication claims.
- New-tab external links use `noopener noreferrer` and screen-reader disclosure.

## Responsive and container rules

- Wide container: approximately 90rem with a persistent 5.5rem desktop field rail.
- Reading width: approximately 46rem.
- At small sizes, the rail becomes a narrow 3.5rem gutter; content never scrolls
  horizontally.
- Primary touch targets are at least 44px.
- Section padding follows the named macro spacing tokens in `globals.css`.
