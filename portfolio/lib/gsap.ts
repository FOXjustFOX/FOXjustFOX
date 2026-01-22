import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

// GSAP utility functions
export const fadeIn = (element: string | Element, options = {}) => {
  return gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
};

export const fadeInStagger = (elements: string | Element[], options = {}) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.1,
    ease: 'power3.out',
    ...options,
  });
};

export const scaleIn = (element: string | Element, options = {}) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    ...options,
  });
};

export const slideInFromLeft = (element: string | Element, options = {}) => {
  return gsap.from(element, {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
};

export const slideInFromRight = (element: string | Element, options = {}) => {
  return gsap.from(element, {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
};

export const parallaxEffect = (element: string | Element, options = {}) => {
  return gsap.to(element, {
    y: -100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
    ...options,
  });
};
