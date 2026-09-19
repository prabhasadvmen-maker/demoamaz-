
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { showToast } = useToast();
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('bazaarhub_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bazaarhub_wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product) => {
    setItems(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
    showToast('Added to wishlist', 'success');
  };

  const removeFromWishlist = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    showToast('Removed from wishlist', 'info');
  };

  const toggleWishlist = (product) => {
    if (items.find(item => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (id) => !!items.find(item => item.id === id);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
