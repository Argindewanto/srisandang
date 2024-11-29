'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect } from 'react';

interface MarqueeProps {
  className?: string;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
}

export function Marquee({ 
  className,
  direction = 'left',
  speed = 'normal'
}: MarqueeProps) {
  const translation = useMotionValue(0);
  const logos = Array.from({ length: 15 }, (_, i) => `/corporate-client-logo/${i + 1}.png`);
  
  const getDuration = () => {
    switch(speed) {
      case 'slow': return 60;
      case 'fast': return 20;
      default: return 40;
    }
  };

  useEffect(() => {
    const contentWidth = 240 * logos.length;
    const controls = animate(translation, 
      direction === 'left' ? [-contentWidth, 0] : [0, -contentWidth], 
      {
        ease: 'linear',
        duration: getDuration(),
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      }
    );

    return controls.stop;
  }, [direction, logos.length]);

  return (
    <div className={cn("relative w-full overflow-hidden py-8", className)}>
      <motion.div 
        className="flex gap-16"
        style={{ x: translation }}
      >
        {/* First set of logos */}
        {logos.map((logo, i) => (
          <div key={i} className="flex-none">
            <Image
              src={logo}
              alt={`Client Logo ${i + 1}`}
              width={240}
              height={120}
              className="w-auto h-20 object-contain grayscale hover:grayscale-0 transition-all"
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {logos.map((logo, i) => (
          <div key={`duplicate-${i}`} className="flex-none">
            <Image
              src={logo}
              alt={`Client Logo ${i + 1}`}
              width={240}
              height={120}
              className="w-auto h-20 object-contain grayscale hover:grayscale-0 transition-all"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
} 