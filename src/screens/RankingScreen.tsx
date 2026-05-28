import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

export const RankingScreen = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      setUsers(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchRanking();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a0c' }}>
      <FlatList 
        data={users}
        keyExtractor={(item) => item.username}
        renderItem={({ item, index }) => (
          <Text style={{ color: '#fff' }}>{index + 1}º {item.username} - {item.xp} XP</Text>
        )}
      />
    </View>
  );
};