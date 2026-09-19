
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockOrders } from '../data/orders';
import { useToast } from '../context/ToastContext';
import { LuCircleCheck as CheckCircle2, LuCircle as Circle, LuPackage as Package, LuTruck as Truck, LuHouse as Home, LuCreditCard as CreditCard, LuMapPin as MapPin, LuChevronLeft as ChevronLeft, LuDownload as Download, LuHeadphones as Headphones } from 'react-icons/lu';

export default function OrderDetailPage() {
  const { id } = useParams();
  const { showToast } = useToast();
  const order = mockOrders.find(o => o.id === id);

  if (!order) return (
    <div className="p-24 text-center">
      <p className="text-xl text-slate-500 font-bold mb-4">Order not found</p>
      <Link to="/orders" className="text-primary-600 font-bold hover:underline">← Back to Orders</Link>
    </div>
  );

  const statusColors = {
    delivered: 'bg-green-100 text-green-700',
    shipped: 'bg-blue-100 text-blue-700',
    processing: 'bg-yellow-100 text-yellow-700',
    cancelled: 'bg-red-100 text-red-700',
    placed: 'bg-slate-100 text-slate-700',
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/orders" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 mb-6 transition-colors">
          <ChevronLeft size={16} /> Back to My Orders
        </Link>

        {/* Header Card */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white mb-1">{order.id}</h1>
            <p className="text-slate-400 text-sm font-medium">
              Placed on {new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => showToast('Invoice downloaded successfully', 'success')}
              className="flex items-center gap-2 bg-slate-800 border border-slate-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-700 transition-colors"
            >
              <Download size={16} /> Invoice
            </button>
            <button
              onClick={() => showToast('Support team will contact you shortly', 'info')}
              className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors"
            >
              <Headphones size={16} /> Help
            </button>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-6 shadow-sm">
          <h3 className="font-bold text-slate-900 text-lg mb-8">Order Tracking</h3>
          <div className="relative">
            {order.timeline.map((step, idx) => {
              const isLast = idx === order.timeline.length - 1;
              const isCurrent = step.done && (isLast || !order.timeline[idx + 1]?.done);
              return (
                <div key={idx} className="flex gap-4 relative">
                  {/* Vertical line */}
                  {!isLast && (
                    <div className={`absolute left-4 top-8 w-0.5 h-full -translate-x-1/2 ${step.done && order.timeline[idx+1]?.done ? 'bg-green-400' : 'bg-slate-200'}`} style={{height: 'calc(100% - 8px)'}} />
                  )}
                  {/* Circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 mt-0.5 ${
                    step.done ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400 border-2 border-slate-200'
                  } ${isCurrent ? 'ring-4 ring-green-100' : ''}`}>
                    {step.done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                  </div>
                  {/* Content */}
                  <div className={`pb-6 flex-1 ${isLast ? 'pb-0' : ''}`}>
                    <p className={`font-bold text-sm ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>{step.status}</p>
                    {step.date && <p className="text-xs text-slate-500 mt-0.5">{step.date}</p>}
                    {isCurrent && <span className="inline-block mt-1 text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Current Status</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Address & Payment */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <MapPin size={16} className="text-slate-400" /> Delivery Address
            </h3>
            <p className="font-bold text-slate-900">{order.address.name}</p>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              {order.address.line1}<br />
              {order.address.city}, {order.address.state} — {order.address.pincode}
            </p>
            <p className="text-sm text-slate-500 mt-2">📞 {order.address.phone}</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <CreditCard size={16} className="text-slate-400" /> Payment
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Method</span>
                <span className="font-bold text-slate-900">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className={`font-bold text-xs px-2 py-0.5 rounded-full uppercase ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {order.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 mt-2">
                <span className="font-bold text-slate-900">Total Paid</span>
                <span className="text-xl font-black text-slate-900">₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Items in this Order</h3>
          </div>
          {order.products.map((p, idx) => (
            <div key={p.productId} className={`p-6 flex items-center gap-4 ${idx !== order.products.length - 1 ? 'border-b border-slate-100' : ''}`}>
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl p-2 flex-shrink-0">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${p.productId}`} className="font-bold text-slate-900 hover:text-primary-600 line-clamp-1 transition-colors">{p.name}</Link>
                <p className="text-xs text-slate-500 mt-0.5">Sold by: {p.seller} &nbsp;•&nbsp; Qty: {p.quantity}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-black text-slate-900">₹{(p.price * p.quantity).toLocaleString()}</p>
                <p className="text-xs text-slate-400">₹{p.price.toLocaleString()} each</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
