/**
 * Step 1: Welcome Screen - Customer entrance for KixCleen.
 * Features an automated, animated slideshow that explains the vending system
 * (Deep Foam Scrub, Dual Rotating Brushes, Hot Air Drying & UV Sanitization, Touchless Pickup),
 * matching the petrol-blue (#10394F) aesthetic with interactive pagination and GET STARTED CTA.
 */

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../constants';
import { useOrder } from '../store/orderStore';
import { useResponsive } from '../hooks';
import { WelcomeSlideshow, KixCleenLogo } from '../components/common';

export default function WelcomeScreen() {
  const router = useRouter();
  const { isTablet, isLandscape, contentMaxWidth, horizontalPadding } = useResponsive();
  const { dispatch } = useOrder();

  // Ensure state is completely fresh for a new transaction whenever landing on Welcome
  useEffect(() => {
    dispatch({ type: 'RESET_SESSION' });
  }, [dispatch]);

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
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -4,
  },
  logoWrapperTablet: {
    marginBottom: 0,
  },
});
