
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { LuCircleCheck as CheckCircle2, LuMapPin as MapPin, LuTruck as Truck, LuCreditCard as CreditCard, LuShieldCheck as ShieldCheck, LuLoader as Loader2 } from 'react-icons/lu';

export default function CheckoutPage() {
  const { items, finalPrice, clearCart, totalItems } = useCart();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  if (items.length === 0 && !isProcessing) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate('/order-success');
    }, 2000);
  };

  const steps = [
    { num: 1, title: 'Address', icon: MapPin },
    { num: 2, title: 'Delivery', icon: Truck },
    { num: 3, title: 'Payment', icon: CreditCard }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 pt-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-black text-slate-900 mb-8 text-center">Secure Checkout</h1>
        
        {/* Stepper */}
        <div className="relative flex justify-between mb-12 max-w-2xl mx-auto px-4 sm:px-0">
          <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-200 -z-10 -translate-y-1/2 rounded-full"></div>
          <div 
            className="absolute top-1/2 left-0 h-1.5 bg-green-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((s, i) => (
            <div key={s.num} className="flex flex-col items-center gap-2 bg-slate-50 px-2 sm:px-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-colors duration-300 ${
                step > s.num ? 'bg-green-500 text-white' : 
                step === s.num ? 'bg-primary-600 text-white ring-4 ring-primary-100' : 
                'bg-white text-slate-400 border border-slate-200'
              }`}>
                {step > s.num ? <CheckCircle2 size={24} /> : <s.icon size={22} />}
              </div>
              <span className={`text-xs font-bold absolute -bottom-6 whitespace-nowrap ${step >= s.num ? 'text-slate-900' : 'text-slate-400'}`}>{s.title}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 mt-8 relative overflow-hidden">
          {/* Overlay when processing */}
          {isProcessing && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
              <Loader2 size={48} className="text-primary-600 animate-spin mb-4" />
              <div className="text-xl font-bold text-slate-900 mb-1">Processing Payment...</div>
              <div className="text-slate-500 font-medium">Please do not close this window</div>
            </div>
          )}

          {/* STEP 1: ADDRESS */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Delivery Address</h2>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <label className="border-2 border-primary-500 bg-primary-50 p-5 rounded-2xl cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase">Default</div>
                  <input type="radio" name="address" defaultChecked className="hidden" />
                  <div className="font-bold text-slate-900 text-lg mb-1 flex items-center justify-between">
                    Rahul Sharma <CheckCircle2 size={20} className="text-primary-500"/>
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed font-medium">
                    42, Sector 15, Spring Woods<br/>
                    Near City Mall<br/>
                    Noida, Uttar Pradesh - 201301<br/>
                    Phone: +91 9876543210
                  </div>
                </label>
                <label className="border border-slate-200 hover:border-primary-300 hover:bg-slate-50 p-5 rounded-2xl cursor-pointer transition-colors">
                  <input type="radio" name="address" className="hidden" />
                  <div className="font-bold text-slate-900 text-lg mb-1">Office</div>
                  <div className="text-sm text-slate-600 leading-relaxed font-medium">
                    Tech Park, Tower B, 4th Floor<br/>
                    Outer Ring Road<br/>
                    Bangalore, Karnataka - 560103<br/>
                    Phone: +91 9876543210
                  </div>
                </label>
              </div>

              <button
                onClick={() => { setStep(2); window.scrollTo(0,0); }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold mb-6 transition-colors"
              >
                Deliver to Selected Address
              </button>

              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                <h3 className="font-bold text-slate-900 mb-4">Add New Address</h3>
                <form onSubmit={e => { e.preventDefault(); setStep(2); window.scrollTo(0,0); }} className="grid grid-cols-2 gap-4">
                  <input required placeholder="Full Name" className="border border-slate-300 p-3 rounded-xl col-span-2 sm:col-span-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                  <input required placeholder="Mobile Number" className="border border-slate-300 p-3 rounded-xl col-span-2 sm:col-span-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                  <input required placeholder="PIN Code" className="border border-slate-300 p-3 rounded-xl col-span-2 sm:col-span-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                  <input required placeholder="City / District" className="border border-slate-300 p-3 rounded-xl col-span-2 sm:col-span-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                  <textarea required placeholder="Address (House No, Building, Street, Area)" className="border border-slate-300 p-3 rounded-xl col-span-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" rows="3"></textarea>
                  <button type="submit" className="col-span-2 bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold mt-2 transition-colors">Deliver to this Address</button>
                </form>
              </div>
            </div>
          )}
          
          {/* STEP 2: DELIVERY METHOD */}
          {step === 2 && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Choose Delivery Option</h2>
              <div className="space-y-4 mb-8">
                {[
                  { id: 'standard', name: 'Standard Delivery', desc: 'Arrives in 5-7 business days', price: 0, tag: 'Free' },
                  { id: 'express', name: 'Express Delivery', desc: 'Arrives in 2-3 business days', price: 99, tag: '₹99' },
                  { id: 'sameday', name: 'Same Day Delivery', desc: 'Arrives Today by 10 PM', price: 199, tag: '₹199' }
                ].map(opt => (
                  <label key={opt.id} className={`flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-colors ${deliveryMethod === opt.id ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-primary-200'}`}>
                    <div className="flex items-center gap-4">
                      <input 
                        type="radio" 
                        name="delivery" 
                        checked={deliveryMethod === opt.id}
                        onChange={() => setDeliveryMethod(opt.id)}
                        className="w-5 h-5 accent-primary-600" 
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-lg">{opt.name}</div>
                        <div className="text-sm font-medium text-slate-500">{opt.desc}</div>
                      </div>
                    </div>
                    <div className={`font-black ${opt.price === 0 ? 'text-green-600' : 'text-slate-900'}`}>{opt.tag}</div>
                  </label>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 py-4 rounded-xl font-bold transition-colors">Back</button>
                <button onClick={() => { setStep(3); window.scrollTo(0,0); }} className="flex-[2] bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold transition-colors">Continue to Payment</button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Method</h2>
              
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-[2] space-y-4">
                  
                  {/* UPI */}
                  <label className={`block border-2 rounded-2xl cursor-pointer overflow-hidden transition-colors ${paymentMethod === 'upi' ? 'border-primary-500 bg-primary-50/50' : 'border-slate-200'}`}>
                    <div className="p-5 flex items-center gap-4" onClick={() => setPaymentMethod('upi')}>
                      <input type="radio" checked={paymentMethod === 'upi'} onChange={() => {}} className="w-5 h-5 accent-primary-600" />
                      <div className="font-bold text-slate-900">UPI (Google Pay, PhonePe, Paytm)</div>
                    </div>
                    {paymentMethod === 'upi' && (
                      <div className="px-5 pb-5 pt-2 ml-9">
                        <div className="flex gap-2 mb-4">
                          <span className="px-3 py-1 bg-white border border-slate-200 rounded font-bold text-slate-600 text-xs">GPay</span>
                          <span className="px-3 py-1 bg-white border border-slate-200 rounded font-bold text-slate-600 text-xs">PhonePe</span>
                          <span className="px-3 py-1 bg-white border border-slate-200 rounded font-bold text-slate-600 text-xs">Paytm</span>
                        </div>
                        <input type="text" placeholder="Enter UPI ID (e.g. rahul@okicici)" className="w-full border border-slate-300 rounded-lg px-4 py-3 font-medium outline-none focus:border-primary-500" />
                      </div>
                    )}
                  </label>

                  {/* Card */}
                  <label className={`block border-2 rounded-2xl cursor-pointer overflow-hidden transition-colors ${paymentMethod === 'card' ? 'border-primary-500 bg-primary-50/50' : 'border-slate-200'}`}>
                    <div className="p-5 flex items-center gap-4" onClick={() => setPaymentMethod('card')}>
                      <input type="radio" checked={paymentMethod === 'card'} onChange={() => {}} className="w-5 h-5 accent-primary-600" />
                      <div className="font-bold text-slate-900">Credit / Debit Card</div>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="px-5 pb-5 pt-2 ml-9 space-y-4">
                        <input type="text" placeholder="Card Number" className="w-full border border-slate-300 rounded-lg px-4 py-3 font-medium outline-none focus:border-primary-500" />
                        <div className="flex gap-4">
                           <input type="text" placeholder="MM/YY" className="flex-1 border border-slate-300 rounded-lg px-4 py-3 font-medium outline-none focus:border-primary-500" />
                           <input type="text" placeholder="CVV" className="flex-1 border border-slate-300 rounded-lg px-4 py-3 font-medium outline-none focus:border-primary-500" />
                        </div>
                        <input type="text" placeholder="Name on Card" className="w-full border border-slate-300 rounded-lg px-4 py-3 font-medium outline-none focus:border-primary-500" />
                      </div>
                    )}
                  </label>
                  
                  {/* COD */}
                  <label className={`block border-2 rounded-2xl cursor-pointer overflow-hidden transition-colors ${paymentMethod === 'cod' ? 'border-primary-500 bg-primary-50/50' : 'border-slate-200'}`}>
                    <div className="p-5 flex items-center gap-4" onClick={() => setPaymentMethod('cod')}>
                      <input type="radio" checked={paymentMethod === 'cod'} onChange={() => {}} className="w-5 h-5 accent-primary-600" />
                      <div className="font-bold text-slate-900">Cash on Delivery</div>
                    </div>
                  </label>

                </div>
                
                <div className="flex-[1.5]">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">Order Summary ({totalItems} items)</h3>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-slate-600 font-medium">Total to Pay</span>
                      <span className="text-3xl font-black text-slate-900">₹{finalPrice.toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={handlePlaceOrder} 
                      className="w-full bg-accent-500 hover:bg-accent-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-accent-200 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                    >
                      <ShieldCheck size={20} /> Pay Now
                    </button>
                    <div className="text-xs text-center font-medium text-slate-500 mt-4 flex items-center justify-center gap-1">
                      <ShieldCheck size={14}/> Safe and secure payments
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="w-full mt-4 py-3 text-slate-500 font-bold hover:text-slate-900">← Back to Delivery</button>
                </div>
              </div>
            </div>
          )}

          <style>{'\
            @keyframes fadeIn {\
              from { opacity: 0; transform: translateY(10px); }\
              to { opacity: 1; transform: translateY(0); }\
            }\
          '}</style>
        </div>
      </div>
    </div>
  );
}
