import { t } from 'i18next';
import { useGetStatisticsQuery } from '../../model';
import { StatisticItem } from './StatisticItem';
import { memo } from 'react';
import { ErrorText, Spinner } from '../../../../shared/ui/atoms';

interface StatystycsContentProps {
  statisticsArr: [string, string][];
}

export const StatystycsContent = memo(
  ({ statisticsArr }: StatystycsContentProps) => {
    const { isLoading, isError, data } = useGetStatisticsQuery();
    const statistics = data?.statistics;

    return (
      <>
        {isLoading && (
          <Spinner wrapperClassName="w-full flex justify-center " />
        )}

        {isError && (
          <ErrorText className="text-red-700 w-full  text-center responsive-size-sm">
            Loading Error...
          </ErrorText>
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
      </>
    );
  },
);
