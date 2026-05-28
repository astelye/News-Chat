import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Atualiza o status do usuário no banco de dados
export const updateUserStatus = async (uid: string, isOnline: boolean) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      online: isOnline,
      lastSeen: new Date(),
    });
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
  }
};