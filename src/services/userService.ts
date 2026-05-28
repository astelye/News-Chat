import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

interface UserData {
  username: string;
  email: string;
  level: number;
  xp: number;
  createdAt: any;
  updatedAt: any;
}

// Cria um novo usuário no Firestore
export const createUser = async (username: string, email: string) => {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Usuário não autenticado');

    const userData: UserData = {
      username,
      email,
      level: 1,
      xp: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', uid), userData);
    return userData;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

// Busca dados do usuário
export const getUser = async (uid: string): Promise<UserData | null> => {
  try {
    const snapshot = await getDoc(doc(db, 'users', uid));
    if (snapshot.exists()) {
      return snapshot.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
};

// Atualiza o XP do usuário
export const updateUserXp = async (xpToAdd: number) => {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Usuário não autenticado');

    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const currentData = userSnap.data();
      const newXp = (currentData.xp || 0) + xpToAdd;
      const nextLevelXp = currentData.level * 1000; // Exemplo: cada nível precisa de level * 1000 XP

      let newLevel = currentData.level;
      if (newXp >= nextLevelXp) {
        newLevel = currentData.level + 1;
      }

      await updateDoc(userRef, {
        xp: newXp,
        level: newLevel,
        updatedAt: serverTimestamp(),
      });

      return { xp: newXp, level: newLevel };
    }
  } catch (error) {
    console.error('Erro ao atualizar XP:', error);
    throw error;
  }
};