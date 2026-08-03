# Sean Whalen

The source for Sean Whalen's official poetry portfolio and verified publication index.
The site is a statically exported Next.js application built for GitHub Pages.

Live site: https://holdenbrown.github.io/sean-whalen-poetry/

## Local development

Requirements: Node.js 24.x LTS and pnpm 11.x.

```powershell
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Quality gates

| Command            | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| `pnpm check`       | Format, lint, type, token, and unit checks     |
| `pnpm test:e2e`    | Desktop/mobile browser and accessibility tests |
| `pnpm build`       | Generate the static site in `out`              |
| `pnpm check:built` | Verify exported links, metadata, and routes    |
| `pnpm verify`      | Run the complete local handoff gate            |

## Publishing

Pushes to `main` run `.github/workflows/pages.yml`. The workflow derives the GitHub Pages
repository subpath, builds the static export, runs every quality gate, and deploys the
verified artifact. GitHub Pages must use **GitHub Actions** as its source.

For a custom domain, set the repository variable `SITE_URL` to the canonical origin and
set `BASE_PATH` to `/` when the site is hosted at the origin root.

## Adding a publication

An authorized collaborator can run **Add publication** from the repository's Actions
tab. The guided form validates the source, updates the structured publication data, runs
the quality gates, commits the record, and starts a fresh GitHub Pages deployment. See
[`docs/publication-updates.md`](docs/publication-updates.md) for the exact workflow and
recovery steps.

## Content and rights

Public copy is maintained in `src/content`; shared identity and navigation live in
`src/config/site.ts`. Research notes remain in `docs/research` and are not exposed as
site routes. Publication links point to their original venues; poem text is not copied
into this repository. See `THIRD_PARTY_NOTICES.md` for third-party attribution.

Account-level discoverability steps are tracked in
[`docs/discoverability-checklist.md`](docs/discoverability-checklist.md).
