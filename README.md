<p align="center">
  <img src="public/xy-logo-transparent.png" alt="TokenFleet" width="160" />
</p>

# TokenFleet Landing

[简体中文](README.zh-CN.md) | English

TokenFleet Landing is the public Astro site for **TokenFleet**, a unified AI model API gateway. It presents a Chinese-first product narrative for engineering and enterprise buyers: one API key, OpenAI-compatible integration, unified billing, invoices, and a searchable model catalog across LLM, image, video, and audio models.

> [!NOTE]
> This repository contains the static marketing site and model catalog pages. It does not contain the TokenFleet API service or console application.

## Highlights

- **Astro 6 static site** with a small client-side footprint and no frontend framework runtime.
- **Chinese-first landing page** for CTOs, engineers, and enterprise finance/procurement readers.
- **OpenAI SDK compatibility narrative** with copyable `curl`, Python, and Node examples.
- **Static model catalog** at `/models`, currently built from `pricing-api.json` with **34 models**, **7 vendors**, and OpenAI / Anthropic / Gemini endpoint metadata.
- **Catalog interactions** for vendor filters, modality filters, search, price sorting, URL-synced state, deep-linked model dialogs, and copyable model IDs.
- **Enterprise positioning** around unified billing, VAT invoices, VPC/private deployment, SLA conversations, and GPU rental coming soon.
- **Accessibility-minded UI** with a skip link, keyboard-friendly code tabs, visible focus states, responsive layouts, and reduced-motion handling.

## Tech Stack

- [Astro](https://astro.build/) 6
- TypeScript-enabled Astro components
- Plain CSS split across global styles, design tokens, and button primitives
- Vanilla browser JavaScript for navigation, reveal animations, code tabs, and the model explorer
- Static assets under `public/`

## Getting Started

### Requirements

- Node.js 20 or newer
- npm

### Install

```sh
npm install
```

### Development

```sh
npm run dev
```

Astro will print the local development URL, usually `http://localhost:4321`.

### Production Build

```sh
npm run build
```

### Preview Build

```sh
npm run preview
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Astro development server. |
| `npm run build` | Build the static site into `dist/`. |
| `npm run preview` | Preview the production build locally with host binding. |
| `npm run astro` | Run Astro CLI commands directly. |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Product landing page with hero, featured models, billing, business, and enterprise sections. |
| `/models` | Searchable static catalog for all models in the pricing snapshot. |

## Project Structure

```text
docs/              Product and design planning notes
public/            Static images, favicons, Open Graph assets, and brand marks
src/components/    Page sections and reusable Astro components
src/data/          Featured model data, catalog metadata, and pricing utilities
src/layouts/       Shared HTML shell and metadata
src/pages/         Astro routes
src/styles/        Global styles, design tokens, and button styles
```

## Key Files

- `src/pages/index.astro` composes the main landing page.
- `src/pages/models.astro` renders the model catalog page.
- `src/data/pricing.ts` imports `pricing-api.json`, maps vendors, formats prices, detects modality, and exposes the static catalog.
- `src/components/ModelsExplorer.astro` implements filtering, sorting, search, URL state, and model dialog wiring.
- `src/components/ModelDialog.astro` pre-renders model detail HTML for the shared `<dialog>`.
- `src/layouts/Base.astro` defines metadata, favicons, canonical links, global CSS imports, skip link, and reveal behavior.
- `PRODUCT.md`, `DESIGN.md`, and `docs/design-brief.md` document product and design decisions behind the page.

## Updating Model Pricing

The model catalog is generated at build time from the root `pricing-api.json` snapshot, which is expected to mirror `https://tokenfleet.cn/api/pricing`.

1. Refresh `pricing-api.json` from the API.
2. Check that `src/data/pricing.ts` still maps any new vendors, modalities, endpoint types, and icon slugs correctly.
3. Run `npm run build` to verify the static catalog.

## Deployment Notes

The site is configured in `astro.config.mjs` with:

- `site: 'https://tokenfleet.cn'`
- `trailingSlash: 'never'`
- compressed HTML output
- build assets emitted under `_assets`

The production build output is written to `dist/` and can be deployed to any static hosting platform.
