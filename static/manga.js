async function loadMangaData() {
  // Получаем параметр name из URL
  const urlParams = new URLSearchParams(window.location.search);
  const mangaName = urlParams.get('id');

  // if (!mangaName) {
  //     // Если параметр не передан, перенаправляем на главную
  //     window.location.href = '/againn/index.html';
  //     return;
  // }

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/manga/id/${mangaName}`);
    if (!response.ok) throw new Error('Манга не найдена');

    const mangaData = await response.json();
    renderMangaPage(mangaData);
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    document.getElementById('content').innerHTML = `
            <div class="error">
                <h2>Ошибка загрузки манги</h2>
                <p>${error.message}</p>
                <a href="http://127.0.0.1:5501/static/catalog.html">Вернуться в каталог</a>
            </div>
        `;
  }
}

function renderRating(rating) {
  const maxRating = 10;
  const percentage = (rating / maxRating) * 100;
  document.getElementById('rating-stars').innerHTML = `
        <span class="hero__ratingscore"><span style="width: ${percentage}%"></span></span>
        <span>${rating}</span>
    `;
}



function renderStats(manga) {
  let data = {
    "ratings": {
      "average": 8.78,
      "total": 2820,
      "distribution": {
        "nine-ten": 1200 + 798,
        "seven-eight": 442 + 231,
        "five-six": 87 + 62,
        "three-four": 15 + 8,
        "one-two": 5 + 2,
      }
    },
    "lists": {
      "total": 28850,
      "reading": 18700,
      "planned": 6300,
      "completed": 2900,
      "favorite": 1500,
      "on_hold": 574,
      "dropped": 287
    }
  }
  // Загружаем статистику с бэкенда
  //   fetch(`/api/manga/${mangaId}/stats`)
  //     .then(response => response.json())
  //     .then(data => {
  //       updateRatings(data.ratings);
  //       updateLists(data.lists);
  //     })
  //     .catch(error => {
  //       console.error('Error loading stats:', error);
  //     });
  updateRatings(data.ratings);
  updateLists(data.lists);
  // Обновляем блок с оценками
  function updateRatings(ratings) {
    const totalVotes = ratings.total;
    const avgRating = ratings.average;
    const distribution = ratings.distribution;

    // Устанавливаем средний рейтинг
    document.getElementById('avg-rating').textContent = avgRating.toFixed(2);
    document.getElementById('total-votes').textContent = totalVotes.toLocaleString();

    // Создаем строки с рейтингами
    const container = document.getElementById('ratings-distribution');
    container.innerHTML = '';

    const listStars = [
      { id: 'nine-ten', name: '9-10', class: 'ten' },
      { id: 'seven-eight', name: '7-8', class: 'eight' },
      { id: 'five-six', name: '5-6', class: 'six' },
      { id: 'three-four', name: '3-4', class: 'three' },
      { id: 'one-two', name: '1-2', class: 'one' },
    ];
    // Создаем строки от 10 до 1 звезды
    let nums = [[10, 9], [8, 7], [6, 5], [4, 3], [2, 1]]

    listStars.forEach(list => {
      const count = distribution[list.id] || 0;
      const percentage = totalVotes > 0 ? (count / totalVotes * 100) : 0;

      const row = document.createElement('div');
      row.className = 'hero__statsrow';
      row.innerHTML = `
      <div class="hero__ratingstars">
          <span>${list.name}</span>
        </div>
        <div class="hero__ratingprogress">
          <div class="hero__ratingfill ${list.class}" style="width: ${percentage}%"></div>
        </div>
        <div class="hero__ratingcount">${count.toLocaleString()}</div>
      `;
      container.appendChild(row);
    });
  }

  // Обновляем блок со списками
  function updateLists(lists) {
    const total = lists.total;
    document.getElementById('total-lists-count').textContent = total.toLocaleString();

    const container = document.getElementById('lists-distribution');
    container.innerHTML = '';

    // Порядок и настройки для разных списков
    const listTypes = [
      { id: 'reading', name: 'Читают', class: 'reading' },
      { id: 'planned', name: 'В планах', class: 'planned' },
      { id: 'completed', name: 'Прочитано', class: 'completed' },
      { id: 'favorite', name: 'Любимое', class: 'favorite' },
      { id: 'on_hold', name: 'Отложено', class: 'on-hold' },
      { id: 'dropped', name: 'Брошено', class: 'dropped' }
    ];

    listTypes.forEach(list => {
      const count = lists[list.id] || 0;
      const percentage = total > 0 ? (count / total * 100) : 0;

      const row = document.createElement('div');
      row.className = 'hero__statsrow';
      row.innerHTML = `
        <div class="hero__listname">${list.name}</div>
        <div class="hero__listprogress">
          <div class="hero__listfill ${list.class}" style="width: ${percentage}%"></div>
        </div>
        <div class="hero__listcount">${count.toLocaleString()}</div>
      `;
      container.appendChild(row);
    });
  }

}

function renderInfo(manga) {
  let newName = manga.name.split('-');
  newName.splice(0, 1).join(' ');

  let listTags = manga.tags.split('*');
  let newTags = []
  for (let elem of listTags) {
    console.log(elem)
    if (('А'.charCodeAt(0) <= elem[0].toUpperCase().charCodeAt(0)) && (elem[0].toUpperCase().charCodeAt(0) <= 'Я'.charCodeAt(0))) {
      newTags.push(elem)
    }
  }

  document.getElementById('manga-name').innerHTML = newName

  document.getElementById('manga-description').innerHTML = manga.description

  document.getElementById('manga-info').innerHTML = `
        <p class="text"><span class="orange">Тип:</span> &#160 манга</p>
        <p class="text"><span class="orange">Статус:</span> &#160 ${manga.status}</p>
        <p class="text"><span class="orange">Теги:</span> &#160 ${newTags.join(', ')}</p>
        <p class="text"><span class="orange">Кол-во томов:</span> &#160 ${manga.volume_size}</p>
        <p class="text"><span class="orange">Кол-во глав:</span> &#160 ${manga.chapter_size}</p>
    `;
}

function renderEstimate(manga) {

  const rating = document.getElementById('rating');
  const starsActive = rating.querySelector('.stars-active');
  const starsHover = rating.querySelector('.stars-hover');
  const ratingInput = rating.querySelector('.rating-input');
  const ratingValue = document.getElementById('rating-value');
  const starAreas = rating.querySelectorAll('.star-area');

  let currentRating = 0;
  let hoverRating = 0;

  // Инициализация
  function initRating() {
    const savedRating = localStorage.getItem('userRating');
    if (savedRating) {
      setRating(parseFloat(savedRating));
    }
    // fetch('/api/...').then(...)

  }

  // Установка рейтинга
  function setRating(value) {
    currentRating = value;
    ratingInput.value = value;
    ratingValue.textContent = value;
    starsActive.style.width = (value * 10) + '%';
    localStorage.setItem('userRating', value.toString());
  }

  // Обработка наведения
  function handleHover(e) {
    const starArea = e.target.closest('.star-area');
    if (!starArea) return;

    hoverRating = parseFloat(starArea.dataset.value);
    starsHover.style.width = (hoverRating * 10) + '%';

    // Показываем значение при наведении
    ratingValue.textContent = hoverRating;
  }

  // Обработка клика
  function handleClick(e) {
    const starArea = e.target.closest('.star-area');
    if (!starArea) return;

    const newRating = parseFloat(starArea.dataset.value);
    setRating(newRating);
    // fetch('/api/rate-manga', {
    //   method: 'POST',
    //   body: JSON.stringify({ rating: savedRating }),
    //   headers: { 'Content-Type': 'application/json' }
    // });
  }

  // Сброс наведения
  function resetHover() {
    starsHover.style.width = '0';
    ratingValue.textContent = currentRating || '0';
  }

  // Назначение обработчиков
  starAreas.forEach(area => {
    area.addEventListener('mouseenter', handleHover);
    area.addEventListener('click', handleClick);
  });

  rating.addEventListener('mouseleave', resetHover);

  // Инициализация
  initRating();

}

function renderLists(manga) {
  const listToggle = document.getElementById('listToggle');
  const listMenu = document.getElementById('listMenu');
  const listItems = document.querySelectorAll('.list-dropdown__item');
  const statusText = document.querySelector('.list-dropdown__status');

  // Проверяем сохраненное состояние в localStorage
  const mangaId = '105084'; // ID текущей манги
  const savedStatus = localStorage.getItem(`manga_${mangaId}_status`);

  // fetch(`/api/users/${userId}/manga_list/${mangaId}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     if (data.status) {
  //       updateStatus(data.status);
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Ошибка при получении статуса:', error);
  //   });

  if (savedStatus) {
    updateStatus(savedStatus);
  }

  // Открытие/закрытие меню
  listToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    listMenu.classList.toggle('list-dropdown__menu--visible');
  });

  // Закрытие меню при клике вне его
  document.addEventListener('click', function () {
    listMenu.classList.remove('list-dropdown__menu--visible');
  });

  // Обработка выбора пункта меню
  listItems.forEach(item => {
    item.addEventListener('click', function () {
      const value = this.getAttribute('data-value');

      if (value === 'remove') {
        // Удаление из списка
        localStorage.removeItem(`manga_${mangaId}_status`);
        updateStatus(null);
      } else {
        // Добавление в список
        localStorage.setItem(`manga_${mangaId}_status`, value);
        updateStatus(value);
      }

      listMenu.classList.remove('list-dropdown__menu--visible');
    });
  });

  // Функция обновления статуса
  function updateStatus(status) {
    // Удаляем активные классы у всех пунктов
    listItems.forEach(item => {
      item.classList.remove('list-dropdown__item--active');
    });

    if (!status) {
      statusText.textContent = 'Добавить в список';
      return;
    }

    // Находим выбранный пункт и делаем его активным
    const activeItem = document.querySelector(`.list-dropdown__item[data-value="${status}"]`);
    if (activeItem) {
      activeItem.classList.add('list-dropdown__item--active');
    }

    // Обновляем текст статуса
    const statusTextMap = {
      'planned': 'Запланировано',
      'watching': 'Читаю',
      'completed': 'Прочитано',
      'on_hold': 'Отложено',
      'dropped': 'Брошено'
    };

    statusText.textContent = statusTextMap[status] || 'В списке';
  }
}

function renderSimilar(manga, id) {
  const scrollContainer = document.getElementById(id)
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');

    // Загрузка данных с бэкенда
    // function loadSimilarManga() {
    //   // Получаем ID текущей манги из URL
    //   const mangaId = window.location.pathname.split('/').pop().split('-')[0];

    //   // Показываем заглушку загрузки
    //   scrollContainer.innerHTML = '<div class="loading">Загрузка...</div>';

    //   // Запрашиваем данные с бэкенда
    //   //   fetch(`/api/manga/${mangaId}/similar`)
    //   //     .then(response => {
    //   //       if (!response.ok) throw new Error('Ошибка загрузки');
    //   //       return response.json();
    //   //     })
    //   //     .then(data => {
    //   //       renderSimilarManga(data);
    //   //       setupScrollButtons();
    //   //     })
    //   //     .catch(error => {
    //   //       console.error('Error:', error);
    //   //       scrollContainer.innerHTML = '<div class="error">Не удалось загрузить похожие манги</div>';
    //   //     });
    //   }
      let data = [
          {
            "id": 123,
            "slug": "similar-manga-1",
            "title": "Похожая манга 1",
            "cover": "https://shikimori.one/uploads/poster/mangas/105084/main_2x-dbbb68ce750285a2c61d299179f35e06.webp"
          },
          {
            "id": 456,
            "slug": "similar-manga-2",
            "title": "Похожая манга 2",
            "cover": "https://shikimori.one/uploads/poster/mangas/105084/main_2x-dbbb68ce750285a2c61d299179f35e06.webp"
          },
          {
            "id": 2,
            "slug": "similar-manga-2",
            "title": "Похожая манга 2",
            "cover": "https://shikimori.one/uploads/poster/mangas/105084/main_2x-dbbb68ce750285a2c61d299179f35e06.webp"
          },
          {
            "id": 3,
            "slug": "similar-manga-2",
            "title": "Похожая манга 2",
            "cover": "https://shikimori.one/uploads/poster/mangas/105084/main_2x-dbbb68ce750285a2c61d299179f35e06.webp"
          },
          {
            "id": 4,
            "slug": "similar-manga-2",
            "title": "Похожая манга 2",
            "cover": "https://shikimori.one/uploads/poster/mangas/105084/main_2x-dbbb68ce750285a2c61d299179f35e06.webp"
          },
          {
            "id": 5,
            "slug": "similar-manga-2",
            "title": "Похожая манга 2",
            "cover": "https://shikimori.one/uploads/poster/mangas/105084/main_2x-dbbb68ce750285a2c61d299179f35e06.webp"
          },
          {
            "id": 6,
            "slug": "similar-manga-2",
            "title": "Похожая манга 2",
            "cover": "https://shikimori.one/uploads/poster/mangas/105084/main_2x-dbbb68ce750285a2c61d299179f35e06.webp"
          },
          {
            "id": 7,
            "slug": "similar-manga-2",
            "title": "Похожая манга 2",
            "cover": "https://shikimori.one/uploads/poster/mangas/105084/main_2x-dbbb68ce750285a2c61d299179f35e06.webp"
          },
          {
            "id": 8,
            "slug": "similar-manga-2",
            "title": "Похожая манга 2",
            "cover": "https://shikimori.one/uploads/poster/mangas/105084/main_2x-dbbb68ce750285a2c61d299179f35e06.webp"
          },
          {
            "id": 9,
            "slug": "similar-manga-2",
            "title": "Похожая манга 2",
            "cover": "https://shikimori.one/uploads/poster/mangas/105084/main_2x-dbbb68ce750285a2c61d299179f35e06.webp"
          },
        ]
      renderSimilarManga(data);
      setupScrollButtons();

      // Рендерим похожие манги
      function renderSimilarManga(mangaList) {

        if (mangaList.length === 0) {
          scrollContainer.innerHTML = '<div class="empty">Нет похожих манг</div>';
          return;
        }

        mangaList.forEach(manga => {
          const mangaItem = document.createElement('div');
          mangaItem.className = 'similar__mangaitem';
          mangaItem.innerHTML = `
        <a href="/manga/${manga.id}-${manga.slug}">
          <div class="similar__mangacover">
            <img src="${manga.cover}" alt="${manga.title}">
          </div>
          <div class="similar__mangatitle">${manga.title}</div>
        </a>
      `;
          scrollContainer.appendChild(mangaItem);
        });
      }

      // Настройка кнопок прокрутки
      function setupScrollButtons() {
        const scrollAmount = 300;

        scrollLeftBtn.addEventListener('click', () => {
          scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
          });
        });

        scrollRightBtn.addEventListener('click', () => {
          scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        });

        // Скрываем кнопки, если скролл невозможен
        const checkScroll = () => {
          scrollLeftBtn.style.display = scrollContainer.scrollLeft <= 0 ? 'none' : 'flex';
          scrollRightBtn.style.display = scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth ? 'none' : 'flex';
        };

        scrollContainer.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        checkScroll();
      }

      // Инициализация
      // loadSimilarManga();

}


function renderMangaPage(manga) {
  // document.title = `${manga.title}`;
  renderInfo(manga);
  renderRating(manga.rating);
  renderStats(manga);
  renderEstimate(manga);
  renderLists(manga)
  renderSimilar(manga, 'related-scroll')
  renderSimilar(manga, 'similar-scroll')
}




document.addEventListener('DOMContentLoaded', () => {
  loadMangaData();
});



// document.addEventListener('DOMContentLoaded', function () {
//   const rating = document.getElementById('rating');
//   const starsActive = rating.querySelector('.stars-active');
//   const starsHover = rating.querySelector('.stars-hover');
//   const ratingInput = rating.querySelector('.rating-input');
//   const ratingValue = document.getElementById('rating-value');
//   const starAreas = rating.querySelectorAll('.star-area');

//   let currentRating = 0;
//   let hoverRating = 0;

//   // Инициализация
//   function initRating() {
//     const savedRating = localStorage.getItem('userRating');
//     if (savedRating) {
//       setRating(parseFloat(savedRating));
//     }
//   }

//   // Установка рейтинга
//   function setRating(value) {
//     currentRating = value;
//     ratingInput.value = value;
//     ratingValue.textContent = value;
//     starsActive.style.width = (value * 10) + '%';
//     localStorage.setItem('userRating', value.toString());
//   }

//   // Обработка наведения
//   function handleHover(e) {
//     const starArea = e.target.closest('.star-area');
//     if (!starArea) return;

//     hoverRating = parseFloat(starArea.dataset.value);
//     starsHover.style.width = (hoverRating * 10) + '%';

//     // Показываем значение при наведении
//     ratingValue.textContent = hoverRating;
//   }

//   // Обработка клика
//   function handleClick(e) {
//     const starArea = e.target.closest('.star-area');
//     if (!starArea) return;

//     const newRating = parseFloat(starArea.dataset.value);
//     setRating(newRating);
//   }

//   // Сброс наведения
//   function resetHover() {
//     starsHover.style.width = '0';
//     ratingValue.textContent = currentRating || '0';
//   }

//   // Назначение обработчиков
//   starAreas.forEach(area => {
//     area.addEventListener('mouseenter', handleHover);
//     area.addEventListener('click', handleClick);
//   });

//   rating.addEventListener('mouseleave', resetHover);

//   // Инициализация
//   initRating();
// });





// document.addEventListener('DOMContentLoaded', function() {
//   // Получаем ID манги из URL
//   const mangaId = window.location.pathname.split('/').pop().split('-')[0];
//   let data = {"ratings": {
//     "average": 8.78,
//     "total": 2820,
//     "distribution": {
//       "10": 1200,
//       "9": 798,
//       "8": 442,
//       "7": 231,
//       "6": 87,
//       "5": 62,
//       "4": 15,
//       "3": 8,
//       "2": 5,
//       "1": 2
//     }
//   },
//   "lists": {
//     "total": 28850,
//     "reading": 18700,
//     "planned": 6300,
//     "completed": 2900,
//     "favorite": 1500,
//     "on_hold": 574,
//     "dropped": 287
//     }
//   }
//   // Загружаем статистику с бэкенда
// //   fetch(`/api/manga/${mangaId}/stats`)
// //     .then(response => response.json())
// //     .then(data => {
// //       updateRatings(data.ratings);
// //       updateLists(data.lists);
// //     })
// //     .catch(error => {
// //       console.error('Error loading stats:', error);
// //     });
//   updateRatings(data.ratings);
//   updateLists(data.lists);
//   // Обновляем блок с оценками
//   function updateRatings(ratings) {
//     const totalVotes = ratings.total;
//     const avgRating = ratings.average;
//     const distribution = ratings.distribution;

//     // Устанавливаем средний рейтинг
//     document.getElementById('avg-rating').textContent = avgRating.toFixed(2);
//     document.getElementById('total-votes').textContent = totalVotes.toLocaleString();

//     // Создаем строки с рейтингами
//     const container = document.getElementById('ratings-distribution');
//     container.innerHTML = '';

//     const listStars = [
//       { id: 'ten', name: '10', class: 'ten' },
//       { id: 'nine', name: '9', class: 'nine' },
//       { id: 'eight', name: '8', class: 'eight' },
//       { id: 'seven', name: '7', class: 'seven' },
//       { id: 'six', name: '6', class: 'six' },
//       { id: 'five', name: '5', class: 'five' },
//       { id: 'four', name: '4', class: 'four' },
//       { id: 'three', name: '3', class: 'three' },
//       { id: 'two', name: '2', class: 'two' },
//       { id: 'one', name: '1', class: 'one' },
//     ];
//     // Создаем строки от 10 до 1 звезды
//     let i = 10;
//     listStars.forEach(list => {
//       const count = distribution[i] || 0;
//       const percentage = totalVotes > 0 ? (count / totalVotes * 100) : 0;

//       const row = document.createElement('div');
//       row.className = 'list-row';
//       row.innerHTML = `
//       <div class="rating-star">
//           <i class="fas fa-star"></i>
//           <span>${list.name}</span>
//         </div>
//         <div class="rating-progress">
//           <div class="progress-fill ${list.class}" style="width: ${percentage}%"></div>
//         </div>
//         <div class="rating-count">${count.toLocaleString()}</div>
//       `;
//       container.appendChild(row);
//       i--;
//     });
//   }

//   // Обновляем блок со списками
//   function updateLists(lists) {
//     const total = lists.total;
//     document.getElementById('total-lists-count').textContent = total.toLocaleString();

//     const container = document.getElementById('lists-distribution');
//     container.innerHTML = '';

//     // Порядок и настройки для разных списков
//     const listTypes = [
//       { id: 'reading', name: 'Читают', class: 'reading' },
//       { id: 'planned', name: 'В планах', class: 'planned' },
//       { id: 'completed', name: 'Прочитано', class: 'completed' },
//       { id: 'favorite', name: 'Любимое', class: 'favorite' },
//       { id: 'on_hold', name: 'Отложено', class: 'on-hold' },
//       { id: 'dropped', name: 'Брошено', class: 'dropped' }
//     ];

//     listTypes.forEach(list => {
//       const count = lists[list.id] || 0;
//       const percentage = total > 0 ? (count / total * 100) : 0;

//       const row = document.createElement('div');
//       row.className = 'list-row';
//       row.innerHTML = `
//         <div class="list-name">${list.name}</div>
//         <div class="list-progress">
//           <div class="list-fill ${list.class}" style="width: ${percentage}%"></div>
//         </div>
//         <div class="list-count">${count.toLocaleString()}</div>
//       `;
//       container.appendChild(row);
//     });
//   }
// });
