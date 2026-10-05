import { useTranslation } from 'react-i18next';
import { Select } from '../../../shared/ui/molecules/Select';
import type { CategoryFieldProps } from '../model';

export const CategoryField = ({ categories }: CategoryFieldProps) => {
  const { t } = useTranslation('dashboard');

  const normalizeCategories = categories.map((category) => ({
    id: category._id,
    name: t(`categories.${category.name}`),
  }));
  // const normalizeCategories = categories.map((category) => ({
  //   id: category._id,
  //   name: category.name,
  // }));

  return (
    <div
      className="flex flex-col w-full max-[900px]:col-span-1
    max-[1200px]:col-span-3
    "
    >
      <label htmlFor="NFTcategory" className={`text-primary-text-color `}>
        {t('titles.category')}
      </label>
      <Select
        data={normalizeCategories}
        className="text-primary-text-color pr-8 py-[10px] pl-10 "
        name="category"
        id="NFTcategory"
        icon="category-icon"
        iconColor="text-primary-text-color"
        iconSize={20}
      />
    </div>
  );
};
