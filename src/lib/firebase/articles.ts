import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp, 
  getDocs,
  query,
  orderBy,
  where,
  type QueryConstraint
} from 'firebase/firestore';

export interface Article {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: 'news' | 'blog' | 'update';
  status: 'draft' | 'published';
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Helper function to create URL-friendly slug
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function createArticle(data: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'slug'>) {
  try {
    const slug = createSlug(data.title);
    
    // Check if slug already exists
    const slugCheck = query(
      collection(db, 'articles'), 
      where('slug', '==', slug)
    );
    const slugSnapshot = await getDocs(slugCheck);
    
    // If slug exists, append a timestamp
    const finalSlug = slugSnapshot.empty 
      ? slug 
      : `${slug}-${Date.now()}`;

    const docRef = await addDoc(collection(db, 'articles'), {
      ...data,
      slug: finalSlug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      id: docRef.id,
      ...data,
      slug: finalSlug,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Error creating article:', error);
    throw new Error('Failed to create article');
  }
}

export async function getArticles(options?: {
  category?: 'news' | 'blog' | 'update';
  status?: 'draft' | 'published';
  searchQuery?: string;
}) {
  try {
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];

    if (options?.category) {
      constraints.push(where('category', '==', options.category));
    }

    if (options?.status) {
      constraints.push(where('status', '==', options.status));
    }

    const q = query(collection(db, 'articles'), ...constraints);
    const querySnapshot = await getDocs(q);
    
    const articles: Article[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        category: data.category,
        status: data.status,
        publishedAt: data.publishedAt?.toDate(),
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      });
    });

    // Client-side search if searchQuery is provided
    if (options?.searchQuery) {
      const search = options.searchQuery.toLowerCase();
      return articles.filter(article => 
        article.title.toLowerCase().includes(search) ||
        article.content.toLowerCase().includes(search) ||
        article.excerpt.toLowerCase().includes(search)
      );
    }

    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to fetch articles');
  }
}

export async function getArticle(id: string): Promise<Article> {
  try {
    const docRef = doc(db, 'articles', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Article not found');
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      category: data.category,
      status: data.status,
      publishedAt: data.publishedAt?.toDate(),
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    throw new Error('Failed to fetch article');
  }
}

export async function updateArticle(
  id: string, 
  data: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'slug'>
): Promise<Article> {
  try {
    const docRef = doc(db, 'articles', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Article not found');
    }

    const currentData = docSnap.data();
    await updateDoc(docRef, {
      ...data,
      slug: currentData.slug, // Keep the existing slug
      updatedAt: serverTimestamp(),
    });

    return {
      id,
      ...data,
      slug: currentData.slug,
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Error updating article:', error);
    throw new Error('Failed to update article');
  }
}

export async function deleteArticle(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'articles', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting article:', error);
    throw new Error('Failed to delete article');
  }
}

export async function publishArticle(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'articles', id);
    await updateDoc(docRef, {
      status: 'published',
      publishedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error publishing article:', error);
    throw new Error('Failed to publish article');
  }
}

export async function unpublishArticle(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'articles', id);
    await updateDoc(docRef, {
      status: 'draft',
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error unpublishing article:', error);
    throw new Error('Failed to unpublish article');
  }
} 