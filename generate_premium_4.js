import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');
const ensureDir = (filePath) => fs.mkdirSync(path.dirname(filePath), { recursive: true });

const files = {
  // --- PHASE 4: COMPONENTS ---
  'components/Header.jsx': `
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, User, Heart, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/categories';

export default function Header() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(\`/search?q=\${encodeURIComponent(searchQuery)}\`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="w-full relative z-50">
      {/* Top Bar */}
      <div className="bg-primary-700 text-white text-xs sm:text-sm py-1.5 px-4 hidden sm:flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>🚚 Free delivery on orders above ₹499</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/seller/v1" className="hover:text-primary-200">Sell on BazaarHub</Link>
          <span className="opacity-50">|</span>
          <a href="#" className="hover:text-primary-200">Help</a>
          <span className="opacity-50">|</span>
          <a href="#" className="hover:text-primary-200">Download App</a>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4 sm:gap-8">
          
          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-4">
            <button className="sm:hidden text-slate-700" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <Link to="/" className="flex flex-col">
              <div className="text-2xl sm:text-3xl font-black tracking-tight flex items-baseline">
                <span className="text-primary-600">Bazaar</span>
                <span className="text-slate-900">Hub</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase hidden sm:block -mt-1">India's Premium Marketplace</span>
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden sm:flex flex-1 max-w-2xl relative">
            <form onSubmit={handleSearch} className="w-full flex">
              <select className="bg-slate-50 border border-r-0 border-slate-300 rounded-l-lg px-3 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer">
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input 
                type="text" 
                placeholder="Search for products, brands and more..." 
                className="flex-1 border-y border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white px-6 rounded-r-lg transition-colors flex items-center justify-center">
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="hidden lg:flex items-center gap-1 text-slate-600 hover:text-primary-600 cursor-pointer group">
              <MapPin size={20} className="text-slate-400 group-hover:text-primary-600" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-slate-500">Deliver to</span>
                <span className="text-sm font-bold text-slate-900">New Delhi 110001</span>
              </div>
            </div>

            {/* User Menu */}
            <div className="relative group hidden sm:block" onMouseEnter={() => setIsUserMenuOpen(true)} onMouseLeave={() => setIsUserMenuOpen(false)}>
              <Link to={user ? "/profile" : "/login"} className="flex items-center gap-1 text-slate-600 hover:text-primary-600 cursor-pointer">
                <User size={24} className={user ? "text-primary-600" : "text-slate-700"} />
                <div className="flex flex-col leading-tight hidden lg:flex">
                  <span className="text-xs text-slate-500">{user ? 'Hello,' : 'Hello, Sign In'}</span>
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-1">{user ? user.name.split(' ')[0] : 'My Account'} <ChevronDown size={14}/></span>
                </div>
              </Link>
              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-4 z-50">
                  {!user ? (
                    <div className="px-4 pb-4 border-b border-slate-100 mb-2">
                      <Link to="/login" className="block w-full bg-primary-600 text-white text-center py-2 rounded-lg font-bold hover:bg-primary-700 transition-colors">Sign In</Link>
                      <div className="text-xs text-center mt-2 text-slate-500">New customer? <Link to="/register" className="text-primary-600 hover:underline">Start here.</Link></div>
                    </div>
                  ) : (
                    <div className="px-4 pb-4 border-b border-slate-100 mb-2">
                      <div className="font-bold text-slate-900">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  )}
                  <Link to="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600">My Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600">My Orders</Link>
                  <Link to="/wishlist" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600">My Wishlist</Link>
                  {user && <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 mt-2 border-t border-slate-100 pt-2">Sign Out</button>}
                </div>
              )}
            </div>

            <Link to="/wishlist" className="relative text-slate-700 hover:text-primary-600 flex items-center gap-1 hidden sm:flex">
              <div className="relative">
                <Heart size={24} />
                {wishlistItems.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-accent-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{wishlistItems.length}</span>}
              </div>
              <span className="font-medium hidden lg:inline">Wishlist</span>
            </Link>

            <Link to="/cart" className="relative text-slate-700 hover:text-primary-600 flex items-center gap-1">
              <div className="relative">
                <ShoppingCart size={24} />
                {totalItems > 0 && <span className="absolute -top-1.5 -right-1.5 bg-accent-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce-short">{totalItems}</span>}
              </div>
              <span className="font-medium hidden lg:inline">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden px-4 pb-3">
           <form onSubmit={handleSearch} className="w-full flex relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </form>
        </div>
      </div>

      {/* Category Nav Bar */}
      <div className="bg-slate-100 border-b border-slate-200 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto no-scrollbar gap-6 text-sm font-medium text-slate-700 h-10">
          <Link to="/products" className="hover:text-primary-600 whitespace-nowrap">All Categories</Link>
          {categories.map(c => (
            <Link key={c.id} to={\`/category/\${c.id}\`} className="hover:text-primary-600 whitespace-nowrap flex items-center gap-1">
              {c.name}
            </Link>
          ))}
          <Link to="/offers" className="text-accent-600 hover:text-accent-700 font-bold ml-auto whitespace-nowrap">🔥 Offers</Link>
        </div>
      </div>

      {/* Mobile Hamburger Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex sm:hidden">
          <div className="fixed inset-0 bg-slate-900/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="w-4/5 max-w-sm bg-white h-full flex flex-col relative z-10 animate-[slideInLeft_0.3s_ease-out_forwards]">
            <div className="bg-primary-700 text-white p-6 flex justify-between items-start">
              <div>
                <div className="font-bold text-xl mb-1">{user ? \`Hello, \${user.name}\` : 'Hello, Sign In'}</div>
                {!user ? (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-primary-100 hover:text-white underline">Login & Register</Link>
                ) : (
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-primary-100 hover:text-white">View Profile</Link>
                )}
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:bg-primary-600 p-1 rounded-full"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4">
              <div className="px-4 pb-2 font-bold text-slate-900 text-lg border-b border-slate-100 mb-2">Shop By Category</div>
              {categories.map(c => (
                <Link key={c.id} to={\`/category/\${c.id}\`} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-6 py-3 text-slate-700 hover:bg-slate-50">
                  <span className="text-xl">{c.icon}</span> <span>{c.name}</span>
                </Link>
              ))}
              
              <div className="px-4 pb-2 font-bold text-slate-900 text-lg border-b border-slate-100 mb-2 mt-6">My Account</div>
              <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-3 text-slate-700 hover:bg-slate-50">My Orders</Link>
              <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-3 text-slate-700 hover:bg-slate-50">My Wishlist ({wishlistItems.length})</Link>
              <Link to="/offers" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-3 text-accent-600 font-bold hover:bg-slate-50">Today's Deals</Link>
              {user && <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 mt-2 border-t border-slate-100">Sign Out</button>}
            </div>
          </div>
          <style>{'\\
            @keyframes slideInLeft {\\
              from { transform: translateX(-100%); }\\
              to { transform: translateX(0); }\\
            }\\
          '}</style>
        </div>
      )}
    </header>
  );
}
`,
  'components/Footer.jsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        <div>
          <div className="text-3xl font-black tracking-tight flex items-baseline mb-6">
            <span className="text-primary-500">Bazaar</span>
            <span className="text-white">Hub</span>
          </div>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            India's premium multi-vendor e-commerce marketplace. Discover quality products from verified sellers with fast delivery and easy returns.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"><Youtube size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Shop with Us</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/products" className="hover:text-primary-400 transition-colors">All Products</Link></li>
            <li><Link to="/offers" className="hover:text-accent-400 transition-colors">Today's Deals</Link></li>
            <li><Link to="/category/electronics" className="hover:text-primary-400 transition-colors">Electronics</Link></li>
            <li><Link to="/category/fashion" className="hover:text-primary-400 transition-colors">Fashion</Link></li>
            <li><Link to="/category/home-kitchen" className="hover:text-primary-400 transition-colors">Home & Kitchen</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Let Us Help You</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/profile" className="hover:text-primary-400 transition-colors">Your Account</Link></li>
            <li><Link to="/orders" className="hover:text-primary-400 transition-colors">Your Orders</Link></li>
            <li><a href="#" className="hover:text-primary-400 transition-colors">Returns & Replacements</a></li>
            <li><a href="#" className="hover:text-primary-400 transition-colors">Shipping Rates & Policies</a></li>
            <li><a href="#" className="hover:text-primary-400 transition-colors">Help Center</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Make Money with Us</h3>
          <ul className="space-y-3 text-sm mb-6">
            <li><a href="#" className="hover:text-primary-400 transition-colors">Sell on BazaarHub</a></li>
            <li><a href="#" className="hover:text-primary-400 transition-colors">Protect and Build Your Brand</a></li>
            <li><a href="#" className="hover:text-primary-400 transition-colors">Become an Affiliate</a></li>
            <li><a href="#" className="hover:text-primary-400 transition-colors">Advertise Your Products</a></li>
          </ul>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="font-bold text-white mb-2 text-sm">Secure Payments</div>
            <div className="flex gap-2 opacity-50">
              <span className="text-xs font-mono bg-slate-700 px-2 py-1 rounded">UPI</span>
              <span className="text-xs font-mono bg-slate-700 px-2 py-1 rounded">VISA</span>
              <span className="text-xs font-mono bg-slate-700 px-2 py-1 rounded">RuPay</span>
            </div>
          </div>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>&copy; 2024 BazaarHub Demo. Built with React & Tailwind CSS.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-300 transition-colors">Conditions of Use</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Notice</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Interest-Based Ads</a>
        </div>
      </div>
    </footer>
  );
}
`,
  'components/ProductCard.jsx': `
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, layout = 'grid' }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const isWished = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  if (layout === 'list') {
    return (
      <Link to={\`/product/\${product.id}\`} className="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group relative">
        <div className="w-full sm:w-1/3 aspect-square sm:aspect-auto sm:h-56 relative bg-slate-50 flex items-center justify-center p-4">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
          {product.discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">- {product.discount}%</span>
          )}
          <button 
            onClick={handleWishlist}
            className={\`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm border \${isWished ? 'text-red-500 border-red-200' : 'text-slate-400 border-slate-200 hover:text-red-500 hover:border-red-200'} transition-colors\`}
          >
            <Heart size={16} fill={isWished ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">{product.brand}</div>
            <h3 className="font-bold text-slate-900 text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">{product.name}</h3>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center bg-green-700 text-white px-1.5 py-0.5 rounded text-xs font-bold gap-0.5">
                {product.rating} <Star size={10} fill="currentColor" />
              </div>
              <span className="text-xs text-slate-500">({product.reviewCount.toLocaleString()})</span>
            </div>
            <p className="text-sm text-slate-600 line-clamp-2 mb-4">{product.description}</p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">₹{product.price.toLocaleString()}</span>
              {product.mrp > product.price && (
                <span className="text-sm text-slate-500 line-through">₹{product.mrp.toLocaleString()}</span>
              )}
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm"
            >
              <ShoppingCart size={16} /> <span className="hidden sm:inline">Add to Cart</span>
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={\`/product/\${product.id}\`} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300 group flex flex-col h-full relative">
      <div className="relative aspect-square bg-slate-50 p-6 flex items-center justify-center overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestSeller && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide shadow-sm">Bestseller</span>}
          {product.isNew && <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide shadow-sm">New</span>}
          {product.discount > 0 && <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm">{product.discount}% OFF</span>}
        </div>
        
        <button 
          onClick={handleWishlist}
          className={\`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md \${isWished ? 'text-red-500' : 'text-slate-400 hover:text-red-500 hover:scale-110'} transition-all duration-200 z-10\`}
        >
          <Heart size={16} fill={isWished ? "currentColor" : "none"} className={isWished ? "scale-110" : ""} />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute -bottom-12 left-0 right-0 px-4 group-hover:bottom-4 transition-all duration-300 flex justify-center opacity-0 group-hover:opacity-100 z-10">
           <button 
            onClick={handleAddToCart}
            className="w-full bg-slate-900 hover:bg-primary-600 text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-colors"
          >
            <ShoppingCart size={16} /> Quick Add
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 relative z-20 bg-white">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{product.brand}</div>
        <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[40px]">{product.name}</h3>
        
        <div className="flex items-center gap-1.5 mb-3 mt-auto">
          <div className="flex items-center bg-green-700 text-white px-1.5 py-0.5 rounded text-[10px] font-bold gap-0.5">
            {product.rating} <Star size={10} fill="currentColor" />
          </div>
          <span className="text-xs text-slate-400">({product.reviewCount > 1000 ? (product.reviewCount/1000).toFixed(1)+'k' : product.reviewCount})</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-black text-slate-900">₹{product.price.toLocaleString()}</span>
          {product.mrp > product.price && (
            <span className="text-xs text-slate-400 line-through">₹{product.mrp.toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(srcDir, filepath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content);
});
console.log("Phase 4 (Components) Generation Complete");
