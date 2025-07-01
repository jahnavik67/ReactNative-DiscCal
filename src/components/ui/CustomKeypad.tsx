import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
} from 'react-native';
import { theme } from '../../styles/theme';

interface CustomKeypadProps {
  visible: boolean;
  onClose: () => void;
  onKeyPress: (key: string) => void;
  allowDecimal?: boolean;
}

const { width } = Dimensions.get('window');

export const CustomKeypad: React.FC<CustomKeypadProps> = ({
  visible,
  onClose,
  onKeyPress,
  allowDecimal = true,
}) => {
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    [allowDecimal ? '.' : '', '0', 'backspace'],
  ];

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      onKeyPress('backspace');
    } else if (key !== '') {
      onKeyPress(key);
    }
  };

  const renderKey = (key: string, index: number) => {
    if (key === '') return <View key={index} style={styles.emptyKey} />;

    const isBackspace = key === 'backspace';
    const isZero = key === '0';

    return (
      <Pressable
        key={index}
        style={({ pressed }) => [
          styles.key,
          isZero && styles.zeroKey,
          isBackspace && styles.backspaceKey,
          pressed && styles.keyPressed,
        ]}
        onPress={() => handleKeyPress(key)}
      >
        <Text style={[
          styles.keyText,
          isBackspace && styles.backspaceText,
        ]}>
          {isBackspace ? '⌫' : key}
        </Text>
      </Pressable>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Enter Number</Text>
            <Pressable style={styles.doneButton} onPress={onClose}>
              <Text style={styles.doneText}>Done</Text>
            </Pressable>
          </View>
          
          <View style={styles.keypad}>
            {keys.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((key, keyIndex) => renderKey(key, keyIndex))}
              </View>
            ))}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  doneButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
  },
  doneText: {
    color: theme.colors.textOnPrimary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  keypad: {
    padding: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  key: {
    flex: 1,
    height: 60,
    backgroundColor: theme.colors.background,
    marginHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  emptyKey: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  zeroKey: {
    flex: 1,
  },
  backspaceKey: {
    backgroundColor: theme.colors.error,
  },
  keyPressed: {
    backgroundColor: theme.colors.primary,
    transform: [{ scale: 0.95 }],
  },
  keyText: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  backspaceText: {
    color: theme.colors.textOnPrimary,
    fontSize: theme.typography.fontSize.large,
  },
});