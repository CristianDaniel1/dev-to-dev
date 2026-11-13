# Roadmap

Living list of what is done and what comes next. The original plan (architecture, features,
phases) was approved at the start of the project; this file tracks where we are.

## Done

- **Phase 0 – Foundation**: Angular 22 static prerendering, Tailwind v4, light/dark theme without
  flash, SEO title strategy, sitemap/robots/404, ESLint/Prettier, Vitest, Playwright + axe, CI.
- **Phase 1 – Quiz engine**: YAML content pipeline (zod, Shiki), 114 questions (HTML, CSS,
  JavaScript, React; Tailwind as draft), practice mode with confidence and per-option
  explanations, results by topic, local progress with Leitner boxes.
- **Phase 2 – Resource hub**: 136 resources in 16 categories, 3 collections, filters in the URL,
  favorites, category and collection pages, "to study" section on quiz pages.
- **Phase 3 (part)**: exam mode with optional timer, spaced review, random mode, progress page
  with JSON backup, command palette (Ctrl+K), resume block on the home page.
- **Redesign**: "answer sheet" identity (white sheets on a grey desk, salmon drop-out ink, answer
  bubbles, timing marks, grade out of 10) with a blackboard dark theme; Archivo, Atkinson
  Hyperlegible Next and Atkinson Hyperlegible Mono. Lists replace card grids in the catalog and
  the resource hub.

## Next

1. **Content for launch** (one tech at a time, user reviews the style of each):
   - Done: TypeScript (31 questions) and Angular (30 questions).
   - Git and SQL, about 25–30 questions each across the three levels.
   - Expand React to about 30.
   - Decide whether Tailwind leaves draft.
2. **Launch audit**:
   - Lighthouse ≥ 95 on home, a tech page and a resource page (Vercel preview).
   - Screen reader pass (NVDA) on a full session, the palette and the resource filters.
   - SEO: JSON-LD (ItemList on resource pages, Quiz/LearningResource where it fits).
   - Redraw `public/og-default.png` in the new identity (it still shows the old look).
   - Check every resource URL and pricing (some were written without visiting the site).
   - Update the README (it still says only Phase 0 is done).
3. **Deploy**: import the repository on Vercel (needs the user's account), confirm `SITE_URL`,
   check headers with `curl -I`.

## Later (v1.1+)

- **Phase 4**: glossary (~100 terms linked to questions and resources) and learning paths
  (sequences of quiz topics and resources with a checklist).
- **Phase 5**: new areas (backend, databases, DevOps, engineering), interview mode, cheat
  sheets, `CONTRIBUTING.md` for question contributions through pull requests.
- **Needs a backend**: accounts and sync, user-made quizzes with moderation, rankings.

## Known follow-ups

- Link questions to specific resources ("learn more" in the feedback); the schema does not
  support it yet.
- Favicons come from DuckDuckGo at runtime; consider self-hosting them at build time.
