import { useGetNFTBySaleQuery } from '../../../entities/DiscountedWork/model';
import { InnerContainer } from '../../../shared/ui/layout';
import NFTPreview from '../../../widgets/NFTPreview/ui/NFTPreview';
import { mapNftToDiscountedCard } from '../lib/mapNftToDiscountedCard';

const DiscountedWork = () => {
  const { isError, isLoading, data } = useGetNFTBySaleQuery();

  // const isLoading = true;
  // const isError = true;

  if (isError) {
    return (
      <section>
        <InnerContainer>'Error'</InnerContainer>;
      </section>
    );
  }

  if (isLoading) {
    return (
      <section>
        <NFTPreview.Skeleton />
      </section>
    );
  }

  if (!data?.items) return null;

  return (
    <section className="main-padding-responsive">
      <NFTPreview {...mapNftToDiscountedCard(data.items)} />
    </section>
  );
};

export default DiscountedWork;
