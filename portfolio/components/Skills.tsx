'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../lib/constants';
import { SectionWrapper } from './ui/SectionWrapper';
import { GlowText } from './ui/GlowText';
import { Card } from './ui/Card';

export const Skills = () => {
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    new Set(CONTENT.skills.categories.map((cat) => cat.name))
  );

  const toggleCategory = (categoryName: string) => {
    setActiveCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  return (
    <SectionWrapper id="skills">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <GlowText color="emerald">{CONTENT.skills.title}</GlowText>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CONTENT.skills.categories.map((category, index) => {
          const isActive = activeCategories.has(category.name);

          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 group">
                {/* Toggle Header */}
                <div
                  className="flex items-center justify-between mb-4 cursor-pointer"
                  onClick={() => toggleCategory(category.name)}
                >
                  <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
                    {category.name}
                  </h3>
                  
                  {/* Toggle Switch */}
                  <motion.div
                    className={`relative w-14 h-7 rounded-full cursor-pointer transition-colors ${
                      isActive ? 'bg-violet-600' : 'bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{
                        x: isActive ? 28 : 0,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          boxShadow: '0 0 20px rgba(124, 58, 237, 0.6)',
                        }}
                      />
                    )}
                  </motion.div>
                </div>

                {/* Skills List */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isActive ? 'auto' : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-2">
                    {category.items.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className="px-3 py-1 bg-violet-500/10 border border-violet-500/30 rounded-lg text-sm text-gray-300 hover:bg-violet-500/20 hover:border-violet-500/50 transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
