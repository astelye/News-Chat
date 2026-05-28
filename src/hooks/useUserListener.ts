import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../services/firebaseConfig';

export const useUserListener = (onLevelUp: (level: number) => void) => {
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const unsub = onSnapshot(doc(db, 'users', uid), (doc) => {
      const data = doc.data();
      if (data?.level > 1) { // Lógica para disparar o modal se mudar o nível
        onLevelUp(data.level);
      }
    });
    return () => unsub();
  }, []);
};