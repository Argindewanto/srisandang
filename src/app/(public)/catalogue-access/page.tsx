'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createLead } from '@/lib/firebase/leads';
import { Loader2 } from 'lucide-react';
import { trackLeadFormConversion } from '@/components/google-tag';
import { WhatsAppButton } from '@/components/ui/buttons';

const leadSchema = z.object({
  name: z.string().min(2, 'Nama harus minimal 2 karakter'),
  company: z.string().min(1, 'Nama perusahaan harus diisi'),
  email: z.string().email('Masukkan email yang valid'),
  phone: z.string()
    .min(10, 'Nomor WhatsApp harus minimal 10 digit')
    .max(15, 'Nomor WhatsApp maksimal 15 digit')
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, 'Masukkan nomor WhatsApp yang valid (contoh: 081234567890)'),
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
        panggilan: 'Kakak',
      });

      // Track events using a separate function to avoid hydration mismatch
      trackEvents(data.qtyRange);
      
      // Navigate after tracking
      trackLeadFormConversion(() => {
        router.push('/catalogue');
      });

    } catch (error) {
      console.error('Failed to submit lead:', error);
      setError('Gagal mengirim permintaan. Silakan coba lagi.');
      setIsSubmitting(false);
    }
  };

  // Move tracking logic to a separate function
  const trackEvents = (qtyRange: string) => {
    if (typeof window !== 'undefined') {
      // Meta Pixel tracking
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Catalogue Access Form',
          content_category: 'Form',
          value: qtyRange,
          currency: 'IDR',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl p-12">
            <div className="mb-12">
              <h1 className="text-display-sm text-neutral-900 mb-4">
                Akses Katalog Kami
              </h1>
              <p className="text-body-lg text-neutral-600">
                Isi formulir di bawah ini untuk mendapatkan akses ke katalog produk dan informasi harga lengkap kami.
              </p>
            </div>

            {error && (
              <div className="mb-6">
                <p className="text-body-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Name Field */}
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="w-full px-0 py-2 border-0 border-b-2 border-neutral-200 bg-transparent focus:ring-0 focus:border-neutral-900 transition-colors text-body-lg"
                  placeholder="Nama Lengkap"
                  disabled={isSubmitting}
                />
                <label htmlFor="name" className="absolute -top-5 left-0 text-body-sm text-neutral-600">
                  Nama
                </label>
                {errors.name && (
                  <p className="mt-1 text-body-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Company Field */}
              <div className="relative">
                <input
                  id="company"
                  type="text"
                  {...register('company')}
                  className="w-full px-0 py-2 border-0 border-b-2 border-neutral-200 bg-transparent focus:ring-0 focus:border-neutral-900 transition-colors text-body-lg"
                  placeholder="Nama Perusahaan"
                  disabled={isSubmitting}
                />
                <label htmlFor="company" className="absolute -top-5 left-0 text-body-sm text-neutral-600">
                  Perusahaan
                </label>
                {errors.company && (
                  <p className="mt-1 text-body-sm text-red-500">{errors.company.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full px-0 py-2 border-0 border-b-2 border-neutral-200 bg-transparent focus:ring-0 focus:border-neutral-900 transition-colors text-body-lg"
                  placeholder="Email"
                  disabled={isSubmitting}
                />
                <label htmlFor="email" className="absolute -top-5 left-0 text-body-sm text-neutral-600">
                  Email
                </label>
                {errors.email && (
                  <p className="mt-1 text-body-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className="w-full px-0 py-2 border-0 border-b-2 border-neutral-200 bg-transparent focus:ring-0 focus:border-neutral-900 transition-colors text-body-lg"
                  placeholder="Nomor WhatsApp"
                  disabled={isSubmitting}
                />
                <label htmlFor="phone" className="absolute -top-5 left-0 text-body-sm text-neutral-600">
                  WhatsApp
                </label>
                {errors.phone && (
                  <p className="mt-1 text-body-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              {/* Quantity Range Field */}
              <div className="relative">
                <select
                  id="qtyRange"
                  {...register('qtyRange')}
                  className="w-full px-0 py-2 border-0 border-b-2 border-neutral-200 bg-transparent focus:ring-0 focus:border-neutral-900 transition-colors text-body-lg"
                  disabled={isSubmitting}
                >
                  <option value="">Pilih jumlah pesanan</option>
                  <option value="< 50">Kurang dari 50 pcs</option>
                  <option value="50 - 100">50 - 100 pcs</option>
                  <option value="100 - 200">100 - 200 pcs</option>
                  <option value="200 - 300">200 - 300 pcs</option>
                  <option value="300 - 500">300 - 500 pcs</option>
                  <option value="500 - 1000">500 - 1000 pcs</option>
                  <option value="> 1000">Lebih dari 1000 pcs</option>
                </select>
                <label htmlFor="qtyRange" className="absolute -top-5 left-0 text-body-sm text-neutral-600">
                  Jumlah Pesanan
                </label>
                {errors.qtyRange && (
                  <p className="mt-1 text-body-sm text-red-500">{errors.qtyRange.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-8"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Mengirim...' : 'Akses Katalog'}
              </button>
            </form>
          </div>

          {/* Admin Banner */}
          <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '4/5' }}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/Illustrations/contact-form-illustration.webp)' }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 to-neutral-900/40" />

            {/* Content */}
            <div className="relative p-12 flex flex-col items-start justify-between h-full text-white">
              <h2 className="text-heading-lg font-normal max-w-md">
                Lebih nyaman ngobrol?
                <span className="block mt-2">
                  Mari berdiskusi melalui WhatsApp
                </span>
              </h2>
              <WhatsAppButton className="bg-white !text-neutral-900 hover:!bg-neutral-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 