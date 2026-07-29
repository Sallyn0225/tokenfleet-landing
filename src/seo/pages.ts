/**
 * SEO 页面清单 — sitemap 与 hreflang 簇的单一真值源。
 *
 * 每条记录一个「逻辑页面」的中 / 英两个可索引 URL（站内相对路径，
 * 由 sitemap endpoint 用 `new URL(path, site)` 绝对化）。所有路径遵守
 * `astro.config.mjs` 的 `trailingSlash: 'never'`，不带尾斜杠。
 *
 * 模型详情页已移除（见 task 07-29-models-static-list-page）；可索引页面
 * 仅剩首页 + 模型列表页（zh/en）。`/models/<slug>` 不再收录 sitemap。
 */

export interface SeoPage {
  /** 中文（默认）URL 路径，也是该簇 hreflang="x-default" 的目标。 */
  zh: string;
  /** 英文 URL 路径。 */
  en: string;
}

/** 静态站点页面（首页 / 模型列表页）。 */
export const staticSeoPages: SeoPage[] = [
  { zh: '/', en: '/en' },
  { zh: '/models', en: '/en/models' },
];

/**
 * 站点全部可索引页面簇。sitemap endpoint 调用此函数。
 */
export function seoPages(): SeoPage[] {
  return staticSeoPages;
}
