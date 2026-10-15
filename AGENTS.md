<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version can contain APIs and conventions newer than model training data. Read the
relevant guide in node_modules/next/dist/docs before changing Next.js behavior, and
heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Sean Whalen portfolio agent router

This is Sean Whalen's existing poetry portfolio and publication index. Resume its
accepted implementation; starter ancestry is not permission to start a new site.
Preserve the separation between identity, content, UI primitives, routes, and deployment.

## Cold start and ownership

Before writing, run `git status --short --branch`, `git log --oneline -5`,
`git remote get-url origin`, and `git worktree list`. Read [STATUS.md](STATUS.md) and
the [active handoff](docs/agent-handoff.md), then the authorities relevant to the task.
Verify the branch, upstream, and working tree directly; a dated status record is evidence,
not current Git truth. Search existing workspaces and decisions before creating work.

One agent owns each writable path. Record the writer, exact allowed files, and other
ongoing work in the task handoff before editing. Other agents are report-only for those
paths. Preserve unrelated tracked changes, untracked files, ignored artifacts, and
generated output. Never inspect another agent's reserved candidate or cohort paths.
If ownership overlaps, continue independent work and resolve the overlap before writing.

A scoped request authorizes ordinary reversible work within that scope. Reuse permission
already given in the conversation; do not repeatedly ask for it. Obtain owner authorization
before adding dependencies, installing skills, changing architecture, or replacing the
accepted visual direction. Written ownership rules are coordination, not an OS sandbox;
describe only the isolation and permissions actually enforced by the runtime.

## Sources of truth

- Facts, audience, scope, and approvals: [website brief](docs/website-brief.md),
  [research guide](docs/research/sean-whalen/README.md), and its source records.
- Visual decisions: [accepted implementation specification](docs/design/sean-whalen/implementation-spec.md).
  Its recorded review changes supersede the corresponding original concept details.
  `src/app/globals.css` implements the semantic tokens; screenshots remain references.
- Shared identity and navigation: `src/config/site.ts`. Public copy and publication data:
  `src/content`. Reconcile factual conflicts with the source records before editing copy.
- Delivery procedures: [development strategy](docs/development-strategy.md),
  [quality checklist](docs/quality-checklist.md), and the relevant code/tests.
  Generic new-site phases do not reset this existing project's accepted decisions.
- Publication maintenance: [publication updates](docs/publication-updates.md).
  Running its write-enabled workflow is a separate publication action.

Skills are procedures, not product or design authority. Use compatible installed tools
only when they help the task. Check paths, dependencies, and side effects before following
a skill command. Evaluate recommendations against the brief, accepted design, content,
accessibility, and rendered result; passing a tool check does not establish design fit.
Do not invent a new master file or import a skill suite merely to satisfy another
project's workflow. Record substantive accepted changes and their user decision source.

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
- Prefer existing shadcn components. For an authorized addition, inspect current
  documentation and use the existing CLI; do not silently install or update dependencies.
- Server Components are the default. Add use client only at the smallest interactive
  boundary.
- The app is statically exported. Do not add cookies, request-bound headers, middleware,
  Server Actions, ISR, or runtime-only route behavior without an owner-authorized change
  to the hosting architecture.
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
- Ship only owner-approved, rights-cleared media with accurate source records in
  `docs/research/sean-whalen/media.json`. Concept imagery is not cleared production media;
  do not ship synthetic or unverified imagery from the original design screenshots.
- Update the owned delivery documentation when its workflow changes. If a related file
  is reserved or already being edited, record the required reconciliation in the handoff.
- Update documentation and tests whenever tokens, content schemas, shared configuration,
  routes, or deployment behavior change.

## Verification and review delivery

Use the Node version in `.node-version` and pnpm version in `package.json`; preserve the
lockfile. If that runtime is unavailable, report the limitation instead of claiming an
equivalent run. Do not install or change runtime policy as an incidental repair.

Choose verification by the highest affected boundary:

- Documentation-only maintenance: review the complete diff, local links, commands,
  consistency, formatting, and instruction size. Runtime-independent checks suffice when
  no executable behavior changed. This is the scoped exception to the full site handoff
  gate in the older delivery/checklist documents.
- Source, configuration, or dependency changes: run `pnpm check`, a production build,
  and `pnpm check:built`, plus affected behavioral tests. Do not add tests that only
  mirror prose or implementation details.
- Rendered changes: also run `pnpm test:e2e` and inspect desktop and about 390px layouts,
  primary journeys, keyboard/focus, reduced motion, console/network, links, actual media,
  and overflow. Preserve no serious or critical axe findings. `pnpm verify` is the full
  existing site gate; verify the affected root/subpath behavior for deployment changes.

Review and commit only the intended files. Use a review branch and a small pull request
as recorded in the development strategy; never stage another task's files, force-push,
rewrite history, or reconcile divergent branches automatically. Push and create a draft
PR when delivery is authorized. Report the commit, checks run, skipped checks with reasons,
and remaining risks; update the owned handoff at meaningful decisions and handoff.

Design, factual/rights, and deployment approvals are separate. A Markdown checklist,
passing CI, or draft PR does not grant production permission or prove access control.
`.github/workflows/pages.yml` deploys pushes to `main`; do not merge, push directly to
`main`, dispatch publishing workflows, or change provider settings without explicit
authorization for that action. Before a production action, verify the real approval and
environment protections rather than assuming they exist.
