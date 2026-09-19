
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import { LuSlidersHorizontal as SlidersHorizontal, LuLayoutGrid as LayoutGrid, LuList as ListIcon, LuX as X, LuSearchX as SearchX } from 'react-icons/lu';

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
          <h1 className="text-3xl font-black text-slate-900">{isSearch ? `Search Results for "${query}"` : title}</h1>
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
            <button onClick={() => setLayout('grid')} className={`p-2 ${layout === 'grid' ? 'bg-slate-100 text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}><LayoutGrid size={20}/></button>
            <button onClick={() => setLayout('list')} className={`p-2 ${layout === 'list' ? 'bg-slate-100 text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}><ListIcon size={20}/></button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className={`${showMobileFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden md:block w-64 flex-shrink-0'}`}>
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
            <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className={`bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse ${layout === 'list' ? 'flex h-56' : ''}`}>
                  <div className={`bg-slate-200 ${layout === 'list' ? 'w-1/3 h-full' : 'aspect-square w-full'}`}></div>
                  <div className={`p-4 space-y-4 ${layout === 'list' ? 'flex-1 py-8' : ''}`}>
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
            <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filtered.map(p => <ProductCard key={p.id} product={p} layout={layout} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
