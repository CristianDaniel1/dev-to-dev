# Dev to Dev

Quizzes comentados de desenvolvimento de software e uma central de recursos selecionados para quem programa. É o sucessor do [Front-End Quiz](https://frontend-quiz-cris.vercel.app/).

## O que tem

- **Quizzes comentados**: 277 perguntas de HTML, CSS, JavaScript, TypeScript, React, Angular, Tailwind CSS, Git e SQL, em três níveis. Cada alternativa tem explicação, inclusive as erradas.
- **Modos de prática**: prática com feedback imediato, simulado com cronômetro opcional, revisão espaçada (caixas de Leitner) e rodada aleatória misturando tecnologias.
- **Pergunta de confiança**: antes de ver a resposta, você diz se tinha certeza, achava ou chutou. Acertos no chute também voltam para revisão.
- **Material de apoio**: 135 recursos em 16 categorias e coleções montadas por objetivo, cada um com o motivo da recomendação. Filtros na URL e favoritos.
- **Progresso local**: tudo fica no navegador, sem conta. Dá para exportar e importar um backup em JSON.
- **Busca global** com Ctrl+K, temas claro e escuro, navegação completa por teclado.

## Stack

- Angular 22 (standalone, zoneless, signals) com pré-renderização estática (`@angular/ssr`, `outputMode: "static"`)
- Tailwind CSS v4
- Conteúdo em YAML, validado com zod e convertido em TypeScript no build (realce de código com Shiki, busca com MiniSearch)
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

| Comando               | O que faz                                                                                                             |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `npm run content`     | Valida o conteúdo de `content/` e gera os arquivos em `src/app/shared/generated/` (roda antes de start, build e test) |
| `npm run favicons`    | Baixa para `public/favicons/` o ícone dos domínios de recursos novos (`-- --force` baixa todos de novo)               |
| `npm run check-links` | Confere se as URLs dos recursos e das leituras respondem (falha só com links quebrados)                               |
| `npm run build`       | Build de produção com todas as rotas pré-renderizadas, mais `404.html`, `sitemap.xml` e `robots.txt`                  |
| `npm test`            | Testes unitários                                                                                                      |
| `npm run e2e`         | Testes E2E sobre o build (rode `npm run build` antes; na primeira vez, `npx playwright install chromium`)             |
| `npm run lint`        | ESLint                                                                                                                |
| `npm run typecheck`   | Checagem de tipos dos scripts e dos testes E2E                                                                        |
| `npm run format`      | Prettier                                                                                                              |
| `npm run preview`     | Serve o build localmente                                                                                              |

## Conteúdo

As perguntas ficam em `content/quizzes/<tecnologia>/`: um `meta.yaml` com nome, cor e tópicos, e um arquivo por tópico. Os recursos ficam em `content/resources/`. O build falha com uma mensagem clara se algo estiver fora do formato (id repetido, nenhuma alternativa correta, linguagem de código não suportada, contraste insuficiente na cor da tecnologia).

```yaml
- id: css-layout-001
  level: beginner # beginner | intermediate | advanced
  prompt: 'Qual propriedade transforma um elemento em container flex?'
  options:
    - text: '`display: flex`'
      correct: true
      explanation: 'Os filhos diretos passam a ser itens flex.'
    - text: '`position: flex`'
      explanation: '`position` não aceita o valor `flex`.'
  explanation: 'Explicação geral, mostrada depois da resposta.'
```

Cada tópico do `meta.yaml` tem de 1 a 3 `links` de leitura (`label` e `url`), mostrados depois de cada resposta como "Para se aprofundar". Uma pergunta pode ter `links` próprios, que substituem os do tópico.

Os ids são estáveis: o progresso salvo no navegador depende deles, então não renomeie ids de perguntas ou recursos já publicados.

## Deploy

O `vercel.json` já define o comando de build, a pasta de saída (`dist/dev-to-dev/browser`), os headers de segurança e o cache. Basta importar o repositório na Vercel. Se o domínio for diferente de `dev-to-dev.vercel.app`, ajuste `SITE_URL` em `src/app/core/constants/site.constants.ts`: ele é usado nas URLs canônicas, no Open Graph, no JSON-LD e no sitemap.

## Licenças das fontes

Archivo, Atkinson Hyperlegible Next e Atkinson Hyperlegible Mono são distribuídas sob a SIL Open Font License (veja `public/fonts/`).

## Ícones

Os ícones das tecnologias vêm do [Simple Icons](https://simpleicons.org/) (CC0); o de SQL foi desenhado para o projeto. As marcas pertencem aos seus donos. Os favicons dos recursos são baixados pelo `npm run favicons` e pertencem aos respectivos sites.
