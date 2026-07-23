# CertusQA — Marketing Site (certusqa.com)

Static landing page for the **CertusQA Agentic GenAI QA Platform**. One `index.html`, no build step,
brand-matched to `qa-forge-core/docs/qa-engine-one-pager.html` (emerald `#10b981` / navy `#0B1220`, Inter + JetBrains Mono).

> This repo is the **public marketing site only**. It contains no engine IP — the private engine lives in
> `certusqa/qa-forge-core` and must never be copied here. See `~/qa-forge-core/.cursor/rules/qa-forge-ip-boundaries.mdc`.

## Structure

```
certusqa-site/
├── index.html                  ← Platform landing (agentic GenAI product) → certusqa.com
├── deployshield.html           ← DeployShield Suite services page → certusqa.com/deployshield
├── assets/
│   ├── styles.css              ← shared design system (both pages link this)
│   ├── certusqa-icon-mark.png  ← hexagon check-probe logo mark (nav + favicon)
│   └── certusqa-logo-horizontal-light.png
├── _headers                    ← Cloudflare Pages security headers
└── .gitignore
```

Two pages, cross-linked in nav + footer:
- **`/` (index.html)** — the CertusQA agentic product; CTAs → `mailto:hello@certusqa.com`.
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

## Deploy to Cloudflare Pages

### Option 1 — Direct Upload (fastest, no GitHub)
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Name the project `certusqa-site`, drag in this whole folder (or just `index.html` + `assets/` + `_headers`).
3. Deploy → you get `certusqa-site.pages.dev`. Confirm it looks right.

### Option 2 — Git-connected (auto-deploy on every push)
1. Create a repo (recommended: `certusqa/certusqa-site` under your existing org) and push this folder.
2. Cloudflare → **Create** → **Pages** → **Connect to Git** → pick the repo.
3. Build settings: **Framework preset = None**, **Build command = (blank)**, **Output directory = `/`**.
4. Deploy.

## Point certusqa.com at it (DNS)

Your domain is at **Porkbun** and currently just parked (302 → `l.ink`). Pick ONE path:

### Recommended — keep Porkbun DNS (does NOT touch your `hello@certusqa.com` email forwarding)
In Cloudflare Pages → your project → **Custom domains** → add `certusqa.com` and `www.certusqa.com`.
Cloudflare shows a target like `certusqa-site.pages.dev`. Then in **Porkbun → Details → DNS**:

| Type  | Host        | Answer / Value               |
|-------|-------------|------------------------------|
| ALIAS | (blank/`@`) | `certusqa-site.pages.dev`    |
| CNAME | `www`       | `certusqa-site.pages.dev`    |

- **First delete** the existing parking records for `@`/`www` (the `207.207.210.x` A records) or the redirect to `l.ink` will win.
- Porkbun's **ALIAS** record does CNAME-flattening at the apex — that's why we use ALIAS, not CNAME, for the bare domain.
- Leave your **MX / email-forwarding** records untouched so `hello@certusqa.com` keeps working.

### Alternative — move DNS to Cloudflare (one-click Pages domains, but re-do email)
1. Cloudflare → **Add a site** → `certusqa.com` → it gives you 2 nameservers.
2. Porkbun → **Authoritative Nameservers** → replace with the Cloudflare pair.
3. In Cloudflare Pages, add the custom domain (auto-configures).
4. ⚠️ **Re-create your email records in Cloudflare** (MX + any TXT/SPF for Porkbun forwarding) or `hello@certusqa.com` will stop forwarding.

Give DNS 5–60 min, then `https://certusqa.com` serves this site (Cloudflare issues SSL automatically).

## Wiring

- **Platform page (`index.html`)** CTAs → `mailto:hello@certusqa.com?subject=Live Sandbox Demo Request`.
  To route demos through **Calendly** instead, swap those `href`s.
- **Services page (`deployshield.html`)** CTAs → Tally intake `https://tally.so/r/MePK9X` (the existing lead funnel).
- The **one-pager PDF button** (`qa-forge-core/docs/qa-engine-one-pager.html`) points to `https://certusqa.com`.
- Cross-repo alignment (brand, URLs, pricing) is governed by `qa-forge-core/.cursor/rules/certusqa-cross-repo-sync.mdc`.
