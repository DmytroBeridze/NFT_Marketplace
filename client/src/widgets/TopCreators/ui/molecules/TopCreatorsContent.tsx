import { useContext } from 'react';
import { ThemeContext } from '../../../../shared/lib/theme/ThemeContext';
import { ButtonWithIcon } from '../../../../shared/ui/molecules/ButtonWithIcon';
import { SectionHeader } from '../../../../shared/ui/molecules/SectionHeader';
import { useTranslation } from 'react-i18next';

export const TopCreatorsContent = () => {
  // const themeContext = useContext(ThemeContext);
  // const theme = themeContext?.theme;
  const { t } = useTranslation('topCreators');

  return (
    <SectionHeader
      title={t('topCreatorsTitle')}
      // title="Top Creators"
      description={t('topCreatorsDescription')}
      // description="Checkout Top Rated Creators on the NFT Marketplace"
      className="flex gap-3.5 items-end justify-between "
    >
      <ButtonWithIcon
        variant="outline"
        className=" py-5 px-6  md:px-12 sm:max-h-16  max-h-14 
            shrink-0 items-center main-button-smallSize-hidden  "
        radius="xl"
        iconClassName="static-text-purple-color"
        // fill={theme === 'light' ? 'black' : 'static-text-purple-color'}
        textClassName="md:text-base text-xs text-primary-text-color"
        onClick={() => console.log('Ranking')}
      >
        {t('viewRankings')}
      </ButtonWithIcon>
    </SectionHeader>
  );
};
