import { collection, addDoc, query, orderByChild, onSnapshot, QueryConstraint, orderBy, limit } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Timestamp } from 'firebase/firestore';

interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: any;
}

// Envia uma mensagem para o Firestore
export const sendMessage = async (username: string, text: string) => {
  try {
    await addDoc(collection(db, 'messages'), {
      username,
      text,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
};

// Inscreve-se às mensagens em tempo real
export const subscribeToMessages = (callback: (messages: Message[]) => void) => {
  try {
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages: Message[] = [];
      snapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          username: doc.data().username,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
        });
      });
      callback(messages);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Erro ao inscrever-se às mensagens:', error);
    return () => {};
  }
};