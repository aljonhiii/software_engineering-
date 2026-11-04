/**
 * AddonCard component for selecting optional cleaning add-ons.
 * Includes toggle checkbox and pricing information with clean white card styling.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ServiceAddon } from '../../types';
import { Colors, Typography, Spacing, Shadows } from '../../constants';
import { formatPrice } from '../../utils';

interface AddonCardProps {
  addon: ServiceAddon;
  isSelected: boolean;
  onToggle: (addon: ServiceAddon) => void;
}

export function AddonCard({ addon, isSelected, onToggle }: AddonCardProps) {
  const getIconName = (): keyof typeof Ionicons.glyphMap => {
    switch (addon.icon) {
      case 'leaf':
        return 'leaf-outline';
      case 'water':
        return 'shield-checkmark-outline';
      default:
        return 'add-circle-outline';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.containerSelected,
      ]}
      onPress={() => onToggle(addon)}
      activeOpacity={0.85}
    >
      <View style={styles.leftSection}>
        <View style={[styles.iconWrapper, isSelected && styles.iconWrapperSelected]}>
          <Ionicons
            name={getIconName()}
            size={22}
            color={isSelected ? '#FFFFFF' : Colors.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{addon.name}</Text>
          <Text style={styles.description}>{addon.description}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.price, isSelected && styles.priceSelected]}>
          +{formatPrice(addon.price)}
        </Text>
        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
          {isSelected && (
            <Ionicons name="checkmark" size={15} color="#FFFFFF" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.cardWhite,
    borderRadius: 14,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    minHeight: 72,
    ...Shadows.small,
  },
  containerSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#FFFFFF',
    ...Shadows.glow(Colors.primary),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.md,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(2, 132, 199, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  iconWrapperSelected: {
    backgroundColor: Colors.primary,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  description: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  price: {
    fontSize: 14,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  priceSelected: {
    color: Colors.primary,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkboxSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
});
