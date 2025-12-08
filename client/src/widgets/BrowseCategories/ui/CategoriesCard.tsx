import { useNavigate } from 'react-router-dom';
import { categoriesIcon } from '../../../features/BrowseCategories/lib/icon';
import { categoriesImg } from '../../../features/BrowseCategories/lib/img';
import { Icon, Image, Text } from '../../../shared/ui/atoms';

type CategoriesCardType = {
  id: string;
  name: string;
  // order?: number;
};

const CategoriesCard = ({ id, name }: CategoriesCardType) => {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-[240px] cursor-pointer overflow-hidden rounded-2xl shadow-secondary
    transition-all ease-in duration-200 hover:-translate-y-3 shadow-accent
    "
    >
      {/* -------image */}
      <div className="max-h-[240px]  overflow-hidden relative">
        <Image alt={name} src={categoriesImg[name]} className="blur-xs" />
        <Icon
          name={categoriesIcon[name]}
          size={100}
          className="fill-none absolute top-0 left-0 right-0 bottom-0 m-auto"
        />
      </div>
      <img />

      {/* -----------name */}
      <div className="max-h-[76px] bg-secondary-background-color py-5 px-7">
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
