# Release verification — August 12, 2026

## Decision

The implementation is a technically verified release candidate. No merge to
`main` or production deployment was performed because factual, portrait-rights,
publication-linking, and launch approvals remain human decisions.

## Git and deployment evidence

- Verified base: `main` at
  `108c8e0a00ff0a766cfe6b3cf7c318850b262e90`.
- Candidate branch: `codex/release-verification`.
- Production origin: `https://holdenbrown.github.io/sean-whalen-poetry/`.
- On August 12, 2026, the live `/`, `/work`, `/about`, and `/robots.txt` routes
  each returned HTTP 200. The HTML responses included
  `Strict-Transport-Security: max-age=31556952`.
- GitHub Actions run `31274837272` failed during source checks because Prettier
  found one trailing blank line in `STATUS.md`. No build, browser, application,
  or deployment failure preceded it. This candidate removes that formatting
  defect.
- The public origin remains the prior successful GitHub Pages deployment until an
  approved candidate is merged to `main`.

## Root-path verification

The complete repository gate passed with:

```powershell
pnpm verify
```

The gate covered:

- Prettier formatting, ESLint, TypeScript, and the design-token policy;
- 2 unit-test files and 18 passing unit tests;
- a production static export;
- 26 Playwright cases across Desktop Chrome and Pixel 7 projects: 25 passed and
  one intentional desktop skip for the mobile-only navigation case;
- keyboard-visible mobile navigation and the primary selected-work interaction;
- zero serious or critical axe findings on `/`, `/work`, and `/about`;
- metadata, headings, publication counts, internal links, exported assets, hero
  WebP usage, biography content, and footer behavior.

## GitHub Pages subpath verification

The production-origin subpath export passed with:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/sean-whalen-poetry'
$env:NEXT_PUBLIC_SITE_URL='https://holdenbrown.github.io/sean-whalen-poetry'
pnpm build
$env:REQUIRE_PRODUCTION_URL='true'
pnpm check:built
```

The build exported all 10 routes and passed link, asset, SEO, and heading checks
under `/sean-whalen-poetry`.

## Media boundary

The source and built public-media inventories were compared with
`docs/research/sean-whalen/media.json` and `THIRD_PARTY_NOTICES.md`.

- All five public photographic derivatives matched their recorded SHA-256 values
  and have `aiGenerated: false` in the media record.
- The aerial image is recorded as a USDA public-domain photograph.
- The portrait retains its watermark and visible credit. Its use still depends on
  the commissioning user's rights representation because the underlying license
  document is absent.
- The application icon, contour SVG component, Lucide icons, and generated Open
  Graph asset are now recorded with source, license where applicable, routes or
  occurrences, and hashes in `THIRD_PARTY_NOTICES.md`.
- The built public-media inventory contained no unrecorded image.

## Remaining release gates

Before merging to `main`:

1. Approve Sean's final biography facts and copy.
2. Confirm the portrait-rights basis is sufficient, preferably by retaining the
   underlying license document outside the public repository.
3. Approve the final publication selection and external links.
4. Authorize public launch and identify the person responsible for observing the
   Pages deployment.

After approval, merge the candidate to `main`, observe the entire GitHub Pages
workflow, and repeat the bounded live-origin route, interaction, accessibility,
console, network, and media checks.
