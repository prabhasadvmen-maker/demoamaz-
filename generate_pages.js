import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

const files = {
  'pages/HomePage.jsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const trending = products.filter(p => p.isTrending).slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">India's Premium Marketplace</h1>
          <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">Discover top brands, exclusive deals, and fast delivery across India.</p>
          <div className="flex justify-center gap-4">
            <Link to="/products" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors">Shop Now</Link>
            <Link to="/products" className="bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors">Today's Deals</Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Shop by Category</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
          {categories.map(c => (
            <Link key={c.id} to={\`/products\`} className="flex-shrink-0 w-32 group">
              <div className="aspect-square rounded-full overflow-hidden mb-3 bg-white border border-slate-200 p-2 group-hover:border-primary-600 transition-colors">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <p className="text-center text-sm font-medium text-slate-700 group-hover:text-primary-600">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Best Sellers</h2>
          <Link to="/products" className="text-primary-600 font-medium hover:underline flex items-center gap-1">View All <ArrowRight size={16} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-2xl mb-12 border border-slate-200 shadow-sm">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Trending Now</h2>
          <Link to="/products" className="text-primary-600 font-medium hover:underline flex items-center gap-1">View All <ArrowRight size={16} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}
`,
  'pages/ProductsPage.jsx': `
import React, { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const [sort, setSort] = useState('popular');
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">All Products</h1>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-600">
          <option value="popular">Popularity</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="hidden md:block col-span-1">
          <div className="bg-white p-6 rounded-xl border border-slate-200 sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-slate-900 border-b pb-2">Filters</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2 text-slate-700">Category</h4>
                {['Electronics', 'Fashion', 'Home & Kitchen'].map(c => (
                  <label key={c} className="flex items-center gap-2 mb-1 text-sm text-slate-600">
                    <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-600" /> {c}
                  </label>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2 text-slate-700">Price</h4>
                <input type="range" className="w-full accent-primary-600" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'pages/ProductDetailPage.jsx': `
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, Shield, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <div className="p-12 text-center text-xl text-slate-500">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 bg-slate-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
            <img src={product.image} alt={product.name} className="max-w-full h-auto rounded-lg shadow-sm" />
          </div>
          <div className="p-8 flex flex-col">
            <div className="text-primary-600 font-semibold tracking-wide text-sm mb-2 uppercase">{product.brand}</div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-bold">
                {product.rating} <Star size={14} className="ml-1" fill="currentColor" />
              </div>
              <span className="text-slate-500 text-sm hover:underline cursor-pointer">{product.reviewCount} Ratings & Reviews</span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-slate-900">₹{product.price}</span>
                <span className="text-lg text-slate-400 line-through">₹{product.mrp}</span>
                <span className="text-lg font-bold text-accent-500">{product.discount}% off</span>
              </div>
              <p className="text-slate-500 text-sm mt-1">Inclusive of all taxes</p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold text-sm text-slate-900 mb-2">Description</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-auto">
              <div className="flex items-center gap-4 mb-8 pt-6 border-t border-slate-100">
                <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-slate-50 text-slate-600 transition-colors">-</button>
                  <span className="px-4 font-semibold text-slate-900 w-12 text-center">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-slate-50 text-slate-600 transition-colors">+</button>
                </div>
                <button 
                  onClick={() => addToCart(product, qty)}
                  className="flex-1 bg-primary-600 text-white font-bold py-3.5 rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30"
                >
                  Add to Cart
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900">1 Year Warranty</h4>
                    <p className="text-xs text-slate-500">Brand warranty</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="text-primary-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900">7 Days Return</h4>
                    <p className="text-xs text-slate-500">No questions asked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'pages/CartPage.jsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice, finalPrice, itemDiscount } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Let's fix that!</p>
        <Link to="/products" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Shopping Cart ({totalItems} items)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
              <Link to={\`/product/\${item.id}\`} className="w-24 h-24 bg-slate-100 rounded-lg flex-shrink-0 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <Link to={\`/product/\${item.id}\`} className="font-semibold text-slate-900 hover:text-primary-600 transition-colors line-clamp-1">{item.name}</Link>
                    <p className="text-xs text-slate-500 mt-1">{item.brand}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-slate-900">₹{item.price * item.quantity}</div>
                    {item.quantity > 1 && <div className="text-xs text-slate-500 mt-1">₹{item.price} / each</div>}
                  </div>
                </div>
                
                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center border border-slate-300 rounded-lg bg-white h-9 overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 h-full hover:bg-slate-100 text-slate-600 transition-colors font-medium">-</button>
                    <span className="px-3 h-full flex items-center font-semibold text-sm bg-slate-50 border-x border-slate-200">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 h-full hover:bg-slate-100 text-slate-600 transition-colors font-medium">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600 p-2 flex items-center gap-1.5 text-sm font-medium transition-colors rounded-lg hover:bg-red-50">
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-slate-200 sticky top-24 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-6 pb-4 border-b border-slate-100">Order Summary</h3>
            <div className="space-y-4 mb-6 text-slate-600 text-sm">
              <div className="flex justify-between">
                <span>Price ({totalItems} items)</span>
                <span className="font-medium text-slate-900">₹{totalPrice + itemDiscount}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span className="font-medium">-₹{itemDiscount}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-medium tracking-wide">FREE</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-5 border-y border-slate-100 mb-6">
              <span className="font-bold text-lg text-slate-900">Total Amount</span>
              <span className="font-extrabold text-2xl text-slate-900">₹{finalPrice}</span>
            </div>
            <button className="w-full bg-accent-500 text-white font-bold py-3.5 rounded-lg hover:bg-accent-600 transition-colors shadow-lg shadow-accent-500/30">
              Proceed to Checkout
            </button>
            <p className="text-xs text-center text-slate-500 mt-4 flex items-center justify-center gap-1">
              <Shield size={12} /> Safe and Secure Payments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(srcDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
});
console.log("Full generation step 3 complete");
