# 模型目录维护指南（海外分支）

面向仓库维护者。本分支（`sallyn/default-en-and-ai-pricing`，海外专用）的模型目录页 `/models`（英文，默认）以及 `/zh/models`、`/ja/models`、`/ko/models` 镜像页**全部在构建期**由数据文件生成，运行时无请求、无 CORS。本文档说明这些模型相关信息的来源、职责边界，以及「新增 / 下线 / 改名 / 调价 / 改限速」时的标准操作流程。

> 真值原则：**绝不臆造数值**。任何无法从上游核实的字段一律留空，渲染为 `—`，而不是填一个看起来合理的数字。这是 TokenFleet 对工程师与采购双层可信度的底线（见 `PRODUCT.md` Brand Personality）。

> 分支差异提示：本分支与 `main` 已分流。`main` 额外维护 `src/data/model-meta.ts` 与构建期 SEO 端点（`/llms.txt`、`/pricing.md`、`/sitemap.xml`、`src/seo/`），**本分支没有这些文件**。维护本分支时不要照搬 `main` 的流程，只按本文档操作。

---

## 1. 数据流总览

```text
pricing-api.json  ──┐
                    └─▶  src/data/pricing.ts   （目录加载 + 价格 + 厂商 + 模态 + 类型 + 图标）
                            ├─▶ src/components/ModelsPage.astro
                            │       └─▶ src/components/ModelsExplorer.astro
                            │              └─▶ src/components/ModelRow.astro  （一行一模型）
                            └─▶ src/components/FeaturedModels.astro          （首页精选卡片）

src/data/model-limits.ts ─▶  tpm / rpm       （被 ModelRow.astro 消费）
src/i18n.ts              ─▶  featured.blurbs（en / zh / ja / ko 四份，被 FeaturedModels 消费）
```

- 模型列表页**没有详情页、没有对话框**。卡片 + 对话框方案在 `main` 已被静态列表替代，本分支移植的是静态列表形态：单列 hairline 分隔的列表行（`ModelRow.astro`），五列：模型名 | 模型 ID | 类型 | TPM | RPM。不存在 `/models/<slug>` 路由。
- 所有列表页内容按 `model_name`（API 模型 ID）作为主键关联各数据源。**键名必须是 `pricing-api.json` 里的 `model_name` 原值**（区分大小写，例如 `DeepSeek-V3.2`、`kimi-k2.6`、`MiniMax-M2.5`），不要用展示名或自造 slug。
- 本分支**没有** `model-meta.ts`，因此不维护上下文窗口 / 最大输出 / 文档链接，也不生成 `pricing.md`。

---

## 2. 六个维护点

| #   | 文件                                  | 人工 / 自动 | 职责                                                  |
| --- | ------------------------------------- | ----------- | ----------------------------------------------------- |
| 1   | `pricing-api.json`                    | 刷新        | 模型清单、价格 ratio、厂商、计费方式                  |
| 2   | `src/data/pricing.ts`                 | 人工覆盖表  | 展示名、模型类型、模态启发、厂商 slug / 展示名、图标  |
| 3   | `src/data/model-limits.ts`            | 人工        | **TPM / RPM 限速**                                    |
| 4   | `src/i18n.ts`                         | 人工        | `featured.blurbs`：首页精选模型的一句话描述（四语言） |
| 5   | `src/components/FeaturedModels.astro` | 人工        | `featuredModelIds`：首页精选 6 卡的 model id 顺序     |
| 6   | `public/ai-brand-logo/`               | 人工        | 厂商 / 品牌 SVG 图标本地快照                          |

下文逐个说明编辑方式。

### 2.1 `pricing-api.json` — 目录快照

- 位于仓库根目录，应镜像 `https://tokenfleet.ai/api/pricing`。
- 结构：`{ vendors: [...], data: [...RawModel], ... }`。
- 刷新方式：从 API 拉取后整体覆盖该文件并提交。**不要手改 JSON 里某条模型的价格**——价格一律以 API 为准，落地页只是只读快照。
- 当前快照：**36 个模型**、**6 家厂商**（全部活跃，被至少一个模型引用）。

关键字段（被 `pricing.ts` 消费）：

| 字段                                      | 含义                                                   |
| ----------------------------------------- | ------------------------------------------------------ |
| `model_name`                              | 主键，API 模型 ID，原样透传到列表页 ID 列与代码示例    |
| `vendor_id`                               | 关联 `vendors[].id`                                    |
| `quota_type`                              | `0` = 按 token 计费；`1` = 按次计费（多为图像 / 视频） |
| `model_ratio`                             | token 计费倍率，`1 ratio = $2 / 1M tokens`             |
| `completion_ratio`                        | 输出相对输入的倍率                                     |
| `cache_ratio` / `create_cache_ratio`      | 缓存命中 / 建缓存的输入倍率                            |
| `model_price`                             | 按次计费的单次价格（`quota_type === 1` 时生效）        |
| `has_graduated_pricing` / `pricing_tiers` | 阶梯定价                                               |
| `icon`                                    | 品牌图标字段，如 `"OpenAI`、`"Gemini.Color`            |
| `supported_endpoint_types`                | `openai` / `anthropic` / `gemini`                      |

### 2.2 `src/data/pricing.ts` — 覆盖表与派生逻辑

这是把原始 JSON 变成 UI 模型的核心。**通常不需要改逻辑**，只改其中的常量映射表。

- `vendorSlugOverrides`（`{ 8: 'zhipu', 9: 'kuaishou' }`）：厂商筛选 chip 的 URL slug。中文名厂商（智谱、快手）需在此显式给 ASCII slug，保证 `?vendor=zhipu` 这类深链可读。新增中文名厂商时补一条。（当前快照的 6 家厂商均为英文名，命中默认 `name.toLowerCase().replace(/\s+/g,'-')`，无需覆盖。）
- `vendorDisplayName(v, locale)`：非 `zh` locale 下把 `8 → Zhipu`、`9 → Kuaishou`；其余厂商直接用 `vendor.name`。
- `DISPLAY_NAME_OVERRIDES`：**展示名覆盖**。键 = `model_name`，值 = 用户可见的友好名（如 `DeepSeek-V3.2 → DeepSeek V3.2`、`MiniMax-M2.5 → Minimax M2.5`、`kimi-k2.6 → Kimi K2.6`）。缺失则回退到 `model_name` 本身。新增模型若 `model_name` 不适合直接展示（含连字符、版本号大小写混乱等），在此加一条。展示名不区分 locale。
- `modalityOf` / `VIDEO_HINTS` / `IMAGE_HINTS` / `AUDIO_HINTS`：按 `model_name` 子串启发判定模态（chat / image / video / audio），仅供 `FeaturedModels` 的模态链接使用。
- `TYPE_OVERRIDES`：**模型类型轴**（`language` / `multimodal` / `video`），用于列表页的「类型」筛选 chip。默认 `language`；图像生成模型（如 `gpt-image-2`、`nano-banana-2-on-demand`）显式标 `multimodal`，视频生成模型（如 `sora-2`）标 `video`。新增模型如不属于默认 `language`，必须在此显式归类，否则会被错放到「语言」桶。
- `NO_COLOR_VARIANT`（`Set(['openai','moonshot','anthropic'])`）：LobeHub 这些品牌**没有彩色图标**，强制剥掉 `-color` 后缀以免 404。新增厂商时若其 SVG 无彩色版，把 base slug 加进这个集合。
- 价格函数 `priceBreakdown` / `priceLabel` / `fmtUsd`：已封装的计费公式，**不要在组件里重算价格**。需要新的价格展示形式时在此扩展。`priceLabel` 已对 en / zh / ja / ko 四语言输出「次 / 回 / 회 / call」单位。

> 价格公式（newAPI / oneAPI 约定，`BASE_USD_PER_MTOK = 2`）：
>
> - token 计费：`输入 = model_ratio × $2 / 1M`；`输出 = model_ratio × completion_ratio × $2 / 1M`；`缓存命中 = model_ratio × cache_ratio × $2 / 1M`。
> - 按次计费：`单次 = model_price × $2`。
> - 阶梯定价：在每段内对基线 ratio 乘 `tier.{input,output}_ratio_multiplier`。

### 2.3 `src/data/model-limits.ts` — TPM / RPM 限速（重点）

这是用户在 `/models` 列表页能直接看到的「TPM」「RPM」两列的唯一来源。**`pricing-api.json` 不暴露限速字段**，因此必须人工维护。

```ts
export interface ModelLimits {
  tpm?: number; // Tokens per minute
  rpm?: number; // Requests per minute
}

export const modelLimits: Record<string, ModelLimits> = {
  // TODO: populate with real TPM/RPM values per model (keyed by model_name).
};
```

维护要点：

- **键必须是 `pricing-api.json` 的 `model_name` 原值**，不是展示名。例如写 `'DeepSeek-V3.2'`，不是 `'DeepSeek V3.2'`；写 `'kimi-k2.6'`，不是 `'Kimi K2.6'`。
- `tpm` / `rpm` 都是可选。只填了 `tpm` 没填 `rpm`，则 RPM 列显示 `—`，反之亦然。整条缺失则两列都显示 `—`。
- 渲染逻辑见 `ModelRow.astro`：`fmtLimit` 用 `n.toLocaleString('en-US')` 输出千分位（如 `1,000,000`）；`undefined` / `null` 输出 `—`。
- 数值来源：厂商官方限速文档或 TokenFleet 控制台配额。**拿到之前留空**，列表页会以 `—` 占位上线——这是设计意图（见文件顶部注释），不要填占位假数字。
- 改完后跑 `npm run build`，访问 `/models`（或 `/zh/models` 等）核对两列。

示例：

```ts
export const modelLimits: Record<string, ModelLimits> = {
  'DeepSeek-V3.2': { tpm: 1_000_000, rpm: 1_000 },
  'kimi-k2.6': { tpm: 500_000 }, // rpm 暂未知，留空显示 —
};
```

### 2.4 `src/i18n.ts` — `featured.blurbs`（四语言）

- 首页精选区的模型一句话描述硬编码在 `i18n.en.featured.blurbs`、`i18n.zh.featured.blurbs`、`i18n.ja.featured.blurbs`、`i18n.ko.featured.blurbs`，键 = `model_name`。
- **四种语言都要填**。本分支默认英文，但 `/zh`、`/ja`、`/ko` 三条镜像路由共用同一组精选模型，任一语言缺失都会在该语言页回退：`FeaturedModels.astro` 先回退到 `description`（API 快照里的中文描述），再回退到 `fallbackBlurb`。
- 模型下线或改名时，记得删掉四份字典里对应的 blurb，避免残留孤儿键（不影响构建，但会积累垃圾）。

### 2.5 `src/components/FeaturedModels.astro` — `featuredModelIds`

```ts
const featuredModelIds = [
  'claude-opus-4-7',
  'gpt-5.5',
  'gemini-3-pro-preview',
  'DeepSeek-V3.2',
  'kimi-k2.6',
  'MiniMax-M2.5',
];
```

- 首页精选区的 6 张卡片顺序由这个数组决定，键 = `model_name`。
- 用 `modelById.get(id)` 取模型；取不到的会被 `.filter(Boolean)` 静默丢弃，导致卡片数量减少。**因此下线某个模型时必须同步从这里删掉对应 id**，否则会出现空位 / 卡片数与统计不符。
- 改名模型时也要同步更新这里的 id 与 `i18n.ts` 四份 `featured.blurbs` 的键。

### 2.6 `public/ai-brand-logo/` — 品牌图标

- 本地 LobeHub Icons SVG 快照，文件名 = `<slug>.svg`，彩色版 `<slug>-color.svg`。
- `slug` 由 `iconSlugFromField` 从 `pricing-api.json` 的 `icon` 字段推导（`Gemini.Color → gemini-color`、`OpenAI → openai`）。
- 新增厂商 / 新图标时：把 SVG 放进此目录，文件名与推导出的 slug 一致；若品牌无彩色版，记得把它加入 `NO_COLOR_VARIANT`（见 2.2）。

---

## 3. 标准操作流程

### 3.1 新增一个模型

1. **刷新快照**：从 `https://tokenfleet.ai/api/pricing` 拉取，覆盖 `pricing-api.json` 并确认新模型出现在 `data[]`。
2. **展示名**：若 `model_name` 不宜直接展示，在 `pricing.ts` 的 `DISPLAY_NAME_OVERRIDES` 加一条（中英通用，展示名不区分 locale）。
3. **模型类型**：若不是文本 LLM，在 `TYPE_OVERRIDES` 显式标 `multimodal` 或 `video`。
4. **限速**：拿到官方 TPM / RPM 后在 `model-limits.ts` 加一条；拿不到就留空。
5. **首页精选**（可选）：若要进首页精选区，在 `FeaturedModels.astro` 的 `featuredModelIds` 加 id，并在 `i18n.ts` 的 `featured.blurbs`（en / zh / ja / ko 四份）各加一句话描述。
6. **图标**：确认 `public/ai-brand-logo/` 有对应 slug 的 SVG；缺失则补。
7. **验证**：`npm run build` → 检查 `/models`、`/zh/models`、`/ja/models`、`/ko/models` 是否包含新模型且无 404 图标。

### 3.2 下线一个模型

1. 刷新 `pricing-api.json`，确认模型已从 `data[]` 移除。
2. **清理人工数据**：删掉 `model-limits.ts`、`i18n.ts` 的 `featured.blurbs`（en / zh / ja / ko 四份）、`FeaturedModels.astro` 的 `featuredModelIds` 中该 `model_name` 对应的条目。**孤儿键不会报错但会积累垃圾**，务必清。
3. 验证 `npm run build` 无类型错误、精选卡片数量正常（6 张）。

### 3.3 改名一个模型（`model_name` 变更）

视为「下线旧 id + 新增新 id」：把人工数据里所有以旧 `model_name` 为键的条目改成新 `model_name`。注意 `DISPLAY_NAME_OVERRIDES`、`TYPE_OVERRIDES`、`model-limits.ts`、`featuredModelIds`、四份 `featured.blurbs` 全都要改。

### 3.4 调整 TPM / RPM

只改 `src/data/model-limits.ts` 对应 `model_name` 条目的 `tpm` / `rpm`。这是唯一需要动的文件。`npm run build` 后 `/models` 两列即更新。无需碰 `pricing-api.json`（限速不在 API 快照里）。

### 3.5 调价

价格由 `pricing-api.json` 决定，**不要改代码**。刷新快照即可，`pricing.ts` 的公式会自动重算。若新模型引入了新的计费结构（新字段 / 新阶梯规则），才需要扩展 `priceBreakdown`。

---

## 4. 验证

每次改完，按 [`README.md`](../README.md) 的 CI 顺序本地复现：

```sh
npm run format:check && npm run lint && npm run build && npm run check
```

构建产物里重点核对：

- `dist/models/index.html`、`dist/zh/models/index.html`、`dist/ja/models/index.html`、`dist/ko/models/index.html`：列表行数量、TPM/RPM 两列。
- 首页 `dist/index.html` 等：精选卡片数量与顺序。

> 本地 Prettier 在 `autocrlf=true` 的 Windows 环境可能出现 CRLF 假阳性（见仓库 memory）。若 `format:check` 报错但 `git diff` 为空，以 git 已提交的 blob 为准，不要强行改行尾。

---

## 5. 常见坑

- **键名用错**：用展示名 `DeepSeek V3.2` 当键，而不是 `model_name` `DeepSeek-V3.2` → 该条目静默失效，列表页显示 `—`。所有人工数据文件都以 `model_name` 为键，注意本分支的 `model_name` 大小写（如 `DeepSeek-V3.2` 首字母大写、`kimi-k2.6` 全小写、`MiniMax-M2.5` 混合）。
- **新模型没在 `TYPE_OVERRIDES` 归类**：视频 / 多模态模型被默认分到「语言」桶，类型筛选 chip 找不到它。
- **下线模型没清 `featuredModelIds`**：`filter(Boolean)` 静默丢卡，首页精选区卡片数 < 6 且无报错。
- **`featured.blurbs` 只填了一两种语言**：另两条镜像路由会回退到 API 中文描述或 fallback 文案，四语言体验不一致。
- **限速填了占位假数字**：违反真值原则。拿不到就留空。
- **图标 404**：新厂商有彩色 `icon` 字段但 `public/ai-brand-logo/` 没放彩色 SVG，或品牌本无彩色版却没加进 `NO_COLOR_VARIANT`。
- **改了价格没刷新快照**：`pricing-api.json` 是唯一价格来源，手改 `pricing.ts` 的公式常量无效。
