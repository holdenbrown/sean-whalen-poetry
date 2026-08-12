# Agent handoff

Updated: 2026-08-12

## Current authority and state

- Read `AGENTS.md`, `STATUS.md`, `docs/website-brief.md`,
  `docs/development-strategy.md`, and `docs/quality-checklist.md` before changing
  the implementation.
- Verified base: `main` at
  `108c8e0a00ff0a766cfe6b3cf7c318850b262e90`.
- Active release candidate: `codex/release-verification`.
- GitHub Pages production origin:
  `https://holdenbrown.github.io/sean-whalen-poetry/`.
- The site is an existing static Next.js portfolio. Resume it; do not recreate it
  or combine it with another project.

## Completed technical work

- Removed the one trailing blank line in `STATUS.md` that caused GitHub Actions
  run `31274837272` to fail at Prettier on the current `main` commit.
- Passed the full root-path `pnpm verify` boundary.
- Passed the exact GitHub Pages subpath build and built-output checks.
- Verified the live public routes remain online on the prior successful deploy.
- Reconciled source and built public media with the provenance record.
- Added vector and generated-metadata asset provenance to
  `THIRD_PARTY_NOTICES.md`.
- Recorded the exact release evidence in
  `docs/release-verification-2026-08-12.md`.

## Do not infer approval

Technical verification does not resolve these gates:

- final biography facts and copy;
- sufficiency of the portrait-rights representation and absent license document;
- final publication selection and external links;
- public launch ownership and authorization.

Do not merge to `main` or otherwise publish until those decisions are explicit.
The Pages workflow deploys on a `main` push.

## Next bounded action

Obtain the four approvals above. Then review the candidate, merge it to `main`,
observe the GitHub Pages workflow, and run the bounded live-origin acceptance pass
described in the release-verification record.
