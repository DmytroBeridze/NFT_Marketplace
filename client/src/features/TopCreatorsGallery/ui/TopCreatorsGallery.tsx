import { useEffect } from 'react';
import { TopCreatorsCard } from '../../../widgets/TopCreators/ui';
import { useGetTopCreatorsQuery } from '../model';
import { ErrorText } from '../../../shared/ui/atoms';

export const TopCreatorsGallery = () => {
  const testArray = Array.from({ length: 12 }, () => []);

  const { isError, isLoading, data } = useGetTopCreatorsQuery();
  useEffect(() => {
    console.log('-------------', data);
  }, [data]);
  // let isError = true;
  // let isLoading = true;
  return (
    <div className="grid grid-cols-4 gap-7">
      {isError && (
        <ErrorText className="text-red-700 w-full  text-center responsive-size-sm animate-pulse">
          Loading Error...
        </ErrorText>
      )}

      {!isError &&
        !isLoading &&
        testArray.map((elem, i) => {
          return <TopCreatorsCard key={i} index={i + 1} />;
        })}
    </div>
  );
};
