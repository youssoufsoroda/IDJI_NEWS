import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useThemeStore } from '@/store/useThemeStore';
import { Platform } from 'react-native';

export default function TabsLayout() {
  const { colors } = useThemeStore();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="news"
        options={{
          title: 'Actualités',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>📰</Text>,
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Rendez-vous',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>📅</Text>,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>✉️</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}
