import { useTranslation } from 'react-i18next';
import { useTranslate } from '../../../../shared/lib/i18n';
import { StatisticItem } from './StatisticItem';
import { ButtonWithIcon } from './ButtonWithIcon';
import { useGetStatisticsQuery } from '../../model';
import { Icon } from '../../../../shared/ui/atoms/Icon';

export const HeroActionBlock = () => {
  const { t } = useTranslation('heroContent');
  const { t: tt } = useTranslation('translation');

  const { isLoading, data } = useGetStatisticsQuery();
  const statistics = data?.statistics;

  const statisticsName = useTranslate({
    document: 'heroContent',
    translateKey: 'statistics',
    returnObjects: true,
  });

  const statisticsArr = Object.entries(statisticsName.translateVariables);
  let isError = true;
  return (
    <div className="marketplaceHero-button-bigSize-hidden flex flex-col gap-5 heroContent-heroactionBlock-responsive">
      <ButtonWithIcon
        className="py-5 px-12  flex  justify-center w-full "
        radius="xl"
      >
        {tt('button.getStarted')}
      </ButtonWithIcon>

      {/* CounterStat */}
      <div className="flex heroContent-statistics-responsive gap-7  text-primary-text-color">
        {isLoading && <Icon name="spinner" className="w-full" />}
        <span className="text-red-700 w-full  text-center responsive-size-sm">
          Loading Error...
        </span>

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

        {/* {statisticsArr.map(([key, val]) => {
          const value = t(val);
          return StatisticItem({ key, value, statistics });
        })} */}
      </div>
    </div>
  );
};
