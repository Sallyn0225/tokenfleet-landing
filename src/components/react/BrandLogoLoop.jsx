import LogoLoop from './LogoLoop.jsx';

const brandIcon = (file, title) => ({
  src: `/ai-brand-logo/${file}`,
  alt: title,
  title,
});

const brandLogos = [
  brandIcon('claude-color.svg', 'Anthropic Claude'),
  brandIcon('openai.svg', 'OpenAI'),
  brandIcon('gemini-color.svg', 'Google Gemini'),
  brandIcon('deepseek-color.svg', 'DeepSeek'),
  brandIcon('kimi-color.svg', 'Kimi · Moonshot'),
  brandIcon('minimax-color.svg', 'MiniMax'),
];

export default function BrandLogoLoop({
  ariaLabel = '平台已接入的 AI 厂商与模型',
}) {
  return (
    <LogoLoop
      logos={brandLogos}
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
