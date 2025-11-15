import { ButtonWithIcon } from '../../../../shared/ui/molecules/ButtonWithIcon';
import { SectionHeader } from '../../../../shared/ui/molecules/SectionHeader';

export const TopCreatorsContent = () => {
  return (
    <SectionHeader
      title="Top Creators"
      description="Checkout Top Rated Creators on the NFT Marketplace"
      className="flex gap-3.5 items-end justify-between "
    >
      <ButtonWithIcon
        variant="outline"
        className=" py-5 px-6  md:px-12 sm:max-h-16  max-h-14 
            shrink-0 items-center main-button-smallSize-hidden decoration-amber-500 "
        radius="xl"
        textClassName="md:text-base text-xs text-primary-text-color"
        onClick={() => console.log('Ranking')}
      >
        View Rankings
      </ButtonWithIcon>
    </SectionHeader>
  );
};
