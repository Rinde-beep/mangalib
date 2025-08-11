document.addEventListener('DOMContentLoaded', function() {
  // Получаем ID манги из URL
  const mangaId = window.location.pathname.split('/').pop().split('-')[0];
  let data = {"ratings": {
    "average": 8.78,
    "total": 2820,
    "distribution": {
      "10": 1200,
      "9": 798,
      "8": 442,
      "7": 231,
      "6": 87,
      "5": 62,
      "4": 15,
      "3": 8,
      "2": 5,
      "1": 2
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
      { id: 'ten', name: '10', class: 'ten' },
      { id: 'nine', name: '9', class: 'nine' },
      { id: 'eight', name: '8', class: 'eight' },
      { id: 'seven', name: '7', class: 'seven' },
      { id: 'six', name: '6', class: 'six' },
      { id: 'five', name: '5', class: 'five' },
      { id: 'four', name: '4', class: 'four' },
      { id: 'three', name: '3', class: 'three' },
      { id: 'two', name: '2', class: 'two' },
      { id: 'one', name: '1', class: 'one' },
    ];
    // Создаем строки от 10 до 1 звезды
    let i = 10;
    listStars.forEach(list => {
      const count = distribution[i] || 0;
      const percentage = totalVotes > 0 ? (count / totalVotes * 100) : 0;

      const row = document.createElement('div');
      row.className = 'list-row';
      row.innerHTML = `
      <div class="rating-star">
          <i class="fas fa-star"></i>
          <span>${list.name}</span>
        </div>
        <div class="rating-progress">
          <div class="progress-fill ${list.class}" style="width: ${percentage}%"></div>
        </div>
        <div class="rating-count">${count.toLocaleString()}</div>
      `;
      container.appendChild(row);
      i--;
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
      row.className = 'list-row';
      row.innerHTML = `
        <div class="list-name">${list.name}</div>
        <div class="list-progress">
          <div class="list-fill ${list.class}" style="width: ${percentage}%"></div>
        </div>
        <div class="list-count">${count.toLocaleString()}</div>
      `;
      container.appendChild(row);
    });
  }
});
