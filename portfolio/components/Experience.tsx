'use client';

import { motion } from 'framer-motion';
import { CONTENT } from '../lib/constants';
import { SectionWrapper } from './ui/SectionWrapper';
import { GlowText } from './ui/GlowText';
import { Card } from './ui/Card';
import { Briefcase } from 'lucide-react';

export const Experience = () => {
  return (
    <SectionWrapper id="experience">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <GlowText color="violet">Experience & Education</GlowText>
      </motion.h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {CONTENT.experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 group">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-violet-500/10 rounded-lg border border-violet-500/30 group-hover:bg-violet-500/20 transition-colors">
                  <Briefcase className="w-6 h-6 text-violet-400" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-cyan-400 text-sm mb-2">
                    {exp.company} • {exp.period}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};
