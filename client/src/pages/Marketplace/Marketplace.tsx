import { TrendingCollection } from '../../features/TrendingCollection/ui';
import { InnerContainer } from '../../shared/ui/layout';
import { MarketplaceHero } from '../../widgets/MarketplaceHero/ui';
import { TopCreators } from '../../widgets/TopCreators/ui/molecules';
import BrowseCategories from '../../features/BrowseCategories/ui/BrowseCategories';
import DiscoverMoreNFTs from '../../features/DiscoverMoreNFTs/ui/DiscoverMoreNFTs';

export const Marketplace = () => {
  return (
    <div className="bg-primary-background-color ">
      {/* <div className="bg-primary-background-color py-20 hero-padding-responsive"> */}
      <InnerContainer>
        <MarketplaceHero />
        <TrendingCollection />
        <TopCreators />
        <BrowseCategories />
        <DiscoverMoreNFTs />
      </InnerContainer>
    </div>
  );
};
