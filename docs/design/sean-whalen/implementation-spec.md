# Sean Whalen implementation specification

Status: accepted implementation reference for this build, 2026-08-02.

## Concept references

- `hero-desktop.png`: shared header, desktop hero, hero media, selected-work preview.
- `selected-publications.png`: selected-work row anatomy and section rhythm.
- `home-about-closing.png`: homepage About band, archive CTA, and footer.
- `work-index-desktop.png`: complete-work index page and grouped row anatomy.
- `about-desktop.png`: About page composition and editorial-description band.
- `home-mobile.png`: mobile header, hero, actions, media crop, and stacked rows.

The central production artwork is `public/images/field-drainage.png`. It is an original,
non-documentary field-and-water abstraction and must not be described as Sean's home or a
specific location.

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
- Read the work
- Poems attentive to land, labor, memory, and the precise strangeness of rural life.
- Read selected work
- About Sean
- Poet · Rural Boone County, Iowa
- LINE / 01

No eyebrow, badge, proof chip, statistic, extra subtitle, or new claim may be added.

## Surface inventory

### Home hero

- Large two-line name, supporting line, two actions, factual location line.
- Desktop media occupies the right half and blends into the cream content edge with a
  cream edge fade only; there is no tint or overlay over the image.
- Mobile stacks copy, actions, factual line, and a wide uncropped media frame.
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

- Shared site header with desktop navigation/action and native mobile `details` menu.
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
