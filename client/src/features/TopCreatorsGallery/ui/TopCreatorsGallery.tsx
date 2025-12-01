import { useEffect, useState } from 'react';
import { TopCreatorsCard } from '../../../widgets/TopCreators/ui';
import { useGetTopCreatorsQuery } from '../model';
import { ErrorText } from '../../../shared/ui/atoms';

export const TopCreatorsGallery = () => {
  const [gallerySize, setGallerySize] = useState<number>(12);
  const { isError, isLoading, data } = useGetTopCreatorsQuery();

  const skeletonItems = Array.from({ length: gallerySize });
  const topAuthors = data?.topAuthors.slice(0, gallerySize);

  // let isError = true;
  // let isLoading = true;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) setGallerySize(12);
      else if (window.innerWidth > 834) setGallerySize(6);
      else setGallerySize(5);
    };
    // const handleResize = () => {
    //   if (window.innerWidth > 834) {
    //     setGallerySize(12);
    //   }
    //   if (window.innerWidth <= 834) {
    //     setGallerySize(6);
    //   }
    //   if (window.innerWidth <= 375) {
    //     setGallerySize(5);
    //   }
    // };

    handleResize();

    window.addEventListener('resize', () => handleResize());

    return () => window.removeEventListener('resize', () => handleResize());
  }, []);

  return (
    <div className=" topCreatorsGallery-responsive  ">
      {/* <div className="grid grid-cols-1 gap-7 "> */}
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
