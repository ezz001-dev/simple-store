// src/pages/customer/CustomerView.tsx
import React, { useState, useMemo } from 'react';
import { initialProducts, categories } from '../../data/mockData';
import type { Product, CartItem , Category } from '../../types';

import { ProductCard } from '../../components/product/ProductCard';
import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';

interface CustomerViewProps {
    cartItems: CartItem[];
    onAddToCart: (product: Product, quantity: number) => void;
    onToggleCart: () => void;
}

export const CustomerView: React.FC<CustomerViewProps> = ({ cartItems, onAddToCart, onToggleCart }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter(p => activeFilter === 'ALL' || p.category === activeFilter)
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [activeFilter, searchTerm]);

  return (
   <div className="bg-white min-h-screen font-sans">
      <Header cartItems={cartItems} onToggleCart={onToggleCart} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Category</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {categories.map((cat: Category, index: number) => (
              <button key={index} onClick={() => setActiveFilter(cat.filter)} className={`flex flex-col items-center space-y-2 p-4 rounded-lg border ${activeFilter === cat.filter ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200 hover:shadow-md'}`}>
                <div className="w-16 h-16 flex items-center justify-center">
                  {cat.icon}
                </div>
                <p className="text-sm font-medium text-center text-gray-700">{cat.name}</p>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Barang</h2>
            <div className="flex space-x-2">
              <button onClick={() => setActiveFilter('ALL')} className={`px-4 py-1 rounded-full text-sm font-semibold ${activeFilter === 'ALL' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>ALL</button>
              <button onClick={() => setActiveFilter('FRUITS & VEGES')} className={`px-4 py-1 rounded-full text-sm font-semibold ${activeFilter === 'FRUITS & VEGES' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>FRUITS & VEGES</button>
              <button onClick={() => setActiveFilter('JUICES')} className={`px-4 py-1 rounded-full text-sm font-semibold ${activeFilter === 'JUICES' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>JUICES</button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};