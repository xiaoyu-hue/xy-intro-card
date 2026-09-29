# Field Specification (FIELDS)

> Read before modifying data structure or export template. The two modes' fields are decoupled; export picks a template by `mode`.

## Mode 1: Character Card (`mode: "oc"`)

Suitable for club members / companions / role-play character introductions.

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | Yes | Club / team name (e.g. "XY Club") |
| `script` | string | No | English subtitle (e.g. `where everyday life meets poetry`) |
| `name` | string | Yes | Name / nickname |
| `age` | string | No | Age |
| `zodiac` | string | No | Zodiac sign (with symbol, e.g. `Cancer`) |
| `skills` | string[] | No | Skill tags, multiple allowed |
| `signCn` | string | No | Chinese signature / motto |
| `signEn` | string | No | English signature |

## Mode 2: General Card (`mode: "general"`)

Suitable for general personal introductions / business cards.

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | Yes | Name |
| `script` | string | No | Title / role (e.g. "Freelance Photographer") |
| `bio` | string | No | One-sentence bio |
| `contact` | string[] | No | Contact info / tags, multiple allowed (e.g. "WeChat: xxx", "Email: a@b.com") |
| `signCn` | string | No | Chinese signature |
| `signEn` | string | No | English signature |

## Common Rules

- All strings are escaped via `esc()` before entering the DOM in `buildDoc`, preventing XSS.
- Empty fields are automatically hidden on the card, leaving no blank placeholders.
- Avatar: `avatarData` (compressed base64) is optional; when missing, an SVG placeholder with the first character of `title`/`name` is generated. The placeholder SVG background color switches with the theme (dark: `rgb(11,10,18)` / light business theme: `palette.avatarRect`).
- Theme color is independent of fields, controlled by the `currentTheme` object, and not part of the content data.

## Theme Configuration (Theme)

Theme object structure (since Phase 4):

```js
{
  a: '#ff9d5c',            // Primary color (accent)
  b: '#ffd0a8',            // Secondary color (highlight, derived from lighten(a))
  mode: 'dark',            // 'dark' | 'light', controls blob opacity and text direction
  palette: {               // Only used for light mode; not passed for dark themes
    bg: '#f7f4f0',         // Page background color (--bg-solid)
    text: '#1e2935',       // Body text color
    dim: 'rgba(30,41,53,0.55)', // Secondary text color
    glass1: 'rgba(255,255,255,0.75)',  // Glass layer 1 (high opacity)
    glass2: 'rgba(255,255,255,0.50)',  // Glass layer 2
    line: 'rgba(148,163,184,0.40)',    // Divider color
    shadow1: 'rgba(15,23,42,0.10)',    // Card outer shadow 1
    shadow2: 'rgba(15,23,42,0.06)',    // Card outer shadow 2
    highlight: 'rgba(255,255,255,0.85)', // Card highlight
    edge: 'rgba(148,163,184,0.38)',     // Card bottom edge line
    // ... see THEMES_CONFIG for any light theme's palette field
  }
}
```

The existing 8 preset themes are stored in `THEMES_CONFIG`. Users can also dynamically append via `window.XYIntroCard.addTheme(name, a, b)` (new themes default to `mode: 'dark'`; manually add `mode` and `palette` to enable light mode).

## Industry Presets (Industry Presets)

Industry presets only apply to the "General Card" mode (`mode: "general"`). Clicking a button calls `applyIndustryPreset(key)` to fill the form fields with preset copy, then triggers `scheduleUpdate()` to refresh the preview.

- Presets and themes are **independent**: clicking a preset does not change the theme, and switching themes does not clear filled fields.
- Preset data is stored in the `INDUSTRY_PRESETS` constant object with structure `{ [key]: { label, fields: { fullName, titleRole, bio, contact, signCn, signEn } } }`.
- Extensible: add new keys to `INDUSTRY_PRESETS` with corresponding UI buttons without modifying core logic.

## Data Mapping with xy-club

xy-club content is driven by JSON (`services` / `settings`, etc.), while this project's content is form-driven; the two can align **field semantics** (e.g. club name ↔ `title`, skills ↔ `services` entries), facilitating consistent maintenance between the site and member cards.
