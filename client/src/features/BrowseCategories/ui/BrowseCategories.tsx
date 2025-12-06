import { SectionHeader } from '../../../shared/ui/molecules/SectionHeader';
import BrowseCategoriesGallery from './BrowseCategoriesGallery';

const BrowseCategories = () => {
  return (
    <section className="main-padding-responsive">
      <SectionHeader title="Browse Categories" />
      <BrowseCategoriesGallery />
    </section>
  );
};

export default BrowseCategories;
