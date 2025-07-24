import React, { useState, useEffect, useCallback } from 'react';
import { ProductCard } from '../../components/product/ProductCard';
import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import type { Product, CartItem, Category, PaginatedResponse } from '../../types';
import apiService from '../../services/api';
import { LoadingSpinner, ErrorMessage } from '../../components/ui/FeedbackComponents';
import { LeafIcon, BreadIcon, JuiceIcon, PepperIcon, BagIcon } from '../../assets/icons/index';


// Data kategori sekarang menjadi data statis di dalam komponen
const staticCategories: Category[] = [
  { name: 'Fruits & Veges', icon: <LeafIcon />, filter: 'FRUITS & VEGES' },
  { name: 'Breads & Sweets', icon: <BreadIcon />, filter: 'BREADS' },
  { name: 'Fruits & Veges', icon: <JuiceIcon />, filter: 'JUICES' },
  { name: 'Fruits & Veges', icon: <PepperIcon />, filter: 'FRUITS & VEGES' },
  { name: 'Fruits & Veges', icon: <LeafIcon />, filter: 'FRUITS & VEGES' },
  { name: 'Fruits & Veges', icon: <BagIcon />, filter: 'JUICES' },
];

interface CustomerViewProps {
    cartItems: CartItem[];
    onAddToCart: (product: Product, quantity: number) => void;
    onToggleCart: () => void;
}

export const CustomerView: React.FC<CustomerViewProps> = ({ cartItems, onAddToCart, onToggleCart }) => {
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
  
  const filteredProducts = products; // Filtering sudah dilakukan di backend

  return (
    <div className="bg-white min-h-screen font-sans">
      <Header 
        cartItems={cartItems} 
        onToggleCart={onToggleCart} 
        onSearch={setSearchQuery}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Category</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {staticCategories.map((cat: Category, index: number) => (
              <button key={index} className={`flex flex-col items-center space-y-2 p-4 rounded-lg border bg-white border-gray-200 hover:shadow-md`}>
                <div className="w-16 h-16 flex items-center justify-center">{cat.icon}</div>
                <p className="text-sm font-medium text-center text-gray-700">{cat.name}</p>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Barang</h2>
          </div>
          
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          
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
