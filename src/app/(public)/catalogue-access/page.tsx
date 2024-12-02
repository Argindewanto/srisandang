'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createLead } from '@/lib/firebase/leads';
import { Loader2 } from 'lucide-react';
import Script from 'next/script';
import { trackLeadFormConversion } from '@/components/google-tag';

const leadSchema = z.object({
  name: z.string().min(2, 'Nama harus minimal 2 karakter'),
  email: z.string().email('Masukkan email yang valid'),
  phone: z.string()
    .min(10, 'Nomor WhatsApp harus minimal 10 digit')
    .max(15, 'Nomor WhatsApp maksimal 15 digit')
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, 'Masukkan nomor WhatsApp yang valid (contoh: 081234567890)'),
  company: z.string().min(1, 'Nama perusahaan harus diisi'),
  panggilan: z.enum(['Kakak', 'Bapak', 'Ibu'], {
    required_error: 'Pilih panggilan',
  }),
  qtyRange: z.enum([
    '< 50',
    '50 - 100',
    '100 - 200',
    '200 - 300',
    '300 - 500',
    '500 - 1000',
    '> 1000'
  ], {
    required_error: 'Pilih perkiraan jumlah pesanan',
  }),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function CatalogueAccessPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      await createLead({
        ...data,
        status: 'new',
      });

      // Track Meta Pixel Lead event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Catalogue Access Form',
          content_category: 'Form',
          value: data.qtyRange,
          currency: 'IDR',
        });
      }

      // Track Google Ads Lead conversion with the correct ID
      trackLeadFormConversion(() => {
        router.push('/catalogue');
      });

    } catch (error) {
      console.error('Failed to submit lead:', error);
      setError('Gagal mengirim permintaan. Silakan coba lagi.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-display-sm text-neutral-900 mb-4">
              Akses Katalog Kami
            </h1>
            <p className="text-body-lg text-neutral-600">
              Isi formulir di bawah ini untuk mendapatkan akses ke katalog produk dan informasi harga lengkap kami.
            </p>
          </div>

          {/* Lead Form */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
            {error && (
              <div className="p-4 bg-red-50 border-b border-red-200">
                <p className="text-body-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-body-sm text-neutral-900 mb-2">
                  Nama *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                  placeholder="Masukkan nama"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="mt-1 text-body-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-body-sm text-neutral-900 mb-2">
                  Alamat Email *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                  placeholder="Masukkan alamat email"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-body-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field - Updated to WhatsApp */}
              <div>
                <label htmlFor="phone" className="block text-body-sm text-neutral-900 mb-2">
                  Nomor WhatsApp *
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                  placeholder="Contoh: 081234567890"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="mt-1 text-body-sm text-red-500">{errors.phone.message}</p>
                )}
                <p className="mt-1 text-body-sm text-neutral-500">
                  Format: Dimulai dengan 08, contoh: 081234567890
                </p>
              </div>

              {/* Company Field */}
              <div>
                <label htmlFor="company" className="block text-body-sm text-neutral-900 mb-2">
                  Nama Perusahaan *
                </label>
                <input
                  id="company"
                  type="text"
                  {...register('company')}
                  className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                  placeholder="Masukkan nama perusahaan"
                  disabled={isSubmitting}
                />
                {errors.company && (
                  <p className="mt-1 text-body-sm text-red-500">{errors.company.message}</p>
                )}
              </div>

              {/* Panggilan Field */}
              <div>
                <label htmlFor="panggilan" className="block text-body-sm text-neutral-900 mb-2">
                  Panggilan *
                </label>
                <select
                  id="panggilan"
                  {...register('panggilan')}
                  className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                  disabled={isSubmitting}
                >
                  <option value="">Pilih panggilan</option>
                  <option value="Kakak">Kakak</option>
                  <option value="Bapak">Bapak</option>
                  <option value="Ibu">Ibu</option>
                </select>
                {errors.panggilan && (
                  <p className="mt-1 text-body-sm text-red-500">{errors.panggilan.message}</p>
                )}
              </div>

              {/* Quantity Range Field */}
              <div>
                <label htmlFor="qtyRange" className="block text-body-sm text-neutral-900 mb-2">
                  Perkiraan Jumlah Pesanan *
                </label>
                <select
                  id="qtyRange"
                  {...register('qtyRange')}
                  className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                  disabled={isSubmitting}
                >
                  <option value="">Pilih jumlah</option>
                  <option value="< 50">Kurang dari 50 pcs</option>
                  <option value="50 - 100">50 - 100 pcs</option>
                  <option value="100 - 200">100 - 200 pcs</option>
                  <option value="200 - 300">200 - 300 pcs</option>
                  <option value="300 - 500">300 - 500 pcs</option>
                  <option value="500 - 1000">500 - 1000 pcs</option>
                  <option value="> 1000">Lebih dari 1000 pcs</option>
                </select>
                {errors.qtyRange && (
                  <p className="mt-1 text-body-sm text-red-500">{errors.qtyRange.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Mengirim...' : 'Minta Akses Katalog'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 