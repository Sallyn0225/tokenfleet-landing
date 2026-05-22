<p align="center">
  <img src="public/xy-logo-transparent.png" alt="TokenFleet" width="160" />
</p>

<h1 align="center">TokenFleet Landing</h1>

<p align="center">
  Public Astro site for TokenFleet, a unified AI model API gateway for engineering teams and enterprise buyers.
</p>

<p align="center">
  <a href="README.zh-CN.md">简体中文</a> · English
</p>

<p align="center">
  <strong>Astro 6</strong> · <strong>React 19 Islands</strong> · <strong>Static Model Catalog</strong> · <strong>OpenAI-Compatible API Narrative</strong>
</p>

> [!NOTE]
> This repository contains the static marketing site and model catalog pages. It does not contain the TokenFleet API service or console application.

## Overview

TokenFleet Landing presents a Chinese-first product narrative for **TokenFleet**: one API key, OpenAI-compatible integration, unified billing, invoices, and a searchable model catalog across LLM, image, and video models.

| Area                | Details                                      |
| ------------------- | -------------------------------------------- |
| Framework           | Astro 6 static site                          |
| Interactive islands | React 19, OGL WebGL hero, animated logo loop |
| Main routes         | `/`, `/models`                               |
| Catalog source      | Root `pricing-api.json` snapshot             |
| Current catalog     | 37 models, 7 active vendors                  |
| Build output        | Static files in `dist/`                      |

## Contents

- [Highlights](#highlights)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Routes](#routes)
- [Project Structure](#project-structure)
- [Key Files](#key-files)
- [Updating Model Pricing](#updating-model-pricing)
- [Deployment Notes](#deployment-notes)

## Highlights

- **Chinese-first landing page** for CTOs, engineers, enterprise finance, and procurement readers.
- **Animated WebGL hero backdrop** built with OGL, with reduced-motion, visibility pause, and no-WebGL fallback handling.
- **Local AI brand logo strip** with a horizontally looping vendor showcase.
- **OpenAI SDK compatibility narrative** with copyable `curl`, Python, and Node examples.
- **Static model catalog** at `/models`, currently built from `pricing-api.json` with **37 models**, **7 vendors**, and OpenAI / Anthropic / Gemini endpoint metadata.
- **Catalog interactions** for vendor filters, modality filters, search, price sorting, URL-synced state, deep-linked model dialogs, and copyable model IDs.
- **Enterprise positioning** around unified billing, VAT invoices, VPC/private deployment, SLA conversations, and GPU rental coming soon.
- **Accessibility-minded UI** with a skip link, keyboard-friendly code tabs, visible focus states, responsive layouts, and reduced-motion handling.

## Tech Stack

| Layer            | Technology                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| Site framework   | [Astro](https://astro.build/) 6                                                                  |
| Islands          | React 19 through `@astrojs/react`                                                                |
| Motion / WebGL   | [OGL](https://github.com/oframe/ogl)                                                             |
| Styling          | Plain CSS, design tokens, button primitives, Tailwind CSS 4 Vite plugin                          |
| Language         | TypeScript-enabled Astro components                                                              |
| Browser behavior | Vanilla JavaScript for navigation, reveal animations, code tabs, and model explorer interactions |
| Assets           | Static assets under `public/`                                                                    |

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

| Command           | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Start the Astro development server.                     |
| `npm run build`   | Build the static site into `dist/`.                     |
| `npm run preview` | Preview the production build locally with host binding. |
| `npm run astro`   | Run Astro CLI commands directly.                        |

## Routes

| Route     | Purpose                                                                                      |
| --------- | -------------------------------------------------------------------------------------------- |
| `/`       | Product landing page with hero, featured models, billing, business, and enterprise sections. |
| `/models` | Searchable static catalog for all models in the pricing snapshot.                            |

## Project Structure

```text
docs/                  Product and design planning notes
public/                Static images, favicons, Open Graph assets, and brand marks
src/components/        Page sections and reusable Astro components
src/components/react/  Hydrated React islands for the hero backdrop and logo loop
src/data/              Featured model data, catalog metadata, and pricing utilities
src/layouts/           Shared HTML shell and metadata
src/pages/             Astro routes
src/styles/            Global styles, design tokens, and button styles
```

## Key Files

| File                                              | Purpose                                                                                                     |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `src/pages/index.astro`                           | Composes the main landing page.                                                                             |
| `src/pages/models.astro`                          | Renders the model catalog page.                                                                             |
| `src/components/HeroBackdrop.astro`               | Hosts the static fallback and hydrated WebGL terminal backdrop.                                             |
| `src/components/react/FaultyTerminalIsland.jsx`   | Wraps the OGL terminal effect with WebGL, reduced-motion, and visibility guards.                            |
| `src/components/BrandStrip.astro`                 | Renders the animated AI vendor logo strip with `BrandLogoLoop.jsx`.                                         |
| `src/data/pricing.ts`                             | Imports `pricing-api.json`, maps vendors, formats prices, detects modality, and exposes the static catalog. |
| `src/components/ModelsExplorer.astro`             | Implements filtering, sorting, search, URL state, and model dialog wiring.                                  |
| `src/components/ModelDialog.astro`                | Pre-renders model detail HTML for the shared `<dialog>`.                                                    |
| `src/layouts/Base.astro`                          | Defines metadata, favicons, canonical links, global CSS imports, skip link, and reveal behavior.            |
| `PRODUCT.md`, `DESIGN.md`, `docs/design-brief.md` | Document product and design decisions behind the page.                                                      |

## Updating Model Pricing

The model catalog is generated at build time from the root `pricing-api.json` snapshot, which is expected to mirror `https://tokenfleet.cn/api/pricing`.

1. Refresh `pricing-api.json` from the API.
2. Check that `src/data/pricing.ts` still maps any new vendors, modalities, endpoint types, and icon slugs correctly.
3. Run `npm run build` to verify the static catalog.

> [!TIP]
> The catalog UI supports LLM, image, video, and audio modality filters. The current pricing snapshot contains LLM, image, and video models.

## Deployment Notes

The site is configured in `astro.config.mjs` with:

- `site: 'https://tokenfleet.cn'`
- `trailingSlash: 'never'`
- compressed HTML output
- build assets emitted under `_assets`

The production build output is written to `dist/` and can be deployed to any static hosting platform.
