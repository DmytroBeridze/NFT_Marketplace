import { HeroActionBlock } from './HeroActionBlock';
import { HeroContent } from './HeroContent';
import { HeroPreview } from '../../../../features/MarketplaceHero/ui/HeroPreview';

export const MarketplaceHero = () => {
  return (
    <div className="flex flex-col gap-8 marketplaceHero-responsive main-padding-responsive">
      <HeroContent />
      <HeroPreview />
      <HeroActionBlock />
    </div>
  );
};
