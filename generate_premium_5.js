import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');
const ensureDir = (filePath) => fs.mkdirSync(path.dirname(filePath), { recursive: true });

const files = {
  // --- PHASE 5: HOME PAGE ---
  'pages/HomePage.jsx': `
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import { ChevronRight, ShieldCheck, ArrowRightLeft, CreditCard, Truck, Timer } from 'lucide-react';

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 23, s: 41 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else {
          s = 59;
          if (m > 0) m--;
          else { m = 59; if (h > 0) h--; }
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const todayDeals = products.filter(p => p.discount > 40).slice(0, 5);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const trending = products.filter(p => p.isTrending).slice(0, 4);
  const topElectronics = products.filter(p => p.category === 'electronics').slice(0, 4);
  const topFashion = products.filter(p => p.category === 'fashion').slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* SECTION 1: HERO BANNER */}
      <section className="bg-white border-b border-slate-200 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-50 rounded-l-full -mr-48 blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 font-bold text-sm mb-6 uppercase tracking-wider shadow-sm">
              🇮🇳 India's #1 Premium Marketplace
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
              Shop Smart,<br/><span className="text-primary-600">Shop Premium.</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover 10,000+ handpicked products from 500+ verified sellers across India. Delivered fast, straight to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link to="/products" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-200 transition-all hover:-translate-y-1">
                Explore Products
              </Link>
              <Link to="/offers" className="bg-white border-2 border-accent-500 text-accent-600 hover:bg-accent-50 px-8 py-4 rounded-xl font-bold text-lg shadow-sm transition-all hover:-translate-y-1">
                Today's Deals
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-2"><ShieldCheck className="text-green-500" size={20} /> 100% Genuine</div>
              <div className="flex items-center gap-2"><ArrowRightLeft className="text-primary-500" size={20} /> Free Returns</div>
              <div className="flex items-center gap-2"><CreditCard className="text-accent-500" size={20} /> Secure Pay</div>
              <div className="flex items-center gap-2"><Truck className="text-blue-500" size={20} /> Fast Delivery</div>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="grid grid-cols-2 gap-4 relative">
              <img src="https://picsum.photos/seed/hero1/400/400" className="rounded-3xl shadow-xl w-full h-auto aspect-square object-cover" alt="Hero" />
              <img src="https://picsum.photos/seed/hero2/400/400" className="rounded-3xl shadow-xl w-full h-auto aspect-square object-cover mt-8" alt="Hero" />
              <img src="https://picsum.photos/seed/hero3/400/400" className="rounded-3xl shadow-xl w-full h-auto aspect-square object-cover -mt-8" alt="Hero" />
              <img src="https://picsum.photos/seed/hero4/400/400" className="rounded-3xl shadow-xl w-full h-auto aspect-square object-cover" alt="Hero" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-500 text-white p-4 rounded-full shadow-2xl font-black text-center animate-pulse border-4 border-white">
                <div className="text-2xl leading-none">50%</div>
                <div className="text-[10px] uppercase tracking-widest mt-1">OFF Today</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CATEGORY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-black text-slate-900 mb-8">Shop by Category</h2>
        <div className="flex overflow-x-auto no-scrollbar sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-4">
          {categories.filter(c => c.id !== 'books' && c.id !== 'toys').map(c => (
            <Link key={c.id} to={\`/category/\${c.id}\`} className="flex-shrink-0 w-36 sm:w-auto bg-white border border-slate-200 rounded-3xl p-6 text-center hover:shadow-xl hover:border-primary-200 transition-all group">
              <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:bg-primary-50 transition-all">
                {c.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-sm">{c.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{c.count} Items</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: TODAY'S DEALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-black text-slate-900">Today's Deals</h2>
              <span className="bg-accent-100 text-accent-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider animate-pulse">Limited Time</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Timer size={18} className="text-accent-500" /> Hurry up! Deals end in: 
              <div className="flex gap-1">
                <span className="bg-slate-800 text-white px-2 py-0.5 rounded text-sm font-mono">{String(timeLeft.h).padStart(2,'0')}</span>:
                <span className="bg-slate-800 text-white px-2 py-0.5 rounded text-sm font-mono">{String(timeLeft.m).padStart(2,'0')}</span>:
                <span className="bg-slate-800 text-white px-2 py-0.5 rounded text-sm font-mono">{String(timeLeft.s).padStart(2,'0')}</span>
              </div>
            </div>
          </div>
          <Link to="/offers" className="text-primary-600 font-bold hover:underline flex items-center">View All Deals <ChevronRight size={16}/></Link>
        </div>
        
        <div className="flex overflow-x-auto no-scrollbar gap-6 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          {todayDeals.map(p => (
            <div key={p.id} className="w-64 flex-shrink-0">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black text-slate-900">Best Sellers</h2>
          <Link to="/products" className="text-primary-600 font-bold hover:underline flex items-center">View All <ChevronRight size={16}/></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* SECTION 5: TRENDING NOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black text-slate-900">Trending Now 🔥</h2>
          <Link to="/products" className="text-primary-600 font-bold hover:underline flex items-center">View All <ChevronRight size={16}/></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* SECTION 6: ELECTRONICS SHOWCASE */}
      <section className="bg-blue-50 py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/4">
            <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight">Top Electronics Deals</h2>
            <p className="text-slate-600 mb-8">Upgrade your tech with the latest smartphones, laptops, and audio gear at unbeatable prices.</p>
            <Link to="/category/electronics" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors inline-block">Explore Tech</Link>
          </div>
          <div className="w-full lg:w-3/4 flex overflow-x-auto no-scrollbar gap-6 pb-4">
            {topElectronics.map(p => (
              <div key={p.id} className="w-64 flex-shrink-0"><ProductCard product={p} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FASHION SHOWCASE */}
      <section className="bg-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="w-full lg:w-1/4 text-left lg:text-right">
            <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight">Fashion Fresh Arrivals</h2>
            <p className="text-slate-600 mb-8">Revamp your wardrobe with top brands in men's and women's clothing.</p>
            <Link to="/category/fashion" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors inline-block">Shop Fashion</Link>
          </div>
          <div className="w-full lg:w-3/4 flex overflow-x-auto no-scrollbar gap-6 pb-4">
            {topFashion.map(p => (
              <div key={p.id} className="w-64 flex-shrink-0"><ProductCard product={p} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: TOP BRANDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">Shop by Top Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {['boAt', 'OnePlus', 'Peter England', 'Prestige', 'Mamaearth', 'Puma', 'Titan', 'Sony'].map(brand => (
            <Link key={brand} to={\`/search?q=\${brand}\`} className="bg-white border border-slate-200 rounded-xl p-8 flex items-center justify-center hover:border-primary-500 hover:shadow-lg transition-all group">
              <span className="font-black text-2xl text-slate-400 group-hover:text-primary-600 transition-colors uppercase tracking-widest">{brand}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 9: SELL ON BAZAARHUB BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-8">
        <div className="bg-slate-900 rounded-3xl p-10 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Start Selling on BazaarHub</h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">Join 500+ verified sellers across India. Reach millions of customers, grow your business, and get paid fast.</p>
            <Link to="/login" className="bg-primary-600 hover:bg-primary-500 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary-500/30">Become a Seller Today</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(srcDir, filepath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content);
});
console.log("Phase 5 (Home Page) Generation Complete");
