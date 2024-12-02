'use client';

import { useState, useEffect } from 'react';
import { getProducts } from '@/app/actions/products';
import { CatalogueProductCard } from '@/components/ui/catalogue-product-card';
import { Loader2 } from 'lucide-react';
import type { Product } from '@/lib/firebase/products';
import { cn } from '@/lib/utils';

type CategoryFilter = 'all' | 'clothing' | 'safety';

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const { products: data, error: fetchError } = await getProducts({
          category: activeFilter === 'all' ? undefined : activeFilter
        });
        
        if (fetchError) {
          setError(fetchError);
        } else {
          setProducts(data);
        }
      } catch (error) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [activeFilter]);

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'clothing', label: 'Regular' },
    { id: 'safety', label: 'Safety' },
  ] as const;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Section */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container py-12">
          <h1 className="text-display-sm text-neutral-900 mb-12">
            Product Catalogue
          </h1>

          {/* Minimalist Filter Tabs */}
          <div className="inline-flex p-1 gap-1 bg-neutral-100 rounded-lg">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={cn(
                  "px-6 py-2 rounded-md text-body-sm transition-all duration-200",
                  activeFilter === tab.id
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container py-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <CatalogueProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-body-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 