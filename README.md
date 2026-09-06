# CertusQA — Marketing Site (certusqa.com)

Static two-page site for **CertusQA** — no build step — brand-matched to the
CertusQA one-pager (emerald `#10b981` / navy `#0B1220`, Inter + JetBrains Mono).
Repo: [`certusqa/certusqa-site`](https://github.com/certusqa/certusqa-site) (public).

> This repo is the **public marketing site only**. It contains no engine IP — the private engine must never be copied here.

## Structure

```
certusqa-site/
├── index.html                  ← Platform landing (agentic GenAI product) → certusqa.com
├── deployshield.html           ← DeployShield Suite services page → certusqa.com/deployshield
├── showcase/index.html         ← Interactive 45s engine walkthrough (iframe’d from `/#showcase`)
├── showcase/live-ae/           ← Live Automation Exercise WebM + sanitized triage + VO script
├── contract/index.html         ← Public contract SUT mirror (online deferred proof)
├── assets/
│   ├── styles.css              ← shared design system (both pages link this)
│   ├── certusqa-icon-mark.png  ← hexagon check-probe logo mark (nav + favicon)
│   └── certusqa-logo-horizontal-light.png
├── _headers                    ← Cloudflare Pages security headers
└── .gitignore
```

Two pages, cross-linked in nav + footer:
- **`/` (index.html)** — the CertusQA agentic product; CTAs → `mailto:hello@certusqa.com`. Includes `#showcase` iframe walkthrough **and** `#live-run` WebM from `showcase/live-ae/`.
- **`/showcase/`** — standalone interactive walkthrough (also `?embed=1` for clean iframe chrome).
- **`/showcase/live-ae/`** — outcomes-only live storefront recording (no engine source).
- **`/deployshield`** — the managed DeployShield Suite services offer (migrated from Bolt); CTAs → Tally intake `https://tally.so/r/MePK9X`.

Cloudflare Pages serves `deployshield.html` at the clean URL `/deployshield` automatically.

## Preview locally

```bash
# just open it
open index.html
# or a quick server
python3 -m http.server 8080   # then visit http://localhost:8080
```

Re-render preview screenshots (matches how the site was verified):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --hide-scrollbars --screenshot=preview-desktop.png --window-size=1280,4200 "file://$PWD/index.html"
```

DNS / email / Pages go-live steps live in the private ops repo.

## Wiring

- **Platform page (`index.html`)** CTAs → `mailto:hello@certusqa.com?subject=Live Sandbox Demo Request`.
  To route demos through **Calendly** instead, swap those `href`s.
- **Services page (`deployshield.html`)** CTAs → Tally intake `https://tally.so/r/MePK9X` (the existing lead funnel).
- The **one-pager** button points to `https://certusqa.com`.

## Conversion component (2026-09-06)

Every CTA on `/` goes to the Tally intake `https://tally.so/r/MePK9X` with three query params
appended by `assets/cta.js`: `source` (which block: `home-hero`, `home-footer-band`, `home-nav`,
`home-showcase`, `deployshield-N`), `path` (`demo` | `sandbox` | `design-partner`) and `page`.
**Tally ignores unknown params**, so attribution is empty until you add three Hidden fields named
`source`, `path` and `page` to the form (Tally → form → add block → Hidden fields). No `mailto:`
CTAs remain; the email address stays as a plain contact link.

The "Try the sandbox now" tab fetches `showcase/live-ae/triage-report.json` (same origin, allowed
by `connect-src 'self'`) and renders the artifacts. Without JS the panel still shows the download
and player links.

All inline scripts were extracted to `assets/site.js`, `assets/cta.js`, `showcase/storyboard.js`,
`showcase/live-ae/player.js` and `contract/contract.js`, so the CSP is `script-src 'self'` plus
the Cloudflare Web Analytics origin. Add a new `<script>` as an external file; the leak gate fails
on any unhashed inline script anywhere in the tree.

## Evidence page (`/proof/`) is generated, not written

`showcase/evidence/golden-eval.json` is produced by `qa-forge-core` (`npm run publish:site-evidence`,
and its CI on every merge to `main` once `CERTUSQA_SITE_TOKEN` is set there). Do not hand-edit it;
the next publish would overwrite the edit. `proof/proof.js` renders it at runtime, so every number
on the evidence page traces to that file and to the engine commit stamped inside it.

