import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { colors } from '../theme/colors';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>GRUPO</Text>
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>ENTRAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, justifyContent: 'center', padding: 30 },
  logo: { fontSize: 48, fontWeight: 'bold', color: colors.primary, textAlign: 'center', marginBottom: 50 },
  input: { backgroundColor: colors.surface, color: '#fff', height: 60, borderRadius: 12, paddingHorizontal: 20, marginBottom: 15 },
  loginButton: { backgroundColor: colors.primary, height: 60, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  loginButtonText: { color: colors.background, fontWeight: 'bold' },
  registerText: { color: colors.textMuted, textAlign: 'center', marginTop: 20 }
});