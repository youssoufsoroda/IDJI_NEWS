import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { useThemeStore } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { serviceService, appointmentService } from '@/services/api';
import { Service } from '@/types';
import { spacing, typography, borderRadius } from '@/config/theme';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { router } from 'expo-router';

export const BookingScreen: React.FC = () => {
  const { colors } = useThemeStore();
  const { user, isGuest } = useAuthStore();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [description, setDescription] = useState('');
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

  const handleSubmit = async () => {
    if (isGuest) {
      Alert.alert(
        'Connexion requise',
        'Veuillez vous connecter pour prendre un rendez-vous',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Se connecter', onPress: () => router.push('/login') },
        ]
      );
      return;
    }

    if (!selectedService) {
      setError('Veuillez sélectionner un service');
      return;
    }

    if (!description.trim()) {
      setError('Veuillez ajouter une description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await appointmentService.createAppointment({
        user_id: user!.id,
        service_id: selectedService,
        date: format(date, 'yyyy-MM-dd'),
        time: format(time, 'HH:mm'),
        description: description.trim(),
      });

      Alert.alert(
        'Succès',
        'Votre rendez-vous a été enregistré avec succès',
        [{ text: 'OK', onPress: () => resetForm() }]
      );
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création du rendez-vous');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDescription('');
    setDate(new Date());
    setTime(new Date());
    if (services.length > 0) {
      setSelectedService(services[0].id);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Prendre rendez-vous
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card>
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

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Date
          </Text>
          <TouchableOpacity
            style={[
              styles.dateButton,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={[styles.dateText, { color: colors.text }]}>
              {format(date, 'dd MMMM yyyy', { locale: fr })}
            </Text>
            <Text style={{ fontSize: 20 }}>📅</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (selectedDate) setDate(selectedDate);
              }}
              minimumDate={new Date()}
            />
          )}

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Heure
          </Text>
          <TouchableOpacity
            style={[
              styles.dateButton,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={[styles.dateText, { color: colors.text }]}>
              {format(time, 'HH:mm')}
            </Text>
            <Text style={{ fontSize: 20 }}>🕐</Text>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(Platform.OS === 'ios');
                if (selectedTime) setTime(selectedTime);
              }}
            />
          )}

          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Décrivez brièvement votre demande..."
            multiline
            numberOfLines={4}
          />

          {error ? (
            <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
          ) : null}

          <Button
            title="Confirmer le rendez-vous"
            onPress={handleSubmit}
            loading={loading}
            size="large"
          />
        </Card>

        {isGuest && (
          <Card style={styles.guestNotice}>
            <Text style={[styles.guestNoticeText, { color: colors.textSecondary }]}>
              💡 Connectez-vous pour prendre un rendez-vous
            </Text>
          </Card>
        )}
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
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  pickerContainer: {
    borderRadius: borderRadius.md,
    borderWidth: 2,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    marginBottom: spacing.md,
  },
  dateText: {
    ...typography.body1,
  },
  error: {
    ...typography.body2,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  guestNotice: {
    marginTop: spacing.lg,
  },
  guestNoticeText: {
    ...typography.body1,
    textAlign: 'center',
  },
});
