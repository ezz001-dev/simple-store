// src/components/cart/CartSidebar.tsx
import React from 'react';
import type { CartItem } from '../../types';

interface CartSidebarProps {
    cartItems: CartItem[];
    onRemoveItem: (productId: number) => void;
    onClose: () => void;
    onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ cartItems, onRemoveItem, onClose, onCheckout }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
    <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 translate-x-0">
        {/* Konten sidebar keranjang */}
    </div>
    );
};