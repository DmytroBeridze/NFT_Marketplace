import { InnerContainer } from '../../shared/ui/layout';
import { MarketplaceHero } from '../../widgets/MarketplaceHero/ui';

export const Marketplace = () => {
  return (
    <div className="bg-primary-background-color py-20 hero-padding-responsive">
      <InnerContainer>
        <MarketplaceHero />
      </InnerContainer>
    </div>
  );
};
