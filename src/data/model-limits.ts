/**
 * model-limits.ts — manually curated TPM / RPM rate limits per model.
 *
 * pricing-api.json doesn't expose rate limits. Keys are exact `model_name`
 * from pricing-api.json, mirroring `model-meta.ts`'s keyed-record pattern.
 * Missing entries (or missing `tpm`/`rpm` fields) render as "—" in the
 * /models catalog list — never fabricate values.
 *
 * Default ceiling across the catalog is TPM 1,000,000 / RPM 60, with premium
 * tier overrides (e.g. deepseek-v4-pro) granted higher quotas above.
 */
export interface ModelLimits {
  /** Tokens per minute. */
  tpm?: number;
  /** Requests per minute. */
  rpm?: number;
}

export const modelLimits: Record<string, ModelLimits> = {
  // Default ceiling: TPM 1,000,000 / RPM 60 across the catalog.
  'MiniMax-M2.5': { tpm: 1_000_000, rpm: 60 },
  'MiniMax-M2.7': { tpm: 1_000_000, rpm: 60 },
  'deepseek-v3.1': { tpm: 1_000_000, rpm: 60 },
  'deepseek-v3.2': { tpm: 1_000_000, rpm: 60 },
  'deepseek-v4-flash': { tpm: 1_000_000, rpm: 60 },
  // Premium tier override.
  'deepseek-v4-pro': { tpm: 20_000_000, rpm: 4_000 },
  'doubao-seedance-2-0-260128': { tpm: 1_000_000, rpm: 60 },
  'doubao-seedance-2-0-fast-260128': { tpm: 1_000_000, rpm: 60 },
  'doubao-seedance-2-0-mini-260615': { tpm: 1_000_000, rpm: 60 },
  'glm-5.1': { tpm: 1_000_000, rpm: 60 },
  'glm-5.2': { tpm: 1_000_000, rpm: 60 },
  'glm-5v-turbo': { tpm: 1_000_000, rpm: 60 },
  'kimi-k2.5': { tpm: 1_000_000, rpm: 60 },
  'kimi-k2.6': { tpm: 1_000_000, rpm: 60 },
  'kimi-k2.7-code': { tpm: 1_000_000, rpm: 60 },
  'kimi-k3': { tpm: 1_000_000, rpm: 60 },
};

export function limitsOf(name: string): ModelLimits | undefined {
  return modelLimits[name];
}
