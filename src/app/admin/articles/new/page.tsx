'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CloudinaryUpload } from '@/components/ui/cloudinary-upload';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { useState } from 'react';
import { createArticle } from '@/lib/firebase/articles';

// Article schema with validation
const articleSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  excerpt: z.string()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(200, 'Excerpt must not exceed 200 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  coverImage: z.string().min(1, 'Cover image is required'),
  category: z.enum(['news', 'blog', 'update'], {
    required_error: 'Please select a category',
  }),
  status: z.enum(['draft', 'published'], {
    required_error: 'Please select a status',
  }),
});

type ArticleFormData = z.infer<typeof articleSchema>;

// Add this helper function at the top of the file
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function NewArticlePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      status: 'draft',
    },
  });

  const handleImageUpload = (url: string) => {
    setValue('coverImage', url, { shouldValidate: true });
  };

  const onSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      await createArticle({
        title: data.title,
        slug: generateSlug(data.title),
        category: data.category,
        status: data.status,
        content: data.content,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
      });

      router.push('/admin/articles');
      router.refresh();
    } catch (error) {
      console.error('Failed to create article:', error);
      setError('Failed to create article. Please try again.');
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
                onClick={() => router.push('/admin/articles')}
                className="text-neutral-600 hover:text-neutral-900"
              >
                ← Back to Articles
              </button>
              <span className="text-neutral-900">New Article</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
          {error && (
            <div className="p-4 bg-red-50 border-b border-red-200">
              <p className="text-body-sm text-red-600">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-body-sm text-neutral-900 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                {...register('title')}
                className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                placeholder="Enter article title"
              />
              {errors.title && (
                <p className="mt-1 text-body-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-2 gap-4">
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
                  <option value="news">News</option>
                  <option value="blog">Blog</option>
                  <option value="update">Update</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-body-sm text-red-500">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="status" className="block text-body-sm text-neutral-900 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  {...register('status')}
                  className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-body-sm text-red-500">{errors.status.message}</p>
                )}
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-body-sm text-neutral-900 mb-2">
                Cover Image
              </label>
              <CloudinaryUpload
                onUpload={handleImageUpload}
                onError={(error) => console.error(error)}
                value={watch('coverImage')}
              />
              {errors.coverImage && (
                <p className="mt-1 text-body-sm text-red-500">{errors.coverImage.message}</p>
              )}
            </div>

            {/* Excerpt Field */}
            <div>
              <label htmlFor="excerpt" className="block text-body-sm text-neutral-900 mb-2">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                {...register('excerpt')}
                rows={3}
                className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                placeholder="Enter a brief excerpt"
              />
              {errors.excerpt && (
                <p className="mt-1 text-body-sm text-red-500">{errors.excerpt.message}</p>
              )}
              <p className="mt-1 text-body-sm text-neutral-500">
                {watch('excerpt')?.length || 0}/200 characters
              </p>
            </div>

            {/* Content Field */}
            <div>
              <label className="block text-body-sm text-neutral-900 mb-2">
                Content
              </label>
              <RichTextEditor
                content={watch('content') || ''}
                onChange={(content) => setValue('content', content, { shouldValidate: true })}
              />
              {errors.content && (
                <p className="mt-1 text-body-sm text-red-500">{errors.content.message}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={() => router.push('/admin/articles')}
                className="px-4 py-2 border border-neutral-200 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Article'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 