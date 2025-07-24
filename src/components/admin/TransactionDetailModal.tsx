import React from 'react';
import type { Order } from '../../types';
import { X } from 'lucide-react';
import { API_BASE_URL_STORAGE } from '../../services/api';

interface TransactionDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
}



export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({ isOpen, onClose, order }) => {
    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Detail Transaksi #{order.id}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Informasi Pelanggan</h4>
                            <p className="text-sm text-gray-600"><strong>Nama:</strong> {order.user.name}</p>
                            <p className="text-sm text-gray-600"><strong>Email:</strong> {order.user.email}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Informasi Pesanan</h4>
                            <p className="text-sm text-gray-600"><strong>Tanggal:</strong> {new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p className="text-sm text-gray-600"><strong>Status:</strong> <span className="capitalize font-medium">{order.status}</span></p>
                            <p className="text-sm text-gray-600"><strong>Total:</strong> <span className="font-bold">Rp {Number(order.total_amount).toLocaleString('id-ID')}</span></p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Rincian Produk</h4>
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Produk</th>
                                        <th className="p-3 text-center text-xs font-semibold text-gray-600 uppercase">Jumlah</th>
                                        <th className="p-3 text-right text-xs font-semibold text-gray-600 uppercase">Harga Satuan</th>
                                        <th className="p-3 text-right text-xs font-semibold text-gray-600 uppercase">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.details.map(detail => (
                                        <tr key={detail.id} className="border-t">
                                            <td className="p-3 flex items-center">
                                                <img 
                                                    src={detail.product.image_url ? `${API_BASE_URL_STORAGE}${detail.product.image_url}` : 'https://placehold.co/100x100/e2e8f0/333?text=N/A'} 
                                                    alt={detail.product.name}
                                                    className="h-10 w-10 object-cover rounded-md mr-3"
                                                />
                                                <span className="font-medium text-sm">{detail.product.name}</span>
                                            </td>
                                            <td className="p-3 text-center text-sm text-gray-600">{detail.quantity}</td>
                                            <td className="p-3 text-right text-sm text-gray-600">Rp {Number(detail.price).toLocaleString('id-ID')}</td>
                                            <td className="p-3 text-right text-sm font-semibold text-gray-800">Rp {(Number(detail.price) * detail.quantity).toLocaleString('id-ID')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                 <div className="bg-gray-100 p-4 flex justify-end rounded-b-lg">
                    <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm font-medium">Tutup</button>
                </div>
            </div>
        </div>
    );
};
