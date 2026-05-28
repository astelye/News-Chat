import { doc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

// Atualiza o status de presença do usuário
export const updatePresence = async (isOnline: boolean) => {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    await setDoc(
      doc(db, 'presence', uid),
      {
        isOnline,
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Erro ao atualizar presença:', error);
  }
};

// Remove presença quando o usuário sai
export const removePresence = async () => {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    await updateDoc(doc(db, 'presence', uid), {
      isOnline: false,
      lastSeen: serverTimestamp(),
    });
  } catch (error) {
    console.error('Erro ao remover presença:', error);
  }
};