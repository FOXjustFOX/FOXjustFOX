// Animation configuration constants
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1,
  },
  ease: {
    smooth: 'power3.out',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.3)',
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2,
  },
} as const;

// Scroll trigger configurations
export const SCROLL_CONFIG = {
  hero: {
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
  section: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },
  parallax: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
} as const;

// Animation variants for framer-motion
export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
