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
  bubbles, timing marks, grade out of 10) with a blackboard dark theme; Archivo, Atkinson
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

## Next

1. **Phase 4** (glossary and learning paths).

## Last step (the user chose to leave the deploy for the end)

1. **Deploy**: import the repository on Vercel (needs the user's account), confirm `SITE_URL`,
   check headers with `curl -I`.
2. **Audit items that need the deployed site or a person**:
   - Lighthouse on the Vercel preview (HTTP/2 and brotli; local runs cap FCP near 2 s).
   - Screen reader pass (NVDA) on a full session, the palette and the resource filters.
   - Check resource pricing by hand (URLs were checked; pricing claims were not).
   - Submit the sitemap in Google Search Console and test a page in the Rich Results Test.

## Later (v1.1+)

- **Phase 4**: glossary (~100 terms linked to questions and resources) and learning paths
  (sequences of quiz topics and resources with a checklist).
- **Phase 5**: new areas (backend, databases, DevOps, engineering), interview mode, cheat
  sheets, `CONTRIBUTING.md` for question contributions through pull requests.
- **Needs a backend**: accounts and sync, user-made quizzes with moderation, rankings.

## Known follow-ups

- Reading links are per topic; add per-question links (`links` in the question) where a specific
  documentation page helps more than the topic guide.
- Re-run `npm run check-links` before releases; sites change URLs.
