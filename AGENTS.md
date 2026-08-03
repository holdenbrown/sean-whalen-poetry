<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version can contain APIs and conventions newer than model training data. Read the
relevant guide in node_modules/next/dist/docs before changing Next.js behavior, and
heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Working agreement

This repository is a reusable website starter. Preserve its separation between site
identity, page content, UI primitives, route composition, and deployment logic.

## Start here

1. Read docs/website-brief.md and fill its decisions before substantial design work.
2. Read docs/development-strategy.md for the phased AI workflow and source-of-truth map.
3. Use pnpm. Do not create a second lockfile.
4. Run pnpm check before and during meaningful changes; run pnpm verify before handoff.

## Architecture rules

- Keep identity, navigation, canonical URL, and shared labels in src/config/site.ts.
- Keep page-specific copy in src/content. Do not scatter repeated content through JSX.
- Keep brand-defining colors, typography, macro spacing, radii, shadows, and motion in
  src/app/globals.css. Components use semantic tokens plus the standard utility scale;
  repeated custom values must become named tokens.
- Literal colors are permitted only at static metadata/image boundaries listed by the
  token checker; keep those outputs synchronized with the semantic token pairs.
- Use the documented spacing and type scales. Avoid arbitrary Tailwind values unless a
  design reference requires one and the reason is documented.
- Prefer existing shadcn components. Before adding one, use the shadcn CLI to inspect its
  current documentation and add it as source code through the CLI.
- Server Components are the default. Add use client only at the smallest interactive
  boundary.
- The app is statically exported. Do not add cookies, request-bound headers, middleware,
  Server Actions, ISR, or runtime-only route behavior without intentionally changing the
  hosting architecture.
- Use next/image with real dimensions, responsive sizes, meaningful alt text, and LCP
  priority where appropriate. Static export requires the configured image strategy.
- Use Next metadata conventions for every public route. Canonicals, sitemap entries, and
  navigation routes must agree.
- Internal Next Link destinations are written without a deployment prefix. Use
  withBasePath only for public-file URLs or non-Next consumers such as the manifest.

## Accessibility and interaction

- Preserve semantic landmarks, one meaningful h1 per page, visible focus, keyboard
  operation, reduced-motion behavior, and minimum 44px primary touch targets.
- Do not report form success until a backend has accepted the submission.
- External links that open a new tab must use noopener and noreferrer and disclose the
  behavior in accessible text when it is not obvious.
- Prefer native HTML behavior before adding client state.

## Change discipline

- Never edit generated .next or out files.
- Keep briefs, research, and internal process documentation out of public routes unless
  the approved website scope explicitly includes them.
- Do not copy content, assets, claims, visual identity, generated output, or licensed
  template code from a reference website unless the user explicitly places it in scope.
- Update docs/development-strategy.md when the shared delivery workflow changes.
- Update documentation and tests whenever tokens, content schemas, shared configuration,
  routes, or deployment behavior change.

## Definition of done

- pnpm format:check, pnpm lint, pnpm typecheck, pnpm check:tokens, and pnpm test pass.
- The production static export builds and pnpm check:built passes.
- Playwright passes at desktop and mobile sizes with no serious or critical axe findings.
- No broken internal link, placeholder claim, stale canonical, deployment-specific path,
  missing focus state, or unreviewed generated asset remains.
