/**
 * CHURCHOS™ Frontend Environment Configuration
 * Type-safe environment variable access for the sacred operating system
 */

// =============================================================================
// FIREBASE CONFIGURATION
// =============================================================================
export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
} as const;

// =============================================================================
// BACKEND API CONFIGURATION
// =============================================================================
export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8000';
export const BACKEND_API_URL_PROD = import.meta.env.VITE_BACKEND_API_URL_PROD || 'https://api.churchos.app';

// =============================================================================
// STRIPE CONFIGURATION
// =============================================================================
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
export const STRIPE_PUBLISHABLE_KEY_PROD = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_PROD;

// =============================================================================
// ANALYTICS CONFIGURATION
// =============================================================================
export const GOOGLE_ANALYTICS_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
export const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

// =============================================================================
// FEATURE FLAGS
// =============================================================================
export const FEATURE_FLAGS = {
  ENABLE_AI_CHARACTERS: import.meta.env.VITE_ENABLE_AI_CHARACTERS === 'true',
  ENABLE_LIVESTREAMING: import.meta.env.VITE_ENABLE_LIVESTREAMING === 'true',
  ENABLE_XR_HOLYLAND: import.meta.env.VITE_ENABLE_XR_HOLYLAND === 'true',
  ENABLE_MOBILE_CONTROL: import.meta.env.VITE_ENABLE_MOBILE_CONTROL === 'true',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_BILLING: import.meta.env.VITE_ENABLE_BILLING === 'true',
} as const;

// =============================================================================
// LOCALIZATION CONFIGURATION
// =============================================================================
export const DEFAULT_LOCALE = import.meta.env.VITE_DEFAULT_LOCALE || 'en';
export const SUPPORTED_LOCALES = (import.meta.env.VITE_SUPPORTED_LOCALES || 'en,de,fr,twi,hausa,yoruba,he,ar').split(',');

// =============================================================================
// ENVIRONMENT
// =============================================================================
export const NODE_ENV = import.meta.env.VITE_NODE_ENV || 'development';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Check if running in production environment
 */
export const isProduction = (): boolean => {
  return NODE_ENV === 'production';
};

/**
 * Check if running in development environment
 */
export const isDevelopment = (): boolean => {
  return NODE_ENV === 'development';
};

/**
 * Get the appropriate backend API URL based on environment
 */
export const getBackendApiUrl = (): string => {
  return isProduction() ? BACKEND_API_URL_PROD : BACKEND_API_URL;
};

/**
 * Get the appropriate Stripe publishable key based on environment
 */
export const getStripePublishableKey = (): string => {
  return isProduction() ? STRIPE_PUBLISHABLE_KEY_PROD : STRIPE_PUBLISHABLE_KEY;
};

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (feature: keyof typeof FEATURE_FLAGS): boolean => {
  return FEATURE_FLAGS[feature];
};

/**
 * Get supported locales as a typed array
 */
export const getSupportedLocales = (): string[] => {
  return SUPPORTED_LOCALES;
};

/**
 * Validate environment configuration
 */
export const validateEnvironment = (): void => {
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
  ];

  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);

  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};

/**
 * Environment configuration type
 */
export interface EnvironmentConfig {
  firebase: typeof FIREBASE_CONFIG;
  backend: {
    apiUrl: string;
    apiUrlProd: string;
  };
  stripe: {
    publishableKey: string;
    publishableKeyProd: string;
  };
  analytics: {
    googleAnalyticsId: string | undefined;
    mixpanelToken: string | undefined;
  };
  features: typeof FEATURE_FLAGS;
  localization: {
    defaultLocale: string;
    supportedLocales: string[];
  };
  environment: {
    nodeEnv: string;
    appVersion: string;
  };
}

/**
 * Get complete environment configuration
 */
export const getEnvironmentConfig = (): EnvironmentConfig => {
  return {
    firebase: FIREBASE_CONFIG,
    backend: {
      apiUrl: BACKEND_API_URL,
      apiUrlProd: BACKEND_API_URL_PROD,
    },
    stripe: {
      publishableKey: STRIPE_PUBLISHABLE_KEY,
      publishableKeyProd: STRIPE_PUBLISHABLE_KEY_PROD,
    },
    analytics: {
      googleAnalyticsId: GOOGLE_ANALYTICS_ID,
      mixpanelToken: MIXPANEL_TOKEN,
    },
    features: FEATURE_FLAGS,
    localization: {
      defaultLocale: DEFAULT_LOCALE,
      supportedLocales: SUPPORTED_LOCALES,
    },
    environment: {
      nodeEnv: NODE_ENV,
      appVersion: APP_VERSION,
    },
  };
};

// Validate environment on module load
if (typeof window !== 'undefined') {
  validateEnvironment();
} 