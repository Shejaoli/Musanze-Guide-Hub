# MusanzeGuide24/7

An independent guide to Musanze, Rwanda, helping visitors and residents discover places, local services, food, stays, culture, and experiences.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/musanze-guide run dev` — run the MusanzeGuide website (port supplied by its artifact workflow)
- `pnpm --filter @workspace/musanze-guide run typecheck` — typecheck the website
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- The API server requires `DATABASE_URL` — a Postgres connection string. The website does not require that value to run.
- The MusanzeGuide website is a static Vite app; its managed workflow supplies `PORT` and `BASE_PATH`.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/musanze-guide/src/App.tsx` — homepage and scroll-story interactions
- `artifacts/musanze-guide/src/index.css` — website theme, layout, and motion
- `artifacts/musanze-guide/public/story/` — optimized local hotel, culture, and souvenir photos

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
