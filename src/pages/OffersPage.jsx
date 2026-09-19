
import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { LuClock as Clock, LuZap as Zap, LuFlame } from 'react-icons/lu';

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
          <LuFlame className="inline mr-2 text-orange-500" size={28}/> Blockbuster Deals <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider animate-pulse border border-red-200">Ending Soon</span>
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
