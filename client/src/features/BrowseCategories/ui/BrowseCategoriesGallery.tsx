import { useEffect } from 'react';
import CategoriesCard from '../../../widgets/BrowseCategories/ui/CategoriesCard';
import { useGetCategoriesQuery } from '../model';

const BrowseCategoriesGallery = () => {
  const { isError, isLoading, data } = useGetCategoriesQuery();
  console.log(data);

  return (
    <section>
      {data?.map(({ _id, name }) => (
        <CategoriesCard id={_id} name={name} key={_id} />
      ))}
    </section>
  );
};

export default BrowseCategoriesGallery;
