'use client';

import { CTA } from '@/components/ui/cta';
import { Building2, Users2, BadgeCheck, Truck } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-display-lg text-neutral-900 mb-6">
              CV. SriSandang Prima Indonesia
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              Mitra terpercaya dalam penyediaan seragam dan safety wear berkualitas tinggi untuk perusahaan di seluruh Indonesia.
            </p>
          </div>
        </div>
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
                  SriSandang Prima Indonesia adalah perusahaan manufaktur pakaian yang berfokus pada pembuatan seragam dan safety wear untuk kebutuhan industri dan korporasi.
                </p>
                <p className="text-body-lg text-neutral-600">
                  Dengan pengalaman lebih dari 10 tahun, kami telah melayani berbagai sektor industri dengan standar kualitas tinggi dan layanan yang profesional.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* Stats */}
              <div className="bg-white p-6 rounded-lg">
                <p className="text-h2 text-brand-primary mb-2">10+</p>
                <p className="text-body-sm text-neutral-600">Tahun Pengalaman</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <p className="text-h2 text-brand-primary mb-2">500+</p>
                <p className="text-body-sm text-neutral-600">Klien Puas</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <p className="text-h2 text-brand-primary mb-2">50k+</p>
                <p className="text-body-sm text-neutral-600">Produk Terjual</p>
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

      {/* CTA Section */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-h2 text-neutral-900 mb-4">
            Mari Bekerja Sama
          </h2>
          <p className="text-body-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Hubungi kami untuk mendiskusikan kebutuhan seragam dan safety wear perusahaan Anda.
          </p>
          <CTA />
        </div>
      </section>
    </div>
  );
} 