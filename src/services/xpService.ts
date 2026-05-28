import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

const XP_PER_MESSAGE = 10; // XP por mensagem enviada
const XP_PER_MINUTE_ONLINE = 1; // XP por minuto online
const XP_TO_LEVEL_UP = 1000; // XP necessário para subir de nível

// Calcula o XP necessário para o próximo nível
export const getXpForNextLevel = (currentLevel: number): number => {
  return currentLevel * XP_TO_LEVEL_UP;
};

// Adiciona XP ao usuário por enviar mensagem
export const addXpForMessage = async () => {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Usuário não autenticado');

    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const newXp = (userData.xp || 0) + XP_PER_MESSAGE;
      const xpNeeded = getXpForNextLevel(userData.level || 1);

      let newLevel = userData.level || 1;
      if (newXp >= xpNeeded) {
        newLevel += 1;
      }

      await updateDoc(userRef, {
        xp: newXp % xpNeeded, // Reseta XP para o novo nível
        level: newLevel,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Erro ao adicionar XP:', error);
  }
};

// Adiciona XP ao usuário por estar online
export const addXpForOnlineTime = async () => {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Usuário não autenticado');

    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const newXp = (userData.xp || 0) + XP_PER_MINUTE_ONLINE;
      const xpNeeded = getXpForNextLevel(userData.level || 1);

      let newLevel = userData.level || 1;
      if (newXp >= xpNeeded) {
        newLevel += 1;
      }

      await updateDoc(userRef, {
        xp: newXp % xpNeeded,
        level: newLevel,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Erro ao adicionar XP online:', error);
  }
};