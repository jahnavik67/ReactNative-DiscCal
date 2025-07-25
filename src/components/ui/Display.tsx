import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { theme } from '../../styles/theme';
import { formatCurrency } from '../../utils/discountCalculator';
import { Currency } from '../../types/calculator';

interface DisplayProps {
  label: string;
  amount: number;
  isCalculating?: boolean;
  showCurrency?: boolean;
  currency?: Currency;
}

export const Display: React.FC<DisplayProps> = ({
  label,
  amount,
  isCalculating = false,
  showCurrency = true,
  currency = { code: 'USD', symbol: '$', name: 'US Dollar' },
}) => {
  const displayValue = isCalculating 
    ? 'Calculating...' 
    : showCurrency 
      ? formatCurrency(amount, currency.code) 
      : amount.toFixed(2);

  return (
    <View style={[
      styles.container, 
      amount > 0 && !isCalculating && styles.containerHighlighted
    ]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.amount, isCalculating && styles.calculatingText]}>
        {displayValue}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: 'relative',
  },
  label: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  amount: {
    fontSize: theme.typography.fontSize.xxlarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  calculatingText: {
    color: theme.colors.primary,
  },
  containerHighlighted: {
    borderColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
    backgroundColor: 'rgba(42, 42, 42, 0.95)',
  },
});