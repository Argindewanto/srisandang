'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { WhatsAppButton, CatalogueButton } from '@/components/ui/buttons';
import { Building2, Users2, BadgeCheck, Truck } from 'lucide-react';
import { CTA } from '@/components/ui/cta';

export default function ProfilePage() {
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
      {/* Profile Section */}
      <section className="container py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <motion.div 
            variants={itemVariants}
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
              variants={itemVariants}
              className="text-sm text-brand-primary uppercase tracking-wider mb-4"
            >
              Mari Berkenalan
            </motion.p>
            <motion.h2 
              variants={itemVariants}
              className="text-h1 md:text-display-sm mb-8"
            >
              CV. Srisandang Prima Indonesia
            </motion.h2>
            <motion.div 
              variants={itemVariants}
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
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <WhatsAppButton className="w-full sm:w-auto" />
              <CatalogueButton className="w-full sm:w-auto" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-h1 text-neutral-900 mb-6">
                Tentang Kami
              </h2>
              <div className="space-y-4">
                <p className="text-body-lg text-neutral-600">
                  Srisandang Prima Indonesia adalah perusahaan manufaktur pakaian yang berfokus pada pembuatan seragam dan safety wear untuk kebutuhan industri dan korporasi.
                </p>
                <p className="text-body-lg text-neutral-600">
                  Dengan pengalaman lebih dari 8 tahun, kami telah melayani berbagai sektor industri dengan standar kualitas tinggi dan layanan yang profesional.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* Stats */}
              <div className="bg-white p-6 rounded-lg">
                <p className="text-h2 text-brand-primary mb-2">8+</p>
                <p className="text-body-sm text-neutral-600">Tahun Pengalaman</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <p className="text-h2 text-brand-primary mb-2">230+</p>
                <p className="text-body-sm text-neutral-600">Perusahaan dan Instansi</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <p className="text-h2 text-brand-primary mb-2">500k+</p>
                <p className="text-body-sm text-neutral-600">Pakaian Diporoduksi</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <p className="text-h2 text-brand-primary mb-2">100%</p>
                <p className="text-body-sm text-neutral-600">Garansi Kualitas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-h1 text-neutral-900 text-center mb-16">
            Nilai-Nilai Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary bg-opacity-10 mb-4">
                <BadgeCheck className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="text-h3 text-neutral-900 mb-2">Kualitas</h3>
              <p className="text-body-sm text-neutral-600">
                Komitmen untuk menghasilkan produk berkualitas tinggi
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary bg-opacity-10 mb-4">
                <Users2 className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="text-h3 text-neutral-900 mb-2">Pelayanan</h3>
              <p className="text-body-sm text-neutral-600">
                Fokus pada kepuasan dan kebutuhan pelanggan
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary bg-opacity-10 mb-4">
                <Building2 className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="text-h3 text-neutral-900 mb-2">Profesional</h3>
              <p className="text-body-sm text-neutral-600">
                Tim berpengalaman dengan standar kerja tinggi
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary bg-opacity-10 mb-4">
                <Truck className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="text-h3 text-neutral-900 mb-2">Ketepatan</h3>
              <p className="text-body-sm text-neutral-600">
                Pengiriman tepat waktu sesuai komitmen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="text-sm text-brand-primary uppercase tracking-wider mb-4">
              Lokasi Kami
            </p>
            <h2 className="text-h1 md:text-display-sm mb-8">
              Kunjungi Workshop Kami
            </h2>
          </div>
          <div className="aspect-video w-full rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.2795012006837!2d110.78551347497274!3d-7.582616092456043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a15c7216898d3%3A0xfb64ce3a030f7ff7!2sSRISANDANG%20Clothing%20Maker!5e0!3m2!1sen!2sid!4v1701302400000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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
    </div>
  );
} 