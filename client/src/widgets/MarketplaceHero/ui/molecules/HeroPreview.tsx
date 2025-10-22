import { gsap } from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Text } from '../../../../shared/ui/atoms';
import { useGetTopNftsQuery } from '../../model/topNftApi';
import { useEffect, useRef } from 'react';
import { HeroSlide } from './HeroSlide';
import { CenteredMessage } from '../../../../shared/ui/helpers';

export const HeroPreview = () => {
  const { isError, isLoading, data } = useGetTopNftsQuery(10);

  const items = data?.items || [];
  const swiperRef = useRef(null);

  // const { randomElement, updateRandom } = useRandomItem(items);

  // ------🏷️-GSAP previw anination
  useEffect(() => {
    gsap.set(swiperRef.current, { rotateY: -10 });
    const anim = gsap.to(swiperRef.current, {
      rotateY: 10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      transformOrigin: 'center center',
    });

    return () => {
      anim.kill();
    };
  }, []);

  if (isError)
    return (
      <CenteredMessage message="Error loading..." />
      // <Text
      //   size="responsive-size-ms"
      //   className=" basis-1/2 min-w-0  h-full flex-1 m-auto relative  heroPrewiew-responsive  text-center text-red-700"
      // >
      //   Error loading...
      // </Text>
    );

  if (!isLoading && items.length === 0)
    return (
      <CenteredMessage message="No NFTs found..." />
      // <Text
      //   size="responsive-size-ms"
      //   className=" basis-1/2 min-w-0  h-full flex-1 m-auto relative  heroPrewiew-responsive  text-center text-red-700"
      // >
      //   No NFTs found...
      // </Text>
    );

  return (
    <div
      className="basis-1/2 min-w-0  h-full flex-1  relative"
      style={{
        perspective: 800, // 👈 добавляет глубину
      }}
    >
      <Swiper
        ref={swiperRef}
        className=" turn-effect w-full h-full mySwiper shadow-secondary rounded-2xl "
        modules={[Navigation]}
        navigation={true}
        slidesPerView={1}
      >
        {items.map((nft, index) => {
          return (
            <SwiperSlide
              key={nft._id || index}
              className="w-full h-full flex justify-center"
            >
              <HeroSlide isLoading={isLoading} nft={nft} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
