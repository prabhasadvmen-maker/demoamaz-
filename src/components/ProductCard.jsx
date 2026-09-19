import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuShoppingCart, LuHeart, LuStar, LuFlame } from 'react-icons/lu';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, layout = 'grid' }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const isWished = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Reusing the same card logic for grid. (List view uses standard layout)
  if (layout === 'list') {
    return (
      <Link to={`/product/${product.id}`} className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow group relative">
        {/* Same styling for list but adapted */}
        <div className="w-full sm:w-1/3 aspect-square sm:aspect-auto sm:h-56 relative bg-[#f8fafc] flex items-center justify-center p-4">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
          <button 
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md border ${isWished ? 'text-red-500 border-red-200' : 'text-slate-400 border-slate-100 hover:text-red-500'} transition-colors`}
          >
            <LuHeart size={16} fill={isWished ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-sm font-bold text-blue-600 mb-1">{product.brand}</div>
            <h3 className="font-bold text-[#1e293b] text-lg leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center bg-[#16a34a] text-white px-1.5 py-0.5 rounded text-xs font-bold gap-0.5">
                {product.rating} <LuStar size={10} fill="currentColor" />
              </div>
              <span className="text-xs text-slate-500">({product.reviewCount.toLocaleString()})</span>
            </div>
            <p className="text-sm text-slate-500 line-clamp-2 mb-4">{product.description}</p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#0f172a]">₹{product.price.toLocaleString()}</span>
              {product.mrp > product.price && (
                <>
                  <span className="text-sm text-slate-400 line-through">₹{product.mrp.toLocaleString()}</span>
                  <span className="text-sm font-bold text-[#16a34a]">{product.discount}% OFF</span>
                </>
              )}
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-white border-2 border-blue-600 hover:bg-blue-50 text-blue-600 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors"
            >
              <LuShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.id}`} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 group flex flex-col h-full relative">
      <div className="relative aspect-square bg-[#f8fafc] flex items-center justify-center p-6 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges - Styled exactly like the screenshot */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount > 0 && (
             <span className="bg-[#ff4747] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-0.5 w-max">
               <LuFlame size={12}/> {product.discount}% OFF
             </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#6366f1] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm w-max">
              Bestseller
            </span>
          )}
        </div>
        
        <button 
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md ${isWished ? 'text-red-500' : 'text-slate-400 hover:text-red-500'} transition-all duration-200 z-10`}
        >
          <LuHeart size={16} fill={isWished ? "currentColor" : "none"} className={isWished ? "scale-110" : ""} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs font-bold text-blue-600 mb-1 hover:underline">{product.brand}</div>
        <h3 className="font-bold text-[#1e293b] text-sm leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-3 mt-auto">
          <div className="flex items-center bg-[#16a34a] text-white px-1.5 py-0.5 rounded text-[11px] font-bold gap-0.5 shadow-sm">
            {product.rating} <LuStar size={10} fill="currentColor" />
          </div>
          <span className="text-[11px] text-slate-500 font-medium">{product.reviewCount.toLocaleString()}</span>
        </div>

        <div className="flex flex-col gap-0.5 mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-[#0f172a] tracking-tight">₹{product.price.toLocaleString()}</span>
            {product.mrp > product.price && (
              <span className="text-xs font-bold text-[#16a34a]">{product.discount}% OFF</span>
            )}
          </div>
          {product.mrp > product.price && (
            <div className="text-[11px] text-slate-400 font-medium">M.R.P: <span className="line-through">₹{product.mrp.toLocaleString()}</span></div>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          className="w-full mt-auto bg-white border border-blue-600 hover:bg-blue-50 text-blue-600 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors group-hover:bg-blue-600 group-hover:text-white"
        >
          <LuShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </Link>
  );
}
