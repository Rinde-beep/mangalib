// components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuth, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;