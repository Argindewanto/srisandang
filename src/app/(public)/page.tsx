'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { WhatsAppButton, CatalogueButton } from '@/components/ui/buttons';
import { ProductsGrid } from '@/components/ui/products-grid';
import { getProducts } from '@/app/actions/products';
import type { Product } from '@/lib/types/product';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { products: data, error: fetchError } = await getProducts();
        if (fetchError) {
          setError(fetchError);
        } else {
          setProducts(data);
        }
      } catch (error) {
        setError('Failed to load products');
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              variants={itemVariants}
              className="text-h1 md:text-display-sm mb-6"
            >
              Vendor Pengadaan Baju dan Merchandise Terpercaya
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-body-lg text-neutral-600 mb-8"
            >
              Melayani pembuatan baju dan merchandise untuk perusahaan, komunitas, dan instansi di seluruh Indonesia.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <WhatsAppButton className="w-full sm:w-auto" />
              <CatalogueButton className="w-full sm:w-auto" />
            </motion.div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative h-[400px] lg:h-[600px]"
          >
            {/* Main Image (Left) */}
            <motion.div
              variants={itemVariants}
              className="absolute left-0 bottom-0 w-[65%] aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src="/Hero-section-images-homepage/1.png"
                alt="Hero Image 1"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Secondary Image (Top Right) */}
            <motion.div
              variants={itemVariants}
              className="absolute top-[2%] lg:top-[10%] right-0 w-[50%] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/Hero-section-images-homepage/2.png"
                alt="Hero Image 2"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="text-sm text-brand-primary uppercase tracking-wider mb-4">
              Our Products
            </p>
            <h2 className="text-h2 mb-6">
              Featured Products
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="container py-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto"></div>
          </div>
        ) : error ? (
          <div className="container py-12 text-center text-neutral-600">
            {error}
          </div>
        ) : products.length > 0 ? (
          <ProductsGrid products={products} />
        ) : (
          <div className="container py-12 text-center text-neutral-600">
            No products available at the moment.
          </div>
        )}
      </section>
    </div>
  );
} 