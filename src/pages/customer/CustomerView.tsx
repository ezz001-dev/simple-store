import React, { useState, useEffect, useCallback } from 'react';
import { ProductCard } from '../../components/product/ProductCard';
import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import type { Product, CartItem, Category, PaginatedResponse, User } from '../../types';
import apiService from '../../services/api';
import { LoadingSpinner, ErrorMessage } from '../../components/ui/FeedbackComponents';
import { Apple, CakeSlice, GlassWater, Carrot, ShoppingBag, Popcorn } from 'lucide-react';

// Data kategori sekarang menggunakan ikon dari Lucide
const staticCategories: Category[] = [
  { name: 'Fruits & Veges', icon: <Apple size={32} className="text-gray-600" />, filter: 'FRUITS & VEGES' },
  { name: 'Breads & Sweets', icon: <CakeSlice size={32} className="text-gray-600" />, filter: 'BREADS' },
  { name: 'Juices', icon: <GlassWater size={32} className="text-gray-600" />, filter: 'JUICES' },
  { name: 'Vegetables', icon: <Carrot size={32} className="text-gray-600" />, filter: 'FRUITS & VEGES' },
  { name: 'Groceries', icon: <ShoppingBag size={32} className="text-gray-600" />, filter: 'GROCERIES' },
  { name: 'Snacks', icon: <Popcorn size={32} className="text-gray-600" />, filter: 'SNACKS' },
];

interface CustomerViewProps {
    user: User | null;
    cartItems: CartItem[];
    isCartShaking: boolean;
    onAddToCart: (product: Product, quantity: number) => void;
    onToggleCart: () => void;
    onLogout: () => void;
}

export const CustomerView: React.FC<CustomerViewProps> = ({ user, cartItems, onAddToCart, onToggleCart, onLogout , isCartShaking }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

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
  
  const filteredProducts = products;

  return (
    <div className="bg-white min-h-screen font-sans">
      <Header 
        user={user}
        cartItems={cartItems} 
        onToggleCart={onToggleCart} 
        onSearch={setSearchQuery}
        onLogout={onLogout}
        isCartShaking={isCartShaking}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Category</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {staticCategories.map((cat: Category, index: number) => (
              <button key={index} className={`flex flex-col items-center space-y-2 p-2 sm:p-4 rounded-lg border bg-white border-gray-200 hover:shadow-md`}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">{cat.icon}</div>
                <p className="text-xs sm:text-sm font-medium text-center text-gray-700">{cat.name}</p>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h2 className="text-2xl font-bold">Barang</h2>
            <div className="flex space-x-2 flex-wrap">
              <button onClick={() => setActiveFilter('ALL')} className={`px-4 py-1 rounded-full text-sm font-semibold ${activeFilter === 'ALL' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>ALL</button>
              <button onClick={() => setActiveFilter('FRUITS & VEGES')} className={`px-4 py-1 rounded-full text-sm font-semibold ${activeFilter === 'FRUITS & VEGES' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>FRUITS & VEGES</button>
              <button onClick={() => setActiveFilter('JUICES')} className={`px-4 py-1 rounded-full text-sm font-semibold ${activeFilter === 'JUICES' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>JUICES</button>
            </div>
          </div>
          
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          
          {!isLoading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
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
