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
