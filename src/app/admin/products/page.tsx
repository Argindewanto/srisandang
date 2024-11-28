'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getProducts, type Product, deleteProduct } from '@/lib/firebase/products';
import { Loader2 } from 'lucide-react';

export default function ProductsPage() {
  const router = useRouter();
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
      setError(error instanceof Error ? error.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]); // Refetch when category changes

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
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
              <span className="text-neutral-900">Products Management</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => router.push('/admin/products/new')}
                className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors"
              >
                Add New Product
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-h2 text-neutral-900">Products</h1>
          <p className="text-body-lg text-neutral-600 mt-1">
            Manage your product catalog
          </p>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
          {/* Table Header */}
          <div className="border-b border-neutral-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-h3 text-neutral-900">All Products</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                />
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                >
                  <option value="">All Categories</option>
                  <option value="clothing">Clothing</option>
                  <option value="safety">Safety</option>
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
                  onClick={fetchProducts}
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
                <p className="mt-2 text-neutral-600 text-body-sm">Loading products...</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600 text-body-lg mb-4">
                  No products found
                </p>
                <button
                  onClick={() => router.push('/admin/products/new')}
                  className="text-brand-primary hover:text-brand-primary-dark transition-colors"
                >
                  Add your first product
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && products.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-neutral-200 rounded-lg overflow-hidden hover:border-brand-primary transition-colors"
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
                      <h3 className="text-body-lg text-neutral-900 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-body-sm text-neutral-600 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this product?')) {
                              deleteProduct(product.id!)
                                .then(() => {
                                  fetchProducts();
                                })
                                .catch((error) => {
                                  console.error('Failed to delete product:', error);
                                  // Optionally show an error message
                                });
                            }
                          }}
                          className="px-3 py-1.5 text-body-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                          className="px-3 py-1.5 text-body-sm text-brand-primary hover:bg-neutral-50 rounded-md transition-colors"
                        >
                          Edit
                        </button>
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