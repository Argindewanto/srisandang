'use client';

import { useEffect, useState } from 'react';
import { getArticleBySlug, type Article } from '@/lib/firebase/articles';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CTA } from '@/components/ui/cta';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleBySlug(params.slug);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
        setError('Article not found');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-h2 text-neutral-900 mb-4">Article Not Found</h1>
          <p className="text-body-lg text-neutral-600 mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/articles"
            className="text-brand-primary hover:text-brand-primary-dark"
          >
            ← Back to Articles
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Article Header */}
      <header className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <span className="text-brand-primary text-body-sm">
              {article.category}
            </span>
            <h1 className="text-display-sm text-neutral-900 mt-2 mb-4">
              {article.title}
            </h1>
            <time className="text-body-sm text-neutral-600">
              {format(new Date(article.publishedAt!), 'dd MMMM yyyy', {
                locale: id,
              })}
            </time>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="w-full aspect-video relative mb-12">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div 
          className="prose prose-neutral max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* CTA Section */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-h2 text-neutral-900 mb-4">
            Tertarik dengan produk kami?
          </h2>
          <p className="text-body-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Hubungi kami untuk mendiskusikan kebutuhan seragam dan safety wear perusahaan Anda.
          </p>
          <CTA />
        </div>
      </section>
    </div>
  );
} 