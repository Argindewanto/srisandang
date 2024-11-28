'use client';

import { useRouter } from 'next/navigation';
import { CloudinaryUpload } from '@/components/ui/cloudinary-upload';
import { useState } from 'react';

export default function ProductsPage() {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (url: string) => {
    setIsUploading(true);
    try {
      console.log('Uploaded image URL:', url);
      setUploadedImage(url);
    } catch (error) {
      console.error('Failed to process upload:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
    setIsUploading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin')}
                className="text-neutral-600 hover:text-neutral-900"
              >
                ← Back to Dashboard
              </button>
              <span className="text-neutral-900">Products Management</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => router.push('/admin/products/new')}
                className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors"
              >
                Add New Product
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-h2 text-neutral-900">Products</h1>
          <p className="text-body-lg text-neutral-600 mt-1">
            Manage your product catalog
          </p>
        </div>

        {/* Test Image Upload */}
        <div className="mb-8 max-w-md">
          <h2 className="text-h3 text-neutral-900 mb-4">Test Image Upload</h2>
          <CloudinaryUpload
            onUpload={handleImageUpload}
            onError={handleUploadError}
            value={uploadedImage}
            loading={isUploading}
          />
          {uploadedImage && (
            <p className="mt-2 text-body-sm text-neutral-600">
              Image uploaded successfully!
            </p>
          )}
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
          {/* Table Header */}
          <div className="border-b border-neutral-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-h3 text-neutral-900">All Products</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                />
                <select className="px-4 py-2 border border-neutral-200 rounded-md text-body-sm">
                  <option value="">All Categories</option>
                  <option value="clothing">Clothing</option>
                  <option value="safety">Safety</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="divide-y divide-neutral-200">
            {/* Empty State */}
            <div className="px-6 py-12 text-center">
              <p className="text-neutral-600 text-body-lg mb-4">
                No products added yet
              </p>
              <button
                onClick={() => router.push('/admin/products/new')}
                className="text-brand-primary hover:text-brand-primary-dark transition-colors"
              >
                Add your first product
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 