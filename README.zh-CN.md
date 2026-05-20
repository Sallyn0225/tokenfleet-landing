<p align="center">
  <img src="public/xy-logo-transparent.png" alt="TokenFleet" width="160" />
</p>

# TokenFleet Landing

简体中文 | [English](README.md)

TokenFleet Landing 是 **TokenFleet** 的公开 Astro 站点。它以中文为主，面向工程团队与企业采购读者，传达“一把 API key、OpenAI 兼容接入、统一计费、统一开票，并覆盖 LLM、图像、视频、音频模型目录”的产品定位。

> [!NOTE]
> 这个仓库包含静态官网与模型目录页面，不包含 TokenFleet API 服务端或控制台应用。

## 亮点

- **Astro 6 静态站点**，客户端脚本保持克制，不引入前端框架运行时。
- **中文优先的产品叙事**，同时服务 CTO、工程师、企业财务与采购决策。
- **OpenAI SDK 兼容性展示**，首屏提供可复制的 `curl`、Python、Node 示例。
- **静态模型目录** 位于 `/models`，当前由 `pricing-api.json` 构建，覆盖 **34 个模型**、**7 家厂商**，并包含 OpenAI / Anthropic / Gemini endpoint 元数据。
- **目录交互完整**，支持厂商筛选、形态筛选、搜索、按价格排序、URL 状态同步、模型详情弹窗与 model id 复制。
- **企业能力表达**，覆盖统一计费、增值税发票、VPC/私有部署、SLA 沟通与 GPU 算力出租 Coming Soon。
- **关注可访问性**，包含 skip link、键盘可用的代码 tab、可见焦点态、响应式布局与 reduced-motion 处理。

## 技术栈

- [Astro](https://astro.build/) 6
- 支持 TypeScript 的 Astro 组件
- Plain CSS，按全局样式、设计 token、按钮样式拆分
- Vanilla browser JavaScript，用于导航、reveal 动画、代码 tab 与模型目录交互
- 静态资源放在 `public/`

## 快速开始

### 环境要求

- Node.js 20 或更高版本
- npm

### 安装依赖

```sh
npm install
```

### 本地开发

```sh
npm run dev
```

Astro 会在终端输出本地开发地址，通常是 `http://localhost:4321`。

### 生产构建

```sh
npm run build
```

### 本地预览构建产物

```sh
npm run preview
```

## 可用脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动 Astro 开发服务器。 |
| `npm run build` | 构建静态站点到 `dist/`。 |
| `npm run preview` | 以 host 绑定方式本地预览生产构建。 |
| `npm run astro` | 直接运行 Astro CLI 命令。 |

## 页面路由

| 路由 | 用途 |
| --- | --- |
| `/` | 产品落地页，包含首屏、精选模型、计费、商务与企业部署区块。 |
| `/models` | 基于价格快照构建的全量模型静态目录。 |

## 项目结构

```text
docs/              产品与设计规划文档
public/            静态图片、favicon、Open Graph 资源与品牌标识
src/components/    页面区块与可复用 Astro 组件
src/data/          精选模型数据、目录元信息与价格工具
src/layouts/       共享 HTML 外壳与元信息
src/pages/         Astro 路由
src/styles/        全局样式、设计 token、按钮样式
```

## 关键文件

- `src/pages/index.astro` 负责组合主落地页。
- `src/pages/models.astro` 渲染模型目录页。
- `src/data/pricing.ts` 导入 `pricing-api.json`，处理厂商映射、价格格式化、模型形态识别与静态目录导出。
- `src/components/ModelsExplorer.astro` 实现筛选、排序、搜索、URL 状态和模型弹窗联动。
- `src/components/ModelDialog.astro` 为共享 `<dialog>` 预渲染模型详情 HTML。
- `src/layouts/Base.astro` 定义 metadata、favicon、canonical、全局样式、skip link 与 reveal 行为。
- `PRODUCT.md`、`DESIGN.md`、`docs/design-brief.md` 记录页面背后的产品与设计决策。

## 更新模型价格

模型目录在构建时读取仓库根目录的 `pricing-api.json` 快照；该文件预期与 `https://tokenfleet.cn/api/pricing` 保持一致。

1. 从 API 刷新 `pricing-api.json`。
2. 检查 `src/data/pricing.ts` 是否仍正确处理新增厂商、模型形态、endpoint 类型与 icon slug。
3. 运行 `npm run build` 验证静态目录。

## 部署说明

站点在 `astro.config.mjs` 中配置了：

- `site: 'https://tokenfleet.cn'`
- `trailingSlash: 'never'`
- 压缩 HTML 输出
- 构建资源输出到 `_assets`

生产构建产物会写入 `dist/`，可以部署到任意静态托管平台。
