# 🪪 XY Personal Intro Card Toolkit

> A **reusable personal-intro card generator**: usable by any club / team — fill in content and get a card. Zero dependencies, works offline.

`XY` is the naming prefix of the author's project series. This project and [`xy-club`](https://github.com/xiaoyu-hue/xy-club) (a club website template) are **two reusable tools in the same family** — the former makes personal intro cards for members, the latter hosts the whole club site; both share a liquid-glass visual language and can be used together.

> ⚠️ **"XY俱乐部" (XY Club) is only a default demo case, not an exclusive brand.** Swap the demo content for any club / team and the tool logic is unchanged.

## ✨ Features

- **Zero-dependency single file**: fonts, icons and avatars are inlined; opens offline; a shared card is a standalone file.
- **Two field modes**: "Character Card" (name · age · zodiac · skills · signature, for club members / companions) and "General Card" (name · title · bio · contact) — switchable.
- **Theme aligned with XY site**: Sunset Gold / Ocean Blue / Aurora Purple / Morning Mist — same names and colors as `xy-club`'s four themes.
- **Avatar upload + auto-compress**: uploads are shrunk to 512px via `<canvas>`, so large images never freeze the UI.
- **Live preview + one-click download**: fill on the left, see the phone preview on the right, export a standalone HTML card.
- **Mobile-first + performance restraint**: multi-breakpoint, frame-rate auto-degrade, respects `prefers-reduced-motion`, fewer glass layers on mobile.

## 🚀 Quick Start

No install, no server:

1. Double-click `个人介绍卡生成器.html` (open in any modern browser)
2. Switch "Character Card / General Card" at the top
3. Fill content, upload avatar, pick a theme — preview updates live
4. Click "下载这张卡片" (Download this card) to get a standalone HTML you can send to anyone

## ♻️ Reuse for any club / team

1. Open the generator, replace "XY俱乐部" with your club / team name
2. Change name, age / title, skills / contact, signature and theme
3. Repeat export per member to get a uniformly styled set of cards

## 📚 Documentation

Full docs: [`docs/README.md`](docs/README.md) (Chinese is authoritative; English per-file where available).

## ⚠️ Not for

- Backend storage / multi-user online collaborative editing (pure front-end, data never leaves the browser)
- Heavy animation / 3D (deliberately lightweight-first)
- Server-side auth (no backend)

## 📄 License

[MIT](LICENSE) © 2026 xiaoyu-hue
