import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');
const ensureDir = (filePath) => fs.mkdirSync(path.dirname(filePath), { recursive: true });

const files = {
  // --- PHASE 5: USER PAGES & OTHER PAGES ---
  'pages/OrdersPage.jsx': `
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockOrders } from '../data/orders';
import { Package, Truck, CheckCircle2, XCircle, SearchX } from 'lucide-react';

export default function OrdersPage() {
  const [tab, setTab] = useState('All');
  
  const filtered = tab === 'All' ? mockOrders : mockOrders.filter(o => o.status.toLowerCase() === tab.toLowerCase());

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-black text-slate-900 mb-8">My Orders</h1>
        
        <div className="flex gap-2 border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
          {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(t => (
            <button 
              key={t}
              onClick={() => setTab(t)}
              className={\`px-6 py-3 font-bold whitespace-nowrap rounded-t-xl transition-colors \${tab === t ? 'text-primary-600 bg-white border-x border-t border-slate-200 shadow-[0_4px_0_0_white] relative z-10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}\`}
            >
              {t}
            </button>
          ))}
        </div>
        
        <div className="space-y-6">
          {filtered.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <SearchX size={48} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No orders found</h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">You don't have any orders in this category yet.</p>
              <Link to="/products" className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors inline-block">
                Start Shopping
              </Link>
            </div>
          ) : (
            filtered.map(order => (
              <div key={order.id} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between gap-8 shadow-sm hover:shadow-md transition-shadow">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-black text-lg text-slate-900">{order.id}</span>
                    <span className={\`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1
                      \${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                        order.status === 'shipped' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}\`}>
                      {order.status === 'delivered' && <CheckCircle2 size={14}/>}
                      {order.status === 'cancelled' && <XCircle size={14}/>}
                      {order.status === 'shipped' && <Truck size={14}/>}
                      {order.status === 'processing' && <Package size={14}/>}
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {order.products.map(p => (
                      <div key={p.productId} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-lg p-2 border border-slate-100 shrink-0">
                           <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div>
                          <Link to={\`/product/\${p.productId}\`} className="font-bold text-slate-900 hover:text-primary-600 line-clamp-1">{p.name}</Link>
                          <div className="text-sm text-slate-500">Sold by: {p.seller} • Qty: {p.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                   <div>
                     <div className="text-sm text-slate-500 mb-1">Order Placed</div>
                     <div className="font-bold text-slate-900 mb-4">{new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                     
                     <div className="text-sm text-slate-500 mb-1">Total Amount</div>
                     <div className="text-2xl font-black text-slate-900 mb-6">₹{order.total.toLocaleString()}</div>
                   </div>
                   
                   <div className="flex flex-col gap-3">
                     <Link to={\`/orders/\${order.id}\`} className="w-full text-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                       View Details
                     </Link>
                   </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
`,
  'pages/OrderDetailPage.jsx': `
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockOrders } from '../data/orders';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, Package, Truck, Home, CreditCard, MapPin, ChevronLeft, Download, HeadphonesIcon } from 'lucide-react';

export default function OrderDetailPage() {
  const { id } = useParams();
  const { showToast } = useToast();
  const order = mockOrders.find(o => o.id === id);

  if (!order) return <div className="p-24 text-center text-xl text-slate-500 font-bold">Order not found</div>;

  const handleInvoice = () => showToast('Invoice downloaded successfully', 'success');
  const handleSupport = () => showToast('Support team will contact you shortly', 'info');

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link to="/orders" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 mb-6 transition-colors">
          <ChevronLeft size={16} /> Back to My Orders
        </Link>
        
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden mb-8 shadow-sm">
          <div className="bg-slate-900 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-2xl font-black text-white mb-2">Order {order.id}</h1>
              <p className="text-slate-400 font-medium">Placed on {new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button onClick={handleInvoice} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors">
                <Download size={18} /> Invoice
              </button>
              <button onClick={handleSupport} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                <HeadphonesIcon size={18} /> Help
              </button>
            </div>
          </div>
          
          <div className="p-8">
            {/* TIMELINE */}
            <h3 className="font-bold text-slate-900 text-lg mb-8">Tracking Status</h3>
            <div className="relative flex justify-between mb-16 max-w-3xl mx-auto">
              <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 -z-10 -translate-y-1/2 rounded-full"></div>
              
              {/* Calculate progress width */}
              {(() => {
                const doneCount = order.timeline.filter(t => t.done).length;
                const pct = ((doneCount - 1) / (order.timeline.length - 1)) * 100;
                return (
                  <div className="absolute top-1/2 left-0 h-1.5 bg-green-500 -z-10 -translate-y-1/2 rounded-full" style={{ width: \`\${Math.max(0, pct)}%\`}}></div>
                )
              })()}
              
              {order.timeline.filter((_,i) => i%2===0 || i===order.timeline.length-1).map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className={\`w-12 h-12 rounded-full flex items-center justify-center shadow-sm \${step.done ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'}\`}>
                    {i === 0 && <CheckCircle2 size={22} />}
                    {i === 1 && <Package size={22} />}
                    {i === 2 && <Truck size={22} />}
                    {i === 3 && <Home size={22} />}
                  </div>
                  <div className="absolute -bottom-10 text-center w-24 -ml-6">
                    <span className={\`text-xs font-bold block \${step.done ? 'text-slate-900' : 'text-slate-400'}\`}>{step.status}</span>
                    {step.date && <span className="text-[10px] text-slate-500">{step.date.split(' ')[0]}</span>}
                  </div>
                </div>
              ))}
            </div>
            
            {/* ADDRESS & PAYMENT */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><MapPin size={18} className="text-slate-500"/> Delivery Address</h3>
                <p className="font-bold text-slate-900 mb-1">{order.address.name}</p>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {order.address.line1}<br />
                  {order.address.city}, {order.address.state}<br />
                  {order.address.pincode}
                </p>
                <p className="text-sm text-slate-600 mt-3 font-medium flex items-center gap-2">
                  <span className="px-2 py-1 bg-slate-200 rounded font-bold text-[10px] uppercase">Phone</span> {order.address.phone}
                </p>
              </div>
              
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><CreditCard size={18} className="text-slate-500"/> Payment Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Method</span> 
                    <span className="font-bold text-slate-900">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Status</span> 
                    <span className={\`font-bold uppercase tracking-wider text-[10px] px-2 py-1 rounded \${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}\`}>{order.paymentStatus}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Subtotal</span> 
                    <span className="font-bold text-slate-900">₹{order.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-base font-bold text-slate-900">Total Paid</span> 
                    <span className="text-xl font-black text-slate-900">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCTS */}
            <h3 className="font-bold text-slate-900 text-lg mb-4">Items in this Order</h3>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
               {order.products.map((p, idx) => (
                 <div key={p.productId} className={\`p-6 flex flex-col sm:flex-row items-center gap-6 \${idx !== order.products.length-1 ? 'border-b border-slate-200' : ''}\`}>
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl p-2 shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <Link to={\`/product/\${p.productId}\`} className="font-bold text-lg text-slate-900 hover:text-primary-600 mb-1">{p.name}</Link>
                      <div className="text-sm font-medium text-slate-500">Sold by: {p.seller}</div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="text-sm font-bold text-slate-500 mb-1">Qty: {p.quantity}</div>
                      <div className="text-xl font-black text-slate-900">₹{(p.price * p.quantity).toLocaleString()}</div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'pages/WishlistPage.jsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingCart } from 'lucide-react';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
          My Wishlist <span className="bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-full">{items.length}</span>
        </h1>
        
        {items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-16 text-center">
            <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-400">
              <Heart size={64} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Your wishlist is empty</h2>
            <p className="text-lg text-slate-500 mb-8 max-w-md mx-auto">Save items you love and buy them later.</p>
            <Link to="/products" className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-colors inline-block">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map(product => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
                <div className="mt-3">
                   <button 
                    onClick={() => handleMoveToCart(product)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <ShoppingCart size={18} /> Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
`,
  'pages/LoginPage.jsx': `
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Store, Shield } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleDemoLogin = (role) => {
    if(login(role)) {
      showToast(\`Logged in as \${role.toUpperCase()}\`, 'success');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200 w-full max-w-md relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-bl-full -mr-10 -mt-10 blur-xl opacity-50 pointer-events-none"></div>

        <div className="text-center mb-10">
          <div className="text-4xl font-black tracking-tight flex items-baseline justify-center mb-2">
            <span className="text-primary-600">Bazaar</span>
            <span className="text-slate-900">Hub</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 font-medium">Sign in to your account</p>
        </div>
        
        <form className="space-y-4 mb-8" onSubmit={e => { e.preventDefault(); handleDemoLogin('customer'); }}>
          <div>
             <input type="email" placeholder="Email Address" className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none font-medium" />
          </div>
          <div>
             <input type="password" placeholder="Password" className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none font-medium" />
          </div>
          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary-200 hover:-translate-y-0.5">Login Securely</button>
        </form>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-slate-500 font-bold uppercase tracking-wider text-xs">Demo Accounts</span></div>
        </div>

        <div className="space-y-3">
          <button onClick={() => handleDemoLogin('customer')} className="w-full border-2 border-primary-100 bg-primary-50 hover:bg-primary-100 text-primary-700 py-3 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors">
            <User size={18} /> Customer Demo
          </button>
          <button onClick={() => handleDemoLogin('vendor')} className="w-full border-2 border-orange-100 bg-orange-50 hover:bg-orange-100 text-orange-700 py-3 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors">
            <Store size={18} /> Vendor Demo
          </button>
          <button onClick={() => handleDemoLogin('admin')} className="w-full border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 py-3 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors">
            <Shield size={18} /> Admin Demo
          </button>
        </div>
        
        <div className="text-center mt-8 text-sm font-medium text-slate-600">
          Don't have an account? <Link to="/register" className="text-primary-600 hover:underline font-bold">Register here</Link>
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
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-12">
          <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 relative border-4 border-white shadow-lg overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-black text-primary-600">{user.name[0]}</span>
            )}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          
          <h1 className="text-3xl font-black text-slate-900 mb-2">{user.name}</h1>
          <p className="text-slate-500 font-medium mb-4">{user.email} • {user.phone || '+91 0000000000'}</p>
          <div className="inline-block px-4 py-1.5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-wider mb-10">
            {user.role} Account
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-10 max-w-md mx-auto text-left">
            <button className="p-4 border border-slate-200 rounded-2xl hover:border-primary-500 hover:bg-primary-50 transition-colors font-bold text-slate-900">Edit Profile</button>
            <button className="p-4 border border-slate-200 rounded-2xl hover:border-primary-500 hover:bg-primary-50 transition-colors font-bold text-slate-900">Manage Addresses</button>
            <button className="p-4 border border-slate-200 rounded-2xl hover:border-primary-500 hover:bg-primary-50 transition-colors font-bold text-slate-900 col-span-2 text-center">Payment Methods</button>
          </div>

          <button onClick={() => { logout(); navigate('/login'); }} className="bg-red-50 text-red-600 border border-red-200 px-10 py-3 rounded-xl font-bold hover:bg-red-100 transition-colors">
            Sign Out
          </button>
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
import { Star, MapPin, ShieldCheck, Box } from 'lucide-react';

export default function SellerPage() {
  const { id } = useParams();
  const seller = vendors.find(v => v.id === id);
  const sellerProducts = products.filter(p => p.seller === id);

  if (!seller) return <div className="p-24 text-center text-xl text-slate-500 font-bold">Seller not found</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Banner */}
      <div className="h-64 sm:h-80 w-full relative bg-slate-900">
        <img src={seller.banner} alt="Banner" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        
        <div className="absolute -bottom-16 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-end gap-6">
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-3xl shadow-xl p-2 border-4 border-slate-50 relative">
            <img src={seller.logo} className="w-full h-full object-contain rounded-2xl" alt={seller.storeName} />
            {seller.isVerified && (
              <div className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full p-1.5 shadow-lg border-2 border-white" title="Verified Seller">
                 <ShieldCheck size={20} />
              </div>
            )}
          </div>
          <div className="flex-1 pb-2 sm:pb-4">
             <h1 className="text-3xl sm:text-5xl font-black text-white mb-2 tracking-tight">{seller.storeName}</h1>
             <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-slate-300 font-medium">
                <span className="flex items-center gap-1.5 text-yellow-400 font-bold bg-slate-900/50 px-3 py-1 rounded-lg backdrop-blur-sm"><Star size={18} fill="currentColor" /> {seller.rating} Rating</span>
                <span className="flex items-center gap-1.5 bg-slate-900/50 px-3 py-1 rounded-lg backdrop-blur-sm"><MapPin size={18} /> {seller.location}</span>
                <span className="bg-slate-900/50 px-3 py-1 rounded-lg backdrop-blur-sm">Member since {seller.joinedDate.split('-')[0]}</span>
             </div>
          </div>
        </div>
      </div>
      
      {/* Seller Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-24 pb-12">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About {seller.storeName}</h2>
            <p className="text-slate-600 text-lg leading-relaxed">{seller.about}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <span className="text-slate-500 font-bold">Total Products</span>
              <span className="text-2xl font-black text-slate-900">{seller.totalProducts}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <span className="text-slate-500 font-bold">Orders Completed</span>
              <span className="text-2xl font-black text-slate-900">{seller.totalOrders.toLocaleString()}</span>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-slate-500 font-bold text-sm">Store Categories</span>
              <div className="flex flex-wrap gap-2">
                 {seller.categories.map(c => <span key={c} className="bg-primary-50 text-primary-700 font-bold text-xs px-3 py-1 rounded-full">{c}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <Box className="text-primary-600" size={28}/> Products from {seller.storeName}
        </h2>
        {sellerProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm text-slate-500 font-bold">No products available at the moment.</div>
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
import { Clock, Zap } from 'lucide-react';

export default function OffersPage() {
  const megaDeals = products.filter(p => p.discount > 40).sort((a,b) => b.discount - a.discount);
  const otherDeals = products.filter(p => p.discount > 20 && p.discount <= 40).sort((a,b) => b.discount - a.discount);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="bg-gradient-to-r from-accent-500 to-red-500 rounded-3xl p-8 md:p-16 text-white mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 -mr-24 blur-sm"><Clock size={400} /></div>
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-white/20 backdrop-blur font-black rounded-full mb-6 text-sm tracking-widest uppercase border border-white/30">
               <Zap size={16} className="text-yellow-300"/> Mega Sale
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">Flash Sale Live!</h1>
            <p className="text-xl md:text-2xl font-medium mb-10 text-orange-50 leading-relaxed">Up to 70% off on top electronics, fashion, and more. Limited stock available.</p>
            <div className="inline-flex items-center gap-4 bg-white text-slate-900 px-8 py-4 rounded-2xl shadow-xl">
              <span className="text-sm font-black uppercase tracking-widest text-slate-400 border-r border-slate-200 pr-4">Ends In</span>
              <div className="font-black text-3xl font-mono flex items-center gap-2">
                <span>05</span><span className="text-slate-300 -mt-1">:</span><span>23</span><span className="text-slate-300 -mt-1">:</span><span className="text-accent-500">41</span>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
          🔥 Blockbuster Deals <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider animate-pulse border border-red-200">Ending Soon</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {megaDeals.map(product => <ProductCard key={product.id} product={product} />)}
        </div>

        <h2 className="text-3xl font-black text-slate-900 mb-8">More Great Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherDeals.map(product => <ProductCard key={product.id} product={product} />)}
        </div>

      </div>
    </div>
  );
}
`,
  'pages/CategoriesPage.jsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { Grid3X3 } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
           <h1 className="text-4xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3"><Grid3X3 size={32} className="text-primary-600"/> All Categories</h1>
           <p className="text-slate-500 text-lg">Browse our wide selection of products across multiple categories</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {categories.map(c => (
            <Link key={c.id} to={\`/category/\${c.id}\`} className="group flex flex-col items-center bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-primary-300 transition-all text-center">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-6 bg-slate-50 border-4 border-slate-100 group-hover:border-primary-100 group-hover:scale-110 transition-all shadow-sm">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-black text-lg text-slate-800 group-hover:text-primary-600 transition-colors mb-1">{c.name}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{c.count > 0 ? \`\${c.count} Products\` : 'Coming Soon'}</p>
            </Link>
          ))}
        </div>
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
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
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

// Simple Register Page placeholder
const RegisterPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Create Account</h2>
      <p className="text-slate-500 mb-8">This is a demo marketplace. Please use the Demo Logins on the Login page instead.</p>
      <button onClick={() => window.location.hash = '#/login'} className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl">Go to Login</button>
    </div>
  </div>
);

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-success" element={<OrderSuccessPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="seller/:id" element={<SellerPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="*" element={<div className="p-32 text-center text-slate-500 text-2xl font-black">404 - Page not found</div>} />
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
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content);
});
console.log("Phase 5 & 6 (User Pages & App Shell) Generation Complete");
