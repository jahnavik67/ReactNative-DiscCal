import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { theme } from '../../styles/theme';
import { CustomKeypad } from './CustomKeypad';

interface CustomInputProps {
  label: string;
  symbol?: string;
  symbolPosition?: 'left' | 'right';
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  allowDecimal?: boolean;
  onFocus?: () => void;
  maxValue?: number;
  isPercentage?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  symbol,
  symbolPosition = 'right',
  value,
  onChangeText,
  placeholder = '0',
  allowDecimal = true,
  onFocus,
  maxValue,
  isPercentage = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);

  const handlePress = () => {
    setIsFocused(true);
    setShowKeypad(true);
    onFocus?.();
  };

  const handleKeypadClose = () => {
    setIsFocused(false);
    setShowKeypad(false);
  };

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      onChangeText(value.slice(0, -1));
    } else if (key === '.' && allowDecimal) {
      // Only allow one decimal point
      if (!value.includes('.')) {
        const newValue = value + key;
        // Check if adding decimal point would exceed maxValue
        if (isPercentage && maxValue) {
          const numericValue = parseFloat(newValue);
          if (!isNaN(numericValue) && numericValue > maxValue) {
            return;
          }
        }
        onChangeText(newValue);
      }
    } else if (key !== '.') {
      const newValue = value + key;
      
      // Validate percentage inputs
      if (isPercentage && maxValue) {
        const numericValue = parseFloat(newValue);
        if (!isNaN(numericValue) && numericValue > maxValue) {
          return; // Don't allow input that exceeds maxValue
        }
        
        // Also check if the new value would have more than 2 decimal places for percentages
        if (newValue.includes('.')) {
          const decimalPart = newValue.split('.')[1];
          if (decimalPart && decimalPart.length > 2) {
            return; // Don't allow more than 2 decimal places
          }
        }
      }
      
      onChangeText(newValue);
    }
  };

  const displayValue = value || placeholder;

  return (
<<<<<<< HEAD
    <View style={[styles.container, !label && styles.containerNoLabel]}>
      {label && (
        <Text style={[styles.label, isFocused && styles.labelFocused]}>
          {label}
        </Text>
      )}
=======
    <View style={styles.container}>
      <Text style={[styles.label, isFocused && styles.labelFocused]}>
        {label}
      </Text>
>>>>>>> d5536153b4499965b369840a4b696b265758f322
      
      <View style={styles.inputContainer}>
        {symbol && symbolPosition === 'left' && (
          <Text style={styles.symbolLeft}>{symbol}</Text>
        )}
        
        <Pressable
          style={[
            styles.inputWrapper, 
            isFocused && styles.inputWrapperFocused,
          ]}
          onPress={handlePress}
        >
          <Text style={[
            styles.inputText,
            !value && styles.placeholderText,
          ]}>
            {displayValue}
          </Text>
        </Pressable>
        
        {symbol && symbolPosition === 'right' && (
          <Text style={styles.symbolRight}>{symbol}</Text>
        )}
      </View>

      <CustomKeypad
        visible={showKeypad}
        onClose={handleKeypadClose}
        onKeyPress={handleKeyPress}
        allowDecimal={allowDecimal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
<<<<<<< HEAD
  containerNoLabel: {
    marginBottom: 0,
  },
=======
>>>>>>> d5536153b4499965b369840a4b696b265758f322
  label: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing.xs,
    color: theme.colors.textSecondary,
  },
  labelFocused: {
    color: theme.colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 2,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingHorizontal: theme.spacing.md,
<<<<<<< HEAD
    paddingVertical: 0,
    height: 56,
=======
    paddingVertical: theme.spacing.md,
    minHeight: 56,
>>>>>>> d5536153b4499965b369840a4b696b265758f322
    justifyContent: 'center',
  },
  inputWrapperFocused: {
    borderColor: theme.colors.borderFocus,
    shadowOpacity: 0.2,
  },
  inputText: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
    textAlign: 'right',
  },
  placeholderText: {
    color: theme.colors.textSecondary,
  },
  symbolLeft: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary,
    paddingHorizontal: theme.spacing.xs,
  },
  symbolRight: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary,
    paddingHorizontal: theme.spacing.xs,
  },
});