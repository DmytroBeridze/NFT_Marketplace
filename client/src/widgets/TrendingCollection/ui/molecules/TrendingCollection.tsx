import { useEffect, useState } from 'react';
import { SectionHeader } from '../../../../shared/ui/molecules/SectionHeader';
import { useGetTrendingCollectionQuery } from '../../model';
import { CollectionCard } from './CollectionCard';

import { useTranslation } from 'react-i18next';

export const TrendingCollection = () => {
  const { isError, isLoading, data } = useGetTrendingCollectionQuery();
  const gallerits = data?.galleries;
  const [index, setIndex] = useState<number>(3);
  const { t } = useTranslation('trendingCollection');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 835) {
        setIndex(3);
      } else if (window.innerWidth >= 375) {
        setIndex(2);
      } else setIndex(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="main-padding-responsive">
      <SectionHeader
        title={t('trendingTitle')}
        description={t('trendingDescription')}
      />

      <div className="trending-responsive  grid gap-7 relative testDelete">
        {isLoading
          ? [1, 2, 3]
              .slice(0, index)
              .map((elem, i) => <CollectionCard.Skeleton key={i} />)
          : gallerits?.slice(0, index).map((gallery) => {
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
            })}

        {/* {gallerits?.map((gallery) => {
          const { _id, author, authorAvatar, name, nfts, nftsQuantity } =
            gallery;
          return (
            <CollectionCard
              key={_id}
              author={author}
              authorAvatar={authorAvatar}
              name={name}
              nfts={nfts}
              nftsQuantity={nftsQuantity}
            />
          );
        })} */}
      </div>
    </section>
  );
};
