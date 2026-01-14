'use client';

import { useEffect, RefObject } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

interface ScrollTriggerOptions {
  trigger: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export const useScrollTrigger = (
  ref: RefObject<HTMLElement>,
  animation: gsap.TweenVars,
  options: Partial<ScrollTriggerOptions> = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const tween = gsap.to(ref.current, {
      ...animation,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'bottom 20%',
        ...options,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [ref, animation, options]);
};

export const useParallax = (
  ref: RefObject<HTMLElement>,
  speed: number = 1
) => {
  useEffect(() => {
    if (!ref.current) return;

    const tween = gsap.to(ref.current, {
      y: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [ref, speed]);
};
