
import React from 'react';
import { useParams } from 'react-router-dom';
import { vendors } from '../data/vendors';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { LuStar as Star, LuMapPin as MapPin, LuShieldCheck as ShieldCheck, LuBox as Box, LuTruck as Truck, LuRefreshCw as RefreshCw, LuShield as Shield } from 'react-icons/lu';

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
            <p className="text-slate-600 text-lg leading-relaxed mb-8">{seller.about}</p>

            <h2 className="text-xl font-bold text-slate-900 mb-4">Seller Policies</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[{label:'Shipping', value: seller.policies.shipping, icon:<Truck className="text-blue-500" />},
                {label:'Returns', value: seller.policies.returns, icon:<RefreshCw className="text-green-500" />},
                {label:'Warranty', value: seller.policies.warranty, icon:<Shield className="text-purple-500" />}].map(p => (
                <div key={p.label} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-2xl mb-2">{p.icon}</div>
                  <div className="font-bold text-slate-900 text-sm mb-1">{p.label}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">{p.value}</div>
                </div>
              ))}
            </div>
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
