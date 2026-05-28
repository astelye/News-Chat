import { useEffect } from 'react';
import { auth } from '../services/firebaseConfig';
import { updateUserStatus } from '../services/presenceService';

export const usePresence = () => {
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // Quando o app abre, marca como online
      updateUserStatus(user.uid, true);

      // Quando o app fecha (ou componente desmonta), marca como offline
      return () => {
        updateUserStatus(user.uid, false);
      };
    }
  }, []);
};