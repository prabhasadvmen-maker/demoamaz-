import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { 
  LuHeart, LuShoppingCart, LuChevronRight, LuStar, LuTruck, LuShieldCheck, 
  LuArrowRightLeft, LuCreditCard, LuHeadset, LuCheck, LuChevronLeft, 
  LuTicket, LuInfo, LuZap, LuBox, LuFlame
} from 'react-icons/lu';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [activeImage, setActiveImage] = useState(0);

  const product = products.find(p => p.id === id);

  if (!product) return <div className="p-24 text-center text-2xl text-slate-500 font-medium">Product not found</div>;

  const isWished = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 pt-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 flex flex-col lg:flex-row gap-10">
          
          {/* Left: Images */}
          <div className="w-full lg:w-[45%] flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] sm:aspect-square bg-[#f8fafc] rounded-2xl flex items-center justify-center overflow-hidden group">
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount > 0 && (
                  <span className="bg-[#ff4747] text-white text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1 shadow-sm">
                    <LuFlame size={14}/> {product.discount}% OFF
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-[#6366f1] text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm w-max">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button 
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md ${isWished ? 'text-red-500' : 'text-slate-400 hover:text-red-500'} transition-all z-10`}
              >
                <LuHeart size={20} fill={isWished ? "currentColor" : "none"} className={isWished ? "scale-110" : ""} />
              </button>

              {/* Navigation Arrows */}
              <button onClick={prevImage} className="absolute left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-slate-600 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <LuChevronLeft size={24} />
              </button>
              <button onClick={nextImage} className="absolute right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-slate-600 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <LuChevronRight size={24} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onMouseEnter={() => setActiveImage(idx)}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 sm:w-24 aspect-square rounded-xl border-2 overflow-hidden flex-shrink-0 bg-[#f8fafc] ${activeImage === idx ? 'border-blue-600' : 'border-slate-200 hover:border-blue-400'} transition-all`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="w-full lg:w-[55%] flex flex-col">
            <Link to={`/search?q=${product.brand}`} className="text-blue-600 font-bold text-sm mb-2 hover:underline">{product.brand}</Link>
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#1e293b] leading-tight mb-2 tracking-tight">{product.name}</h1>
            <p className="text-[15px] text-slate-500 mb-4">{product.description.split('.')[0]}.</p>
            
            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center bg-[#16a34a] text-white px-2 py-1 rounded text-sm font-bold gap-1 shadow-sm">
                {product.rating} <LuStar size={12} fill="currentColor" />
              </div>
              <span className="text-sm text-slate-500 font-medium">
                {product.reviewCount.toLocaleString()} ratings <span className="mx-1 text-slate-300">|</span> 1.2K reviews
              </span>
            </div>

            {/* Pricing */}
            <div className="mb-1">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-[#0f172a] tracking-tight">₹{product.price.toLocaleString()}</span>
                {product.mrp > product.price && (
                  <>
                    <span className="text-lg text-slate-400 font-medium line-through decoration-slate-300">₹{product.mrp.toLocaleString()}</span>
                    <span className="text-lg font-bold text-[#16a34a]">{product.discount}% OFF</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">Inclusive of all taxes</p>
            </div>

            {/* Special Offer */}
            <div className="mt-6 bg-[#ecfdf5] border border-[#d1fae5] rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#d1fae5] transition-colors group">
              <div className="flex items-start gap-3">
                <LuTicket size={24} className="text-[#10b981] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#065f46] text-sm">Special offer</h4>
                  <p className="text-sm text-[#064e3b] mt-0.5">Get ₹2,000 instant discount on select bank cards</p>
                </div>
              </div>
              <LuChevronRight size={20} className="text-[#059669] group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Features List */}
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#334155]">
                <LuTruck size={22} className="text-blue-600 shrink-0" />
                <span className="text-[15px]">Free delivery by <span className="font-bold text-slate-900">Tue, 12 Mar</span></span>
                <LuInfo size={16} className="text-slate-400 ml-auto cursor-help" />
              </div>
              <div className="flex items-center gap-3 text-[#334155]">
                <LuShieldCheck size={22} className="text-blue-600 shrink-0" />
                <span className="text-[15px]">1 Year Warranty by {product.brand}</span>
                <LuInfo size={16} className="text-slate-400 ml-auto cursor-help" />
              </div>
              <div className="flex items-center gap-3 text-[#334155]">
                <LuBox size={22} className="text-blue-600 shrink-0" />
                <span className="text-[15px]">7 Days Easy Return</span>
                <LuInfo size={16} className="text-slate-400 ml-auto cursor-help" />
              </div>
            </div>

            <hr className="border-slate-100 my-6" />

            {/* Sold By */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-[15px]">
                <span className="text-slate-500">Sold by</span>
                <Link to="/seller/v1" className="font-bold text-blue-600 hover:underline flex items-center gap-1">
                  {product.brand} Official Store <LuChevronRight size={16} />
                </Link>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center bg-[#16a34a] text-white px-1.5 py-0.5 rounded text-xs font-bold gap-1">
                  4.7 <LuStar size={10} fill="currentColor" />
                </div>
                <span className="text-sm text-slate-500">(1.8M+ orders)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-10">
              <button 
                onClick={() => addToCart(product, 1)}
                className="flex-1 bg-white border-2 border-blue-600 hover:bg-blue-50 text-blue-600 py-3.5 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 transition-colors"
              >
                <LuShoppingCart size={20} /> Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-[#005cff] hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
              >
                <LuZap size={20} fill="currentColor" /> Buy Now
              </button>
            </div>

            {/* Trust Footer */}
            <div className="flex justify-between items-center px-2 pt-6 border-t border-slate-100">
              <div className="flex flex-col items-center gap-2 w-1/4 text-center">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700">
                  <LuShieldCheck size={20} />
                </div>
                <span className="text-[11px] text-slate-600 font-medium leading-tight">Secure<br/>Payment</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-1/4 text-center">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700">
                  <LuArrowRightLeft size={20} />
                </div>
                <span className="text-[11px] text-slate-600 font-medium leading-tight">Easy<br/>Returns</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-1/4 text-center">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700">
                  <LuHeadset size={20} />
                </div>
                <span className="text-[11px] text-slate-600 font-medium leading-tight">24/7<br/>Support</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-1/4 text-center">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700">
                  <LuCheck size={20} />
                </div>
                <span className="text-[11px] text-slate-600 font-medium leading-tight">100%<br/>Original</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
