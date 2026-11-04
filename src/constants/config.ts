/**
 * App-wide configuration.
 * Environment-specific settings and feature flags.
 */

export const AppConfig = {
  /** App display name */
  appName: 'KixCleen',

  /** Whether to use simulated services (true during development) */
  useSimulation: true,

  /** Simulated payment processing delay (ms) */
  simulatedPaymentDelay: 2500,

  /** Simulated machine update interval (ms) */
  simulatedMachineUpdateInterval: 1000,

  /** Auto-reset delay after completion (ms) */
  completionResetDelay: 15000,

  /** Future backend API base URL */
  apiBaseUrl: 'http://localhost:3000/api',

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
