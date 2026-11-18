# CertusQA Homepage Redesign — Cursor Review

**Date:** 2026-09-23  
**Scope:** Review only (no implementation). Compared `certusqa-homepage-brief.md` (copy source of truth) and the mockup against current `index.html`, `assets/`, `/docs/`, `/proof/`, showcase evidence, and DeployShield.

**Note:** `/redesign-review/` was not present in the repo at review time. This review was based on the brief/mockup content provided in the request, plus the live product/marketing code in the repo.

Treat `certusqa-homepage-brief.md` as the source of truth for copy. Prefer the brief over the mockup where they diverge.

---

## 1. Where the proposal is weaker than today

- **The security/trust band is the biggest loss.** Today’s “It fixes the test, never the verdict” + repair taxonomy (4 heal / 2 report-only) + “static check on the proposed diff… AST scan” is the clearest differentiator. The brief collapses that into a one-line chip strip. Prospects who care about false greens lose the mechanism.
- **Design-partner path gets vaguer.** Current hero states `$3,540/mo` for 3 months → `$7,200/mo`, locked 12 months, Terms link. The brief replaces that with “partner pricing” plus an owner TODO. Shipping that is weaker and riskier than what’s live.
- **Sandbox path disappears.** “Try the sandbox now” is not an orphan label — it’s a `cta.js` tab that fetches `triage-report.json` and offers download + live player. Removing it loses the zero-commitment proof path.
- **Authoring is under-explained.** Current Agentic Loop (Ticket → Plan → Generate → Heal → Gate) answers “do you write tests?” The new model folds Ticket-to-Gate under Predict as a tag. For a product that leads with “No existing tests needed,” that’s a structural hole (the review package already flags this).
- **Hero honesty regresses.** Trust line drops “Gate starts in report-only” and “Verify every number yourself.” The JSON card also loses the caption that Rs. 500 → Rs. 250 was **injected on purpose** — without that, the hero looks like a production catch.
- **Brief vs mockup diverge on Proof.** Brief keeps “Proof, Not Promises” *and* “Measured, and Not.” The mockup text collapses to Measured/Not only and drops Proof Artifact explanation + the four evidence bullets. Follow the brief here; the mockup is weaker.
- **Engine tags without definitions** keep jargon (Ticket-to-Gate, Sprint Trend) without the current one-line explanations — half-clarity for first-time visitors.

**What the redesign does better:** one primary CTA, one framework, no-lock-in earlier, shorter page, headline that states the differentiator.

---

## 2. Technically inaccurate (or overstated) claims

| Claim | Issue |
|---|---|
| **“never hide a real bug”** (H1) | Absolute. Evidence is **7/7 genuine bugs on 37 hand-labelled sandbox failures**, with an explicit “no production deployment.” Headline overclaims what `/proof/` supports. |
| **“ends in a single call: SHIP or BLOCK”** | Product/docs gate has **four** verdicts: `CLEAR_TO_DEPLOY`, `REVIEW_ARTIFACTS`, `BLOCK_DEPLOY`, `INSUFFICIENT_EVIDENCE`. There is no `SHIP` string. Binary framing is wrong. |
| **Ticket-to-Gate under Predict** | Ticket-to-Gate is **authoring** (ticket → runnable spec), not risk-ranked selection. Mis-tags the engine. |
| **Execution Judge under Hunt** | On the current engines map, Execution Judge sits under **Governance (09)**, not Bug Hunter. |
| **Sprint Trend under Gate** | Sprint Trend is advisory debt/escalation across runs, not the deploy verdict itself. |
| **Heal: “reordered flows… repaired in the spec”** | Showcase/current copy support locator/flow/copy/timing heals, **mid-run**, then selector-bank promotion — not free-form flow reordering. “In the spec” alone understates mid-run heal. |
| **“Code never leaves your infra”** | Docs: optional `api-key` uploads `gate.json` + Proof Artifacts to the platform. Absolute “never” is false on that path (current site says the same). |
| **“Nothing to install”** | True for the **demo / DeployShield managed** path. False for the public Gate Action (`certusqa/gate-action@v1`), which docs present as the install path. |

**Accurate enough to keep:** max two heal attempts; report-only default; regressions/fixtures not patched; Regression Memory; standard Playwright in-repo; `BLOCK_DEPLOY` in the sample JSON.

---

## 3. Implementation risks

- **Mockup is not a faithful style guide.** Brief says keep Inter/Sora/JetBrains + existing classes/`#0B1220` navy sections. Review package suggests Schibsted + IBM Plex. Body is **white**, not full-page dark — “keep the dark theme” can mislead an implementer into restyling the site.
- **Anchors break off-page.** Removing `#loop` / `#engines` breaks `proof/index.html` nav (`../#loop`, `../#engines`) and homepage footer links. Keep `#how`, `#showcase`, `#proof` (and preferably `#evidence`) or update those pages (brief says don’t change other pages — so leave hidden alias ids or don’t delete those ids).
- **`#showcase` must stay whole.** Brief: keep existing section **as is** (45s iframe **and** `#live-run` captioned player). Mockup shows one empty frame — high risk of dropping the live storefront embed.
- **CTA / attribution.** `assets/cta.js` expects `[data-cta]`, path tabs, `data-lead`. Hardcoding Tally URLs as in the brief drops the `page` param cta.js adds. Prefer keeping `data-lead` + `data-source` even with a simpler layout.
- **Proof layout.** `#proof` is a 2-col `.proof-grid` with the second JSON card. Removing the card needs a single-column layout change so you don’t leave an empty column.
- **Copyright “bug”.** Footer already uses `<span id="year">` + `site.js`. Blank year was likely a no-JS crawl. Don’t replace with a hardcoded year that drifts; keep the script.
- **“Orphan” labels.** Those are intentional tab buttons — don’t treat their removal as fixing broken UI; you’re removing conversion paths.
- **Mobile ~380px.** New H1 is long at `.hero h1` 52px; acceptance wants H1 + primary CTA above the fold. Stack order (copy → CTAs → card) is fine if the proof card stays second in the DOM.
- **Half-length target vs showcase.** Two iframes alone keep substantial scroll height; cutting engines/pillars/loop helps copy length more than viewport length.
- **Unresolved TODOs.** Partner pricing and email must not ship as placeholders. Email is already `hello@certusqa.com` on the current CTA/footer.

---

## 4. Change before shipping (priority order)

1. **Resolve or remove partner-pricing language** — use the real `$3,540 / $7,200` terms from DeployShield, or drop “partner pricing” until confirmed.
2. **Soften the H1 absolute** — e.g. qualify with sandbox/evidence, or keep the differentiator without “never hide.”
3. **Fix verdict language** — say clear-to-deploy / block (or name all four), not “SHIP or BLOCK.”
4. **Preserve the repair/guardrail substance** — keep the 4-heal / 2-report taxonomy and “fixes the test, never the verdict” (even if shorter); don’t leave only emoji chips.
5. **Fix engine taxonomy** — Ticket-to-Gate out of Predict; either add a Write/Author step or state clearly that CertusQA authors the suite before the loop.
6. **Caption the hero JSON** — one line that the pricing drift was injected; detection/heals/verdict are real.
7. **Treat brief over mockup** — existing fonts/CSS; keep Proof + Measured sections; keep full `#showcase` (both embeds).
8. **Anchor compatibility** — keep or alias `#loop`/`#engines`, or accept broken links from `/proof/` (brief forbids editing other pages).
9. **Wire contact + CTAs correctly** — `hello@certusqa.com`; keep `cta.js` attribution (`source`/`path`/`page`).
10. **Restore a lightweight sandbox proof path** — download link and/or link to `/showcase/live-ae/player` near Proof, so removing hero tabs doesn’t kill self-serve evidence.
11. **Mobile pass at ~380px** — confirm H1 + primary button visible without scroll; trim trust-line wrapping.
12. **Don’t invent a copyright fix** — keep `#year` + `site.js`.

---

## Bottom line

The structure and CTA simplification are directionally right. Don’t ship until partner pricing is real, the H1/verdict language match the product, and the guardrail + honesty content isn’t reduced to chips and an unexplained JSON card.

---

## Handy references for implementers

- Contact email already on site: `hello@certusqa.com`
- Design partner terms on DeployShield: `$3,540/mo` for first 3 months, then `$7,200/mo`, rate locked 12 months
- Gate verdicts (docs): `CLEAR_TO_DEPLOY` · `REVIEW_ARTIFACTS` · `BLOCK_DEPLOY` · `INSUFFICIENT_EVIDENCE`
- CTA attribution: `assets/cta.js` appends `source`, `path`, `page` to `https://tally.so/r/MePK9X`
- Showcase must keep: `showcase/?embed=1` and `showcase/live-ae/player`
- Footer year: `<span id="year"></span>` + `assets/site.js`
