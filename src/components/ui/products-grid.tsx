'use client';

import React from 'react';
import { ProductCard } from './product-card';
import type { Product } from '@/lib/types/product';

interface ProductsGridProps {
  products: Product[];
  category?: 'clothing' | 'safety';
}

export function ProductsGrid({ products, category }: ProductsGridProps) {
  // Filter products by category if specified
  const filteredProducts = category 
    ? products.filter(product => product.category === category)
    : products;

  return (
    <div className="relative w-full overflow-x-hidden no-scrollbar">
      {/* Mobile scrollable container */}
      <div className="flex overflow-x-auto no-scrollbar sm:hidden">
        <div className="pl-6">
          <div className="flex gap-6">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="flex-none w-[240px]"
              >
                <ProductCard
                  product={product}
                  index={index}
                />
              </div>
            ))}
            {/* Right padding spacer */}
            <div className="flex-none w-6" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden sm:container sm:mx-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </div>
    </div>
  );
} 