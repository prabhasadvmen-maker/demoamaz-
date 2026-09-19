
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockOrders } from '../data/orders';
import { LuPackage as Package, LuTruck as Truck, LuCircleCheck as CheckCircle2, LuCircleX as XCircle, LuSearchX as SearchX } from 'react-icons/lu';

export default function OrdersPage() {
  const [tab, setTab] = useState('All');
  
  const filtered = tab === 'All'
    ? mockOrders
    : mockOrders.filter(o => o.status.toLowerCase() === tab.toLowerCase());

  const tabCounts = {
    All: mockOrders.length,
    Processing: mockOrders.filter(o => o.status === 'processing').length,
    Shipped: mockOrders.filter(o => o.status === 'shipped').length,
    Delivered: mockOrders.filter(o => o.status === 'delivered').length,
    Cancelled: mockOrders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-black text-slate-900 mb-8">My Orders</h1>
        
        <div className="flex gap-2 border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
          {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 font-bold whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 ${
                tab === t ? 'text-primary-600 border-primary-600' : 'text-slate-500 border-transparent hover:text-slate-900'
              }`}
            >
              {t}
              {tabCounts[t] > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  tab === t ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 text-slate-500'
                }`}>{tabCounts[t]}</span>
              )}
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
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                        order.status === 'shipped' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
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
                           <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <Link to={`/product/${p.productId}`} className="font-bold text-slate-900 hover:text-primary-600 line-clamp-1">{p.name}</Link>
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
                     <Link to={`/orders/${order.id}`} className="w-full text-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">
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
