// import {createContext} from 'react'

// export const AuthContext = createContext(false);

// context/AuthContext.js
import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(false);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedAuth = localStorage.getItem('auth');
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (savedAuth && savedToken && savedUser) {
            setIsAuth(true);
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
            
            // Устанавливаем токен для всех запросов
            axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
        }
        setLoading(false);
    }, []);

    const login = (userData, authToken) => {
        setIsAuth(true);
        setUser(userData);
        setToken(authToken);
        
        localStorage.setItem('auth', 'true');
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Устанавливаем токен для всех запросов
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    };

    const logout = () => {
        setIsAuth(false);
        setUser(null);
        setToken(null);
        
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Убираем токен из заголовков
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{
            isAuth,
            user,
            token,
            isLoading,
            login,
            logout,
            setIsAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
};