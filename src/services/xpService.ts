import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const addXp = async (uid: string, amount: number) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const currentXp = userSnap.data().xp || 0;
      const newXp = currentXp + amount;
      
      // A cada 1000 XP o usuário sobe de nível
      const newLevel = Math.floor(newXp / 1000) + 1;

      await updateDoc(userRef, {
        xp: newXp,
        level: newLevel
      });
    }
  } catch (error) {
    console.error("Erro ao adicionar XP:", error);
  }
};