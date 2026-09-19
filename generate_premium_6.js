import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');
const ensureDir = (filePath) => fs.mkdirSync(path.dirname(filePath), { recursive: true });

const files = {
  // --- PHASE 5: LISTING PAGES ---
  'pages/ProductsPage.jsx': `
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, LayoutGrid, List as ListIcon, X, SearchX } from 'lucide-react';

export default function ProductsPage({ title = "All Products", fixedCategory = null, isSearch = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [layout, setLayout] = useState('grid');
  
  // Filters
  const query = searchParams.get('q') || '';
  const categoryFilter = fixedCategory || searchParams.get('category') || 'all';
  const sortFilter = searchParams.get('sort') || 'relevance';
  
  const allBrands = [...new Set(products.map(p => p.brand))];
  const [selectedBrands, setSelectedBrands] = useState([]);
  
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [ratingFilter, setRatingFilter] = useState('0');

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location.search, fixedCategory]);

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange({ min: '', max: '' });
    setRatingFilter('0');
    if (!fixedCategory && !isSearch) {
      setSearchParams(new URLSearchParams());
    } else if (isSearch) {
      setSearchParams({ q: query });
    }
  };

  // Filter Logic
  let filtered = products;

  if (isSearch && query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) || 
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (categoryFilter && categoryFilter !== 'all') {
    filtered = filtered.filter(p => p.category === categoryFilter);
  }

  if (selectedBrands.length > 0) {
    filtered = filtered.filter(p => selectedBrands.includes(p.brand));
  }

  if (ratingFilter !== '0') {
    filtered = filtered.filter(p => p.rating >= parseFloat(ratingFilter));
  }

  if (priceRange.min) {
    filtered = filtered.filter(p => p.price >= parseInt(priceRange.min));
  }
  if (priceRange.max) {
    filtered = filtered.filter(p => p.price <= parseInt(priceRange.max));
  }

  // Sort Logic
  if (sortFilter === 'price_asc') filtered.sort((a, b) => a.price - b.price);
  if (sortFilter === 'price_desc') filtered.sort((a, b) => b.price - a.price);
  if (sortFilter === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  if (sortFilter === 'newest') filtered.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">{isSearch ? \`Search Results for "\${query}"\` : title}</h1>
          <p className="text-slate-500 mt-1">Showing {filtered.length} products</p>
        </div>
        
        <div className="flex items-center gap-4 self-start md:self-end">
          <button 
            className="md:hidden flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg font-medium text-slate-700 bg-white"
            onClick={() => setShowMobileFilters(true)}
          >
            <SlidersHorizontal size={18} /> Filters
          </button>

          <select 
            value={sortFilter}
            onChange={(e) => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set('sort', e.target.value);
              setSearchParams(newParams);
            }}
            className="border border-slate-300 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 bg-white focus:ring-primary-500 focus:border-primary-500 outline-none"
          >
            <option value="relevance">Sort by: Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Average Rating</option>
            <option value="newest">Newest Arrivals</option>
          </select>

          <div className="hidden sm:flex border border-slate-300 rounded-lg overflow-hidden bg-white">
            <button onClick={() => setLayout('grid')} className={\`p-2 \${layout === 'grid' ? 'bg-slate-100 text-primary-600' : 'text-slate-500 hover:text-slate-700'}\`}><LayoutGrid size={20}/></button>
            <button onClick={() => setLayout('list')} className={\`p-2 \${layout === 'list' ? 'bg-slate-100 text-primary-600' : 'text-slate-500 hover:text-slate-700'}\`}><ListIcon size={20}/></button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className={\`\${showMobileFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden md:block w-64 flex-shrink-0'}\`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><SlidersHorizontal size={20}/> Filters</h2>
            {showMobileFilters && <button onClick={() => setShowMobileFilters(false)} className="text-slate-500"><X size={24}/></button>}
          </div>

          <div className="space-y-8">
            {(!fixedCategory && !isSearch) && (
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-900 mb-4 pb-2 border-b">Categories</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="category" checked={categoryFilter === 'all'} onChange={() => setSearchParams({ category: 'all' })} className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded" />
                    <span className="text-sm text-slate-700 group-hover:text-primary-600">All Categories</span>
                  </label>
                  {categories.filter(c=>c.id !== 'books' && c.id !== 'toys').map(c => (
                    <label key={c.id} className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="category" checked={categoryFilter === c.id} onChange={() => setSearchParams({ category: c.id })} className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded" />
                      <span className="text-sm text-slate-700 group-hover:text-primary-600">{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-900 mb-4 pb-2 border-b">Brands</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                {allBrands.sort().map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded rounded-sm" />
                    <span className="text-sm text-slate-700 group-hover:text-primary-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-900 mb-4 pb-2 border-b">Price Range</h3>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" value={priceRange.min} onChange={e => setPriceRange({...priceRange, min: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-primary-500 outline-none" />
                <span className="text-slate-400">-</span>
                <input type="number" placeholder="Max" value={priceRange.max} onChange={e => setPriceRange({...priceRange, max: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-primary-500 outline-none" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-900 mb-4 pb-2 border-b">Rating</h3>
              <div className="space-y-3">
                {[4, 3, 2, 0].map(rating => (
                  <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="rating" checked={ratingFilter === String(rating)} onChange={() => setRatingFilter(String(rating))} className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded" />
                    <span className="text-sm text-slate-700 group-hover:text-primary-600 flex items-center">
                      {rating === 0 ? 'Any Rating' : <>{rating}★ & above</>}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button onClick={clearFilters} className="w-full border border-slate-300 text-slate-700 bg-slate-50 py-2.5 rounded-lg font-bold hover:bg-slate-100 transition-colors">
              Clear All Filters
            </button>
            {showMobileFilters && (
               <button onClick={() => setShowMobileFilters(false)} className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold mt-2 md:hidden">
                Apply Filters
              </button>
            )}
          </div>
        </div>

        {/* Main Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className={\`grid gap-6 \${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}\`}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className={\`bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse \${layout === 'list' ? 'flex h-56' : ''}\`}>
                  <div className={\`bg-slate-200 \${layout === 'list' ? 'w-1/3 h-full' : 'aspect-square w-full'}\`}></div>
                  <div className={\`p-4 space-y-4 \${layout === 'list' ? 'flex-1 py-8' : ''}\`}>
                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-8 bg-slate-200 rounded w-1/2 mt-8"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <SearchX size={48} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">We couldn't find anything matching your current filters. Try adjusting them or clearing some options.</p>
              <button onClick={clearFilters} className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={\`grid gap-6 \${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}\`}>
              {filtered.map(p => <ProductCard key={p.id} product={p} layout={layout} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`,
  'pages/SearchPage.jsx': `
import React from 'react';
import ProductsPage from './ProductsPage';

export default function SearchPage() {
  return <ProductsPage isSearch={true} />;
}
`,
  'pages/CategoryPage.jsx': `
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import { categories } from '../data/categories';

export default function CategoryPage() {
  const { id } = useParams();
  const category = categories.find(c => c.id === id);
  
  if (!category) return <div className="p-24 text-center text-xl text-slate-500">Category not found</div>;

  return (
    <>
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 flex items-center gap-6">
          <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-slate-700">
            {category.icon}
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">{category.name}</h1>
            <p className="text-slate-400 mt-2 font-medium">Explore the best products in {category.name}</p>
          </div>
        </div>
      </div>
      <ProductsPage fixedCategory={id} title={category.name} />
    </>
  );
}
`,
  'pages/ProductDetailPage.jsx': `
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import { Star, Heart, ShoppingCart, Share2, MapPin, ShieldCheck, ArrowRightLeft, CreditCard, ChevronRight } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  
  const product = products.find(p => p.id === id);
  
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  
  useEffect(() => {
    if (product) setActiveImage(0);
    window.scrollTo(0,0);
  }, [id, product]);

  if (!product) return <div className="p-24 text-center text-2xl text-slate-500 font-medium">Product not found</div>;

  const isWished = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate('/checkout');
  };

  const handlePincodeCheck = () => {
    if(pincode.length === 6) {
      setDeliveryEstimate('Delivery by Tomorrow, ' + new Date(Date.now() + 86400000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }));
      showToast('Delivery available in your area', 'success');
    } else {
      showToast('Please enter a valid 6-digit PIN code', 'error');
    }
  };

  const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 pt-4 pb-4">
        <div className="max-w-7xl mx-auto px-4 text-sm text-slate-500 flex items-center gap-2">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight size={14} />
          <Link to={\`/category/\${product.category}\`} className="hover:text-primary-600 capitalize">{product.category}</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 mb-12">
          
          {/* Left: Images */}
          <div className="w-full lg:w-5/12 flex gap-4 lg:sticky lg:top-24 self-start">
            <div className="flex flex-col gap-3 w-16 sm:w-20 flex-shrink-0">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onMouseEnter={() => setActiveImage(idx)}
                  onClick={() => setActiveImage(idx)}
                  className={\`w-full aspect-square rounded-xl border-2 overflow-hidden \${activeImage === idx ? 'border-primary-500 shadow-md' : 'border-slate-200 hover:border-primary-300'} transition-all\`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover mix-blend-multiply" />
                </button>
              ))}
            </div>
            
            <div className="flex-1 relative aspect-square bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center p-8 overflow-hidden group">
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
              
              <button 
                onClick={() => toggleWishlist(product)}
                className={\`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg \${isWished ? 'text-red-500' : 'text-slate-400 hover:text-red-500'} transition-all z-10\`}
              >
                <Heart size={24} fill={isWished ? "currentColor" : "none"} className={isWished ? "scale-110" : ""} />
              </button>
            </div>
          </div>

          {/* Right: Details */}
          <div className="w-full lg:w-7/12 flex flex-col">
            <Link to={\`/search?q=\${product.brand}\`} className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-2 hover:underline">{product.brand}</Link>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
              <div className="flex items-center bg-green-700 text-white px-2.5 py-1 rounded-lg text-sm font-bold gap-1 shadow-sm">
                {product.rating} <Star size={14} fill="currentColor" />
              </div>
              <a href="#reviews" onClick={() => setActiveTab('reviews')} className="text-sm font-medium text-primary-600 hover:underline">
                {product.reviewCount.toLocaleString()} Ratings & Reviews
              </a>
            </div>

            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">₹{product.price.toLocaleString()}</span>
              {product.mrp > product.price && (
                <>
                  <span className="text-xl text-slate-400 line-through mb-1">₹{product.mrp.toLocaleString()}</span>
                  <span className="text-lg font-black text-orange-500 mb-1">{product.discount}% OFF</span>
                </>
              )}
            </div>
            <div className="text-xs font-medium text-slate-500 mb-6 uppercase tracking-wider">Inclusive of all taxes</div>

            {/* Offers Box */}
            <div className="bg-yellow-50/80 border border-yellow-200 rounded-xl p-5 mb-8 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm"><CreditCard size={18} className="text-yellow-600"/> Available Offers</h4>
              <ul className="space-y-2 text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div> <span className="font-bold text-slate-900">Bank Offer:</span> 10% off on HDFC Bank Credit Card EMI</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div> <span className="font-bold text-slate-900">EMI:</span> No Cost EMI starting from ₹{(product.price/3).toFixed(0)}/month</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div> <span className="font-bold text-slate-900">Special:</span> Get extra 5% off (price inclusive of cashback/coupon)</li>
              </ul>
            </div>

            {/* Delivery */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8 p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-3"><MapPin size={18} className="text-slate-500"/> Delivery Options</div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter PIN Code" 
                    maxLength={6}
                    value={pincode}
                    onChange={e => setPincode(e.target.value.replace(/\\D/g, ''))}
                    className="flex-1 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 font-medium outline-none shadow-inner bg-white"
                  />
                  <button onClick={handlePincodeCheck} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm">Check</button>
                </div>
                {deliveryEstimate && <div className="text-green-600 text-sm font-bold mt-3 bg-green-50 px-3 py-2 rounded border border-green-100 flex items-center gap-2"><Truck size={16}/> {deliveryEstimate}</div>}
              </div>
              
              <div className="hidden sm:block w-px bg-slate-200"></div>
              
              <div className="flex-1 pt-2 sm:pt-0">
                <div className="font-bold text-slate-900 mb-1">Status</div>
                {product.stock > 0 ? (
                  <div className="text-green-600 font-black text-lg">In Stock</div>
                ) : (
                  <div className="text-red-500 font-black text-lg">Out of Stock</div>
                )}
                <div className="text-xs font-medium text-slate-500 mt-2">Ships from and sold by <Link to={\`/seller/\${product.seller}\`} className="text-primary-600 hover:underline">{product.sellers[0].name}</Link></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border-2 border-slate-200 rounded-xl bg-white shadow-sm h-14">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-5 text-xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 h-full rounded-l-xl transition-colors">-</button>
                <div className="w-12 text-center font-bold text-lg text-slate-900">{qty}</div>
                <button onClick={() => setQty(qty + 1)} className="px-5 text-xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 h-full rounded-r-xl transition-colors">+</button>
              </div>
              <button 
                onClick={() => addToCart(product, qty)} 
                disabled={product.stock === 0}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
              >
                <ShoppingCart size={20}/> Add to Cart
              </button>
            </div>
            
            <button 
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="w-full bg-accent-500 hover:bg-accent-600 text-white h-14 rounded-xl font-bold text-lg mb-8 shadow-lg shadow-accent-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
            >
              Buy Now
            </button>

            {/* Trust Features */}
            <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-6 mt-auto">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><ArrowRightLeft size={20}/></div>
                <span className="text-xs font-semibold text-slate-600">7 Days Return</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><ShieldCheck size={20}/></div>
                <span className="text-xs font-semibold text-slate-600">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><CreditCard size={20}/></div>
                <span className="text-xs font-semibold text-slate-600">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div id="reviews" className="bg-white rounded-3xl shadow-sm border border-slate-200 mb-12 overflow-hidden">
          <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200 bg-slate-50">
            {['description', 'specifications', 'reviews', 'sellers'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={\`flex-1 py-5 px-6 font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-colors \${activeTab === tab ? 'bg-white text-primary-600 border-t-2 border-primary-600' : 'text-slate-500 hover:text-slate-900 border-t-2 border-transparent'}\`}
              >
                {tab === 'sellers' ? 'Other Sellers' : tab}
              </button>
            ))}
          </div>
          
          <div className="p-8 lg:p-12">
            {activeTab === 'description' && (
              <div className="max-w-3xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Product Description</h3>
                <p className="text-slate-700 leading-relaxed mb-8 text-lg">{product.description}</p>
                
                <h4 className="text-xl font-bold text-slate-900 mb-4">Key Features</h4>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 size={14}/></div>
                      <span className="text-slate-700 font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="max-w-3xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Technical Specifications</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, val], i) => (
                        <tr key={key} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          <th className="py-4 px-6 font-semibold text-slate-700 w-1/3 border-b border-slate-200">{key}</th>
                          <td className="py-4 px-6 text-slate-600 font-medium border-b border-slate-200">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex flex-col md:flex-row gap-12 max-w-4xl">
                  {/* Rating Summary */}
                  <div className="w-full md:w-1/3 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Customer Reviews</h3>
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                      <span className="text-6xl font-black text-slate-900">{product.rating}</span>
                      <div className="flex flex-col">
                        <div className="flex text-yellow-400 mb-1">
                          {[1,2,3,4,5].map(s => <Star key={s} size={20} fill={s <= Math.round(product.rating) ? "currentColor" : "none"} className={s <= Math.round(product.rating) ? "" : "text-slate-300"} />)}
                        </div>
                        <span className="text-sm font-medium text-slate-500">{product.reviewCount.toLocaleString()} global ratings</span>
                      </div>
                    </div>
                    {/* Mock Progress Bars */}
                    <div className="space-y-2 mt-6">
                      {[{star: 5, pct: 65}, {star: 4, pct: 20}, {star: 3, pct: 10}, {star: 2, pct: 3}, {star: 1, pct: 2}].map(r => (
                        <div key={r.star} className="flex items-center gap-3">
                          <span className="text-sm font-bold text-primary-600 hover:underline cursor-pointer w-12 text-right">{r.star} star</span>
                          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <div className="h-full bg-yellow-400 rounded-full" style={{width: \`\${r.pct}%\`}}></div>
                          </div>
                          <span className="text-xs font-medium text-slate-500 w-8">{r.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Individual Reviews */}
                  <div className="w-full md:w-2/3 space-y-6">
                    {[
                      {name: 'Ankit Mishra', rating: 5, title: 'Excellent product, highly recommended!', date: '12 Oct 2024', comment: 'I have been using this for a week and it totally exceeded my expectations. The build quality is premium.'},
                      {name: 'Sneha Reddy', rating: 4, title: 'Good value for money', date: '05 Sep 2024', comment: 'Does exactly what it says. Deducting one star because delivery was delayed by a day.'},
                      {name: 'Mohit Sharma', rating: 5, title: 'Best in this price segment', date: '21 Aug 2024', comment: 'I researched a lot before buying this and I\\'m glad I chose it. You won\\'t find anything better at this price.'}
                    ].map((rev, i) => (
                      <div key={i} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">{rev.name[0]}</div>
                          <div>
                            <div className="font-bold text-slate-900">{rev.name}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-1">Verified Purchase • {rev.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                           <div className="flex text-yellow-400"><Star size={14} fill="currentColor"/></div>
                           <span className="font-bold text-slate-900">{rev.title}</span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Other Sellers */}
            {activeTab === 'sellers' && (
              <div className="max-w-4xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Other Sellers on BazaarHub</h3>
                <p className="text-slate-500 mb-8">Compare prices and delivery options from verified sellers.</p>
                
                <div className="space-y-4">
                  {product.sellers.map((s, i) => (
                    <div key={s.id} className={\`p-6 rounded-2xl border \${i === 0 ? 'border-primary-500 bg-primary-50 shadow-md relative' : 'border-slate-200 bg-white shadow-sm'} flex flex-col sm:flex-row items-center justify-between gap-6\`}>
                      {i === 0 && <span className="absolute -top-3 left-6 bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Current Buy Box</span>}
                      
                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                          <Link to={\`/seller/\${s.id}\`} className="font-black text-xl text-slate-900 hover:text-primary-600 hover:underline">{s.name}</Link>
                          <ShieldCheck size={16} className="text-green-500" />
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-1 text-sm font-medium text-slate-600">
                           <span className="flex items-center text-yellow-500 gap-0.5">{s.rating} <Star size={12} fill="currentColor"/></span>
                           <span className="mx-2">•</span>
                           <span>{s.delivery === 'Tomorrow' ? <span className="text-green-600 font-bold">Delivery Tomorrow</span> : \`Delivery in \${s.delivery}\`}</span>
                        </div>
                      </div>
                      
                      <div className="text-3xl font-black text-slate-900 text-center sm:text-right">
                        ₹{s.price.toLocaleString()}
                      </div>
                      
                      <button 
                        onClick={() => { addToCart({...product, price: s.price, seller: s.id}); navigate('/cart'); }}
                        className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-slate-900">You may also like</h2>
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-6 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            {similarProducts.map(p => (
              <div key={p.id} className="w-64 flex-shrink-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Icon helper for descriptions
function CheckCircle2({ size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  );
}
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(srcDir, filepath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content);
});
console.log("Phase 5 (Listing & Detail Pages) Generation Complete");
