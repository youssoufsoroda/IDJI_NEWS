import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { SplashScreen } from '@/screens/SplashScreen';
import { TermsScreen } from '@/screens/TermsScreen';
import { useAuthStore } from '@/store/useAuthStore';

export default function Index() {
  const { user, isGuest, hasAcceptedTerms, isLoading } = useAuthStore();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!showSplash && !isLoading) {
      if (!hasAcceptedTerms) {
        return;
      }

      if (user || isGuest) {
        router.replace('/(tabs)/news');
      } else {
        router.replace('/login');
      }
    }
  }, [showSplash, isLoading, hasAcceptedTerms, user, isGuest]);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!hasAcceptedTerms) {
    return <TermsScreen />;
  }

  return <View style={{ flex: 1 }} />;
}
