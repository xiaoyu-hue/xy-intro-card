# Architecture

> Describes the internal structure, render/export mechanics, theme-color computation and performance strategy of `个人介绍卡生成器.html`. Read before changing structure or export logic.

## 1. Single-file structure

The whole generator is **one HTML file** with inline sections:

```
<!DOCTYPE html>
<html>
  <head>
    <style> /* UI styles + CARD_CSS (exported card styles, stored in JS constant) */ </style>
  </head>
  <body>
    <!-- Left form + right preview iframe + top mode/theme switch -->
    <script> /* config read, theme compute, live preview, buildDoc export */ </script>
  </body>
</html>
```

- **No build, no deps**: no npm, no bundler, no external assets.
- **Self-contained**: fonts use system fallbacks (Mac/iOS cursive → Windows script); icons are inline SVG; avatar optional as inline base64.

## 2. Code Sections

| Section | Responsibility | Key Functions/Variables |
|---|---|---|
| SECTION 1 | Utility functions | `esc()`, `splitCsv()`, `hexToRgb()`, `lighten()`, `getHue()` |
| SECTION 1.5 | Feature detection | `Features` object |
| SECTION 2 | Constants config | `ZODIAC`, `THEMES_CONFIG`, `THEMES`, `registerTemplate()` |
| SECTION 3 | State management | `currentMode`, `currentTheme`, `avatarData` |
| SECTION 4 | Config read | `readCfg()` |
| SECTION 5 | Render logic | `themeInfo()`, `buildCardInner()`, `buildDoc()` |
| SECTION 6 | Preview update | `loadPreview()`, `updatePreview()`, `scheduleUpdate()`, `setMode()` |
| SECTION 6.5 | Local persistence | `saveState()`, `loadState()` |
| SECTION 6.6 | Input validation | `addInputFeedback()` |
| SECTION 7 | Interaction binding | `setup()` |
| SECTION 8 | Global API | `window.XYIntroCard` |

## 3. Render mechanism (live preview)

- Each form input binds an `input` event → calls `render()`.
- `render()` reads fields → builds config `cfg` → `buildCardInner(cfg)` → writes the card HTML fragment into the right-side `<iframe>` `srcdoc`.
- The preview iframe inlines `CARD_CSS` + a lightweight entrance-animation script, so preview matches the exported card.

## 4. Theme-color computation (themeInfo)

- Driven by `currentTheme = { a, b }` (primary + light).
- `themeInfo()` derives: `--amber` / `--amber-2` injected into the card; blob colors from `getHue(a)` + `lighten()` / `hslToRgb()`; text light/dark chosen by primary luminance for contrast.
- Four presets (Sunset Gold / Ocean Blue / Aurora Purple / Morning Mist) share names and colors with `xy-club` for visual consistency across the two projects.

## 5. Export logic (buildDoc)

`buildDoc(cfg, { animate })` produces a **standalone runnable HTML card**:

1. Take `CARD_CSS` (card style constant);
2. Inject theme vars and blob colors;
3. Pick field template by `cfg.mode` (`oc` / `general`);
4. `esc()` all user input to prevent XSS;
5. Avatar: compressed base64 if uploaded, else an SVG placeholder of "theme color + first char";
6. Concatenate `<!DOCTYPE html>` + `<style>` + card DOM + inline animation script (script's `</script>` written as `<\/script>` to avoid early close).

The exported card **does not depend on the generator file** and opens standalone in any browser.

## 6. Avatar compression

`handleAvatar(file)`: `FileReader` → draw to `<canvas>` scaled to longest edge **512px**, export **JPEG quality 0.85**. A 2400×2400 original (2–5MB) shrinks to ~**10KB**. Fixes the earlier "whole-image base64 froze the preview" bug.

## 7. Performance strategy

- **Frame-rate adaptive**: `requestAnimationFrame` monitors FPS; below threshold auto switches to `.lite` degrade.
- **Background pause**: pauses animation on `visibilitychange` hidden.
- **Respects OS preference**: `prefers-reduced-motion` disables entrance / breathing animations.
- **Mobile trim**: glass layers drop from 5 to 1 on phones.
- **Controlled entrance order**: `--i` index controls element entrance order; new content just adds an index without disturbing rhythm.
- **IntersectionObserver**: card triggers entrance animation only when entering viewport, avoiding premature animation start.
- **requestIdleCallback degradation**: particle system initialization deferred to browser idle time for smoother experience on low-end devices.

## 8. Compatibility strategy

- **Feature Detection**: `Features` object unifies API support detection.
- **backdrop-filter degradation**: `@supports not (backdrop-filter)` block uses solid background + opacity boost; old browsers won't crash.
- **iOS < 15 special handling**: Uses `-webkit-backdrop-filter` prefix for compatibility.
- **Container queries**: `@container`配合 iframe 内嵌场景，卡片尺寸自适应父容器.
- **High contrast mode**: `@media (forced-colors: active)` disables decorative animations, uses system colors.

## 9. Accessibility strategy

- **Keyboard navigation**: `:focus-visible` visible focus indicator, all interactive elements accessible via Tab key.
- **ARIA attributes**: Mode switch buttons use `aria-pressed` / `aria-controls`, preview iframe uses `title` and `aria-label`.
- **Screen reader**: Decorative elements use `aria-hidden="true"`, semantic tags used correctly.
- **High contrast adaptation**: Forced color mode disables gradients and animations, uses system colors.

## 10. Local persistence

- **Auto-save**: After `scheduleUpdate()`, calls `saveState()`, form state written to localStorage.
- **Auto-restore**: In `setup()`, calls `loadState()`, resumes last edit after page refresh.
- **Safety limits**: Avatar dataURL not saved (too large), avoids quota exceeded errors.

## 11. Extensibility design

- **Template registry**: `CARD_TEMPLATES` object + `registerTemplate()` function, future dynamic registration of new card styles.
- **Theme config externalized**: `THEMES_CONFIG` JSON structure, future CDN loading capability.
- **Global API**: `window.XYIntroCard` exposes plugin hooks for external extensions.

## 12. Testing system

See [`docs/TESTING.md`](TESTING.md).

| Layer | Method | Dependency | Description |
|---|---|---|---|
| Logic validation | Node extracts `<script>` + DOM stubs, runs `buildDoc` | Node 18+ | Validates exported HTML structure / fields / theme injection / XSS protection |
| Build check | `scripts/build-check.sh` | grep, wc | Validates file integrity, HTML structure, CSP security policy |
| CI gate | `.github/workflows/ci.yml` | GitHub Actions | Automatically runs above two layers on every push/PR |

## 13. Relationship with xy-club

| Dim | xy-club (site template) | this project (card toolkit) |
|---|---|---|
| Form | Node service + data-driven site + admin | pure front-end single file |
| Output | Club website | Member personal intro card |
| Visual | Liquid glass | Liquid glass (same origin) |
| Theme | 4 sets (aurora/ocean/mist/sunset) | 4 sets, same name & color |
| Reuse | edit JSON content | edit form & export |
