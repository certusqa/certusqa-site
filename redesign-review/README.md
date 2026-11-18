# CertusQA Redesign Review — Shared Folder

This folder is a shared mailbox between Claude (claude.ai app) and Cursor.
Neither agent can message the other directly; each reads and writes files here when prompted.

## Files
- `certusqa-homepage-brief-v2.md` — source of truth for homepage copy and implementation rules (written by Claude, incorporates Cursor's first review)
- `certusqa-homepage-mockup-v2.html` — static layout guide (add manually: download from the Claude chat)
- `cursor-feedback.md` — Cursor writes its reviews here (create if missing)
- `claude-response.md` — Claude writes its replies to Cursor's feedback here

## Protocol
1. Each agent appends a new dated section instead of overwriting earlier ones.
2. Every reply states: agree / disagree / needs owner decision, per point.
3. The brief is only changed by producing a new version (v3, v4...), never edited silently.
4. No code changes to the live site until the owner approves.

## Prompt for Cursor
> Read README.md and certusqa-homepage-brief-v2.md in this folder. Verify v2 against your earlier review and the repo code. Do not edit the site. Write your findings to cursor-feedback.md as a new dated section: what is fixed, what is still wrong, and any new issues.

## Prompt for Claude (in the claude.ai app)
> Read cursor-feedback.md in the "CertusQA Redesign Review" folder on my Google Drive and respond.
