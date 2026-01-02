import { ColorScheme } from '@/types';

export const lightColors = {
  primary: '#1a73e8',
  secondary: '#fbbc04',
  accent: '#ea4335',
  background: '#ffffff',
  surface: '#f5f5f5',
  card: '#ffffff',
  text: '#212121',
  textSecondary: '#757575',
  border: '#e0e0e0',
  error: '#d32f2f',
  success: '#388e3c',
  warning: '#f57c00',
  info: '#0288d1',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const darkColors = {
  primary: '#4285f4',
  secondary: '#fdd663',
  accent: '#f28b82',
  background: '#0f0f1e',
  surface: '#1a1a2e',
  card: '#252540',
  text: '#e8eaed',
  textSecondary: '#9aa0a6',
  border: '#3c4043',
  error: '#ef5350',
  success: '#66bb6a',
  warning: '#ffa726',
  info: '#29b6f6',
  shadow: 'rgba(0, 0, 0, 0.5)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
};

export const getColors = (scheme: ColorScheme) =>
  scheme === 'dark' ? darkColors : lightColors;
