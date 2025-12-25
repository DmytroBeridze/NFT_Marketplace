import CategoriesCard from '../../../widgets/BrowseCategories/ui/CategoriesCard';
import { useGetCategoriesQuery } from '../model';
import { ErrorText } from '../../../shared/ui/atoms';

const BrowseCategoriesGallery = () => {
  const { isError, isLoading, data } = useGetCategoriesQuery();
  const skeletonElements = Array.from({ length: 8 });

  // const isError = true;
  // const isLoading = true;
  return (
    <section className="categoriesCardResponsive ">
      {isError && (
        <ErrorText className="text-red-700 w-full  text-center responsive-size-sm animate-pulse">
          Loading Error...
        </ErrorText>
      )}

      {!isError &&
        (isLoading
          ? skeletonElements.map((_, id) => (
              <CategoriesCard.skeleton key={id} />
            ))
          : data?.map(({ _id, name }) => (
              <CategoriesCard id={_id} name={name} key={_id} />
            )))}
    </section>
  );
};

export default BrowseCategoriesGallery;
