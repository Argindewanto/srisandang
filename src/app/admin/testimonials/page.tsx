'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getTestimonials, deleteTestimonial, type Testimonial } from '@/lib/firebase/testimonials';
import { Loader2, Quote } from 'lucide-react';

export default function TestimonialsPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTestimonials({
        searchQuery: searchQuery || undefined,
      });
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError(error instanceof Error ? error.message : 'Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []); // Initial fetch

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTestimonials();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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
              <span className="text-neutral-900">Testimonials Management</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => router.push('/admin/testimonials/new')}
                className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors"
              >
                Add New Testimonial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-h2 text-neutral-900">Testimonials</h1>
          <p className="text-body-lg text-neutral-600 mt-1">
            Manage client testimonials and feedback
          </p>
        </div>

        {/* Testimonials List */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
          {/* Search Header */}
          <div className="border-b border-neutral-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-h3 text-neutral-900">All Testimonials</h2>
              <div className="w-64">
                <input
                  type="text"
                  placeholder="Search testimonials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Error State */}
            {error && (
              <div className="text-center">
                <p className="text-red-500 text-body-sm">{error}</p>
                <button
                  onClick={fetchTestimonials}
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
                <p className="mt-2 text-neutral-600 text-body-sm">Loading testimonials...</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && testimonials.length === 0 && (
              <div className="text-center py-12">
                <Quote className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-600 text-body-lg mb-4">
                  No testimonials found
                </p>
                <button
                  onClick={() => router.push('/admin/testimonials/new')}
                  className="text-brand-primary hover:text-brand-primary-dark transition-colors"
                >
                  Add your first testimonial
                </button>
              </div>
            )}

            {/* Testimonials Grid */}
            {!loading && !error && testimonials.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="border border-neutral-200 rounded-lg overflow-hidden hover:border-brand-primary transition-colors p-6"
                  >
                    <div className="flex items-start gap-4">
                      {/* Client Image */}
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.clientName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                          <Quote className="h-6 w-6 text-neutral-400" />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-body-lg text-neutral-900 mb-2">
                          {testimonial.clientName}
                        </h3>
                        <p className="text-body-sm text-neutral-600 mb-4">
                          {testimonial.content}
                        </p>
                        
                        {/* Actions */}
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this testimonial?')) {
                                deleteTestimonial(testimonial.id!)
                                  .then(() => {
                                    fetchTestimonials();
                                  })
                                  .catch((error) => {
                                    console.error('Failed to delete testimonial:', error);
                                  });
                              }
                            }}
                            className="px-3 py-1.5 text-body-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => router.push(`/admin/testimonials/${testimonial.id}/edit`)}
                            className="px-3 py-1.5 text-body-sm text-brand-primary hover:bg-neutral-50 rounded-md transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
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