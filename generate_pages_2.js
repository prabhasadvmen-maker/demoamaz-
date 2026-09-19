import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

const files = {
  'pages/CheckoutPage.jsx': `
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { items, finalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  if (items.length === 0 && step === 1) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = () => {
    // mock api call
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Checkout</h1>
      
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 -translate-y-1/2"></div>
        {[1, 2, 3].map(s => (
          <div key={s} className={\`w-10 h-10 rounded-full flex items-center justify-center font-bold \${step >= s ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-500'}\`}>
            {s}
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
            <form onSubmit={e => { e.preventDefault(); setStep(2); }} className="grid grid-cols-2 gap-4">
              <input required placeholder="First Name" className="border p-3 rounded" />
              <input required placeholder="Last Name" className="border p-3 rounded" />
              <input required placeholder="Email" type="email" className="border p-3 rounded col-span-2" />
              <input required placeholder="Address Line 1" className="border p-3 rounded col-span-2" />
              <input required placeholder="City" className="border p-3 rounded" />
              <input required placeholder="PIN Code" className="border p-3 rounded" />
              <button type="submit" className="col-span-2 bg-primary-600 text-white py-3 rounded-lg font-bold mt-4">Continue to Delivery</button>
            </form>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Delivery Method</h2>
            <div className="space-y-4 mb-6">
              <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:border-primary-600">
                <input type="radio" name="delivery" defaultChecked className="w-5 h-5 accent-primary-600" />
                <div>
                  <div className="font-semibold text-slate-900">Standard Delivery</div>
                  <div className="text-sm text-slate-500">Free (5-7 days)</div>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:border-primary-600">
                <input type="radio" name="delivery" className="w-5 h-5 accent-primary-600" />
                <div>
                  <div className="font-semibold text-slate-900">Express Delivery</div>
                  <div className="text-sm text-slate-500">₹99 (2-3 days)</div>
                </div>
              </label>
            </div>
            <button onClick={() => setStep(3)} className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold">Continue to Payment</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Payment Options</h2>
            <div className="space-y-4 mb-6">
              <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:border-primary-600">
                <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-primary-600" />
                <span className="font-semibold">UPI (Google Pay, PhonePe)</span>
              </label>
              <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:border-primary-600">
                <input type="radio" name="payment" className="w-5 h-5 accent-primary-600" />
                <span className="font-semibold">Credit/Debit Card</span>
              </label>
              <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:border-primary-600">
                <input type="radio" name="payment" className="w-5 h-5 accent-primary-600" />
                <span className="font-semibold">Cash on Delivery</span>
              </label>
            </div>
            <button onClick={handlePlaceOrder} className="w-full bg-accent-500 text-white py-3 rounded-lg font-bold hover:bg-accent-600">
              Pay ₹{finalPrice} & Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
`,
  'pages/OrderSuccessPage.jsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccessPage() {
  const orderId = 'ORD' + Math.floor(Math.random() * 100000);
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Order Placed Successfully!</h1>
      <p className="text-lg text-slate-600 mb-8">Thank you for shopping at BazaarHub. Your order ID is <span className="font-bold text-slate-900">{orderId}</span>.</p>
      
      <div className="flex justify-center gap-4">
        <Link to="/orders" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
          View My Orders
        </Link>
        <Link to="/" className="bg-white border border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
`,
  'pages/WishlistPage.jsx': `
import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">My Wishlist</h1>
      {items.length === 0 ? (
        <div className="text-center py-12 text-slate-500">Your wishlist is empty.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
}
`,
  'pages/LoginPage.jsx': `
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = (role) => {
    login(role);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">Login to BazaarHub</h2>
        
        <form className="space-y-4 mb-8" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Email Address" className="w-full border p-3 rounded-lg" />
          <input type="password" placeholder="Password" className="w-full border p-3 rounded-lg" />
          <button className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg">Login</button>
        </form>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-500">Demo Logins</span></div>
        </div>

        <div className="space-y-3">
          <button onClick={() => handleDemoLogin('customer')} className="w-full border border-primary-600 text-primary-600 py-2 rounded-lg font-semibold hover:bg-primary-50">Customer Demo</button>
          <button onClick={() => handleDemoLogin('vendor')} className="w-full border border-accent-500 text-accent-500 py-2 rounded-lg font-semibold hover:bg-accent-50">Vendor Demo</button>
        </div>
      </div>
    </div>
  );
}
`,
  'pages/ProfilePage.jsx': `
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      <div className="w-24 h-24 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
        {user.name[0]}
      </div>
      <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
      <p className="text-slate-500 mb-8">{user.email} • {user.role.toUpperCase()}</p>
      <button onClick={() => { logout(); navigate('/login'); }} className="bg-slate-900 text-white px-8 py-2 rounded-lg font-bold">Logout</button>
    </div>
  );
}
`,
  'App.jsx': `
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-success" element={<OrderSuccessPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<div className="p-12 text-center text-slate-500">Page not found</div>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
export default App;
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(srcDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log("Full generation step 4 complete");
