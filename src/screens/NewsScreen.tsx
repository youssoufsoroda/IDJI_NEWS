import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Card } from '@/components/Card';
import { NewsCardSkeleton } from '@/components/LoadingSkeleton';
import { ErrorView } from '@/components/ErrorView';
import { EmptyState } from '@/components/EmptyState';
import { useThemeStore } from '@/store/useThemeStore';
import { newsService, serviceService } from '@/services/api';
import { News, Service } from '@/types';
import { spacing, typography, borderRadius } from '@/config/theme';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const { width } = Dimensions.get('window');

export const NewsScreen: React.FC = () => {
  const { colors } = useThemeStore();
  const [news, setNews] = useState<News[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, [selectedService]);

  const loadData = async () => {
    try {
      setError('');
      const [newsData, servicesData] = await Promise.all([
        newsService.getNews(selectedService || undefined),
        services.length === 0 ? serviceService.getServices() : Promise.resolve(services),
      ]);
      setNews(newsData);
      if (services.length === 0) setServices(servicesData);
    } catch (err: any) {
      setError(err.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const renderServiceFilter = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContainer}
    >
      <TouchableOpacity
        style={[
          styles.filterChip,
          {
            backgroundColor: !selectedService ? colors.primary : colors.surface,
          },
        ]}
        onPress={() => setSelectedService(null)}
      >
        <Text
          style={[
            styles.filterText,
            {
              color: !selectedService ? '#ffffff' : colors.text,
            },
          ]}
        >
          Tout
        </Text>
      </TouchableOpacity>

      {services.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={[
            styles.filterChip,
            {
              backgroundColor:
                selectedService === service.id ? colors.primary : colors.surface,
            },
          ]}
          onPress={() => setSelectedService(service.id)}
        >
          <Text
            style={[
              styles.filterText,
              {
                color: selectedService === service.id ? '#ffffff' : colors.text,
              },
            ]}
          >
            {service.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderNewsItem = ({ item, index }: { item: News; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 100)}>
      <Card style={styles.newsCard}>
        {item.image_url && (
          <Image
            source={{ uri: item.image_url }}
            style={styles.newsImage}
            contentFit="cover"
            transition={300}
          />
        )}
        <View style={styles.newsContent}>
          {item.service && (
            <View
              style={[styles.serviceBadge, { backgroundColor: colors.primary + '20' }]}
            >
              <Text style={[styles.serviceBadgeText, { color: colors.primary }]}>
                {item.service.name}
              </Text>
            </View>
          )}
          <Text style={[styles.newsTitle, { color: colors.text }]}>
            {item.title}
          </Text>
          <Text
            style={[styles.newsDescription, { color: colors.textSecondary }]}
            numberOfLines={3}
          >
            {item.content}
          </Text>
          <Text style={[styles.newsDate, { color: colors.textSecondary }]}>
            {format(new Date(item.created_at), 'dd MMMM yyyy', { locale: fr })}
          </Text>
        </View>
      </Card>
    </Animated.View>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Actualités</Text>
        </View>
        <View style={styles.content}>
          <NewsCardSkeleton />
          <NewsCardSkeleton />
          <NewsCardSkeleton />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Actualités</Text>
        </View>
        <ErrorView message={error} onRetry={loadData} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Actualités</Text>
      </View>

      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderServiceFilter}
        ListEmptyComponent={
          <EmptyState
            emoji="📰"
            title="Aucune actualité"
            description="Il n'y a pas encore d'actualités disponibles"
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
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
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  filterContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  filterText: {
    ...typography.body2,
    fontWeight: '600',
  },
  listContent: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  newsCard: {
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: 200,
  },
  newsContent: {
    padding: spacing.md,
  },
  serviceBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  serviceBadgeText: {
    ...typography.caption,
    fontWeight: '600',
  },
  newsTitle: {
    ...typography.h4,
    marginBottom: spacing.sm,
  },
  newsDescription: {
    ...typography.body2,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  newsDate: {
    ...typography.caption,
  },
});
