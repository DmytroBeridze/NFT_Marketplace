import { numberFormatter } from '../../../../shared/lib/formatters';
import { Text } from '../../../../shared/ui/atoms/Text';
import type { Statistics } from '../../model';

interface StatisticItemProps {
  statKey: string;
  value: string;
  statistics?: Statistics;
}

export const StatisticItem = ({
  statKey,
  value,
  statistics,
}: StatisticItemProps) => {
  if (!statistics) return null;

  return (
    <div
      className=" basis-1/3 heroContent-Statistics-elements-responsive"
      key={statKey}
    >
      <Text
        Element="h4"
        font="font-space-mono-bold"
        className="hero-counter-number-size"
      >
        {numberFormatter(statistics[statKey as keyof Statistics])}
      </Text>
      <Text Element="span" size="t-text-md" font="font-work-sans-regular">
        {value}
      </Text>
    </div>
  );
};
