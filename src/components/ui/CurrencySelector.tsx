import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  TextInput,
  Keyboard,
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
  const [isSelecting, setIsSelecting] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

  // Reset everything when modal becomes invisible
  useEffect(() => {
    if (!isVisible) {
      setSearchQuery('');
      setIsSelecting(false);
    }
  }, [isVisible]);

  const closeModal = () => {
    Keyboard.dismiss();
    searchInputRef.current?.blur();
    setIsVisible(false);
  };

  const handleCurrencySelect = (currency: Currency) => {
    if (isSelecting) return;
    
    setIsSelecting(true);
    
    // First dismiss keyboard and close modal
    Keyboard.dismiss();
    searchInputRef.current?.blur();
    setIsVisible(false);
    
    // Then update currency after a brief delay
    setTimeout(() => {
      onCurrencyChange(currency);
    }, 50);
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
        style={styles.selector}
        onPress={() => setIsVisible(true)}
      >
        <View style={styles.currencyContent}>
          <Text style={styles.currencySymbol}>{selectedCurrency.symbol}</Text>
          <Text style={styles.currencyCode}>{selectedCurrency.code}</Text>
        </View>
        <Text style={styles.chevron}>▼</Text>
      </Pressable>

      <Modal
        visible={isVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
          <Pressable 
            style={styles.overlayPress} 
            onPress={closeModal}
          />
          <View style={styles.modal}>
            <View style={styles.header}>
              <Text style={styles.title}>Select Currency</Text>
            </View>
            
            <View style={styles.searchContainer}>
              <TextInput
                ref={searchInputRef}
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
                  style={[
                    styles.currencyItem,
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
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    minWidth: 100,
    height: 56,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingVertical: 0,
  },
  currencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  },
  chevron: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayPress: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    width: '80%',
    maxHeight: '70%',
    overflow: 'hidden',
    zIndex: 1,
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