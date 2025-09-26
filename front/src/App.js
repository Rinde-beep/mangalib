import React, {useEffect, useState} from 'react';
import './styles/normalize.css';
import './styles/App.css';
import './styles/navbar.css';
import './styles/catalog.css';
import './styles/mangaId.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Posts from './pages/Posts';
import About from './pages/About';
import Error from './pages/Error';
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setLoading(false);
    }, [])

    return (

        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
        {/* // <AuthContext.Provider> */}
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
         </AuthContext.Provider>
    )
}

export default App;