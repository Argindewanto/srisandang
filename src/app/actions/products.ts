'use client';

import { getProducts as getFirebaseProducts } from '@/lib/firebase/products';
import type { Product } from '@/lib/types/product';

export async function getProducts(options?: {
  category?: 'clothing' | 'safety';
  searchQuery?: string;
}): Promise<Product[]> {
  try {
    const products = await getFirebaseProducts(options);
    return products || [];
  } catch (error) {
    console.error('Error in getProducts action:', error);
    return [];
  }
} 