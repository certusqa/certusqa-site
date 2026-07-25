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
