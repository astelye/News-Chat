import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const sendMessage = async (username: string, text: string) => {
  await addDoc(collection(db, 'messages'), {
    username,
    text,
    createdAt: new Date(),
  });
};

export const subscribeToMessages = (callback: (msgs: any[]) => void) => {
  const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
};
