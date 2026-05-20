/**
 * models.ts — featured model strip data.
 *
 * Pricing is placeholder where the upstream price is uncertain. Mark every
 * "[待填]" cost in copy until commercial team confirms. Brand marks are loaded
 * from public/ai-brand-logo so the Astro page can render static SVG assets
 * without adding a client-side icon runtime.
 */

export type Modality = 'chat' | 'image' | 'video';

export interface FeaturedModel {
  id: string;
  vendor: string;
  logoSrc: string;
  logoAlt: string;
  modality: Modality;
  modalityLabel: string;
  /** human-readable pricing (mono, tabular figures) */
  priceLabel: string;
  /** very short feature blurb shown on hover or below */
  blurb: string;
}

export const featuredModels: FeaturedModel[] = [
  {
    id: 'claude-opus-4-7',
    vendor: 'Anthropic',
    logoSrc: '/ai-brand-logo/claude-color.svg',
    logoAlt: 'Claude logo',
    modality: 'chat',
    modalityLabel: 'LLM',
    priceLabel: '$15 / $75 per 1M tokens',
    blurb: '深推理与代码生成首选',
  },
  {
    id: 'gpt-5',
    vendor: 'OpenAI',
    logoSrc: '/ai-brand-logo/openai.svg',
    logoAlt: 'OpenAI logo',
    modality: 'chat',
    modalityLabel: 'LLM',
    priceLabel: '$10 / $30 per 1M tokens',
    blurb: '通用任务与函数调用',
  },
  {
    id: 'gemini-3-pro',
    vendor: 'Google',
    logoSrc: '/ai-brand-logo/gemini-color.svg',
    logoAlt: 'Gemini logo',
    modality: 'chat',
    modalityLabel: 'LLM',
    priceLabel: '$7 / $21 per 1M tokens',
    blurb: '长上下文与多模态输入',
  },
  {
    id: 'flux-1.1-pro',
    vendor: 'Black Forest Labs',
    logoSrc: '/ai-brand-logo/flux.svg',
    logoAlt: 'Flux logo',
    modality: 'image',
    modalityLabel: '图像',
    priceLabel: '$0.04 per image',
    blurb: '高分辨率文生图主力',
  },
  {
    id: 'kling-2.0',
    vendor: 'Kuaishou',
    logoSrc: '/ai-brand-logo/kling-color.svg',
    logoAlt: 'Kling logo',
    modality: 'video',
    modalityLabel: '视频',
    priceLabel: '$0.49 per 5s clip',
    blurb: '可控镜头的中文视频模型',
  },
];

export const totalModelCount = 34;
