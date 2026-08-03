# AI website development strategy

This repository is a neutral system for building new websites. It defines how an AI agent
and a human reviewer move from an idea to a verified deployment without inheriting the
content or visual identity of any previous site.

## Source-of-truth map

- docs/website-brief.md records purpose, audience, scope, facts, constraints, and approval.
- src/config/site.ts owns shared identity, navigation, canonical origin, and global labels.
- src/content owns page-specific copy and structured content.
- src/app/globals.css owns semantic design tokens and the global style contract.
- src/components/ui owns source-controlled UI primitives.
- src/components/layout owns shared page composition.
- src/app owns routes and route metadata.
- tests and scripts own objective acceptance checks.

When a shared fact or rule changes, update its owner first and let consumers read from it.
Do not patch the same value in multiple rendered components.

## Delivery phases

### 1. Discover

- Identify the audience, required routes, primary action, content owners, integrations,
  hosting target, and nonfunctional requirements.
- Inspect supplied references through their authoritative source.
- Record unknowns and assumptions. Never invent business facts, testimonials, metrics,
  credentials, prices, dates, or contact information.

Gate: the website brief contains enough approved information to design the complete scope.

### 2. Design

- Establish one coherent visual direction for the complete surface, including downstream
  sections and important responsive states.
- Obtain human approval before treating a concept as the implementation specification.
- Extract semantic color pairs, typography, spacing, radii, shadows, containers, media
  treatment, component families, and motion into the design system.
- Use named project tokens for brand-defining and repeated values. The framework's
  standard utility scale may handle local component spacing; arbitrary repeated values
  may not.

Gate: the concept and token/component inventory are reviewable and approved.

### 3. Model content

- Put shared identity and navigation in site configuration.
- Put page copy and repeated collections in typed content modules or validated external
  schemas.
- Attach a source and owner to claims that can become stale.
- Define loading, empty, error, and success states before implementing data-backed UI.

Gate: components can render from structured inputs without embedding business facts.

### 4. Implement

- Build Server Components by default and add the smallest possible client boundaries.
- Compose routes from reusable layout and UI primitives.
- Keep colors and visual decisions semantic; do not introduce one-off values in JSX.
- Keep the static hosting contract unless the approved requirements need server runtime
  behavior.

Gate: source checks and unit tests pass, and all required routes build.

### 5. Verify

- Compare the rendered result with the approved design at desktop and mobile sizes.
- Exercise the primary journey and all meaningful interactive states.
- Audit keyboard behavior, focus, reduced motion, accessibility, copy, images, links,
  metadata, structured data, and the generated static export.
- Fix visible or functional drift before handoff; do not defer known repairable issues.

Gate: pnpm verify passes and human review finds no unexplained deviation.

### 6. Deploy and maintain

- Deploy the exact reviewed source state through CI.
- Keep canonicals and path prefixes environment-aware.
- Update documentation and tests with token, content-schema, route, or deployment changes.
- Use small pull requests with explicit outcome, evidence, and accessibility impact.

Gate: production is healthy, canonical URLs are correct, and ownership is documented.

## Agent operating rules

- Lead with evidence and record assumptions when requirements are incomplete.
- Parallelize independent research and verification, but give each file one editor.
- Prefer repository instructions and current official documentation over remembered APIs.
- Never edit generated output or vendor code.
- Keep changes narrow, reversible, and attributable.
- Treat design approval, factual approval, and deployment approval as separate decisions.
- A passing build is not visual, accessibility, or interaction approval.
