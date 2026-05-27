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
  'claude-opus-4-5-20251101': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },
  'claude-sonnet-4.5': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },
  'claude-haiku-4.5': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },
  'claude-sonnet4.5-reverse': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },
  'claude-opus-4-6': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },
  'claude-opus-4.6': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },
  'claude-opus-4.7': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },
  'claude-opus4.5-reverse': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },
  'claude-haiku4.5-reverse': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },
  'claude-haiku-4-5-20251001': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },
  'claude-opus-4-7': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },
  'claude-sonnet-4-6': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },
  'claude-sonnet-4.6': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },
  'claude-sonnet-4-5-20250929': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },
  'claude-opus-4.5': {
    contextK: 200,
    maxOutputK: 64,
    docs: 'https://docs.anthropic.com/',
  },

  // OpenAI
  'gpt-5.2': {
    contextK: 400,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs',
  },
  'gpt-5.2-chat': {
    contextK: 400,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs',
  },
  'gpt-5.2-codex': {
    contextK: 400,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs',
  },
  'gpt-5.3-codex': {
    contextK: 400,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs',
  },
  'gpt-5.4': {
    contextK: 400,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs',
  },
  'gpt-5.4-mini': {
    contextK: 400,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs',
  },
  'gpt-5.4-nano': {
    contextK: 400,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs',
  },
  'gpt-5.5': {
    contextK: 400,
    maxOutputK: 128,
    docs: 'https://platform.openai.com/docs',
  },
  'gpt-image-2': { docs: 'https://platform.openai.com/docs' },
  'sora-2': { docs: 'https://platform.openai.com/docs' },

  // Google
  'gemini-3-pro-preview': {
    contextK: 1000,
    maxOutputK: 64,
    docs: 'https://ai.google.dev/gemini-api/docs',
  },
  'gemini-3.1-pro-preview': {
    contextK: 1000,
    maxOutputK: 64,
    docs: 'https://ai.google.dev/gemini-api/docs',
  },
  'gemini-3-flash-preview': {
    contextK: 1000,
    maxOutputK: 64,
    docs: 'https://ai.google.dev/gemini-api/docs',
  },
  'gemini-3.5-flash': {
    contextK: 1000,
    maxOutputK: 64,
    docs: 'https://ai.google.dev/gemini-api/docs',
  },
  'gemini-3.1-flash-lite-preview': {
    contextK: 1000,
    maxOutputK: 64,
    docs: 'https://ai.google.dev/gemini-api/docs',
  },
  'nano-banana-2-on-demand': { docs: 'https://ai.google.dev/gemini-api/docs' },

  // Moonshot
  'kimi-k2.5': { contextK: 256, docs: 'https://platform.moonshot.ai/docs' },
  'kimi-k2.6': { contextK: 256, docs: 'https://platform.moonshot.ai/docs' },

  // DeepSeek
  'DeepSeek-V3.2': {
    contextK: 128,
    maxOutputK: 64,
    docs: 'https://api-docs.deepseek.com/',
  },

  // MiniMax
  'MiniMax-M2.5': {
    contextK: 200,
    docs: 'https://platform.minimaxi.com/document/',
  },
  'MiniMax-M2.1': {
    contextK: 200,
    docs: 'https://platform.minimaxi.com/document/',
  },
};

export function metaOf(name: string): ModelMeta | undefined {
  return modelMeta[name];
}
