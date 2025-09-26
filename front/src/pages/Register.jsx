import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context";
import AuthService from "../API/AuthService";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        
        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        if (password.length < 6) {
            setError('Пароль должен содержать минимум 6 символов');
            return;
        }

        setLoading(true);

        try {
            const response = await AuthService.register(email, password);
            console.log(response)
 
            login(response.user, response.token);
            
   
            navigate('/catalog');
            
        } catch (error) {
            if (error.detail) {
                setError(error.detail);
            } else if (error.email) {
                setError(error.email[0]);
            } else if (error.password) {
                setError(error.password[0]);
            } else if (error.non_field_errors) {
                setError(error.non_field_errors[0]);
            } else {
                setError('Произошла ошибка при регистрации');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container container">
                <h1>Регистрация</h1>
                
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
                        minLength={6}
                    />
                    
                    <MyInput 
                        type="password"
                        placeholder="Повторите пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    
                    <MyButton 
                        type="submit" 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </MyButton>
                </form>

                {/* <div className="auth-footer">
                    <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
                </div> */}
            </div>
        </div>
    );
};

export default Register;
