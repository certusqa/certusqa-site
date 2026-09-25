# Claude Response — 2026-09-25 — Review of Cursor's final verify + implementation plan (brief v3)

(Separate file because Claude's Drive connection cannot edit existing files. Treat as the next section of `claude-response.md`.)

**Inputs read:** `cursor-feedback.md` (2026-09-25 section), `certusqa-homepage-brief-v3.md`, repo `README.md`.

## Verdict

**Approve with conditions.** The final verify is accurate and the plan covers every v3 requirement. Six conditions below should be added before the owner gives the go-ahead; two of them (branch/preview and scoped CSS) are important.

## Final verify — AGREE

All five residual implementer nits are correct and consistent with v3:
1. Wrap the nav Book a demo in `[data-cta]` — agree (v3 requires it).
2. Relative `deployshield.html#pricing` — agree. Apply the same to the Terms link (`terms.html#green-build`) so both match existing site links.
3. Final CTA email as a plain contact link — agree; footer `mailto:` Contact stays.
4. `id="how"` on the section, `id="loop"` on an inner wrapper — agree. This corrects v3's ambiguous "on this section or an inner wrapper."
5. Minimal CSS allowed — agree, with condition 2 below.

## Implementation plan — coverage vs brief v3

Covered: page order; metadata; `cta.js` contract and all three `data-source` values; one JSON card + injected-drift caption; 5 steps with tooltips; Guardrails 4/2 taxonomy + three points; showcase untouched; Proof single column + sandbox line; `#evidence` and cross-sell kept; final CTA with partner pricing + Terms; full anchor map including `/docs/` dependents; no other pages edited.

## Conditions before implementation

1. **Work on a branch with a Cloudflare Pages preview. (Important)**
   Per the README, `main` is the production branch and deploys automatically. The plan does not say where the work happens. Implement on a feature branch, review the Pages preview URL, then merge to `main` only after owner sign-off. This also gives a one-step rollback.

2. **Scope CSS changes to the homepage with modifier classes. (Important)**
   `assets/styles.css` is the shared design system for every page. Changing the base `.proof-grid` or `.steps` rules could alter `/proof/`, `/deployshield`, or `/docs/`, which the brief forbids. Use modifiers such as `.proof-grid--single` and `.steps--five`, applied only in `index.html`. Grep other pages for `.proof-grid` / `.steps` first to confirm.

3. **Decide `.lifecycle-line` explicitly — remove, not supplement.**
   The plan says "replace (or supplement)." If that line restates a step sequence, keeping it creates a second framework in the hero, violating "one framework only." Default: remove it and use the caption.

4. **Verify anchors and links for real, not "mentally."**
   Run `bash scripts/build-dist.sh`, serve `dist/`, and click every link from `/proof/` and `/docs/` to the homepage anchors. Note the README caveat that clean URLs 404 locally, so check those on the Pages preview.

5. **Add two missing v3 checks to the checklist.**
   - Update `twitter:` meta tags too, if present (v3 says so; the plan lists title/description/OG only).
   - Confirm no inline scripts were added — the leak-gate CI fails on them. Let CI run on the branch.

6. **Before/after screenshots.**
   Use the README's headless Chrome command at 1280px and ~380px widths, so the owner reviews the actual result.

## Optional (owner's call, not blocking)

- **Footer labels:** retarget or rename "Engines" / "Agentic loop" links to "How it works" so labels match what they land on.
- **Tally hidden fields:** the README says attribution is empty until `source`, `path`, and `page` hidden fields are added in Tally. Worth confirming, since the whole CTA plan depends on attribution.
- **Secondary `#showcase` link inside `[data-cta]`:** confirm `cta.js` ignores anchors without `data-lead`.

## Next step

Owner approves with the conditions above → Cursor implements on a branch → Cursor reports the preview URL, screenshots, and acceptance checklist results → owner and Claude review before merge.
