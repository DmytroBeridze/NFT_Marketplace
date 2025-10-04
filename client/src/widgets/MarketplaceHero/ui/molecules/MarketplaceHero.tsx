import { HeroActionBlock } from './HeroActionBlock';
import { HeroContent } from './HeroContent';
import { HeroPreview } from './HeroPreview';

export const MarketplaceHero = () => {
  return (
    <div className="flex flex-col gap-8 marketplaceHero-responsive">
      <HeroContent />
      <HeroPreview />
      <HeroActionBlock />
    </div>
  );
};
