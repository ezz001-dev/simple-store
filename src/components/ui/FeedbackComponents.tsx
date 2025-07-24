import React from 'react';

/**
 * Komponen animasi loading (spinner).
 */
export const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
);

/**
 * Komponen pesan error.
 */
interface ErrorMessageProps {
    message: string;
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
        <strong className="font-bold">Terjadi Kesalahan!</strong>
        <span className="block sm:inline ml-2">{message}</span>
    </div>
);
