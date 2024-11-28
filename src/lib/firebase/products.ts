import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDocs,
  query,
  orderBy,
  where,
  type QueryConstraint
} from 'firebase/firestore';

export interface Product {
  id?: string;
  name: string;
  description: string;
  category: 'clothing' | 'safety';
  images: string[];
  createdAt?: Date;
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...data,
      createdAt: serverTimestamp(),
    });

    return {
      id: docRef.id,
      ...data,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}

export async function getProducts(options?: {
  category?: 'clothing' | 'safety';
  searchQuery?: string;
}) {
  try {
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];

    if (options?.category) {
      constraints.push(where('category', '==', options.category));
    }

    const q = query(collection(db, 'products'), ...constraints);
    const querySnapshot = await getDocs(q);
    
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        name: data.name,
        description: data.description,
        category: data.category,
        images: data.images,
        createdAt: data.createdAt?.toDate(),
      });
    });

    // Client-side search if searchQuery is provided
    if (options?.searchQuery) {
      const search = options.searchQuery.toLowerCase();
      return products.filter(product => 
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      );
    }

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
} 