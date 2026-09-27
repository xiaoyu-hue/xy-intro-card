# Security Policy

## Security model

- This tool is a **pure front-end single file**: **no network, no collection, no upload of any user data**; all content lives only in the user's local browser memory.
- Exported cards inline all assets and **reference no external URLs**.
- All user input is escaped via `esc()` before entering the DOM, preventing XSS.

## Known limitations

- **No backend auth** (by design; no sensitive server side).
- A card is static HTML — **anyone who gets the file can read its content**. Do not put truly private info (home address, ID numbers, passwords) on a card.

## Reporting a vulnerability

File a GitHub Issue tagged `security`, or message the author privately. Do not publicly disclose details before a fix.

## Not applicable

This project involves no: server-side auth, database, third-party API calls, or cookie / token storage — hence no corresponding attack surface.
