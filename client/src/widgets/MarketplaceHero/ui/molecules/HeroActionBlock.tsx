import { Button } from '../../../../shared/ui/atoms/Button';
import { Icon } from '../../../../shared/ui/atoms/Icon';
import { Text } from '../../../../shared/ui/atoms/Text';

export const HeroActionBlock = () => {
  return (
    <div className="marketplaceHero-button-bigSize-hidden flex flex-col gap-5">
      <Button className="py-5 px-12  flex  justify-center " radius="xl">
        <Icon name="rocket-icon" className="mr-3" size={20} />
        <Text
          Element="span"
          size="t-text-sm"
          font="font-work-sans-semibold"
          className="static-text-white-color "
        >
          Get Started
        </Text>
      </Button>
      {/* CounterStat */}
      <div className="flex gap-7  text-primary-text-color">
        <div className=" basis-1/3  ">
          <Text
            Element="h4"
            font="font-space-mono-bold"
            className="hero-counter-number-size"
          >
            170k+
          </Text>
          <Text Element="span" size="t-text-md" font="font-work-sans-regular">
            TotalSale
          </Text>
        </div>
        <div className=" basis-1/3 ">
          <Text
            Element="h4"
            font="font-space-mono-bold"
            className="hero-counter-number-size"
          >
            170k+
          </Text>
          <Text Element="span" size="t-text-md" font="font-work-sans-regular">
            Artists
          </Text>
        </div>
        <div className=" basis-1/3 ">
          <Text
            Element="h4"
            font="font-space-mono-bold"
            className="hero-counter-number-size"
          >
            170k+
          </Text>
          <Text Element="span" size="t-text-md" font="font-work-sans-regular">
            Images
          </Text>
        </div>
      </div>
    </div>
  );
};
