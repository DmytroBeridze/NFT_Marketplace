import { useTranslation } from 'react-i18next';
import { Button } from '../../../../shared/ui/atoms/Button';
import { Icon } from '../../../../shared/ui/atoms/Icon';
import { Text } from '../../../../shared/ui/atoms/Text';

export const HeroContent = () => {
  const { t } = useTranslation('heroContent');
  const { t: tt } = useTranslation('translation');
  return (
    <div className="basis-1/2 flex flex-col heroContent-gap-responsive">
      <Text
        className="text-primary-text-color px-2.5 leading-[110%] hero-tytle-size"
        font="font-work-sans-semibold"
        // size="t-text-3xl"
        Element="h1"
      >
        {t('heroTitle')}
      </Text>
      <Text
        className="text-primary-text-color px-2.5 leading-[160%] responsive-size-md-md"
        font="font-work-sans-regular"
        size="t-text-md"
        Element="p"
      >
        {t('heroDesc')}
      </Text>

      {/* button */}
      <Button
        className="py-5 px-12 max-w-[224px] flex marketplaceHero-button-smallSize-hidden"
        radius="xl"
      >
        <Icon name="rocket-icon" className="mr-3" size={20} />
        <Text
          Element="span"
          size="t-text-sm"
          font="font-work-sans-semibold"
          className="static-text-white-color"
        >
          {tt('button.getStarted')}
        </Text>
      </Button>
      {/* CounterStat */}
      <div className="flex gap-7  text-primary-text-color marketplaceHero-button-smallSize-hidden">
        <div className=" basis-1/3  ">
          <Text
            Element="h4"
            font="font-space-mono-bold"
            className="hero-counter-number-size"
          >
            170k+
          </Text>
          <Text Element="span" size="t-text-md" font="font-work-sans-regular">
            {t('totalSale')}
          </Text>
        </div>

        <div className=" basis-1/3 ">
          <Text
            Element="h4"
            font="font-space-mono-bold"
            className="hero-counter-number-size"
          >
            170k+
          </Text>
          <Text Element="span" size="t-text-md" font="font-work-sans-regular">
            {t('artists')}
          </Text>
        </div>

        <div className=" basis-1/3 ">
          <Text
            Element="h4"
            font="font-space-mono-bold"
            className="hero-counter-number-size"
          >
            170k+
          </Text>
          <Text Element="span" size="t-text-md" font="font-work-sans-regular">
            {t('images')}
          </Text>
        </div>
      </div>
    </div>
  );
};
