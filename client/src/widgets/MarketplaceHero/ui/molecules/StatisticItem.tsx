import { numberFormatter } from '../../../../shared/lib/formatters';

import { Text } from '../../../../shared/ui/atoms';
import { Skeleton } from '../../../../shared/ui/atoms/Skeleton';

import { type Statistics } from '../../model';

interface StatisticItemProps {
  statKey: string;
  value: string;
  statistics?: Statistics;
  isLoading: boolean;
}

export const StatisticItem = ({
  statKey,
  value,
  statistics,
  isLoading,
}: StatisticItemProps) => {
  return (
    <div
      className={` basis-1/3 heroContent-Statistics-elements-responsive `}
      key={statKey}
    >
      <Text
        Element="h4"
        font="font-space-mono-bold"
        className={`hero-counter-number-size  relative  
             `}
      >
        <Skeleton
          isLoading={isLoading}
          background={'skeleton-adaptive-background rounded-md absolute'}
        />

        {statistics && !isLoading ? (
          numberFormatter(statistics[statKey as keyof Statistics])
        ) : (
          <span className="opacity-0 ">-</span>
        )}
      </Text>
      <Text
        Element="span"
        size="t-text-md"
        font="font-work-sans-regular"
        className="relative"
      >
        <Skeleton
          isLoading={isLoading}
          background={'skeleton-adaptive-background absolute rounded-md'}
        />

        <span className={` ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {value}
        </span>
      </Text>
    </div>
  );
};
