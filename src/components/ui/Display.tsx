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
    marginVertical: theme.spacing.md,
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});