import { useEffect } from 'react';
import { auth } from '../services/firebaseConfig';
import { addXp } from '../services/xpService';

export const useXpTracker = () => {
  useEffect(() => {
    // Adiciona 10 XP a cada 60 segundos de uso
    const interval = setInterval(() => {
      const user = auth.currentUser;
      if (user) {
        addXp(user.uid, 10);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);
};