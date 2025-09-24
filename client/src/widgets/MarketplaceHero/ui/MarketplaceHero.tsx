import { HeroContent } from './molecules/HeroContent';
import { HeroPreview } from './molecules/HeroPreview';

export const MarketplaceHero = () => {
  return (
    <div className="flex gap-8">
      <HeroContent />
      <HeroPreview />
    </div>
  );
};
