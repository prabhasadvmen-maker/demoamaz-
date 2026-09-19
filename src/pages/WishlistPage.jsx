
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { LuHeart as Heart, LuShoppingCart as ShoppingCart } from 'react-icons/lu';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
          My Wishlist <span className="bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-full">{items.length}</span>
        </h1>
        
        {items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-16 text-center">
            <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-400">
              <Heart size={64} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Your wishlist is empty</h2>
            <p className="text-lg text-slate-500 mb-8 max-w-md mx-auto">Save items you love and buy them later.</p>
            <Link to="/products" className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-colors inline-block">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map(product => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
                <div className="mt-3">
                   <button 
                    onClick={() => handleMoveToCart(product)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <ShoppingCart size={18} /> Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
