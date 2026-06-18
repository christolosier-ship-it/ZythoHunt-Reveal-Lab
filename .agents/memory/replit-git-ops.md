---
name: Replit git write operation constraints
description: git add/commit/write ops blocked in main agent; workarounds for commits and branch pushes.
---

## Rule
All git write operations (git add, git commit, git push --force, etc.) are blocked in the main agent by the Replit sandbox. The error message references a tmp_obj file path.

**Why:** Replit protects the git object store from direct agent writes. Version control is managed automatically.

## How to apply
- Let the system auto-commit handle staged changes — it runs "at the end of every task" (equivalent to git add -A && git commit).
- For explicit branch pushes (e.g., lab/carousel → origin/lab/carousel), use the `project_tasks` skill to create a background task that runs in an isolated environment AFTER the auto-commit has captured the main agent's changes.
- Read-only git commands are fine: `git --no-optional-locks status`, `git --no-optional-locks log`, `git --no-optional-locks diff`.
