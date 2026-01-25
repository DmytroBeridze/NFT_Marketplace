import { useTranslation } from 'react-i18next';
import { ButtonWithIcon } from '../../../shared/ui/molecules/ButtonWithIcon';
import { SectionHeader } from '../../../shared/ui/molecules/SectionHeader';
import { useNavigate } from 'react-router-dom';

export const DiscoverMoreNFTsContent = () => {
  const { t } = useTranslation('discoverMoreNFTs');
  let navigate = useNavigate();

  return (
    <SectionHeader
      title={t('Discover')}
      description={t('Explore')}
      className="flex gap-3.5 items-end justify-between "
    >
      <ButtonWithIcon
        variant="outline"
        className=" py-5 px-6  md:px-12 sm:max-h-16  max-h-14 
        shrink-0 items-center main-button-smallSize-hidden  "
        radius="xl"
        iconClassName="static-text-purple-color"
        icon="eye-icon"
        textClassName="md:text-base text-xs text-primary-text-color"
        onClick={() => navigate('/gallery')}
      >
        {t('See All')}
      </ButtonWithIcon>
    </SectionHeader>
  );
};
