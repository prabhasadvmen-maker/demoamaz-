import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

const files = {
  'pages/OrdersPage.jsx': `
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { orders } from '../data/orders';

export default function OrdersPage() {
  const [tab, setTab] = useState('All');
  
  const filtered = tab === 'All' ? orders : orders.filter(o => o.status.toLowerCase() === tab.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">My Orders</h1>
      <div className="flex gap-4 border-b border-slate-200 mb-6 overflow-x-auto no-scrollbar pb-2">
        {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(t => (
          <button 
            key={t}
            onClick={() => setTab(t)}
            className={\`px-4 py-2 font-medium whitespace-nowrap rounded-t-lg \${tab === t ? 'text-primary-600 bg-primary-50 border-b-2 border-primary-600' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}\`}
          >
            {t}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No orders found in this category.</div>
        ) : (
          filtered.map(order => (
            <div key={order.id} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-slate-900">{order.id}</span>
                  <span className={\`px-2 py-0.5 rounded text-xs font-semibold uppercase 
                    \${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}\`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-slate-500">Placed on: {order.date}</div>
                <div className="text-sm text-slate-500">Items: {order.items} • Total: <span className="font-bold text-slate-900">₹{order.total}</span></div>
              </div>
              <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                <Link to={\`/orders/\${order.id}\`} className="flex-1 text-center border border-primary-200 text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
`,
  'pages/OrderDetailPage.jsx': `
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { orders } from '../data/orders';
import { CheckCircle2, Package, Truck, Home } from 'lucide-react';

export default function OrderDetailPage() {
  const { id } = useParams();
  const order = orders.find(o => o.id === id);

  if (!order) return <div className="p-12 text-center text-xl text-slate-500">Order not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/orders" className="hover:text-primary-600">My Orders</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">{order.id}</span>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-6 shadow-sm">
        <div className="bg-slate-50 p-6 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Order #{order.id}</h1>
            <p className="text-sm text-slate-500">Placed on {order.date}</p>
          </div>
          <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-50 transition-colors">Download Invoice</button>
        </div>
        
        <div className="p-8">
          <div className="relative flex justify-between mb-16 max-w-2xl mx-auto mt-4">
            <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 -z-10 -translate-y-1/2 rounded-full"></div>
            <div className="absolute top-1/2 left-0 w-3/4 h-1.5 bg-green-500 -z-10 -translate-y-1/2 rounded-full"></div>
            
            {[
              { icon: CheckCircle2, label: 'Confirmed' },
              { icon: Package, label: 'Packed' },
              { icon: Truck, label: 'Shipped' },
              { icon: Home, label: 'Delivered' }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-2 bg-white px-2">
                <div className={\`w-12 h-12 rounded-full flex items-center justify-center shadow-sm \${i < 3 ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'}\`}>
                  <step.icon size={22} />
                </div>
                <span className="text-xs font-bold text-slate-700 absolute -bottom-8 whitespace-nowrap">{step.label}</span>
              </div>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
              <h3 className="font-bold mb-4 text-slate-900 border-b pb-2">Delivery Address</h3>
              <p className="text-sm text-slate-700 font-bold mb-1">Rahul User</p>
              <p className="text-sm text-slate-600 leading-relaxed">123 Main Street, Sector 4<br />Bangalore, Karnataka 560001<br />India</p>
              <p className="text-sm text-slate-600 mt-2 font-medium">Phone: +91 9876543210</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
              <h3 className="font-bold mb-4 text-slate-900 border-b pb-2">Payment Summary</h3>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex justify-between"><span>Method</span> <span className="font-bold text-slate-900">{order.paymentMethod}</span></div>
                <div className="flex justify-between"><span>Total Items</span> <span className="font-bold text-slate-900">{order.items}</span></div>
                <div className="flex justify-between"><span>Delivery Fee</span> <span className="font-bold text-green-600">FREE</span></div>
                <div className="flex justify-between pt-3 border-t font-bold text-slate-900 text-base"><span>Total Paid</span> <span className="text-primary-600">₹{order.total}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'pages/SellerPage.jsx': `
import React from 'react';
import { useParams } from 'react-router-dom';
import { vendors } from '../data/vendors';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Star, MapPin } from 'lucide-react';

export default function SellerPage() {
  const { id } = useParams();
  const seller = vendors.find(v => v.id === id);
  const sellerProducts = products.filter(p => p.seller === id);

  if (!seller) return <div className="p-12 text-center text-xl text-slate-500">Seller not found</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <div className="h-56 bg-slate-900 w-full relative">
        <div className="absolute -bottom-16 left-8 sm:left-16 flex items-end gap-6">
          <div className="w-32 h-32 bg-white rounded-xl shadow-lg p-1.5 border border-slate-100">
            <img src={\`https://picsum.photos/seed/\${seller.id}/200/200\`} className="w-full h-full object-cover rounded-lg" alt={seller.storeName} />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-16 pt-24 pb-12 border-b border-slate-200">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3">{seller.storeName}</h1>
        <div className="flex items-center gap-6 text-sm text-slate-600 mb-6">
          <span className="flex items-center gap-1.5 font-semibold"><Star size={16} className="text-orange-500" fill="currentColor" /> {seller.rating} Rating</span>
          <span className="flex items-center gap-1.5 font-medium"><MapPin size={16} className="text-slate-400" /> New Delhi, India</span>
          <span className="font-medium bg-slate-100 px-2 py-1 rounded text-slate-600">Joined 2021</span>
        </div>
        <p className="text-slate-600 max-w-3xl leading-relaxed text-lg">{seller.about || 'A premium seller on BazaarHub offering top quality products with reliable shipping. Dedicated to customer satisfaction.'}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-16 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          Products from {seller.storeName} <span className="bg-primary-100 text-primary-700 text-sm px-2 py-0.5 rounded-full">{sellerProducts.length}</span>
        </h2>
        {sellerProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500">No products available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sellerProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>
    </div>
  );
}
`,
  'pages/OffersPage.jsx': `
import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Clock } from 'lucide-react';

export default function OffersPage() {
  const deals = products.filter(p => p.discount > 20).slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 md:p-14 text-white mb-12 shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 opacity-20"><Clock size={300} /></div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur font-bold rounded-full mb-4 text-sm tracking-wide uppercase">Mega Sale</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight">Flash Sale Live!</h1>
          <p className="text-lg md:text-xl font-medium mb-8 text-orange-50">Up to 60% off on top electronics and fashion. Limited stock available.</p>
          <div className="inline-flex items-center gap-3 bg-white text-orange-600 px-6 py-3 rounded-xl shadow-lg">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500 mr-2">Ends In</span>
            <div className="font-bold text-2xl font-mono flex items-center gap-1">
              <span>04</span><span className="text-slate-300 opacity-50">:</span><span>12</span><span className="text-slate-300 opacity-50">:</span><span>59</span>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        Top Deals <span className="bg-red-100 text-red-600 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider animate-pulse">Ending Soon</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
`,
  'pages/CategoriesPage.jsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-12 text-center">Shop by Category</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map(c => (
          <Link key={c.id} to={\`/products\`} className="group flex flex-col items-center bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-xl hover:border-primary-200 transition-all text-center">
            <div className="w-28 h-28 rounded-full overflow-hidden mb-5 bg-slate-50 group-hover:scale-110 transition-transform shadow-sm">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-slate-800 group-hover:text-primary-600 transition-colors">{c.name}</h3>
            <p className="text-xs text-slate-400 mt-1.5 font-medium uppercase tracking-wide">Explore</p>
          </Link>
        ))}
      </div>
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
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import SellerPage from './pages/SellerPage';
import OffersPage from './pages/OffersPage';
import CategoriesPage from './pages/CategoriesPage';

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
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="seller/:id" element={<SellerPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="*" element={<div className="p-24 text-center text-slate-500 text-lg">Page not found</div>} />
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
console.log("Full generation step 6 complete");
