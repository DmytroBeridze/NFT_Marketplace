import { Button } from '../../../../shared/ui/atoms/Button';
import { Icon } from '../../../../shared/ui/atoms/Icon';
import { Text } from '../../../../shared/ui/atoms/Text';

export const HeroContent = () => {
  return (
    <div className="basis-1/2 flex flex-col gap-7 ">
      <Text
        className="text-primary-text-color px-2.5 leading-[110%] hero-tytle-size"
        font="font-work-sans-semibold"
        // size="t-text-3xl"
        Element="h1"
      >
        Discover digital art & Collect NFTs
      </Text>
      <Text
        className="text-primary-text-color px-2.5 leading-[160%] responsive-size-md"
        font="font-work-sans-regular"
        size="t-text-md"
        Element="p"
      >
        NFT marketplace UI created with Anima for Figma. Collect, buy and sell
        art from more than 20k NFT artists.
      </Text>

      {/* button */}
      <Button className="py-5 px-12 max-w-[224px] flex">
        <Icon name="rocket-icon" className="mr-3" size={20} />
        <Text
          Element="span"
          size="t-text-sm"
          font="font-work-sans-semibold"
          className="static-text-white-color"
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
