import { useTranslation } from 'react-i18next';
import { Text } from '../../../../shared/ui/atoms/Text';
import { useTranslate } from '../../../../shared/lib/i18n';
import { StatisticItem } from './StatisticItem';
import { ButtonWithIcon } from './ButtonWithIcon';
import { useGetStatisticsQuery } from '../../model';
import { Icon } from '../../../../shared/ui/atoms/Icon';

export const HeroContent = () => {
  const { t } = useTranslation('heroContent');
  const { t: tt } = useTranslation('translation');

  const { isLoading, data } = useGetStatisticsQuery();
  const statistics = data?.statistics;

  const statisticsName = useTranslate({
    document: 'heroContent',
    translateKey: 'statistics',
    returnObjects: true,
  });

  let isError = true;
  // const statistics: Statistics = {
  //   totalSale: 170000,
  //   artists: 20000,
  //   images: 1500000,
  // };

  const statisticsArr = Object.entries(statisticsName.translateVariables);

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
      <ButtonWithIcon
        className="py-5 px-12 max-w-[224px] flex marketplaceHero-button-smallSize-hidden"
        radius="xl"
        onClick={() => console.log('Hero click')}
      >
        {tt('button.getStarted')}
      </ButtonWithIcon>

      {/* CounterStat */}
      <div
        className="flex gap-7  text-primary-text-color
       marketplaceHero-button-smallSize-hidden"
      >
        {isLoading && <Icon name="spinner" className="w-full" />}
        {isError && (
          <span className="text-red-700 w-full  text-center">
            Loading Error...
          </span>
        )}

        {!isLoading &&
          !isError &&
          statisticsArr.map(([key, val]) => {
            const value = t(val);

            return (
              <StatisticItem
                key={key}
                statKey={key}
                value={value}
                statistics={statistics}
              />
            );
          })}
      </div>
    </div>
  );
};
