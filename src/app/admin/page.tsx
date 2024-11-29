'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/firebase/products';
import { getTestimonials } from '@/lib/firebase/testimonials';
import { getArticles } from '@/lib/firebase/articles';
import { getLeads } from '@/lib/firebase/leads';
import { FileText, ShoppingBag, Quote, Mail } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [stats, setStats] = useState({
    products: 0,
    testimonials: 0,
    articles: 0,
    newLeads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, testimonials, articles, leads] = await Promise.all([
          getProducts(),
          getTestimonials(),
          getArticles(),
          getLeads({ status: 'new' }),
        ]);

        setStats({
          products: products.length,
          testimonials: testimonials.length,
          articles: articles.length,
          newLeads: leads.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-neutral-900">SriSandang Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/design-system')}
                className="px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-md transition-colors"
              >
                Design System
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-h2 text-neutral-900">Dashboard</h1>
          <p className="text-body-lg text-neutral-600 mt-1">
            Manage your products, articles, testimonials, and leads
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex items-center gap-3 mb-1">
              <ShoppingBag className="h-5 w-5 text-brand-primary" />
              <div className="text-neutral-600 text-body-sm">Products</div>
            </div>
            <div className="text-h2 text-neutral-900">
              {loading ? '-' : stats.products}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex items-center gap-3 mb-1">
              <FileText className="h-5 w-5 text-brand-primary" />
              <div className="text-neutral-600 text-body-sm">Articles</div>
            </div>
            <div className="text-h2 text-neutral-900">
              {loading ? '-' : stats.articles}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex items-center gap-3 mb-1">
              <Quote className="h-5 w-5 text-brand-primary" />
              <div className="text-neutral-600 text-body-sm">Testimonials</div>
            </div>
            <div className="text-h2 text-neutral-900">
              {loading ? '-' : stats.testimonials}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex items-center gap-3 mb-1">
              <Mail className="h-5 w-5 text-brand-primary" />
              <div className="text-neutral-600 text-body-sm">Leads Baru</div>
            </div>
            <div className="text-h2 text-neutral-900">
              {loading ? '-' : stats.newLeads}
            </div>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingBag className="h-6 w-6 text-brand-primary" />
              <h2 className="text-h3 text-neutral-900">Products</h2>
            </div>
            <p className="text-body-sm text-neutral-600 mb-4">
              Manage your product catalog
            </p>
            <button 
              onClick={() => router.push('/admin/products')}
              className="w-full px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors text-body-sm"
            >
              Manage Products
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-brand-primary" />
              <h2 className="text-h3 text-neutral-900">Articles</h2>
            </div>
            <p className="text-body-sm text-neutral-600 mb-4">
              Manage news and blog posts
            </p>
            <button 
              onClick={() => router.push('/admin/articles')}
              className="w-full px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors text-body-sm"
            >
              Manage Articles
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex items-center gap-3 mb-4">
              <Quote className="h-6 w-6 text-brand-primary" />
              <h2 className="text-h3 text-neutral-900">Testimonials</h2>
            </div>
            <p className="text-body-sm text-neutral-600 mb-4">
              Manage client testimonials
            </p>
            <button 
              onClick={() => router.push('/admin/testimonials')}
              className="w-full px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors text-body-sm"
            >
              Manage Testimonials
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-6 w-6 text-brand-primary" />
              <h2 className="text-h3 text-neutral-900">Leads</h2>
            </div>
            <p className="text-body-sm text-neutral-600 mb-4">
              {stats.newLeads} permintaan baru menunggu respon
            </p>
            <button 
              onClick={() => router.push('/admin/leads')}
              className="w-full px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors text-body-sm"
            >
              Kelola Leads
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 