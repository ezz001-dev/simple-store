import React, { useState, useEffect, useCallback } from 'react';
import apiService from '../../services/api';
import type { Order, PaginatedResponse } from '../../types';
import { LoadingSpinner, ErrorMessage } from '../../components/ui/FeedbackComponents';
import { TransactionDetailModal } from '../../components/admin/TransactionDetailModal'; // Impor modal baru
import { Eye } from 'lucide-react';

export const TransactionPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // State untuk modal
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Fungsi untuk mengambil data transaksi dari API
    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await apiService<PaginatedResponse<Order>>('/orders/report');
            setOrders(response.data);
        } catch (err) {
            setError('Gagal memuat data transaksi.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);
    
    // Handler untuk membuka modal detail
    const handleViewDetails = (order: Order) => {
        console.log(order)
        setSelectedOrder(order);
        setIsDetailModalOpen(true);
    };

    if (isLoading) return <div className="p-6"><LoadingSpinner /></div>;
    if (error) return <div className="p-6"><ErrorMessage message={error} /></div>;

    return (
        <>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Riwayat Transaksi</h2>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="text-left text-gray-500 border-b">
                                <th className="py-3 px-4 text-xs font-semibold uppercase">ID Order</th>
                                <th className="py-3 px-4 text-xs font-semibold uppercase">Customer</th>
                                <th className="py-3 px-4 text-xs font-semibold uppercase">Tanggal</th>
                                <th className="py-3 px-4 text-xs font-semibold uppercase">Total</th>
                                <th className="py-3 px-4 text-xs font-semibold uppercase">Status</th>
                                <th className="py-3 px-4 text-xs font-semibold uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? orders.map(order => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-4 text-sm font-medium text-gray-800">#{order.id}</td>
                                    <td className="py-4 px-4 text-sm text-gray-600">{order.user.name}</td>
                                    <td className="py-4 px-4 text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    <td className="py-4 px-4 text-sm text-gray-600">Rp {Number(order.total_amount).toLocaleString('id-ID')}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <button onClick={() => handleViewDetails(order)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 text-gray-500">Belum ada transaksi.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <TransactionDetailModal 
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                order={selectedOrder}
            />
        </>
    );
};
