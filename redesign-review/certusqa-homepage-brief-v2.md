# CertusQA Homepage Rewrite — Implementation Brief v2

**Supersedes v1.** Incorporates the Cursor code review of 2026-09-23. Where this brief and the mockup differ, **this brief wins**.

Hand this file to Claude Code or Cursor from the root of the certusqa.com repo.

---

## Instructions for the Implementer

Restructure the homepage (`index.html`) using the copy and page order below.

**Keep (do not change)**
- Existing fonts (Inter, Sora, JetBrains Mono), CSS classes, colors, and the current white-page / navy-section styling. The mockup is a layout guide, not a style guide.
- `assets/cta.js` attribution. CTAs use `data-cta` / `data-lead` / `data-source` so `source`, `path`, and `page` still reach Tally. Do not hard-code Tally URLs.
- Footer year: `<span id="year"></span>` + `assets/site.js`. Do not hard-code a year.
- The whole `#showcase` section, both embeds: `showcase/?embed=1` and `showcase/live-ae/player` (`#live-run`).
- Anchor IDs used by other pages: `#how`, `#showcase`, `#proof`, `#evidence`, plus `#loop` and `#engines` (as aliases if their sections are removed). `proof/index.html` links to `../#loop` and `../#engines`.
- Contact email: `hello@certusqa.com`.

**Do not change other pages** (`/docs/`, `deployshield.html`, `/proof/`, `/terms`, `/privacy`, `/showcase/`).

**Before editing:** show a plan listing which sections are removed, merged, or moved, and how each anchor is preserved.

**Target:** the message lands faster. Copy length drops substantially; overall scroll height will stay significant because of the showcase embeds, and that is fine.

---

## Page Order

1. Hero
2. No lock-in
3. How it works (5 steps)
4. Guardrails: "It fixes the test, never the verdict"
5. Walkthrough (existing `#showcase`, unchanged)
6. Proof (Proof, Not Promises + Measured, and Not + sandbox path)
7. DeployShield teaser (existing)
8. Final call to action
9. Footer (existing)

---

## 1. Hero

**Eyebrow:** Agentic QA for SaaS teams

**H1:** Self-healing E2E tests that report real bugs instead of rewriting them.

*Why changed from v1:* "never hide a real bug" is an absolute the evidence (7/7 on 37 sandbox failures, no production deployment) does not support.

**Subhead:** We write your Playwright suite, run it on every deploy, and repair it when your UI changes. A real regression is reported, never rewritten. No existing tests required.

**Primary CTA:** Book a 30-min demo on your staging URL (`data-cta`, `path=demo`, `source=home-hero`)

**Secondary link:** Watch the 45-second walkthrough → `#showcase`

**Trust line:** No existing tests needed · Specs live in your repo · Gate starts in report-only · Verify every number yourself

**Visual:** the `triage-report.json` card (`DEFECT_CONFIRMED`, `BLOCK_DEPLOY`), with this caption directly under it:
> Sandbox run. The Rs. 500 → Rs. 250 price drift was injected on purpose; the detection, heals, and verdict are unscripted.

**Moved out of hero:** the "See it catch a bug / Try the sandbox now / Design partner spot" tabs. These are working `cta.js` tabs, not broken labels. The sandbox path moves to the Proof section (section 6); the design partner offer moves to the final CTA (section 8).

---

## 2. No Lock-In

**Heading:** If you fire us, your suite still runs.

**Body:** Everything we write is standard Playwright, committed to your repo. No proprietary format. Leave anytime and keep every test.

**Three points**
- **Standard Playwright specs:** your engineers can read, edit, and run them without us.
- **Lives in your repo:** version-controlled and reviewed like the rest of your code.
- **Runs on your own runner:** read-only until you say otherwise.

*Removed from v1:* "offline" and "nothing to install" as absolutes (see Accuracy rules below).

---

## 3. How It Works (5 steps)

Section `id="how"`; also carry `id="loop"` on this section or an inner wrapper.

**Heading:** From ticket to deploy verdict.

**Subheading:** Every run follows the same loop and ends in one deploy verdict, with evidence attached.

**01 · Write**
- **We author the suite. You don't need existing tests.**
- A ticket or flow goes in; a runnable Playwright spec comes out, committed to your repo.
- Tag: Ticket-to-Gate

**02 · Predict**
- **Run only what your change can break.**
- Each PR is risk-ranked and only the affected flows run. Past regressions are always pulled back in, so a fixed bug can't ship twice.
- Tags: Impact · Regression Memory

**03 · Heal**
- **UI changed? The test adapts mid-run.**
- Drifted locators, moved flows, changed copy, and timing races are repaired during the run and remembered for the next one. Two attempts maximum, then a person decides.
- Tag: Self-Healing

**04 · Hunt**
- **Know a flaky test from a real bug.**
- Real behavioral regressions are separated from flaky noise and reported, never patched over.
- Tag: Bug Hunter

**05 · Gate**
- **One deploy verdict, with evidence attached.**
- Clear to deploy, review, block, or not enough evidence — each backed by a Proof Artifact with root cause and severity. Starts in report-only until you trust it.
- Tags: Quality Gate · Proof Artifacts

**Engine tags:** each tag gets a one-line tooltip or `title` using the current site's engine descriptions. Carry `id="engines"` on the tag area or keep a small "All nine engines" link to `/docs/` with that id.

*Not shown as a step tag:* Execution Judge (belongs to Governance, section 4) and Sprint Trend (advisory, across runs; mention in Docs).

---

## 4. Guardrails

**Heading:** It fixes the test, never the verdict.

**Intro:** The interesting part of a self-healing engine is where it stops.

**Two columns**
- **Repaired automatically:** drifted locators · moved flows · changed copy · timing races
- **Reported, never rewritten:** real regressions · broken fixtures

**Three points**
- **It can't force a test green.** No loosening an exact match, no downgrading a visibility check. Enforced by a static check on the proposed diff (deterministic rules plus an AST scan, no LLM calls), not a prompt instruction.
- **Every failure is judged, with reasoning shown.** The Execution Judge classifies each failure; you review only what it wasn't sure about. Guessed passes go to a human and never feed what the engine learns from.
- **Deny-by-default.** Every capability is off until you switch it on, and every action is audited.

---

## 5. Walkthrough

Keep the existing `#showcase` section exactly as is, both embeds and their links.

---

## 6. Proof

Keep `#proof` and `#evidence`. Keep the existing "Proof, Not Promises" copy and four evidence bullets, and the existing "Measured, and Not" section.

- **Remove** the second `triage-report.json` card (it now lives in the hero). Switch `.proof-grid` to a single column so no empty column remains.
- **Add a sandbox line** (replaces the removed hero tab):
  > Don't want a call? Download a real Proof Artifact (`triage-report.json`) or open the captioned live run (`/showcase/live-ae/player`).

---

## 7. DeployShield Teaser

Keep the existing block as is.

---

## 8. Final Call to Action

**Heading:** See it catch a real bug in 30 minutes.

**Body:** We run the full loop on your staging URL, or on our sandbox. You keep the report either way.

**Primary CTA:** Book your 30-min demo (`data-cta`, `path=demo`, `source=home-final`)

**Secondary:** Or email hello@certusqa.com

**Trust line:** No credit card · No production access · Nothing to install for the demo

**Design partner callout**
> **Design partner spots are open.** $3,540/mo for the first 3 months, then $7,200/mo, rate locked for 12 months. [Terms](/terms#green-build). In return, we build the production case study together.

*Owner check:* confirm these terms match `deployshield.html` on the day you ship.

---

## 9. Navigation and Footer

**Nav:** How it works · Proof · Docs · DeployShield · [Book a demo] (via `cta.js`)

**Footer:** keep as is, including `#year` + `site.js`. Update footer links that pointed to removed anchors, or rely on the aliases.

---

## Accuracy Rules (apply everywhere)

- **Verdicts:** the product has four — `CLEAR_TO_DEPLOY`, `REVIEW_ARTIFACTS`, `BLOCK_DEPLOY`, `INSUFFICIENT_EVIDENCE`. Never write "SHIP or BLOCK" or use `SHIP` as a verdict.
- **Data residency:** do not say "code never leaves your infra" as an absolute. With an optional API key, `gate.json` and Proof Artifacts upload to the platform. Safe phrasing: "Runs on your own runner. Read-only until you say otherwise."
- **Installation:** "nothing to install" is true for the demo and DeployShield managed path only. The public Gate Action (`certusqa/gate-action@v1`) is an install.
- **Evidence claims:** no absolutes beyond what `/proof/` supports (7/7 genuine bugs on 37 hand-labelled sandbox failures; no production deployment yet).
- **Injected drift:** any appearance of the Rs. 500 → Rs. 250 example must say the drift was injected on purpose.

---

## Acceptance Checklist

- [ ] H1 and primary CTA visible without scrolling at desktop and ~380px mobile
- [ ] One framework only (Write → Predict → Heal → Hunt → Gate)
- [ ] No "SHIP" verdict, no absolute data-residency or install claims
- [ ] `triage-report.json` card appears once, with the injected-drift caption
- [ ] Guardrails section keeps the 4-repaired / 2-reported taxonomy and the static-check explanation
- [ ] Sandbox download + live player links present in Proof
- [ ] Both showcase embeds intact
- [ ] All CTAs route through `cta.js` with correct `source` values
- [ ] `#how`, `#loop`, `#engines`, `#showcase`, `#proof`, `#evidence` all resolve; links from `/proof/` work
- [ ] Footer year still set by `site.js`
- [ ] Partner terms match `deployshield.html`
- [ ] Existing fonts and styles unchanged
