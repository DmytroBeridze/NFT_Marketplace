import { useTranslation } from 'react-i18next';
import { useTranslate } from '../../../../shared/lib/i18n';
import { ButtonWithIcon } from '../../../../shared/ui/molecules/ButtonWithIcon/ButtonWithIcon';
import { StatystycsContent } from '../../../../features/MarketplaceHero/ui/StatisticsContent';

import { useAppSelector } from '../../../../app/store/reduxHooks';
import { useNavigate } from 'react-router-dom';

export const HeroActionBlock = () => {
  const { t: tt } = useTranslation('translation');
  const { data } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const statisticsName = useTranslate({
    document: 'heroContent',
    translateKey: 'statistics',
    returnObjects: true,
  });

  const statisticsArr = Object.entries(statisticsName.translateVariables);

  return (
    <div className="main-button-bigSize-hidden flex flex-col gap-5 heroContent-heroactionBlock-responsive">
      <ButtonWithIcon
        className="py-5 px-12  flex  justify-center w-full "
        radius="xl"
        fill="white"
        onClick={() =>
          navigate(`${data?.userType === 'author' ? '/dashboard' : '/gallery'}`)
        }
      >
        {tt('button.getStarted')}
      </ButtonWithIcon>

      {/*---------------Statistics */}
      <div
        className="flex heroContent-statistics-responsive gap-7 
       text-primary-text-color w-full"
      >
        {/* -------------Content*/}
        <StatystycsContent statisticsArr={statisticsArr} />
      </div>
    </div>
  );
};
