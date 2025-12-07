import { categoriesIcon } from '../../../features/BrowseCategories/lib/icon';
import { categoriesImg } from '../../../features/BrowseCategories/lib/img';
import { Icon, Image, Text } from '../../../shared/ui/atoms';

type CategoriesCardType = {
  id: string;
  name: string;
  // order?: number;
};

const CategoriesCard = ({ id, name }: CategoriesCardType) => {
  return (
    <div className="max-w-[240px] cursor-pointer">
      {/* -------image */}
      <div className="max-h-[240px] rounded-t-2xl overflow-hidden relative">
        <Icon name={categoriesIcon[name]} />

        <Image alt={name} src={categoriesImg[name]} className="blur-xs" />
      </div>
      <img />
      {/* -----------name */}

      <div className="max-h-[76px] bg-secondary-background-color py-5 px-7 rounded-b-2xl">
        <Text
          font="font-work-sans-semibold"
          color="text-primary-text-color"
          size="responsive-size-md"
        >
          {name}
        </Text>
      </div>
    </div>
  );
};

export default CategoriesCard;
