import { create } from 'zustand';
import { ColorScheme } from '@/types';
import { getColors } from '@/config/theme';

interface ThemeState {
  colorScheme: ColorScheme;
  colors: ReturnType<typeof getColors>;
  toggleColorScheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  colorScheme: 'dark',
  colors: getColors('dark'),
  toggleColorScheme: () =>
    set((state) => {
      const newScheme = state.colorScheme === 'dark' ? 'light' : 'dark';
      return {
        colorScheme: newScheme,
        colors: getColors(newScheme),
      };
    }),
  setColorScheme: (scheme: ColorScheme) =>
    set({
      colorScheme: scheme,
      colors: getColors(scheme),
    }),
}));
