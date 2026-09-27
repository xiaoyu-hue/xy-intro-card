# Changelog

> This project follows [Semantic Versioning](https://semver.org/). Format per [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added

- README (bilingual): top badges, a "Try it online" entry, and a "🙏 Credits & Dependencies" section
- New `index.html`: GitHub Pages root entry page that redirects to the generator

### Changed

- Enabled GitHub Pages (source: `main` branch, root); live at <https://xiaoyu-hue.github.io/xy-intro-card/>

## [1.0.0] - 2026-09-27

### Added

- Personal intro-card generator: fill a form on the left, live phone preview on the right
- Two field modes: **Character Card** (name · age · zodiac · skills · signature) and **General Card** (name · title · bio · contact), switchable
- Four themes aligned with `xy-club`: Sunset Gold / Ocean Blue / Aurora Purple / Morning Mist
- Avatar upload with `<canvas>` compression (longest edge 512px, JPEG 0.85) — fixes large-image freeze
- One-click download of a standalone HTML card: zero deps, works offline
- Performance: frame-rate auto-degrade, background pause, respects `prefers-reduced-motion`, fewer glass layers on mobile
- Documentation system isomorphic to `xy-club`: `docs/` (ARCHITECTURE / PRD / FIELDS / DEPLOY / TESTING / DOC_SYNC / DECISION_REVIEW / ADR / AUTHOR) + root governance files (README / CHANGELOG / CONTRIBUTING / SECURITY / CODE_OF_CONDUCT / AGENTS / LICENSE), core docs bilingual

### Default demo case

- XY俱乐部 · 小鱼 (21, Cancer) as demo data; replaceable with any club / team
