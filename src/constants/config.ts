/**
 * App-wide configuration.
 * Environment-specific settings and feature flags.
 */

import { Platform } from 'react-native';
import Constants from 'expo-constants';

function resolveHostUrl(envUrl: string | undefined, defaultPort: number, pathSuffix = ''): string {
  const debuggerHost = Constants.expoConfig?.hostUri?.split(':')[0];

  if (envUrl && envUrl.trim() !== '') {
    if (Platform.OS !== 'web' && debuggerHost && envUrl.includes('localhost')) {
      return envUrl.replace('localhost', debuggerHost);
    }
    return envUrl;
  }

  const targetHost = Platform.OS !== 'web' && debuggerHost ? debuggerHost : 'localhost';
  return `http://${targetHost}:${defaultPort}${pathSuffix}`;
}

export const AppConfig = {
  /** App display name */
  appName: 'KixCleen',

  /** Assigned Kiosk Machine ID for telemetry and sales auditing */
  kioskId: process.env.EXPO_PUBLIC_KIOSK_ID || 'KIOSK-01-MAIN',

  /** Whether to use simulated services (true during development) */
  useSimulation: true,

  /** Simulated payment processing delay (ms) */
  simulatedPaymentDelay: 2500,

  /** Simulated machine update interval (ms) */
  simulatedMachineUpdateInterval: 1000,

  /** Auto-reset delay after completion (ms) */
  completionResetDelay: 15000,

  /** KixCleen Monitor Backend API base URL */
  apiBaseUrl: resolveHostUrl(process.env.EXPO_PUBLIC_MONITOR_API_URL, 3000, '/api'),

  /** Future MQTT broker URL for ESP32 */
  mqttBrokerUrl: 'ws://localhost:9001',

  /** Xendit Sandbox Configuration */
  xendit: {
    apiUrl: 'https://api.xendit.co',
    secretKey:
      process.env.EXPO_PUBLIC_XENDIT_SECRET_KEY || 'xnd_development_sample_shoeclean',
    publicKey:
      process.env.EXPO_PUBLIC_XENDIT_PUBLIC_KEY || 'xnd_public_development_sample_shoeclean',
    pollingIntervalMs: 3000,
    qrExpirySeconds: 300,
    sandboxMode: true,
  },
} as const;
