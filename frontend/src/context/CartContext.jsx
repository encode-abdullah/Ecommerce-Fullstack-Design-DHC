import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { fetchCart, addToCart, updateCart, removeFromCart, clearCart } from '../api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated) {
        setCartLoading(true);
        try {
          const cart = await fetchCart();
          setCartItems(cart.items || []);
        } catch (error) {
          console.error('Failed to load cart:', error);
          setCartItems([]);
        }
        setCartLoading(false);
      } else {
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(localCart);
      }
    };

    loadCart();
  }, [isAuthenticated, user]);

  const syncLocalCartToServer = async () => {
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    for (const item of localCart) {
      await addToCart(item.productId, item.quantity);
    }
    localStorage.removeItem('cart');
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    if (isAuthenticated) {
      const cart = await addToCart(productId, quantity);
      setCartItems(cart.items || []);
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = localCart.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        localCart.push({ productId, quantity });
      }
      localStorage.setItem('cart', JSON.stringify(localCart));
      setCartItems(localCart);
    }
  };

  const handleUpdateCart = async (productId, quantity) => {
    if (isAuthenticated) {
      const cart = await updateCart(productId, quantity);
      setCartItems(cart.items || []);
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const item = localCart.find((i) => i.productId === productId);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(localCart));
        setCartItems(localCart);
      }
    }
  };

  const handleRemoveFromCart = async (productId) => {
    if (isAuthenticated) {
      const cart = await removeFromCart(productId);
      setCartItems(cart.items || []);
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const filtered = localCart.filter((item) => item.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(filtered));
      setCartItems(filtered);
    }
  };

  const handleClearCart = async () => {
    if (isAuthenticated) {
      await clearCart();
    } else {
      localStorage.removeItem('cart');
    }
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartLoading,
        cartTotal,
        addToCart: handleAddToCart,
        updateCart: handleUpdateCart,
        removeFromCart: handleRemoveFromCart,
        clearCart: handleClearCart,
        syncLocalCartToServer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);