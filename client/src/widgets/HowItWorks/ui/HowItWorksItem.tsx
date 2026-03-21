import { useNavigate } from 'react-router-dom';
import { Image, Text } from '../../../shared/ui/atoms';
import { howItWorksItemImg } from '../lib/img';

type WorksItemType = {
  img: string;
  title: string;
  description: string;
  link: string;
};

const HowItWorksItem = ({ img, title, description, link }: WorksItemType) => {
  let navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(link)}
      className="howItWorksItemResponse  w-full p-6 rounded-2xl 
      bg-secondary-background-color  text-primary-text-color
       overflow-hidden  cursor-pointer
      transition-all ease-in duration-200 hover:-translate-y-3 shadow-accent 
      "
    >
      <div className="max-w-[250px] aspect-square howItWorksImgResponse">
        <Image alt={title} src={howItWorksItemImg[img]} />
      </div>
      <div className="howItWorksContentResponse">
        <Text
          children={title}
          Element="h3"
          font="font-work-sans-semibold"
          size="responsive-size-md"
          className=" mb-2.5"
        />
        <Text
          children={description}
          Element="p"
          font="font-work-sans-regular"
          size="responsive-size-sm"
        />
      </div>
    </div>
  );
};

export default HowItWorksItem;
