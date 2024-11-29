import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  deleteDoc,
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

export async function getArticles(options?: {
  status?: 'draft' | 'published';
  category?: string;
  searchQuery?: string;
}) {
  try {
    const constraints: QueryConstraint[] = [];
    
    if (options?.status) {
      constraints.push(where('status', '==', options.status));
    }

    if (options?.category) {
      constraints.push(where('category', '==', options.category));
    }

    const articlesRef = collection(db, 'articles');
    const q = constraints.length > 0 
      ? query(articlesRef, ...constraints)
      : query(articlesRef);

    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return [];
    }

    let articles: Article[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        title: data.title || '',
        slug: data.slug || '',
        content: data.content || '',
        excerpt: data.excerpt || '',
        coverImage: data.coverImage || '',
        category: data.category || '',
        status: data.status || 'draft',
        publishedAt: data.publishedAt?.toDate(),
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      });
    });

    if (options?.searchQuery) {
      const search = options.searchQuery.toLowerCase();
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(search) ||
        article.content.toLowerCase().includes(search) ||
        article.excerpt.toLowerCase().includes(search)
      );
    }

    return articles.sort((a, b) => {
      const dateA = a.publishedAt || a.createdAt || new Date();
      const dateB = b.publishedAt || b.createdAt || new Date();
      return dateB.getTime() - dateA.getTime();
    });

  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  try {
    const q = query(collection(db, 'articles'), where('slug', '==', slug), where('status', '==', 'published'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('Article not found');
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    return {
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
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    throw new Error('Failed to fetch article');
  }
}

export async function createArticle(data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<Article> {
  try {
    const docRef = await addDoc(collection(db, 'articles'), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      id: docRef.id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Error creating article:', error);
    throw new Error('Failed to create article');
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