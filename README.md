# CertusQA — Marketing Site (certusqa.com)

Static two-page site for **CertusQA** — no build step — brand-matched to
`qa-forge-core/docs/qa-engine-one-pager.html` (emerald `#10b981` / navy `#0B1220`, Inter + JetBrains Mono).
Repo: [`certusqa/certusqa-site`](https://github.com/certusqa/certusqa-site) (public).

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

## Go live — click-by-click

`certusqa.com` is an **apex** domain, and Cloudflare only serves an apex when its nameservers are on
Cloudflare. To keep DNS **and email at Porkbun** (zero email risk), we serve the site on
**`www.certusqa.com`** (a subdomain — Pages supports these via an external CNAME) and **forward the bare
`certusqa.com` → `www`**. This is why we use **Pages**, not a Worker (Workers can't use external DNS at all).

### A. Deploy on Cloudflare Pages (Git-connected)

> If you already created a **Worker** named `certusqa-site`, delete it first so it doesn't double-deploy:
> **Workers & Pages → `certusqa-site` → Settings → Delete**.

- [ ] 1. **dash.cloudflare.com** → **Workers & Pages** → **Create** → **Pages** tab → **Connect to Git**
       (if there's no Pages tab, use the **"Looking to deploy Pages? Get started"** link).
- [ ] 2. Authorize the **certusqa** GitHub account → select repo **`certusqa/certusqa-site`** → **Begin setup**.
- [ ] 3. Build settings (it's static): **Framework preset = None**, **Build command = blank**, **Build output directory = `/`** → **Save and Deploy**.
- [ ] 4. Wait ~1 min → note your live URL, e.g. **`certusqa-site.pages.dev`** (yours may differ). Open it and check `/` and `/deployshield`.

> No Git? Instead: **Create → Pages → Upload assets** and drag this folder in.

### B. Custom domain: www + apex forward (keeps Porkbun DNS + email)

**B1 — add www in Cloudflare Pages:**
- [ ] 1. Your Pages project → **Custom domains** → **Set up a custom domain** → enter **`www.certusqa.com`** → Continue.
- [ ] 2. Cloudflare shows a **CNAME target** (your `*.pages.dev` host) — copy it. It stays "pending" until B2 is done.

**B2 — Porkbun DNS** (porkbun.com → **Domain Management** → `certusqa.com` → **DNS → Edit**):
- [ ] 3. **Add** a record → Type **CNAME**, Host **`www`**, Answer **`<your-project>.pages.dev`**, TTL 600.
- [ ] 4. Delete any old record on host `www` that points to the parking page (`*.l.ink`) so the new CNAME wins.
- [ ] 5. **Do NOT touch** the `MX` records (`fwd1/fwd2.porkbun.com`) or the SPF `TXT` — those keep `hello@certusqa.com` forwarding.

**B3 — forward the bare domain → www** (Porkbun → `certusqa.com` → **URL Forwarding**):
- [ ] 6. Add a forward: from **`certusqa.com`** (subdomain blank) → to **`https://www.certusqa.com`**, type **301 (permanent)**, cloaking **off**.

- [ ] 7. Wait 5–30 min → in Cloudflare Pages the `www` domain flips to **Active** (auto-SSL).
- [ ] 8. Check **https://www.certusqa.com** + `/deployshield`, and that **https://certusqa.com** redirects to www.

### Quick verification (from your Mac)

```bash
dig +short www.certusqa.com                    # your *.pages.dev / Cloudflare, not 207.207.210.x
curl -sSI https://www.certusqa.com | head -1   # expect: HTTP/2 200
curl -sSI https://certusqa.com | head -1       # expect: 301 → https://www.certusqa.com
dig +short certusqa.com MX                      # still fwd1/fwd2.porkbun.com (email intact)
```

### Want the bare `certusqa.com` as the primary URL instead?
That needs the nameservers moved to Cloudflare (Cloudflare imports your `fwd1/fwd2` MX + SPF so email keeps
forwarding). Cleaner apex URL, bigger DNS change — ask and I'll write those steps.

## Wiring

- **Platform page (`index.html`)** CTAs → `mailto:hello@certusqa.com?subject=Live Sandbox Demo Request`.
  To route demos through **Calendly** instead, swap those `href`s.
- **Services page (`deployshield.html`)** CTAs → Tally intake `https://tally.so/r/MePK9X` (the existing lead funnel).
- The **one-pager PDF button** (`qa-forge-core/docs/qa-engine-one-pager.html`) points to `https://certusqa.com`.
- Cross-repo alignment (brand, URLs, pricing) is governed by `qa-forge-core/.cursor/rules/certusqa-cross-repo-sync.mdc`.
