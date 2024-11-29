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
  Globe, 
  Shirt, 
  Ruler, 
  Palette, 
  PocketKnife, 
  Scissors, 
  ScanLine, 
  Paintbrush2, 
  FileText, 
  Package, 
  ClipboardList 
} from 'lucide-react';
import { FeatureCard } from '@/components/ui/feature-card';
import { ProductsGrid } from '@/components/ui/products-grid';
import { getProducts } from '@/app/actions/products';
import { SafetyBanner } from '@/components/ui/safety-banner';
import { TechnicalFeatureCard } from '@/components/ui/technical-feature-card';
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

  const technicalFeatures = [
    {
      icon: Shirt,
      title: "Lengan Panjang dan Pendek",
      description: "Bisa dibuat sebagian lengan panjang dan sebagian lagi lengan pendek."
    },
    {
      icon: Ruler,
      title: "Berbagai Ukuran Tersedia",
      description: "Dalam satu pesanan bisa menggunkan variasi ukuran darii S - XXXXL"
    },
    {
      icon: Palette,
      title: "Bordir dan Sablon",
      description: "Bordir / Sablon"
    },
    {
      icon: PocketKnife,
      title: "Tambah Aksesoris",
      description: "Tambahkan kantong, tempat bolpoin atau apapun di baju pesanan Anda."
    },
    {
      icon: ScanLine,
      title: "Pilih Jenis Bahan",
      description: "Sesuaikan bahan baju pesanan Anda sesuai dengan keinginan."
    },
    {
      icon: Scissors,
      title: "Pola Cutting Custom",
      description: "Jika Anda ada ukuran pola sendiri, pola bisa di sesuaikan dengan keinginan."
    }
  ];

  const serviceFeatures = [
    {
      icon: Paintbrush2,
      title: "Bantuan Design",
      description: "Membantu Anda membuat design baju sesuai dengan keinginan Anda."
    },
    {
      icon: Shirt,
      title: "Rekomendasi bahan",
      description: "Memberikan bahan terbaik sesuai dengan fungsi pakaian dan budget Anda."
    },
    {
      icon: Truck,
      title: "Mengurus Ekspedisi",
      description: "Kami bekerja sama ekspedisi terbaik dengan untuk volume besar."
    },
    {
      icon: FileText,
      title: "Dokumen Pemesanan",
      description: "Kami buatkan surat penawaran, proforma invoice, kontrak kerja sama, sura jalan, dll."
    },
    {
      icon: Package,
      title: "Pengiriman Sample",
      description: "Kami bisa mengirimkan sample ke kantor Anda."
    },
    {
      icon: ClipboardList,
      title: "Rekap Ukuran",
      description: "Kami bantu merekap ukuran untuk merapikan pemesanan."
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

      {/* Technical Features Section */}
      <section className="py-20">
        {/* Header */}
        <div className="container">
          <div className="max-w-3xl mb-12">
            <h2 className="text-h1 md:text-display-sm mb-4">
              Benar-benar Custom Sesuai Kebutuhan
            </h2>
            <p className="text-body-lg text-neutral-600">
              Bisa sesuai dengan kebutuhan spesifik dari perusahaan Anda.
            </p>
          </div>
        </div>

        {/* Features Grid - Mobile Scroll / Desktop Grid */}
        <div className="relative w-full overflow-x-hidden no-scrollbar mb-12">
          {/* Mobile scrollable container */}
          <div className="flex overflow-x-auto no-scrollbar md:hidden">
            <div className="pl-[2rem]">
              <div className="flex gap-6">
                {technicalFeatures.map((feature, index) => (
                  <div 
                    key={feature.title} 
                    className="flex-none w-[280px]"
                  >
                    <TechnicalFeatureCard
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
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
          <div className="hidden md:container md:mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalFeatures.map((feature, index) => (
              <TechnicalFeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton className="w-full sm:w-auto" />
            <CatalogueButton className="w-full sm:w-auto" />
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="container py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                duration: 0.5,
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: 'easeOut'
                }
              }
            }}
            className="relative aspect-square w-full rounded-2xl overflow-hidden order-1 lg:order-1"
          >
            <Image
              src="/Illustrations/teamprofilephoto.jpg"
              alt="Tim Srisandang"
              fill
              className="object-cover"
              priority
            />
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          {/* Copy */}
          <div className="order-2 lg:order-2">
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: 'easeOut'
                  }
                }
              }}
              className="text-sm text-brand-primary uppercase tracking-wider mb-4"
            >
              Mari Berkenalan
            </motion.p>
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: 'easeOut'
                  }
                }
              }}
              className="text-h1 md:text-display-sm mb-8"
            >
              Tentang Srisandang
            </motion.h2>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: 'easeOut'
                  }
                }
              }}
              className="space-y-6 text-body-lg text-neutral-600 mb-8"
            >
              <p>
                Srisandang resmi terdaftar di Direktorat Jenderal Pajak dengan nama CV. Srisandang Prima Indonesia. (NPWP: 95.895.525.4-532.000) CV. Srisandang Prima Indonesia Berdiri sejak 12 September 2016 yang beralamatkan di Jalan Wisma Yasa Blok F62, Baki, Sukoharjo.
              </p>
              <p>
                CV. Srisandang Prima Indonesia merupakan perusahaan yang bergerak di bidang produksi pakaian (Printing, Konveksi, dan Garment) . Bertempat di Pinggir Kota Solo, kami tetap melayani seluruh permintaan dari seluruh Indonesia bahkan Asia.
              </p>
            </motion.div>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: 'easeOut'
                  }
                }
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <WhatsAppButton className="w-full sm:w-auto" />
              <CatalogueButton className="w-full sm:w-auto" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Service Features Section */}
      <section className="py-20">
        {/* Header */}
        <div className="container">
          <div className="max-w-3xl mb-12">
            <h2 className="text-h1 md:text-display-sm mb-4">
              Memahami Kebutuhan Anda dan Melayani dengan Prima
            </h2>
            <p className="text-body-lg text-neutral-600">
              Mempermudah pekerjaan anda dalam memenuhi kebutuhan pakaian perusahaan
            </p>
          </div>
        </div>

        {/* Features Grid - Mobile Scroll / Desktop Grid */}
        <div className="relative w-full overflow-x-hidden no-scrollbar mb-12">
          {/* Mobile scrollable container */}
          <div className="flex overflow-x-auto no-scrollbar md:hidden">
            <div className="pl-[2rem]">
              <div className="flex gap-6">
                {serviceFeatures.map((feature, index) => (
                  <div 
                    key={feature.title} 
                    className="flex-none w-[280px]"
                  >
                    <TechnicalFeatureCard
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
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
          <div className="hidden md:container md:mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceFeatures.map((feature, index) => (
              <TechnicalFeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton className="w-full sm:w-auto" />
            <CatalogueButton className="w-full sm:w-auto" />
          </div>
        </div>
      </section>

      {/* Order Process Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <p className="text-sm text-brand-primary uppercase tracking-wider mb-4">
              Cara Order
            </p>
            <h2 className="text-h1 md:text-display-sm">
              Proses Pemesanan yang Memudahkan Pelanggan
            </h2>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                number: 1,
                title: "Ceritakan Kebutuhan Anda",
                description: "Anda bisa langsung menghubungi WhatsApp admin kami untuk berdiskusi"
              },
              {
                number: 2,
                title: "Kami Buatkan Penawaran",
                description: "Kami akan mengirimkan penawaran terbaik sesuai dengan kebutuhan dan budget Anda"
              },
              {
                number: 3,
                title: "Lanjut Proses Produksi",
                description: "Jika penawaran cocok, bisa dilakukan down payment danlanjut proses produksi"
              },
              {
                number: 4,
                title: "Pelunasan dan Pengiriman",
                description: "Jika Barang sudah siap kirim, dilakukan pelunasan lalu barang akan dikirim"
              }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut'
                }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Number */}
                <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center text-xl font-semibold mb-6">
                  {step.number}
                </div>

                {/* Connector Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-6 left-12 right-0 h-[2px] bg-brand-primary/30 -translate-y-1/2" />
                )}

                {/* Content */}
                <h3 className="text-h3 mb-3">
                  {step.title}
                </h3>
                <p className="text-body-sm text-neutral-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton className="w-full sm:w-auto" />
            <CatalogueButton className="w-full sm:w-auto" />
          </div>
        </div>
      </section>

      {/* Free Consultation Section */}
      <section className="container py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                duration: 0.5,
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Copy */}
          <div>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: 'easeOut'
                  }
                }
              }}
              className="text-sm text-brand-primary uppercase tracking-wider mb-4"
            >
              Konsultasi Gratis
            </motion.p>
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: 'easeOut'
                  }
                }
              }}
              className="text-h1 md:text-display-sm mb-8"
            >
              Ceritakan Kebutuhan Pengadaan Baju anda dan Kami akan Berikan Penawaran Terbaik
            </motion.h2>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: 'easeOut'
                  }
                }
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <WhatsAppButton className="w-full sm:w-auto" />
              <CatalogueButton className="w-full sm:w-auto" />
            </motion.div>
          </div>

          {/* Image */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: 'easeOut'
                }
              }
            }}
            className="relative aspect-square w-full rounded-2xl overflow-hidden order-first lg:order-last"
          >
            <Image
              src="/Illustrations/freeconsultationillustration.webp"
              alt="Free Consultation"
              fill
              className="object-cover"
              priority
            />
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

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