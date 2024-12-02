'use client';

import { useEffect, useState } from 'react';
import { getArticleBySlug, type Article } from '@/lib/firebase/articles';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { WhatsAppButton, CatalogueButton } from '@/components/ui/buttons';
import { use } from 'react';

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleBySlug(resolvedParams.slug);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
        setError('Article not found');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [resolvedParams.slug]);

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
          <Link
            href="/articles"
            className="inline-flex items-center text-brand-primary hover:text-brand-primary-dark"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section 
        className="relative min-h-[70vh] flex items-start pt-16"
        style={{
          backgroundImage: `url(${article.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />

        {/* Content */}
        <div className="container relative z-10">
          {/* Back Button */}
          <Link
            href="/articles"
            className="inline-flex items-center text-white/80 hover:text-white mb-12"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>

          {/* Article Header */}
          <div className="max-w-3xl">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-body-sm text-white border border-white/20">
                {article.category}
              </span>
            </div>
            <h1 className="text-display-sm text-white mb-6">
              {article.title}
            </h1>
            <p className="text-body-lg text-white/80">
              {article.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="container py-20">
        <div className="max-w-3xl mx-auto">
          <div 
            className="prose prose-neutral max-w-none
              prose-img:w-[100vw] prose-img:max-w-[100vw] prose-img:ml-[50%] prose-img:translate-x-[-50%] prose-img:my-8
              prose-h2:text-h2 prose-h2:mt-16 prose-h2:mb-6
              prose-p:text-body-lg prose-p:text-neutral-600 prose-p:leading-relaxed
              prose-ul:text-body-lg prose-ul:text-neutral-600
              prose-ol:text-body-lg prose-ol:text-neutral-600"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-h2 text-neutral-900 mb-4">
            Tertarik dengan produk kami?
          </h2>
          <p className="text-body-lg text-neutral-600 mb-8">
            Hubungi kami untuk mendiskusikan kebutuhan seragam dan safety wear perusahaan Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton className="w-full sm:w-auto" />
            <CatalogueButton className="w-full sm:w-auto" />
          </div>
        </div>
      </section>
    </div>
  );
} 