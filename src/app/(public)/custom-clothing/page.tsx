'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { WhatsAppButton, CatalogueButton } from '@/components/ui/buttons';
import { Marquee } from '@/components/ui/marquee';
import { 
  BadgeCheck, 
  Truck, 
  Clock, 
  Headphones, 
  ShieldCheck, 
  Banknote, 
  MapPin, 
  Wallet, 
  Globe 
} from 'lucide-react';
import { FeatureCard } from '@/components/ui/feature-card';
import { ProductsGrid } from '@/components/ui/products-grid';
import { getProducts } from '@/app/actions/products';
import { SafetyBanner } from '@/components/ui/safety-banner';
import type { Product } from '@/lib/firebase/products';

export default function CustomClothingPage() {
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

  const features = [
    {
      icon: MapPin,
      title: "Dari Solo Melayani Seluruh Area Indonesia",
      description: "Kami sudah mengirim ribuan baju pesanan ke penjuru pulau Jawa, Sumatera, Kalimantan, Sulawesi, Bali, dan NTT."
    },
    {
      icon: Wallet,
      title: "Menyesuaikan Spesifikasi dan Budget Anda",
      description: "Kami sangat flexible, Anda bisa ceritakan kebutuhan Anda seperti apa, kami akan berikan penawaran terbaik dengan rekomendasi bahan konveksi terbaik."
    },
    {
      icon: Globe,
      title: "Serba Online, Baju Pesanan Bisa Sampai di Tujuan",
      description: "Anda bisa melakukan pemesanan secara online, jalur WhatsApp atau mengirim PO di email kami bisa melayaninya."
    }
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const { products: data, error: fetchError } = await getProducts({ 
          category: 'clothing' 
        });
        
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
              Vendor Pengadaan Baju dan Merchandise Berkualitas
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-body-lg text-neutral-600 mb-8"
            >
              Menyediakan layanan pengadaan pakaian dan merchandise untuk perusahaan, komunitas, dan instansi.
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
                alt="Custom Clothing Main Image"
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
                alt="Custom Clothing Secondary Image"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Client Logo Section */}
      <section className="bg-white py-16">
        <h2 className="text-h3 text-neutral-600 text-center mb-8">
          Dipercaya Oleh Perusahaan Terkemuka
        </h2>
        <Marquee speed="normal" />
      </section>

      {/* Features Section */}
      <section className="bg-neutral-50 py-24">
        <div className="container">
          <div className="mb-16">
            <p className="text-sm text-brand-primary uppercase tracking-wider mb-4">
              Sahabat Purchasing
            </p>
            <h2 className="text-h1 md:text-display-sm text-neutral-900 max-w-4xl">
              Kombinasi antara kualitas produk, layanan prima, dan kerja sama yang menguntungkan.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <WhatsAppButton className="w-full sm:w-auto" />
            <CatalogueButton className="w-full sm:w-auto" />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="text-sm text-brand-primary uppercase tracking-wider mb-4">
              Cukup Satu Vendor
            </p>
            <h2 className="text-h2 mb-6">
              Bisa Melayani Pembuatan Berbagai Jenis Pengadaan Baju dan Merchandise
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

        {/* CTA */}
        <div className="container">
          <div className="flex justify-start mt-12">
            <CatalogueButton className="w-full sm:w-auto" />
          </div>
        </div>
      </section>

      {/* Safety Banner Section */}
      <SafetyBanner />

      {/* CTA Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-h2 text-neutral-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-body-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your custom clothing needs or request access to our full catalogue.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors"
            >
              Contact via WhatsApp
            </a>
            <a
              href="/catalogue-access"
              className="px-6 py-3 border border-neutral-200 text-neutral-900 rounded-md hover:bg-neutral-50 transition-colors"
            >
              View Catalogue
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 