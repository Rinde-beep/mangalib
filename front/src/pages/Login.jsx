import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context";
import AuthService from "../API/AuthService";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await AuthService.login(email, password);
            
            // Предположим, что сервер возвращает { token: '...', user: {...} }
            login(response.user, response.token);
            
            // Перенаправляем на главную
            navigate('/');
            
        } catch (error) {
            if (error.detail) {
                setError(error.detail);
            } else if (error.email) {
                setError(error.email[0]);
            } else if (error.password) {
                setError(error.password[0]);
            } else {
                setError('Произошла ошибка при входе');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container container">
                <h1>Вход</h1>
                
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <MyInput 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    
                    <MyInput 
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <MyButton 
                        type="submit" 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Вход...' : 'Войти'}
                    </MyButton>
                </form>

                {/* <div className="auth-footer">
                    <p>Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
                </div> */}
            </div>
        </div>
    );
};

export default Login;
