import LogoLoop from './LogoLoop.jsx';

const brandIcon = (file, title) => ({
  src: `/ai-brand-logo/${file}`,
  alt: title,
  title,
});

const logos = [
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

export default function BrandLogoLoop() {
  return (
    <LogoLoop
      logos={logos}
      speed={60}
      direction="left"
      logoHeight={36}
      gap={56}
      hoverSpeed={0}
      scaleOnHover
      fadeOut
      fadeOutColor="#ffffff"
      ariaLabel="平台已接入的 AI 厂商与模型"
    />
  );
}
