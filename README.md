# Kiến thức

A Vietnamese personal learning website, built with Astro, TypeScript and plain CSS. Each lesson is its own coded page; the shared shell handles navigation, search and the table of contents without forcing every lesson into one template.

## Hosting

- Public source repository: https://github.com/nghichthien2026/kien-thuc
- Configured GitHub Pages address: https://nghichthien2026.github.io/kien-thuc/
- Static output; no backend, database, admin, authentication, analytics or SEO package
- Educational articles with authored explanations; the Vietnam history lesson includes linked references

The address above is the configured deployment target, not proof of a successful deployment. Check the repository's latest **Publish Astro to GitHub Pages** workflow run to confirm publication.

## Run locally

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:4321/kien-thuc/ (or the port printed by Astro).

```sh
npm run check    # Astro/TypeScript diagnostics
npm run build    # Static output in dist/
npm run test:dom # Generated links and interaction logic
npm run preview  # Preview the production build
```

In a restricted environment with an unwritable home directory, set `ASTRO_TELEMETRY_DISABLED=1` and use a writable npm cache, for example `npm --cache /tmp/kien-thuc-npm ci`. Normal local development does not require this workaround.

## Lessons and interactions

- `/kien-thuc/`: Dev/Staging/Production, with three original SVG diagrams, a sequential CI/CD simulation and a practical example
- `/kien-thuc/thiet-ke/auto-layout/`: a distinct lesson layout with a flexbox playground for direction, gap and padding
- `/kien-thuc/lich-su/viet-nam/`: ten-period Vietnam history timeline, ten era pictograms, three original symbolic SVG illustrations, era navigation/reading position, expandable details, tap-to-reveal milestone recap and linked references
- `/kien-thuc/lap-trinh/lo-trinh/`: eight-stage developer roadmap with original vector icons, core/specialization distinction, 42 ordered learning modules, a first-session starter, direct official reading links, exercises/output/self-checks, phase completion criteria, optional-tool guidance and a staged learning-notes capstone
- Accent-insensitive title/topic/keyword search, responsive mobile menu, `/` search shortcut, Escape to close, skip link and reduced-motion styles
- Self-contained visual assets and system fonts; no external font requests

The CI/CD animation performs no real deployment. The Auto Layout playground is a simplified model rather than a recreation of all Figma behavior. Search covers lesson titles, topics and authored keywords, not full article bodies.

## Publish to GitHub Pages

The enabled `.github/workflows/pages.yml` workflow builds and publishes on pushes to `main`, and can also be run manually from the Actions tab.

1. Upload these source files to the repository root, preserving `src/`, `public/`, `tests/` and `.github/workflows/` directories. Do not upload `node_modules/` or `.astro/`.
2. In the repository's **Settings → Pages**, select **GitHub Actions** as the build source.
3. Confirm the workflow completes successfully and open the Pages address above.

The workflow runs `npm ci`, type checks, a production build and DOM/link tests before uploading `dist/` and deploying. It uses GitHub's built-in token with narrowly scoped permissions; no personal access token is required in this project. The repository and website are public. Never commit credentials, private notes or personal data you do not intend to publish.

`astro.config.mjs` configures the site origin and `/kien-thuc/` base path. Internal links use the shared `href()` helper so they respect that path.

Official deployment guide: https://docs.astro.build/en/guides/deploy/github/

## Add a bespoke lesson

1. Create a `.astro` page under `src/pages/`.
2. Wrap it in `LessonLayout`, supplying title, topic, current path and section links.
3. Write the lesson-specific structure, diagrams and interactions. Shared components are optional.
4. Add title/path/keywords to `src/data/lessons.ts`. Topic groups and counts are derived from that data.
5. Use `href()` for internal links.
6. Run checks and inspect desktop and mobile views.

## Browser tests

With `npm run preview` running separately:

```sh
npm run test:ui
```

The suite uses Playwright with an installed `/usr/bin/chromium` by default. Set `CHROMIUM_PATH` to your Chrome/Chromium executable if needed. It covers search, simulation/replay, lesson navigation, browser back/forward, playground controls/reset, mobile menu/Escape and horizontal overflow at common widths. Screenshots are written to `qa/`.

To additionally verify root-path hosting, then restore the selected deployment configuration:

```sh
npm run build -- --base /
TEST_BASE=/ npm run test:dom
npm run build
npm run test:dom
```

## Verification limits

The history visuals use no external images, fonts, tracking or runtime dependencies. The large illustrations are explicitly labeled conceptual rather than documentary reconstructions. Their reading effects respect reduced motion, and all lesson text and native disclosure controls remain available without JavaScript.

Type checks, root-path builds, the selected `/kien-thuc/` release build and DOM-based link/interaction tests pass. Real-browser QA could not run in the preparation environment because Chromium sockets and local preview access were restricted. DOM checks do not establish visual correctness, responsive layout or real-browser accessibility. The included Playwright suite still needs to run in a browser-capable environment. See `VALIDATION.md` for details.
