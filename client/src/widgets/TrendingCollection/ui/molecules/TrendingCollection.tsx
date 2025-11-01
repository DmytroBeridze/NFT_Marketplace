import { SectionHeader } from '../../../../shared/ui/molecules/SectionHeader';
import { useGetTrendingCollectionQuery } from '../../model';
import { CollectionCard } from './CollectionCard';

export const TrendingCollection = () => {
  const { isError, isLoading, data } = useGetTrendingCollectionQuery();
  const gallerits = data?.galleries;
  console.log(data?.galleries);

  return (
    <section className="main-padding-responsive">
      <SectionHeader
        title="Trending Collection"
        description=" Checkout our weekly updated trending collection."
      />

      <div className="grid grid-cols-3 gap-7 ">
        {gallerits?.map((gallery) => {
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
        })}

        {/* --- */}
      </div>
    </section>
  );
};
