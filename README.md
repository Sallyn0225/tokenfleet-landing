<p align="center">
  <img src="public/xy-logo-transparent.png" alt="TokenFleet" width="160" />
</p>

# TokenFleet Landing

[简体中文](README.zh-CN.md) | English

TokenFleet Landing is a production-oriented Astro site for **TokenFleet**, a unified AI model API gateway. The page presents an engineer-first Chinese product narrative: one OpenAI-compatible endpoint for mainstream LLM, image, video, and audio models, with unified billing, invoices, and enterprise procurement signals.

> [!NOTE]
> This repository contains the public landing page, not the TokenFleet API service or console application.

## Highlights

- **Astro 6 static site** with a small client-side footprint.
- **Chinese-first landing page** for CTOs, full-stack engineers, and enterprise finance/procurement readers.
- **OpenAI SDK compatibility narrative** shown through copyable `curl`, Python, and Node examples.
- **Model gallery and product sections** for 34 production-grade models, unified billing, VAT invoices, VPC/private deployment, SLA discussions, and GPU rental coming soon.
- **TokenFleet visual system** using atmospheric mesh, restrained indigo CTAs, cream business section, and one enterprise dark band.
- **Accessibility-minded UI** with skip link, keyboard-friendly code tabs, visible focus states, responsive layouts, and reduced-motion handling.

## Tech Stack

- [Astro](https://astro.build/) 6
- TypeScript-enabled Astro components
- Plain CSS organized by global styles, design tokens, and button primitives
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

## Project Structure

```text
docs/              Product and design planning notes
public/            Static images, favicons, and Open Graph assets
src/components/    Page sections and reusable Astro components
src/data/          Landing page model data
src/layouts/       Shared HTML shell and metadata
src/pages/         Astro routes
src/styles/        Global styles, design tokens, and button styles
```

## Key Files

- `src/pages/index.astro` composes the full landing page.
- `src/layouts/Base.astro` defines metadata, favicons, canonical links, global CSS imports, skip link, and reveal behavior.
- `src/components/CodeBlock.astro` implements the hero code tabs and copy interaction.
- `src/data/models.ts` stores featured model metadata and the total model count.
- `PRODUCT.md`, `DESIGN.md`, and `docs/design-brief.md` document the product, brand, and design decisions behind the page.

## Deployment Notes

The site is configured in `astro.config.mjs` with:

- `site: 'https://tokenfleet.cn'`
- `trailingSlash: 'never'`
- compressed HTML output
- build assets emitted under `_assets`

The production build output is written to `dist/` and can be deployed to any static hosting platform.
