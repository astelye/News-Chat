import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConfig';

export const useXpTracker = () => {
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    // Escuta mudanças no documento do usuário (XP e Level)
    const unsubscribe = onSnapshot(doc(db, 'users', uid), (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.data();
        console.log('XP atual:', userData.xp);
        console.log('Level atual:', userData.level);
        // Aqui você pode processar XP e level conforme necessário
      }
    });

    return () => unsubscribe();
  }, []);
};