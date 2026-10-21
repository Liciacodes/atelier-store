# Atelier Store

A monochrome, image-led fashion storefront built with Next.js 16 (App Router), React 19, Drizzle ORM on Neon Postgres, Better Auth and Tailwind CSS v4.

## Features

- **Catalogue**: categories, products and per-size stock live in Postgres. Reads are cached with Next.js Cache Components (`"use cache"`) and tagged so writes can invalidate them.
- **Product pages**: each product has its own page at `/products/[slug]`, with an image gallery, size picker and stock status.
- **Live stock check**: the "add to bag" server action reads the current stock without the cache, so a sold-out size can't be added.
- **Auth ready**: Better Auth is wired up at `/api/auth/*` with a Drizzle adapter. Its tables still need to be generated (see [Authentication](#authentication)).
- **Design system**: monochrome tokens, `type-*` text styles and layout utilities, all defined in `src/app/globals.css`.

## Tech stack

| Area      | Tool                                                    |
| --------- | ------------------------------------------------------- |
| Framework | Next.js 16.4 (App Router, Cache Components), React 19.3 |
| Database  | Neon serverless Postgres over HTTP                      |
| ORM       | Drizzle ORM + drizzle-kit                               |
| Auth      | Better Auth                                             |
| Styling   | Tailwind CSS v4 (CSS-first config, Turbopack loader)    |
| Language  | TypeScript                                              |

## Getting started

### Prerequisites

- Node.js 20 or later
- A [Neon](https://neon.tech) Postgres database

### Setup

```bash
git clone https://github.com/Liciacodes/atelier-store.git
cd atelier-store
npm install
cp .env.example .env
```

Fill in `.env`:

| Variable             | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| `DATABASE_URL`       | Neon pooled connection string                                   |
| `BETTER_AUTH_SECRET` | A long random string (e.g. `openssl rand -base64 32`)           |
| `BETTER_AUTH_URL`    | The app's base URL, e.g. `http://localhost:3000`                |

Create the tables, load the sample catalogue and start the dev server:

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> `DATABASE_URL` must also be set when you run `npm run build`, because the build reads product slugs from the database to pre-render the product pages.

## Scripts

| Command                 | What it does                                        |
| ----------------------- | --------------------------------------------------- |
| `npm run dev`           | Start the dev server                                |
| `npm run build`         | Production build                                    |
| `npm run start`         | Serve the production build                          |
| `npm run lint`          | Run ESLint                                          |
| `npm run typecheck`     | Type-check with `tsc --noEmit`                      |
| `npm run db:generate`   | Generate a SQL migration from schema changes        |
| `npm run db:migrate`    | Apply migrations                                    |
| `npm run db:studio`     | Open Drizzle Studio                                 |
| `npm run db:seed`       | Load the sample catalogue (safe to re-run)          |
| `npm run auth:generate` | Generate Better Auth tables into `src/db/auth-schema.ts` |

## Project structure

```
src/
├── app/
│   ├── page.tsx                 # Home page
│   ├── products/[slug]/page.tsx # Product detail page
│   ├── actions.ts               # Server actions (add to bag)
│   ├── api/auth/[...all]/       # Better Auth handler
│   ├── layout.tsx               # Root layout, Outfit font
│   └── globals.css              # Tailwind v4 theme and design system
├── components/                  # Header, footer, product card, gallery, purchase panel…
├── db/
│   ├── catalog-schema.ts        # categories, products, product_stock
│   ├── schema.ts                # Re-exports every schema file
│   ├── index.ts                 # Drizzle client
│   └── seed.ts                  # Sample catalogue
└── lib/
    ├── products.ts              # Cached catalogue reads
    ├── catalog.ts               # Product types, price helpers, editorial content
    ├── auth.ts / auth-client.ts # Better Auth server and client
    └── stock.ts                 # Stock helpers
drizzle/                         # Committed SQL migrations
```

## Database

The schema covers products, categories and stock only:

- `categories` → `products` → `product_stock`
- Prices are stored as integers in pence.
- Stock is tracked per size in `product_stock`. A size has no price of its own.
- Pages never query the database directly. They call functions in `src/lib/products.ts`.

To change the schema, edit the relevant `src/db/*-schema.ts` file, then run `npm run db:generate`, review the SQL in `drizzle/`, run `npm run db:migrate`, and update `src/db/seed.ts` to match.

## Authentication

Better Auth is configured, but its tables don't exist yet. To enable it:

1. Run `npm run auth:generate`.
2. Add `export * from "./auth-schema";` to `src/db/schema.ts`.
3. Run `npm run db:generate` and then `npm run db:migrate`.

## Design system

All tokens and utilities live in `src/app/globals.css`. Tailwind's default colours, radii and shadows are reset, so only the system tokens are available:

- **Colours**: `foreground`, `background`, `surface`, `muted`, `divider`, `error`, `success`, `warning` and others. Wrap a section in `.inverse` to flip it to white on black.
- **Type**: `type-body`, `type-caption`, `type-lead`, `type-title-xs` … `type-title-xxl`, `type-display`.
- **Layout**: `container-page`, `section`, `grid-products`, `grid-split`, `media-product`, `media-hero`.
- **Controls**: `btn btn-primary`, `btn btn-secondary`, `link`, `link-quiet`.

Product images are Unsplash photographs.
