import React, { useState, useEffect, useCallback } from 'react';
import apiService from '../../services/api';
import type { Product, PaginatedResponse } from '../../types';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { ConfirmationModal } from '../../components/admin/ConfirmationModal';
import { LoadingSpinner, ErrorMessage } from '../../components/ui/FeedbackComponents'; // Impor komponen baru

export const ProductManagementPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // State untuk mengelola modal
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    // Fungsi untuk mengambil data produk dari API
    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await apiService<PaginatedResponse<Product>>('/products');
            setProducts(response.data);
        } catch (err) {
            setError('Gagal memuat data produk.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Handler untuk membuka modal tambah produk
    const handleOpenAddModal = () => {
        setProductToEdit(null);
        setIsFormModalOpen(true);
    };

    // Handler untuk membuka modal edit produk
    const handleOpenEditModal = (product: Product) => {
        setProductToEdit(product);
        setIsFormModalOpen(true);
    };

    // Handler untuk membuka modal konfirmasi hapus
    const handleOpenDeleteModal = (product: Product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    // Handler untuk menutup semua modal
    const handleCloseModals = () => {
        setIsFormModalOpen(false);
        setIsDeleteModalOpen(false);
        setProductToEdit(null);
        setProductToDelete(null);
    };

    // Handler untuk menjalankan proses hapus produk
    const handleDeleteProduct = async () => {
        if (!productToDelete) return;
        setIsDeleting(true);
        try {
            await apiService(`/products/${productToDelete.id}`, {
                method: 'DELETE',
            });
            fetchProducts();
            handleCloseModals();
        } catch (err) {
            alert('Gagal menghapus produk. Silakan coba lagi.');
        } finally {
            setIsDeleting(false);
        }
    };

    // Menggunakan komponen loading & error baru
    if (isLoading) return <div className="p-6"><LoadingSpinner /></div>;
    if (error) return <div className="p-6"><ErrorMessage message={error} /></div>;

    return (
        <>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Master Barang</h2>
                    <button onClick={handleOpenAddModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm">
                        + Tambah Produk
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            {/* Penyesuaian gaya header tabel */}
                            <tr className="text-left text-gray-500 border-b">
                                <th className="py-3 px-4 text-xs font-semibold uppercase">ID</th>
                                <th className="py-3 px-4 text-xs font-semibold uppercase">Nama Produk</th>
                                <th className="py-3 px-4 text-xs font-semibold uppercase">Harga</th>
                                <th className="py-3 px-4 text-xs font-semibold uppercase">Stok</th>
                                <th className="py-3 px-4 text-xs font-semibold uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-4 text-sm text-gray-600">#{product.id}</td>
                                    <td className="py-4 px-4 font-medium text-gray-800">{product.name}</td>
                                    <td className="py-4 px-4 text-sm text-gray-600">Rp {Number(product.price).toLocaleString('id-ID')}</td>
                                    <td className="py-4 px-4 text-sm text-gray-600">{product.stock}</td>
                                    <td className="py-4 px-4">
                                        {/* Tombol aksi dengan gaya baru */}
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleOpenEditModal(product)} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200">Edit</button>
                                            <button onClick={() => handleOpenDeleteModal(product)} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-red-200">Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Render Modal Form dan Konfirmasi */}
            <ProductFormModal
                isOpen={isFormModalOpen}
                onClose={handleCloseModals}
                onSave={fetchProducts}
                productToEdit={productToEdit}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseModals}
                onConfirm={handleDeleteProduct}
                title="Hapus Produk"
                message={`Apakah Anda yakin ingin menghapus produk "${productToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
                isLoading={isDeleting}
            />
        </>
    );
};
