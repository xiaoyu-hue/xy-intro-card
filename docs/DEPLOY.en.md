# Deploy Documentation (DEPLOY)

> This project is a pure static single-file application with no server, database, or build steps. Distribution is minimal.

## 1. Generator Distribution

`个人介绍卡生成器.html` is all there is. Just deliver this file to users:

- Send directly (WeChat / email / cloud storage)
- Static hosting: GitHub Pages, Vercel, Netlify, object storage static sites, etc. — just drop the file in and it's accessible

No `npm install` needed, no environment variables, no persistent volumes.

## 2. Exported Card Distribution

Clicking "Download this Card" produces a **.fully independent** `.html`:

- All styles and scripts are inlined, no external resource references
- Works offline
- Can be shared, bookmarked, or embedded in web pages via `<iframe src="card.html">` like any regular file

> Tip: If you want to display member cards on a website (e.g. `xy-club`), you can host the exported HTML as a static resource or embed it in member pages using `<iframe src="card.html">`.

## 3. Versioning and Release

- Version numbers follow [SemVer](https://semver.org/), change records are in the root [`CHANGELOG.md`](../CHANGELOG.md).
- Document version sync rules are constrained by [`DOC_SYNC.md`](DOC_SYNC.md).
- Before release / irreversible operations, must pass [`DECISION_REVIEW.md`](DECISION_REVIEW.md).

### Release Process (Tag + GitHub Release)

```bash
# 1. Confirm all tests pass
node tests/logic.test.js
sh scripts/build-check.sh

# 2. Confirm documents are synced (see DOC_SYNC.md §2)

# 3. Create tag (format: v MAJOR.MINOR.PATCH-PhaseN)
git tag -a v2.1.0-Phase4 -m "feat: neutral business theme family + industry presets

- Add 4 light business themes (neutral_morning / neutral_cloud / neutral_oat / neutral_navy)
- Extend CSS variable system 30+ variables, light/dark dual mode coexist
- Add 3 industry preset buttons (reading/restaurant/business)
- 51 tests all green (original 31 + new 20)
- CHANGELOG / ARCHITECTURE / PRD / README bilingual sync"

# 4. Push to remote (including tag)
git push origin main --tags

# 5. Create Release on GitHub page (tag already associated)
#    GitHub Actions CI will automatically run check + test + lint
```

## 4. Notes

- Exported cards may contain embedded user avatars (base64), typically 20–50KB, which is normal; if the user uploads a very large original image, the generator automatically compresses to approximately 10KB.
- This tool does not collect any data; all content exists only in the user's local browser.
