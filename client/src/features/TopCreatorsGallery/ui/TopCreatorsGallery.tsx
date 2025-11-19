import { useEffect } from 'react';
import { TopCreatorsCard } from '../../../widgets/TopCreators/ui';
import { useGetTopCreatorsQuery } from '../model';
import { ErrorText } from '../../../shared/ui/atoms';

export const TopCreatorsGallery = () => {
  const skeletonItems = Array.from({ length: 12 });

  const { isLoading, data } = useGetTopCreatorsQuery();
  const topAuthors = data?.topAuthors.slice(0, 13);

  let isError = true;
  // let isLoading = true;
  return (
    <div className="grid grid-cols-4 gap-7">
      {isError && (
        <ErrorText className="text-red-700 w-full  text-center responsive-size-sm animate-pulse">
          Loading Error...
        </ErrorText>
      )}

      {!isError &&
        (isLoading
          ? // ---------------------------Skeleton
            skeletonItems.map((_, i) => <TopCreatorsCard.Skeleton key={i} />)
          : // ------------------------   Authors
            topAuthors?.map((author, i) => {
              return (
                <TopCreatorsCard
                  key={author.authorId}
                  index={i + 1}
                  author={author}
                />
              );
            }))}
    </div>
  );
};
