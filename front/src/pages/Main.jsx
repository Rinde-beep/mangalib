import React, { useContext } from 'react';
import { AuthContext } from "../context";
import Loader from "../components/UI/Loader/Loader";
import Login from '../pages/Login';

const AppRouter = () => {
    const { isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loader />
    }

    return (

        <div className='container' style={{textAlign: 'center'}}>
            <h1 style={{paddingTop: 30, textAlign: 'left'}} className='second-title'>Это тренировочный сайт. Находится в стадии доработки. Некоторое страницы еще недоступны, как и регистрация</h1>
            <h1 style={{paddingTop: 30, textAlign: 'left'}} className='second-title'>На данный момент Вы можете найти некоторую информацию о мангах и при поиске отсортировать по жанрам.</h1>
        </div>

    );
};

export default AppRouter;