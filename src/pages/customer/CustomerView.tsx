// src/pages/customer/CustomerView.tsx
import React, { useState, useMemo } from 'react';
import { ProductCard } from '../../components/product/ProductCard';
import { initialProducts, categories } from '../../data/mockData';
import type { Product, CartItem } from '../../types';
// Import komponen Header, Footer, dll.

interface CustomerViewProps {
    onAddToCart: (product: Product, quantity: number) => void;
    // properti lainnya
}

export const CustomerView: React.FC<CustomerViewProps> = ({ onAddToCart }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter(p => activeFilter === 'ALL' || p.category === activeFilter)
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [activeFilter, searchTerm]);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Header akan diimpor dan digunakan di sini */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Category</h2>
          {/* Komponen CategoryList akan digunakan di sini */}
        </section>
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Barang</h2>
            {/* Filter buttons */}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>
      </main>
      {/* Footer akan diimpor dan digunakan di sini */}
    </div>
  );
};