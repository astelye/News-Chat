import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { createUserProfile } from '../services/userService';
import { colors } from '../theme/colors';

export const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfile(userCredential.user.uid, username, email);
      
      Alert.alert('Sucesso', 'Bem-vindo ao NewsChat!');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao criar conta. Verifique os dados.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>CADASTRAR</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="Seu ID (@usuario)" 
          placeholderTextColor={colors.textMuted} 
          onChangeText={setUsername} 
          autoCapitalize="none" 
        />
        <TextInput 
          style={styles.input} 
          placeholder="E-mail" 
          placeholderTextColor={colors.textMuted} 
          onChangeText={setEmail} 
          autoCapitalize="none" 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Senha" 
          placeholderTextColor={colors.textMuted} 
          secureTextEntry 
          onChangeText={setPassword} 
        />
        
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>CRIAR CONTA</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Já tem conta? <Text style={{color: colors.primary}}>Faça Login</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, justifyContent: 'center', padding: 30 },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.primary, textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: colors.surface, color: '#fff', height: 60, borderRadius: 12, paddingHorizontal: 20, marginBottom: 15 },
  button: { backgroundColor: colors.primary, height: 60, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#0a0a0c', fontWeight: 'bold', fontSize: 16 },
  backText: { color: colors.textMuted, textAlign: 'center', marginTop: 20 }
});