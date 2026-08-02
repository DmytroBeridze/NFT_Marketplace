import { SectionHeader } from '../../../../shared/ui/molecules/SectionHeader';
import { useGetTrendingCollectionQuery } from '../../model';

import { useTranslation } from 'react-i18next';
import { ErrorText } from '../../../../shared/ui/atoms';
import { CollectionCard } from '../../../../widgets/TrendingCollection/ui/CollectionCard';
import { useResponsiveValue } from '../../../../shared/lib/hooks';

export const TrendingCollection = () => {
  const { isError, isLoading, data } = useGetTrendingCollectionQuery();
  const galleries = data?.galleries;
  // const [index, setIndex] = useState<number>(3);
  const { t } = useTranslation('trendingCollection');
  const skeletonElements = Array.from({ length: 3 });

  const { responsiveValue } = useResponsiveValue(
    [
      {
        minWidth: 834,
        value: 3,
      },
      {
        minWidth: 375,
        value: 2,
      },
    ],
    1,
  );

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth >= 835) {
  //       setIndex(3);
  //     } else if (window.innerWidth >= 375) {
  //       setIndex(2);
  //     } else setIndex(1);
  //   };
  //   handleResize();
  //   window.addEventListener('resize', handleResize);

  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <section className="main-padding-responsive">
      <SectionHeader
        title={t('trendingTitle')}
        description={t('trendingDescription')}
      />

      <div className="trending-responsive  grid gap-7 relative testDelete">
        {isError ? (
          <ErrorText
            Element="div"
            data-testid="TrendingCollection-error"
            className="text-red-700 w-full  text-center responsive-size-sm 
            animate-pulse  col-start-1 col-end-5 "
          >
            Loading Error...
          </ErrorText>
        ) : isLoading ? (
          skeletonElements
            .slice(0, responsiveValue)
            .map((_, i) => <CollectionCard.Skeleton key={i} />)
        ) : (
          galleries?.slice(0, responsiveValue).map((gallery) => {
            const { _id, author, authorAvatar, name, nfts, nftsQuantity } =
              gallery;
            return (
              <CollectionCard
                key={_id}
                galleryId={_id}
                author={author}
                authorAvatar={authorAvatar}
                name={name}
                nfts={nfts}
                nftsQuantity={nftsQuantity}
              />
            );
          })
        )}
      </div>
    </section>
  );
};
