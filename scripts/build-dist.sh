#!/usr/bin/env bash
# Assemble the deployable site into dist/.
#
# WHY THIS EXISTS
#
# This repo has no build step, so Cloudflare Pages publishes the repository root
# and every tracked file goes live at certusqa.com. That was already known here —
# `.gitignore` keeps `.cursor/`, `CLAUDE.md`, `docs/AUDIT-*.md` and `*.draft.html`
# out of git precisely because being committed means being published, and
# `_redirects` carries a dotfile guard for `.cursor/*`, `.git/*` and `.env`.
#
# Both are opt-OUT: they name what must not ship. Four tracked files were never
# named by either, and all four were confirmed serving 200 on 2026-08-11:
#
#   /README.md                          repo furniture, incl. the tree layout
#   /.gitignore                         not covered by the _redirects dotfile guard
#   /.github/workflows/leak-gate.yml    the leak gate's own rules, i.e. how to evade it
#   /showcase/live-ae/README.md         internal index of the showcase folder
#
# This makes the deploy opt-IN. A file added to the repo tomorrow is not published
# unless it is named below. The `_redirects` guard stays — it defends edge caches
# and any deployment built before this script existed, which this cannot reach.
#
# The sibling of this script is `certusqa-app/scripts/build-dist.sh`. Same idea,
# different allowlist. That one must not copy `functions/`; this repo has none, so
# there is no Functions risk here and no equivalent trap.
#
# USAGE
#
#   bash scripts/build-dist.sh          # writes ./dist
#   DIST=/tmp/x bash scripts/build-dist.sh
#
# Cloudflare Pages: set Build command to `bash scripts/build-dist.sh` and Build
# output directory to `dist`. Pages reads `_headers` and `_redirects` from the
# OUTPUT directory, which is why both are in the file list below — dropping either
# silently removes the CSP or the dotfile guard while every page still renders.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="${DIST:-$ROOT/dist}"

# ---------------------------------------------------------------------------
# The allowlist. Adding a file to the repo does NOT publish it; adding it here
# does. Keep this list boring and explicit.
# ---------------------------------------------------------------------------
DIRS=(assets contract showcase proof)
FILES=(
  index.html deployshield.html privacy.html terms.html 404.html
  _headers _redirects robots.txt sitemap.xml
)

# Repo furniture that lives INSIDE an allow-listed directory. Everything else
# under showcase/live-ae/ is linked from index.html or player.html and is a
# deliberate public proof artifact — exec-narrative.md and triage-report.json in
# particular are anchors on the live site, so they must ship.
PRUNE=(showcase/live-ae/README.md)

# Belt and braces. The allowlist above should already make these impossible, so a
# hit here means the allowlist is wrong, not that this check is doing the work.
FORBIDDEN=(
  '.github' '.cursor' '.claude' 'docs' 'scripts'
  'README.md' 'CLAUDE.md' '.gitignore' '.env'
  'showcase/live-ae/README.md'
)

say() { printf '  %s\n' "$*"; }

echo "build-dist: assembling $DIST"

# Refuse to build from a tree missing something the site needs. A half-built dist
# that deploys is worse than a failed build that does not. The legal pages are
# here for the same reason the leak gate checks them: a 404 on /privacy is a
# compliance regression, not a broken link.
missing=0
for d in "${DIRS[@]}"; do
  [[ -d "$ROOT/$d" ]] || { echo "build-dist: MISSING directory $d" >&2; missing=1; }
done
for f in "${FILES[@]}"; do
  [[ -f "$ROOT/$f" ]] || { echo "build-dist: MISSING file $f" >&2; missing=1; }
done
if [[ "$missing" -ne 0 ]]; then
  echo "build-dist: refusing to build an incomplete site" >&2
  exit 1
fi

rm -rf "$DIST"
mkdir -p "$DIST"

for d in "${DIRS[@]}"; do
  cp -R "$ROOT/$d" "$DIST/$d"
  say "dir   $d/  ($(find "$DIST/$d" -type f | wc -l | tr -d ' ') file(s))"
done
for f in "${FILES[@]}"; do
  cp "$ROOT/$f" "$DIST/$f"
  say "file  $f"
done

for p in "${PRUNE[@]}"; do
  if [[ -e "$DIST/$p" ]]; then
    rm -f "$DIST/$p"
    say "prune $p"
  fi
done

# Dotfiles are copied by `cp -R` from the working tree, so a local `.DS_Store`
# inside assets/ would ship. Cloudflare builds from a clean checkout and would
# never see one, which is exactly why this must not be left to the CI run to
# catch. Pruned rather than fatal — but logged, so it is never silent.
while IFS= read -r dot; do
  rm -rf "$dot"
  say "prune dotfile ${dot#"$DIST/"}"
done < <(find "$DIST" -name '.*' -not -name '.' -not -path "$DIST" 2>/dev/null)

# Containment assertion, same idiom as the ops console's build-dist.sh: the copy
# and prune above should make this unreachable, so if it fires the list is wrong.
leaked=0
for bad in "${FORBIDDEN[@]}"; do
  if [[ -e "$DIST/$bad" ]]; then
    echo "build-dist: LEAKED into dist: $bad" >&2
    leaked=1
  fi
done
while IFS= read -r dot; do
  echo "build-dist: LEAKED dotfile into dist: ${dot#"$DIST/"}" >&2
  leaked=1
done < <(find "$DIST" -name '.*' -not -name '.' -not -path "$DIST" 2>/dev/null)

if [[ "$leaked" -ne 0 ]]; then
  echo "build-dist: refusing to publish — see leaks above" >&2
  exit 1
fi

echo "build-dist: $(find "$DIST" -type f | wc -l | tr -d ' ') file(s), no forbidden paths"
