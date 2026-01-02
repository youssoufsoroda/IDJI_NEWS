import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useThemeStore } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/services/api';
import { spacing, typography, borderRadius } from '@/config/theme';

export const ProfileScreen: React.FC = () => {
  const { colors, colorScheme, toggleColorScheme } = useThemeStore();
  const { user, isGuest, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              if (!isGuest) {
                await authService.signOut();
              }
              logout();
              router.replace('/login');
            } catch (err) {
              Alert.alert('Erreur', 'Erreur lors de la déconnexion');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (isGuest) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Profil</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Card style={styles.guestCard}>
            <Text style={styles.guestEmoji}>👤</Text>
            <Text style={[styles.guestTitle, { color: colors.text }]}>
              Mode invité
            </Text>
            <Text style={[styles.guestDescription, { color: colors.textSecondary }]}>
              Connectez-vous pour accéder à toutes les fonctionnalités
            </Text>
            <Button
              title="Se connecter"
              onPress={() => router.replace('/login')}
              size="large"
              style={styles.guestButton}
            />
          </Card>

          <Card>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Mode sombre
                </Text>
              </View>
              <Switch
                value={colorScheme === 'dark'}
                onValueChange={toggleColorScheme}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#ffffff"
              />
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profil</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase() || '?'}
              </Text>
            </View>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>
            {user?.name}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {user?.email}
          </Text>
          <View
            style={[styles.roleBadge, { backgroundColor: colors.primary + '20' }]}
          >
            <Text style={[styles.roleText, { color: colors.primary }]}>
              {user?.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
            </Text>
          </View>
        </Card>

        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Paramètres
          </Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Mode sombre
              </Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Changer le thème de l'application
              </Text>
            </View>
            <Switch
              value={colorScheme === 'dark'}
              onValueChange={toggleColorScheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                🔔 Notifications
              </Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Gérer vos notifications
              </Text>
            </View>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                🌐 Langue
              </Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Français
              </Text>
            </View>
          </TouchableOpacity>
        </Card>

        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            À propos
          </Text>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>
              ℹ️ À propos de l'application
            </Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.settingItem}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>
              📄 Conditions d'utilisation
            </Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity style={styles.settingItem}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>
              🔒 Politique de confidentialité
            </Text>
          </TouchableOpacity>
        </Card>

        <Button
          title="Se déconnecter"
          onPress={handleLogout}
          loading={loading}
          variant="outline"
          size="large"
          style={[styles.logoutButton, { borderColor: colors.error }]}
          textStyle={{ color: colors.error }}
        />

        <Text style={[styles.version, { color: colors.textSecondary }]}>
          Version 1.0.0
        </Text>
      </ScrollView>
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
  headerTitle: {
    ...typography.h2,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#ffffff',
  },
  userName: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.body1,
    marginBottom: spacing.md,
  },
  roleBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  roleText: {
    ...typography.body2,
    fontWeight: '600',
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    ...typography.body1,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    ...typography.body2,
  },
  divider: {
    height: 1,
    marginVertical: spacing.xs,
  },
  logoutButton: {
    marginTop: spacing.lg,
  },
  version: {
    ...typography.caption,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  guestCard: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  guestEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  guestTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  guestDescription: {
    ...typography.body1,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  guestButton: {
    minWidth: 200,
  },
});
