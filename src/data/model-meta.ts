/**
 * model-meta.ts — manually curated context window / max output / docs link.
 *
 * pricing-api.json doesn't expose context window. Sourced from vendor docs.
 * Keys are exact model_name from pricing-api.json. Missing entries simply
 * hide the spec row in the dialog — never fabricate values.
 */

export interface ModelMeta {
  contextK?: number;
  maxOutputK?: number;
  docs?: string;
}

export const modelMeta: Record<string, ModelMeta> = {
  // Anthropic
  'claude-opus-4.7': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/en/docs/about-claude/models',
  },
  'claude-opus-4.6': {
    contextK: 1000,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/en/docs/about-claude/models',
  },
  'claude-opus-4.5': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/en/docs/about-claude/models',
  },
  'claude-sonnet-4.6': {
    contextK: 1000,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/en/docs/about-claude/models',
  },
  'claude-sonnet-4.5': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/en/docs/about-claude/models',
  },
  'claude-haiku-4.5': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/en/docs/about-claude/models',
  },
  'claude-opus4.5-reverse': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/en/docs/about-claude/models',
  },
  'claude-sonnet4.5-reverse': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/en/docs/about-claude/models',
  },
  'claude-haiku4.5-reverse': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/en/docs/about-claude/models',
  },

  // OpenAI
  'gpt-5.4': {
    contextK: 1000,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs/models',
  },
  'gpt-5.4-mini': {
    contextK: 400,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs/models',
  },
  'gpt-5.4-nano': {
    contextK: 400,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs/models',
  },
  'gpt-5.3-codex': {
    contextK: 400,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs/models',
  },
  'gpt-5.2': {
    contextK: 400,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs/models',
  },
  'gpt-5.2-chat': {
    contextK: 400,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs/models',
  },
  'gpt-5.2-codex': {
    contextK: 400,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs/models',
  },
  'sora-2': { docs: 'https://platform.openai.com/docs/models/sora' },
  'sora-2-pro': { docs: 'https://platform.openai.com/docs/models/sora' },

  // Google
  'gemini-3-pro-preview': {
    contextK: 1000,
    maxOutputK: 64,
    docs: 'https://ai.google.dev/gemini-api/docs/models',
  },
  'gemini-3-flash-preview': {
    contextK: 1000,
    maxOutputK: 64,
    docs: 'https://ai.google.dev/gemini-api/docs/models',
  },
  'nano-banana-pro-reverse': {
    docs: 'https://ai.google.dev/gemini-api/docs/image-generation',
  },
  'nano-banana-reverse': {
    docs: 'https://ai.google.dev/gemini-api/docs/image-generation',
  },
  'nano-banana2-reverse': {
    docs: 'https://ai.google.dev/gemini-api/docs/image-generation',
  },

  // DeepSeek
  'deepseek-v3': {
    contextK: 64,
    maxOutputK: 8,
    docs: 'https://api-docs.deepseek.com/',
  },
  'deepseek-v3.1': {
    contextK: 128,
    maxOutputK: 8,
    docs: 'https://api-docs.deepseek.com/',
  },
  'deepseek-v3.2-exp': {
    contextK: 128,
    maxOutputK: 64,
    docs: 'https://api-docs.deepseek.com/',
  },
  'DeepSeek-V3.2': {
    contextK: 128,
    maxOutputK: 64,
    docs: 'https://api-docs.deepseek.com/',
  },
  'DeepSeek-V3.2-A': {
    contextK: 128,
    maxOutputK: 64,
    docs: 'https://api-docs.deepseek.com/',
  },

  // Moonshot
  'kimi-k2.5': { contextK: 256, docs: 'https://platform.moonshot.cn/docs' },
  'kimi-k2.6': { contextK: 256, docs: 'https://platform.moonshot.cn/docs' },

  // MiniMax
  'MiniMax-M2.1': {
    contextK: 200,
    docs: 'https://platform.minimaxi.com/document/',
  },
  'MiniMax-M2.5': {
    contextK: 200,
    docs: 'https://platform.minimaxi.com/document/',
  },
  'MiniMax-M2.7': {
    contextK: 200,
    docs: 'https://platform.minimaxi.com/document/',
  },

  // Zhipu
  'glm-5.1': { contextK: 128, docs: 'https://open.bigmodel.cn/dev/api' },
};

export function metaOf(name: string): ModelMeta | undefined {
  return modelMeta[name];
}
