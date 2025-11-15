import { TopCreatorsActionBlock } from './TopCreatorsActionBlock';
import { TopCreatorsContent } from './TopCreatorsContent';
import { TopCreatorsGallery } from './TopCreatorsGallery';

export const TopCreators = () => {
  return (
    <section className="main-padding-responsive">
      <TopCreatorsContent />
      <TopCreatorsGallery />
      <TopCreatorsActionBlock />
    </section>
  );
};
