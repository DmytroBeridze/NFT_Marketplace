import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
export const useProfileStatisticsAnimation = () => {
  // ----------------------GSAP
  const statisticsRef = useRef<HTMLUListElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const createBtnRef = useRef<HTMLDivElement>(null);
  const editBtnRef = useRef<HTMLDivElement>(null);
  const galleryBtnRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !statisticsRef.current ||
        !bioRef ||
        !linksRef ||
        !createBtnRef ||
        !editBtnRef ||
        !galleryBtnRef
      )
        return;
      // -------------------statistics
      gsap.from(statisticsRef.current, {
        scrollTrigger: {
          trigger: statisticsRef.current,
          // start: 'top 60%',
        },
        autoAlpha: 0,
        duration: 0.5,
        opacity: 0,
        stagger: 0.15,
        y: 100,
        ease: 'power2.out',
      });

      // -------------------bio
      gsap.from(bioRef.current, {
        scrollTrigger: {
          trigger: bioRef.current,
          // start: 'top 60%',
        },
        autoAlpha: 0,
        duration: 0.9,
        opacity: 0,
        stagger: 0.15,
        y: 100,
        ease: 'power2.out',
      });

      // -------------------links
      gsap.from(linksRef.current, {
        scrollTrigger: {
          trigger: linksRef.current,
          // start: 'top 60%',
        },
        autoAlpha: 0,
        duration: 0.9,
        opacity: 0,
        stagger: 0.15,
        y: 100,
        ease: 'power2.out',
      });

      // -------------------create
      gsap.from(createBtnRef.current, {
        scrollTrigger: {
          trigger: createBtnRef.current,
          // start: 'top 60%',
        },
        autoAlpha: 0,
        duration: 0.5,
        opacity: 0,
        stagger: 0.15,
        y: 80,
        ease: 'power2.out',
      });

      // -------------------edit Btn
      gsap.from(editBtnRef.current, {
        scrollTrigger: {
          trigger: editBtnRef.current,
          // start: 'top 60%',
        },
        autoAlpha: 0,
        duration: 0.9,
        opacity: 0,
        stagger: 0.15,
        y: 80,
        ease: 'power2.out',
      });

      // -------------------gallery Btn
      gsap.from(galleryBtnRef.current, {
        scrollTrigger: {
          trigger: galleryBtnRef.current,
          // start: 'top 60%',
        },
        autoAlpha: 0,
        duration: 1.2,
        opacity: 0,
        stagger: 0.15,
        y: 80,
        ease: 'power2.out',
      });
    },
    { scope: statisticsRef },
  );

  return {
    statisticsRef,
    bioRef,
    linksRef,
    createBtnRef,
    editBtnRef,
    galleryBtnRef,
  };
};
