import { InnerContainer } from '../../shared/ui/layout';
import { MarketplaceHero } from '../../widgets/MarketplaceHero/ui';
import { TrendingCollection } from '../../widgets/TrendingCollection/ui';

export const Marketplace = () => {
  return (
    <div className="bg-primary-background-color ">
      {/* <div className="bg-primary-background-color py-20 hero-padding-responsive"> */}
      <InnerContainer>
        <MarketplaceHero />
        <TrendingCollection />
      </InnerContainer>
    </div>
  );
};
