import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Função para criar o perfil do jogador no Firestore ao se cadastrar
export const createUserProfile = async (uid: string, username: string, email: string) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      username: username,
      email: email,
      level: 1,
      xp: 0,
      badge: 'Bronze',
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Erro ao criar perfil:", error);
  }
};

// Função para buscar os dados do usuário (nível, XP, etc)
export const getUserProfile = async (uid: string) => {
  try {
    const docSnap = await getDoc(doc(db, 'users', uid));
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
  }
  return null;
};