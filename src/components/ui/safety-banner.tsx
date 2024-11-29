'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function SafetyBanner() {
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
    <section className="container pt-20">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative rounded-2xl bg-black overflow-hidden"
      >
        {/* Grid Background */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(90deg, #ffffff 1px, transparent 1px),
              linear-gradient(180deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            opacity: 0.2
          }}
        />

        {/* Content */}
        <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Copy with its own gradient */}
          <div className="relative">
            {/* Text content gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent z-[1]" />
            
            {/* Content */}
            <div className="relative z-[2] text-white p-6 lg:p-12">
              <motion.h2 
                variants={itemVariants}
                className="text-h1 md:text-display-sm mb-4"
              >
                Butuh Pengadaan Baju Safety Work Wear?
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-body-lg text-white/70 mb-8"
              >
                Silahkan lihat detailnya di sini
              </motion.p>
              <motion.div variants={itemVariants}>
                <Link 
                  href="/safety-wear" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors gap-2"
                >
                  Lihat Detail
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Image */}
          <motion.div 
            variants={itemVariants}
            className="relative aspect-square w-full h-full"
          >
            <Image
              src="/Illustrations/safetyworkwearbannerillustration.webp"
              alt="Safety Workwear"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 