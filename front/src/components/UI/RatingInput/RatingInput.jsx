import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/index.js';

const RatingInput = ({ mangaId }) => {
    const [currentRating, setCurrentRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [showAuthMessage, setShowAuthMessage] = useState(false);
    const { isAuth } = useContext(AuthContext);

    // Инициализация рейтинга
    useEffect(() => {
        if (isAuth) {
            const savedRating = localStorage.getItem(`userRating_${mangaId}`);
            if (savedRating) {
                setCurrentRating(parseFloat(savedRating));
            }
        }
    }, [mangaId, isAuth]);

    // Таймер для скрытия сообщения об авторизации
    useEffect(() => {
        if (showAuthMessage) {
            const timer = setTimeout(() => {
                setShowAuthMessage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showAuthMessage]);

    // Установка рейтинга
    const setRating = (value) => {
        if (!isAuth) {
            setShowAuthMessage(true);
            return;
        }
        
        setCurrentRating(value);
        localStorage.setItem(`userRating_${mangaId}`, value.toString());
        sendRatingToServer(value);
    };

    // Обработка наведения
    const handleHover = (value) => {
        if (!isAuth) return;
        setHoverRating(value);
    };

    // Обработка клика
    const handleClick = (value) => {
        setRating(value);
    };

    // Сброс наведения
    const resetHover = () => {
        setHoverRating(0);
    };

    // Отправка рейтинга на сервер
    const sendRatingToServer = async (rating) => {
        try {
            await fetch('/api/rate-manga', {
                method: 'POST',
                body: JSON.stringify({ 
                    mangaId, 
                    rating 
                }),
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
        } catch (error) {
            console.error('Ошибка при отправке рейтинга:', error);
        }
    };

    const displayRating = hoverRating || currentRating;
    const activeWidth = (currentRating * 10) + '%';
    const hoverWidth = (hoverRating * 10) + '%';

    return (
        <div style={{ position: 'relative' }}>
            <p className="text">Оценить</p>
            <div className="rating-container">
                <div 
                    className="rating-stars" 
                    onMouseLeave={resetHover}
                    style={{ 
                        opacity: isAuth ? 1 : 0.6,
                        cursor: isAuth ? 'pointer' : 'not-allowed'
                    }}
                >
                    <div 
                        className="stars-active" 
                        style={{ width: activeWidth }}
                    ></div>
                    <div 
                        className="stars-hover" 
                        style={{ width: isAuth ? hoverWidth : '0%' }}
                    ></div>

                    {/* Области для взаимодействия */}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                        <div
                            key={value}
                            className={`star-area ${value % 2 === 0 ? 'full' : 'half'}`}
                            data-value={value}
                            onMouseEnter={() => handleHover(value)}
                            onClick={() => handleClick(value)}
                            style={{ 
                                cursor: isAuth ? 'pointer' : 'not-allowed'
                            }}
                            title={isAuth ? `Оценить на ${value}` : 'Войдите для оценки'}
                        ></div>
                    ))}

                    <input 
                        type="hidden" 
                        className="rating-input" 
                        name="rating" 
                        value={currentRating} 
                    />
                </div>
                <span className="rating-value">
                    {displayRating > 0 ? displayRating.toFixed(1) : '0'}
                </span>
            </div>

            {/* Сообщение о необходимости авторизации */}
            {showAuthMessage && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: '#ff4757',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    marginTop: '8px',
                    fontSize: '14px',
                    textAlign: 'center',
                    zIndex: 1000,
                    animation: 'fadeInOut 3s ease-in-out'
                }}>
                    ⚠️ Для оценки необходимо авторизоваться
                </div>
            )}
        </div>
    );
};

export default RatingInput;