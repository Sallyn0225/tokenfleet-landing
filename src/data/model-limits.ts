/**
 * model-limits.ts — manually curated TPM / RPM rate limits per model.
 *
 * pricing-api.json doesn't expose rate limits. Keys are exact `model_name`
 * from pricing-api.json, mirroring `model-meta.ts`'s keyed-record pattern.
 * Missing entries (or missing `tpm`/`rpm` fields) render as "—" in the
 * /models catalog list — never fabricate values.
 *
 * Real values are pending from the user; the record starts empty by design so
 * the list ships with "—" placeholders rather than invented numbers. Drop real
 * values here as `{ 'deepseek-v3.1': { tpm: 1_000_000, rpm: 1_000 } }` etc.
 */
export interface ModelLimits {
  /** Tokens per minute. */
  tpm?: number;
  /** Requests per minute. */
  rpm?: number;
}

export const modelLimits: Record<string, ModelLimits> = {
  // TODO: populate with real TPM/RPM values per model (keyed by model_name).
  // Missing entries render as "—" in the /models list.
};

export function limitsOf(name: string): ModelLimits | undefined {
  return modelLimits[name];
}
