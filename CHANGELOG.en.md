# Changelog

> This project follows [Semantic Versioning](https://semver.org/). Format per [Keep a Changelog](https://keepachangelog.com/).

## [2.1.0-Phase4] - 2026-09-29

### Added

- **Phase 4 – Neutral business theme family**
  - Extended `THEMES_CONFIG`: each theme now supports optional `mode` (`'dark'` / `'light'`) and `palette` fields
  - 4 new neutral business themes:
    - **米白·晨雾** (warm off-white + slate blue accent, general business use)
    - **浅灰·云影** (cool light grey + blue-grey accent, tech/consulting)
    - **燕麦·暖调** (cream + warm brown-grey, culture/dining)
    - **藏蓝·经典** (pure white + navy, finance/legal, most formal)
  - New functions `themeInfo(theme)` / `getThemeVarValues(theme)` / `getRootVarString(theme)` – all accept an optional theme parameter (no longer strictly tied to global `currentTheme`)
  - Extended card CSS with 30+ theme-overridable custom properties (background, text, glass, shadows, chips, pills, sign, footer, avatar, name gradient); defaults equal original dark values
  - Exported HTML `<meta theme-color>` now follows the active theme's background colour
  - Light themes use desaturated, low-alpha blobs (alpha 0.14 / 0.09 / 0.07) for a restrained look
  - Theme swatch UI groups: liquid glass (dark) / neutral business (light), with label dividers
  - `placeholder()` / `favicon()` now switch SVG background colour per theme
  - localStorage persistence supports new `mode` / `palette` fields with backward compatibility
  - Custom colour picker preserves current theme mode
  - API version bumped to `2.1.0-Phase4`
  - `buildDoc()` now reads `c.theme` before falling back to global `currentTheme`

- **Phase 4 – Industry presets (general card mode)**
  - 3 new preset buttons: 📖 读书会 / 🍽 本地餐企 / 🏢 小型企业
  - One-click fill of complete demo data (name, title, bio, contact, signature)
  - Presets and themes are independent – clicking a preset does not lock the theme
  - New `INDUSTRY_PRESETS` constant object and `applyIndustryPreset(key)` function
  - New test group 7 (7 cases) validating preset structure and exported content

### Tests

- All 31 existing tests still pass (regression protection)
- 20 new test cases added (51 total):
  - Test 4: dark theme regression + "no light vars injected" assertions
  - Test 4b: light business theme palette full injection verification
  - Test 4c: dark theme `meta theme-color` regression
  - Test 7: industry preset data structure + exported content validation

### Changed

- API version: `2.1.0-Phase3` → `2.1.0-Phase4`

---

## [Unreleased]

### Added

- README (bilingual): top badges, a "Try it online" entry, and a "🙏 Credits & Dependencies" section
- New `index.html`: GitHub Pages root entry page that redirects to the generator

### Changed

- Enabled GitHub Pages (source: `main` branch, root); live at <https://xiaoyu-hue.github.io/xy-intro-card/>

---

## [2.0.0-Phase3] - 2026-09-28

### Added

- **Phase 0 - Automated Test Gate**
  - New `tests/logic.test.js` (31 test cases)
  - New `scripts/build-check.sh` build check script
  - New `.github/workflows/ci.yml` CI configuration
  - New `Features` utility object (feature detection)

- **Phase 1 - Robustness & Inclusivity**
  - New localStorage persistence (prevents data loss on refresh)
  - New input validation feedback (real-time error prompts)
  - New `:focus-visible` visible focus indicator
  - New high contrast mode adaptation (`forced-colors`)
  - New ARIA attributes enhancement (`aria-pressed`, `aria-controls`, `aria-label`)
  - New file type validation (images only)

- **Phase 2 - Compatibility Fixes**
  - Enhanced `backdrop-filter` degradation strategy (disables particle system on old browsers)
  - New iOS < 15 special compatibility styles
  - New `IntersectionObserver` entrance animation (triggers when viewport visible)
  - New `requestIdleCallback` degradation (setTimeout fallback for old browsers)

- **Phase 3 - Responsive & Extensibility**
  - New foldable screen adaptation breakpoints (768-1100px portrait)
  - New ultra-wide screen adaptation (>1400px centered layout)
  - New container queries support (for iframe embedding scenarios)
  - Replaced fixed font sizes with `clamp()` fluid typography
  - Theme config externalized to `THEMES_CONFIG` JSON structure
  - New template registry `registerTemplate()` API
  - New global `window.XYIntroCard` API exposure

### Changed

- Documentation enhanced: updated `docs/TESTING.md`

---

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
