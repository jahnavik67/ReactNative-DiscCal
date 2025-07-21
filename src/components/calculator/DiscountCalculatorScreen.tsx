import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  Platform,
<<<<<<< HEAD
  Dimensions,
=======
>>>>>>> d5536153b4499965b369840a4b696b265758f322
} from 'react-native';
import { CustomInput } from '../ui/CustomInput';
import { Button } from '../ui/Button';
import { Display } from '../ui/Display';
import { CurrencySelector } from '../ui/CurrencySelector';
import { useDiscountCalculator } from '../../hooks/useDiscountCalculator';
import { formatCurrency } from '../../utils/discountCalculator';
import { theme } from '../../styles/theme';

export const DiscountCalculatorScreen: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const originalAmountRef = useRef<View>(null);
  const discountPercentRef = useRef<View>(null);
  const additionalDiscountRef = useRef<View>(null);
  
  const {
    originalAmount,
    discountPercent,
    additionalDiscountPercent,
    finalAmount,
    isCalculating,
    selectedCurrency,
    setOriginalAmount,
    setDiscountPercent,
    setAdditionalDiscountPercent,
    setSelectedCurrency,
    calculate,
    clear,
  } = useDiscountCalculator();

  const handleCalculate = () => {
    if (originalAmount && discountPercent) {
      calculate();
    }
  };

  const handleInputFocus = (scrollPosition: number) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: scrollPosition,
        animated: true,
      });
    }, 300);
  };

  const handleOriginalAmountFocus = () => {
    handleInputFocus(0); // Stay at top for first input
  };

  const handleDiscountPercentFocus = () => {
    handleInputFocus(120); // Scroll enough for second input to be fully visible
  };

  const handleAdditionalDiscountFocus = () => {
    handleInputFocus(320); // Scroll more for third input to push it well above keyboard
  };

  const isCalculateDisabled = !originalAmount || !discountPercent || isCalculating;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
<<<<<<< HEAD
          showsVerticalScrollIndicator={true}
          alwaysBounceVertical={true}
        >
        <View style={styles.mainContent}>
          <View style={styles.header}>
=======
          showsVerticalScrollIndicator={false}
        >
        <View style={styles.header}>
>>>>>>> d5536153b4499965b369840a4b696b265758f322
          <Text style={styles.title}>Discount Calculator</Text>
          <Text style={styles.subtitle}>Calculate your savings with ease</Text>
        </View>

        <View style={styles.inputSection}>
          <View ref={originalAmountRef}>
            <View style={styles.originalAmountContainer}>
              <Text style={styles.inputLabel}>Original Amount</Text>
              <View style={styles.amountInputRow}>
<<<<<<< HEAD
                <View style={styles.currencyWrapper}>
                  <CurrencySelector
                    selectedCurrency={selectedCurrency}
                    onCurrencyChange={setSelectedCurrency}
                  />
                </View>
=======
                <CurrencySelector
                  selectedCurrency={selectedCurrency}
                  onCurrencyChange={setSelectedCurrency}
                />
>>>>>>> d5536153b4499965b369840a4b696b265758f322
                <View style={styles.amountInputWrapper}>
                  <CustomInput
                    label=""
                    symbol={selectedCurrency.symbol}
                    symbolPosition="right"
                    value={originalAmount}
                    onChangeText={setOriginalAmount}
                    placeholder="0.00"
                    allowDecimal={true}
                    onFocus={handleOriginalAmountFocus}
                  />
                </View>
              </View>
            </View>
          </View>

          <View ref={discountPercentRef}>
            <CustomInput
              label="Discount Percentage"
              symbol="%"
              symbolPosition="right"
              value={discountPercent}
              onChangeText={setDiscountPercent}
              placeholder="0"
              allowDecimal={true}
              onFocus={handleDiscountPercentFocus}
              isPercentage={true}
              maxValue={100}
            />
          </View>

          <View ref={additionalDiscountRef}>
            <CustomInput
              label="Additional Discount (Optional)"
              symbol="%"
              symbolPosition="right"
              value={additionalDiscountPercent}
              onChangeText={setAdditionalDiscountPercent}
              placeholder="0"
              allowDecimal={true}
              onFocus={handleAdditionalDiscountFocus}
              isPercentage={true}
              maxValue={100}
            />
          </View>
        </View>

<<<<<<< HEAD
          <Display
=======
        <Display
>>>>>>> d5536153b4499965b369840a4b696b265758f322
          label="Final Amount"
          amount={finalAmount}
          isCalculating={isCalculating}
          showCurrency={true}
          currency={selectedCurrency}
        />

        {finalAmount > 0 && !isCalculating && (
          <View style={styles.savingsInfo}>
            <Text style={styles.savingsText}>
              You save: {formatCurrency(parseFloat(originalAmount) - finalAmount, selectedCurrency.code)}
            </Text>
            <Text style={styles.savingsPercentage}>
              ({(((parseFloat(originalAmount) - finalAmount) / parseFloat(originalAmount)) * 100).toFixed(1)}% off)
            </Text>
          </View>
        )}
<<<<<<< HEAD
        </View>
=======
>>>>>>> d5536153b4499965b369840a4b696b265758f322

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
<<<<<<< HEAD
    minHeight: Dimensions.get('window').height * 0.9,
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
=======
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
>>>>>>> d5536153b4499965b369840a4b696b265758f322
  },
  title: {
    fontSize: theme.typography.fontSize.xxlarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
<<<<<<< HEAD
    textShadowColor: 'rgba(168, 85, 247, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
=======
>>>>>>> d5536153b4499965b369840a4b696b265758f322
  },
  subtitle: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  inputSection: {
<<<<<<< HEAD
    marginBottom: theme.spacing.md,
    backgroundColor: 'rgba(42, 42, 42, 0.8)',
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.lg,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
=======
    marginBottom: theme.spacing.lg,
>>>>>>> d5536153b4499965b369840a4b696b265758f322
  },
  originalAmountContainer: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing.xs,
    color: theme.colors.textSecondary,
  },
  amountInputRow: {
    flexDirection: 'row',
<<<<<<< HEAD
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  currencyWrapper: {
    alignSelf: 'stretch',
  },
  amountInputWrapper: {
    flex: 1,
    alignSelf: 'stretch',
=======
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  amountInputWrapper: {
    flex: 1,
>>>>>>> d5536153b4499965b369840a4b696b265758f322
  },
  savingsInfo: {
    alignItems: 'center',
    padding: theme.spacing.md,
<<<<<<< HEAD
    backgroundColor: `${theme.colors.success}15`,
    borderRadius: theme.borderRadius.large,
    marginVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: `${theme.colors.success}60`,
=======
    backgroundColor: `${theme.colors.success}20`,
    borderRadius: theme.borderRadius.medium,
    marginVertical: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.success,
>>>>>>> d5536153b4499965b369840a4b696b265758f322
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
<<<<<<< HEAD
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.xs,
    paddingTop: theme.spacing.md,
=======
    marginTop: theme.spacing.lg,
>>>>>>> d5536153b4499965b369840a4b696b265758f322
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