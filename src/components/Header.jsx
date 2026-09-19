import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LuSearch, LuMapPin, LuUser, LuHeart, LuShoppingCart, LuMenu, LuX, LuChevronDown, 
  LuTruck, LuRefreshCw, LuStar, LuSmartphone, LuInfo, LuShoppingBag, LuPercent, LuHouse
} from 'react-icons/lu';
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
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white">
      {/* Top Bar - Light Blue */}
      <div className="bg-[#f0f4f9] text-[#475569] text-[11px] sm:text-xs py-2 px-4 hidden sm:flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-4 font-medium max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-1.5 text-blue-600">
            <LuTruck size={14}/> <span>Free Delivery on orders above ₹499</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5 text-blue-600">
            <LuRefreshCw size={14}/> <span>7 Days Easy Return</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5 text-orange-500">
            <LuStar size={14} className="fill-orange-500"/> <span>Trusted by 5M+ Customers</span>
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <a href="#" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <LuSmartphone size={14} className="text-blue-600"/> Download App
            </a>
            <span className="text-slate-300">|</span>
            <a href="#" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <LuMapPin size={14} className="text-blue-600"/> Track Order
            </a>
            <span className="text-slate-300">|</span>
            <a href="#" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <LuInfo size={14} className="text-blue-600"/> Help & Support
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-[72px] flex items-center justify-between gap-4 sm:gap-8">

          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="sm:hidden text-slate-700 hover:text-blue-600 p-1" onClick={() => setIsMobileMenuOpen(true)}>
              <LuMenu size={24} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                <LuShoppingBag size={24} />
              </div>
              <div className="flex flex-col">
                <div className="text-2xl font-bold tracking-tight text-slate-900 leading-none mb-0.5">
                  ShopKart
                </div>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide">Shop Smart, Live Better</span>
              </div>
            </Link>
          </div>

          {/* Location */}
          <div className="hidden lg:flex items-center gap-2 cursor-pointer group">
            <LuMapPin size={20} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] text-slate-500 font-medium">Deliver to</span>
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                Lucknow, 226001 <LuChevronDown size={12} className="text-slate-400"/>
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-2xl bg-[#f3f4f6] rounded-md border border-transparent focus-within:border-blue-500 focus-within:bg-white overflow-hidden transition-all h-11">
            <div className="flex items-center bg-[#f3f4f6] px-3 border-r border-slate-200">
              <select className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer">
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="flex-1 bg-transparent px-4 py-2 text-sm text-slate-700 focus:outline-none min-w-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 transition-colors flex items-center justify-center flex-shrink-0">
              <LuSearch size={20} />
            </button>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-6 flex-shrink-0">
            {/* User Dropdown */}
            <div
              className="relative hidden sm:block"
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <Link to={user ? '/profile' : '/login'} className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors border border-slate-200">
                  <LuUser size={20} />
                </div>
                <div className="hidden lg:flex flex-col leading-tight">
                  <span className="text-[11px] text-slate-500 font-medium">{user ? 'Hello,' : 'Hello, Sign in'}</span>
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    {user ? user.name.split(' ')[0] : 'Account'} <LuChevronDown size={12} className="text-slate-400"/>
                  </span>
                </div>
              </Link>

              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl py-3 z-50">
                  {!user ? (
                    <div className="px-4 pb-3 mb-2 border-b border-slate-100">
                      <Link to="/login" className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors">Sign In</Link>
                      <p className="text-xs text-center mt-2 text-slate-500">New? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register here</Link></p>
                    </div>
                  ) : (
                    <div className="px-4 pb-3 mb-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  )}
                  <Link to="/profile" className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">My Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">My Orders</Link>
                  <Link to="/wishlist" className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">My Wishlist</Link>
                  {user && (
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 border-t border-slate-100 mt-1 transition-colors">
                      Sign Out
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative flex flex-col items-center gap-1 group">
              <div className="relative text-slate-600 group-hover:text-blue-600 transition-colors">
                <LuHeart size={24} />
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {wishlistItems.length}
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-700 group-hover:text-blue-600 hidden lg:inline">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative flex flex-col items-center gap-1 group">
              <div className="relative text-slate-600 group-hover:text-blue-600 transition-colors">
                <LuShoppingCart size={24} />
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {totalItems}
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-700 group-hover:text-blue-600 hidden lg:inline">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="relative flex">
            <input
              type="text"
              placeholder="Search products, brands..."
              className="w-full bg-[#f3f4f6] rounded-md pl-10 pr-4 py-2.5 text-sm focus:outline-none border border-transparent focus:border-blue-500 focus:bg-white transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <LuSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </form>
        </div>
      </div>

      {/* Category Nav */}
      <div className="bg-white border-b border-slate-100 hidden sm:block shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 h-12">          
          <div className="flex items-center overflow-x-auto no-scrollbar gap-4 sm:gap-6 flex-1 px-2">
            <Link to="/" className="text-xs font-bold text-slate-700 hover:text-blue-600 whitespace-nowrap transition-colors flex items-center gap-1.5 flex-shrink-0">
               Home
            </Link>
            {categories.map(c => (
              <Link key={c.id} to={`/category/${c.id}`} className="text-xs font-bold text-slate-700 hover:text-blue-600 whitespace-nowrap transition-colors flex items-center gap-1.5 flex-shrink-0">
                <span className="text-slate-600">{c.icon}</span> {c.name}
              </Link>
            ))}
          </div>

          {/* Offers Button */}
          <Link to="/offers" className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-md text-[13px] font-bold hover:bg-red-100 transition-colors whitespace-nowrap ml-4">
            <LuPercent size={14} /> Offers
          </Link>
        </div>
      </div>

      {/* Mobile Drawer (Truncated for brevity but functional) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] flex sm:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-xs bg-white h-full flex flex-col z-10" style={{ animation: 'slideInLeft 0.25s ease-out' }}>
            <div className="bg-blue-600 text-white p-5 flex justify-between items-start flex-shrink-0">
              <div>
                <p className="font-bold text-lg">{user ? `Hello, ${user.name.split(' ')[0]}` : 'Hello, Guest'}</p>
                {!user
                  ? <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-blue-200 underline">Login / Register</Link>
                  : <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-blue-200">View Profile</Link>
                }
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-1"><LuX size={22} /></button>
            </div>

            <div className="flex-1 overflow-y-auto pb-6">
              <p className="px-4 pt-4 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Categories</p>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 border-b border-slate-50">
                <span className="text-slate-500"><LuHouse /></span> Home
              </Link>
              {categories.map(c => (
                <Link key={c.id} to={`/category/${c.id}`} onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 border-b border-slate-50">
                  <span className="text-slate-500">{c.icon}</span> {c.name}
                </Link>
              ))}

              <p className="px-4 pt-4 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">My Account</p>
              <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">My Orders</Link>
              <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Wishlist {wishlistItems.length > 0 && <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{wishlistItems.length}</span>}
              </Link>
              <Link to="/offers" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-red-600 hover:bg-slate-50">
                <LuPercent size={16} /> Today's Deals
              </Link>
              {user && (
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full text-left px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-50 border-t border-slate-100 mt-2">
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
