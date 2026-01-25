import { Fragment } from 'react/jsx-runtime';
import { Text } from '../../../shared/ui/atoms';
import { useTranslation } from 'react-i18next';

type SalesCountdownType = {
  hours: number;
  minutes: number;
  seconds: number;
};

const SalesCountdown = ({ hours, minutes, seconds }: SalesCountdownType) => {
  const { t } = useTranslation('discountedWork');

  const countdownUnits = [
    { value: hours, label: t('timer.Hours') },
    { value: minutes, label: t('timer.Minutes') },
    { value: seconds, label: t('timer.Seconds') },
  ];

  return (
    <div
      className=" p-8 bg-secondary-background-color 
            opacity-75 rounded-[20px]   "
    >
      <Text font="font-space-mono-regular" size="t-text-xs">
        {t('timer.timerTitle')}:
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

// ---------------------------------Skeleton
SalesCountdown.Skeleton = () => {
  return (
    <div
      className=" p-8 bg bg-primary-background-color  
             rounded-[20px]   "
    >
      <div className="w-24 max-w-[30%] h-3 mb-5 skeleton-adaptive-background"></div>

      <ul className="grid grid-cols-[minmax(0,2fr)_1fr_minmax(0,2fr)_1fr_minmax(0,2fr)]  items-center justify-items-center">
        {Array.from({ length: 3 })
          .fill(0)
          .map((_, i) => {
            return (
              <Fragment key={i}>
                {/* ---------Numbers */}
                <li className="flex w-24 max-w-full gap-1 items-center row-start-1">
                  <div className="flex-1 h-10 min-w-0 skeleton-adaptive-background" />
                  <div className="flex-1 h-10 min-w-0 skeleton-adaptive-background" />
                </li>
                {/* ---------Dots */}
                {i < 2 && (
                  <li className="row-start-1 flex flex-col items-center gap-1">
                    <div className="skeleton-adaptive-background w-2.5 h-2.5"></div>
                    <div className="skeleton-adaptive-background w-2.5 h-2.5"></div>
                  </li>
                )}
                {/* ---------Labels */}
                <li
                  className="row-start-2 w-full"
                  style={{ gridColumn: `${i * 2 + 1}` }} // <-- label под цифрой
                >
                  <div className=" w-full h-3 mt-5 skeleton-adaptive-background"></div>
                </li>
              </Fragment>
            );
          })}
      </ul>
    </div>
  );
};
