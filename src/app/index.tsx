/**
 * Step 1: Welcome Screen - Customer entrance for KixCleen.
 * Features an automated, animated slideshow that explains the vending system
 * (Deep Foam Scrub, Dual Rotating Brushes, Hot Air Drying & UV Sanitization, Touchless Pickup),
 * matching the petrol-blue (#10394F) aesthetic with interactive pagination and GET STARTED CTA.
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, AppConfig, setStoredKioskId } from '../constants';
import { registerShoecleanOrigin } from '../services/kioskMonitoringService';
import { useOrder } from '../store/orderStore';
import { useResponsive } from '../hooks';
import { WelcomeSlideshow, KixCleenLogo } from '../components/common';

export default function WelcomeScreen() {
  const router = useRouter();
  const { isTablet, isLandscape, contentMaxWidth, horizontalPadding } = useResponsive();
  const { dispatch } = useOrder();
  const [currentKioskId, setCurrentKioskId] = useState<string>(AppConfig.kioskId);

  // Ensure state is completely fresh for a new transaction whenever landing on Welcome
  useEffect(() => {
    dispatch({ type: 'RESET_SESSION' });
    setCurrentKioskId(AppConfig.kioskId);
    registerShoecleanOrigin();
  }, [dispatch]);

  const handleSwitchKiosk = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const input = window.prompt(
        'Configure Kiosk Machine ID for this terminal:\n(e.g. KIOSK-SAMPLE-01, KIOSK-01-MAIN)',
        currentKioskId
      );
      if (input && input.trim()) {
        const clean = input.trim().toUpperCase();
        setStoredKioskId(clean);
        setCurrentKioskId(clean);
      }
    }
  };

  const handleGetStarted = () => {
    dispatch({ type: 'RESET_SESSION' });
    router.push('/shoe-type');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingHorizontal: horizontalPadding },
          isLandscape && styles.containerLandscape,
        ]}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.contentWrapper, { maxWidth: contentMaxWidth }]}>
          {/* Active Terminal Machine Identity Badge */}
          <TouchableOpacity
            style={styles.machineBadge}
            onPress={handleSwitchKiosk}
            activeOpacity={0.8}
            accessibilityLabel="Configured Kiosk Machine ID"
          >
            <View style={styles.onlineDot} />
            <Text style={styles.machineBadgeText}>
              Machine ID: <Text style={styles.machineBadgeBold}>{currentKioskId}</Text>
            </Text>
            <Ionicons name="hardware-chip-outline" size={13} color="#64748B" />
          </TouchableOpacity>

          {/* Brand Logo directly above machine illustration */}
          <View style={[styles.logoWrapper, isTablet && styles.logoWrapperTablet]}>
            <KixCleenLogo isTablet={isTablet} />
          </View>

          {/* Animated 3-Step Slideshow with Realistic Kiosk Machine Illustration */}
          <WelcomeSlideshow
            isTablet={isTablet}
            onPressGetStarted={handleGetStarted}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  container: {
    flexGrow: 1,
    paddingVertical: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLandscape: {
    paddingVertical: Spacing.xs,
  },
  contentWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  machineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 8,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  machineBadgeText: {
    fontSize: 11,
    color: '#64748B',
    letterSpacing: 0.3,
  },
  machineBadgeBold: {
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -4,
  },
  logoWrapperTablet: {
    marginBottom: 0,
  },
});
