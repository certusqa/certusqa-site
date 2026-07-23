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

Two manual jobs, ~15 min total: **(A)** deploy on Cloudflare Pages, **(B)** point Porkbun DNS at it.
The repo is already on GitHub, so use the Git-connected path (auto-deploys on every `git push`).

### A. Deploy on Cloudflare Pages (Git-connected)

- [ ] 1. Go to **dash.cloudflare.com** → left sidebar **Workers & Pages** → blue **Create** button.
- [ ] 2. Pick the **Pages** tab → **Connect to Git** → **Connect GitHub** → authorize the **certusqa** account.
- [ ] 3. Select the repo **`certusqa/certusqa-site`** → **Begin setup**.
- [ ] 4. Build settings — leave them empty (it's static):
       - **Framework preset:** `None`
       - **Build command:** _(blank)_
       - **Build output directory:** `/`
- [ ] 5. Click **Save and Deploy**. Wait ~1 min → you get a live URL like **`certusqa-site.pages.dev`**.
- [ ] 6. Open that `.pages.dev` URL and check both pages: `/` and `/deployshield`.

> From now on, `git push` to `main` auto-deploys. (No Git? Instead use **Create → Pages → Upload assets** and drag this folder in.)

### B. Point certusqa.com at it (keep Porkbun DNS — protects your email)

**B1 — add the domain in Cloudflare:**
- [ ] 1. In your new Pages project → **Custom domains** tab → **Set up a custom domain**.
- [ ] 2. Enter **`certusqa.com`** → Continue. Repeat for **`www.certusqa.com`**.
- [ ] 3. Cloudflare shows a **CNAME target** — copy it (it's your project host, e.g. `certusqa-site.pages.dev`). It'll say "verifying / pending" until step B2 is done.

**B2 — update DNS at Porkbun** (**porkbun.com** → sign in → **Domain Management** → `certusqa.com` → **DNS / Details → Edit DNS Records**):
- [ ] 4. **Delete** the existing parking records so the `l.ink` redirect stops winning:
       - the `A` records on host `@` and `www` pointing to `207.207.210.36` / `207.207.210.50`
       - any `ALIAS`/`CNAME` on `@` or `www` that points to `*.l.ink` or the parking page
- [ ] 5. **Add** these two records (paste the target from step B3):

       | Type  | Host  | Answer / Value            | TTL  |
       |-------|-------|---------------------------|------|
       | ALIAS | `@`   | `certusqa-site.pages.dev` | 600  |
       | CNAME | `www` | `certusqa-site.pages.dev` | 600  |

- [ ] 6. **Do NOT touch** the `MX` records or any `TXT` (SPF) — those keep `hello@certusqa.com` forwarding alive.
- [ ] 7. Save. Wait 5–60 min. Back in Cloudflare the custom domains flip to **Active** and SSL is issued automatically.
- [ ] 8. Visit **https://certusqa.com** and **https://certusqa.com/deployshield** — done.

> Why **ALIAS** (not CNAME) on `@`: DNS forbids a CNAME on the bare/apex domain; Porkbun's ALIAS does the
> equivalent via CNAME-flattening. `www` uses a normal CNAME.

### Quick verification (optional, from your Mac)

```bash
dig +short certusqa.com          # should show Cloudflare IPs (104.x / 172.67.x), not 207.207.210.x
curl -sSI https://certusqa.com | head -1   # expect: HTTP/2 200
```

### Alternative — move nameservers to Cloudflare
Faster domain hookup (one click in Pages), **but** you must re-create your Porkbun email-forwarding
records (`MX` + SPF `TXT`) in Cloudflare or `hello@certusqa.com` stops working. Only do this if you're
comfortable re-adding email DNS. The Porkbun path above avoids that entirely.

## Wiring

- **Platform page (`index.html`)** CTAs → `mailto:hello@certusqa.com?subject=Live Sandbox Demo Request`.
  To route demos through **Calendly** instead, swap those `href`s.
- **Services page (`deployshield.html`)** CTAs → Tally intake `https://tally.so/r/MePK9X` (the existing lead funnel).
- The **one-pager PDF button** (`qa-forge-core/docs/qa-engine-one-pager.html`) points to `https://certusqa.com`.
- Cross-repo alignment (brand, URLs, pricing) is governed by `qa-forge-core/.cursor/rules/certusqa-cross-repo-sync.mdc`.
