import { TopCreatorsGallery } from '../../../../features/TopCreatorsGallery';
import { TopCreatorsActionBlock } from './TopCreatorsActionBlock';
import { TopCreatorsContent } from './TopCreatorsContent';

export const TopCreators = () => {
  return (
    <section className="main-padding-responsive">
      <TopCreatorsContent />
      <TopCreatorsGallery />
      <TopCreatorsActionBlock />
    </section>
  );
};
