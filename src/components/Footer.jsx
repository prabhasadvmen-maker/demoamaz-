
import React from 'react';
import { Link } from 'react-router-dom';
import { LuShare2 as Share2, LuMessageCircle as MessageCircle, LuCamera as Camera, LuPlay as Play } from 'react-icons/lu';

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
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"><Share2 size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"><MessageCircle size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"><Camera size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"><Play size={20} /></a>
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
