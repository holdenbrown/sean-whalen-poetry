# Exporting the blank starter

The workspace keeps a protected, local snapshot of the neutral starter at
`exports/website-starter-blank`. That snapshot is the stable source for new websites;
the active workspace can later contain project-specific content without changing it.

## Create a new website

Run this from the workspace root, using a destination outside this workspace:

```powershell
pnpm blank:copy "C:\path\to\my-new-site"
```

The command refuses to copy into an existing folder and never includes Git history,
dependencies, generated builds, local environment files, test artifacts, export files,
or project-specific research.

Then initialize the new site:

```powershell
Set-Location "C:\path\to\my-new-site"
pnpm install
pnpm verify
```

## Portable ZIP

The ready-to-move archive is `exports/website-starter-blank.zip`. Recreate that ZIP from
the protected snapshot at any time with:

```powershell
pnpm blank:archive
```

This does not read from the active website source, so later site customization cannot
leak into the archive.

## Snapshot protection

`pnpm blank:init` creates the snapshot only when it does not already exist. It refuses to
overwrite the saved copy. To revise the underlying starter system, make and verify those
changes deliberately, preserve the old ZIP as a versioned backup, and initialize a new
snapshot in a clean workspace.
