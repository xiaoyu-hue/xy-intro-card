# Contributing

Issues and PRs are welcome. Please read the [Code of Conduct](CODE_OF_CONDUCT.md) first.

## Getting started

1. Fork and branch: `git checkout -b feature/xxx`
2. Run verification after changes (see [`docs/TESTING.md`](docs/TESTING.md))
3. Use Conventional Commits (`feat:` / `fix:` / `docs:` / `chore:`)
4. Open a PR explaining the motivation

## Two red lines

1. **Keep zero-dependency, zero-build**: no React / Vue / bundlers / runtime deps.
2. **Keep zero data collection**: never send user content outward; all data stays local.

## Doc sync

Any change must sync [`README.md`](README.md) / [`docs/FIELDS.md`](docs/FIELDS.md) / [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) / [`CHANGELOG.md`](CHANGELOG.md) — rules in [`docs/DOC_SYNC.md`](docs/DOC_SYNC.md).

## Decision review

Before release or irreversible ops (public repo, file deletion, code overwrite), pass [`docs/DECISION_REVIEW.md`](docs/DECISION_REVIEW.md).

## Code style

- Keep single-file structure: inline `<style>` and `<script>` in HTML.
- All user input must be escaped via `esc()` before entering the DOM.
- Prefer new optional features that don't break old exported cards.
