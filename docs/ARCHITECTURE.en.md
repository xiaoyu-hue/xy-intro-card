# Architecture

> Describes the internal structure, render/export mechanics, theme-color computation and performance strategy of `个人介绍卡生成器.html`. Read before changing structure or export logic.

## 1. Single-file structure

The whole generator is **one HTML file** with three inline sections: `<style>` (UI + `CARD_CSS` constant), the form + preview iframe markup, and `<script>` (config read, theme compute, live preview, `buildDoc` export).

- **No build, no deps**: no npm, no bundler, no external assets.
- **Self-contained**: fonts use system fallbacks; icons are inline SVG; avatar optional as inline base64.

## 2. Render mechanism (live preview)

- Each form input binds an `input` event → calls `render()`.
- `render()` reads fields → builds config `cfg` → `buildCardInner(cfg)` → writes the card HTML fragment into the right-side `<iframe>` `srcdoc`.
- The preview iframe inlines `CARD_CSS` + a lightweight entrance-animation script, so preview matches the exported card.

## 3. Theme-color computation (themeInfo)

- Driven by `currentTheme = { a, b }` (primary + light).
- `themeInfo()` derives: `--amber` / `--amber-2` injected into the card; blob colors from `getHue(a)` + `lighten()` / `hslToRgb()`; text light/dark chosen by primary luminance for contrast.
- Four presets (Sunset Gold / Ocean Blue / Aurora Purple / Morning Mist) share names and colors with `xy-club` for visual consistency across the two projects.

## 4. Export logic (buildDoc)

`buildDoc(cfg, { animate })` produces a **standalone runnable HTML card**:

1. Take `CARD_CSS` (card style constant);
2. Inject theme vars and blob colors;
3. Pick field template by `cfg.mode` (`oc` / `general`);
4. `esc()` all user input to prevent XSS;
5. Avatar: compressed base64 if uploaded, else an SVG placeholder of "theme color + first char";
6. Concatenate `<!DOCTYPE html>` + `<style>` + card DOM + inline animation script (script's `</script>` written as `<\/script>` to avoid early close).

The exported card **does not depend on the generator file** and opens standalone in any browser.

## 5. Avatar compression

`handleAvatar(file)`: `FileReader` → draw to `<canvas>` scaled to longest edge **512px**, export **JPEG quality 0.85**. A 2400×2400 original (2–5MB) shrinks to ~**10KB**. Fixes the earlier "whole-image base64 froze the preview" bug.

## 6. Performance strategy

- **Frame-rate adaptive**: `requestAnimationFrame` monitors FPS; below threshold auto switches to `.lite` degrade.
- **Background pause**: pauses animation on `visibilitychange` hidden.
- **Respects OS preference**: `prefers-reduced-motion` disables entrance / breathing animations.
- **Mobile trim**: glass layers drop from 5 to 1 on phones.
- **Controlled entrance order**: `--i` index controls element entrance order; new content just adds an index without disturbing rhythm.

## 7. Relationship with xy-club

| Dim | xy-club (site template) | this project (card toolkit) |
|---|---|---|
| Form | Node service + data-driven site + admin | pure front-end single file |
| Output | whole club site | member intro card |
| Visual | liquid glass | liquid glass (same origin) |
| Theme | 4 sets (aurora/ocean/mist/sunset) | 4 sets, same name & color |
| Reuse | edit JSON content | edit form & export |
