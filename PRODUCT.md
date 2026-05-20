# Product

## Register

brand

## Users

**主要用户：AI 应用创业团队的工程负责人 / CTO / 全栈开发者。**

他们的处境：在为 AI 产品做技术选型，需要同时调用海外大语言模型（OpenAI、Anthropic、Google）和图像 / 视频生成模型（Stable Diffusion、Flux、Sora 等）。直接对接每家厂商意味着多账号、多 SDK、多套计费、跨境支付与不稳定的访问链路。他们来到落地页时通常处于"评估期"——已经知道自己需要中转 / 聚合方案，正在 30 秒内判断这家是否值得注册 API key 跑一个 demo。

**第二读者层：企业采购 / 财务 / 法务决策者。**

他们的处境：工程师把 TokenFleet 推到内部技术选型流程之后，财务和采购要在合同层、票据层、合规层确认它能进入对公账户体系。他们的关切是：能不能开人民币增值税专用发票、合同主体是不是中国大陆公司、多人协作的账户与权限是否清晰、用量异常是否有预警、是否能签 SLA。落地页对这一层读者的承诺必须与对工程师的承诺同等可验证。

次要场景：已经在用某家中转服务、对稳定性或模型覆盖度不满意、正在比价的开发者。

## Product Purpose

**TokenFleet** 是一站式 AI 模型 API 网关，把全球主流大语言模型、图像生成模型、视频生成模型聚合成单一接口与单一计费账户。

产品的双重承诺：

- **对工程师**：一个 endpoint、OpenAI SDK 兼容、国内直连、34 个生产级模型、可复制即跑的代码示例。
- **对企业采购 / 财务**：单一对公账户、人民币结算、统一增值税发票、可签合同与 SLA、多人协作权限、用量与对账面板。

落地页的成功标准（按优先级）：

1. 让访客在首屏 5 秒内理解"一个 API key 接所有模型"这件事，不需要往下滚才明白业务定位。
2. 通过可信号（真实模型清单、可复制代码示例、诚实的 SLA 与定价档位、企业级合同 / 发票 / VPC 能力）让工程决策者愿意点击"开始接入"、让采购愿意预约销售。
3. 在视觉质感上跨入 Stripe / Vercel 级金融基础设施品牌区间，离开"国产 AI 中转站"廉价感，让访客的第一直觉是"这家可以签合同 / 对公付款 / 进采购名单"。

## Brand Personality

**三词概括：专业、理性、可靠。**

- **专业**：每一句话都经得起工程师审视。模型版本号、延迟数字、SLA 百分比要真实可核对，不写"快如闪电"这类形容词。
- **理性**：用结构化信息（表格、benchmark、code block、定价档位、合同条款摘要）说话，比用情绪化文案更可信。
- **可靠**：视觉上拒绝任何"营销冲动"——没有"立即抢购"式按钮、没有"提升 300% 效率"式数字大字报、没有客服弹窗 + 二维码加群式低端转化诱导。气场上等同于 Stripe 落地页那种"放心把生意头寸交给我们"的克制底气。

**声音与语气：** 第二人称中文，简短陈述句。技术名词、产品名、API 调用、模型 id、价格单位保留英文原貌。绝不使用感叹号、问号营销标题（"还在为 XX 烦恼吗？"）、emoji。

**视觉氛围基调：** 接受 Stripe 风格的 atmospheric gradient mesh、indigo 主色、Sohne thin 编辑级排版作为品牌锚点。mesh 是品牌信号、不是装饰冲动；indigo 是 CTA 信号、不是炫技。所有视觉元素必须能用一句话回答"它对产品理解 / 工程信任 / 采购决策有什么贡献"。

## Anti-references

**绝对不要看起来像下列任何一种：**

- **国产 SaaS 交付站典型形态**：首页底部一整片 logo wall 配"已服务 10000+ 企业"、客服悬浮气泡、强制扫码加群入口、"立即咨询"红色按钮、"行业头部 100 家企业的共同选择"式社会证明拼贴。
- **赛博 / Web3 风**：荧光霓虹色、振荡 / 故障文字效果、过于喧哗的滚动反向特效、暗黑配电音感视觉。
- **AI 工具站典型廉价模板**："Powered by AI" 徽章、自动播放的视频背景、"Try for free" 闪烁按钮、"7 天免费、随时取消"式焦虑营销、生成式插画拼贴风首图。
- **企业官网式拘谨**：满屏 stock photo（西装握手、地球网格、电路板）、过度对称的三栏 feature grid 配 outline icon 的死板组合、深蓝"科技感"配色 + 中文宋体大标题的政府门户感。
- **AI 中转站集体识别**：任何让访客一眼看上去能猜到是"国内 AI 模型中转站"的视觉语言——例如紫粉星空模板 + Powered by GPT 徽章 + "对接全球 100+ 模型"红色横幅。

简而言之：禁的是廉价信号、营销冲动、政府门户拘谨这三类气场，不是禁某个具体的视觉技法（gradient mesh、dark band、大字号 hero 在 Stripe / Vercel / Anthropic 等可信品牌上都合理出现）。判断标准是：把同样的元素放到 stripe.com / vercel.com / anthropic.com 上是否依然成立。

## Design Principles

1. **Show the integration, don't slogan it.** 一站式不靠口号证明，靠"一段代码、一个 endpoint、三家厂商模型并列"的可视事实证明。任何抽象口号必须紧跟一个可读的具体例子。

2. **Engineer credibility AND finance credibility.** 这个落地页的读者会按 F12 查 Network、会复制 curl 来跑；同时也会问"开不开专票、签不签合同、有没有 SLA"。每一个数字、代码、模型版本号必须对工程师可验证；每一个发票 / 合同 / 主体 / 备案信息必须对采购可核对。两层可信度同时成立才是 TokenFleet 的护城河。

3. **Editorial confidence, not theatrics.** Stripe 风格的 atmospheric mesh、Sohne thin 排版、宽白与节奏感是"编辑级自信"，不是"营销表演"。每一个视觉决策都要回答：它在传达品牌理解、产品事实、还是只是热闹？只是热闹就砍。

4. **Code is the brand voice.** 代码示例不是配图，是落地页最重要的"文案"。curl / Python / Node 多 tab、`base_url` 一行替换、真实可跑的 model id —— 这些细节就是工程读者眼里的品牌人格。代码要足够真实、足够好看、足够有信息密度。

5. **Stripe-grade atmospherics × Engineer-first content.** 视觉锚定 Stripe 的金融基础设施编辑感（gradient mesh、indigo CTA、Sohne thin、tabular figures），内容锚定 fal.ai / Vercel 的工程师密度（mono 模型 id、可复制代码、诚实 SLA、真实 latency）。两者交叉点即是 TokenFleet 的品牌态度——既能进采购名单，也能让 CTO 复制 curl 立刻跑通。

## Accessibility & Inclusion

- **目标级别：WCAG 2.1 AA**（基础可用）。所有正文文本与背景对比度 ≥ 4.5:1，大文本 ≥ 3:1。indigo 主色与 gradient mesh 背景的组合需在每个使用位置实测对比度。
- **键盘可达**：所有交互元素（CTA、导航、tab、表单输入）必须支持键盘 Tab 与 Enter 操作，焦点态可见（与 DESIGN.md 的 indigo focus ring 一致）。
- **响应式**：覆盖 mobile（< 640px）/ tablet / desktop / wide（> 1280px）四档断点。Hero 排版、代码区块、gradient mesh 在 mobile 单列下需保持节奏不破。
- **语言**：页面以简体中文为主，代码块、API 标识符、产品名、模型 id 保留英文原貌不翻译。
- **进阶（可后续加）**：尊重 `prefers-reduced-motion`（gradient mesh 不做动画）；色弱友好（避免仅用红绿区分状态、indigo / ruby 不并列承担语义）。
