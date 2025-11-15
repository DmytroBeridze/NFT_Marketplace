import { ButtonWithIcon } from '../../../../shared/ui/molecules/ButtonWithIcon';

export const TopCreatorsActionBlock = () => {
  return (
    <>
      <ButtonWithIcon
        variant="outline"
        className=" py-5   px-12 max-h-16 mt-10 w-full
          items-center justify-center
          main-button-bigSize-hidden"
        radius="xl"
        textClassName="text-base"
        iconClassName="static-text-purple-color"
        onClick={() => console.log('Ranking')}
      >
        View Rankings
      </ButtonWithIcon>
    </>
  );
};
