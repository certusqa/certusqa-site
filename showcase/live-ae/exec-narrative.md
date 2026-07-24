# CertusQA Showcase — Executive Voiceover Script

Target: [Automation Exercise](https://automationexercise.com/) (public practice site).
Gate decision: **BLOCK_DEPLOY**

| Timestamp & Step | What the Platform Did | SaaS Executive Value |
| --- | --- | --- |
| 0:00 — Engine 01: Impact-Risk-Ranked Selection | CertusQA ranked the simulated cart/checkout PR and selected 1 must-run spec(s) — skipping low-risk marketing chrome. | Runs only high-blast-radius tests per change set — fewer minutes in CI without blind spots on revenue paths. |
| 0:00 — Engine 02: Regression Memory (PRF) | CertusQA matched a prior pricing/cart fingerprint in the regression corpus and kept the guard spec in the run set. | Stops the same pricing defect from shipping twice — memory, not hope. |
| 0:05 — Journey: Sign-up | CertusQA exercised the full account-creation path with ephemeral fake credentials against the public practice host. | Proves the platform covers real SaaS onboarding — not just isolated unit checks. |
| 0:10 — Engine 03: Self-Healing (search) | CertusQA detected a stale search-submit selector, auto-repaired it without softening assertions, and continued. | Cuts locator maintenance toil and stops flaky UI renames from blocking the pipeline. |
| 0:19 — Engine 03: Self-Healing (Add to cart) | CertusQA healed a stale Add-to-cart selector via text fallback (attempt 2/2). Guardrails refuse a 3rd silent retry. | Self-heal is capped and never softens failing business asserts — maintenance down, false greens blocked. |
| 0:20 — Engine 03: Dynamic Cart Modal | CertusQA waited on the live cart confirmation modal, dismissed it via labeled action, and retained journey state into the cart. | Handles real SaaS overlays/modals without brittle sleep-and-pray scripts. |
| 0:21 — Engine 04: Bug Hunter | CertusQA compared unit×qty (Rs. 500) to the observed cart total (Rs. 250) and confirmed a functional pricing regression. | Catches revenue-breaking math bugs before customers do — exact expected vs observed, not soft contains. |
| 0:21 — Engines 05–07: Proof Artifacts → Ticket-to-Gate | CertusQA emitted Proof Artifacts (schema 1.0.0) for heals + defect and aggregated gate=BLOCK_DEPLOY for the deploy decision. | Executives get a ship/block call with root-cause evidence ready for Jira — not a wall of flaky stack traces. |

## Recording notes

- Video: [`certusqa-showcase.webm`](./certusqa-showcase.webm) (1280×720)
- Evidence: [`triage-report.json`](./triage-report.json)
- Pricing defect in this run is an intentional client-side injection to prove Bug Hunter + Quality Gate — the live site is not asserted broken.
