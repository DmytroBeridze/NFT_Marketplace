import { useTranslation } from 'react-i18next';
import { useTranslate } from '../../../../shared/lib/i18n';
import { StatisticItem } from './StatisticItem';
import { ButtonWithIcon } from './ButtonWithIcon';
import type { Statistics } from '../../model';

export const HeroActionBlock = () => {
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
        {statisticsArr.map(([key, val]) => {
          const value = t(val);
          return StatisticItem({ key, value, statistics });
        })}
      </div>
    </div>
  );
};
