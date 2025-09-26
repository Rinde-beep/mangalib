import React, { useEffect, useRef, useState, useCallback } from 'react';
import PostService from "../API/PostService";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import FilterModal from "../components/UI/FilterModal/FilterModal";
import SortModal from "../components/UI/SortModal/SortModal";
import { useObserver } from "../hooks/UseObserver";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [totalPages, setTotalPages] = useState(0);
    const [limit] = useState(12);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState({});
    const [loading, setLoading] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const lastElement = useRef();
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (currentPage, currentLimit, shouldAppend = false) => {
        try {
            // Формируем параметры запроса
            const params = new URLSearchParams();
            params.append('page', currentPage - 1); // если бэкенд ожидает 0-based
            params.append('limit', currentLimit);

            // Добавляем фильтры
            if (filters.genres && filters.genres.length > 0) {
                filters.genres.forEach(function(genre) {params.append('genres_include', genres[genre - 1].name)})
            }

            if (filters.excludeGenres && filters.excludeGenres.length > 0) {
                filters.excludeGenres.forEach(function(genre) {params.append('genres_exclude', genres[genre - 1].name)})
            }

            // Добавляем сортировку
            if (sort.field) {
                params.append('order', sort.field);
                if (sort.order) params.append('desc', sort.order);
            }

            const response = await PostService.getFilter(params.toString());
            const data = response.data;

            if (shouldAppend) {
                // Добавляем новые посты к существующим
                setPosts(prevPosts => [...prevPosts, ...data]);
            } else {
                // Заменяем полностью при первой загрузке или изменении фильтров
                setPosts(data);
            }

            // Обновляем общее количество страниц
            const totalCount = data.totalCount || 1000; // Используйте реальное значение от бэкенда
            setTotalPages(getPageCount(totalCount, currentLimit));

        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    });
      const [showFilterModal, setShowFilterModal] = useState(false);
    const [showSortModal, setShowSortModal] = useState(false);

    // Единый useEffect для загрузки данных
    useEffect(() => {
        if (isInitialLoad) {
            // Первая загрузка
            fetchPosts(1, limit, false);
            setIsInitialLoad(false);
        } else if (page > 1) {
            // Загрузка следующей страницы
            fetchPosts(page, limit, true);
        }
    }, [page, isInitialLoad]);

    // Сброс пагинации при изменении фильтров или сортировки
    useEffect(() => {
        if (!isInitialLoad) {
            setPage(1);
            fetchPosts(1, limit, false);
        }
    }, [filters, sort]);

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        if (!isPostsLoading && page < totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    });

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    };

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        setShowFilterModal(false);
    };

    const handleApplySort = (newSort) => {
        setSort(newSort);
        setShowSortModal(false);
    };

    const handleResetAll = () => {
        setFilters({});
        setSort({});
        setFilter({ sort: '', query: '' });
        setPage(1);
        fetchPosts(1, limit, false);
    };


    const genres = [
        { id: 1, name: 'Авангард' },
        { id: 2, name: 'Гурман' },
        { id: 3, name: 'Драма' },
        { id: 4, name: 'Комедия' },
        { id: 5, name: 'Повседневность' },
        { id: 6, name: 'Приключения' },
        { id: 7, name: 'Романтика' },
        { id: 8, name: 'Сверхъестественное' },
        { id: 9, name: 'Спорт' },
        { id: 10, name: 'Тайна' },
        { id: 11, name: 'Триллер' },
        { id: 13, name: 'Ужасы' },
        { id: 14, name: 'Фантастика' },
        { id: 15, name: 'Фэнтези' },
        { id: 16, name: 'Экшен' },
        { id: 17, name: 'Этти' },
    ];

    return (
        <div className="App">
            <div className="container catalog__controls">
                <h1 className="second-title">Каталог</h1>
                <div className='catalog__sortbtns'>
                <button type='button'
                    className="btn catalog__btns"
                    onClick={() => setShowFilterModal(true)}
                >
                    Фильтр
                    {(filters.genres?.length > 0 || filters.excludeGenres?.length > 0) && (
                        <span className="badge">!</span>
                    )}
                </button>

                <button type='button'
                    className="btn catalog__btns"
                    onClick={() => setShowSortModal(true)}
                >
                    Сортировка
                    {sort.field && <span className="badge">!</span>}
                </button>

                <button type='button'
                    className="btn catalog__btns"
                    onClick={handleResetAll}
                    disabled={!Object.keys(filters).length && !Object.keys(sort).length}
                >
                    Сбросить всё
                </button>
                </div>
            </div>

            {/* Модальные окна */}
            <FilterModal
                isOpen={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                onApply={handleApplyFilters}
                genres={genres}
            />

            <SortModal
                isOpen={showSortModal}
                onClose={() => setShowSortModal(false)}
                onApply={handleApplySort}
                currentSort={sort}
            />
        
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            {/* Список постов */}
            {postError && <h1>Произошла ошибка: {postError}</h1>}
            
            <PostList remove={removePost} posts={sortedAndSearchedPosts} />
            
            <div ref={lastElement} style={{ height: 100 }} />
            
            {(isPostsLoading || loading) && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
                    <Loader />
                </div>
            )}
        </div>
    );
}

export default Posts;