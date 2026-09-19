
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function OrderSuccessPage() {
  const { showToast } = useToast();
  const orderId = 'ORD-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
  
  useEffect(() => {
    window.scrollTo(0,0);
    showToast('Order confirmed successfully!', 'success');
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 text-center relative overflow-hidden">
        
        {/* Animated Check */}
        <div className="w-24 h-24 mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
          <div className="relative w-full h-full bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-white animate-[drawCheck_0.5s_ease-out_forwards]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" style={{ strokeDasharray: 50, strokeDashoffset: 50 }} />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Order Placed Successfully! <LuPartyPopper className="inline ml-2 text-yellow-500" size={32}/></h1>
        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">Thank you for shopping at BazaarHub. Your order is confirmed and will be shipped shortly.</p>
        
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left mb-8 max-w-md mx-auto">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
            <span className="font-bold text-slate-500">Order ID</span>
            <span className="font-black text-slate-900">{orderId}</span>
          </div>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
             <span className="font-bold text-slate-500">Estimated Delivery</span>
             <span className="font-black text-green-600">Tomorrow by 10 PM</span>
          </div>
          <div className="flex justify-between items-center">
             <span className="font-bold text-slate-500">Payment</span>
             <span className="font-bold text-slate-900">Paid securely via UPI</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/orders" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors">
            View My Orders
          </Link>
          <Link to="/" className="bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-8 py-4 rounded-xl font-bold text-lg transition-colors">
            Continue Shopping
          </Link>
        </div>

        <style>{'\
          @keyframes drawCheck {\
            to { stroke-dashoffset: 0; }\
          }\
        '}</style>
      </div>
    </div>
  );
}
