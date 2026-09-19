
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
