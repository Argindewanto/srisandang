'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/firebase/products';
import { getTestimonials } from '@/lib/firebase/testimonials';
import { getArticles } from '@/lib/firebase/articles';
import { getLeads } from '@/lib/firebase/leads';
import { FileText, ShoppingBag, Quote, Mail, Calendar } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';
import { 
  startOfToday, 
  endOfToday,
  startOfYesterday,
  endOfYesterday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subWeeks,
  subMonths,
  format 
} from 'date-fns';
import { id } from 'date-fns/locale';
import type { Lead } from '@/lib/firebase/leads';
import { DateRangePicker } from '@/components/ui/date-range-picker';

interface LeadsStats {
  newLeads: number;
  todayLeads: number;
  recentLeads: Lead[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    products: 0,
    testimonials: 0,
    articles: 0,
  });
  const [leads, setLeads] = useState<LeadsStats>({
    newLeads: 0,
    todayLeads: 0,
    recentLeads: [],
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: startOfToday(),
    to: endOfToday(),
  });
  const [dateRangeType, setDateRangeType] = useState('today');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [products, testimonials, articles] = await Promise.all([
          getProducts(),
          getTestimonials(),
          getArticles(),
        ]);

        setStats({
          products: products.length,
          testimonials: testimonials.length,
          articles: articles.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    const fetchLeads = async () => {
      try {
        const [newLeads, filteredLeads] = await Promise.all([
          getLeads({ status: 'new' }),
          getLeads({ 
            dateRange: {
              from: dateRange.from,
              to: dateRange.to,
            }
          }),
        ]);

        setLeads({
          newLeads: newLeads.length,
          todayLeads: filteredLeads.length,
          recentLeads: filteredLeads.slice(0, 5), // Get last 5 leads
        });
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    fetchLeads();
  }, [dateRange]);

  useEffect(() => {
    // Update dateRange when dateRangeType changes
    const newRange = getDateRangeFromType(dateRangeType);
    setDateRange(newRange);
  }, [dateRangeType]);

  const getDateRangeFromType = (type: string) => {
    switch (type) {
      case 'today':
        return {
          from: startOfToday(),
          to: endOfToday()
        };
      case 'yesterday':
        return {
          from: startOfYesterday(),
          to: endOfYesterday()
        };
      case 'this_week':
        return {
          from: startOfWeek(new Date(), { weekStartsOn: 1 }), // Week starts on Monday
          to: endOfWeek(new Date(), { weekStartsOn: 1 })
        };
      case 'last_week':
        return {
          // Use subWeeks to get last week's dates
          from: startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
          to: endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 })
        };
      case 'this_month':
        return {
          from: startOfMonth(new Date()),
          to: endOfMonth(new Date())
        };
      case 'last_month':
        return {
          from: startOfMonth(subMonths(new Date(), 1)),
          to: endOfMonth(subMonths(new Date(), 1))
        };
      default:
        return {
          from: startOfToday(),
          to: endOfToday()
        };
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="flex items-center">
                <Logo className="h-8 w-auto" />
              </Link>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => router.push('/admin/login')}
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
        {/* Leads Monitoring Section */}
        <section className="mb-12">
          <h2 className="text-h2 text-neutral-900 mb-6">Leads Monitoring</h2>
          
          <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* New Leads Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-red-500" />
                    <h3 className="text-h3 text-neutral-900">New Leads</h3>
                  </div>
                  <span className="text-h2 text-neutral-900">
                    {loading ? '-' : leads.newLeads}
                  </span>
                </div>
                <p className="text-body-sm text-neutral-600">
                  Leads yang belum dihubungi
                </p>
              </div>

              {/* Added Leads Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <h3 className="text-h3 text-neutral-900">Added Leads</h3>
                  </div>
                  <span className="text-h2 text-neutral-900">
                    {loading ? '-' : leads.todayLeads}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-body-sm text-neutral-600">
                    Total leads dalam periode
                  </p>
                  <DateRangePicker 
                    onChange={(range) => {
                      setDateRange({
                        from: range.from,
                        to: range.to
                      });
                    }} 
                  />
                </div>
              </div>
            </div>

            {/* Recent Leads List */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
              <div className="p-6 border-b border-neutral-200">
                <h3 className="text-h3 text-neutral-900">Recent Leads</h3>
                <p className="text-body-sm text-neutral-600 mt-1">
                  {leads.recentLeads.length} leads terbaru berdasarkan periode yang dipilih
                </p>
              </div>
              
              <div className="divide-y divide-neutral-200">
                {leads.recentLeads.length > 0 ? (
                  leads.recentLeads.map((lead) => (
                    <div 
                      key={lead.id} 
                      className="p-6 hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-body-lg text-neutral-900 font-medium">
                            {lead.name}
                          </h4>
                          <p className="text-body-sm text-neutral-600">
                            {lead.company}
                          </p>
                        </div>
                        <Link
                          href="/admin/leads"
                          className="text-brand-primary hover:text-brand-primary-dark text-body-sm"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-neutral-600">
                    No recent leads in this period
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CMS Section */}
        <section>
          <h2 className="text-h2 text-neutral-900 mb-6">Content Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Products Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingBag className="h-6 w-6 text-brand-primary" />
                <h3 className="text-h3 text-neutral-900">Products</h3>
              </div>
              <p className="text-h2 text-neutral-900 mb-6">
                {loading ? '-' : stats.products}
              </p>
              <button 
                onClick={() => router.push('/admin/products')}
                className="w-full px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors text-body-sm"
              >
                Manage Products
              </button>
            </div>

            {/* Articles Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-brand-primary" />
                <h3 className="text-h3 text-neutral-900">Articles</h3>
              </div>
              <p className="text-h2 text-neutral-900 mb-6">
                {loading ? '-' : stats.articles}
              </p>
              <button 
                onClick={() => router.push('/admin/articles')}
                className="w-full px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors text-body-sm"
              >
                Manage Articles
              </button>
            </div>

            {/* Testimonials Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center gap-3 mb-4">
                <Quote className="h-6 w-6 text-brand-primary" />
                <h3 className="text-h3 text-neutral-900">Testimonials</h3>
              </div>
              <p className="text-h2 text-neutral-900 mb-6">
                {loading ? '-' : stats.testimonials}
              </p>
              <button 
                onClick={() => router.push('/admin/testimonials')}
                className="w-full px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors text-body-sm"
              >
                Manage Testimonials
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 