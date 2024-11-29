'use client';

import { useState, useEffect } from 'react';
import { getArticles, type Article } from '@/lib/firebase/articles';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getArticles({ status: 'published' });
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to load articles');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Date not available';
    
    try {
      return formatDistanceToNow(date, {
        addSuffix: true,
        locale: id,
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-display-lg text-neutral-900 mb-6">
              Articles & Updates
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              Informasi terbaru seputar industri garmen, safety wear, dan tips perawatan seragam kerja.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 text-body-lg mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-brand-primary hover:text-brand-primary-dark"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-body-lg">
                No articles published yet.
              </p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-neutral-200 hover:border-brand-primary transition-colors">
                    {/* Article Image */}
                    <div className="aspect-video relative">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white rounded-full text-body-sm text-neutral-900">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="p-6">
                      <h2 className="text-h3 text-neutral-900 mb-2 group-hover:text-brand-primary transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-body-sm text-neutral-600 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <time className="text-body-sm text-neutral-500">
                          {formatDate(article.publishedAt)}
                        </time>
                        <span className="text-brand-primary text-body-sm group-hover:translate-x-0.5 transition-transform">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 