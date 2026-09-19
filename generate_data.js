import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

const files = {
  // --- MOCK DATA ---
  'data/products.js': `
export const products = Array.from({ length: 30 }, (_, i) => ({
  id: \`p\${i + 1}\`,
  name: \`Premium Indian Product \${i + 1}\`,
  brand: ['boAt', 'Noise', 'OnePlus', 'Realme', 'Redmi', 'Titan', 'Fastrack', 'Prestige', 'Hawkins', 'Patanjali', 'Mamaearth', 'Lakme', 'Peter England', 'Allen Solly', 'Bata'][i % 15],
  category: ['Electronics', 'Fashion', 'Home & Kitchen', 'Grocery', 'Beauty & Personal Care', 'Sports & Fitness', 'Books & Stationery', 'Toys & Games', 'Watches', 'Footwear'][i % 10],
  price: 999 + (i * 150),
  mrp: 1499 + (i * 200),
  discount: 33,
  rating: (4 + (i % 10) * 0.1).toFixed(1),
  reviewCount: 120 + i * 15,
  image: \`https://picsum.photos/seed/\${i + 100}/400/400\`,
  description: 'This is a high quality product. Made with the finest materials and built to last.',
  specifications: { Color: 'Black', Material: 'Premium', Warranty: '1 Year' },
  features: ['High durability', 'Premium finish', 'Value for money', 'Easy to use'],
  stock: i % 5 === 0 ? 0 : 50,
  seller: \`v\${(i % 8) + 1}\`,
  sellers: [
    { id: \`v\${(i % 8) + 1}\`, name: 'Seller 1', price: 999 + (i * 150), rating: 4.5, delivery: '2 Days' },
    { id: \`v\${((i + 1) % 8) + 1}\`, name: 'Seller 2', price: 1049 + (i * 150), rating: 4.2, delivery: '4 Days' }
  ],
  tags: ['bestseller', 'premium'],
  isNew: i % 4 === 0,
  isBestSeller: i % 3 === 0,
  isTrending: i % 5 === 0
}));
`,
  'data/orders.js': `
export const orders = [
  { id: 'ORD1001', date: '2026-09-15', status: 'delivered', total: 1499, items: 2, paymentMethod: 'UPI' },
  { id: 'ORD1002', date: '2026-09-18', status: 'shipped', total: 2999, items: 1, paymentMethod: 'Card' },
  { id: 'ORD1003', date: '2026-09-19', status: 'processing', total: 599, items: 3, paymentMethod: 'COD' }
];
`,
  'data/reviews.js': `
export const reviews = [
  { id: 1, user: 'Rahul K.', rating: 5, comment: 'Excellent product, highly recommended!', date: '2026-09-10' },
  { id: 2, user: 'Sneha P.', rating: 4, comment: 'Good quality but delivery was slightly delayed.', date: '2026-09-12' },
  { id: 3, user: 'Amit S.', rating: 5, comment: 'Value for money. Using it daily.', date: '2026-09-14' }
];
`,
  'context/CartContext.jsx': `
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
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
  };

  const removeFromCart = (id) => setItems(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };
  const clearCart = () => setItems([]);

  const applyCoupon = (code) => {
    if (code === 'SAVE10') setCoupon({ code, discountPercent: 10 });
    else if (code === 'FIRST50') setCoupon({ code, discountFixed: 50 });
    else if (code === 'BAZAAR20') setCoupon({ code, discountPercent: 20 });
    else return false;
    return true;
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
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon, coupon, totalItems, totalPrice, totalMRP, itemDiscount, couponDiscount, finalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
`,
  'context/WishlistContext.jsx': `
import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
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
  };

  const removeFromWishlist = (id) => setItems(prev => prev.filter(item => item.id !== id));

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

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bazaarhub_auth');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('bazaarhub_auth', JSON.stringify(user));
    } else {
      localStorage.removeItem('bazaarhub_auth');
    }
  }, [user]);

  const login = (role) => {
    if (role === 'customer') setUser({ name: 'Rahul User', email: 'customer@demo.com', role: 'customer' });
    if (role === 'vendor') setUser({ name: 'Demo Vendor', email: 'vendor@demo.com', role: 'vendor', vendorId: 'v1' });
    if (role === 'admin') setUser({ name: 'Admin', email: 'admin@demo.com', role: 'admin' });
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
  'main.jsx': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
`,
  'components/ProductCard.jsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col relative">
      <button 
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:text-accent-500 transition-colors"
      >
        <Heart size={18} fill={isWishlisted ? '#F97316' : 'none'} className={isWishlisted ? 'text-accent-500' : 'text-slate-400'} />
      </button>
      <Link to={\`/product/\${product.id}\`} className="block relative aspect-square overflow-hidden bg-slate-100">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.isNew && <span className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-semibold tracking-wide">NEW</span>}
        {product.isBestSeller && !product.isNew && <span className="absolute top-3 left-3 bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded font-semibold tracking-wide">BESTSELLER</span>}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-slate-500 font-medium mb-1">{product.brand}</div>
        <Link to={\`/product/\${product.id}\`} className="font-semibold text-slate-900 leading-tight mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
          {product.name}
        </Link>
        <div className="flex items-center gap-1 text-sm mb-3">
          <div className="flex items-center bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-bold">
            {product.rating} <Star size={10} className="ml-0.5" fill="currentColor" />
          </div>
          <span className="text-slate-400 text-xs">({product.reviewCount})</span>
        </div>
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-slate-900">₹{product.price}</span>
            <span className="text-xs text-slate-400 line-through">₹{product.mrp}</span>
            <span className="text-xs font-semibold text-accent-500">{product.discount}% off</span>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="w-full py-2 bg-primary-50 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(srcDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log("Full generation step 1 complete");
