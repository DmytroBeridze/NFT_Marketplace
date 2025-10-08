import { numberFormatter } from '../../../../shared/lib/formatters';
import { Text } from '../../../../shared/ui/atoms/Text';
import type { Statistics } from '../../model';

interface StatisticItemProps {
  key: string;
  value: string;
  statistics: Statistics;
}

export const StatisticItem = ({
  key,
  value,
  statistics,
}: StatisticItemProps) => {
  return (
    <div
      className=" basis-1/3 heroContent-Statistics-elements-responsive"
      key={key}
    >
      <Text
        Element="h4"
        font="font-space-mono-bold"
        className="hero-counter-number-size"
      >
        {numberFormatter(statistics[key as keyof Statistics])}
      </Text>
      <Text Element="span" size="t-text-md" font="font-work-sans-regular">
        {value}
      </Text>
    </div>
  );
};
