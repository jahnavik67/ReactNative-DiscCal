import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Text,
} from 'react-native';
import { CustomInput } from '../ui/CustomInput';
import { Button } from '../ui/Button';
import { Display } from '../ui/Display';
import { useDiscountCalculator } from '../../hooks/useDiscountCalculator';
import { theme } from '../../styles/theme';

export const DiscountCalculatorScreen: React.FC = () => {
  const {
    originalAmount,
    discountPercent,
    additionalDiscountPercent,
    finalAmount,
    isCalculating,
    setOriginalAmount,
    setDiscountPercent,
    setAdditionalDiscountPercent,
    calculate,
    clear,
  } = useDiscountCalculator();

  const handleCalculate = () => {
    if (originalAmount && discountPercent) {
      calculate();
    }
  };

  const isCalculateDisabled = !originalAmount || !discountPercent || isCalculating;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Discount Calculator</Text>
          <Text style={styles.subtitle}>Calculate your savings with ease</Text>
        </View>

        <View style={styles.inputSection}>
          <CustomInput
            label="Original Amount"
            symbol="$"
            symbolPosition="right"
            value={originalAmount}
            onChangeText={setOriginalAmount}
            placeholder="0.00"
            allowDecimal={true}
          />

          <CustomInput
            label="Discount Percentage"
            symbol="%"
            symbolPosition="right"
            value={discountPercent}
            onChangeText={setDiscountPercent}
            placeholder="0"
            allowDecimal={true}
          />

          <CustomInput
            label="Additional Discount (Optional)"
            symbol="%"
            symbolPosition="right"
            value={additionalDiscountPercent}
            onChangeText={setAdditionalDiscountPercent}
            placeholder="0"
            allowDecimal={true}
          />
        </View>

        <Display
          label="Final Amount"
          amount={finalAmount}
          isCalculating={isCalculating}
          showCurrency={true}
        />

        {finalAmount > 0 && !isCalculating && (
          <View style={styles.savingsInfo}>
            <Text style={styles.savingsText}>
              You save: {(parseFloat(originalAmount) - finalAmount).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </Text>
            <Text style={styles.savingsPercentage}>
              ({(((parseFloat(originalAmount) - finalAmount) / parseFloat(originalAmount)) * 100).toFixed(1)}% off)
            </Text>
          </View>
        )}

        <View style={styles.buttonSection}>
          <Button
            title="Calculate"
            onPress={handleCalculate}
            disabled={isCalculateDisabled}
            loading={isCalculating}
            size="large"
            style={styles.calculateButton}
          />

          <Button
            title="Clear All"
            onPress={clear}
            variant="outline"
            size="medium"
            style={styles.clearButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize.xxlarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: theme.spacing.lg,
  },
  savingsInfo: {
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: `${theme.colors.success}20`,
    borderRadius: theme.borderRadius.medium,
    marginVertical: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.success,
  },
  savingsText: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.success,
    marginBottom: theme.spacing.xs,
  },
  savingsPercentage: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.success,
  },
  buttonSection: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  calculateButton: {
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  clearButton: {
    marginTop: theme.spacing.sm,
  },
});