import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeStore } from '@/store/useThemeStore';
import { spacing, typography } from '@/config/theme';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const { colors } = useThemeStore();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const creatorOpacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 10 });
    opacity.value = withTiming(1, { duration: 800 });
    translateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) });
    
    creatorOpacity.value = withSequence(
      withTiming(0, { duration: 1000 }),
      withTiming(1, { duration: 600 })
    );

    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const creatorStyle = useAnimatedStyle(() => ({
    opacity: creatorOpacity.value,
  }));

  return (
    <LinearGradient
      colors={['#0f0f1e', '#1a1a2e', '#16213e']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <Text style={styles.logoEmoji}>📰</Text>
        </Animated.View>
        
        <Animated.View style={titleStyle}>
          <Text style={styles.title}>IDJINKOUNDZI</Text>
          <Text style={styles.subtitle}>NEWS</Text>
        </Animated.View>
      </View>

      <Animated.View style={[styles.footer, creatorStyle]}>
        <Text style={styles.creatorText}>Created by:</Text>
        <Text style={styles.creatorName}>YOUSSOUF SORODA</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoEmoji: {
    fontSize: 64,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4285f4',
    textAlign: 'center',
    marginTop: spacing.xs,
    letterSpacing: 8,
  },
  footer: {
    position: 'absolute',
    bottom: spacing.xxl,
    alignItems: 'center',
  },
  creatorText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: spacing.xs,
  },
  creatorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },
});
