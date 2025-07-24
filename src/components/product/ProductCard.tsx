import React, { useState } from 'react';
import type { Product } from '../../types';
import { API_BASE_URL_STORAGE } from '../../services/api';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  const imageUrl = product.image_url 
    ? `${API_BASE_URL_STORAGE}${product.image_url}` 
    : `https://placehold.co/300x300/e2e8f0/333?text=${encodeURIComponent(product.name)}`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="flex-shrink-0">
        <img src={imageUrl} alt={product.name} className="w-full object-cover" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-gray-800">{product.name}</h3>
        <p className="text-lg font-bold text-gray-800 mt-2">
          Rp {Number(product.price).toLocaleString('id-ID')}
        </p>
        <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center border border-gray-200 bg-gray-50 rounded-md">
                <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 text-lg text-gray-500 hover:bg-gray-200 rounded-l-md">-</button>
                <span className="px-3 py-1 text-md font-semibold text-gray-700">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 text-lg text-gray-500 hover:bg-gray-200 rounded-r-md">+</button>
            </div>
          <button
            onClick={handleAddToCartClick}
            className="text-sm text-gray-500 hover:text-green-600 font-medium transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};