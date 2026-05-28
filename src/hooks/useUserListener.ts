import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConfig';

export const useUserListener = (onLevelUp: (level: number) => void) => {
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    let previousLevel = 0;

    // Escuta mudanças no documento do usuário
    const unsubscribe = onSnapshot(doc(db, 'users', uid), (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.data();
        const currentLevel = userData.level || 0;

        // Se houve aumento de level, dispara o callback
        if (currentLevel > previousLevel && previousLevel > 0) {
          onLevelUp(currentLevel);
        }

        previousLevel = currentLevel;
      }
    });

    return () => unsubscribe();
  }, [onLevelUp]);
};