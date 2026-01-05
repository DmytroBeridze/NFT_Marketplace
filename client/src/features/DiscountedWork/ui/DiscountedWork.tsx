import { useGetNFTBySaleQuery } from '../../../entities/DiscountedWork/model';
import NFTPreview from '../../../widgets/NFTPreview/ui/NFTPreview';

const DiscountedWork = () => {
  const { isError, isLoading, data } = useGetNFTBySaleQuery();
  console.log(data);

  return (
    <section className="main-padding-responsive">
      DiscountedWork
      <NFTPreview />
    </section>
  );
};

export default DiscountedWork;
