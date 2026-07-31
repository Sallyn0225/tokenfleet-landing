export type Locale = 'zh' | 'en' | 'ja' | 'ko';

export const locales: Locale[] = ['en', 'zh', 'ja', 'ko'];
export const defaultLocale: Locale = 'en';

/**
 * GitHub Pages 子路径部署的 base（如 `/tokenfleet-landing-ai`）。Vite 构建时把
 * `import.meta.env.BASE_URL` 替换为字面量；根部署时为 `'/'`，去尾斜杠后为空串，
 * 输出与未引入 base 前完全一致。
 *
 * 本模块会被 `scripts/sync-pricing.mjs` 在 Node 下直接加载（取 featured.blurbs），
 * 因此这里不能直接读 `import.meta.env.BASE_URL` —— Node 22.12/22.13 没有
 * `import.meta.env`，会抛 TypeError 炸掉同步脚本。`typeof` 守卫同时兼容 Node
 * 与 Vite 两种执行环境。
 */
const BASE_PATH = (() => {
  if (typeof import.meta.env === 'undefined') return '';
  return (import.meta.env.BASE_URL ?? '').replace(/\/$/, '');
})();

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'en') return `${BASE_PATH}${normalized}`;
  if (normalized === '/') return `${BASE_PATH}/${locale}`;
  return `${BASE_PATH}/${locale}${normalized}`;
}

/**
 * 给站内资源路径加 base 前缀。不要直接拼 `import.meta.env.BASE_URL`——
 * 根部署时它等于 `'/'`，拼出来是 `//favicon.png` 这种协议相对 URL（会被浏览器
 * 解析成 `https://favicon.png/`）。BASE_PATH 已去尾斜杠，根部署时为空串。
 */
export function withBase(path: string): string {
  return `${BASE_PATH}${path}`;
}

export function ogLocale(locale: Locale): string {
  if (locale === 'zh') return 'zh_CN';
  if (locale === 'ja') return 'ja_JP';
  if (locale === 'ko') return 'ko_KR';
  return 'en_US';
}

export function hreflang(locale: Locale): string {
  if (locale === 'zh') return 'zh-CN';
  if (locale === 'ja') return 'ja';
  if (locale === 'ko') return 'ko';
  return 'en';
}

export function alternateLinks(
  path: string,
  site: URL
): Array<{
  locale: Locale;
  hreflang: string;
  href: string;
}> {
  return locales.map((locale) => ({
    locale,
    hreflang: hreflang(locale),
    href: new URL(localePath(locale, path), site).toString(),
  }));
}

const zhMessages = {
  htmlLang: 'zh-CN',
  localeName: '中文',
  languageLabel: '语言',
  skipToMain: '跳到主要内容',
  homeAria: 'TokenFleet 首页',
  seo: {
    homeTitle: 'TokenFleet · 一个 API key，接入全部主流大模型',
    homeDescription:
      '通过统一 API 网关聚合 Anthropic、OpenAI、Google、DeepSeek 等生产级 LLM 模型。一个 API key，一份发票，国内直连。',
    modelsTitle: (total: number) => `全部 ${total} 个模型 · TokenFleet`,
    modelsDescription: (total: number, vendorCount: number) =>
      `覆盖 ${vendorCount} 家厂商的 ${total} 个生产级 AI 模型。一个 endpoint 调用所有，按厂商筛选、按价格排序、查看官方简介与完整价格分解。`,
  },
  nav: {
    aria: '主导航',
    links: {
      models: '模型',
      docs: '文档',
      enterprise: '企业服务',
    },
    signIn: '登录',
    start: '开始接入',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
  },
  hero: {
    eyebrow: '统一模型 API',
    titlePrefix: '一个平台',
    titleRest: '调用多家主流模型。',
    bodyBefore: '通过 TokenFleet 聚合 Anthropic、OpenAI、Google、DeepSeek 等',
    bodyAfter: '个生产级 LLM 模型。一个 API key，一份发票，国内直连。',
    docs: '查看文档',
    trustAria: '平台特性',
    trustModels: (total: number) => `${total} 个生产级模型`,
    trustGateway: '统一 API 网关',
    trustDirect: '国内直连',
  },
  code: {
    aria: '代码示例语言',
    copy: '复制',
    copied: '已复制',
    copyFailed: '复制失败',
    prompt: '用一句话解释 RAG。',
    comment: '同样的请求体，换 base_url 即接入',
  },
  brandStrip: {
    title: '已接入的主流模型',
    aria: '平台已接入的 AI 厂商与模型',
  },
  featured: {
    eyebrow: '模型目录',
    title: (total: number) => `${total} 个生产级模型，\n一份计费。`,
    body: '全部走同一个 OpenAI 兼容 endpoint 与同一个对公账户。',
    viewAll: '查看全部模型',
    fallbackBlurb: '生产级模型接入',
    blurbs: {
      'claude-opus-4-7': 'Anthropic 旗舰推理模型',
      'claude-opus-4-8': 'Anthropic 新一代旗舰推理模型',
      'gpt-5.5': 'OpenAI 新一代旗舰模型',
      'gpt-5.6-terra': 'OpenAI Terra 高性能系列',
      'gemini-3.1-pro-preview': 'Google 前沿多模态预览',
      'gemini-2.5-pro': 'Google 稳定版多模态旗舰',
    },
    facts: {
      models: '生产级模型',
      vendors: '模型厂商',
      coverage: '覆盖类型',
      access: '统一接入',
      accessValue: 'OpenAI 兼容 endpoint',
      billing: '统一计费',
      billingValue: 'USD 结算 · 单一发票',
    },
  },
  product: {
    eyebrow: 'TokenFleet 产品线',
    title: '一条 endpoint，接入所有模型。',
    cards: [
      {
        eyebrow: '产品 01',
        title: '统一 API 网关',
        body: '生产级模型聚合在同一个 API 网关下。一个 API key，今天接入多家模型。',
        bullets: [
          '统一 endpoint 与 API key',
          '同账户、同对账、同发票',
          '国内直连，低延迟',
        ],
        cta: '查看支持的模型',
      },
    ],
  },
  why: {
    eyebrow: '为什么选择 TokenFleet',
    title: '为什么选 TokenFleet。',
    body: '四件可被验证的事，不是四条形容词。',
    cards: {
      modelsTitle: (total: number) => `${total} 个生产级模型，一个 endpoint`,
      modelsBody:
        '覆盖 LLM、图像、视频、音频，通过统一 API 网关完成调用、计量与对账。',
      moreModels: '更多生产级模型',
      vpcTitle: '私有部署 / VPC 直连',
      vpcBody:
        '用量到达一定规模可申请 VPC 直连 endpoint，请求不离开你的私网边界。',
      privateEgress: '不出私网',
      endpointTitle: '统一 endpoint 接入',
      endpointBody: '同一个 API key 调用多家模型，接入路径与用量记录保持一致。',
      endpointCaption: '每月 token 用量、错误率、模型分布 → 控制台一站可见。',
      latencyTitle: '国内直连，毫秒级延迟',
      latencyBody: '五大城市平均首字延迟（P50），按真实生产请求样本。',
      city: '城市',
      overseas: '海外直连',
      statusPrefix: '数据样本 2026-04 ·',
      statusLink: '查看 status',
    },
    cities: ['北京', '上海', '广州', '深圳', '杭州'],
  },
  enterprise: {
    eyebrow: '面向生产规模',
    title: '服务大规模生产用量。',
    body: '当 token 用量越过自服务的边界，我们与你的工程团队直接对接：单点接入、容量规划、独立路由、定制条款。',
    labels: [
      ['SLA', '企业级 SLA', '按用量等级与团队规模定制承诺，月度可对账。'],
      ['VPC', '私有部署 / VPC 直连', '请求不出私网边界。具体形态按规模商谈。'],
      ['SUPPORT', '专属技术对接', '7×24 中文工程支持渠道，故障一线响应。'],
    ],
    cta: '联系销售',
    note: '通常 24 小时内回复 · zhangyue@nyuncloud.com',
  },
  salesQr: {
    title: '联系 TokenFleet 销售',
    caption: '扫码加入微信社群，获取企业用量与接入支持。',
    alt: 'TokenFleet 微信社群 QR 码',
    close: '关闭销售二维码',
  },
  models: {
    eyebrow: '模型目录',
    title: (total: number) => `${total} 个生产级模型，\n一份 endpoint。`,
    body: (vendorCount: number) =>
      `覆盖 ${vendorCount} 家厂商的生产级模型，名称、模型 ID 与 TPM/RPM 限速一览。按厂商与类型筛选、按名称排序。`,
    statsModels: (total: number) => `${total}个模型`,
    statsVendors: (vendorCount: number) => `${vendorCount}家厂商`,
    statsEndpoints: 'OpenAI 兼容 endpoint',
    filterAria: '模型筛选',
    vendorAria: '按厂商筛选',
    typeAria: '按类型筛选',
    all: '全部',
    modalities: { chat: 'LLM', image: '图像', video: '视频', audio: '音频' },
    types: { language: '语言', multimodal: '多模态', video: '视频' },
    columns: {
      name: '模型名',
      id: '模型 ID',
      type: '类型',
      tpm: 'TPM',
      rpm: 'RPM',
    },
    searchLabel: '搜索模型名',
    searchPlaceholder: '搜索模型名',
    sortLabel: '排序',
    sortDefault: '默认顺序',
    sortNameAsc: '名称 A–Z',
    sortNameDesc: '名称 Z–A',
    counter: (shown: string | number, total: number) =>
      `${shown} / ${total} 个模型`,
    empty: '未找到匹配的模型。',
    reset: '清除筛选',
    copyId: '复制 model id',
  },
  footer: {
    tagline:
      '一站式 AI 模型 API 网关。一个 API key 接所有模型，一份对公账单结全部账。',
    follow: '关注我们',
    cols: {
      product: '产品',
      company: '公司',
      compliance: '合规',
    },
    links: {
      models: '模型目录',
      enterprise: '企业服务',
      status: '状态页',
      docs: '文档',
      blog: '博客',
      contactSales: '联系销售',
      console: '控制台',
      sla: 'SLA 咨询',
      icp: 'ICP 备案',
    },
    followItems: [
      ['微信社群', 'TokenFleet 微信社群 QR 码'],
      ['微信公众号', 'TokenFleet 微信公众号 QR 码'],
      ['抖音', 'TokenFleet 抖音 QR 码'],
    ],
    qrAria: (label: string) => `${label} QR 码`,
    companyName: '深圳市新云计算科技有限公司',
    icp: '粤ICP备2022003994号-6',
  },
} as const;

const enMessages = {
  htmlLang: 'en',
  localeName: 'English',
  languageLabel: 'Language',
  skipToMain: 'Skip to main content',
  homeAria: 'TokenFleet home',
  seo: {
    homeTitle: 'TokenFleet · One API key for leading AI models',
    homeDescription:
      'TokenFleet unifies production LLM models from Anthropic, OpenAI, Google, DeepSeek, and more behind one API gateway, one key, and one invoice.',
    modelsTitle: (total: number) => `All ${total} models · TokenFleet`,
    modelsDescription: (total: number, vendorCount: number) =>
      `Browse ${total} production AI models across ${vendorCount} vendors. Filter by vendor, sort by price, and inspect official descriptions and pricing details.`,
  },
  nav: {
    aria: 'Primary navigation',
    links: {
      models: 'Models',
      docs: 'Docs',
      enterprise: 'Enterprise',
    },
    signIn: 'Sign in',
    start: 'Start building',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    eyebrow: 'MODEL API · UNIFIED',
    titlePrefix: 'One platform',
    titleRest: 'for leading models.',
    bodyBefore:
      'TokenFleet aggregates production LLM models from Anthropic, OpenAI, Google, DeepSeek, and more:',
    bodyAfter:
      ' models through one API key, one invoice, and direct mainland connectivity.',
    docs: 'View docs',
    trustAria: 'Platform features',
    trustModels: (total: number) => `${total} production models`,
    trustGateway: 'Unified API gateway',
    trustDirect: 'Direct mainland routing',
  },
  code: {
    aria: 'Code sample language',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copy failed',
    prompt: 'Explain RAG in one sentence.',
    comment: 'Same request body, switch base_url to connect',
  },
  brandStrip: {
    title: 'POWERED BY THESE MODELS',
    aria: 'AI vendors and models connected to the platform',
  },
  featured: {
    eyebrow: 'MODELS GALLERY',
    title: (total: number) => `${total} production models,\none billing layer.`,
    body: 'All models share one OpenAI-compatible endpoint and one business account.',
    viewAll: 'View all models',
    fallbackBlurb: 'Production model access',
    blurbs: {
      'claude-opus-4-7': "Anthropic's flagship reasoning model",
      'claude-opus-4-8': "Anthropic's next-gen flagship reasoning model",
      'gpt-5.5': "OpenAI's next-gen flagship model",
      'gpt-5.6-terra': 'OpenAI Terra high-performance series',
      'gemini-3.1-pro-preview': "Google's frontier multimodal preview",
      'gemini-2.5-pro': "Google's stable multimodal flagship",
    },
    facts: {
      models: 'Production models',
      vendors: 'Vendors',
      coverage: 'Coverage',
      access: 'Unified access',
      accessValue: 'OpenAI-compatible endpoint',
      billing: 'Unified billing',
      billingValue: 'USD · single invoice',
    },
  },
  product: {
    eyebrow: 'WHAT TOKENFLEET SHIPS',
    title: 'One endpoint. Every model.',
    cards: [
      {
        eyebrow: 'PRODUCT 01',
        title: 'Unified API gateway',
        body: 'Production models are aggregated behind one API gateway. One API key connects your app to multiple vendors today.',
        bullets: [
          'Unified endpoint and API key',
          'One account, reconciliation, and invoice',
          'Direct mainland routing with lower latency',
        ],
        cta: 'View supported models',
      },
    ],
  },
  why: {
    eyebrow: 'WHY TOKENFLEET',
    title: 'Why TokenFleet.',
    body: 'Four verifiable capabilities, not four adjectives.',
    cards: {
      modelsTitle: (total: number) =>
        `${total} production models, one endpoint`,
      modelsBody:
        'LLM, image, video, and audio calls run through one API gateway for execution, metering, and reconciliation.',
      moreModels: 'more production models',
      vpcTitle: 'Private deployment / VPC direct connect',
      vpcBody:
        'At scale, teams can request a VPC endpoint so traffic stays inside their private network boundary.',
      privateEgress: 'private egress only',
      endpointTitle: 'Unified endpoint integration',
      endpointBody:
        'One API key can call multiple model providers while keeping integration paths and usage records consistent.',
      endpointCaption:
        'Monthly token usage, error rates, and model mix are visible in one console.',
      latencyTitle: 'Direct mainland routing, millisecond latency',
      latencyBody:
        'Average time to first token (P50) across five cities from production samples.',
      city: 'City',
      overseas: 'Overseas direct',
      statusPrefix: 'Sample window 2026-04 ·',
      statusLink: 'View status',
    },
    cities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hangzhou'],
  },
  enterprise: {
    eyebrow: 'FOR PRODUCTION SCALE',
    title: 'Built for large-scale production usage.',
    body: 'When token usage outgrows self-serve limits, we work directly with your engineering team on single-entry integration, capacity planning, dedicated routing, and custom terms.',
    labels: [
      [
        'SLA',
        'Enterprise SLA',
        'Commitments are tailored by usage tier and team size, with monthly reconciliation.',
      ],
      [
        'VPC',
        'Private deployment / VPC direct connect',
        'Requests can stay inside your private network boundary. Final shape depends on scale.',
      ],
      [
        'SUPPORT',
        'Dedicated technical contact',
        '7x24 Chinese engineering support channel with front-line incident response.',
      ],
    ],
    cta: 'Contact sales',
    note: 'Usually replies within 24 hours · zhangyue@nyuncloud.com',
  },
  salesQr: {
    title: 'Contact TokenFleet sales',
    caption:
      'Scan to join the WeChat group for enterprise usage and integration support.',
    alt: 'TokenFleet WeChat group QR code',
    close: 'Close sales QR code',
  },
  models: {
    eyebrow: 'MODELS CATALOG',
    title: (total: number) => `${total} production models,\none endpoint.`,
    body: (vendorCount: number) =>
      `Production models across ${vendorCount} vendors — names, model IDs, and TPM/RPM rate limits at a glance. Filter by vendor and type, sort by name.`,
    statsModels: (total: number) => `${total} models`,
    statsVendors: (vendorCount: number) => `${vendorCount} vendors`,
    statsEndpoints: 'OpenAI-compatible endpoint',
    filterAria: 'Model filters',
    vendorAria: 'Filter by vendor',
    typeAria: 'Filter by type',
    all: 'All',
    modalities: {
      chat: 'LLM',
      image: 'Image',
      video: 'Video',
      audio: 'Audio',
    },
    types: { language: 'Language', multimodal: 'Multimodal', video: 'Video' },
    columns: {
      name: 'Model',
      id: 'Model ID',
      type: 'Type',
      tpm: 'TPM',
      rpm: 'RPM',
    },
    searchLabel: 'Search model name',
    searchPlaceholder: 'Search model name',
    sortLabel: 'Sort',
    sortDefault: 'Default order',
    sortNameAsc: 'Name A–Z',
    sortNameDesc: 'Name Z–A',
    counter: (shown: string | number, total: number) =>
      `${shown} / ${total} models`,
    empty: 'No matching models.',
    reset: 'Clear filters',
    copyId: 'Copy model id',
  },
  footer: {
    tagline:
      'A one-stop AI model API gateway. One API key connects every model, and one business invoice settles usage.',
    follow: 'Follow',
    cols: {
      product: 'Product',
      company: 'Company',
      compliance: 'Compliance',
    },
    links: {
      models: 'Models',
      enterprise: 'Enterprise',
      status: 'Status',
      docs: 'Docs',
      blog: 'Blog',
      contactSales: 'Contact Sales',
      console: 'Console',
      sla: 'SLA inquiry',
      icp: 'ICP filing',
    },
    followItems: [
      ['WeChat group', 'TokenFleet WeChat group QR code'],
      ['WeChat official account', 'TokenFleet WeChat official account QR code'],
      ['Douyin', 'TokenFleet Douyin QR code'],
    ],
    qrAria: (label: string) => `${label} QR code`,
    companyName: 'Shenzhen Xinyun Computing Technology Co., Ltd.',
    icp: '粤ICP备2022003994号-6',
  },
} as const;

const jaMessages = {
  ...enMessages,
  htmlLang: 'ja',
  localeName: '日本語',
  languageLabel: '言語',
  skipToMain: 'メインコンテンツへ移動',
  homeAria: 'TokenFleet ホーム',
  seo: {
    homeTitle: 'TokenFleet · 主要AIモデルを1つのAPIキーで',
    homeDescription:
      'TokenFleetはAnthropic、OpenAI、Google、DeepSeekなどの本番向けLLMモデルを、1つのAPIゲートウェイ、1つのキー、1つの請求に統合します。',
    modelsTitle: (total: number) => `全${total}モデル · TokenFleet`,
    modelsDescription: (total: number, vendorCount: number) =>
      `${vendorCount}社の${total}個の本番向けAIモデルを閲覧できます。ベンダーで絞り込み、価格で並べ替え、公式説明と価格詳細を確認できます。`,
  },
  nav: {
    ...enMessages.nav,
    aria: 'メインナビゲーション',
    links: {
      models: 'モデル',
      docs: 'ドキュメント',
      enterprise: 'エンタープライズ',
    },
    signIn: 'ログイン',
    start: '利用開始',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
  },
  hero: {
    ...enMessages.hero,
    eyebrow: '統合モデルAPI',
    titlePrefix: '1つのプラットフォームで',
    titleRest: '主要モデルを呼び出す。',
    bodyBefore:
      'TokenFleetはAnthropic、OpenAI、Google、DeepSeekなどの本番向けLLMモデルを集約します:',
    bodyAfter:
      ' 個のモデルを、1つのAPIキー、1つの請求、安定した接続で利用できます。',
    docs: 'ドキュメントを見る',
    trustAria: 'プラットフォーム機能',
    trustModels: (total: number) => `${total}個の本番向けモデル`,
    trustGateway: '統合APIゲートウェイ',
    trustDirect: '安定した接続',
  },
  code: {
    aria: 'コード例の言語',
    copy: 'コピー',
    copied: 'コピー済み',
    copyFailed: 'コピーに失敗しました',
    prompt: 'RAGを一文で説明してください。',
    comment: '同じリクエスト本文で、base_urlを変えるだけで接続',
  },
  brandStrip: {
    title: '接続済みの主要モデル',
    aria: 'プラットフォームに接続済みのAIベンダーとモデル',
  },
  featured: {
    ...enMessages.featured,
    eyebrow: 'モデルカタログ',
    title: (total: number) =>
      `${total}個の本番向けモデルを\n1つの請求レイヤーで。`,
    body: 'すべてのモデルは1つのOpenAI互換エンドポイントと1つのビジネスアカウントで利用できます。',
    viewAll: 'すべてのモデルを見る',
    fallbackBlurb: '本番向けモデル接続',
    blurbs: {
      'claude-opus-4-7': 'Anthropicのフラッグシップ推論モデル',
      'claude-opus-4-8': 'Anthropicの次世代フラッグシップ推論モデル',
      'gpt-5.5': 'OpenAIの次世代フラッグシップモデル',
      'gpt-5.6-terra': 'OpenAI Terra 高性能シリーズ',
      'gemini-3.1-pro-preview': 'Googleの最前線マルチモーダルプレビュー',
      'gemini-2.5-pro': 'Googleの安定版マルチモーダルフラッグシップ',
    },
    facts: {
      models: '本番向けモデル',
      vendors: 'ベンダー',
      coverage: '対応種類',
      access: '統一接続',
      accessValue: 'OpenAI 互換エンドポイント',
      billing: '統一請求',
      billingValue: 'USD 決済 · 単一請求書',
    },
  },
  product: {
    eyebrow: 'TokenFleetのプロダクト',
    title: '1つのエンドポイントで、すべてのモデルへ。',
    cards: [
      {
        eyebrow: 'PRODUCT 01',
        title: '統合APIゲートウェイ',
        body: '本番向けモデルを1つのAPIゲートウェイに集約。1つのAPIキーで複数ベンダーのモデルに接続できます。',
        bullets: [
          '統一されたエンドポイントとAPIキー',
          '1つのアカウント、照合、請求書',
          '安定した低遅延接続',
        ],
        cta: '対応モデルを見る',
      },
    ],
  },
  why: {
    ...enMessages.why,
    eyebrow: 'TokenFleetを選ぶ理由',
    title: 'TokenFleetを選ぶ理由。',
    body: '形容詞ではなく、検証可能な4つの機能。',
    cards: {
      modelsTitle: (total: number) =>
        `${total}個の本番向けモデル、1つのエンドポイント`,
      modelsBody:
        'LLM、画像、動画、音声の呼び出しを1つのAPIゲートウェイで実行、計量、照合します。',
      moreModels: 'さらに多くの本番向けモデル',
      vpcTitle: 'プライベートデプロイ / VPC直結',
      vpcBody:
        '大規模利用では、トラフィックをプライベートネットワーク境界内に保つVPCエンドポイントを申請できます。',
      privateEgress: 'プライベート経路のみ',
      endpointTitle: '統一エンドポイント連携',
      endpointBody:
        '1つのAPIキーで複数のモデルプロバイダーを呼び出し、連携経路と利用記録を一貫させます。',
      endpointCaption:
        '月次トークン使用量、エラー率、モデル構成を1つのコンソールで確認できます。',
      latencyTitle: '安定した低遅延ルーティング',
      latencyBody:
        '5都市における初回トークンまでの平均時間（P50）、本番サンプルに基づきます。',
      city: '都市',
      overseas: '海外直結',
      statusPrefix: 'サンプル期間 2026-04 ·',
      statusLink: 'ステータスを見る',
    },
    cities: ['北京', '上海', '広州', '深セン', '杭州'],
  },
  enterprise: {
    eyebrow: '本番規模向け',
    title: '大規模な本番利用に対応。',
    body: 'トークン使用量がセルフサービスの範囲を超えたら、エンジニアリングチームと直接連携し、単一入口の連携、容量計画、専用ルーティング、カスタム条件を設計します。',
    labels: [
      [
        'SLA',
        'エンタープライズSLA',
        '利用階層とチーム規模に応じてコミットメントを調整し、月次で照合できます。',
      ],
      [
        'VPC',
        'プライベートデプロイ / VPC直結',
        'リクエストをプライベートネットワーク境界内に保てます。最終形態は規模により決まります。',
      ],
      [
        'SUPPORT',
        '専任技術窓口',
        '中国語エンジニアリングサポートチャネルで障害に一次対応します。',
      ],
    ],
    cta: '営業に問い合わせる',
    note: '通常24時間以内に返信 · zhangyue@nyuncloud.com',
  },
  salesQr: {
    title: 'TokenFleet営業に問い合わせる',
    caption:
      'WeChatグループに参加して、エンタープライズ利用と連携サポートを受けられます。',
    alt: 'TokenFleet WeChatグループQRコード',
    close: '営業QRコードを閉じる',
  },
  models: {
    ...enMessages.models,
    eyebrow: 'モデルカタログ',
    title: (total: number) =>
      `${total}個の本番向けモデル、\n1つのエンドポイント。`,
    body: (vendorCount: number) =>
      `${vendorCount}社のモデルを名前・モデル ID・TPM/RPMレート制限で一覧。ベンダーと種類で絞り込み、名前順で並べ替え。`,
    statsModels: (total: number) => `${total}個のモデル`,
    statsVendors: (vendorCount: number) => `${vendorCount}社のベンダー`,
    statsEndpoints: 'OpenAI互換エンドポイント',
    filterAria: 'モデルフィルター',
    vendorAria: 'ベンダーで絞り込み',
    typeAria: '種類で絞り込み',
    all: 'すべて',
    modalities: { chat: 'LLM', image: '画像', video: '動画', audio: '音声' },
    types: { language: '言語', multimodal: 'マルチモーダル', video: '動画' },
    columns: {
      name: 'モデル名',
      id: 'モデル ID',
      type: '種類',
      tpm: 'TPM',
      rpm: 'RPM',
    },
    searchLabel: 'モデル名を検索',
    searchPlaceholder: 'モデル名を検索',
    sortLabel: '並び替え',
    sortDefault: '標準順',
    sortNameAsc: '名前 A–Z',
    sortNameDesc: '名前 Z–A',
    counter: (shown: string | number, total: number) =>
      `${shown} / ${total}モデル`,
    empty: '一致するモデルがありません。',
    reset: 'フィルターをクリア',
    copyId: 'model idをコピー',
  },
  footer: {
    ...enMessages.footer,
    tagline:
      'ワンストップのAIモデルAPIゲートウェイ。1つのAPIキーですべてのモデルに接続し、1つの法人請求で精算できます。',
    follow: 'フォロー',
    cols: {
      product: 'プロダクト',
      company: '会社',
      compliance: 'コンプライアンス',
    },
    links: {
      models: 'モデル',
      enterprise: 'エンタープライズ',
      status: 'ステータス',
      docs: 'ドキュメント',
      blog: 'ブログ',
      contactSales: '営業に問い合わせる',
      console: 'コンソール',
      sla: 'SLA相談',
      icp: 'ICP登録',
    },
    followItems: [
      ['WeChatグループ', 'TokenFleet WeChatグループQRコード'],
      ['WeChat公式アカウント', 'TokenFleet WeChat公式アカウントQRコード'],
      ['Douyin', 'TokenFleet Douyin QRコード'],
    ],
    qrAria: (label: string) => `${label} QRコード`,
    companyName: '深圳市新云计算科技有限公司',
    icp: '粤ICP备2022003994号-6',
  },
} as const;

const koMessages = {
  ...enMessages,
  htmlLang: 'ko',
  localeName: '한국어',
  languageLabel: '언어',
  skipToMain: '본문으로 이동',
  homeAria: 'TokenFleet 홈',
  seo: {
    homeTitle: 'TokenFleet · 주요 AI 모델을 하나의 API 키로',
    homeDescription:
      'TokenFleet은 Anthropic, OpenAI, Google, DeepSeek 등의 프로덕션 LLM 모델을 하나의 API 게이트웨이, 하나의 키, 하나의 청구서로 통합합니다.',
    modelsTitle: (total: number) => `전체 ${total}개 모델 · TokenFleet`,
    modelsDescription: (total: number, vendorCount: number) =>
      `${vendorCount}개 벤더의 ${total}개 프로덕션 AI 모델을 둘러보세요. 벤더별 필터링, 가격 정렬, 공식 설명과 가격 상세 확인을 지원합니다.`,
  },
  nav: {
    ...enMessages.nav,
    aria: '기본 내비게이션',
    links: {
      models: '모델',
      docs: '문서',
      enterprise: '엔터프라이즈',
    },
    signIn: '로그인',
    start: '시작하기',
    openMenu: '메뉴 열기',
    closeMenu: '메뉴 닫기',
  },
  hero: {
    ...enMessages.hero,
    eyebrow: '통합 모델 API',
    titlePrefix: '하나의 플랫폼으로',
    titleRest: '주요 모델을 호출하세요.',
    bodyBefore:
      'TokenFleet은 Anthropic, OpenAI, Google, DeepSeek 등 프로덕션 LLM 모델을 통합합니다:',
    bodyAfter:
      '개 모델을 하나의 API 키, 하나의 청구서, 안정적인 연결로 사용할 수 있습니다.',
    docs: '문서 보기',
    trustAria: '플랫폼 기능',
    trustModels: (total: number) => `${total}개 프로덕션 모델`,
    trustGateway: '통합 API 게이트웨이',
    trustDirect: '안정적인 연결',
  },
  code: {
    aria: '코드 예제 언어',
    copy: '복사',
    copied: '복사됨',
    copyFailed: '복사 실패',
    prompt: 'RAG를 한 문장으로 설명해 주세요.',
    comment: '같은 요청 본문에서 base_url만 바꾸면 연결됩니다',
  },
  brandStrip: {
    title: '연결된 주요 모델',
    aria: '플랫폼에 연결된 AI 벤더와 모델',
  },
  featured: {
    ...enMessages.featured,
    eyebrow: '모델 카탈로그',
    title: (total: number) => `${total}개 프로덕션 모델,\n하나의 청구 레이어.`,
    body: '모든 모델은 하나의 OpenAI 호환 엔드포인트와 하나의 비즈니스 계정을 공유합니다.',
    viewAll: '모든 모델 보기',
    fallbackBlurb: '프로덕션 모델 접속',
    blurbs: {
      'claude-opus-4-7': 'Anthropic 플래그십 추론 모델',
      'claude-opus-4-8': 'Anthropic 차세대 플래그십 추론 모델',
      'gpt-5.5': 'OpenAI 차세대 플래그십 모델',
      'gpt-5.6-terra': 'OpenAI Terra 고성능 시리즈',
      'gemini-3.1-pro-preview': 'Google 최전선 멀티모달 프리뷰',
      'gemini-2.5-pro': 'Google 안정형 멀티모달 플래그십',
    },
    facts: {
      models: '프로덕션 모델',
      vendors: '벤더',
      coverage: '지원 유형',
      access: '통합 접속',
      accessValue: 'OpenAI 호환 엔드포인트',
      billing: '통합 청구',
      billingValue: 'USD 결제 · 단일 인보이스',
    },
  },
  product: {
    eyebrow: 'TokenFleet 제품군',
    title: '하나의 엔드포인트로 모든 모델에 연결.',
    cards: [
      {
        eyebrow: 'PRODUCT 01',
        title: '통합 API 게이트웨이',
        body: '프로덕션 모델을 하나의 API 게이트웨이 뒤에 통합합니다. 하나의 API 키로 여러 벤더의 모델에 바로 연결할 수 있습니다.',
        bullets: [
          '통합 엔드포인트와 API 키',
          '하나의 계정, 정산, 청구서',
          '안정적인 저지연 연결',
        ],
        cta: '지원 모델 보기',
      },
    ],
  },
  why: {
    ...enMessages.why,
    eyebrow: 'TokenFleet을 선택하는 이유',
    title: 'TokenFleet을 선택하는 이유.',
    body: '형용사가 아니라 검증 가능한 네 가지 기능입니다.',
    cards: {
      modelsTitle: (total: number) =>
        `${total}개 프로덕션 모델, 하나의 엔드포인트`,
      modelsBody:
        'LLM, 이미지, 비디오, 오디오 호출을 하나의 API 게이트웨이에서 실행, 계량, 정산합니다.',
      moreModels: '더 많은 프로덕션 모델',
      vpcTitle: '프라이빗 배포 / VPC 직접 연결',
      vpcBody:
        '대규모 사용 시 트래픽이 사설 네트워크 경계를 벗어나지 않도록 VPC 엔드포인트를 요청할 수 있습니다.',
      privateEgress: '프라이빗 경로만 사용',
      endpointTitle: '통합 엔드포인트 연동',
      endpointBody:
        '하나의 API 키로 여러 모델 제공자를 호출하면서 연동 경로와 사용 기록을 일관되게 유지합니다.',
      endpointCaption:
        '월간 토큰 사용량, 오류율, 모델 구성은 하나의 콘솔에서 확인할 수 있습니다.',
      latencyTitle: '안정적인 저지연 라우팅',
      latencyBody:
        '5개 도시의 첫 토큰까지 평균 시간(P50), 실제 프로덕션 샘플 기준입니다.',
      city: '도시',
      overseas: '해외 직접 연결',
      statusPrefix: '샘플 기간 2026-04 ·',
      statusLink: '상태 보기',
    },
    cities: ['베이징', '상하이', '광저우', '선전', '항저우'],
  },
  enterprise: {
    eyebrow: '프로덕션 규모용',
    title: '대규모 프로덕션 사용량을 위해 구축.',
    body: '토큰 사용량이 셀프서비스 범위를 넘어서면 엔지니어링 팀과 직접 협업해 단일 진입 연동, 용량 계획, 전용 라우팅, 맞춤 조건을 설계합니다.',
    labels: [
      [
        'SLA',
        '엔터프라이즈 SLA',
        '사용량 등급과 팀 규모에 맞춰 약정을 조정하고 월별 정산을 지원합니다.',
      ],
      [
        'VPC',
        '프라이빗 배포 / VPC 직접 연결',
        '요청을 사설 네트워크 경계 안에 유지할 수 있습니다. 최종 형태는 규모에 따라 결정됩니다.',
      ],
      [
        'SUPPORT',
        '전담 기술 담당자',
        '중국어 엔지니어링 지원 채널로 장애에 1차 대응합니다.',
      ],
    ],
    cta: '영업 문의',
    note: '보통 24시간 이내 회신 · zhangyue@nyuncloud.com',
  },
  salesQr: {
    title: 'TokenFleet 영업 문의',
    caption:
      'WeChat 그룹에 참여해 엔터프라이즈 사용량과 연동 지원을 받아보세요.',
    alt: 'TokenFleet WeChat 그룹 QR 코드',
    close: '영업 QR 코드 닫기',
  },
  models: {
    ...enMessages.models,
    eyebrow: '모델 카탈로그',
    title: (total: number) => `${total}개 프로덕션 모델,
하나의 엔드포인트.`,
    body: (vendorCount: number) =>
      `${vendorCount}개 벤더의 모델을 이름·모델 ID·TPM/RPM 레이트 리미트로 한눈에. 벤더와 유형으로 필터, 이름순 정렬.`,
    statsModels: (total: number) => `${total}개 모델`,
    statsVendors: (vendorCount: number) => `${vendorCount}개 벤더`,
    statsEndpoints: 'OpenAI 호환 엔드포인트',
    filterAria: '모델 필터',
    vendorAria: '벤더별 필터',
    typeAria: '유형별 필터',
    all: '전체',
    modalities: {
      chat: 'LLM',
      image: '이미지',
      video: '비디오',
      audio: '오디오',
    },
    types: { language: '언어', multimodal: '멀티모달', video: '비디오' },
    columns: {
      name: '모델명',
      id: '모델 ID',
      type: '유형',
      tpm: 'TPM',
      rpm: 'RPM',
    },
    searchLabel: '모델명 검색',
    searchPlaceholder: '모델명 검색',
    sortLabel: '정렬',
    sortDefault: '기본 순서',
    sortNameAsc: '이름 A–Z',
    sortNameDesc: '이름 Z–A',
    counter: (shown: string | number, total: number) =>
      `${shown} / ${total}개 모델`,
    empty: '일치하는 모델이 없습니다.',
    reset: '필터 초기화',
    copyId: 'model id 복사',
  },
  footer: {
    ...enMessages.footer,
    tagline:
      '원스톱 AI 모델 API 게이트웨이. 하나의 API 키로 모든 모델에 연결하고 하나의 법인 청구서로 정산합니다.',
    follow: '팔로우',
    cols: { product: '제품', company: '회사', compliance: '컴플라이언스' },
    links: {
      models: '모델',
      enterprise: '엔터프라이즈',
      status: '상태',
      docs: '문서',
      blog: '블로그',
      contactSales: '영업 문의',
      console: '콘솔',
      sla: 'SLA 문의',
      icp: 'ICP 등록',
    },
    followItems: [
      ['WeChat 그룹', 'TokenFleet WeChat 그룹 QR 코드'],
      ['WeChat 공식 계정', 'TokenFleet WeChat 공식 계정 QR 코드'],
      ['Douyin', 'TokenFleet Douyin QR 코드'],
    ],
    qrAria: (label: string) => `${label} QR 코드`,
    companyName: '深圳市新云计算科技有限公司',
    icp: '粤ICP备2022003994号-6',
  },
} as const;

export const i18n = {
  zh: zhMessages,
  en: enMessages,
  ja: jaMessages,
  ko: koMessages,
} as const;

export type Messages = (typeof i18n)[Locale];
