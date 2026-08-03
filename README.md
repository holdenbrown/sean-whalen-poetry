# Sean Whalen

The source for Sean Whalen's official poetry portfolio and verified publication index.
The site is a statically exported Next.js application built for GitHub Pages.

Live phone-review site: https://sean-whalen-poetry.nukebom27.chatgpt.site

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

Until a GitHub repository is connected, the live review build is published through Sites
at the URL above. Vercel is not used.

For a custom domain, set the repository variable `SITE_URL` to the canonical origin and
set `BASE_PATH` to `/` when the site is hosted at the origin root.

## Content and rights

Public copy is maintained in `src/content`; shared identity and navigation live in
`src/config/site.ts`. Research notes remain in `docs/research` and are not exposed as
site routes. Publication links point to their original venues; poem text is not copied
into this repository. See `THIRD_PARTY_NOTICES.md` for third-party attribution.
