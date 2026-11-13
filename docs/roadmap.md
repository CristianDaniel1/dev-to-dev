# Roadmap

Living list of what is done and what comes next. The original plan (architecture, features,
phases) was approved at the start of the project; this file tracks where we are.

## Done

- **Phase 0 – Foundation**: Angular 22 static prerendering, Tailwind v4, light/dark theme without
  flash, SEO title strategy, sitemap/robots/404, ESLint/Prettier, Vitest, Playwright + axe, CI.
- **Phase 1 – Quiz engine**: YAML content pipeline (zod, Shiki), practice mode with confidence
  and per-option explanations, results by topic, local progress with Leitner boxes.
- **Phase 2 – Resource hub**: 135 resources in 16 categories, 3 collections, filters in the URL,
  favorites, category and collection pages, "to study" section on quiz pages.
- **Phase 3 (part)**: exam mode with optional timer, spaced review, random mode, progress page
  with JSON backup, command palette (Ctrl+K), resume block on the home page.
- **Redesign**: "answer sheet" identity (white sheets on a grey desk, salmon drop-out ink, answer
  bubbles, timing marks, grade out of 10) with a carbon-paper dark theme; Archivo, Atkinson
  Hyperlegible Next and Atkinson Hyperlegible Mono. Lists replace card grids in the catalog and
  the resource hub.
- **Content for launch**: 277 questions in 9 techs (HTML, CSS, JavaScript, TypeScript, React,
  Angular, Tailwind, Git, SQL), about 30 each across three levels.
- **Launch audit (automatable part)**: JSON-LD (WebSite, Quiz, CollectionPage with ItemList,
  BreadcrumbList) on 29 pages; new OG image; resource URLs checked (one site down removed, four
  URLs fixed); README rewritten; display and text fonts subset to the axes in use (121 KB → 75 KB
  preloaded). Local Lighthouse (mobile, `npx serve`): accessibility, best practices and SEO 100;
  performance 91–95, almost all of the initial JS is Angular itself.

- **Follow-ups**: resource favicons downloaded once (`npm run favicons`) and served by the site;
  tech icons (Simple Icons, plus a drawn SQL glyph) in the badges; 1–3 reading links per topic
  shown after each answer ("Para se aprofundar"), overridable per question; `npm run check-links`
  checks every resource and reading URL.

- **Phase 4 – Glossary and learning paths**: 104 glossary terms in `content/glossary/` with an
  A–Z index, a tech filter and a prerendered page per term (DefinedTerm JSON-LD); 4 learning paths
  in `content/paths/` (26 steps), each step joining a quiz topic, glossary terms and resources,
  with a checklist saved in the browser and Course JSON-LD. Both in the command palette and the
  main navigation ("Sobre" moved to the mobile menu and the footer).
- **Deploy**: live at https://devtodev.vercel.app (`SITE_URL` updated). Headers checked with
  `curl -I`: security headers, HSTS, brotli, immutable cache for hashed JS and fonts, a week for
  favicons, real 404, clean URLs. Lighthouse on the live site (mobile): accessibility, best
  practices and SEO 100 on every page; performance 93–97 in most runs (TBT varies with the CPU).

## Next (needs a person)

- Screen reader pass (NVDA) on a full session, the palette, the resource filters, the glossary
  and a learning path.
- Check resource pricing by hand (URLs were checked; pricing claims were not).
- Submit https://devtodev.vercel.app/sitemap.xml in Google Search Console and test a quiz, a
  glossary term and a path in the Rich Results Test.

## Later (v1.1+)

- **Phase 5**: new areas (backend, databases, DevOps, engineering), interview mode, cheat
  sheets, `CONTRIBUTING.md` for question contributions through pull requests.
- More learning paths (React, Angular, CSS layout) and glossary terms as content grows.
- Include the learning path checklist in the progress backup (today it only covers quiz progress).
- **Needs a backend**: accounts and sync, user-made quizzes with moderation, rankings.

## Known follow-ups

- Reading links are per topic; add per-question links (`links` in the question) where a specific
  documentation page helps more than the topic guide.
- Re-run `npm run check-links` before releases; sites change URLs.
