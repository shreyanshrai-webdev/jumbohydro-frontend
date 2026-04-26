export const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' }
];

export const getCurrencySymbol = (code) => {
  return CURRENCIES.find(c => c.code === code)?.symbol || '₹';
};

export const formatPrice = (price, currencyCode) => {
  const symbol = getCurrencySymbol(currencyCode);
  return `${symbol}${Number(price).toFixed(2)}`;
};
