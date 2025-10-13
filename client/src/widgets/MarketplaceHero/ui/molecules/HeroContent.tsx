import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTranslate } from '../../../../shared/lib/i18n';

import { Text } from '../../../../shared/ui/atoms/Text';
import { ButtonWithIcon } from './ButtonWithIcon';
import { StatystycsContent } from './StatisticsContent';

export const HeroContent = () => {
  const { t } = useTranslation('heroContent');
  const { t: tt } = useTranslation('translation');

  const statisticsName = useTranslate({
    document: 'heroContent',
    translateKey: 'statistics',
    returnObjects: true,
  });

  const statisticsArr = useMemo(
    () => Object.entries(statisticsName.translateVariables),
    [statisticsName.translateVariables],
  );

  return (
    <div className="basis-1/2 flex flex-col heroContent-gap-responsive">
      <Text
        className="text-primary-text-color px-2.5 leading-[110%] hero-tytle-size"
        font="font-work-sans-semibold"
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

      {/* --------------button */}
      <ButtonWithIcon
        className="py-5 px-12 max-w-[224px] flex marketplaceHero-button-smallSize-hidden"
        radius="xl"
        onClick={() => console.log('Hero click')}
      >
        {tt('button.getStarted')}
      </ButtonWithIcon>

      {/*---------------Statistics */}
      <div
        className="flex gap-7  text-primary-text-color
       marketplaceHero-button-smallSize-hidden"
      >
        {/* -------------Content*/}
        <StatystycsContent statisticsArr={statisticsArr} />
      </div>
    </div>
  );
};
