import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { sendMessage, subscribeToMessages } from '../services/chatService';
import { auth } from '../services/firebaseConfig'; // Importe o auth
import { getDoc, doc } from 'firebase/firestore'; // Importe para buscar o nome
import { db } from '../services/firebaseConfig';

export const ChatScreen = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [username, setUsername] = useState('Anônimo');

  useEffect(() => {
    // 1. Busca o username real do usuário logado no Firestore
    const fetchUserData = async () => {
      const uid = auth.currentUser?.uid;
      if (uid) {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) setUsername(userDoc.data().username);
      }
    };
    fetchUserData();

    // 2. Escuta mensagens em tempo real
    const unsubscribe = subscribeToMessages((msgs) => setMessages(msgs));
    return () => unsubscribe();
  }, []);

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(username, text); // Usa o nome real aqui
      setText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // Diferencia se a mensagem é do usuário logado (exibe à direita) ou não
          <View style={[styles.messageBubble, item.username === username && styles.myMessage]}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Digite algo..." 
          placeholderTextColor={colors.textMuted}
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={{color: '#0a0a0c', fontWeight: 'bold'}}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  messageBubble: { backgroundColor: colors.surface, padding: 15, margin: 10, borderRadius: 12, alignSelf: 'flex-start', maxWidth: '80%' },
  myMessage: { backgroundColor: colors.primary, alignSelf: 'flex-end' }, // Estilo se for sua msg
  username: { color: colors.textMuted, fontSize: 10, marginBottom: 5 },
  text: { color: '#fff', fontSize: 16 },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: colors.surface },
  input: { flex: 1, color: '#fff', paddingHorizontal: 15 },
  sendButton: { backgroundColor: colors.primary, padding: 15, borderRadius: 12 }
});