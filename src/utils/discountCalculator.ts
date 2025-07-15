export const calculateDiscount = (
  originalAmount: number,
  discountPercent: number,
  additionalDiscountPercent?: number
): number => {
  if (originalAmount <= 0) return 0;
  
  // Ensure discount percentages don't exceed 100%
  const clampedDiscountPercent = Math.min(discountPercent, 100);
  
  // Apply first discount
  const afterFirstDiscount = originalAmount * (1 - clampedDiscountPercent / 100);
  
  // Apply additional discount if provided
  if (additionalDiscountPercent && additionalDiscountPercent > 0) {
    const clampedAdditionalDiscount = Math.min(additionalDiscountPercent, 100);
    return afterFirstDiscount * (1 - clampedAdditionalDiscount / 100);
  }
  
  return afterFirstDiscount;
};

export const formatCurrency = (amount: number, currencyCode: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const parseNumberInput = (input: string): number => {
  const cleaned = input.replace(/[^\d.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

export const validatePercentage = (percent: number): boolean => {
  return percent >= 0 && percent <= 100;
};

export const getSavingsAmount = (
  originalAmount: number,
  finalAmount: number
): number => {
  return originalAmount - finalAmount;
};

export const getSavingsPercentage = (
  originalAmount: number,
  finalAmount: number
): number => {
  if (originalAmount <= 0) return 0;
  return ((originalAmount - finalAmount) / originalAmount) * 100;
};