# Sean Whalen Poetry status

Updated: 2026-08-12

## Current state

- Repository: `projects/sean-whalen-poetry`
- Repository class: implementation project (static Next.js portfolio)
- Verified base branch: `main`
- Verified base commit: `108c8e0a00ff0a766cfe6b3cf7c318850b262e90`
- Release-candidate branch: `codex/release-verification`
- Remote: `https://github.com/holdenbrown/sean-whalen-poetry.git`
- Owner-confirmed genuinely new project: no
- Existing workspace continuation: current repository state
- Production intent: GitHub Pages
- Primary production origin: `https://holdenbrown.github.io/sean-whalen-poetry/`
- Local workflow: `pnpm` with Node 24.x LTS / pnpm 11.x

## Release posture

- The implementation is a technically verified release candidate, not an
  owner-approved final release.
- The public GitHub Pages deployment is online. On August 12, 2026, `/`, `/work`,
  `/about`, and `/robots.txt` each returned HTTP 200 with HSTS enabled.
- The latest `main` Pages workflow for base commit
  `108c8e0a00ff0a766cfe6b3cf7c318850b262e90` failed only because Prettier found a
  trailing blank line in this status file. The release-candidate branch removes
  that defect.
- The public site remains the prior successful deployment. This branch has not
  been merged to `main` or deployed; a `main` push would trigger GitHub Pages.

## What is already implemented

- Source-of-truth docs are in place, including `docs/website-brief.md`,
  `docs/development-strategy.md`, `docs/quality-checklist.md`, and research/design
  support docs under `docs/research` and `docs/design`.
- Static-export deployment contract is wired through
  `.github/workflows/pages.yml` with local checks (`pnpm check`, `pnpm test:e2e`,
  `pnpm build`, `pnpm check:built`) and an owner-triggered Pages deploy.
- Publication update flow exists through GitHub Actions (`docs/publication-updates.md`)
  and structured publication records under `src/content`.
- Complete local verification passes: formatting, lint, TypeScript, design-token
  policy, 18 unit tests, 25 desktop/mobile browser tests with one intentional
  desktop skip for the mobile-only navigation case, axe accessibility checks,
  production builds, root export checks, and GitHub Pages subpath export checks.
- Source and built public-media inventories were checked against the recorded
  provenance and SHA-256 values. No unrecorded public image was found.
- Detailed evidence is recorded in `docs/release-verification-2026-08-12.md`.

## Open items / current blockers

- Sean's final biography facts and copy require owner/client approval.
- The commissioning user's representation that the portrait is licensed is
  recorded, but the underlying license document is not in the repository and has
  not been independently verified.
- Final publication selection and external linking require owner/client approval.
- Public launch ownership and authorization remain pending. Technical verification
  is not a substitute for those decisions.

## Next external outcome

- Obtain final biography, portrait-rights, publication-linking, and launch approval.
- Review the release-candidate diff and verification record.
- Only after those approvals, merge the release candidate to `main`, observe the
  GitHub Pages workflow, and repeat the bounded live-origin acceptance check.
