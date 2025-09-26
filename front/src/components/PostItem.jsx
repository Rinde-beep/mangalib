import React, { useEffect, useState, useRef, useContext } from 'react';
import MyButton from "./UI/button/MyButton";
import Loader from "./UI/Loader/Loader";
import { AuthContext } from "../context";
import { useNavigate } from 'react-router-dom';
import PostService from "../API/PostService";

const PostItem = (props) => {
    const router = useNavigate();
    const [imageSrc, setImageSrc] = useState('');
    const [imageLoading, setImageLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false); // Новое состояние для видимости
    const itemRef = useRef(null); // Ref для элемента
    const { isLoading } = useContext(AuthContext);

    useEffect(() => {
        // Создаем Intersection Observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    loadImage();
                    // Отключаем observer после первого срабатывания
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1, // Срабатывает когда 10% элемента видно
                rootMargin: '50px' // Загружаем заранее
            }
        );

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        // Очистка при размонтировании
        return () => observer.disconnect();
    }, []);

    async function loadImage() {
        try {
            setImageLoading(true);
            setImageSrc(`http://127.0.0.1:8000/api/catalog/picture/${props.post.id}`);
        } catch (error) {
            console.error('Error loading image:', error);
            setImageSrc('/path/to/placeholder-image.jpg');
        } finally {
            setImageLoading(false);
        }
    }

    return (
        <div ref={itemRef}> {/* Добавляем ref здесь */}
            {isLoading ? (
                <li className="catalog__item list-reset fade-in">
                    {/* Заглушка для загрузки */}
                    <div className="catalog__itemwrap">
                        <div className="image-skeleton"></div>
                    </div>
                </li>
            ) : (
                <li className={`catalog__item list-reset fade-in ${isVisible ? 'visible' : ''}`}>
                    <a className="catalog__itemrel" onClick={() => router(`/posts/${props.post.name}`)}>
                        <div className="catalog__itemwrap">
                            {imageLoading ? (
                                <div className="image-skeleton"></div>
                            ) : (
                                <img 
                                    className="catalog__itemimg image-skeleton"
                                    src={imageSrc}
                                    alt={props.post.alternative_name}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = '/path/to/placeholder-image.jpg';
                                    }}
                                />
                            )}
                        </div>
                        <div className='catalog__itemrating'>{props.post.rating}</div>
                    </a>
                    <a onClick={() => router(`/posts/${props.post.id}`)}>
                        <div className="catalog__itemtitle">{props.post.alternative_name}</div>
                        <div className="catalog__itemtype">Манга</div>
                    </a>
                </li>
            )}
        </div>
    );
};

export default PostItem;