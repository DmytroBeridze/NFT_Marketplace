import { InnerContainer } from '../../shared/ui/layout';
import { MarketplaceHero } from '../../widgets/MarketplaceHero/ui';
import { TopCreators } from '../../widgets/TopCreators/ui/molecules';
import { TrendingCollection } from '../../widgets/TrendingCollection/ui';

export const Marketplace = () => {
  return (
    <div className="bg-primary-background-color ">
      {/* <div className="bg-primary-background-color py-20 hero-padding-responsive"> */}
      <InnerContainer>
        <MarketplaceHero />
        <TrendingCollection />
        <TopCreators />
      </InnerContainer>
    </div>
  );
};
