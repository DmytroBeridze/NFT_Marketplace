import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../../../shared/ui/molecules/SectionHeader';
import BrowseCategoriesGallery from './BrowseCategoriesGallery';

const BrowseCategories = () => {
  const { t } = useTranslation('browseCategories');
  return (
    <section className="main-padding-responsive ">
      <SectionHeader title={t('browseCategoriesTitle')} />
      <BrowseCategoriesGallery />
    </section>
  );
};

export default BrowseCategories;
