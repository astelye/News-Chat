import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { colors } from '../theme/colors';

interface LevelUpModalProps {
  visible: boolean;
  level: number;
  onClose: () => void;
}

export const LevelUpModal = ({ visible, level, onClose }: LevelUpModalProps) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 12,
        bounciness: 10,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible, scaleAnim]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Efeito de confete/estrelas */}
          <View style={styles.starContainer}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.star}>✨</Text>
            <Text style={styles.star}>⭐</Text>
          </View>

          <Text style={styles.title}>NÍVEL UP!</Text>
          <Text style={styles.levelText}>Nível {level}</Text>

          <Text style={styles.subtitle}>Parabéns por subir de nível!</Text>
          <Text style={styles.rewardText}>+500 XP Bônus 🎁</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 20,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  star: {
    fontSize: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
  levelText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.secondary,
    textShadowColor: colors.secondary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textTitle,
    marginBottom: 10,
    textAlign: 'center',
  },
  rewardText: {
    fontSize: 18,
    color: colors.success,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});