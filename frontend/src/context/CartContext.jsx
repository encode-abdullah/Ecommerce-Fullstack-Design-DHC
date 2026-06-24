import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { fetchCart, addToCart, updateCart, removeFromCart, clearCart, fetchProductById } from '../api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const loadServerCart = useCallback(async () => {
    setCartLoading(true);
    try {
      const cart = await fetchCart();
      setCartItems(cart.items || []);
    } catch (error) {
      console.error('Failed to load cart:', error);
      setCartItems([]);
    }
    setCartLoading(false);
  }, []);

  const loadLocalCart = useCallback(async () => {
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (localCart.length === 0) {
      setCartItems([]);
      return;
    }
    const enriched = await Promise.all(
      localCart.map(async (item) => {
        try {
          const product = await fetchProductById(item.productId);
          return { product, quantity: item.quantity };
        } catch {
          return null;
        }
      })
    );
    setCartItems(enriched.filter(Boolean));
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadServerCart();
    } else {
      loadLocalCart();
    }
  }, [isAuthenticated, user, loadServerCart, loadLocalCart]);

  const syncLocalCartToServer = async () => {
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    for (const item of localCart) {
      try {
        await addToCart(item.productId, item.quantity);
      } catch (e) {
        console.error('Failed to sync item:', e);
      }
    }
    localStorage.removeItem('cart');
    await loadServerCart();
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
      await loadLocalCart();
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
        await loadLocalCart();
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
      await loadLocalCart();
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
        refreshCart: isAuthenticated ? loadServerCart : loadLocalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
