
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import { LuChevronRight as ChevronRight, LuShieldCheck as ShieldCheck, LuArrowRightLeft as ArrowRightLeft, LuCreditCard as CreditCard, LuTruck as Truck, LuTimer as Timer, LuMapPin, LuFlame } from 'react-icons/lu';

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

  const get10 = (arr) => Array(10).fill(null).map((_, i) => ({ ...arr[i % arr.length], id: `${arr[i % arr.length].id}-${i}` }));

  const todayDeals = get10(products.filter(p => p.discount > 40));
  const bestSellers = get10(products.filter(p => p.isBestSeller));
  const trending = get10(products.filter(p => p.isTrending));
  const topElectronics = get10(products.filter(p => p.category === 'electronics'));
  const topFashion = get10(products.filter(p => p.category === 'fashion'));

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* SECTION 1: HERO BANNER */}
      <section className="bg-[#eef5fa] overflow-hidden relative">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-full md:w-2/3 h-full overflow-hidden">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80" alt="Hero Woman" className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-[120%] object-cover object-top opacity-20 md:opacity-90 mix-blend-multiply" style={{ maskImage: 'linear-gradient(to right, transparent, black 30%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%)' }} />
        </div>
        
        {/* Decorative badges (UP TO 70% OFF) */}
        <div className="absolute top-12 right-1/4 hidden lg:flex flex-col items-center justify-center w-32 h-32 bg-[#fff3e0] rounded-full shadow-lg z-10 rotate-12">
          <span className="text-[10px] font-bold tracking-widest uppercase">Up To</span>
          <span className="text-3xl font-black leading-none -mt-1">70%</span>
          <span className="text-sm font-bold -mt-1">OFF</span>
          <span className="text-[9px] mt-1 text-slate-600">On Top Brands</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32 flex flex-col lg:flex-row items-center gap-12 relative z-10 min-h-[500px]">
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <span className="inline-block text-slate-500 font-bold text-xs mb-3 uppercase tracking-widest">
              Shop Smart, Live Better
            </span>
            <h1 className="text-5xl lg:text-6xl font-black text-[#1e293b] mb-4 leading-tight tracking-tight">
              Everything You Need <br/><span className="text-blue-600">All in One Place</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Explore millions of products from trusted sellers across India. Best prices, great deals and fast delivery — always.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10 text-xs font-bold text-slate-700 mb-8">
              <div className="flex flex-col items-center gap-2"><div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Truck size={20} /></div> <span className="text-center leading-tight">Fast<br/>Delivery</span></div>
              <div className="flex flex-col items-center gap-2"><div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><ShieldCheck size={20} /></div> <span className="text-center leading-tight">Secure<br/>Payments</span></div>
              <div className="flex flex-col items-center gap-2"><div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center"><LuMapPin size={20} /></div> <span className="text-center leading-tight">Wide<br/>Selection</span></div>
              <div className="flex flex-col items-center gap-2"><div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><LuFlame size={20} /></div> <span className="text-center leading-tight">24/7<br/>Support</span></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                Shop Now <ChevronRight size={18}/>
              </Link>
              <Link to="/categories" className="bg-white/80 backdrop-blur border border-slate-200 text-slate-700 hover:bg-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center">
                Explore Categories
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Category Bar */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 translate-y-1/2 z-20 hidden lg:block">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 flex justify-between items-center overflow-x-auto no-scrollbar gap-8 border border-slate-100">
            {categories.slice(0, 8).map(c => (
              <Link key={c.id} to={`/category/${c.id}`} className="flex flex-col items-center gap-2 group flex-shrink-0 min-w-[70px]">
                <div className="w-12 h-12 rounded-full bg-[#f8fafc] text-blue-600 flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  {c.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-600 group-hover:text-blue-600 whitespace-nowrap">{c.name}</span>
              </Link>
            ))}
            <Link to="/categories" className="flex flex-col items-center gap-2 group flex-shrink-0 min-w-[70px]">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <ChevronRight size={24} />
                </div>
                <span className="text-[10px] font-bold text-blue-600 whitespace-nowrap">View All</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Spacer for floating category bar */}
      <div className="h-24 hidden lg:block bg-slate-50"></div>

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
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {todayDeals.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* SECTION 4: BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black text-slate-900">Best Sellers</h2>
          <Link to="/products" className="text-primary-600 font-bold hover:underline flex items-center">View All <ChevronRight size={16}/></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* SECTION 5: TRENDING NOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black text-slate-900">Trending Now <LuFlame className="inline ml-1 text-orange-500" size={24}/></h2>
          <Link to="/products" className="text-primary-600 font-bold hover:underline flex items-center">View All <ChevronRight size={16}/></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
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
          <div className="w-full lg:w-3/4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {topElectronics.slice(0,8).map(p => (
              <ProductCard key={p.id} product={p} />
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
          <div className="w-full lg:w-3/4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {topFashion.slice(0,8).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: TOP BRANDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">Shop by Top Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {['boAt', 'OnePlus', 'Peter England', 'Prestige', 'Mamaearth', 'Puma', 'Titan', 'Sony'].map(brand => (
            <Link key={brand} to={`/search?q=${brand}`} className="bg-white border border-slate-200 rounded-xl p-8 flex items-center justify-center hover:border-primary-500 hover:shadow-lg transition-all group">
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
