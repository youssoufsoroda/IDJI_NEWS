import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { useThemeStore } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { spacing, typography } from '@/config/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TermsScreen: React.FC = () => {
  const { colors } = useThemeStore();
  const { setHasAcceptedTerms } = useAuthStore();
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAccept = async () => {
    setIsAccepting(true);
    await AsyncStorage.setItem('hasAcceptedTerms', 'true');
    setHasAcceptedTerms(true);
    setIsAccepting(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Conditions d'utilisation
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Bienvenue sur IDJINKOUNDZI NEWS
        </Text>
        
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          En utilisant cette application, vous acceptez les conditions suivantes :
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          1. Utilisation de l'application
        </Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          IDJINKOUNDZI NEWS est une plateforme de gestion d'événements et d'actualités. 
          Vous pouvez consulter les actualités en tant qu'invité ou créer un compte pour 
          accéder aux fonctionnalités complètes (prise de rendez-vous, messages, etc.).
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          2. Types d'événements
        </Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          Notre application couvre les événements suivants :{'\n'}
          • Grand mariage{'\n'}
          • Mdhoihiricho{'\n'}
          • Séminaire{'\n'}
          • TOIRABE{'\n'}
          • Conférence{'\n'}
          • Autres événements
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          3. Protection des données
        </Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          Vos données personnelles sont protégées et utilisées uniquement dans le cadre 
          de l'application. Nous ne partageons pas vos informations avec des tiers sans 
          votre consentement explicite.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          4. Rendez-vous et messages
        </Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          Les rendez-vous et messages envoyés via l'application sont traités dans les 
          meilleurs délais. Nous nous réservons le droit d'annuler ou de reporter un 
          rendez-vous en cas de circonstances exceptionnelles.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          5. Responsabilité
        </Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          L'application est fournie "en l'état". Nous nous efforçons de maintenir un 
          service de qualité, mais nous ne pouvons garantir une disponibilité 
          ininterrompue.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          6. Modifications
        </Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          Nous nous réservons le droit de modifier ces conditions à tout moment. 
          Les modifications prendront effet dès leur publication dans l'application.
        </Text>

        <Text style={[styles.footer, { color: colors.textSecondary }]}>
          En acceptant ces conditions, vous confirmez avoir lu et compris l'ensemble 
          de ces termes et vous engagez à les respecter.
        </Text>
      </ScrollView>

      <View style={[styles.buttonContainer, { backgroundColor: colors.background }]}>
        <Button
          title="J'accepte les conditions"
          onPress={handleAccept}
          loading={isAccepting}
          size="large"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    ...typography.h4,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  paragraph: {
    ...typography.body1,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  footer: {
    ...typography.body2,
    fontStyle: 'italic',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});
