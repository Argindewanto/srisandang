'use server';

import { getProducts as getFirebaseProducts } from '@/lib/firebase/products';
import type { Product } from '@/lib/types/product';

export async function getProducts(options?: {
  category?: 'clothing' | 'safety';
  searchQuery?: string;
}): Promise<{
  products: Product[];
  error?: string;
}> {
  try {
    const products = await getFirebaseProducts(options);
    return { products: products || [] };
  } catch (error) {
    console.error('Error in getProducts action:', error);
    return { 
      products: [], 
      error: 'Failed to load products' 
    };
  }
} 