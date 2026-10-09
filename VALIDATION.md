# Validation report

Date: 2026-10-09

## Passed

- Node.js 24.19.0; locked dependencies installed successfully
- Astro 7.3.8: `npm run check` — 0 errors, 0 warnings, 0 hints
- Root-path static build and DOM tests using `--base /` and `TEST_BASE=/`
- Selected release build: `site: https://nghichthien2026.github.io`, `base: /kien-thuc/`; two static pages generated
- DOM tests on release output: generated asset/link/anchor existence; page language/title structure; Vietnamese accent-insensitive search, no-match and reset states; simulation and replay; direction/gap/padding/reset controls; mobile menu open/Escape/backdrop logic
- Public-source review: bundle contains only project source, lockfile, tests, public assets and documentation; no credentials, personal email, environment files, dependency folders or unrelated artifacts
- Source archive integrity checked

## Not verified

Real-browser rendering, responsive overflow, Chromium click/focus behavior, screenshots and visual comparison. The prepared Playwright suite could not run because the execution environment prohibits Chromium sockets. The local preview server also exited before becoming ready. The cloud browser disallows local file URLs. No browser or visual QA pass is claimed.

DOM tests exercise logic only. Run the included browser suite and inspect desktop/mobile views before treating visual behavior as verified.

## Release configuration

GitHub Pages deployment is enabled in `.github/workflows/pages.yml`, triggered by pushes to `main` or manual dispatch. It builds and checks the selected `/kien-thuc/` output before publication. The public repository and Pages address are configured in the README. Successful local checks do not prove that files have been uploaded or that the remote deployment has succeeded; check the exact GitHub Actions run and live website separately.
