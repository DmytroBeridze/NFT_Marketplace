import { memo } from 'react';
import { t } from 'i18next';

import { ErrorText } from '../../../shared/ui/atoms';
import { useGetStatisticsQuery } from '../model';
import { StatisticItem } from '../../../widgets/MarketplaceHero/ui';

interface StatystycsContentProps {
  statisticsArr: [string, string][];
}

export const StatystycsContent = memo(
  ({ statisticsArr }: StatystycsContentProps) => {
    const { isLoading, isError, data } = useGetStatisticsQuery();
    const statistics = data?.statistics;

    return (
      <>
        {isError && (
          <ErrorText
            data-testid="statystycsContent-error"
            className="text-red-700 w-full  text-center responsive-size-sm animate-pulse"
          >
            Loading Error...
          </ErrorText>
        )}

        {!isError &&
          statisticsArr.map(([key, val]) => {
            const value = t(val);

            return (
              <StatisticItem
                data-testid="statisticItem"
                key={key}
                statKey={key}
                value={value}
                // isLoading={true}
                isLoading={isLoading}
                statistics={statistics}
              />
            );
          })}
      </>
    );
  },
);
