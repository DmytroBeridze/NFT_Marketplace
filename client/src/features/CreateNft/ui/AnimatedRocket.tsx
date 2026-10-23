import { useEffect, useRef } from 'react';
import { Icon, Text } from '../../../shared/ui/atoms';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
gsap.registerPlugin(SplitText);

export const AnimatedRocket = () => {
  // ------------------rocket icon container ref
  const rocketContainerRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // -------------------rocket
    const container = rocketRef.current;

    const flames = container?.querySelectorAll(
      '.rocket-boost_svg__rocket-flame',
    );
    flames?.forEach((elem) => ((elem as HTMLElement).style.fill = 'orange'));
  }, []);

  // -------------------------GSAP

  useGSAP(
    () => {
      const rocket = rocketRef.current;
      const coinHex = coinRef.current?.querySelector(
        '.Token-coin_svg__coin-hexagon',
      );
      const rocketContainer = rocketContainerRef.current;
      const flames = rocketRef.current?.querySelectorAll(
        '.rocket-boost_svg__rocket-flame',
      );

      if (!rocket || !rocketContainer || !flames?.length || !coinHex) return;

      gsap.from(rocketContainer, {
        scrollTrigger: {
          trigger: rocketContainer,
          start: 'top 85%',
        },
        autoAlpha: 0,
        duration: 1,
      });

      gsap.to(flames, {
        duration: 0.05,
        ease: 'power2.out',
        opacity: 0.2,
        repeat: -1,
        delay: 0.05,
        repeatDelay: 0.03,
        yoyo: true,
      });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: rocket,
          start: 'top 70%',
        },
      });

      tl.to(rocket, {
        duration: 1,
        x: 150,
        opacity: 0,
      });

      // ---------------------coin after rocket
      tl.to(coinHex, {
        duration: 0.3,
        fill: 'orange',
      });

      tl.to(coinRef.current, {
        rotate: '-=360',
        duration: 1,
        ease: 'none',
        x: -140,
        // x: -140,
      });

      // -----------------------text after coin
      let split = SplitText.create(titleRef.current, { type: 'chars' });

      gsap.set(split.chars, {
        autoAlpha: 0,
        x: -85,
      });

      const charsReversed = [...split.chars].reverse();

      tl.to(
        charsReversed,
        {
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.07,
          // x: 0,
        },
        '<',
      );

      tl.to(coinRef.current, {
        duration: 1.5,
        ease: 'none',
        scale: 0.6,
      });
      tl.to(logoRef.current, {
        x: 100,
      });
    },

    { scope: rocketRef },
  );

  return (
    <div
      ref={rocketContainerRef}
      className="flex items-center justify-center h-full relative "
    >
      <div ref={logoRef} className="flex items-center  relative">
        <div ref={coinRef} className="relative shrink-0 w-full ">
          <Icon
            name="tokenCoin-icon"
            // size={60}

            // size="clamp(1.25rem, -0.383rem + 8.16vw, 60px)"
            size="clamp(1rem, 0.102rem + 4.49vw, 3.75rem)"
            className="static-text-purple-color opacity-60"
          />
        </div>
        <div
          ref={titleRef}
          className="absolute responsive-size-md static-text-purple-color w-[500px]"
        >
          NFTMarketplace
          {/* NFT_Marketplace */}
        </div>
      </div>

      <div ref={rocketRef} className="relative ">
        <Icon
          name="rocketBoost-icon"
          // size={100}
          size="clamp(1.25rem, -0.383rem + 8.16vw, 6.25rem)"
          className="static-text-purple-color opacity-60 z-50"
        />
      </div>
    </div>
  );
};
