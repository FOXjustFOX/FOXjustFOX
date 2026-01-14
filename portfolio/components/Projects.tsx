'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { CONTENT } from '../lib/constants';
import { GlowText } from './ui/GlowText';
import { Card } from './ui/Card';
import { ExternalLink, Github } from 'lucide-react';

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContent = scrollRef.current;

    if (!container || !scrollContent) return;

    // Horizontal scroll setup
    const scrollWidth = scrollContent.scrollWidth - window.innerWidth;

    const tween = gsap.to(scrollContent, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative min-h-screen py-20">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div ref={scrollRef} className="flex gap-8 px-8">
          {/* Title Card */}
          <div className="min-w-[400px] lg:min-w-[500px] flex items-center">
            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <GlowText color="cyan">Featured Projects</GlowText>
            </motion.h2>
          </div>

          {/* Project Cards */}
          {CONTENT.projects.map((project, index) => (
            <motion.div
              key={index}
              className="min-w-[400px] lg:min-w-[500px]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full flex flex-col group">
                {/* Project Header */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-cyan-400 mb-4">{project.role}</p>
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Highlights */}
                {project.highlights.length > 0 && (
                  <div className="mb-4">
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-400 flex items-start"
                        >
                          <span className="text-violet-500 mr-2">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-violet-500/10 border border-violet-500/30 rounded-full text-xs text-violet-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {project.links.length > 0 && (
                  <div className="flex gap-4 mt-auto">
                    {project.links.map((link, linkIndex) => (
                      <motion.a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        {link.label}
                      </motion.a>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
