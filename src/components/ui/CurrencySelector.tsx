import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import { theme } from '../../styles/theme';
import { Currency } from '../../types/calculator';

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const POPULAR_CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
];

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCurrencySelect = (currency: Currency) => {
    onCurrencyChange(currency);
    setIsVisible(false);
    setSearchQuery(''); // Clear search when closing
  };

  const handleModalClose = () => {
    setIsVisible(false);
    setSearchQuery(''); // Clear search when closing
  };

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery) return POPULAR_CURRENCIES;
    
    return POPULAR_CURRENCIES.filter(currency =>
      currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.selector,
          pressed && styles.selectorPressed,
        ]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.currencySymbol}>{selectedCurrency.symbol}</Text>
        <Text style={styles.currencyCode}>{selectedCurrency.code}</Text>
        <Text style={styles.chevron}>⌄</Text>
      </Pressable>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <Pressable style={styles.overlay} onPress={handleModalClose}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <Text style={styles.title}>Select Currency</Text>
            </View>
            
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search currencies..."
                placeholderTextColor={theme.colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.searchIcon}>🔍</Text>
            </View>
            
            <ScrollView style={styles.currencyList} showsVerticalScrollIndicator={false}>
              {filteredCurrencies.map((currency) => (
                <Pressable
                  key={currency.code}
                  style={({ pressed }) => [
                    styles.currencyItem,
                    pressed && styles.currencyItemPressed,
                    currency.code === selectedCurrency.code && styles.currencyItemSelected,
                  ]}
                  onPress={() => handleCurrencySelect(currency)}
                >
                  <Text style={styles.currencySymbolLarge}>{currency.symbol}</Text>
                  <View style={styles.currencyInfo}>
                    <Text style={styles.currencyName}>{currency.name}</Text>
                    <Text style={styles.currencyCodeSmall}>{currency.code}</Text>
                  </View>
                  {currency.code === selectedCurrency.code && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    minWidth: 80,
    minHeight: 56,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectorPressed: {
    backgroundColor: theme.colors.background,
  },
  currencySymbol: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginRight: theme.spacing.xs,
  },
  currencyCode: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.xs,
  },
  chevron: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    width: '80%',
    maxHeight: '70%',
    overflow: 'hidden',
  },
  header: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
    paddingVertical: theme.spacing.xs,
  },
  searchIcon: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  currencyList: {
    maxHeight: 400,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  currencyItemPressed: {
    backgroundColor: theme.colors.background,
  },
  currencyItemSelected: {
    backgroundColor: `${theme.colors.primary}10`,
  },
  currencySymbolLarge: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    width: 40,
    textAlign: 'center',
  },
  currencyInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  currencyName: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
  },
  currencyCodeSmall: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  checkmark: {
    fontSize: theme.typography.fontSize.large,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
});