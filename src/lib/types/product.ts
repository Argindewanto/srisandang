export interface Product {
  id?: string;
  name: string;
  description: string;
  category: 'clothing' | 'safety';
  images: string[];
  createdAt?: Date;
} 