import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export const LevelUpModal = ({ visible, level, onClose }: any) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>LEVEL UP!</Text>
        <Text style={styles.level}>NÍVEL {level}</Text>
        <Text style={styles.message}>Você ficou mais forte!</Text>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>COLETAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: colors.surface, padding: 30, borderRadius: 20, alignItems: 'center', width: '80%' },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.primary },
  level: { fontSize: 48, fontWeight: 'bold', color: '#fff', marginVertical: 10 },
  message: { color: colors.textMuted, marginBottom: 20 },
  button: { backgroundColor: colors.primary, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});