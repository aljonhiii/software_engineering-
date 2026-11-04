/**
 * ServiceCard component for displaying a cleaning service tier.
 * Styled with elevated white card and vibrant blue/teal accents.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CleaningService } from '../../types';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants';
import { formatPrice, formatDuration } from '../../utils';

interface ServiceCardProps {
  service: CleaningService;
  isSelected: boolean;
  onSelect: (service: CleaningService) => void;
}

export function ServiceCard({ service, isSelected, onSelect }: ServiceCardProps) {
  const getIconName = (): keyof typeof Ionicons.glyphMap => {
    switch (service.icon) {
      case 'flash':
        return 'flash-outline';
      case 'sparkles':
        return 'sparkles-outline';
      case 'diamond':
        return 'shield-checkmark-outline';
      default:
        return 'water-outline';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.containerSelected,
      ]}
      onPress={() => onSelect(service)}
      activeOpacity={0.88}
    >
      {/* Selection Badge Header */}
      <View style={styles.header}>
        <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
          <Ionicons
            name={getIconName()}
            size={26}
            color={isSelected ? '#FFFFFF' : Colors.primary}
          />
        </View>
        <View style={styles.badgeRow}>
          <View style={styles.durationBadge}>
            <Ionicons name="time-outline" size={13} color="#64748B" />
            <Text style={styles.durationText}>{formatDuration(service.durationMinutes)}</Text>
          </View>
          <View style={[styles.radio, isSelected && styles.radioSelected]}>
            {isSelected && <View style={styles.radioInner} />}
          </View>
        </View>
      </View>

      {/* Title & Description */}
      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {service.description}
      </Text>

      {/* Feature List */}
      <View style={styles.featureList}>
        {service.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={isSelected ? Colors.primary : Colors.accent}
            />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {/* Price Footer */}
      <View style={styles.footer}>
        <Text style={styles.priceLabel}>Price</Text>
        <Text style={[styles.priceValue, isSelected && styles.priceValueSelected]}>
          {formatPrice(service.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cardWhite,
    borderRadius: 18,
    padding: Spacing.lg,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    minHeight: 250,
    justifyContent: 'space-between',
    ...Shadows.card,
  },
  containerSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#FFFFFF',
    ...Shadows.glow(Colors.primary),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(2, 132, 199, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerSelected: {
    backgroundColor: Colors.primary,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  durationText: {
    fontSize: Typography.caption,
    color: '#64748B',
    fontWeight: Typography.medium,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.xs,
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  description: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },
  featureList: {
    marginVertical: Spacing.md,
    gap: 6,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: Typography.regular,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: Spacing.sm,
    marginTop: Spacing.xs,
  },
  priceLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: Typography.bold,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  priceValueSelected: {
    color: Colors.primary,
  },
});
