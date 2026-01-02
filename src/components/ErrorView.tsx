import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { useThemeStore } from '@/store/useThemeStore';
import { spacing, typography } from '@/config/theme';

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  const { colors } = useThemeStore();

  return (
    <View style={styles.container}>
      <Text style={[styles.emoji]}>⚠️</Text>
      <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
      {onRetry && (
        <Button
          title="Réessayer"
          onPress={onRetry}
          variant="outline"
          size="medium"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  message: {
    ...typography.body1,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    minWidth: 150,
  },
});
