import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import RatingStats from "../components/UI/RatingStats/RatingStats";
import ListStats from "../components/UI/ListStats/ListStats";
import RatingStars from "../components/UI/RatingStars/RatingStars";
import RatingInput from "../components/UI/RatingInput/RatingInput";


const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [imageSrc, setImageSrc] = useState(''); // Состояние для src изображения
  const [imageLoading, setImageLoading] = useState(true); // Состояние для загрузки

  const [fetchPostById, isLoading, error] = useFetching(async (name) => {
    const response = await PostService.getByName(name);
    setPost(response.data);
    if (response && response.data.id) {
      console.log(response.data.id)
      await loadImage(response.data.id);
    }
  });

  async function loadImage(id) {
    try {
      setImageLoading(true);
      setImageSrc(`http://127.0.0.1:8000/api/catalog/picture/${id}`);
      console.log(imageSrc)

    } catch (error) {
      console.error('Error loading image:', error);
      setImageSrc('/path/to/placeholder-image.jpg');
    } finally {
      setImageLoading(false);
    }
  }

  useEffect(() => {

    fetchPostById(params.name);
  }, []);

  const handleRatingChange = (newRating) => {
        console.log('Пользователь поставил оценку:', newRating);
        // Можно обновить UI или отправить на сервер
    };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Произошла ошибка: {error}</h1>;
  }

  return (
    <main class="main">
      <section class="hero">
        <div class="container">
          <h1 id="manga-name" class="hero__title">{post ? post.alternative_name : 'Загрузка названия...'}</h1>
          <div class="hero__grid2">
            <div class="hero__gridarticle">
              <article id="manga-photo" class="hero__article">
                <img src={imageSrc}
                ></img>

              </article>
              <RatingInput
                mangaId={params.id}
                onRatingChange={handleRatingChange}
              />
              <div class="list-dropdown">
                <button class="list-dropdown__toggle" id="listToggle">
                  <span class="list-dropdown__status">Добавить в список</span>
                  <span class="list-dropdown__arrow">▼</span>
                </button>
                <div class="list-dropdown__menu" id="listMenu">
                  {/* <!-- <div class="list-dropdown__search">
                <input type="text" placeholder="Поиск списка..." class="list-dropdown__search-input">
            </div> --> */}
                  <ul class="list-dropdown__items">
                    <li class="list-dropdown__item" data-value="planned">
                      <span class="list-dropdown__item-text">Запланировано</span>
                      <span class="list-dropdown__item-checkmark">✓</span>
                    </li>
                    <li class="list-dropdown__item" data-value="watching">
                      <span class="list-dropdown__item-text">Читаю</span>
                      <span class="list-dropdown__item-checkmark">✓</span>
                    </li>
                    <li class="list-dropdown__item" data-value="completed">
                      <span class="list-dropdown__item-text">Прочитано</span>
                      <span class="list-dropdown__item-checkmark">✓</span>
                    </li>
                    <li class="list-dropdown__item" data-value="on_hold">
                      <span class="list-dropdown__item-text">Отложено</span>
                      <span class="list-dropdown__item-checkmark">✓</span>
                    </li>
                    <li class="list-dropdown__item" data-value="dropped">
                      <span class="list-dropdown__item-text">Брошено</span>
                      <span class="list-dropdown__item-checkmark">✓</span>
                    </li>
                    <li class="list-dropdown__item list-dropdown__item--remove" data-value="remove">
                      <span class="list-dropdown__item-text">Удалить из списка</span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <!-- <div>
              <p class="text">Добавить в список</p>
              <select>
                <option value="volvo">MERN</option>
                <option value="saab" selected>DevOps</option>
                <option value="mercedes">AI/ML</option>
                <option value="audi">Data Science</option>
              </select>
            </div> --> */}
            </div>

            <div class="hero__section">

              <ul class="hero__list list-reset">
                <li class="hero__item boxes">
                  <h2 class="second-title hero__itemtitle">Информация</h2>
                  <div id="manga-info">
                    {post ? (
                      <div>
                        <p class="text"><span class="orange">Тип:</span>&nbsp; Mанга</p>
                        <p class="text"><span class="orange">Статус:</span>&nbsp; {post.status}</p>
                        <p class="text"><span class="orange">Теги:</span>&nbsp; {post.tags.join(', ')}</p>
                        <p class="text"><span class="orange">Кол-во томов:</span>&nbsp; {post.volume_size}</p>
                        <p class="text"><span class="orange">Кол-во глав:</span>&nbsp; {post.chapter_size}</p>
                        <p class="text"><span class="orange">Дата:</span>&nbsp; {post.time}</p>
                        <p class="text"><span class="orange">Автор:</span>&nbsp; {post.author}</p>
                        <p class="text"><span class="orange">Издатель:</span>&nbsp; {post.izdat}</p>

                      </div>
                    ) : (
                      <p className="text">Загрузка информации...</p>
                    )}
                  </div>
                </li>
                <li class="hero__item">
                  <div class="hero__ratingbigstars">
                    <h2 class="second-title hero__itemtitle">Рейтинг</h2>
                    {post ? (<RatingStars rating={post.rating} />) : (<p class="text">Загрузка рейтинга...</p>)}

                  </div>

                  <div class="hero__statscont">
                    <RatingStats ratings={post} />
                    <ListStats lists={post} />
                  </div>

                </li>
                <li class="hero__item hero__item--descr">
                  <h2 class="second-title hero__itemtitle">Описание</h2>
                  <p id="manga-description" class="texts">{post ? post.description : 'Загрузка описания...'}</p>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>
      {/* <section class="similar">
        <div class="container">
          <h2 class="second-title">Связанное</h2>

          <div class="similar__mangacontainer">
            <div id="related-scroll" class="similar__mangascroll">
            </div>

            <button class="similar__scrollbtn scroll-left" aria-label="Прокрутить влево">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="similar__scrollbtn scroll-right" aria-label="Прокрутить вправо">
              <i class="fas fa-chevron-right"></i>
            </button>

          </div>
          <h2 class="second-title">Похожее</h2>

          <div class="similar__mangacontainer">
            <div id="similar-scroll" class="similar__mangascroll">
            </div>

            <button class="similar__scrollbtn scroll-left" aria-label="Прокрутить влево">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="similar__scrollbtn scroll-right" aria-label="Прокрутить вправо">
              <i class="fas fa-chevron-right"></i>
            </button>

          </div>




        </div>

      </section> */}

    </main>


  );
};

export default PostIdPage;