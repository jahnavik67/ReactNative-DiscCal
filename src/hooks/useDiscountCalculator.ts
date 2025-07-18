import { useState, useCallback } from 'react';
import { CalculatorState, CalculatorActions, Currency } from '../types/calculator';
import { 
  calculateDiscount, 
  parseNumberInput, 
  validatePercentage 
} from '../utils/discountCalculator';

const initialState: CalculatorState = {
  originalAmount: '',
  discountPercent: '',
  additionalDiscountPercent: '',
  finalAmount: 0,
  isCalculating: false,
  selectedCurrency: { code: 'USD', symbol: '$', name: 'US Dollar' },
};

export const useDiscountCalculator = (): CalculatorState & CalculatorActions => {
  const [state, setState] = useState<CalculatorState>(initialState);

  const setOriginalAmount = useCallback((amount: string) => {
    setState(prev => ({ ...prev, originalAmount: amount }));
  }, []);

  const setDiscountPercent = useCallback((percent: string) => {
    setState(prev => ({ ...prev, discountPercent: percent }));
  }, []);

  const setAdditionalDiscountPercent = useCallback((percent: string) => {
    setState(prev => ({ ...prev, additionalDiscountPercent: percent }));
  }, []);

  const setSelectedCurrency = useCallback((currency: Currency) => {
    setState(prev => ({ ...prev, selectedCurrency: currency }));
  }, []);

  const calculate = useCallback(() => {
    setState(prev => ({ ...prev, isCalculating: true }));

    setTimeout(() => {
      setState(prev => {
        try {
          const originalAmount = parseNumberInput(prev.originalAmount);
          const discountPercent = parseNumberInput(prev.discountPercent);
          const additionalDiscountPercent = parseNumberInput(prev.additionalDiscountPercent);

          // Validate inputs
          if (originalAmount <= 0) {
            throw new Error('Original amount must be greater than 0');
          }

          if (!validatePercentage(discountPercent)) {
            throw new Error('Discount percentage must be between 0 and 100');
          }

          if (additionalDiscountPercent > 0 && !validatePercentage(additionalDiscountPercent)) {
            throw new Error('Additional discount percentage must be between 0 and 100');
          }

          // Calculate final amount
          const finalAmount = calculateDiscount(
            originalAmount,
            discountPercent,
            additionalDiscountPercent > 0 ? additionalDiscountPercent : undefined
          );

          return {
            ...prev,
            finalAmount,
            isCalculating: false,
          };
        } catch (error) {
          // Don't show error in console for better user experience
          // The validation will prevent most errors from occurring
          return {
            ...prev,
            finalAmount: 0,
            isCalculating: false,
          };
        }
      });
    }, 500);
  }, []);

  const clear = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    setOriginalAmount,
    setDiscountPercent,
    setAdditionalDiscountPercent,
    setSelectedCurrency,
    calculate,
    clear,
  };
};