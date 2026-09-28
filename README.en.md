<div align="center">

<img src="https://img.shields.io/badge/license-MIT-yellow?style=for-the-badge" alt="license">
<img src="https://img.shields.io/badge/frontend-zero--framework-4FC08D?style=for-the-badge" alt="frontend">
<img src="https://img.shields.io/badge/runtime%20deps-zero-6B728C?style=for-the-badge" alt="deps">
<img src="https://img.shields.io/badge/single--file-works%20offline-2EA44F?style=for-the-badge" alt="offline">
<img src="https://img.shields.io/github/v/release/xiaoyu-hue/xy-intro-card?style=for-the-badge" alt="release">

**English · [中文](./README.md)**

# 🪪 XY Personal Intro Card Toolkit

> A **reusable personal-intro card generator**: usable by any club / team — fill in content and get a card. Zero dependencies, works offline.

`XY` is the naming prefix of the author's project series. This project and [`xy-club`](https://github.com/xiaoyu-hue/xy-club) (a club website template) are **two reusable tools in the same family** — the former makes personal intro cards for members, the latter hosts the whole club site; both share a liquid-glass visual language and can be used together.

> ⚠️ **"XY俱乐部" (XY Club) is only a default demo case, not an exclusive brand.** Swap the demo content for any club / team and the tool logic is unchanged.

<br>

**[🔗 Try it online (GitHub Pages)](https://xiaoyu-hue.github.io/xy-intro-card/)** · **[📖 Quick Start](#quick-start)** · **[♻️ Reuse](#reuse)** · **[🙏 Credits](#credits)**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</div>

---

## ✨ Features

- **Zero-dependency single file**: fonts, icons and avatars are inlined; opens offline; a shared card is a standalone file.
- **Two field modes**: "Character Card" (name · age · zodiac · skills · signature, for club members / companions) and "General Card" (name · title · bio · contact) — switchable.
- **Theme aligned with XY site**: Sunset Gold / Ocean Blue / Aurora Purple / Morning Mist — same names and colors as `xy-club`'s four themes.
- **Avatar upload + auto-compress**: uploads are shrunk to 512px via `<canvas>`, so large images never freeze the UI.
- **Live preview + one-click download**: fill on the left, see the phone preview on the right, export a standalone HTML card.
- **Mobile-first + performance restraint**: multi-breakpoint, frame-rate auto-degrade, respects `prefers-reduced-motion`, fewer glass layers on mobile.
- **Auto-save & restore**: localStorage persistence prevents data loss on page refresh.
- **Keyboard accessible**: full Tab-key navigation with visible focus indicators.
- **Accessibility compliant**: ARIA attributes, screen reader support, high contrast mode adaptation.
- **Broad compatibility**: degraded gracefully on iOS < 15, old WebView, Edge Legacy.
- **Foldable & ultra-wide screen support**: breakpoints for Surface Duo, tablets, and desktops >1400px.
- **Extensible API**: `window.XYIntroCard` with template registration and theme addition hooks.

## 🌐 Try it online

Open **[https://xiaoyu-hue.github.io/xy-intro-card/](https://xiaoyu-hue.github.io/xy-intro-card/)** — no install, no sign-up.

> The online version is served as a static site by GitHub Pages and is **functionally identical to opening the file locally**: it is a pure front-end single file; everything runs in your browser, **with no network calls and no data uploaded** (avatars and typed content never leave your device).

<a id="quick-start"></a>

## 🚀 Quick Start

No install, no server:

1. Double-click `个人介绍卡生成器.html` (open in any modern browser), or just use the **online** link above
2. Switch "Character Card / General Card" at the top
3. Fill content, upload avatar, pick a theme — preview updates live
4. Click "下载这张卡片" (Download this card) to get a standalone HTML you can send to anyone

<a id="reuse"></a>

## ♻️ Reuse for any club / team

1. Open the generator, replace "XY俱乐部" with your club / team name
2. Change name, age / title, skills / contact, signature and theme
3. Repeat export per member to get a uniformly styled set of cards

## 📚 Documentation

Full docs: [`docs/README.md`](docs/README.md) (Chinese is authoritative; English per-file where available).

Root governance files: [`CHANGELOG`](CHANGELOG.md) · [`CONTRIBUTING`](CONTRIBUTING.md) · [`SECURITY`](SECURITY.md) · [`CODE_OF_CONDUCT`](CODE_OF_CONDUCT.md) · [`AGENTS`](AGENTS.md) · [`LICENSE`](LICENSE)

## ⚠️ Not for

- Backend storage / multi-user online collaborative editing (pure front-end, data never leaves the browser)
- Heavy animation / 3D (deliberately lightweight-first)
- Server-side auth (no backend)

<a id="credits"></a>

## 🙏 Credits & Dependencies

> **"If I have seen further, it is by standing on the shoulders of giants."**
> — To the open-source community and the open web standards this project stands on.

This project ships **no third-party runtime dependencies**: no npm packages, no CDN links, no hosted fonts — fonts and icons are inlined in the single HTML file.

### Runtime dependencies

| Project | License | Note |
|---------|---------|------|
| None | — | Native HTML / CSS / JavaScript only, zero third-party libraries |

### Web standards relied upon (browser built-ins)

| Standard / API | Note |
|----------------|------|
| [Canvas API](https://developer.mozilla.org/docs/Web/API/Canvas_API) | Compresses uploaded avatars to 512px so large images never freeze the UI |
| [Blob / `URL.createObjectURL`](https://developer.mozilla.org/docs/Web/API/URL/createObjectURL) | Exports the generated card as a standalone HTML file |
| CSS [`backdrop-filter`](https://developer.mozilla.org/docs/Web/CSS/backdrop-filter) | Liquid-glass frosted effect |
| CSS custom properties and [`color-mix()`](https://developer.mozilla.org/docs/Web/CSS/color_value/color-mix) | Computes and switches the four themes (Sunset Gold / Ocean Blue / Aurora Purple / Morning Mist) |
| [`prefers-reduced-motion`](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-motion) | Honors the system "reduce motion" accessibility setting |

### Visual & design inspiration

The liquid-glass language is shared with [`xy-club`](https://github.com/xiaoyu-hue/xy-club), referencing the "material + depth" direction of contemporary OS design. The implementation relies purely on open web standards — no UI framework is used.

### Special thanks

- **Browser built-in web standards** — this project implements no bespoke algorithms; compression, export, theming and motion all call native browser capabilities.
- **Everyone who contributes code, docs and time to open source.**

## 📄 License

[MIT](LICENSE) © 2026 xiaoyu-hue
