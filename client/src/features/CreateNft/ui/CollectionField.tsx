import { Select } from '../../../shared/ui/molecules/Select';
import type { CategoryFieldProps } from '../model';

export const CollectionField = ({ categories }: CategoryFieldProps) => {
  const normalizeCategories = categories.map((category) => ({
    id: category._id,
    name: category.name,
  }));

  return (
    <div className="flex flex-col w-full ">
      <label htmlFor="NFTcategory" className={`text-primary-text-color `}>
        Collection
      </label>
      <Select
        data={normalizeCategories}
        className="text-primary-text-color pr-8 py-[10px] pl-10 "
        name="collection"
        id="NFTcollection"
        icon="galleryPhoto-icon"
        iconColor="text-primary-text-color"
        iconSize={20}
      />
    </div>
  );
};
