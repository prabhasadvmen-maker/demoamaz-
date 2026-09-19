import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

const ensureDir = (filePath) => fs.mkdirSync(path.dirname(filePath), { recursive: true });

const files = {
  // --- PHASE 1: CSS ---
  'index.css': `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@import "tailwindcss";

@theme {
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-accent-400: #fb923c;
  --color-accent-500: #f97316;
  --color-accent-600: #ea580c;
  --font-sans: 'Inter', sans-serif;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #F8FAFC;
  color: #0F172A;
  -webkit-font-smoothing: antialiased;
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #f1f5f9; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
`,

  // --- PHASE 3: TOAST COMPONENT & CONTEXT ---
  'components/Toast.jsx': `
import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3 pointer-events-none w-full max-w-sm">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className={\`pointer-events-auto bg-white border-l-4 rounded shadow-lg p-4 flex items-start gap-3 animate-[slideInRight_0.3s_ease-out_forwards] transition-all \${
            toast.type === 'success' ? 'border-green-500' :
            toast.type === 'error' ? 'border-red-500' :
            toast.type === 'warning' ? 'border-accent-500' :
            'border-primary-500'
          }\`}
        >
          {toast.type === 'success' && <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />}
          {toast.type === 'error' && <XCircle className="text-red-500 shrink-0 mt-0.5" size={20} />}
          {toast.type === 'warning' && <AlertTriangle className="text-accent-500 shrink-0 mt-0.5" size={20} />}
          {toast.type === 'info' && <Info className="text-primary-500 shrink-0 mt-0.5" size={20} />}
          
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800">{toast.message}</p>
          </div>
          
          <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>
      ))}
      <style>{'\\
        @keyframes slideInRight {\\
          from { transform: translateX(100%); opacity: 0; }\\
          to { transform: translateX(0); opacity: 1; }\\
        }\\
      '}</style>
    </div>
  );
}
`,
  'context/ToastContext.jsx': `
import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
`,

  // --- PHASE 3: CONTEXTS (UPDATED WITH TOASTS) ---
  'context/CartContext.jsx': `
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
`,
  'context/WishlistContext.jsx': `
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
`,
  'context/AuthContext.jsx': `
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const demoUsers = {
  customer: { id: 'u1', name: 'Rahul Sharma', email: 'customer@demo.com', role: 'customer', phone: '9876543210', avatar: 'https://picsum.photos/seed/rahul/100/100' },
  vendor: { id: 'v1', name: 'Rajesh Kumar', email: 'vendor@demo.com', role: 'vendor', avatar: 'https://picsum.photos/seed/techmart/100/100' },
  admin: { id: 'a1', name: 'Admin User', email: 'admin@demo.com', role: 'admin', avatar: 'https://picsum.photos/seed/admin/100/100' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bazaarhub_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('bazaarhub_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bazaarhub_user');
    }
  }, [user]);

  const login = (role) => {
    if (demoUsers[role]) {
      setUser(demoUsers[role]);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
`,

  // --- MAIN LAYOUT & MAIN ENTRY UPDATE ---
  'layouts/MainLayout.jsx': `
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
`,
  'main.jsx': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>
);
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(srcDir, filepath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content);
});
console.log("Phase 1 & 3 Generation Complete");
