# Validation report

Date: 2026-10-10

## Passed

- Node.js 24.19.0; locked dependencies installed successfully
- Astro 7.3.8: `npm run check` — 0 errors, 0 warnings, 0 hints
- Root-path static build and DOM tests using `--base /` and `TEST_BASE=/`
- Selected release build: `site: https://nghichthien2026.github.io`, `base: /kien-thuc/`; three static pages generated
- DOM tests on release output: generated asset/link/anchor existence; page language/title structure; Vietnamese accent-insensitive search, no-match and reset states; simulation and replay; direction/gap/padding/reset controls; mobile menu open/Escape/backdrop logic
- Public-source review: bundle contains only project source, lockfile, tests, public assets and documentation; no credentials, personal email, environment files, dependency folders or unrelated artifacts
- History page: ten periods, expandable native details, historical source anchors, recap, subject navigation, and accent-insensitive history search verified
- Prior source archive integrity checked

## History visual enhancement checks

- Ten distinct decorative era pictograms and three labeled, accessible symbolic SVG illustrations
- New DOM tests cover all era links, unique IDs, intact original paragraphs, forward/back reading-position updates, reduced-motion behavior, no-JavaScript content and repeatable native recap disclosures
- Root and release builds plus the full DOM suite pass; Astro reports zero errors, warnings or hints
- Generated home and Auto Layout HTML and the historical source JSON are byte-for-byte unchanged
- Existing live desktop lesson inspected before enhancement; local preview exits before readiness, so pre-publication visual rendering of the enhanced page is not claimed

## Not verified

Enhanced-page real-browser rendering, responsive overflow, Chromium click/focus behavior, screenshots and visual comparison at the time of this source commit. The prepared Playwright suite could not run because the execution environment prohibits Chromium sockets. The local preview server also exited before becoming ready. The cloud browser disallows local file URLs. No browser or visual QA pass is claimed.

DOM tests exercise logic only. Run the included browser suite and inspect desktop/mobile views before treating visual behavior as verified.

## Release configuration

GitHub Pages deployment is enabled in `.github/workflows/pages.yml`, triggered by pushes to `main` or manual dispatch. It builds and checks the selected `/kien-thuc/` output before publication. The public repository and Pages address are configured in the README. Successful local checks do not prove that files have been uploaded or that the remote deployment has succeeded; check the exact GitHub Actions run and live website separately.

## Editorial history poster redesign (2026-10-10)

- History article only: off-white paper, oxblood timeline spine, large gold dates, alternating torn-paper text panels and ten original conceptual SVG engravings
- Mobile layout follows the article's available width via container queries; narrow views move the spine left rather than scaling down the desktop poster
- Full original historical data and sources retained, including uncertain ancient chronology and the 1975/1976 distinction; engravings are explicitly labeled conceptual illustrations
- Navigation shell, mobile header/slogan, search focus behavior, other lessons and historical JSON untouched
- Local Playwright launch remains blocked by the runtime's Chromium socket restriction; cloud-browser visual QA is performed after the exact Pages deployment and reported separately

## Developer roadmap (2026-10-10)

- Added fourth lesson at `/lap-trinh/lo-trinh/` and derived Lập trình navigation group
- Eight phase cards, original SVG technology illustrations, request-flow and supporting-service diagrams, four project milestones, ten official documentation references
- Core stages 01–05 distinguished from optional specialization; no time-to-mastery promises
- Scope-local CSS uses container queries: four cards when article width is at least 900px, two at intermediate widths, one on narrow phones
- All text and native disclosure controls available without JavaScript
- Astro check: zero errors/warnings/hints. Root and `/kien-thuc/` production builds and DOM suites pass
- Existing history source and all unrelated lesson styles/markup preserved; tests retain mobile fixed-menu and no-autofocus regression assertions
- Local Playwright launch remains blocked by Chromium socket restrictions. Live cloud-browser verification follows deployment and is reported separately

## Detailed developer curriculum (2026-10-10)

- Expanded the existing roadmap to 42 ordered modules across eight stages, with prerequisites, a concrete default stack, concepts, practical exercises, expected output and self-checks
- First-session starter and explicit backend-to-SQL learning handoff; five core stages and three optional specializations
- 38 official reading sources, linked directly in the relevant modules; all verified by public-web research on the update date
- Full-width native disclosures keep the curriculum readable without JavaScript; only the first module starts open
- No progress tracker, authentication, backend or other site functionality added; all other lesson source files and shared header/menu code remain unchanged
- Astro check and the four-page release build/DOM checks passed; tests now assert all module content, source references, course criteria, native toggling and existing mobile-menu behavior
- Local browser suite could not start because Chromium socket creation is prohibited by the execution environment. Live cloud-browser inspection is performed separately after the exact deployment; this source report does not claim a visual pass
