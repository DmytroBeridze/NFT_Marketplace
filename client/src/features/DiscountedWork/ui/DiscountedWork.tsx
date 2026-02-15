import { useGetNFTBySaleQuery } from '../../../entities/DiscountedWork/model';
import { ErrorText } from '../../../shared/ui/atoms';
import { InnerContainer } from '../../../shared/ui/layout';
import NFTPreview from '../../../widgets/NFTPreview/ui/NFTPreview';
import { mapNftToDiscountedCard } from '../lib/mapNftToDiscountedCard';

const DiscountedWork = () => {
  const { isError, isLoading, data } = useGetNFTBySaleQuery();

  if (isError) {
    return (
      <section>
        <InnerContainer>
          <ErrorText
            data-testid="discountWork-error"
            className="text-red-700 w-full  text-center responsive-size-sm animate-pulse"
          >
            Loading Error...
          </ErrorText>
        </InnerContainer>
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

  if (!data?.item) return null;

  return (
    <section className="main-padding-responsive">
      <NFTPreview {...mapNftToDiscountedCard(data.item)} />
    </section>
  );
};

export default DiscountedWork;
