# Homepage v3 — compare before changing the live site

**Live site (`index.html`) is unchanged.** This folder holds a preview-only build of brief v3.

## Open locally

From the repo root:

```bash
python3 -m http.server 8765
```

Then:

| | URL |
|---|---|
| **Current (live)** | http://127.0.0.1:8765/index.html |
| **Proposed (v3)** | http://127.0.0.1:8765/redesign-review/homepage-v3-preview.html |

The preview has an orange banner and a link back to the current homepage.

These files are **not** on the Cloudflare Pages allowlist (`scripts/build-dist.sh`), so they will not publish even if this branch deploys.

## Screenshots

| | Desktop 1280 | Mobile ~380 |
|---|---|---|
| Current | `screenshots/current-desktop.png` | `screenshots/current-mobile.png` |
| Proposed | `screenshots/preview-v3-desktop.png` | `screenshots/preview-v3-mobile.png` |

## What changes in the proposal (for comparison)

- Simpler hero: one primary CTA, no path tabs; differentiator in the H1
- JSON proof card once, with injected-drift caption (no second “Predict · Heal · Hunt · Gate” line in the hero)
- New “If you fire us…” lock-in block early
- One framework: Write → Predict → Heal → Hunt → Gate
- Guardrails keep “fixes the test, never the verdict”
- Shorter nav; Walkthrough kept
- Showcase / Measured / DeployShield kept as on the live page

When you approve the look, say go and the live `index.html` will be updated on this feature branch (not `main`).
