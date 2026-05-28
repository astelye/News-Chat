import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors } from '../theme/colors';

export const RegisterScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      <View style={styles.content}>
        <Text style={styles.title}>NOVO JOGADOR</Text>
        <Text style={styles.subtitle}>Crie sua conta no Grupo</Text>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Seu ID (Ex: @ninja)"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
          />
          <TextInput 
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput 
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={colors.textMuted}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity style={styles.registerButton} activeOpacity={0.8}>
          <Text style={styles.registerButtonText}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>
            Já tem uma conta? <Text style={styles.backTextHighlight}>Faça Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 255, 204, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    letterSpacing: 2,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    gap: 15,
    marginBottom: 30,
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.textTitle,
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#232328',
  },
  registerButton: {
    backgroundColor: colors.primary,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  registerButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  backButton: {
    marginTop: 25,
    alignItems: 'center',
  },
  backText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  backTextHighlight: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});