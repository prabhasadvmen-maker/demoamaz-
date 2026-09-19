
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { LuGrid3X3 as Grid3X3 } from 'react-icons/lu';

export default function CategoriesPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
           <h1 className="text-4xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3"><Grid3X3 size={32} className="text-primary-600"/> All Categories</h1>
           <p className="text-slate-500 text-lg">Browse our wide selection of products across multiple categories</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {categories.map(c => (
            <Link key={c.id} to={`/category/${c.id}`} className="group flex flex-col items-center bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-primary-300 transition-all text-center">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-6 bg-slate-50 border-4 border-slate-100 group-hover:border-primary-100 group-hover:scale-110 transition-all shadow-sm">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-black text-lg text-slate-800 group-hover:text-primary-600 transition-colors mb-1">{c.name}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{c.count > 0 ? `${c.count} Products` : 'Coming Soon'}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
