# Product Requirements (PRD)

> Positioning, feature boundaries, field spec and acceptance criteria. Binding for both non-technical stakeholders and developers.

## 1. Positioning

A **reusable personal-intro card generator** for members of **any club / team**.

- **Not** a private asset of any one club: "XY俱乐部" is only the default demo case.
- With [`xy-club`](https://github.com/xiaoyu-hue/xy-club) (club site template), it is one of two companion tools in the "XY series": the site hosts the whole club, this tool makes member intro cards.

## 2. Target users

- **Operators / organizers**: non-technical, need zero-code, batch card production for members.
- **Members**: receive a shareable, collectable HTML card.

## 3. Core features

| Feature | Notes | Pri |
|---|---|---|
| Two field modes | "Character Card" / "General Card" switch | P0 |
| Content form | form-driven, live phone preview | P0 |
| Theme color | Sunset Gold / Ocean Blue / Aurora Purple / Morning Mist | P0 |
| Avatar upload | auto-compress, no freeze on large images | P0 |
| One-click export | download standalone HTML, zero deps | P0 |
| Mobile adapt | multi-breakpoint, notch safe-area | P1 |
| Perf degrade | low FPS / reduced-motion / background pause | P1 |

## 4. Field spec

See [`FIELDS.md`](FIELDS.md). The two modes' fields are decoupled; export picks a template by `mode`.

## 5. Acceptance criteria

- [ ] Generator usable offline, no server
- [ ] Two modes switch correctly in preview and export
- [ ] Four themes inject correctly (blobs + text light/dark)
- [ ] 2400×2400 upload: no freeze, export card ~10KB
- [ ] Exported card opens standalone, visually matches preview
- [ ] All user input escaped, no XSS
- [ ] Missing avatar shows "theme color + first char" placeholder

## 6. Non-goals

- ❌ Backend storage / multi-user online collaborative editing
- ❌ Server-side auth / accounts
- ❌ Heavy animation / 3D / video backgrounds
- ❌ Front-end frameworks / bundlers (keep zero-build, zero-dep)

## 7. Success metrics

- A totally non-technical member produces a shareable card within 5 minutes.
- All member cards of one club share a unified visual style.
