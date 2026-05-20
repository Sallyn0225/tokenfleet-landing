// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tokenfleet.cn',
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  compressHTML: true,
});
