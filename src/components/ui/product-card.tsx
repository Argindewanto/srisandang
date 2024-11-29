'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/types/product';

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

export function ProductCard({
  product,
  className,
  index = 0,
}: ProductCardProps) {
  const imageUrl = product.images[0] || '/placeholder-product.jpg';

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
        "group relative overflow-hidden rounded-lg bg-background border hover:border-primary transition-colors",
        className
      )}
    >
      <div className="relative pb-[125%] overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-h3">{product.name}</h3>
        <p className="text-body-sm text-neutral-600 mt-2 line-clamp-2">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
} 