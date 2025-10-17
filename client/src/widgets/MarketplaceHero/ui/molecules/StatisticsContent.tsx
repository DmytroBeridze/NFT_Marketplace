import { memo } from 'react';
import { t } from 'i18next';

import { useGetStatisticsQuery } from '../../model';
import { ErrorText } from '../../../../shared/ui/atoms';
import { StatisticItem } from './StatisticItem';

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
          <ErrorText className="text-red-700 w-full  text-center responsive-size-sm animate-pulse">
            Loading Error...
          </ErrorText>
        )}

        {!isError &&
          statisticsArr.map(([key, val]) => {
            const value = t(val);

            return (
              <StatisticItem
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
