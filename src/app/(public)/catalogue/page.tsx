'use client';

import { useEffect, useState } from 'react';
import { getProducts, type Product } from '@/lib/firebase/products';
import { Loader2, Search } from 'lucide-react';

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'clothing' | 'safety' | ''>('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getProducts({
        category: selectedCategory || undefined,
        searchQuery: searchQuery || undefined,
      });
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-display-sm text-neutral-900 mb-4">
              Our Product Catalogue
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              Browse our collection of high-quality custom clothing and safety wear solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md text-body-sm bg-white"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="px-4 py-2 border border-neutral-200 rounded-md text-body-sm bg-white"
          >
            <option value="">All Categories</option>
            <option value="clothing">Custom Clothing</option>
            <option value="safety">Safety Wear</option>
          </select>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-body-sm mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="text-brand-primary hover:text-brand-primary-dark"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-neutral-400 mx-auto" />
            <p className="mt-2 text-neutral-600 text-body-sm">Loading products...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-body-lg">No products found</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden border border-neutral-200 hover:border-brand-primary transition-colors"
              >
                {/* Product Image */}
                <div className="aspect-video relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-white rounded-full text-body-sm text-neutral-600">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-body-lg text-neutral-900 mb-2">{product.name}</h3>
                  <p className="text-body-sm text-neutral-600 line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <a
                    href={`https://wa.me/6281234567890?text=Hi, I'm interested in ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors text-center text-body-sm"
                  >
                    Inquire via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-white border-t border-neutral-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-h2 text-neutral-900 mb-4">
              Need Custom Solutions?
            </h2>
            <p className="text-body-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              Contact us to discuss your specific requirements or to request a custom quote.
            </p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors"
            >
              Contact via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 