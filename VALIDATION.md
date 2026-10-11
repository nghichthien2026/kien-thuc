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


## English DSA roadmap (10 October 2026)

- Added `/lap-trinh/dsa-roadmap/` as the fifth lesson, under Lập trình; the article is explicitly `lang="en"` while the shared Vietnamese navigation is unchanged.
- 11 numbered stages, 11 original accessible SVG diagrams, 22 exercises, separate prerequisite guidance, first-session starter, linked teaching references, native expandable learning sections and hints. No screenshot embedding or JavaScript dependency for article content.
- Astro check: zero errors, warnings or hints. Root-base and `/kien-thuc/` production builds and five-lesson DOM suites passed. Existing four lesson source pages retained byte-for-byte.
- Exhaustive small-array lower-bound cases agree with Python `bisect_left`; DP example assertions, recurrence and negative-input behavior checked.
- Local preview could not be reached from the supported cloud browser (connection refused). Live browser QA is performed after deployment; DOM checks alone are not visual or screen-reader certification.

- Live Pages build/deploy for `e4f383ce40928c5255836f78c098821cee00ea98` succeeded. Supported cloud-browser checks at 1180 CSS px and browser-zoom narrow widths 472/393/295 CSS px found no horizontal article overflow; native disclosure and keyboard Enter toggle, live search and mobile menu focus/Escape passed. This is browser-zoom responsive QA, not a physical-device test.
- Visual QA found duplicated module numbering; removed numeric prefixes from module headings so the ordered list owns numbering.


## Vietnamese DSA revision (10 October 2026)

- Replaced the English article at the same route with Vietnamese prose, article language, navigation title, diagrams and accessible descriptions. Kept technical identifiers and Python code intact.
- Preserved all 11 stages, 35 concept modules, 22 exercises, 15 sources and two code examples. Removed duplicate module numbers; the ordered list owns numbering. The previous four page sources are unchanged.
- Revision checks passed: Astro zero diagnostics, root and subpath builds, all five lesson DOM regressions, translated labels/language and numbering checks, source/code/anchor preservation, and Python example tests.

## English time expressions (2026-10-10)

Added a sixth lesson with 13 numbered cards in three semantic groups, original clock/timeline graphics, Vietnamese explanations and examples, five local-only quiz questions, native answer disclosures, repeatable check/reset and no-JavaScript reading. Clarified that “the last time” can mean the most recent occasion rather than an irrevocable final occasion. Added source attribution, navigation keywords and a home lesson catalog.

Passed Astro/TypeScript checks with zero diagnostics, production builds for `/` and `/kien-thuc/`, and both base-path DOM suites including the five previous lessons. New regression coverage checks empty/wrong/correct and repeated submissions, punctuation/case variants, Time’s up, changed answers, reveal/reset/retry, numbered cards, search and no-JS content.

Shell-based Playwright launch was attempted but failed because this execution environment disallows Chromium's process-singleton socket. This is an infrastructure restriction, not a passing browser test. Live cloud-browser verification is performed separately after publication; narrow layout and browser appearance must not be inferred from DOM tests.

Live cloud-browser review confirmed 13 cards, wrong-answer feedback, 0/5 then 5/5, accepted case/punctuation variants and Time’s up, repeated checks, keyboard reset, native reveal, narrow-window menu focus and live search. At approximately 1165×499 the sidebar exposed an existing lack of desktop scrolling; the release correction adds overflow-y:auto to the inset-bounded sidebar. Also corrected the Cambridge last-time link label to identify its final-occurrence sense. Narrow testing used a physically resized browser window, not mobile-device emulation.

## Vocabulary-first revision (2026-10-10)

Replaced the tall introductory hero with a short title followed immediately by thirteen high-contrast phrase/meaning links. The grid uses two columns on narrow screens and three on larger screens. Introductory prose and statistics follow the keywords. Each link targets its own focusable detail card, with a visible target border and the existing fixed-header scroll offset. Added DOM assertions for all thirteen translations/links, correct matching targets, unique IDs and summary placement before introductory prose. No new animations or dependencies.

## Bright card-and-icon redesign (2026-10-10)

Inspected the supplied visual reference before implementing: pale-blue background, rounded white shadowed cards, colorful outlined icons beside bold dark words and brief meanings. Applied those cues to this article only via an optional layout body class; all other lesson pages keep their original theme. Added thirteen distinct inline SVG illustrations used in both the keyword summary and detail cards. Removed ordinal badges from keywords, details, group labels, exercises and practice prompts, while retaining meaningful quantities such as 13 expressions and 5 questions. Preserved all examples, meanings, source clarification, native anchors and quiz behavior. New assertions verify 26 SVG instances, absence of ordinal elements and theme isolation across all previous pages.

## Content-only color-scope correction (2026-10-10)

The previous redesign used a route-specific body class plus sidebar, header, breadcrumb and TOC overrides. Although other routes stayed unchanged, that incorrectly recolored the shared shell on the English route. The user's clarification requires the history article's pattern: custom colors only inside the article. Removed the optional layout body-class API and every time-page shell selector. The light canvas, padding, color scheme and shadow now belong to article.time-lesson only, like history-poster. Existing global site colors remain in force around it. Regression assertions reject body/sidebar/header/TOC/page-shell overrides in the article stylesheet. Icons, keyword-first navigation, content, no-ordinal presentation and quiz behavior remain intact.

## Three-column keyword summary (2026-10-10)

Inspected the new screenshot: it shows the wide first-row keyword summary cards, not the full explanation cards. Changed only the keyword summary to three columns when the article content container is at least 740px wide; retained two columns below that width. Container sizing respects the existing sidebar, TOC and content-panel padding. Detailed explanations keep their previous responsive grid. The surrounding dark shell and content-only light panel remain unchanged. Added regression assertions for the container threshold and fallback.

## Remove redundant interaction hint (2026-10-10)

Inspected the supplied crop and removed its exact text, “Chạm vào cụm từ để xem cách dùng và ví dụ ↓”, from above the keyword tiles. Removed its unused styles and added a regression assertion. The tile anchors remain active; educational explanations and exercise help remain.

## Context-led visual teaching (2026-10-10)

Inspected the user’s screenshot of the middle introduction, abstract meaning boxes and plain last/this/next strip. Replaced that specific area with three original accessible SVG situations: making another appointment, passing a bus wait with a game, and arriving on schedule. Each scene pairs a highlighted English expression with a Vietnamese translation and its precise sense of time. Removed the general introductory advice/statistics and abstract navigation boxes. Reworked the occurrence strip into a small past/present/next story using existing example sentences and translations. Preserved the top 13-keyword grid, meanings/detail cards, quiz, content-only colors and original shell. DOM checks assert scene titles, bilingual examples, group anchors and all three story moments.


## JWT poster (2026-10-11)

- Added the fifteenth lesson at `/lap-trinh/jwt/`, with text-based anatomy and an accessible SVG sequence inspired by the supplied chalkboard reference. Shared shell and all earlier lesson sources remain unchanged.
- Scope explicitly describes signed/MAC JWS compact serialization, not all JWT representations. Example JSON is synthetic; no real credentials or complete bearer tokens are included.
- Astro/TypeScript: 44 files, zero errors, warnings or hints. Builds produce 15 pages. Full DOM/link/interaction checks pass at both `/` and `/kien-thuc/`, including JWT anatomy, synthetic JSON, claim categories, sequence labels, source links, and scoped CSS. API and Git regression scripts pass.
- Local preview exited before ready. The reference browser test could not launch Chromium because socket creation is restricted. The browser-only URL suite was not run locally. These are not visual passes; live cloud-browser QA follows authorized deployment.

- Live cloud-browser QA after first deployment: desktop at 1173px matched the reference's teal chalkboard, gradient wordmark, shared dashed three-column anatomy and clean lifeline diagram. At 323px the anatomy stacks readably, the page has no horizontal overflow, the 580px diagram pans with ArrowRight to the Resource Server, the menu keeps focus on its toggle, and JWT live search returns one of 15 lessons.
- Follow-up polish replaces an unsupported arrow glyph with inline SVG and hides the triple anatomy connectors when the columns stack, preventing a misleading mapping into Header. Typecheck plus both base-path builds and complete DOM suites pass again. Final live verification follows this patch's deployment.

## Skeuomorphic UI workbench

- Reference image inspected directly. New 16th lesson reproduces paper grain, white raised bevels, crimson recessed states, slider tracks, circular dial and compact sample forms. The original dark shell and all 15 prior lesson files remain byte-identical to remote a4e9314.
- Astro check: 47 files, zero errors/warnings/hints. Builds: 16 routes at `/` and `/kien-thuc/`. Full DOM suites pass at both bases; dedicated control/filter/selection/repeated-reset tests pass. API and Git regression tests pass.
- No real password input, authentication, order, form submission, external fonts, assets, or runtime network behavior.
- Local preview exits before ready and Chromium cannot create sockets in this workspace. Live cloud-browser pixel, native keyboard and responsive QA follows deployment. These local limitations are not visual passes.

- Live cloud-browser QA on the published ad452bf7: desktop 1173px reproduces the reference paper texture, bevels, red insets and mechanical controls. Phone 323px has no horizontal overflow; all 16 links are present and mobile menu focus/live search pass. Native Space switches, ArrowRight ranges and minute dial, Enter readiness, ingredient selection/filtering and repeated reset pass. Screenshot inspected against the source image. Follow-up increases the two 23px switch dimensions to 24px and narrows phone mini-key gaps; control tests now join the existing CI gate.

## Neumorphism dark soft-UI kit (2026-10-11)

- Inspected the supplied navy/mint reference pixels. Added a separate seventeenth lesson with original CSS/SVG rather than embedding the source raster. Four columns at wide widths, two on intermediate widths and one on phones; the site shell and previous 16 lesson sources remain unchanged.
- Includes 38 demo buttons, four native ranges, radios, native switches/disclosures, roving-tabindex tabs with arrow/Home/End keys, local component search, illustrative balances and a complete repeatable reset. No authentication, payments, external submission or persistent storage. Donut data totals 100%.
- Astro/TypeScript: 51 files, zero errors, warnings or hints. Builds: 17 routes. Full DOM/link suites pass at both `/` and `/kien-thuc/`; API and Git animation regressions pass. Focused Neumorphism checks cover repeated click bounds, nonnegative synthetic balances, all control groups, tab keyboard navigation, search no-match/reset and reduced-motion configuration. The publish gate includes the focused test and resolves generated local script assets under the configured base path.
- Local development server exited before readiness; local Chromium could not launch because socket creation is restricted. These are not browser-layout passes. Actual live desktop/mobile browser review follows deployment.

- Live 1173px browser review found the initial conservative breakpoint made the reference kit too spread out vertically. A focused responsive refinement keeps four compact columns above 1120px and tightens only the narrow-desktop controls/legend; tablet and phone layouts remain two and one columns. Native range, arrow-key tabs, glow toggle and synthetic balance controls already passed live checks. Final layout review follows this patch.

## Glass Control Center — 2026-10-11
- Astro check: 55 files, zero errors/warnings/hints
- Static production builds: 19 routes, `/kien-thuc/` and `/`
- Full DOM regression suite passed on both bases, including prior 18 lessons
- 15 repeatable toggles, native bounded brightness/volume ranges, output values, previous/next wrapping, play/pause visual state and repeated complete resets passed
- Source scan confirms no device APIs, permission requests, audio playback, network calls, persistence or background timers in this demo
- Reduced-motion CSS present; real-browser layout, focus and keyboard QA is a separate post-publication check


## Neumorphism Chat · 2026-10-11
- Viewed the actual supplied reference image before implementation
- Added the twentieth lesson with light styling scoped to its canvas; shared dark shell unchanged
- Original detailed gradient SVG portraits, source labels/badges, four verbatim sample messages, silver/blue material treatment
- Type checking: zero errors, warnings, hints
- Both `/` and `/kien-thuc/`: production builds, full DOM link/navigation/legacy-interaction suite and focused chat tests pass
- Focused tests: 9 contacts; exact 4 messages; repeated filters, selection and reset; Arrow/Home/End tab navigation; unique SVG IDs; no network/form submission
- Browser visual, responsive and physical-keyboard QA is a separate live check, not established by DOM tests


## Vietnamese singers · 2026-10-11
- Exact requested 51 unique singers, each with 3 linked song suggestions (153 entries); performer attribution and collaboration notes reviewed
- Page-scoped sage/ivory editorial styling; original typography and record illustration, no real-artist likenesses or external image loading
- Type checking clean; both production base-path builds and full 21-article DOM regression suite pass
- Focused tests cover all names, valid HTTPS link shape, 18/20/13 filters, accent-insensitive artist/title search, empty states, repeated reset and TOC navigation restoring content
- No autoplay, forms, local persistence or runtime content requests
- DOM tests do not establish external playback availability or real-browser visual/keyboard behavior; live browser QA is separate
- Local Playwright visual run could not start Chromium: socket creation denied by the execution environment. No visual result was inferred from that attempt; supported live cloud-browser QA is required after deployment.
