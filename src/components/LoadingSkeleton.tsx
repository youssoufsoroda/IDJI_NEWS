import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useThemeStore } from '@/store/useThemeStore';
import { spacing, borderRadius } from '@/config/theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius: radius = borderRadius.sm,
  style,
}) => {
  const { colors } = useThemeStore();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: colors.border,
        },
        animatedStyle,
        style,
      ]}
    />
  );
};

export const NewsCardSkeleton: React.FC = () => {
  return (
    <View style={styles.newsCard}>
      <Skeleton height={200} borderRadius={borderRadius.md} />
      <View style={styles.newsContent}>
        <Skeleton width="40%" height={16} />
        <Skeleton width="90%" height={24} style={{ marginTop: spacing.sm }} />
        <Skeleton width="100%" height={16} style={{ marginTop: spacing.sm }} />
        <Skeleton width="80%" height={16} style={{ marginTop: spacing.xs }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  newsCard: {
    marginBottom: spacing.md,
  },
  newsContent: {
    padding: spacing.md,
  },
});
