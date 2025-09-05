import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('authToken');

    // Jika ada token, izinkan akses ke rute anak
    if (token) {
        return <Outlet />;
    }

    // Jika tidak ada token, kembalikan ke login
    return <Navigate to="/login" replace />;
};
export default ProtectedRoute;