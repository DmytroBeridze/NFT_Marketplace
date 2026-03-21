import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../../../shared/ui/molecules/SectionHeader';
import HowItWorksItem from './HowItWorksItem';
import { getHowItWorksItems } from '../lib/items';

const HowItWorks = () => {
  const { t } = useTranslation('howItWorks');
  const items = getHowItWorksItems(t);

  return (
    <section className="main-padding-responsive">
      {/* -----------title */}
      <SectionHeader
        title={t('title')}
        description={t('description')}
      ></SectionHeader>
      {/* -----------proposals */}
      <section className="howItWorksResponse">
        {/* <section className="flex gap-6  justify-between"> */}
        {items.map((elem) => {
          const { description, image, title, link, id } = elem;

          return (
            <HowItWorksItem
              key={id}
              description={description}
              title={title}
              img={image}
              link={link}
            />
          );
        })}
      </section>
    </section>
  );
};

export default HowItWorks;
