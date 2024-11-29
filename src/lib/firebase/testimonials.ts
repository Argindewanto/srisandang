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
  type QueryConstraint
} from 'firebase/firestore';

export interface Testimonial {
  id?: string;
  clientName: string;
  content: string;
  image?: string; // Optional image
  createdAt?: Date;
}

export async function createTestimonial(data: Omit<Testimonial, 'id' | 'createdAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'testimonials'), {
      ...data,
      createdAt: serverTimestamp(),
    });

    return {
      id: docRef.id,
      ...data,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error('Error creating testimonial:', error);
    throw new Error('Failed to create testimonial');
  }
}

export async function getTestimonials(options?: {
  searchQuery?: string;
}) {
  try {
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
    
    const q = query(collection(db, 'testimonials'), ...constraints);
    const querySnapshot = await getDocs(q);
    
    const testimonials: Testimonial[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      testimonials.push({
        id: doc.id,
        clientName: data.clientName,
        content: data.content,
        image: data.image,
        createdAt: data.createdAt?.toDate(),
      });
    });

    // Client-side search if searchQuery is provided
    if (options?.searchQuery) {
      const search = options.searchQuery.toLowerCase();
      return testimonials.filter(testimonial => 
        testimonial.clientName.toLowerCase().includes(search) ||
        testimonial.content.toLowerCase().includes(search)
      );
    }

    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw new Error('Failed to fetch testimonials');
  }
}

export async function getTestimonial(id: string): Promise<Testimonial> {
  try {
    const docRef = doc(db, 'testimonials', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Testimonial not found');
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      clientName: data.clientName,
      content: data.content,
      image: data.image,
      createdAt: data.createdAt?.toDate(),
    };
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    throw new Error('Failed to fetch testimonial');
  }
}

export async function updateTestimonial(
  id: string, 
  data: Omit<Testimonial, 'id' | 'createdAt'>
): Promise<Testimonial> {
  try {
    const docRef = doc(db, 'testimonials', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });

    return {
      id,
      ...data,
    };
  } catch (error) {
    console.error('Error updating testimonial:', error);
    throw new Error('Failed to update testimonial');
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'testimonials', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw new Error('Failed to delete testimonial');
  }
} 