import { useNavigate } from 'react-router-dom';
import { categoriesIcon } from '../../../features/BrowseCategories/lib/icon';
import { categoriesImg } from '../../../features/BrowseCategories/lib/img';
import { Icon, Image, Text } from '../../../shared/ui/atoms';
import { useTranslation } from 'react-i18next';

type CategoriesCardType = {
  id: string;
  name: string;
  // order?: number;
};

const CategoriesCard = ({ id, name }: CategoriesCardType) => {
  const { t } = useTranslation('browseCategories');
  // const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-2xl shadow-secondary
    transition-all ease-in duration-200 hover:-translate-y-3 shadow-accent bg-secondary-background-color"
    >
      {/* -------image */}
      <div className="max-h-[240px]  overflow-hidden relative">
        <Image alt={name} src={categoriesImg[name]} className="blur-xs" />
        <Icon
          name={categoriesIcon[name]}
          // size={100}
          className="categoriesCardIconResponsive fill-none absolute top-0 left-0 right-0 bottom-0 m-auto"
        />
      </div>
      {/* <img /> */}

      {/* -----------name */}
      <div className=" py-5 px-7 ">
        {/* <div className="max-h-[76px] bg-secondary-background-color py-5 px-7"> */}
        <Text
          font="font-work-sans-semibold"
          color="text-primary-text-color"
          // size="responsive-size-ms"
          className="categoriesCardTextResponsive"
          // size="responsive-size-md"
        >
          {t(`browseCategoriesNames.${name}`)}
          {/* {name} */}
        </Text>
      </div>
    </div>
  );
};

// ------------------------------Skeleton
CategoriesCard.skeleton = () => {
  return (
    <div
      className="rounded-2xl skeleton-adaptive-background aspect-[240/316]
       overflow-hidden flex flex-col animate-pulse inset-0 
   opacity-100 shadow-secondary"
    >
      <div className="relative flex-1 h-full overflow-hidden  "></div>

      <div className=" py-5 px-7 bg-primary-background-color">
        <div className="w-full h-5 skeleton-adaptive-background"></div>
      </div>
    </div>
  );
};

export default CategoriesCard;
