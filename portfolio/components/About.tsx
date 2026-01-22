'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '../lib/gsap';
import { CONTENT } from '../lib/constants';
import { SectionWrapper } from './ui/SectionWrapper';
import { GlowText } from './ui/GlowText';

export const About = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on image
      gsap.to(imageRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Stagger text reveal
      gsap.from(textRef.current?.children || [], {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          ref={imageRef}
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-violet-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 opacity-50 blur-3xl" />
            </div>
            {/* Placeholder for profile image */}
            <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/20">
              IL
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div ref={textRef}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <GlowText color="cyan">{CONTENT.about.title}</GlowText>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {CONTENT.about.description}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {['DevOps', 'AI/ML', 'Full-Stack', 'Systems Engineering'].map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full text-sm text-violet-400"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};
