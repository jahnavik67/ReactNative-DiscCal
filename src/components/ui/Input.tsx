import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { theme } from '../../styles/theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  symbol?: string;
  symbolPosition?: 'left' | 'right';
  error?: string;
  onChangeText?: (text: string) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  symbol,
  symbolPosition = 'right',
  error,
  onChangeText,
  value,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, isFocused && styles.labelFocused]}>
        {label}
      </Text>
      
      <View style={styles.inputContainer}>
        {symbol && symbolPosition === 'left' && (
          <Text style={styles.symbolLeft}>{symbol}</Text>
        )}
        
        <View style={[
          styles.inputWrapper, 
          isFocused && styles.inputWrapperFocused,
          error && styles.inputWrapperError
        ]}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={theme.colors.textSecondary}
            {...props}
          />
        </View>
        
        {symbol && symbolPosition === 'right' && (
          <Text style={styles.symbolRight}>{symbol}</Text>
        )}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing.xs,
    color: theme.colors.textSecondary,
    transition: 'color 0.2s ease',
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
  },
  inputWrapperFocused: {
    borderColor: theme.colors.borderFocus,
    shadowOpacity: 0.2,
  },
  inputWrapperError: {
    borderColor: theme.colors.error,
  },
  input: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
    textAlign: 'right',
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
  errorText: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
  },
});