import { TrendingCollection } from '../../features/TrendingCollection/ui';
import { InnerContainer } from '../../shared/ui/layout';
import { MarketplaceHero } from '../../widgets/MarketplaceHero/ui';
import { TopCreators } from '../../widgets/TopCreators/ui/molecules';
import BrowseCategories from '../../features/BrowseCategories/ui/BrowseCategories';
import DiscountedWork from '../../features/DiscountedWork/ui/DiscountedWork';
import DiscoverMoreNFTs from '../../widgets/DiscoverMoreNFTs/ui/DiscoverMoreNFTs';

const Marketplace = () => {
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
      <DiscountedWork />
    </div>
  );
};

export default Marketplace;
