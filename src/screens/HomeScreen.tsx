import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { usePresence } from '../hooks/usePresence';
import { useXpTracker } from '../hooks/useXpTracker'; // Importação do hook de XP

export const HomeScreen = () => {
  // Ativa o monitoramento de status online e o farm de XP
  usePresence();
  useXpTracker();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Cabeçalho do Jogador */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>👻</Text>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.username}>@ninja</Text>
            <Text style={styles.levelText}>Nível 42 • Diamante</Text>

            {/* Barra de XP */}
            <View style={styles.xpBarBackground}>
              <View style={styles.xpBarFill} />
            </View>
            <Text style={styles.xpText}>15.420 / 20.000 XP</Text>
          </View>
        </View>

        {/* Menu de Ações Rápidas */}
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionText}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <Text style={styles.actionIcon}>🎮</Text>
            <Text style={styles.actionText}>Amigos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <Text style={styles.actionIcon}>🏆</Text>
            <Text style={styles.actionText}>Ranking</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Amigos Online</Text>

        <View style={styles.friendCard}>
          <View style={styles.friendAvatar}>
            <Text style={styles.friendEmoji}>🦊</Text>
            <View style={styles.onlineIndicator} />
          </View>
          <View>
            <Text style={styles.friendName}>@raposa_x</Text>
            <Text style={styles.friendStatus}>Jogando agora</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#232328',
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1e1e24',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#0066ff',
  },
  avatarEmoji: {
    fontSize: 35,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00ccff',
    textShadowColor: 'rgba(0, 204, 255, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 2,
  },
  levelText: {
    fontSize: 14,
    color: colors.textTitle,
    fontWeight: '600',
    marginBottom: 8,
  },
  xpBarBackground: {
    height: 8,
    backgroundColor: '#1e1e24',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  xpBarFill: {
    height: '100%',
    width: '75%',
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  xpText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionCard: {
    backgroundColor: colors.surface,
    width: '30%',
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#232328',
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  actionText: {
    color: colors.textTitle,
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textTitle,
    marginBottom: 15,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1e1e24',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  friendEmoji: {
    fontSize: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00ff00',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textTitle,
    marginBottom: 4,
  },
  friendStatus: {
    fontSize: 14,
    color: colors.primary,
  },
});