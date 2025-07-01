export interface CalculatorState {
  originalAmount: string;
  discountPercent: string;
  additionalDiscountPercent: string;
  finalAmount: number;
  isCalculating: boolean;
}

export interface CalculatorActions {
  setOriginalAmount: (amount: string) => void;
  setDiscountPercent: (percent: string) => void;
  setAdditionalDiscountPercent: (percent: string) => void;
  calculate: () => void;
  clear: () => void;
}

export type CalculatorContextType = CalculatorState & CalculatorActions;