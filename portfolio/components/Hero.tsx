'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '../lib/gsap';
import { CONTENT } from '../lib/constants';
import { GlowText } from './ui/GlowText';
import { Button } from './ui/Button';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title on scroll
      gsap.to(titleRef.current, {
        scale: 0.8,
        opacity: 0.5,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Animate subtitle
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <GlowText color="violet">{CONTENT.hero.title}</GlowText>
        </motion.h1>

        <motion.p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto"
        >
          {CONTENT.hero.subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Button size="lg" onClick={scrollToAbout}>
            Explore My Work
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.open(CONTENT.contact.cvUrl, '_blank')}>
            Download CV
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={scrollToAbout}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-violet-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};
