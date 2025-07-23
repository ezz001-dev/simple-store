import React, { useState, useEffect, useCallback } from 'react';
import { ProductCard } from '../../components/product/ProductCard';
import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { categories } from '../../data/mockData'; // Kategori masih pakai data tiruan untuk UI
import type { Product, CartItem, Category, PaginatedResponse } from '../../types';
import apiService from '../../services/api';

interface CustomerViewProps {
    cartItems: CartItem[];
    onAddToCart: (product: Product, quantity: number) => void;
    onToggleCart: () => void;
}

export const CustomerView: React.FC<CustomerViewProps> = ({ cartItems, onAddToCart, onToggleCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = query ? `/products?search=${query}` : '/products';
      const response = await apiService<PaginatedResponse<Product>>(endpoint);
      setProducts(response.data);
    } catch (err) {
      setError('Gagal memuat produk. Silakan coba lagi nanti.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

    useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery, fetchProducts]);

  // Filter masih di client-side, bisa dioptimalkan dengan memanggil API
  const filteredProducts = activeFilter === 'ALL'
    ? products
    : products.filter(p => p.category === activeFilter);

  return (
    <div className="bg-white min-h-screen font-sans">
      <Header 
        cartItems={cartItems} 
        onToggleCart={onToggleCart} 
        onSearch={setSearchQuery} // Teruskan fungsi untuk update query
      />
      
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
          
          {isLoading && <div className="text-center col-span-full py-10">Memuat produk...</div>}
          {error && <div className="text-center col-span-full py-10 text-red-500">{error}</div>}
          
          {!isLoading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredProducts.length > 0 ? (
                 filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))
              ) : (
                <p className="col-span-full text-center py-10">Tidak ada produk yang ditemukan.</p>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};
