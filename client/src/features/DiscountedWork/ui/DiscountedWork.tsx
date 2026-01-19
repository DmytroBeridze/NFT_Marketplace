import { useGetNFTBySaleQuery } from '../../../entities/DiscountedWork/model';
import NFTPreview from '../../../widgets/NFTPreview/ui/NFTPreview';
import { mapNftToDiscountedCard } from '../lib/mapNftToDiscountedCard';

const DiscountedWork = () => {
  const { isError, isLoading, data } = useGetNFTBySaleQuery();
  if (!data?.items) return null;

  return (
    <section className="main-padding-responsive">
      <NFTPreview {...mapNftToDiscountedCard(data.items)} />
    </section>
  );
};

export default DiscountedWork;
