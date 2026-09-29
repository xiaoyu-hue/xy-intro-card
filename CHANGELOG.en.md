# Changelog

> This project follows [Semantic Versioning](https://semver.org/). Format per [Keep a Changelog](https://keepachangelog.com/).

## [3.0.2-Phase5] - 2026-09-29

### fix

- **Version comment correction**
  - Code comment L229 version `v3.0.1` → `v3.0.2`
  - API.md documentation version `v2.1.0-Phase4` → `v3.0.2`

- **Review reports cleanup**
  - Removed tracked review report files from git (ARCHITECTURE_REVIEW.md, CODE_REVIEW.md, COMPREHENSIVE_REVIEW.md, DECISION_REVIEW.md, FIX_SUMMARY.md)
  - Updated `.gitignore` to prevent future accidental commits

### refactor

- **Top-level variable standardization**
  - `var Features` → `const Features`
  - `var CARD_TEMPLATES` → `const CARD_TEMPLATES`
  - `var AppState` → `const AppState`
  - `var STORAGE_KEY` → `const STORAGE_KEY`
  - `var STORAGE_VERSION` → `const STORAGE_VERSION`
  - Reduced var usage from 49 to 45 occurrences

- **bindEvents() function splitting**
  - Split into 8 sub-functions: `bindModeEvents()`, `bindFormEvents()`, `bindCustomColorEvents()`, `bindIndustryPresetEvents()`, `bindAvatarEvents()`, `bindDownloadEvents()`, `bindFooterEvents()`, `bindResetEvents()`
  - Improved code readability and maintainability

### feat

- **Theme swatch keyboard navigation**
  - Added `tabindex="0"`, `role="button"`, `aria-label` attributes to all theme swatches
  - Support Enter/Space key to trigger theme switching
  - Screen readers can identify theme swatches as interactive buttons

- **Error message accessibility enhancement**
  - Added `aria-describedby` association for input error messages
  - Screen readers can automatically read error messages
  - New `errorId` unique identifier to avoid duplication

### chore

- **Added code style tool configurations**
  - Added `.eslintrc.json`: basic ESLint rules (no-unused-vars, semi, quotes, indent)
  - Added `.prettierrc`: unified code formatting (single quotes, 2-space indent, no trailing commas)

### docs

- **Documentation internationalization**
  - Added `docs/FIELDS.en.md`: field specification English translation

- **Documentation system improvement**
  - Updated `GLOBAL.md`: added document submission rules (prohibit pushing review reports)
  - Updated `.gitignore`: added review report ignore rules

### test

- Tests maintained at 102 cases, all passing ✅
- build-check.sh all passed ✅

### breaking

- None (fully backward compatible)

---

## [2.2.0] - 2026-09-29

### refactor

- **Architecture optimization - SECTION numbering unified**
  - Unified SECTION numbering to 1-11 sequential (original numbering had gaps: 1→1.5→2→3→4→5→6→6.5→6.6→7→8)
  - Improved code readability and maintainability

- **Introduced AppState state manager**
  - Merged scattered global variables (`currentMode`, `currentTheme`, `avatarData`, `updateTimer`, `preview`) into `AppState` object
  - Centralized state management for easier debugging and serialization
  - All references updated to `AppState.mode/theme/avatar/timer/preview`

- **localStorage version migration**
  - Added `STORAGE_VERSION = 'v1'` version constant
  - `saveState()` writes version number on save
  - `loadState()` detects version and handles legacy data downgrade
  - Legacy data without `mode`/`palette` fields auto-completed

- **Theme swatch matching optimization**
  - Assigned unique `key` to each theme (based on `THEMES_CONFIG` key)
  - `active` state judgment uses `key` comparison to avoid misjudgment when color values are same

### test

- Tests increased from 51 to 70 (all green)
- Added test 8: blob color verification (dark high saturation vs light low transparency)
- Added test 9: internal function export verification (`getThemeVarValues`, `THEMES_CONFIG`)
- Added test 10: localStorage version migration verification

### docs

- Added `docs/ARCHITECTURE_REVIEW.md` (architecture review report)
- Updated `docs/ARCHITECTURE.md` (added AppState explanation)
- Updated `docs/TESTING.md` (test count 51→70)
- Updated `docs/CODE_REVIEW.md` (reflect all fixes)

### breaking

- None (fully backward compatible)

---

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
