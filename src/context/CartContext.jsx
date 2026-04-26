import { createContext, useContext, useState, useEffect } from 'react';
import API from '../utils/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) return setCartItems([]);
    try {
      const { data } = await API.get('/api/cart');
      setCartItems(data.items || []);
    } catch {}
  };

  useEffect(() => { fetchCart(); }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    const { data } = await API.post('/api/cart', { productId, quantity });
    setCartItems(data.items);
  };

  const updateItem = async (productId, quantity) => {
    const { data } = await API.put(`/api/cart/${productId}`, { quantity });
    setCartItems(data.items);
  };

  const removeItem = async (productId) => {
    const { data } = await API.delete(`/api/cart/${productId}`);
    setCartItems(data.items);
  };

  const clearCart = async () => {
    await API.delete('/api/cart');
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, updateItem, removeItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
