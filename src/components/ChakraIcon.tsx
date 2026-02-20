import React from 'react';
import { motion } from 'motion/react';
import { ChakraInfo, ChakraStatus } from '../types';

interface ChakraIconProps {
  chakra: ChakraInfo;
  status?: ChakraStatus;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  isActive?: boolean;
}

export const ChakraIcon: React.FC<ChakraIconProps> = ({ 
  chakra, 
  status, 
  size = 'md', 
  onClick,
  isActive = false
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-24 h-24 text-5xl'
  };

  const statusColors = {
    blocked: 'opacity-30 grayscale',
    underactive: 'opacity-60',
    balanced: 'opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.5)]',
    overactive: 'opacity-100 scale-110 shadow-[0_0_25px_rgba(255,255,255,0.8)]',
    overflowing: 'opacity-100 scale-125 animate-pulse shadow-[0_0_40px_rgba(255,255,255,1)]'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`
        relative flex items-center justify-center rounded-full cursor-pointer transition-all duration-500
        ${sizeClasses[size]}
        ${status ? statusColors[status] : 'opacity-100'}
        ${isActive ? 'ring-4 ring-white ring-offset-4 ring-offset-transparent' : ''}
      `}
      style={{ backgroundColor: chakra.color }}
    >
      <span className="select-none">{chakra.symbol}</span>
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-xl -z-10 opacity-50"
        style={{ backgroundColor: chakra.color }}
      />
      
      {/* Label for larger sizes */}
      {size === 'lg' && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <p className="text-xs font-bold uppercase tracking-widest text-white/80">{chakra.sanskritName}</p>
        </div>
      )}
    </motion.div>
  );
};
