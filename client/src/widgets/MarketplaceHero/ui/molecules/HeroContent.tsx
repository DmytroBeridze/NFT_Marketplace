import { useTranslation } from 'react-i18next';
import { Button } from '../../../../shared/ui/atoms/Button';
import { Icon } from '../../../../shared/ui/atoms/Icon';
import { Text } from '../../../../shared/ui/atoms/Text';
import { useTranslate } from '../../../../shared/lib/i18n';

type Statistics = {
  totalSale: number;
  artists: number;
  images: number;
};

export const HeroContent = () => {
  const { t } = useTranslation('heroContent');
  const { t: tt } = useTranslation('translation');

  const statistics: Statistics = {
    totalSale: 170000,
    artists: 20000,
    images: 1500000,
  };

  const statisticsName = useTranslate({
    document: 'heroContent',
    translateKey: 'statistics',
    returnObjects: true,
  });

  const statisticsArr = Object.entries(statisticsName.translateVariables);

  // !-------------винести і змерджити гілки
  const formatter = (num: number) => {
    if (num > 10000 && num < 1000000) {
      return Math.floor(num / 1000) + 'k+';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M+';
    } else return num.toString();
  };

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
        {statisticsArr.map(([key, val]) => {
          return (
            <div className=" basis-1/3 " key={key}>
              <Text
                Element="h4"
                font="font-space-mono-bold"
                className="hero-counter-number-size"
              >
                {formatter(statistics[key as keyof Statistics])}
              </Text>
              <Text
                Element="span"
                size="t-text-md"
                font="font-work-sans-regular"
              >
                {t(val)}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};
