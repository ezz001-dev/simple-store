// src/types/index.ts
import React from 'react';

/**
 * Mendefinisikan struktur objek untuk sebuah produk.
 */
export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string | number;
  stock: number;
  image_url: string | null;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
}

/**
 * Mendefinisikan struktur objek untuk kategori produk.
 */
export interface Category {
  name: string;
  icon: React.ReactNode;
  filter: string;
}

/**
 * Mendefinisikan struktur item di dalam keranjang belanja,
 * yang merupakan perluasan dari objek Product dengan tambahan kuantitas.
 */
export interface CartItem extends Product {
  quantity: number;
  // price : number;
}

/**
 * Mendefinisikan struktur untuk kartu ringkasan di dasbor admin.
 */
export interface SummaryData {
    title: string;
    value: string;
    icon: string;
}

/**
 * Mendefinisikan struktur untuk data stok di dasbor admin.
 */
export interface StockData {
    name: string;
    stock: number;
}


export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

// Order Detail 
export interface OrderDetail {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: string;
    product: {
        id: number;
        name: string;
    }
}

// Order , sesuai response API
export interface Order {
    id: number;
    user_id: number;
    total_amount: string;
    status: string;
    payment_method: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    details: OrderDetail[];
}