import { createContext, useState, useEffect, useContext } from 'react';
import {
  getCart as getCartApi,
  addToCart as addToCartApi,
  updateCartItem,
  deleteCartItem
} from '../api';

export const CartContext = createContext();

const SESSION_KEY = 'session_id';

function getOrCreateSessionId() {
  if (typeof window === 'undefined') return null;
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = (crypto.randomUUID && crypto.randomUUID()) ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId] = useState(() => getOrCreateSessionId());

  useEffect(() => {
    async function loadCart() {
      if (!sessionId) return;
      try {
        setLoading(true);
        setError(null);
        const res = await getCartApi(sessionId);
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error('Failed to load cart', err);
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    }
    loadCart();
  }, [sessionId]);

  const addToCart = async (product, quantity = 1) => {
    if (!sessionId) return;
    try {
      const res = await addToCartApi({
        session_id: sessionId,
        product_id: product.id,
        quantity
      });
      const newItem = res.data;
      setCartItems(prev => {
        const exists = prev.find(item => item.id === newItem.id);
        if (exists) {
          return prev.map(item =>
            item.id === newItem.id ? { ...item, ...newItem } : item
          );
        }
        return [...prev, newItem];
      });
    } catch (err) {
      console.error('Failed to add to cart', err);
      setError('Failed to add item to cart');
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
    } catch (err) {
      console.error('Failed to remove from cart', err);
      setError('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
      return;
    }
    try {
      const res = await updateCartItem(cartItemId, quantity);
      const updated = res.data;
      setCartItems(prev =>
        prev.map(item => item.id === updated.id ? { ...item, ...updated } : item)
      );
    } catch (err) {
      console.error('Failed to update cart item', err);
      setError('Failed to update item quantity');
    }
  };

  const clearCart = async () => {
    try {
      // remove each item from backend
      await Promise.all(
        cartItems.map(item => deleteCartItem(item.id))
      );
      setCartItems([]);
    } catch (err) {
      console.error('Failed to clear cart', err);
      setError('Failed to clear cart');
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      loading,
      error
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
