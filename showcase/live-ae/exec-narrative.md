# CertusQA Showcase — Executive Voiceover Script

Target: [Automation Exercise](https://automationexercise.com/) (public practice site).
Gate decision: **BLOCK_DEPLOY**

| Timestamp & Step | What the Platform Did | SaaS Executive Value |
| --- | --- | --- |
| 0:08 — Intro: Nine engines | Opened the closed-loop demo on a public practice storefront with on-screen voiceover cards for every engine. | Buyers can follow the story without reading code. |
| 0:13 — Engine 01: Impact | Ranked the cart/checkout PR and selected 1 must-run spec(s); skipped marketing footer. | Runs only high-blast-radius tests per change set. |
| 0:18 — Engine 02: Regression Memory | Matched 1 prior fingerprint(s); kept the guard spec in the run set. | Stops the same pricing defect from shipping twice. |
| 0:21 — Journey: Sign-up | Completed account creation with ephemeral fake credentials. | Covers real SaaS onboarding paths. |
| 0:33 — Engine 03: Self-Healing (search) | Healed stale #submit-search-legacy-v1 via css-current-submit. | Cuts locator maintenance; keeps pipelines green on UI renames. |
| 0:43 — Engine 03: Self-Healing (Add to cart) | Healed #add-to-cart-btn-legacy via text-fallback; 3rd attempt blocked by guardrails. | Self-heal is capped — no silent infinite retries, no false greens. |
| 0:54 — Engine 04: Bug Hunter | Confirmed pricing regression expected Rs. 500 vs observed Rs. 250. | Catches revenue-breaking math bugs with exact asserts. |
| 0:59 — Engine 05: Proof Artifacts | Generated 3 Proof Artifacts (schema 1.0.0) including heals and the pricing defect. | Every finding ships as actionable evidence. |
| 1:04 — Engine 06: Quality Gate | Aggregated gate=BLOCK_DEPLOY from Proof Artifacts. | One proof-backed deploy verdict. |
| 1:09 — Engine 07: Ticket-to-Gate | Closed loop mirrors ticket → runnable spec → heal → gate (proven offline by demo:ticket-to-gate). | A ticket becomes a ship/block call with evidence attached. |
| 1:14 — Engine 08: Sprint Trend | Flagged chronic-heal pattern as advisory escalation (inventory suggestion, not auto-commit). | Makes deferred locator debt visible across sprints. |
| 1:20 — Engine 09: Governance | Enforced max-2 heal budget and deny-by-default scope policy; assertion softening banned. | Trust & governance is mechanism, not marketing copy. |
| 1:26 — Outro | Closed loop finished with gate=BLOCK_DEPLOY. | Certainty, verified. |

## Recording notes

- Master capture: `demo-recordings/certusqa-showcase.webm` (1280×720).
- Evidence: `demo-recordings/triage-report.json` (Proof Artifact schema 1.0.0 payloads).
- Price defect in this run is an intentional client-side injection to prove Bug Hunter + Quality Gate — the live site is not asserted broken.
