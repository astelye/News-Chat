import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { updatePresence, removePresence } from '../services/presenceService';

export const usePresence = () => {
  useEffect(() => {
    // Define o usuário como online quando o app entra em foco
    updatePresence(true);

    // Monitora mudanças de estado do app
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
      removePresence();
    };
  }, []);

  const handleAppStateChange = async (status: AppStateStatus) => {
    if (status === 'active') {
      await updatePresence(true);
    } else if (status === 'background' || status === 'inactive') {
      await removePresence();
    }
  };
};