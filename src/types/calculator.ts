export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface CalculatorState {
  originalAmount: string;
  discountPercent: string;
  additionalDiscountPercent: string;
  finalAmount: number;
  isCalculating: boolean;
  selectedCurrency: Currency;
}

export interface CalculatorActions {
  setOriginalAmount: (amount: string) => void;
  setDiscountPercent: (percent: string) => void;
  setAdditionalDiscountPercent: (percent: string) => void;
  setSelectedCurrency: (currency: Currency) => void;
  calculate: () => void;
  clear: () => void;
}

export type CalculatorContextType = CalculatorState & CalculatorActions;