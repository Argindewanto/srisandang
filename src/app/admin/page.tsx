'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';

export default function AdminDashboard() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

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
            Manage your products, testimonials, and leads
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="text-neutral-600 text-body-sm mb-1">Total Products</div>
            <div className="text-h2 text-neutral-900">0</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="text-neutral-600 text-body-sm mb-1">Total Testimonials</div>
            <div className="text-h2 text-neutral-900">0</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <div className="text-neutral-600 text-body-sm mb-1">New Leads</div>
            <div className="text-h2 text-neutral-900">0</div>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-h3 text-neutral-900 mb-2">Products</h2>
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
            <h2 className="text-h3 text-neutral-900 mb-2">Testimonials</h2>
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
            <h2 className="text-h3 text-neutral-900 mb-2">Leads</h2>
            <p className="text-body-sm text-neutral-600 mb-4">
              View and manage lead submissions
            </p>
            <button 
              onClick={() => router.push('/admin/leads')}
              className="w-full px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors text-body-sm"
            >
              View Leads
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 