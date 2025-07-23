// src/types/index.ts
import React from 'react';

/**
 * Mendefinisikan struktur objek untuk sebuah produk.
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
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