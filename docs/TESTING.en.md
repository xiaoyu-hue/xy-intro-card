# Testing Documentation (TESTING)

> This project uses a **three-layer verification system**: Node logic checks + build gate + GitHub Actions CI.

## 1. Layered Architecture

| Layer | Method | Dependencies | Description |
|---|---|---|---|
| Logic validation | Node extracts `<script>` + DOM stubs, runs `buildDoc` | Node 18+ | Validates exported HTML structure / fields / theme injection / XSS protection |
| Build check | `scripts/build-check.sh` | grep, wc | Validates file integrity, HTML structure, CSP security policy |
| CI gate | `.github/workflows/ci.yml` | GitHub Actions | Automatically runs the above two layers on every push/PR |

## 2. Logic Tests (tests/logic.test.js)

Run method:
```bash
node tests/logic.test.js
```

### Test Coverage (102 cases)

#### Test 1: XSS Protection (6 cases)
- script tags should be escaped to `&lt;script&gt;`
- img tags should be escaped to `&lt;img`
- quotes should be escaped to `&quot;`
- alert text should be preserved (as plain text)
- normal text should be preserved
- normal text should be preserved (second group)

#### Test 2: Empty Field Handling (3 cases)
- Empty fields should not crash, output valid HTML
- Should include DOCTYPE
- Should include html tag

#### Test 3: Long Input Truncation (2 cases)
- Output length should be within reasonable range (<50KB)
- Long text should be preserved (or truncated)

#### Test 4: Dark Theme Injection (12 cases)
- Sunset Gold: --amber and --amber-2 correctly injected
- Ocean Blue: --amber and --amber-2 correctly injected
- Aurora Purple: --amber and --amber-2 correctly injected
- Morning Mist: --amber and --amber-2 correctly injected
- All 4 dark themes should NOT inject light-specific variables (e.g. --bg-solid: #f7f4f0)

#### Test 4b: Light Business Theme Injection (8 cases)
- neutral_morning palette full variable injection:
  `--amber`, `--bg-solid`, `--text`, `--glass-1`, `--card-shadow-1`,
  `meta theme-color`, `--foot-color`, `--sign-color`

#### Test 4c: Dark meta theme-color Regression (1 case)
- Dark theme exported card's `<meta theme-color>` should be `#06060b`

#### Test 5: Footer Modes (4 cases)
- default mode should include ©
- produce mode should include "出品"
- custom mode should include custom text
- hidden mode should NOT display footer

#### Test 6: Two Mode Field Isolation (8 cases)
- oc mode should NOT have "关于我" label
- oc mode should NOT have "联系方式" label
- oc mode should have "个人信息" label
- oc mode should have "游戏技能" label
- general mode should NOT display age
- general mode should NOT display zodiac
- general mode should have "关于我" label
- general mode should have "联系方式" label

#### Test 7: Industry Preset Data Injection (7 cases)
- Should have 3 industry preset objects (reading/restaurant/business)
- Each preset has `fields.fullName`
- Reading preset exports title, script, signature correctly

#### Test 8: blob Color Verification (6 cases)
- Dark theme blob alpha should be .45/.30/.26 (high saturation active colors)
- Light theme blob alpha should be 0.14/0.09/0.07 (low transparency restrained colors)

#### Test 9: Internal Function Export Validation (9 cases)
- `getThemeVarValues` should be a function
- `THEMES_CONFIG` should contain 4 light business themes
- `getThemeVarValues` should return correct CSS variable values

#### Test 10: localStorage Version Migration (4 cases)
- Legacy version without mode/palette should downgrade to dark/null
- New version with mode/palette should be preserved

#### Test 11: Avatar Upload and Processing (5 cases)
- placeholder should include img tag
- placeholder should be SVG data URL
- placeholder should contain first character of name
- With avatar should use actual avatar data
- Without avatar should use placeholder

#### Test 12: Download Function Verification (11 cases)
- Should be valid HTML5 document
- Should include correct lang attribute
- Should include closing html tag
- Should include head tag
- Should include body tag
- Should include CSP header
- CSP should forbid embedding
- Title should include club name and user name
- Should include favicon link
- Should include card container
- Should include stage container

#### Test 13: Responsive Breakpoint Check (7 cases)
- Should have 480px breakpoint (mobile)
- Should have 360px breakpoint (small screen mobile)
- Should have 320px breakpoint (ultra-small screen)
- Should have 768px breakpoint (tablet)
- Should have 1400px breakpoint (large screen)
- Should include container queries
- Should include landscape adaptation

#### Test 14: Animation Degradation and Performance Optimization (9 cases)
- Should support prefers-reduced-motion
- Should disable animation degradation
- Should have lite mode particle disable
- Should have lite mode blur degradation
- Should have CSS feature detection degradation
- Should have background fallback
- Should use will-change to hint browser
- Should use transform animation
- Should use rAF for animation

## 3. Build Check (scripts/build-check.sh)

Run method:
```bash
sh scripts/build-check.sh
```

### Check Items
- Main file exists
- Includes DOCTYPE
- Includes html tag and lang attribute
- Includes buildDoc function
- Includes esc escape function
- Includes CSP security policy
- File size is reasonable (<100KB)
- docs directory integrity (ARCHITECTURE.md, PRD.md, FIELDS.md)

## 4. CI Configuration (.github/workflows/ci.yml)

Trigger conditions: push to main, pull_request to main

Jobs:
1. **check**: Run build check script
2. **test**: Run logic tests (requires Node.js 20)
3. **lint**: Basic lint checks
   - HTML structure integrity
   - No hardcoded passwords
   - No external CDN dependencies

## 5. Local Development Workflow

### Pre-commit Checks
```bash
# Run full checks
sh scripts/build-check.sh

# Or run individually
node tests/logic.test.js
sh scripts/build-check.sh
```

### Regression Test Checklist (manual verification after each change)
- [ ] Two mode switching, fields correctly show/hide
- [ ] Eight theme colors injected correctly (4 dark high-saturation blobs + 4 light low-transparency blobs, blob/text light/dark all normal)
- [ ] Click industry presets (reading/restaurant/business), fields auto-filled and preview updated
- [ ] Upload 2400×2400 large image: preview doesn't freeze, exported card ~10KB
- [ ] No avatar uploaded: shows "theme color + first character" placeholder (avatar SVG background switches with theme)
- [ ] Exported card opens independently, visual matches preview
- [ ] Mobile viewport (375 / 390) no overflow

## 6. Discipline Agreements

- Changes to export logic (`buildDoc` / `CARD_CSS`) must re-run §2 logic validation.
- Changes to visuals (CSS / animations) must supplement §3 screenshot comparison.
- After adding new themes or industry presets, must synchronously add corresponding test cases in §2.
- Whether documents and code are still aligned is constrained by [`DOC_SYNC.md`](DOC_SYNC.md).
- When adding new test cases, please follow the existing naming convention: `测试 N: 描述`.
