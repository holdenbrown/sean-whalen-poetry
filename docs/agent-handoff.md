# Sean Whalen agent handoff

This repository continues an existing portfolio. Read [AGENTS.md](../AGENTS.md) and
[STATUS.md](../STATUS.md), then inspect the current Git state before writing. This file
preserves decisions and ownership context; it does not replace current repository evidence.

## Accepted project context

- Product: Sean Whalen's poetry portfolio and verified publication index, with Home,
  Work, and About routes. See the [website brief](website-brief.md).
- Design: the [implementation specification](design/sean-whalen/implementation-spec.md)
  is the accepted reference, including the changes recorded from the 2026-08-03 review.
  Preserve its relationship to screenshots and `src/app/globals.css`; a new skill does
  not supersede those decisions.
- Facts and media: continue the [research packet](research/sean-whalen/README.md),
  source ledger, and `research/sean-whalen/media.json`. Recheck a claim when the task or
  new evidence warrants it; do not restart completed research just to refresh a handoff.
- Architecture: statically exported Next.js, typed local content, GitHub Pages. Follow
  the [development strategy](development-strategy.md) and existing deployment utilities.
- Git delivery: review branch and pull request. The [Pages workflow](../.github/workflows/pages.yml)
  deploys `main` pushes; this handoff does not authorize merge or production deployment.

## AI workflow maintenance decision — 2026-10-15

The authorized task is to harden agent operating guidance while preserving the existing
product and ongoing work. The setup writer owns only `AGENTS.md` and this new handoff in
the isolated review worktree. This assignment applies to this change set; future tasks
must establish their own current writer and path ownership before editing.

- Reviewed base: `108c8e0` on `origin/main`; the local main branch matched that remote
  commit after fetch. Obtain the current commit and upstream from Git on continuation.
- Review branch: `codex/ai-workflow-hardening`. Delivery is a draft pull request;
  merging and publishing are outside this task.
- The primary checkout contained 21 modified tracked files and three untracked tests.
  Its status, development strategy, brief, quality checklist, publication workflow/data,
  token/link checkers, UI, and tests were outside this writer's scope and were preserved.
  An isolated worktree does not claim OS-enforced isolation from that checkout.
- Keep the accepted design authoritative. Judge tools by compatibility and whether their
  output fits the brief and rendered site; do not retrofit a new generated design master.
- No skills, dependencies, runtime pins, application source, or deployment settings are
  changed by this setup task. The guidance separates documentary approval from actual
  runtime permissions and protected deployment controls.
- Documentation-only verification is appropriate for this change set. The router now
  states that exception explicitly; application changes still require the existing site
  checks and rendered changes require browser verification.

## Continuation limits

- `STATUS.md` is dated 2026-08-07 and names an older commit and legacy workspace label.
  Its writer must reconcile that metadata with current Git and owner evidence. Do not
  overwrite unrelated in-progress status changes to make this handoff look current.
- The development strategy still introduces the project as a neutral new-site system.
  For this existing portfolio, the router and accepted implementation reference govern
  continuation. Reconcile that wording and the checklist's unconditional full-site
  handoff wording through their file owner when those edits are in scope.
- Launch signoff and factual/rights approval records require verification before any
  publishing task. Existing site URLs or historical deployments are not new approval.
- `.node-version` records Node 24.18.0 and `package.json` records pnpm 11.9.0. The inspected
  local shell had different versions, and the pinned Node version was unavailable.
  Use runtime-independent checks for this docs-only task; resolve the runtime before
  claiming pinned application verification. Do not change pins to match a machine.

## Verification for this change set

- Both Markdown files pass the existing Prettier formatting check. That formatting-only
  command used the available Node 24.19.0, not the pinned application runtime.
- Runtime-independent checks validate all 15 local Markdown links, referenced package
  commands, preservation of the framework-owned Next.js instruction block, instruction
  byte size, and absence of machine-specific paths or credential patterns.
- `git diff --check` passes. The intentional diff contains only the two owned documents.
- Application, build, and browser tests were not run: this change alters documentation
  only, and no pinned-runtime application verification is claimed.

## Next handoff

Record the objective, exact owned paths, current branch/commit/upstream, intentional
changes, decision sources, checks and their results, and review reference. Distinguish
unresolved facts, rights, design questions, and deployment authorization. Report checks
that were not run and why; never convert a pending approval into an assumed acceptance.
