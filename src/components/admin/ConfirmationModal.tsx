import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isLoading: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-gray-600">{message}</p>
                </div>
                <div className="bg-gray-100 p-4 flex justify-end space-x-2 rounded-b-lg">
                    <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                        Batal
                    </button>
                    <button 
                        type="button" 
                        onClick={onConfirm} 
                        disabled={isLoading} 
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-red-300"
                    >
                        {isLoading ? 'Menghapus...' : 'Hapus'}
                    </button>
                </div>
            </div>
        </div>
    );
};
