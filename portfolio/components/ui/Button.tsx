'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
  type = 'button',
}) => {
  const baseStyles = 'relative font-semibold transition-all duration-300 overflow-hidden rounded-full';
  
  const variantStyles = {
    primary: 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/50 hover:shadow-violet-500/70',
    secondary: 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70',
    outline: 'border-2 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0"
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};
