import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp, 
  getDocs,
  query,
  orderBy,
  where,
  type QueryConstraint
} from 'firebase/firestore';

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  panggilan: 'Kakak' | 'Bapak' | 'Ibu';
  qtyRange: 
    '< 50' | 
    '50 - 100' | 
    '100 - 200' | 
    '200 - 300' | 
    '300 - 500' | 
    '500 - 1000' | 
    '> 1000';
  status: 'new' | 'contacted' | 'closed';
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createLead(data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'leads'), {
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
    console.error('Error creating lead:', error);
    throw new Error('Failed to create lead');
  }
}

export async function getLeads(options?: {
  status?: 'new' | 'contacted' | 'closed';
  searchQuery?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}) {
  try {
    // Create base query
    let baseQuery;
    
    if (options?.status) {
      baseQuery = query(
        collection(db, 'leads'),
        where('status', '==', options.status)
      );
    } else {
      baseQuery = collection(db, 'leads');
    }

    const querySnapshot = await getDocs(baseQuery);
    
    let leads: Lead[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      leads.push({
        id: doc.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        panggilan: data.panggilan || 'Kakak',
        qtyRange: data.qtyRange,
        status: data.status,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      });
    });

    // Sort by createdAt in descending order
    leads.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());

    // Apply date range filter if provided
    if (options?.dateRange) {
      leads = leads.filter(lead => {
        const createdAt = lead.createdAt!;
        return createdAt >= options.dateRange!.from && 
               createdAt <= options.dateRange!.to;
      });
    }

    // Apply search filter if provided
    if (options?.searchQuery) {
      const search = options.searchQuery.toLowerCase();
      leads = leads.filter(lead => 
        lead.name.toLowerCase().includes(search) ||
        lead.email.toLowerCase().includes(search) ||
        lead.company.toLowerCase().includes(search)
      );
    }

    return leads;
  } catch (error) {
    console.error('Error fetching leads:', error);
    return []; // Return empty array instead of throwing error
  }
}

export async function getLead(id: string): Promise<Lead> {
  try {
    const docRef = doc(db, 'leads', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Lead not found');
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      panggilan: data.panggilan,
      qtyRange: data.qtyRange,
      status: data.status,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  } catch (error) {
    console.error('Error fetching lead:', error);
    throw new Error('Failed to fetch lead');
  }
}

export async function updateLeadStatus(
  id: string,
  status: 'new' | 'contacted' | 'closed'
): Promise<void> {
  try {
    const docRef = doc(db, 'leads', id);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating lead status:', error);
    throw new Error('Failed to update lead status');
  }
}

export async function updateLeadPanggilan(
  id: string,
  panggilan: 'Kakak' | 'Bapak' | 'Ibu'
): Promise<void> {
  try {
    const docRef = doc(db, 'leads', id);
    await updateDoc(docRef, {
      panggilan,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating lead panggilan:', error);
    throw new Error('Failed to update lead panggilan');
  }
} 