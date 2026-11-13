# Dev to Dev

Quizzes comentados de desenvolvimento de software e uma central de recursos selecionados para quem programa. É o sucessor do [Front-End Quiz](https://frontend-quiz-cris.vercel.app/).

> Em desenvolvimento. Fase 0 (fundação) concluída: layout, temas claro e escuro, SEO, pré-renderização e testes.

## Stack

- Angular 22 (standalone, zoneless, signals) com pré-renderização estática (`@angular/ssr`, `outputMode: "static"`)
- Tailwind CSS v4
- Vitest (unitários), Playwright + axe (E2E e acessibilidade)
- ESLint (angular-eslint) e Prettier
- Deploy estático na Vercel

## Rodando localmente

Requer Node.js 22.12 ou superior.

```bash
npm install
npm start          # http://localhost:4200
```

## Scripts

| Comando           | O que faz                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| `npm run build`   | Build de produção com todas as rotas pré-renderizadas, mais `404.html`, `sitemap.xml` e `robots.txt`      |
| `npm test`        | Testes unitários                                                                                          |
| `npm run e2e`     | Testes E2E sobre o build (rode `npm run build` antes; na primeira vez, `npx playwright install chromium`) |
| `npm run lint`    | ESLint                                                                                                    |
| `npm run format`  | Prettier                                                                                                  |
| `npm run preview` | Serve o build localmente                                                                                  |

## Deploy

O `vercel.json` já define o comando de build, a pasta de saída (`dist/dev-to-dev/browser`), os headers de segurança e o cache. Basta importar o repositório na Vercel. Se o domínio for diferente de `dev-to-dev.vercel.app`, ajuste `SITE_URL` em `src/app/core/seo/site.ts` e em `scripts/postbuild.mjs`.

## Licenças das fontes

Archivo, Atkinson Hyperlegible Next e Atkinson Hyperlegible Mono são distribuídas sob a SIL Open Font License (veja `public/fonts/`).
