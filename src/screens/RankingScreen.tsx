import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { colors } from '../theme/colors';

export const RankingScreen = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(10));
      const snapshot = await getDocs(q);
      setUsers(snapshot.docs.map(doc => doc.data()));
    };
    fetchRanking();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>RANKING GERAL</Text>
      <FlatList 
        data={users}
        keyExtractor={(item) => item.username}
        renderItem={({ item, index }) => (
          <View style={[styles.card, index < 3 && styles.topCard]}>
            <Text style={styles.rank}>{index + 1}º</Text>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.xp}>{item.xp} XP</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.primary, textAlign: 'center', marginBottom: 20 },
  card: { flexDirection: 'row', backgroundColor: colors.surface, padding: 20, borderRadius: 12, marginBottom: 10, alignItems: 'center', borderWidth: 1, borderColor: '#232328' },
  topCard: { borderColor: colors.primary, borderWidth: 2 }, // Destaque para o Top 3
  rank: { color: colors.textMuted, fontWeight: 'bold', width: 40 },
  username: { flex: 1, color: '#fff', fontSize: 16, fontWeight: '600' },
  xp: { color: colors.primary, fontWeight: 'bold' }
});