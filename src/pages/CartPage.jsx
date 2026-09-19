
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { LuShoppingCart as ShoppingCart, LuShieldCheck as ShieldCheck, LuTag as Tag, LuTrash2 as Trash2, LuArrowRight as ArrowRight } from 'react-icons/lu';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, applyCoupon, removeCoupon, coupon, totalItems, totalPrice, finalPrice, itemDiscount, couponDiscount } = useCart();
  const { showToast } = useToast();
  
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if(!couponInput.trim()) return;
    if(applyCoupon(couponInput)) setCouponInput('');
  };

  const handleSaveForLater = (id) => {
    removeFromCart(id);
    showToast('Saved for later', 'info');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
          <ShoppingCart size={64} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4">Your cart is empty!</h1>
        <p className="text-lg text-slate-500 mb-8 max-w-md mx-auto">Explore our wide selection and find something you like.</p>
        <Link to="/products" className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-200 transition-all hover:-translate-y-1 inline-block">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl font-black text-slate-900 mb-8">Shopping Cart ({totalItems} items)</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              {items.map((item, idx) => (
                <div key={item.id} className={`p-6 flex flex-col sm:flex-row gap-6 ${idx !== items.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <Link to={`/product/${item.id}`} className="w-full sm:w-32 h-32 bg-slate-50 rounded-xl flex items-center justify-center p-2 border border-slate-100 group">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </Link>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-1">
                      <Link to={`/product/${item.id}`} className="text-lg font-bold text-slate-900 hover:text-primary-600 leading-tight">{item.name}</Link>
                      <div className="text-right">
                        <div className="text-xl font-black text-slate-900">₹{(item.price * item.quantity).toLocaleString()}</div>
                        {item.mrp > item.price && <div className="text-sm text-slate-400 line-through">₹{(item.mrp * item.quantity).toLocaleString()}</div>}
                      </div>
                    </div>
                    
                    <div className="text-sm text-slate-500 mb-4">
                      Sold by: <Link to={`/seller/${item.seller || 'v1'}`} className="text-primary-600 hover:underline">{item.brand}</Link>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white h-10 w-28">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex-1 text-slate-500 hover:text-slate-900 hover:bg-slate-50 h-full rounded-l-lg font-medium">-</button>
                        <div className="w-8 text-center font-bold text-sm text-slate-900">{item.quantity}</div>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex-1 text-slate-500 hover:text-slate-900 hover:bg-slate-50 h-full rounded-r-lg font-medium">+</button>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm font-medium">
                        <button onClick={() => handleSaveForLater(item.id)} className="text-slate-500 hover:text-primary-600 transition-colors">Save for later</button>
                        <div className="w-px h-4 bg-slate-300"></div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"><Trash2 size={16}/> Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center text-sm font-bold">
              <Link to="/products" className="text-primary-600 hover:underline">← Continue Shopping</Link>
              <span className="text-slate-500 flex items-center gap-1"><ShieldCheck size={16}/> Secure Checkout</span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm sticky top-24">
              <h2 className="text-xl font-black text-slate-900 mb-6 border-b border-slate-100 pb-4">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Price ({totalItems} items)</span>
                  <span className="font-medium text-slate-900">₹{(totalPrice + itemDiscount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">- ₹{itemDiscount.toLocaleString()}</span>
                </div>
                {coupon && (
                   <div className="flex justify-between text-green-600">
                    <span>Coupon ({coupon.code})</span>
                    <span className="font-medium">- ₹{couponDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charges</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              </div>
              
              <div className="border-t border-slate-100 py-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total Amount</span>
                  <span className="text-2xl font-black text-slate-900">₹{finalPrice.toLocaleString()}</span>
                </div>
                <div className="text-xs font-bold text-green-600 mt-2 text-right">You will save ₹{(itemDiscount + couponDiscount).toLocaleString()} on this order</div>
              </div>

              {/* Coupon Section */}
              <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3"><Tag size={16}/> Apply Coupon</div>
                {coupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">{coupon.code}</span>
                      <span className="text-sm font-medium text-green-700">Applied</span>
                    </div>
                    <button onClick={removeCoupon} className="text-red-500 hover:text-red-600 text-sm font-bold">Remove</button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Enter code (e.g. SAVE10)" 
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-primary-500 uppercase font-medium bg-white outline-none"
                    />
                    <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">Apply</button>
                  </form>
                )}
                <div className="text-[10px] text-slate-500 mt-2 font-medium">Available mock codes: SAVE10, FIRST50, BAZAAR20</div>
              </div>

              <button 
                onClick={() => navigate('/checkout')} 
                className="w-full bg-accent-500 hover:bg-accent-600 text-white h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-accent-200 transition-all hover:-translate-y-0.5"
              >
                Proceed to Checkout <ArrowRight size={20}/>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
