import React, { useState } from 'react';
import type { Product } from '../../types';

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

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <img src={product.image} alt={product.name} className="w-full h-36 object-contain" />
      </div>
      <div className="p-4 pt-0">
        <h3 className="text-md font-semibold text-gray-800 h-12">{product.name}</h3>
        <p className="text-lg font-bold text-gray-800 mt-2">
          Rp. {product.price.toLocaleString('id-ID')}
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