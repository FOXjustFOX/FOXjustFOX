'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  color?: 'violet' | 'cyan' | 'emerald';
}

export const GlowText: React.FC<GlowTextProps> = ({
  children,
  className = '',
  color = 'violet',
}) => {
  const colorStyles = {
    violet: 'text-violet-500',
    cyan: 'text-cyan-500',
    emerald: 'text-emerald-500',
  };

  const glowStyles = {
    violet: 'drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]',
    cyan: 'drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]',
    emerald: 'drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]',
  };

  return (
    <motion.span
      className={`${colorStyles[color]} ${glowStyles[color]} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.span>
  );
};
