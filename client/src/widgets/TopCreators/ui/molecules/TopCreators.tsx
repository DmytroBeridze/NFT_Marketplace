import { ButtonWithIcon } from '../../../../shared/ui/molecules/ButtonWithIcon';
import { SectionHeader } from '../../../../shared/ui/molecules/SectionHeader';

export const TopCreators = () => {
  return (
    <section className="main-padding-responsive">
      <SectionHeader
        title="Top Creators"
        description="Checkout Top Rated Creators on the NFT Marketplace"
        className="flex gap-3.5 items-end justify-between"
      >
        <ButtonWithIcon
          variant="outline"
          className=" py-5 px-6  md:px-12   max-h-16 shrink-0"
          radius="xl"
          textClassName="md:text-base text-sm"
          onClick={() => console.log('Ranking')}
        >
          View Rankings
        </ButtonWithIcon>
      </SectionHeader>
    </section>
  );
};
