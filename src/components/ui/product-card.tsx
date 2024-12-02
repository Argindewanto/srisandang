'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/firebase/products';
import Link from 'next/link';

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
        "group relative aspect-[4/5] rounded-lg overflow-hidden",
        className
      )}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-300" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col">
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-body-sm text-white border border-white/20 mb-4 self-start">
          {product.category}
        </span>

        {/* Title */}
        <h2 className="text-h3 text-white mb-6 group-hover:text-brand-primary transition-colors">
          {product.name}
        </h2>

        {/* View Details Link */}
        <Link 
          href="/catalogue-access"
          className="text-brand-primary text-body-sm group-hover:translate-x-0.5 transition-transform"
        >
          Lihat Detail & Harga →
        </Link>
      </div>
    </motion.div>
  );
} 