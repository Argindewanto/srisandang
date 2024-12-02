'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { Testimonial } from '@/lib/firebase/testimonials';

interface TestimonialCardProps {
  clientName: string;
  content: string;
  image?: string;
  imageOrientation?: 'portrait' | 'landscape';
  className?: string;
  index?: number;
}

export function TestimonialCard({
  clientName,
  content,
  image,
  imageOrientation = 'portrait',
  className,
  index = 0
}: TestimonialCardProps) {
  const hasImage = Boolean(image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      viewport={{ once: true }}
      className={cn(
        "group relative rounded-xl bg-background border",
        hasImage && [
          "cursor-pointer overflow-hidden transition-all duration-500",
          "hover:border-0",
          imageOrientation === 'portrait' 
            ? "hover:h-[600px]"
            : "hover:h-[400px]",
        ],
        className
      )}
    >
      {/* Default State: Text Content */}
      <div className={cn(
        "p-6",
        hasImage && "transition-all duration-500 ease-in-out group-hover:opacity-0"
      )}>
        <h3 className="text-h3 mb-2">
          {clientName}
        </h3>
        <p className="text-body-sm text-neutral-600">
          {content}
        </p>
      </div>

      {/* Hover State: Image (only if image exists) */}
      {hasImage && image && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <div className={cn(
            "relative w-full h-full",
            imageOrientation === 'portrait' 
              ? "pt-4 px-4" // Add padding only to top and sides for portrait
              : "p-0" // No padding for landscape
          )}>
            <Image
              src={image}
              alt={`Testimonial from ${clientName}`}
              fill
              className="object-top object-contain"
              sizes={imageOrientation === 'portrait' ? '576px' : '890px'}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
} 