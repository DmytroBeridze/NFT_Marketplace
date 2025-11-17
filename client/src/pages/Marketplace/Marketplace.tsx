import { TrendingCollection } from '../../features/TrendingCollection/ui';
import { InnerContainer } from '../../shared/ui/layout';
import { MarketplaceHero } from '../../widgets/MarketplaceHero/ui';
import { TopCreators } from '../../widgets/TopCreators/ui/molecules';

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
