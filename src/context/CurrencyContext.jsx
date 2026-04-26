import { createContext, useContext, useState } from 'react';
import { CURRENCIES, getCurrencySymbol, formatPrice } from '../utils/currency';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(
    localStorage.getItem('currency') || 'INR'
  );

  const changeCurrency = (code) => {
    setCurrency(code);
    localStorage.setItem('currency', code);
  };

  const getPrice = (priceObj) => priceObj?.[currency] || priceObj?.INR || 0;

  const format = (priceObj) => formatPrice(getPrice(priceObj), currency);

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, CURRENCIES, getCurrencySymbol, getPrice, format }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
