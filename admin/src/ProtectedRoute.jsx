import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('authToken');

    // Jika token ada, lanjutkan ke rute yang dituju
    // Outlet akan merender komponen anak (Dashboard, Profile, dll.)
    if (token) {
        return <Outlet />;
    }

    // Jika token tidak ada, arahkan kembali ke halaman login
    return <Navigate to="/login" replace />;
};

export default ProtectedRoute;