import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { useThemeStore } from '@/store/useThemeStore';
import { serviceService, messageService } from '@/services/api';
import { Service } from '@/types';
import { spacing, typography, borderRadius } from '@/config/theme';

export const ContactScreen: React.FC = () => {
  const { colors } = useThemeStore();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await serviceService.getServices();
      setServices(data);
      if (data.length > 0) {
        setSelectedService(data[0].id);
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de chargement');
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (!validateEmail(email)) {
      setError('Veuillez entrer un email valide');
      return;
    }

    if (!selectedService) {
      setError('Veuillez sélectionner un service');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await messageService.createMessage({
        name: name.trim(),
        email: email.trim(),
        service_id: selectedService,
        subject: subject.trim(),
        message: message.trim(),
      });

      Alert.alert(
        'Succès',
        'Votre message a été envoyé avec succès',
        [{ text: 'OK', onPress: () => resetForm() }]
      );
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'envoi du message");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    if (services.length > 0) {
      setSelectedService(services[0].id);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Nous contacter
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Remplissez ce formulaire pour nous envoyer un message. Nous vous répondrons
            dans les plus brefs délais.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Type de service
          </Text>
          <View
            style={[
              styles.pickerContainer,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Picker
              selectedValue={selectedService}
              onValueChange={setSelectedService}
              style={{ color: colors.text }}
            >
              {services.map((service) => (
                <Picker.Item
                  key={service.id}
                  label={service.name}
                  value={service.id}
                />
              ))}
            </Picker>
          </View>

          <Input
            label="Nom complet"
            value={name}
            onChangeText={setName}
            placeholder="Jean Dupont"
          />

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="votre@email.com"
            keyboardType="email-address"
          />

          <Input
            label="Sujet"
            value={subject}
            onChangeText={setSubject}
            placeholder="Objet de votre message"
          />

          <Input
            label="Message"
            value={message}
            onChangeText={setMessage}
            placeholder="Écrivez votre message ici..."
            multiline
            numberOfLines={6}
          />

          {error ? (
            <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
          ) : null}

          <Button
            title="Envoyer le message"
            onPress={handleSubmit}
            loading={loading}
            size="large"
          />
        </Card>

        <Card style={styles.infoCard}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>
            📍 Informations de contact
          </Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            📧 Email: contact@idjinkoundzi.com{'\n'}
            📱 Téléphone: +269 XXX XX XX{'\n'}
            🌐 Web: www.idjinkoundzi.com
          </Text>
        </Card>
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
  description: {
    ...typography.body1,
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.sm,
  },
  pickerContainer: {
    borderRadius: borderRadius.md,
    borderWidth: 2,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  error: {
    ...typography.body2,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  infoCard: {
    marginTop: spacing.lg,
  },
  infoTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  infoText: {
    ...typography.body1,
    lineHeight: 24,
  },
});
