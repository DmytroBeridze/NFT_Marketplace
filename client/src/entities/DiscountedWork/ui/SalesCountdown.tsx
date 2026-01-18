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
            opacity-75 rounded-[20px]   "
    >
      <Text font="font-space-mono-regular" size="t-text-xs">
        Sale ends in:
      </Text>

      <ul className="grid grid-cols-[2fr_1fr_2fr_1fr_2fr] grid-rows-[2fr_1fr]  items-center justify-items-center">
        {/* <ul className="flex  flex-wrap sm:flex-nowrap justify-between   gap-3 "> */}
        {countdownUnits.map((elem, i) => {
          return (
            <Fragment key={i}>
              <li className="flex flex-col items-center row-start-1">
                {/* ---------Numbers */}
                <Text
                  font="font-space-mono-bold"
                  className="discountCountDown-number-responsive"
                  // className="responsive-size-lg "
                >
                  {elem.value}
                </Text>
              </li>
              {/* ---------Dots */}
              {i < countdownUnits.length - 1 && (
                <li className="row-start-1">
                  <Text
                    font="font-space-mono-bold"
                    // size="t-text-lg"
                    className="discountCountDown-number-responsive"
                    // className="responsive-size-lg"
                  >
                    :
                  </Text>
                </li>
              )}
              {/* ---------Labels */}
              <li
                className="row-start-2"
                style={{ gridColumn: `${i * 2 + 1}` }} // <-- label под цифрой
              >
                <Text font="font-space-mono-regular" size="responsive-size-xxs">
                  {elem.label}
                </Text>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default SalesCountdown;
