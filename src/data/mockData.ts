// src/data/mockData.ts
// src/data/mockData.ts
import React from 'react';
import type { Product, Category, SummaryData, StockData } from '../types';
import { LeafIcon } from '../assets/icons/LeafIcon';
import { BreadIcon } from '../assets/icons/BreadIcon';
import { JuiceIcon } from '../assets/icons/JuiceIcon';
import { PepperIcon } from '../assets/icons/PepperIcon';
import { BagIcon } from '../assets/icons/BagIcon';

export const categories: Category[] = [
  { name: 'Fruits & Veges', icon: React.createElement(LeafIcon), filter: 'FRUITS & VEGES' },
  { name: 'Breads & Sweets', icon: React.createElement(BreadIcon), filter: 'BREADS' },
  { name: 'Fruits & Veges', icon: React.createElement(JuiceIcon), filter: 'JUICES' },
  { name: 'Fruits & Veges', icon: React.createElement(PepperIcon), filter: 'FRUITS & VEGES' },
  { name: 'Fruits & Veges', icon: React.createElement(LeafIcon), filter: 'FRUITS & VEGES' },
  { name: 'Fruits & Veges', icon: React.createElement(BagIcon), filter: 'JUICES' },
];

export const initialProducts: Product[] = [
  { id: 1, name: 'Sunstar Fresh Melon Juice', price: 20000, image: 'https://placehold.co/300x300/f7e281/333?text=Banana', category: 'FRUITS & VEGES' },
  { id: 2, name: 'Sunstar Fresh Melon Juice', price: 40000, image: 'https://placehold.co/300x300/F9D423/333?text=Juice', category: 'JUICES' },
  { id: 3, name: 'Sunstar Fresh Melon Juice', price: 10000, image: 'https://placehold.co/300x300/84a98c/333?text=Cucumber', category: 'FRUITS & VEGES' },
  { id: 4, name: 'Sunstar Fresh Melon Juice', price: 60000, image: 'https://placehold.co/300x300/a2d2ff/333?text=Milk', category: 'JUICES' },
  { id: 5, name: 'Sunstar Fresh Melon Juice', price: 20000, image: 'https://placehold.co/300x300/f7e281/333?text=Banana', category: 'FRUITS & VEGES' },
  { id: 6, name: 'Sunstar Fresh Melon Juice', price: 40000, image: 'https://placehold.co/300x300/F9D423/333?text=Juice', category: 'JUICES' },
  { id: 7, name: 'Sunstar Fresh Melon Juice', price: 10000, image: 'https://placehold.co/300x300/84a98c/333?text=Cucumber', category: 'FRUITS & VEGES' },
  { id: 8, name: 'Sunstar Fresh Melon Juice', price: 60000, image: 'https://placehold.co/300x300/a2d2ff/333?text=Milk', category: 'JUICES' },
  { id: 9, name: 'Fresh Bread', price: 15000, image: 'https://placehold.co/300x300/d4a373/333?text=Bread', category: 'BREADS' },
  { id: 10, name: 'Sunstar Fresh Melon Juice', price: 40000, image: 'https://placehold.co/300x300/f7e281/333?text=Banana', category: 'FRUITS & VEGES' },
];

export const summaryData: SummaryData[] = [
    { title: 'Total Semua Pendapatan', value: 'Rp. 50.000.000', icon: '💰' },
    { title: 'Stok Barang', value: '145', icon: '📦' },
    { title: 'Barang Telah Terjual', value: '290+', icon: '📈' },
    { title: 'Kategori Barang', value: '5', icon: '🏷️' },
];

export const stockData: StockData[] = [
    { name: 'Sunstar Fresh Melon Juice', stock: 80 },
    { name: 'Sunstar Fresh Fruit Juice', stock: 50 },
    { name: 'Sunstar Fresh Strawberry Juice', stock: 20 },
    { name: 'Sunstar Fresh Banana Juice', stock: 60 },
    { name: 'Chocolate', stock: 40 },
];
