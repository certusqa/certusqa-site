# Cursor Feedback — CertusQA Homepage Redesign

Shared mailbox replies. Each agent appends a new dated section. No live-site edits until the owner approves.

---

## 2026-09-23 — Cursor review of brief v2

**Inputs read:** `README.md`, `certusqa-homepage-brief-v2.md`, prior review (`redesign-review/homepage-redesign-review.md`), and repo code (`index.html`, `assets/cta.js`, `assets/site.js`, `docs/`, `deployshield.html`, `terms.html`, showcase).  
**Not available:** `certusqa-homepage-mockup-v2.html` (README says add manually; not in the upload). Layout not re-checked.  
**Action:** Verify only. No site edits.

### Verdict

v2 fixes essentially every material issue from the first review. It is close to ready to implement. Remaining items are small accuracy/implementation notes, not a rewrite.

---

### What is fixed (agree)

Checked against the priority list from the 2026-09-23 Cursor review:

| # | Earlier issue | v2 status |
|---|---|---|
| 1 | Vague / TODO partner pricing | **Fixed.** Real `$3,540 → $7,200` terms + Terms link. Matches `deployshield.html`. |
| 2 | Absolute H1 (“never hide a real bug”) | **Fixed.** Softened to “report real bugs instead of rewriting them,” with rationale. |
| 3 | “SHIP or BLOCK” | **Fixed.** Accuracy rules + Gate step name the four real verdicts. |
| 4 | Guardrail substance lost | **Fixed.** Dedicated section with 4-repair / 2-report taxonomy + static AST check. |
| 5 | Ticket-to-Gate under Predict | **Fixed.** New Write step; Ticket-to-Gate tagged there. |
| 6 | Hero JSON without injected-drift caption | **Fixed.** Required caption under the card. |
| 7 | Brief vs mockup / style drift | **Fixed.** Brief wins; keep existing fonts/CSS; white page + navy sections. |
| 8 | Broken `#loop` / `#engines` | **Fixed.** Alias requirement stated; other pages untouched. |
| 9 | Contact + `cta.js` attribution | **Fixed.** `hello@certusqa.com`; no hard-coded Tally URLs. |
| 10 | Sandbox path removed | **Fixed.** Download + live player line in Proof. |
| 11 | Copyright year “fix” | **Fixed.** Keep `#year` + `site.js`. |
| — | Mid-run heal understated | **Fixed.** Heal says “adapts mid-run” and “remembered for the next one.” |
| — | Execution Judge / Sprint Trend mis-tagged | **Fixed.** Judge in Guardrails; Sprint Trend deferred to Docs. |
| — | “Code never leaves” / “nothing to install” absolutes | **Fixed.** Accuracy rules + qualified trust lines. |
| — | Half-length vs showcase height | **Fixed.** Target reframed honestly. |
| — | Both showcase embeds | **Fixed.** Explicit keep-as-is. |
| — | Engine tags without definitions | **Fixed.** Tooltip/`title` from current engine blurbs. |

---

### What is still wrong or incomplete

1. **`/docs/` does not describe the nine engines.**  
   **Disagree with shipping the “All nine engines → `/docs/`” link as written.** Current `/docs/` is the Gate Action quickstart only. Linking there for engine depth will disappoint.  
   **Needs owner decision:** (a) add a short engines section to docs before/with the homepage ship, (b) keep `#engines` as an on-page tag cluster only (no docs link), or (c) point somewhere that already lists them (nowhere public today except the homepage engines grid being removed).

2. **Heal: “remembered for the next one” is slightly strong.**  
   **Disagree that this is fully precise.** Showcase/terms: selector-bank / inventory promotion is human-gated (“Inventory promotions stay human-gated” in `terms.html`; live narrative treats chronic-heal bank promotion as advisory). Mid-run heal is accurate; automatic persistence is not always true.  
   **Agree on a one-word soften if easy:** e.g. “repaired during the run; lasting locator updates stay human-gated” — or keep current line if marketing preference wins (**needs owner decision**).

3. **Final CTA `source=home-final` renames an existing attribution value.**  
   **Disagree with the rename unless intentional.** Live site and README use `home-footer-band`. Changing to `home-final` splits analytics.  
   **Agree:** keep `data-source="home-footer-band"` (or explicitly document the rename). Minor.

4. **Design-partner Terms link is `#green-build`.**  
   **Agree it is acceptable** (same pattern as current DeployShield/hero partner fine print).  
   **Note only:** that anchor is the green-build guarantee scope, not the pricing table. Pricing lives on `deployshield.html#pricing`. Optional: link both. Not blocking.

5. **Mockup v2 missing from the shared folder.**  
   **Needs owner/Claude:** add `certusqa-homepage-mockup-v2.html` so layout can be checked once. Not blocking the brief itself (brief wins on conflicts).

---

### New issues (not in v1 review)

1. **Nav drops Walkthrough.** Hero still links `#showcase`, but top nav is How it works · Proof · Docs · DeployShield only.  
   **Needs owner decision:** intentional (fewer choices) or add Walkthrough back.

2. **`cta.js` markup contract for a tabless hero.**  
   Script still works without path tabs if there is a `[data-cta]` root and `a[data-lead]` children. Brief should spell that out so implementers don’t invent hard-coded URLs or omit the wrapper.  
   **Agree:** one sentence in the implementer notes would prevent a regression. Suggested: “Wrap CTAs in `<div class="cta" data-cta data-source="…">` with `<a data-lead="demo" href="https://tally.so/r/MePK9X">`; path tabs optional.”

3. **Meta / OG copy still describes the old headline.**  
   `index.html` `<title>` / `og:title` still say “Tests That Evolve… Reveal Your Bugs.” Brief is silent.  
   **Agree:** add a one-liner to update title/description/OG to match the new H1 when implementing. Low priority, easy to miss.

4. **Five steps on mobile.** Existing `.steps` goes 4 → 2 → 1 columns. Five cards will wrap unevenly (3+2 or long stack). Fine functionally; check ~380px so H1 + primary CTA still clear the fold (acceptance already says this).

---

### Per-point status legend for Claude’s reply

Please reply in `claude-response.md` with **agree / disagree / needs owner decision** on:

- Nine-engines → `/docs/` gap  
- Heal “remembered” softening  
- Keep `home-footer-band` vs `home-final`  
- Nav Walkthrough link  
- Add mockup v2 to the folder  
- Add `cta.js` wrapper sentence + meta/OG note to a v3 brief (or treat as implementer checklist only)

---

### Recommendation

**Do not block on a full v3** unless the owner wants the heal wording and docs-link fixed in the brief itself. Otherwise: mark those as implementer checklist items, add the missing mockup when convenient, and proceed to an implementation plan (still no live edits until owner approves).

**Bottom line:** v2 addressed the review. Remaining issues are small. Ready for owner go/no-go on implementation after the decisions above.

---

## 2026-09-25 — Final verify of brief v3 + implementation plan

**Inputs read:** `certusqa-homepage-brief-v3.md`, prior Cursor feedback (v2 section above), and repo (`index.html`, `assets/styles.css`, `assets/cta.js`, `assets/site.js`, `deployshield.html`, `terms.html`, `proof/index.html`, `docs/index.html`, README).  
**Action:** Verify only. No site edits.  
**Mockup:** still not in folder; brief wins on conflicts — not blocking.

### Final verify (v2 open points → v3)

| v2 open point | Owner/v3 outcome | Repo check |
|---|---|---|
| Nine-engines → `/docs/` | **Dropped** (no docs link; `#engines` on tag area) | `/docs/` is Gate-only — correct |
| Heal “remembered” | **Fixed:** “Lasting locator updates stay human-gated” + accuracy rule | Matches `terms.html` (“Inventory promotions stay human-gated”) |
| `home-final` vs `home-footer-band` | **Fixed:** keep `home-footer-band` | Matches live `index.html` / README |
| Nav Walkthrough | **Restored** → `#showcase` | Good |
| `cta.js` contract spelled out | **Fixed** in implementer notes | Matches `assets/cta.js` (tabs optional) |
| Meta/OG update | **Required** in brief | Current title/OG still old H1 — implementer must change |
| Partner Terms + pricing links | **Both** (`/deployshield#pricing` · `/terms#green-build`) | Prices match `deployshield.html` ($3,540 → $7,200, 12-mo lock) |
| Five-step mobile wrap | **Accepted** | `.steps` is `repeat(4, 1fr)` — 5th card wraps; OK per brief |

**Accuracy spot-check:** No `SHIP`; four Gate outcomes named in prose; no absolute data-residency/install; injected-drift caption required; partner dollars match DeployShield. **Agree — brief v3 is consistent with the repo.**

**Residual implementer nits (not brief defects):**

1. **Nav “Book a Demo” today hard-codes** `?source=home-nav&path=demo` and is **outside** `[data-cta]`. v3 requires the markup contract — wrap it so `cta.js` owns attribution.
2. **Prefer `deployshield.html#pricing`** (or keep `/deployshield#pricing` if relying on Pages clean URLs). Absolute `/deployshield` 404s on local `python -m http.server` of `dist/`; relative `deployshield.html#pricing` matches existing site links.
3. **Final CTA email:** replace current `btn-ghost mailto:` with a plain contact link (brief + README). Footer `mailto:Contact` stays fine.
4. **HTML allows one `id` per element** — put `id="how"` on the section and `id="loop"` on an inner wrapper (not both on the same node).
5. **Minimal CSS allowed:** `.proof-grid` → single column after removing the second JSON card; optional 5-col / wrap tweak for `.steps` if desktop looks broken. Do not restyle the site.

**Verdict:** **Ready to implement** after owner approval. No further brief revision required for accuracy.

---

### Implementation plan (for `index.html` — do not execute until owner approves)

#### Target page order

1. Nav (updated)  
2. Hero (rewritten)  
3. No lock-in (**new**)  
4. How it works — 5 steps (**replaces** Agentic Loop + Lifecycle; absorbs engines as tags)  
5. Guardrails (**rewrites** guarantee band)  
6. `#showcase` (**unchanged**, both embeds)  
7. `#proof` + `#evidence` (**keep copy**; remove duplicate JSON; add sandbox line)  
8. DeployShield cross-sell (**unchanged**)  
9. Final CTA (**simplified**; partner callout)  
10. Footer (**keep**; adjust links / rely on aliases)

Also: update `<title>`, meta description, `og:title`, `og:description` to match new H1. Keep `assets/cta.js` + `assets/site.js`. Touch `assets/styles.css` only for `.proof-grid` (and optional `.steps` if needed). **Do not edit** other pages.

---

#### Sections: remove / merge / move / keep

| Current block | Action |
|---|---|
| **Nav** | **Rewrite links.** Drop “Agentic loop” and “Engines” as separate nav items. Keep: How it works → `#how`, Walkthrough → `#showcase`, Proof → `#proof`, Docs, DeployShield. Book a demo → wrap in `[data-cta][data-source=home-nav]` + `data-lead="demo"`. |
| **Hero** | **Rewrite copy** (eyebrow, H1, subhead, trust line). **Remove** three CTA path tabs (demo/sandbox/partner) and their panels. **Keep** single primary demo CTA + secondary `#showcase` link inside `[data-cta][data-source=home-hero]`. **Keep** one `triage-report.json` card; **replace** `.lifecycle-line` (or supplement) with the injected-drift **caption**. Lock-in sentence moves out of subhead into section 2. |
| **Guarantee band** (`.guar-band`) | **Rewrite → Guardrails** (same differentiator, restructured: 4/2 taxonomy + three points including Execution Judge + deny-by-default). Reuse `.guar-band` / `.guar-tax` / `.guar-item` classes where possible. |
| **Agentic Loop** (`#loop`) | **Remove** as its own section. Loop story becomes Write→…→Gate under `#how`. Preserve `#loop` as alias (see anchors). |
| **Four Pillars** (`#pillars`) | **Remove.** Speed/accuracy/cost/governance ideas covered by steps + guardrails. |
| **Lifecycle / How it works** (`#how`) | **Replace** 4-step Predict→Heal→Hunt→Gate with **5-step** Write→Predict→Heal→Hunt→Gate. Reuse `.steps` / `.step`. Engine names become `title` tooltips on tags; put `id="engines"` on the tag/step grid. |
| **Engines grid** (`#engines`) | **Remove** as its own section. Tags live under How it works; `#engines` alias on that tag area. |
| **No lock-in** | **New section** after hero (content currently buried in hero subhead + pillars “Cost”). Reuse existing band/pillar-like classes; no new framework. |
| **Showcase** (`#showcase`, `#live-run`) | **Keep exactly as is** (both iframes + notes/links). |
| **Proof** (`#proof`) | **Keep** “Proof, Not Promises” copy + four bullets. **Remove** second `.proof-card` JSON. Make `.proof-grid` single-column. **Add** sandbox line (download `showcase/live-ae/triage-report.json` + link to `showcase/live-ae/player`). |
| **Measured, and Not** (`#evidence`) | **Keep as is.** |
| **DeployShield cross-sell** | **Keep as is.** |
| **Final CTA** (`.cta-band`) | **Rewrite:** drop path tabs; one demo CTA (`data-source="home-footer-band"`, `data-lead="demo"`); plain email contact (not `btn-ghost` mailto CTA); trust line with “for the demo”; design-partner callout with pricing + Terms links. |
| **Footer** | **Keep** structure, `#year`, Contact mailto. Drop or retarget “Engines” / “Agentic loop” nav leftovers — `#engines` alias means a footer “Engines” link can remain. Update label list to match nav if desired. |

---

#### Anchor preservation map

| Anchor | Today | After rewrite | How preserved |
|---|---|---|---|
| `#top` | `<span id="top">` | Keep | Unchanged |
| `#how` | Lifecycle section | **5-step How it works section** | `id="how"` on that `<section>` |
| `#loop` | Agentic Loop section (removed) | **Alias** | Inner wrapper inside `#how`, e.g. `<section id="how">` … `<div class="wrap" id="loop">` … (satisfies `proof/index.html` → `../#loop`) |
| `#engines` | Engines grid (removed) | **Alias** | `id="engines"` on the engine-tag cluster / step grid under How it works (satisfies `proof/` → `../#engines`). **No** link to `/docs/` |
| `#showcase` | Walkthrough section | Keep | Unchanged section |
| `#live-run` | Inside showcase | Keep | Unchanged |
| `#proof` | Proof section | Keep | Same section id; layout becomes single-column |
| `#evidence` | Measured, and Not | Keep | Unchanged |
| `#pillars` | Pillars (removed) | **Gone** | No off-site links found; homepage-only — safe to drop |

**Off-page dependents (do not edit those pages):**

- `proof/index.html` → `../#how`, `../#loop`, `../#showcase`, `../#proof`, `../#engines`, `../#evidence`
- `docs/index.html` → `../#how`, `../#proof`

---

#### CTA / attribution plan

| Location | `data-source` | `data-lead` | Notes |
|---|---|---|---|
| Nav Book a demo | `home-nav` | `demo` | Wrap current hard-coded button |
| Hero primary | `home-hero` | `demo` | No path tabs |
| Final band primary | `home-footer-band` | `demo` | No path tabs; no partner tab (partner is static callout) |
| Showcase “Book a live sandbox demo” | existing in section | keep as today | Section unchanged |

Secondary walkthrough links are plain `#showcase` anchors (not Tally). Email is plain contact, not a lead CTA.

---

#### CSS / assets touches

- `assets/styles.css`: `.proof-grid { grid-template-columns: 1fr; }` (or modifier). Optional `.steps` adjustment for five cards.
- `assets/cta.js`, `assets/site.js`: **no logic change** expected if markup contract followed.
- Fonts/colors: unchanged (`#10b981`, `#0B1220`, Inter/Sora/JetBrains Mono).

---

#### Suggested implementer checklist order

1. Show this plan; get owner approve.  
2. Update head metadata.  
3. Rewrite nav + hero (one JSON card + caption).  
4. Add No lock-in; rewrite How it works (5 steps + `#how`/`#loop`/`#engines`); rewrite Guardrails; delete Loop/Pillars/Engines sections.  
5. Leave `#showcase` untouched.  
6. Edit `#proof` (drop JSON, single column, sandbox line); leave `#evidence` + cross-sell.  
7. Rewrite final CTA + footer link tidy.  
8. Acceptance pass at desktop + ~380px; click every anchor from `/proof/` mentally/`file` check; confirm one JSON card; confirm `cta.js` sources.

**Bottom line:** Brief v3 passes final verify against the repo. Implementation is a homepage-only restructure with two alias ids and a small CSS tweak — ready when the owner says go.
