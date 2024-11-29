'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CloudinaryUpload } from '@/components/ui/cloudinary-upload';
import { useState } from 'react';
import { createTestimonial } from '@/lib/firebase/testimonials';
import type { Testimonial } from '@/lib/firebase/testimonials';

// Testimonial schema with validation
const testimonialSchema = z.object({
  clientName: z.string().min(2, 'Name must be at least 2 characters'),
  content: z.string()
    .min(10, 'Testimonial must be at least 10 characters')
    .max(500, 'Testimonial must not exceed 500 characters'),
  image: z.string().optional(), // Optional client image
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

export default function NewTestimonialPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
  });

  const handleImageUpload = (url: string) => {
    setValue('image', url, { shouldValidate: true });
  };

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      await createTestimonial({
        clientName: data.clientName,
        content: data.content,
        image: data.image,
      });

      router.push('/admin/testimonials');
      router.refresh();
    } catch (error) {
      console.error('Failed to create testimonial:', error);
      setError('Failed to create testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/testimonials')}
                className="text-neutral-600 hover:text-neutral-900"
              >
                ← Back to Testimonials
              </button>
              <span className="text-neutral-900">New Testimonial</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
          {error && (
            <div className="p-4 bg-red-50 border-b border-red-200">
              <p className="text-body-sm text-red-600">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Client Name Field */}
            <div>
              <label htmlFor="clientName" className="block text-body-sm text-neutral-900 mb-2">
                Client Name
              </label>
              <input
                id="clientName"
                type="text"
                {...register('clientName')}
                className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                placeholder="Enter client name"
              />
              {errors.clientName && (
                <p className="mt-1 text-body-sm text-red-500">{errors.clientName.message}</p>
              )}
            </div>

            {/* Testimonial Content Field */}
            <div>
              <label htmlFor="content" className="block text-body-sm text-neutral-900 mb-2">
                Testimonial
              </label>
              <textarea
                id="content"
                {...register('content')}
                rows={6}
                className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                placeholder="Enter client testimonial"
              />
              {errors.content && (
                <p className="mt-1 text-body-sm text-red-500">{errors.content.message}</p>
              )}
              <p className="mt-1 text-body-sm text-neutral-500">
                {watch('content')?.length || 0}/500 characters
              </p>
            </div>

            {/* Client Image Upload */}
            <div>
              <label className="block text-body-sm text-neutral-900 mb-2">
                Client Image (Optional)
              </label>
              <div className="max-w-[120px]"> {/* Constrain image size */}
                <CloudinaryUpload
                  onUpload={handleImageUpload}
                  onError={(error) => console.error(error)}
                  value={watch('image')}
                />
              </div>
              {errors.image && (
                <p className="mt-1 text-body-sm text-red-500">{errors.image.message}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={() => router.push('/admin/testimonials')}
                className="px-4 py-2 border border-neutral-200 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Testimonial'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 