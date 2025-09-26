import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../button/MyButton";
import { AuthContext } from "../../../context";
import Login from '../../../pages/Login';

const Navbar = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
     const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const navigate = useNavigate();

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    };

    const openLogin = () => {
        navigate('/login');
    };

    const openSignup = () => {
        navigate('/reg');
    };

    return (
        <div className="navbar">
            <div className="container navbar__container">
                <Link to="/main" className="logo navbar__logo">Мангарид</Link>
                <nav className="nav">
                    <ul className="nav__list list-reset">
                        <li className="nav__item"><Link to="/posts" className="nav__link">Каталог</Link></li>
                        <li className="nav__item"><MyButton className="btn navbar__btn">Поиск</MyButton></li>
                        <li className="nav__item"><Link to="/chat" className="nav__link">Форум</Link></li>
                    </ul>
                </nav>
                <div className="navbar__auth">
                    {isAuth ?
                    <MyButton onClick={logout}>
                        Выйти
                    </MyButton>
                    :
                    <div className='header__logs'>
                        <MyButton onClick={openLogin} class="sign_in">Войти</MyButton>
                    <MyButton onClick={openSignup} class="sign_up">Регистрация</MyButton>
                    </div>
                    }
                    
                </div>
            </div>
            
        </div>
    );
};

export default Navbar;
