// src/pages/admin/AdminDashboard.tsx
import React from 'react';
import { summaryData, stockData } from '../../data/mockData';
import { SearchIcon } from '../../assets/icons/SearchIcon';
// Import komponen AdminSidebar, SummaryCard, dll.

export const AdminDashboard: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* AdminSidebar akan diimpor dan digunakan di sini */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white border-b">
                    <h2 className="text-xl font-semibold">Dashboard</h2>
                    <div className="flex items-center space-x-4"><SearchIcon /><span>🔔</span><span>👤</span></div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {/* Konten dasbor admin */}
                </main>
            </div>
        </div>
    );
};