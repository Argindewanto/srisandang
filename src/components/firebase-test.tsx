'use client';

import { useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function FirebaseTest() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
      } else {
        console.log('No user signed in');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded">
      <p>Firebase Authentication Status: Check console</p>
    </div>
  );
} 