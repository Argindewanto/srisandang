'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/firebase/products';
import { CatalogueProductModal } from './catalogue-product-modal';

interface CatalogueProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

export function CatalogueProductCard({
  product,
  className,
  index = 0,
}: CatalogueProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = product.images[0] || '/placeholder-product.jpg';

  return (
    <>
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
          "group relative aspect-[4/5] rounded-lg overflow-hidden cursor-pointer",
          className
        )}
        onClick={() => setIsModalOpen(true)}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-300" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h2 className="text-h3 text-white mb-4 group-hover:text-brand-primary transition-colors">
            {product.name}
          </h2>

          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-md hover:bg-white/20 transition-colors text-body-sm">
            Lihat Detail & Harga
          </span>
        </div>
      </motion.div>

      <CatalogueProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 