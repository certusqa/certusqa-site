# Homepage v3 — selective implement checklist

Check = **implement the proposed change**. Unchecked = **keep existing**.

Open the interactive version (checkboxes + export): [`comparison-checklist.html`](comparison-checklist.html)

| Do? | # | Existing (live) | Proposed (brief v3) |
| :---: | --- | --- | --- |
| [x] | **H1** | H1: “Tests That Evolve… Reveal Your Bugs.” | H1: “Self-healing E2E tests that report real bugs instead of rewriting them.” |
| [x] | **H2** | Eyebrow: Standalone Agentic GenAI QA Platform | Eyebrow: Agentic QA for SaaS teams |
| [x] | **H3** | Subhead includes lock-in + heavy bold | Shorter subhead; lock-in moves out |
| [x] | **H4** | Three CTA tabs (demo / sandbox / partner) | One demo CTA + walkthrough link |
| [x] | **H5** | JSON card “Predict · Heal · Hunt · Gate” line | Remove line; injected-drift caption |
| [x] | **H6** | Trust line (current wording) | Trust line with report-only + verify |
| [x] | **H7** | Old title / OG / twitter meta | Meta matches new H1 |
| [x] | **S1** | Lock-in only in hero subhead | New “If you fire us…” section |
| [x] | **S2** | Agentic Loop + Four Pillars sections | Remove both |
| [x] | **S3** | 4-step How it works | 5-step Write→Predict→Heal→Hunt→Gate |
| [x] | **S4** | Nine Engines grid section | Tags under steps; `#engines` alias; no /docs/ engines link |
| [x] | **S5** | Guarantee band (incl. “never leaves infra”) | Guardrails rewrite (no absolute residency claim) |
| [ ] | **S6** | Showcase (both embeds) | Keep as is |
| [x] | **S7** | Second JSON card in Proof | One JSON (hero only) + sandbox links in Proof |
| [ ] | **S8** | Measured, and Not | Keep as is |
| [ ] | **S9** | DeployShield teaser | Keep as is |
| [x] | **S10** | Final CTA tabs + mailto button | One demo CTA + plain email + partner box |
| [x] | **N1** | Long nav (incl. Agentic loop, Engines) | Shorter nav + Walkthrough |
| [x] | **N2** | Nav demo hard-coded Tally params | `cta.js` `data-cta` / `home-nav` |
| [x] | **N3** | `#loop` / `#engines` own sections | Alias ids under How it works |
| [x] | **N4** | Absolute `/deployshield` / `/terms` in places | Relative `deployshield.html#pricing`, `terms.html#green-build` |
| [ ] | **N5** | Footer “Engines” label | Optional: rename to “How it works” |
| [x] | **N6** | Would edit base `.proof-grid` / `.steps` | Scoped modifiers only |

## After you choose

Edit the `[x]` / `[ ]` above (or use the HTML page → **Export my choices**), then send Cursor:

> Implement only the checked items from `redesign-review/comparison-checklist.md`. Leave unchecked items as on the live site. Stay on `cursor/homepage-rewrite-v3-bf1e`. Do not merge.
