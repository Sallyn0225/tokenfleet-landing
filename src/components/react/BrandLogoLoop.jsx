import LogoLoop from './LogoLoop.jsx';

const brandIcon = (file, title) => ({
  src: `/ai-brand-logo/${file}`,
  alt: title,
  title,
});

const zhLogos = [
  brandIcon('openai.svg', 'OpenAI'),
  brandIcon('anthropic.svg', 'Anthropic'),
  brandIcon('gemini-color.svg', 'Google Gemini'),
  brandIcon('deepseek-color.svg', 'DeepSeek'),
  brandIcon('qwen-color.svg', '通义千问 Qwen'),
  brandIcon('kimi-color.svg', 'Kimi · Moonshot'),
  brandIcon('zhipu-color.svg', '智谱 GLM'),
  brandIcon('doubao-color.svg', '豆包 Doubao'),
  brandIcon('mistral-color.svg', 'Mistral'),
  brandIcon('meta-color.svg', 'Meta Llama'),
  brandIcon('grok.svg', 'xAI Grok'),
  brandIcon('cohere-color.svg', 'Cohere'),
  brandIcon('perplexity-color.svg', 'Perplexity'),
  brandIcon('groq.svg', 'Groq'),
  brandIcon('sora-color.svg', 'Sora'),
  brandIcon('midjourney.svg', 'Midjourney'),
  brandIcon('stability-color.svg', 'Stability AI'),
  brandIcon('runway.svg', 'Runway'),
  brandIcon('suno.svg', 'Suno'),
  brandIcon('elevenlabs.svg', 'ElevenLabs'),
];

const enLogos = zhLogos.map((logo) => ({
  ...logo,
  alt: logo.alt
    .replace('通义千问 Qwen', 'Qwen')
    .replace('智谱 GLM', 'Zhipu GLM')
    .replace('豆包 Doubao', 'Doubao'),
  title: logo.title
    .replace('通义千问 Qwen', 'Qwen')
    .replace('智谱 GLM', 'Zhipu GLM')
    .replace('豆包 Doubao', 'Doubao'),
}));

export default function BrandLogoLoop({ ariaLabel = '平台已接入的 AI 厂商与模型', locale = 'zh' }) {
  const logos = locale === 'en' ? enLogos : zhLogos;
  return (
    <LogoLoop
      logos={logos}
      speed={60}
      direction="left"
      logoHeight={64}
      gap={64}
      hoverSpeed={0}
      scaleOnHover
      fadeOut
      fadeOutColor="#ffffff"
      ariaLabel={ariaLabel}
      className="logoloop"
    />
  );
}
