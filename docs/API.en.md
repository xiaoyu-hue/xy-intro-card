# API 参考文档（API Reference）

> This document describes the `window.XYIntroCard` global API for external scripts and plugins.

---

## 1. Global Object

```js
// Access in browser
window.XYIntroCard
```

All API methods are on the `window.XYIntroCard` object.

---

## 2. Core Methods

### `addTheme(name, config)`

Dynamically add a new theme to the generator.

**Parameters:**
- `name` (string): Unique theme identifier (e.g., `'my-theme'`)
- `config` (object): Theme configuration object

**config object structure:**
```js
{
  name: 'Theme Display Name',      // Optional, defaults to passed name
  a: '#ff9d5c',                    // Primary color (accent)
  b: '#ffd0a8',                    // Secondary color (optional, auto-derived)
  mode: 'dark' | 'light',          // Optional, default 'dark'
  palette: {                       // Required only for light mode
    bg: '#f7f4f0',
    text: '#1e2935',
    dim: 'rgba(30,41,53,0.55)',
    glass1: 'rgba(255,255,255,0.75)',
    glass2: 'rgba(255,255,255,0.50)',
    line: 'rgba(148,163,184,0.40)',
    shadow1: 'rgba(15,23,42,0.10)',
    shadow2: 'rgba(15,23,42,0.06)',
    highlight: 'rgba(255,255,255,0.85)',
    edge: 'rgba(148,163,184,0.38)',
    borderInset1: 'rgba(255,255,255,0.92)',
    borderInset2: 'rgba(255,255,255,0.45)',
    chipBg: 'rgba(255,255,255,0.65)',
    chipLine: 'rgba(148,163,184,0.45)',
    pillBg1: 'rgba(255,255,255,0.70)',
    pillBg2: 'rgba(255,255,255,0.45)',
    pillBorder: 'rgba(148,163,184,0.48)',
    pillInset: 'rgba(255,255,255,0.80)',
    signColor: '#334155',
    footColor: 'rgba(30,41,53,0.35)',
    selectionFg: '#1e2935',
    fallbackBg1: 'rgba(240,238,235,0.95)',
    fallbackBg2: 'rgba(225,222,216,0.97)',
    avatarRect: '#f7f4f0',
    avatarBorder: 'rgba(148,163,184,0.40)',
    avatarShadow: 'rgba(15,23,42,0.12)',
    avatarGradStop3: '#c4b5a0',
    nameGradientStart: '#1e2935',
    nameShineStop: 'rgba(255,255,255,0.85)'
  }
}
```

**Example: Add dark theme**
```js
window.XYIntroCard.addTheme('custom-dark', {
  name: 'Custom Dark',
  a: '#9d5cFF',
  b: '#d0a8FF'
});
```

**Example: Add light business theme**
```js
window.XYIntroCard.addTheme('custom-light', {
  name: 'Custom Light',
  a: '#5a6b7c',
  b: '#8a9dad',
  mode: 'light',
  palette: { /* ... full palette config ... */ }
});
```

**Backward compatible with old signature:**
```js
// Old style still works
window.XYIntroCard.addTheme('legacy', '#ff9d5c', '#ffd0a8');
```

---

### `registerTemplate(name, config)`

Register custom card template (extension point, not yet implemented).

**Parameters:**
- `name` (string): Template name
- `config` (object): Template configuration

---

### `getCurrentTheme()`

Get the currently active theme object.

**Returns:**
```js
{
  a: '#ff9d5c',
  b: '#ffd0a8',
  mode: 'dark',
  palette: null
}
```

---

## 3. Properties

### `version`

Current tool version number.

```js
console.log(window.XYIntroCard.version); // "2.1.0-Phase4"
```

---

### `FEATURES`

Browser feature detection results object.

```js
{
  backdropFilter: true,          // Supports backdrop-filter
  containerQueries: false,       // Supports container queries
  intersectionObserver: true,    // Supports IntersectionObserver
  requestIdleCallback: true,     // Supports requestIdleCallback
  prefersReducedMotion: false,   // User prefers reduced motion
  highContrast: false,           // High contrast mode
  forcedColors: false            // Forced colors mode
}
```

---

### `onCardExport`

Export callback array. Inject custom logic before export.

```js
window.XYIntroCard.onCardExport.push(function(html) {
  console.log('About to export card, HTML length:', html.length);
  return html; // Can modify returned HTML
});
```

---

## 4. Internal Functions (For Testing)

The following functions are exposed in test environments but not recommended for direct production use:

| Function | Description |
|----------|-------------|
| `buildDoc(cfg, opts)` | Generate complete HTML card |
| `readCfg()` | Read current config from DOM |
| `esc(str)` | HTML escape |
| `themeInfo(theme)` | Calculate theme colors and blob colors |
| `getThemeVarValues(theme)` | Get theme CSS variable mapping |
| `INDUSTRY_PRESETS` | Industry preset data constant |

---

## 5. Usage Example

```html
<script src="个人介绍卡生成器.html"></script>
<script>
  // Add custom theme
  window.XYIntroCard.addTheme('my-brand', {
    name: 'My Brand',
    a: '#1a1a2e',
    b: '#16213e',
    mode: 'dark'
  });

  // Listen to export event
  window.XYIntroCard.onCardExport.push(function(html) {
    analytics.track('card_exported', { theme: currentTheme });
    return html;
  });

  // Get current theme
  var theme = window.XYIntroCard.getCurrentTheme();
  console.log('Current theme:', theme.name);
</script>
```

---

*Document version: v2.1.0-Phase4*
