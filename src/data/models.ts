/**
 * models.ts — featured model strip data.
 *
 * Pricing is placeholder where the upstream price is uncertain. Mark every
 * "[待填]" cost in copy until commercial team confirms. Vendor logo strategy:
 * monogram letterforms to dodge brand-color licensing risk in MVP; can swap
 * to simpleicons.org SVGs in Phase 2 once legal reviews trademark usage.
 */

export type Modality = 'chat' | 'image' | 'video';

export interface FeaturedModel {
  id: string;
  vendor: string;
  vendorMonogram: string;
  modality: Modality;
  modalityLabel: string;
  /** background color token (DESIGN.md vendor tint) */
  bgVar: string;
  /** foreground / text-on-card token */
  fgVar: string;
  /** secondary text on the card */
  fgMuteVar: string;
  /** human-readable pricing (mono, tabular figures) */
  priceLabel: string;
  /** very short feature blurb shown on hover or below */
  blurb: string;
}

export const featuredModels: FeaturedModel[] = [
  {
    id: 'claude-opus-4-7',
    vendor: 'Anthropic',
    vendorMonogram: 'A',
    modality: 'chat',
    modalityLabel: 'LLM',
    bgVar: '--vendor-anthropic',
    fgVar: '--color-ink',
    fgMuteVar: '--color-ink-secondary',
    priceLabel: '$15 / $75 per 1M tokens',
    blurb: '深推理与代码生成首选',
  },
  {
    id: 'gpt-5',
    vendor: 'OpenAI',
    vendorMonogram: 'O',
    modality: 'chat',
    modalityLabel: 'LLM',
    bgVar: '--vendor-openai',
    fgVar: '--color-on-primary',
    fgMuteVar: '--color-on-dark-mute',
    priceLabel: '$10 / $30 per 1M tokens',
    blurb: '通用任务与函数调用',
  },
  {
    id: 'gemini-3-pro',
    vendor: 'Google',
    vendorMonogram: 'G',
    modality: 'chat',
    modalityLabel: 'LLM',
    bgVar: '--vendor-google',
    fgVar: '--color-ink',
    fgMuteVar: '--color-ink-secondary',
    priceLabel: '$7 / $21 per 1M tokens',
    blurb: '长上下文与多模态输入',
  },
  {
    id: 'flux-1.1-pro',
    vendor: 'Black Forest Labs',
    vendorMonogram: 'F',
    modality: 'image',
    modalityLabel: '图像',
    bgVar: '--vendor-deepseek',
    fgVar: '--color-on-primary',
    fgMuteVar: '--color-on-dark-mute',
    priceLabel: '$0.04 per image',
    blurb: '高分辨率文生图主力',
  },
  {
    id: 'kling-2.0',
    vendor: 'Kuaishou',
    vendorMonogram: 'K',
    modality: 'video',
    modalityLabel: '视频',
    bgVar: '--vendor-alibaba',
    fgVar: '--color-on-primary',
    fgMuteVar: '--color-on-dark-mute',
    priceLabel: '$0.49 per 5s clip',
    blurb: '可控镜头的中文视频模型',
  },
];

export const totalModelCount = 34;
