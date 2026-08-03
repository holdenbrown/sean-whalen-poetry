# Website brief

## Purpose

- Organization or product: The official portfolio and publication index for Iowa poet
  Sean Whalen.
- Primary website goal: Introduce Sean's work and voice, then help readers reach poems
  at their original publication venues.
- Primary audience: Poetry readers, journal editors, publishers, event programmers, and
  people interested in contemporary writing rooted in place.
- Top action visitors should take: Read a selected published poem at its original venue.
- Evidence required to trust the writer: A conservative, source-linked bibliography;
  verified publication credits; and a concise biography based on repeated first-party or
  identity-secure sources.

## Information architecture

- Required routes: A statically exported editorial homepage, a complete `/work` index,
  and a concise `/about` page. A custom not-found page remains available.
- Header navigation: Home, Work, About.
- Footer navigation: Home, Work, About.
- Primary conversion path: Homepage hero -> selected work or Work index -> original
  journal or issue.
- Required legal or policy pages: None for this no-tracking, no-form portfolio. Poem text
  and third-party photographs stay off-site until rights and permissions are documented.

## Content

- Approved implementation headline and supporting copy: "Sean Whalen" and "Poems
  attentive to land, labor, memory, and the precise strangeness of rural life." The copy
  is an editorial synthesis for this build and requires Sean's factual approval before
  public launch.
- Source of facts and claims: `docs/research/sean-whalen/profile.md`,
  `docs/research/sean-whalen/works.json`, and their linked publication sources, last
  checked 2026-08-03.
- Contact and location details: Publicly state only that Sean lives near Pilot Mound in
  rural Boone County, Iowa. Do not publish a residential address, personal phone number,
  or unverified contact channel.
- Testimonials or proof with permission: No testimonials. Publication venues and linked
  work records provide the proof.
- Content owner and update process: Sean owns and approves public-facing biography and
  work selections. An authorized repository collaborator can add a verified publication
  through the guided GitHub Actions workflow; validation, grouping, counts, and the Pages
  rebuild are automated. New records must still pass the identity and rights rules in the
  research packet.

## Visual direction

- Brand attributes: Observant, restrained, humane, wry, place-conscious, exact, and
  quietly uncanny.
- Approved colors and typography: Paper cream, crow black, oxidized field green, river
  blue-gray, and a restrained signal orange; an expressive literary serif for display
  paired with a sturdy humanist sans for navigation and metadata.
- Reference links or approved concept: A project-local Image Gen concept produced from
  this brief before implementation; no external site's identity or layout is in scope.
- Image/illustration direction: Documentary, rights-cleared photography plus original
  non-photographic contour and survey motifs—prairie horizon, drainage paths, weather,
  and field notation. Do not use synthetic or unverified photoreal imagery. The homepage
  uses a public-domain 2017 USDA aerial photograph of northeast Iowa by Preston Keres.
  The commissioning user supplied Sean's watermarked portrait for the About page;
  preserve the watermark, credit Stacy McDonald / The Photician visibly, and record the
  source. Keep all text and navigation code-native.
- Motion direction: Subtle line-drawing, editorial reveals, and horizontal drift that
  suggest weather or a map being unfolded; always respect reduced-motion preferences.
- Explicit visual exclusions: Quills, typewriters, parchment cosplay, rustic barnwood,
  generic book stacks, crow silhouettes as a logo, fake handwritten poem text, bento
  grids, decorative badges, neon gradients, and unlicensed portraits.

## Functional requirements

- Forms and their real submission destination: No forms.
- Search, filtering, or interactive tools: No application state is required. Publication
  links disclose new-tab behavior in accessible text.
- CMS or content source: Typed local content in `src/content`, with new publication records
  accepted through a validated GitHub-native workflow. No runtime CMS or second hosting
  platform is required.
- Analytics and consent requirements: No analytics or cookies in this scope.
- External services: Outbound links to original journals and issue PDFs only.

## Quality requirements

- Supported browsers/devices: Current and previous major releases of Chromium, Safari,
  and Firefox; layouts from 320px mobile through large desktop.
- Accessibility target: WCAG 2.2 AA intent, with semantic landmarks, one meaningful h1,
  visible focus, keyboard navigation, 44px touch targets, reduced motion, and no serious
  or critical automated axe findings.
- Performance budget: Static Server Component page, no avoidable client JavaScript, no
  unoptimized third-party media, and a target LCP under 2.5 seconds on a typical mobile
  connection.
- SEO/local search requirements: Accurate title and description, canonical URL from the
  deployment environment, author/website structured data, sitemap, robots, manifest,
  and social image synchronized with the visual tokens.
- Privacy/security requirements: No tracking, no form collection, no personal address or
  phone number, and `noopener noreferrer` on new-tab external links.

## Deployment

- Production origin: `https://holdenbrown.github.io/sean-whalen-poetry`, supplied through
  `NEXT_PUBLIC_SITE_URL`; localhost remains the safe development fallback.
- Hosting platform: GitHub Pages through the repository's GitHub Actions workflow. Vercel
  and Sites are explicitly out of scope.
- Root path or repository subpath: Deployment-aware through the starter's base-path
  utilities.
- Preview and approval flow: Local browser review at desktop and mobile sizes, complete
  `pnpm verify`, then Sean reviews biography, work selection, outbound links, and visual
  identity before launch.
- Launch owner: To be assigned by Sean or the commissioning site owner.
