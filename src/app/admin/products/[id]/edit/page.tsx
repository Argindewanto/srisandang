'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CloudinaryUpload } from '@/components/ui/cloudinary-upload';
import { useState, useEffect } from 'react';
import { getProduct, updateProduct, deleteProduct } from '@/lib/firebase/products';
import { use } from 'react';

const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['clothing', 'safety'], {
    required_error: 'Please select a category',
  }),
  images: z.array(z.string()).min(1, 'At least one image is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // Move the fetch logic to a separate function
  const fetchProductData = async (productId: string) => {
    try {
      const product = await getProduct(productId);
      reset({
        name: product.name,
        description: product.description,
        category: product.category,
        images: product.images,
      });
      setUploadedImages(product.images);
    } catch (error) {
      setError('Failed to load product');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use useEffect with the resolved params
  useEffect(() => {
    fetchProductData(resolvedParams.id);
  }, [resolvedParams.id]);

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
      await updateProduct(resolvedParams.id, {
        name: data.name,
        description: data.description,
        category: data.category,
        images: data.images,
      });

      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Failed to update product:', error);
      setError('Failed to update product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteProduct(resolvedParams.id);
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Failed to delete product:', error);
      setError('Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto"></div>
          <p className="mt-2 text-neutral-600">Loading product...</p>
        </div>
      </div>
    );
  }

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
              <span className="text-neutral-900">Edit Product</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Product'}
              </button>
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

            {/* Action Buttons */}
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
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 