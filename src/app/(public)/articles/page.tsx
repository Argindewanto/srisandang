'use client';

import { useState, useEffect } from 'react';
import { getArticles, type Article } from '@/lib/firebase/articles';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const ARTICLES_PER_PAGE = 9;

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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

  // Pagination logic
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(startIndex, endIndex);

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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group"
                  >
                    <article 
                      className="relative aspect-[4/5] rounded-lg overflow-hidden"
                      style={{
                        backgroundImage: `url(${article.coverImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-300" />

                      {/* Content */}
                      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col">
                        {/* Category Badge */}
                        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-body-sm text-white border border-white/20 mb-4 self-start">
                          {article.category}
                        </span>

                        {/* Title */}
                        <h2 className="text-h3 text-white mb-2 group-hover:text-brand-primary transition-colors">
                          {article.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-body-sm text-white/80 mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>

                        {/* Read More */}
                        <span className="text-brand-primary text-body-sm group-hover:translate-x-0.5 transition-transform">
                          Read More →
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "px-4 py-2 rounded-md",
                        currentPage === page
                          ? "bg-brand-primary text-white"
                          : "border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                      )}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
} 