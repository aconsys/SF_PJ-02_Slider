let projects = [//Массив входных данных
  {
    city: 'Rostov-on-Don LCD admiral',
    area: '81 m2',
    repairTime: '3.5 months',
    url: '../img/slider-img/room-1.jpg',
    linkName: 'Rostov-on-Don, Admiral'
  },
  {
    city: 'Sochi Thieves',
    area: '105 m2',
    repairTime: '4 months',
    url: '../img/slider-img/room-2.jpg',
    linkName: 'Sochi Thieves'
  },
  {
    city: 'Rostov-on-Don Patriotic',
    area: '93 m2',
    repairTime: '3 months',
    url: '../img/slider-img/room-3.jpg',
    linkName: 'Rostov-on-Don Patriotic'
  }
];

function initSlider() {
  if (!projects || !projects.length) return;//Проверка наличия входных данных

  let sliderImages = document.querySelector('.slider-images');
  let sliderArrows = document.querySelectorAll('.slider-arrows');
  let sliderDots = document.querySelector('.slider-dots');
  let sliderLinks = document.querySelector('.slider-links');

  initImages();
  initArrows();
  initDots();
  initLinks();
  initDescription(0);

  function initImages() {//Создание элементов изображения слайдера
    projects.forEach((item, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0 ? "active" : ""}" style="background-image:url(${item.url})" data-index="${index}"></div>`;

      sliderImages.insertAdjacentHTML('beforeend', imageDiv);
    });
  }

  function initArrows() {//Инициализация стрелок управления слайдером
    sliderArrows.forEach(arrow => {
      arrow.addEventListener('click', () => {//Обработчик кликов по стрелкам
        let currentNum = +sliderImages.querySelector('.active').dataset.index;//Текущее (видимое) изображение слайдера
        let nextNum;

        if (arrow.classList.contains('slider-arrow_left')) {//Следующее (видимое) изображение слайдера в зависимости от того какая стрелка нажата
          nextNum = currentNum === 0 ? projects.length - 1 : currentNum - 1;
        } else {
          nextNum = currentNum === projects.length - 1 ? 0 : currentNum + 1;
        };

        moveSlider(nextNum);
      });
    });
  }

  function initDots() {
    projects.forEach((item, index) => {//Создание элементов навигации слайдера (точки)
      let dotSpan = `<span class="slider-dots_item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></span>`;

      sliderDots.insertAdjacentHTML('beforeend', dotSpan);
    });

    sliderDots.querySelectorAll('.slider-dots_item').forEach(dot => {//Обработчик кликов по точкам
      dot.addEventListener('click', event => {
        let currentDot = event.target.dataset.index;

        moveSlider(currentDot);
      });
    });
  }

  function initLinks() {
    projects.forEach((item, index) => {//Создание элементов ссылок с названием проектов (над изображением)
      let linkSpan = `<span class="project-view_nav-item slider-links_item n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${item.linkName}</span>`;
      
      sliderLinks.insertAdjacentHTML('beforeend', linkSpan);
    });

    sliderLinks.querySelectorAll('.slider-links_item').forEach(link => {//Обработчик кликов по ссылкам
      link.addEventListener('click', event => {
        let currentLink = event.target.dataset.index;

        moveSlider(currentLink);
      });
    });
  }

  function initDescription(projectNum) {//Подстановка данных в карточку описание проекта
    document.getElementById('slider-project-name').innerText = projects[projectNum].city;
    document.getElementById('slider-project-area').innerText = projects[projectNum].area;
    document.getElementById('slider-project-deadline').innerText = projects[projectNum].repairTime;
  }

  function moveSlider(num) {//Переключение слайдов (изображений и описания)
    let sliderElems = [sliderImages, sliderDots, sliderLinks];

    sliderElems.forEach((elem) => {
      elem.querySelector('.active').classList.remove('active');
      elem.querySelector('.n' + num).classList.add('active');
    });

    initDescription(num);
  }
}

initSlider();