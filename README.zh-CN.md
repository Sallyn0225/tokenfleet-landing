<p align="center">
  <img src="public/xy-logo-transparent.png" alt="TokenFleet" width="160" />
</p>

# TokenFleet Landing

简体中文 | [English](README.md)

TokenFleet Landing 是 **TokenFleet** 的生产级 Astro 落地页。页面以中文为主，面向工程负责人、CTO、全栈开发者，以及企业采购、财务、法务读者，传达“一套 OpenAI 兼容接口接入主流 LLM、图像、视频、音频模型，并统一计费、开票与企业对接”的产品定位。

> [!NOTE]
> 这个仓库只包含官网落地页，不包含 TokenFleet API 服务端或控制台应用。

## 亮点

- **Astro 6 静态站点**，客户端脚本保持克制。
- **中文优先的产品叙事**，同时服务工程选型与企业采购决策。
- **OpenAI SDK 兼容性展示**，首屏提供可复制的 `curl`、Python、Node 示例。
- **模型与产品信息完整**，覆盖 34 个生产级模型、统一计费、增值税发票、VPC/私有部署、SLA 咨询与 GPU 算力出租 Coming Soon。
- **TokenFleet 视觉系统**，使用 atmospheric mesh、indigo CTA、cream 商务区块与单一 enterprise dark band。
- **关注可访问性**，包含 skip link、键盘可用的代码 tab、可见焦点态、响应式布局与 reduced-motion 处理。

## 技术栈

- [Astro](https://astro.build/) 6
- 支持 TypeScript 的 Astro 组件
- Plain CSS，按全局样式、设计 token、按钮样式拆分
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

## 项目结构

```text
docs/              产品与设计规划文档
public/            静态图片、favicon、Open Graph 资源
src/components/    页面区块与可复用 Astro 组件
src/data/          落地页模型数据
src/layouts/       共享 HTML 外壳与元信息
src/pages/         Astro 路由
src/styles/        全局样式、设计 token、按钮样式
```

## 关键文件

- `src/pages/index.astro` 负责组合完整落地页。
- `src/layouts/Base.astro` 定义 metadata、favicon、canonical、全局样式、skip link 与 reveal 行为。
- `src/components/CodeBlock.astro` 实现首屏代码 tab 与复制交互。
- `src/data/models.ts` 存放精选模型数据与模型总数。
- `PRODUCT.md`、`DESIGN.md`、`docs/design-brief.md` 记录页面背后的产品、品牌与设计决策。

## 部署说明

站点在 `astro.config.mjs` 中配置了：

- `site: 'https://tokenfleet.cn'`
- `trailingSlash: 'never'`
- 压缩 HTML 输出
- 构建资源输出到 `_assets`

生产构建产物会写入 `dist/`，可以部署到任意静态托管平台。
