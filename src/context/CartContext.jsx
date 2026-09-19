
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { showToast } = useToast();
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('bazaarhub_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('bazaarhub_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    showToast('Added to cart successfully', 'success');
  };

  const removeFromCart = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    showToast('Removed from cart', 'info');
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => setItems([]);

  const applyCoupon = (code) => {
    const codeUpper = code.toUpperCase();
    if (codeUpper === 'SAVE10') { setCoupon({ code: codeUpper, discountPercent: 10 }); showToast('Coupon SAVE10 applied! 10% Off', 'success'); }
    else if (codeUpper === 'FIRST50') { setCoupon({ code: codeUpper, discountFixed: 50 }); showToast('Coupon FIRST50 applied! ₹50 Off', 'success'); }
    else if (codeUpper === 'BAZAAR20') { setCoupon({ code: codeUpper, discountPercent: 20 }); showToast('Coupon BAZAAR20 applied! 20% Off', 'success'); }
    else { showToast('Invalid coupon code', 'error'); return false; }
    return true;
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalMRP = items.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemDiscount = totalMRP - totalPrice;
  
  let couponDiscount = 0;
  if (coupon?.discountPercent) couponDiscount = (totalPrice * coupon.discountPercent) / 100;
  if (coupon?.discountFixed) couponDiscount = coupon.discountFixed;
  
  const finalPrice = totalPrice - couponDiscount;

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon, removeCoupon, coupon, totalItems, totalPrice, totalMRP, itemDiscount, couponDiscount, finalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
