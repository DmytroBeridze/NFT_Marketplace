import { Fragment } from 'react/jsx-runtime';
import { Text } from '../../../shared/ui/atoms';

type SalesCountdownType = {
  hours: number;
  minutes: number;
  seconds: number;
};

const SalesCountdown = ({ hours, minutes, seconds }: SalesCountdownType) => {
  const countdownUnits = [
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ];

  return (
    <div
      className=" p-8 bg-secondary-background-color 
            opacity-75 rounded-[20px]"
    >
      <Text font="font-space-mono-regular" size="t-text-xs">
        Sale ends in:
      </Text>

      <ul className="flex justify-between gap-3 ">
        {countdownUnits.map((elem, i) => {
          return (
            <Fragment key={i}>
              <li className="flex flex-col items-center">
                <Text font="font-space-mono-bold" size="t-text-xl">
                  {elem.value}
                </Text>
                <Text font="font-space-mono-regular" size="t-text-xs">
                  {elem.label}
                </Text>
              </li>
              {i < countdownUnits.length - 1 && (
                <Text
                  font="font-space-mono-bold"
                  size="t-text-lg"
                  className="mt-1.5"
                >
                  :
                </Text>
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default SalesCountdown;
