# Publication updates

Sean can add a verified publication without editing code. The repository's trusted
`Add publication` workflow validates one record, updates the static content source,
commits it to `main`, and starts the existing GitHub Pages deployment.

## One-time repository setup

- Give Sean **Write** access to the repository.
- Ensure the `github-actions[bot]` push used by this workflow is compatible with the
  protection rules for `main`.

Keep the repository's default `GITHUB_TOKEN` permission read-only. The workflow itself
requests only `contents: write` and `actions: write`; it does not use a personal access
token or repository secret.

## Add a publication

1. Open the repository's **Actions** tab.
2. Choose **Add publication**.
3. Choose **Run workflow**, keep the branch set to `main`, and complete the fields.
4. Check the verification statement and choose **Run workflow**.

Use the poem's exact published title and punctuation. For the source link, prefer a
direct poem page, then a direct issue PDF, then a scan, and finally a trusted publication
record. Do not paste poem text, contact details, or publisher-owned images into the form.

Set **This poem also appears in the 2004 thesis Small ecologies** only when the new
publication is another appearance or revision of a work in the thesis. This keeps the
site's unique-work total from counting the same underlying work twice.

## What happens automatically

The update script:

- rejects missing, padded, overlong, or malformed fields;
- requires an HTTPS source without embedded credentials;
- generates a stable lowercase ID and the correct source-link label;
- rejects duplicate IDs and normalized duplicate titles while allowing shared URLs;
- writes additions in newest-year, title-alphabetical order;
- runs the repository's complete verification before committing;
- commits only `src/content/works.additions.json`; and
- explicitly starts the Pages workflow after pushing `main`.

The new record appears automatically in the full `/work` index after the Pages workflow
succeeds. Homepage selections remain curated and do not change automatically.

## Validate without publishing

Set **Validate only; do not commit or deploy** to `true`. The workflow exercises the
same input and duplicate checks, but it does not write the additions file, install the
site, commit, push, or deploy.

For a local dry run, provide the documented `PUBLICATION_*` environment variables and
run:

```powershell
node scripts/add-publication.mjs --dry-run
```

The command prints the normalized candidate so it can be reviewed. It never changes the
JSON additions file in dry-run mode.

## Corrections and reprints

A title already present in the index is rejected intentionally. Do not add a second row
for a reprint. Update the existing record and its research evidence through a reviewed
content change instead. If `main` changes while a publication workflow is verifying, the
workflow stops without pushing; rerun it against the current `main` branch.
