import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { sendMessage, subscribeToMessages } from '../services/chatService';

export const ChatScreen = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    // Escuta mensagens em tempo real
    const unsubscribe = subscribeToMessages((msgs) => setMessages(msgs));
    return () => unsubscribe();
  }, []);

  const handleSend = () => {
    if (text.trim()) {
      sendMessage('@ninja', text); // Aqui você pode substituir pelo nome real do usuário logado
      setText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        inverted // Mostra a mensagem mais nova embaixo
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageBubble}>
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
          <Text style={{color: '#fff'}}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  messageBubble: { backgroundColor: colors.surface, padding: 15, margin: 10, borderRadius: 12 },
  username: { color: colors.primary, fontSize: 12, fontWeight: 'bold' },
  text: { color: '#fff', fontSize: 16 },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: colors.surface },
  input: { flex: 1, color: '#fff', paddingHorizontal: 15 },
  sendButton: { backgroundColor: colors.primary, padding: 15, borderRadius: 12 }
});