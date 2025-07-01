import { Theme } from '../types/theme';

export const darkTheme: Theme = {
  colors: {
    primary: '#A855F7',        // Purple-500
    primaryLight: '#C084FC',   // Purple-400
    primaryDark: '#7C3AED',    // Purple-600
    secondary: '#DDD6FE',      // Purple-200
    secondaryLight: '#EDE9FE', // Purple-100
    background: '#1A1A1A',     // Dark gray
    surface: '#2A2A2A',        // Lighter dark gray
    surfaceVariant: '#3A3A3A', // Even lighter dark gray
    text: '#F3F4F6',           // Light gray
    textSecondary: '#9CA3AF',  // Medium gray
    textOnPrimary: '#FFFFFF',  // White
    border: '#4B5563',         // Gray-600
    borderFocus: '#A855F7',    // Purple-500
    shadow: '#000000',         // Black
    error: '#EF4444',          // Red-500
    success: '#10B981',        // Emerald-500
    warning: '#F59E0B',        // Amber-500
  },
  typography: {
    fontFamily: 'System',
    fontSize: {
      small: 12,
      medium: 16,
      large: 20,
      xlarge: 28,
      xxlarge: 36,
    },
    fontWeight: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      small: 16,
      medium: 24,
      large: 32,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    xlarge: 16,
  },
};

export const theme = darkTheme;