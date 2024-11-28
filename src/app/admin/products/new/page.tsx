'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CloudinaryUpload } from '@/components/ui/cloudinary-upload';
import { useState } from 'react';
import { createProduct } from '@/lib/firebase/products';
import type { Product } from '@/lib/firebase/products';

// Product schema with validation
const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['clothing', 'safety'], {
    required_error: 'Please select a category',
  }),
  images: z.array(z.string()).min(1, 'At least one image is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [],
    },
  });

  const handleImageUpload = (url: string) => {
    const newImages = [...uploadedImages, url];
    setUploadedImages(newImages);
    setValue('images', newImages, { shouldValidate: true });
  };

  const handleImageRemove = (indexToRemove: number) => {
    const newImages = uploadedImages.filter((_, index) => index !== indexToRemove);
    setUploadedImages(newImages);
    setValue('images', newImages, { shouldValidate: true });
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      await createProduct({
        name: data.name,
        description: data.description,
        category: data.category,
        images: data.images,
      });

      router.push('/admin/products');
      router.refresh(); // Refresh the products list
    } catch (error) {
      console.error('Failed to create product:', error);
      setError('Failed to create product. Please try again.');
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
                onClick={() => router.push('/admin/products')}
                className="text-neutral-600 hover:text-neutral-900"
              >
                ← Back to Products
              </button>
              <span className="text-neutral-900">New Product</span>
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
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-body-sm text-neutral-900 mb-2">
                Product Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="mt-1 text-body-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Category Field */}
            <div>
              <label htmlFor="category" className="block text-body-sm text-neutral-900 mb-2">
                Category
              </label>
              <select
                id="category"
                {...register('category')}
                className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
              >
                <option value="">Select a category</option>
                <option value="clothing">Clothing</option>
                <option value="safety">Safety</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-body-sm text-red-500">{errors.category.message}</p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-body-sm text-neutral-900 mb-2">
                Description
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows={4}
                className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                placeholder="Enter product description"
              />
              {errors.description && (
                <p className="mt-1 text-body-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Images Upload */}
            <div>
              <label className="block text-body-sm text-neutral-900 mb-2">
                Product Images
              </label>
              <div className="space-y-4">
                {/* Image Gallery */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {uploadedImages.map((url, index) => (
                      <div key={url} className="relative aspect-video">
                        <img
                          src={url}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleImageRemove(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Upload Component */}
                <CloudinaryUpload
                  onUpload={handleImageUpload}
                  onError={(error) => console.error(error)}
                />
              </div>
              {errors.images && (
                <p className="mt-1 text-body-sm text-red-500">{errors.images.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={() => router.push('/admin/products')}
                className="px-4 py-2 border border-neutral-200 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 