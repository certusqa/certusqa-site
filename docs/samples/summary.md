## 🔴 CertusQA Gate: `BLOCK_DEPLOY`

Mode **report-only** (recorded, not enforced) · report parsed · `test-results/results.json`

| Passed | Failed | Flaky | Skipped | Total |
|---:|---:|---:|---:|---:|
| 2 | 1 | 1 | 1 | 5 |

**Configured, not run:** firefox — this verdict covers chromium only.

**Skipped (1):**

- checkout › applies a coupon — the coupon service is not deployed to this environment

| Proof Artifact | Test | Attempts | Error |
|---|---|---|---|
| `pa_unjudged_f12e8e14` | checkout › shows the order total (`checkout.spec.js:17`) | failed → failed | Error: expect(locator).toHaveText(expected) failed Locator: getByTestId('order-total') Expected: "$499" |
| `pa_flaky_6d6d3a7f` | checkout › greets a returning customer (`checkout.spec.js:23`) | failed → passed | Error: expect(locator).toBeVisible() failed Locator: getByText('Welcome back', { exact: true }) Expected: visible |

9 failure media file(s) under `test-results`, referenced by a failed or flaky test.

Evidence: `certusqa-gate/gate.json`, `proof/*.json`. Classification of each failure as regression, flake or test defect is the CertusQA judge's job, not this action's.
