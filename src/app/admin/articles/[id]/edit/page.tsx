'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CloudinaryUpload } from '@/components/ui/cloudinary-upload';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { useState, useEffect } from 'react';
import { getArticle, updateArticle, deleteArticle, publishArticle, unpublishArticle } from '@/lib/firebase/articles';
import { use } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
  });

  // Fetch article data
  const fetchArticleData = async (articleId: string) => {
    try {
      const article = await getArticle(articleId);
      reset({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        coverImage: article.coverImage,
        category: article.category,
        status: article.status,
      });
    } catch (error) {
      setError('Failed to load article');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticleData(resolvedParams.id);
  }, [resolvedParams.id]);

  const handleImageUpload = (url: string) => {
    setValue('coverImage', url, { shouldValidate: true });
  };

  const onSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      await updateArticle(resolvedParams.id, data);
      router.push('/admin/articles');
      router.refresh();
    } catch (error) {
      console.error('Failed to update article:', error);
      setError('Failed to update article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteArticle(resolvedParams.id);
      router.push('/admin/articles');
      router.refresh();
    } catch (error) {
      console.error('Failed to delete article:', error);
      setError('Failed to delete article. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePublishToggle = async () => {
    setIsPublishing(true);
    try {
      const currentStatus = watch('status');
      if (currentStatus === 'draft') {
        await publishArticle(resolvedParams.id);
        setValue('status', 'published');
      } else {
        await unpublishArticle(resolvedParams.id);
        setValue('status', 'draft');
      }
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
      setError('Failed to update publish status. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto"></div>
          <p className="mt-2 text-neutral-600">Loading article...</p>
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
                onClick={() => router.push('/admin/articles')}
                className="text-neutral-600 hover:text-neutral-900"
              >
                ← Back to Articles
              </button>
              <span className="text-neutral-900">Edit Article</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePublishToggle}
                disabled={isPublishing}
                className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                  watch('status') === 'published'
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {watch('status') === 'published' ? (
                  <>
                    <Eye className="h-4 w-4" />
                    {isPublishing ? 'Unpublishing...' : 'Published'}
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4" />
                    {isPublishing ? 'Publishing...' : 'Draft'}
                  </>
                )}
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Article'}
              </button>
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
                <option value="news">News</option>
                <option value="blog">Blog</option>
                <option value="update">Update</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-body-sm text-red-500">{errors.category.message}</p>
              )}
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
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 