[PLANS]
- 2026-07-30T00:00Z [USER] Replace the hero LU SVG with a touching-circle negative-space canvas mesh.

[DECISIONS]
- 2026-07-30T00:00Z [CODE] Keep the change in index.html, styles.css, and script.js; the existing static page has no build step.
- 2026-07-30T00:00Z [CODE] Use one Path2D with even-odd fill for the mesh and retain the current poster chrome.

[PROGRESS]
- 2026-07-30T00:00Z [CODE] Replaced the static SVG landmark with a framework-free canvas implementation and pointer brush.

[DISCOVERIES]
- 2026-07-30T00:00Z [CODE] The checkout has no package manifest or local build tooling; browser regression coverage is in tests/browser_launchpad.py.
- 2026-07-31T18:20Z [TOOL] `origin/feat/pink-print-launchpad` is fully merged into `master`, but this checkout cannot lock `.git/refs/remotes` because `.git` is read-only; cleanup remains pending.

[OUTCOMES]
- 2026-07-30T00:00Z [TOOL] `node --check script.js`, `python3 -m py_compile tests/browser_launchpad.py`, and `git diff --check` pass; the browser regression test is blocked because Python Playwright is not installed.
- 2026-07-31T18:20Z [TOOL] Branch cleanup inspected local and remote-tracking refs; only `master` is local, and the sole stale tracking ref is the merged `origin/feat/pink-print-launchpad`. The live GitHub remote was unreachable and local ref deletion was blocked by the read-only `.git` mount.
- 2026-07-31T18:22Z [TOOL] Deleted `feat/pink-print-launchpad` from the GitHub remote and confirmed `git ls-remote --heads origin feat/pink-print-launchpad` returns no ref.
- 2026-07-30T00:00Z [USER] All animated canvas palettes are restricted to the existing Luinbytes brand colours.
- 2026-07-30T00:00Z [USER] LU readability needs the mesh treatment inverted; the field is now dark with bright brand-colour circles and a dark negative-space glyph.
