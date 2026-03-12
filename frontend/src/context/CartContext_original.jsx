import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI, generateSessionId } from '../api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');

  // Initialize session ID
  useEffect(() => {
    let existingSessionId = localStorage.getItem('cart_session_id');
    if (!existingSessionId) {
      existingSessionId = generateSessionId();
      localStorage.setItem('cart_session_id', existingSessionId);
    }
    setSessionId(existingSessionId);
  }, []);

  // Load cart items from backend
  useEffect(() => {
    const loadCart = async () => {
      if (!sessionId) return;
      
      try {
        setLoading(true);
        const data = await cartAPI.get(sessionId);
        setCartItems(data.items || []);
        setCartCount(data.items?.length || 0);
        setCartTotal(data.total || 0);
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [sessionId]);

  // Add item to cart
  const addToCart = async (productId, name, price, image_url, quantity = 1) => {
    try {
      setLoading(true);
      const response = await cartAPI.add(sessionId, productId, quantity);
      
      // Update local state
      const newItem = {
        id: response.id,
        product_id: productId,
        name,
        price,
        image_url,
        quantity
      };
      
      setCartItems(prev => {
        const existingItem = prev.find(item => item.product_id === productId);
        if (existingItem) {
          return prev.map(item => 
            item.product_id === productId 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prev, newItem];
        }
      });
      
      setCartCount(prev => prev + 1);
      setCartTotal(prev => prev + (parseFloat(price) * quantity));
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateCartItem = async (cartItemId, quantity) => {
    try {
      setLoading(true);
      await cartAPI.update(cartItemId, quantity);
      
      setCartItems(prev => 
        prev.map(item => 
          item.id === cartItemId 
            ? { ...item, quantity }
            : item
        )
      );
      
      // Recalculate total
      const newTotal = prev.reduce((sum, item) => {
        if (item.id === cartItemId) {
          return sum + (parseFloat(item.price) * quantity);
        }
        return sum + (parseFloat(item.price) * item.quantity);
      }, 0);
      
      setCartTotal(newTotal);
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartItemId) => {
    try {
      setLoading(true);
      await cartAPI.remove(cartItemId);
      
      setCartItems(prev => {
        const item = prev.find(item => item.id === cartItemId);
        const newTotal = cartTotal - (parseFloat(item.price) * item.quantity);
        setCartTotal(newTotal);
        setCartCount(prev => prev - 1);
        return prev.filter(item => item.id !== cartItemId);
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    setCartTotal(0);
  };

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    sessionId,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
