## 🔴 CertusQA Gate: `BLOCK_DEPLOY`

Mode **report-only** (recorded, not enforced) · report parsed · `test-results/results.json`

| Passed | Failed | Flaky | Skipped | Total |
|---:|---:|---:|---:|---:|
| 1 | 1 | 1 | 1 | 4 |

| Proof Artifact | Test | Attempts | Error |
|---|---|---|---|
| `pa_unjudged_8f1b8b0e` | checkout › price regression (`sample.spec.js:5`) | failed → failed | Error: displayed price expect(received).toBe(expected) // Object.is equality Expected: "Rs. 500" |
| `pa_flaky_9c78f0f0` | checkout › flaky login (`sample.spec.js:6`) | failed → passed | Error: Timeout 30000ms exceeded waiting for locator(#login) |

2 failure media file(s) under `test-results`.

Evidence: `certusqa-gate/gate.json`, `proof/*.json`. Classification of each failure as regression, flake or test defect is the CertusQA judge's job, not this action's.
