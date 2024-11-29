'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getArticles, deleteArticle, publishArticle, unpublishArticle, type Article } from '@/lib/firebase/articles';
import { Loader2, FileEdit, Trash2, Eye, EyeOff } from 'lucide-react';

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'news' | 'blog' | 'update' | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<'draft' | 'published' | ''>('');

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getArticles({
        category: selectedCategory || undefined,
        status: selectedStatus || undefined,
        searchQuery: searchQuery || undefined,
      });
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError(error instanceof Error ? error.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, selectedStatus]); // Refetch when filters change

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchArticles();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handlePublishToggle = async (article: Article) => {
    try {
      if (article.status === 'draft') {
        await publishArticle(article.id!);
      } else {
        await unpublishArticle(article.id!);
      }
      fetchArticles();
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
              <span className="text-neutral-900">Articles Management</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => router.push('/admin/articles/new')}
                className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors"
              >
                Write New Article
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-h2 text-neutral-900">Articles</h1>
          <p className="text-body-lg text-neutral-600 mt-1">
            Manage your blog posts, news, and updates
          </p>
        </div>

        {/* Articles List */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
          {/* Filters Header */}
          <div className="border-b border-neutral-200 px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                />
              </div>
              <div className="flex gap-4">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                >
                  <option value="">All Categories</option>
                  <option value="news">News</option>
                  <option value="blog">Blog</option>
                  <option value="update">Update</option>
                </select>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                >
                  <option value="">All Status</option>
                  <option value="draft">Drafts</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Error State */}
            {error && (
              <div className="text-center">
                <p className="text-red-500 text-body-sm">{error}</p>
                <button
                  onClick={fetchArticles}
                  className="mt-2 text-brand-primary hover:text-brand-primary-dark"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Loading State */}
            {loading && !error && (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-neutral-400 mx-auto" />
                <p className="mt-2 text-neutral-600 text-body-sm">Loading articles...</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && articles.length === 0 && (
              <div className="text-center py-12">
                <FileEdit className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-600 text-body-lg mb-4">
                  No articles found
                </p>
                <button
                  onClick={() => router.push('/admin/articles/new')}
                  className="text-brand-primary hover:text-brand-primary-dark transition-colors"
                >
                  Write your first article
                </button>
              </div>
            )}

            {/* Articles List */}
            {!loading && !error && articles.length > 0 && (
              <div className="space-y-6">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="flex gap-6 p-4 border border-neutral-200 rounded-lg hover:border-brand-primary transition-colors"
                  >
                    {/* Cover Image */}
                    <div className="hidden md:block w-48 h-32">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-body-lg text-neutral-900 font-medium">
                            {article.title}
                          </h3>
                          <div className="flex gap-2 mt-1">
                            <span className="text-body-sm text-neutral-500">
                              {article.category}
                            </span>
                            <span className="text-body-sm text-neutral-500">•</span>
                            <span className="text-body-sm text-neutral-500">
                              {formatDate(article.updatedAt || article.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePublishToggle(article)}
                            className={`p-2 rounded-md transition-colors ${
                              article.status === 'published'
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-neutral-600 hover:bg-neutral-50'
                            }`}
                            title={article.status === 'published' ? 'Unpublish' : 'Publish'}
                          >
                            {article.status === 'published' ? (
                              <Eye className="h-5 w-5" />
                            ) : (
                              <EyeOff className="h-5 w-5" />
                            )}
                          </button>
                          <button
                            onClick={() => router.push(`/admin/articles/${article.id}/edit`)}
                            className="p-2 text-brand-primary hover:bg-neutral-50 rounded-md transition-colors"
                            title="Edit"
                          >
                            <FileEdit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this article?')) {
                                deleteArticle(article.id!)
                                  .then(() => {
                                    fetchArticles();
                                  })
                                  .catch((error) => {
                                    console.error('Failed to delete article:', error);
                                  });
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-body-sm text-neutral-600 line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 