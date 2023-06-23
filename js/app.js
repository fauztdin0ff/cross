import * as flsFunctions from "./modules//functions.js";

flsFunctions.isWebp();

/*--------------------------------------------Перенос блока поиска---------------------------------------------*/
// Проверка разрешения экрана
if (window.innerWidth <= 650) {
  // Получение ссылки на HTML-блок
  let searchBlock = document.querySelector('.middle-header__search');

  // Получение ссылки на блок, в который нужно переместить HTML-блок
  let targetBlock = document.querySelector('.bottom-header__search');

  // Перемещение HTML-блока
  targetBlock.appendChild(searchBlock);
}
/*--------------------------------------------Бургер меню---------------------------------------------*/
let iconMenu = document.querySelector('.menu__icon');
let menuBody = document.querySelector('.menu__body');

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('.menu__body') && !event.target.closest('.menu__icon')) {
    document.body.classList.remove('_lock');
    iconMenu.classList.remove('_active');
    menuBody.classList.remove('_active');
  }
});

/*--------------------------------------------Слайдер банеры---------------------------------------------*/
if (typeof Swiper !== 'undefined') {
  const swiper = new Swiper('.home__slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      //Кастомные буллеты
      /*renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },*/
      type: 'bullets',
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    //Включение/отключение перетаскивания на ПК
    simulateTouch: true,
    //Чувствительность свайпа
    touchRatio: 1,
    //Угол срабатывания свайпа/перетаскивания
    touchAngle: 45,
    //Курсор перетаскивания
    grabCursor: true,
    //Переключение при клике на слайд
    slideToClickedSlide: false,
    //Управление клавиатурой
    keyboard: {
      //Включить\Выключить
      enabled: false,
    },
    //Управление колесом мыши
    mousewheel: false,
    //Автовысота (буллеты под картинкой)
    autoHeight: false,
    //Количество слайдов для показа
    slidesPerView: 1,
    //Отключение функционала если слайдов меньше чем нужно
    watchOverflow: true,
    //Количество прокручиваемых слайдов
    slidesPerGroup: 1,
    //Активный слайд по центру
    centeredSlides: true,
    //Стартовый слайд(первый слайд нулевой. отчет слайда идет от 0)
    initialSlide: 0,
    //Свободный режим (перетаскивание без фиксированных позиций)
    freeMode: false,
    //Автопрокрутка
    autoplay: {
      //Пауза между прокруткой
      delay: 3000,
      //Закончить на последнем слайде
      stopOnLastSlide: false,
      //Отключить после ручного переключения
      disableOnInteraction: false,
      //Отключить автоплей при наведении мыши на слайды
      pauseOnMouseEnter: true,
    },
    //Скорость
    speed: 1000,
    //Паралельная смена прозрачности
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    }
  });
}


/*--------------------------------------------Хиты продаж слайдер---------------------------------------------*/
if (typeof Swiper !== 'undefined') {
  const hitSlider = new Swiper('.news__slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    // Navigation arrows
    navigation: {
      nextEl: '.news-slider-btn-next',
      prevEl: '.news-slider-btn-prev',
    },
    //Включение/отключение перетаскивания на ПК
    simulateTouch: true,
    //Курсор перетаскивания
    grabCursor: true,
    //Переключение при клике на слайд
    slideToClickedSlide: false,
    //Управление клавиатурой
    keyboard: {
      //Включить\Выключить
      enabled: false,
    },
    //Управление колесом мыши
    mousewheel: false,
    //Отключение функционала если слайдов меньше чем нужно
    watchOverflow: true,
    //Свободный режим (перетаскивание без фиксированных позиций)
    freeMode: true,
    //Скорость
    speed: 300,
    effect: 'slide',
    //Отступы между слайдами в(px)
    spaceBetween: 20,
    breakpoints: {
      320: {
        slidesPerView: 3,
      },
      480: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      }
    },
  });
}

/*--------------------------------------------RATING---------------------------------------------*/
const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
  initRatings();
}
// Основная функция
function initRatings() {
  let ratingActive, ratingValue;
  // "Бегаем" по всем рейтингам на странице
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    initRating(rating);
  }

  // Инициализируем конкретный рейтинг
  function initRating(rating) {
    initRatingVars(rating);

    setRatingActiveWidth();

    if (rating.classList.contains('rating_set')) {
      setRating(rating);
    }
  }

  // Инициализайция переменных
  function initRatingVars(rating) {
    ratingActive = rating.querySelector('.rating__active');
    ratingValue = rating.querySelector('.rating__value');
  }
  // Изменяем ширину активных звезд
  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }
  // Возможность указать оценку 
  function setRating(rating) {
    const ratingItems = rating.querySelectorAll('.rating__item');
    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];
      ratingItem.addEventListener("mouseenter", function (e) {
        // Обновление переменных
        initRatingVars(rating);
        // Обновление активных звезд
        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener("mouseleave", function (e) {
        // Обновление активных звезд
        setRatingActiveWidth();
      });
      ratingItem.addEventListener("click", function (e) {
        // Обновление переменных
        initRatingVars(rating);

        if (rating.dataset.ajax) {
          // "Отправить" на сервер
          setRatingValue(ratingItem.value, rating);
        } else {
          // Отобразить указанную оцнку
          ratingValue.innerHTML = index + 1;
          setRatingActiveWidth();
        }
      });
    }
  }

  async function setRatingValue(value, rating) {
    if (!rating.classList.contains('rating_sending')) {
      rating.classList.add('rating_sending');

      // Отправика данных (value) на сервер
      let response = await fetch('rating.json', {
        method: 'GET',

        //body: JSON.stringify({
        //	userRating: value
        //}),
        //headers: {
        //	'content-type': 'application/json'
        //}

      });
      if (response.ok) {
        const result = await response.json();

        // Получаем новый рейтинг
        const newRating = result.newRating;

        // Вывод нового среднего результата
        ratingValue.innerHTML = newRating;

        // Обновление активных звезд
        setRatingActiveWidth();

        rating.classList.remove('rating_sending');
      } else {
        alert("Ошибка");

        rating.classList.remove('rating_sending');
      }
    }
  }
}
// Получаем все ссылки с классом "disabled"
var disabledLinks = document.getElementsByClassName('disabled');

// Перебираем ссылки и отменяем стандартное поведение
Array.from(disabledLinks).forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
  });
});
/*--------------------------------------------ПОПАП---------------------------------------------*/
const popup = document.getElementById('popup');
const popupImage = popup.querySelector('.popup__image');
const popupName = popup.querySelector('.popup__name');
const popupPrice = popup.querySelector('.popup__price');
const popupCloseButton = popup.querySelector('.popup__close');
const popupImagesContainer = popup.querySelector('.popup__images-container');
const sliderItems = document.querySelectorAll('.product-card');
const body = document.body;
const addToCartButtonLink = popup.querySelector('.product-card__bag');
const favoritesContainer = document.getElementById('wishlist');

// Функция для сброса выбранных размеров
function resetSelectedSizes() {
  const mainSizeInputs = popup.querySelectorAll('.popup__size input[type="radio"]');
  const additionalSizeInputs = popup.querySelectorAll('.size-additional__value input[type="radio"]');

  mainSizeInputs.forEach((input) => {
    input.checked = false;
    popup.querySelector('.popup__size').dataset.selectedSize = '';
  });

  additionalSizeInputs.forEach((input) => {
    input.checked = false;
    popup.querySelector('.popup__additional-size').dataset.selectedAdditionalSize = '';
  });

  // Отключение кнопки "В корзину"
  addToCartButtonLink.disabled = true;
  addToCartButtonLink.classList.remove('active');
}

// Функция для открытия попапа
function openPopup(item) {
  const imageSrc = item.querySelector('.product-card__image').dataset.imageSrc;
  const name = item.querySelector('.product-card__name').dataset.name;
  const price = item.querySelector('.product-card__price').dataset.price;
  const additionalImages = item.querySelector('.product-card__image').dataset.additionalImages.split(',');
  const unavailableSizes = item.querySelector('.product-card__sizes').dataset.unavailableSizes.split(',');

  location.hash = 'popup';

  popupImage.src = imageSrc;
  popupName.textContent = name;
  popupPrice.textContent = price;

  // Добавить обработчик события hashchange
  window.addEventListener('hashchange', handleHashChange);

  popupImagesContainer.innerHTML = '';

  additionalImages.forEach((additionalImage) => {
    const imgElement = document.createElement('img');
    imgElement.src = additionalImage;
    popupImagesContainer.appendChild(imgElement);

    imgElement.addEventListener('click', () => {
      popupImage.src = additionalImage;
    });
  });

  const mainSizeInputs = popup.querySelectorAll('.popup__size input[type="radio"]');
  const additionalSizeInputs = popup.querySelectorAll('.size-additional__value input[type="radio"]');

  function handleSizeInputs(inputs) {
    inputs.forEach((input) => {
      const value = input.value;

      if (unavailableSizes.includes(value)) {
        input.disabled = true;
        input.nextElementSibling.classList.add('unavailable');
      } else {
        input.disabled = false;
        input.nextElementSibling.classList.remove('unavailable');
      }
    });
  }

  handleSizeInputs(mainSizeInputs);
  handleSizeInputs(additionalSizeInputs);

  popupImage.dataset.imageSrc = imageSrc;
  popupName.dataset.name = name;
  popupPrice.dataset.price = price;

  // Записываем недоступные размеры в атрибут data-unavailable-sizes блока .popup__unavailable-sizes
  popup.querySelector('.popup__unavailable-sizes').dataset.unavailableSizes = unavailableSizes;

  // Сброс выбранных размеров перед отображением попапа
  resetSelectedSizes();

  const goCartLink = document.querySelector('.go-cart');
  // Задаем свойство display со значением none
  goCartLink.style.display = 'none';

  popup.style.display = 'flex';
  body.classList.add('_popup');
}

// Инициализация событий для каждой карточки товара
sliderItems.forEach((item) => {
  // Находим ссылку "в избранное" внутри карточки товара
  const wishlistLink = item.querySelector('.product-card__wishlist');

  // Инициализация события клика для карточки товара
  item.addEventListener('click', (event) => {
    // Проверяем, что кликнули не на ссылку "в избранное"
    if (!event.target.classList.contains('product-card__wishlist')) {
      openPopup(item);
    }
  });

  // Инициализация события клика для ссылки "в избранное"
  wishlistLink.addEventListener('click', (event) => {
    event.stopPropagation(); // Остановить дальнейшее распространение события клика
    wishlistLink.classList.add('added'); // Добавляем класс "added"
  });

  // Инициализация событий для каждой ссылки "product-card__look" внутри Избранного
  favoritesContainer.addEventListener('click', (event) => {
    const lookLink = event.target.closest('.product-card__look');
    if (lookLink && !lookLink.classList.contains('disabled')) {
      event.preventDefault(); // Предотвращаем стандартное действие ссылки (открытие попапа)

      // Найдите родительскую карточку товара
      const item = lookLink.closest('.product-card');
      // Откройте попап с передачей карточки товара в качестве аргумента
      openPopup(item);
    }
  });
});


// Инициализация событий для каждой ссылки "product-card__look" в Избранном
favoritesContainer.addEventListener('click', (event) => {
  const lookLink = event.target.closest('.product-card__look');
  if (lookLink) {
    event.preventDefault(); // Предотвращаем стандартное действие ссылки (открытие попапа)

    // Найдите родительскую карточку товара
    const item = lookLink.closest('.product-card');
    // Откройте попап с передачей карточки товара в качестве аргумента
    openPopup(item);
  }
});



popupCloseButton.addEventListener('click', () => {
  popup.style.display = 'none';
  body.classList.remove('_popup');
  window.removeEventListener('hashchange', handleHashChange);
  // Удалить хеш из URL-адреса
  history.replaceState(null, null, window.location.pathname);
});

// Обработчик события на изменение количества в попапе
const selectedQuantityInput = popup.querySelector('.quantity-input');
selectedQuantityInput.addEventListener('input', () => {
  const selectedQuantity = selectedQuantityInput.value;
  popup.querySelector('.popup__quantity').dataset.selectedQuantity = selectedQuantity;
});

// Обработчик события на радиокнопки размеров в попапе
popup.querySelectorAll('.popup__size input[type="radio"]').forEach((input) => {
  input.addEventListener('change', () => {
    const selectedSize = input.value;
    popup.querySelector('.popup__size').dataset.selectedSize = selectedSize;

    // Проверка, выбраны ли размеры
    if (selectedSize && selectedSize !== '') {
      addToCartButtonLink.disabled = false; // Включение кнопки "В корзину"
      addToCartButtonLink.classList.add('active'); // Добавление класса "active" для активного состояния ссылки
    } else {
      addToCartButtonLink.disabled = true; // Отключение кнопки "В корзину"
      addToCartButtonLink.classList.remove('active'); // Удаление класса "active" для неактивного состояния ссылки
    }
  });
});

// Обработчик события на радиокнопки дополнительных размеров в попапе
popup.querySelectorAll('.size-additional__value input[type="radio"]').forEach((input) => {
  input.addEventListener('change', () => {
    const selectedAdditionalSize = input.checked ? input.value : '';
    popup.querySelector('.popup__additional-size').dataset.selectedAdditionalSize = selectedAdditionalSize;
  });
});

function handleHashChange() {
  if (location.hash !== '#popup') {
    popup.style.display = 'none';
    body.classList.remove('_popup');
  }
}

/*--------------------------------------------Количество товара---------------------------------------------*/
const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const quantityInput = document.querySelector('.quantity-input');
const maxQuantity = 10; // Максимальное значение

minusBtn.addEventListener('click', () => {
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
    popup.querySelector('.popup__quantity').dataset.selectedQuantity = quantityInput.value;
  }
});

plusBtn.addEventListener('click', () => {
  if (quantityInput.value < maxQuantity) {
    quantityInput.value = parseInt(quantityInput.value) + 1;
    popup.querySelector('.popup__quantity').dataset.selectedQuantity = quantityInput.value;
  }
});

quantityInput.addEventListener('input', () => {
  if (quantityInput.value > maxQuantity) {
    quantityInput.value = maxQuantity;
  }
  popup.querySelector('.popup__quantity').dataset.selectedQuantity = quantityInput.value;
});

/*--------------------------------------------Ползунок---------------------------------------------*/
// Получаем элементы переключателя
var switchElement = document.querySelector('.switch');
var handleElement = document.querySelector('.switch__handle');
var onRadioButton = document.getElementById('switch-on');
var additionalSizeElement = document.querySelector('.size-additional__value');

// Добавляем обработчик события для изменения состояния переключателя
switchElement.addEventListener('click', toggleSwitch);

// Инициализация переключателя в состоянии "Off"
additionalSizeElement.style.display = 'none';

// Функция для изменения состояния переключателя
function toggleSwitch() {
  if (onRadioButton.checked) {
    switchElement.classList.remove('on');
    additionalSizeElement.style.display = 'none';
    onRadioButton.checked = false;
  } else {
    switchElement.classList.add('on');
    additionalSizeElement.style.display = 'block';
    onRadioButton.checked = true;
  }
}
/*--------------------------------------------Открытие корзины---------------------------------------------*/
// Получаем ссылку на элемент ссылки корзины
var cartLink = document.querySelector(".cart-link");
var goCartLink = document.querySelector(".go-cart");

goCartLink.addEventListener("click", function (event) {
  event.preventDefault();
  openCart();
  closePopup();
  window.location.hash = "cart"; // Добавляем хеш в URL
});
function closePopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
}

var closeButton = document.querySelector(".cart__button-close");
var continueButton = document.querySelector(".resume-buy");

// Добавляем обработчик события на клик ссылки корзины
cartLink.addEventListener("click", function (event) {
  event.preventDefault();
  openCart();
  window.location.hash = "cart"; // Добавляем хеш в URL
});

// Добавляем обработчик события на клик кнопки закрытия корзины
closeButton.addEventListener("click", function (event) {
  closeCart();
  window.location.hash = ""; // Удаляем хеш из URL
});

continueButton.addEventListener("click", function (event) {
  event.preventDefault();
  closeCart();
  window.location.hash = ""; // Удаляем хеш из URL
});

// Обработчик события popstate
window.addEventListener("popstate", function (event) {
  const hash = window.location.hash;
  if (hash === "#cart") {
    openCart(); // Открываем корзину
  } else {
    closeCart(); // Закрываем корзину
  }
});

// Функция для открытия корзины
function openCart() {
  var cart = document.getElementById("cart");
  var body = document.querySelector("body");

  cart.style.display = "flex";
  body.classList.add("_popup");
}

// Функция для закрытия корзины
function closeCart() {
  var cart = document.getElementById("cart");
  var body = document.querySelector("body");

  cart.style.display = "none";
  body.classList.remove("_popup");
}

/*--------------------------------------------в корзину---------------------------------------------*/
const addToCartButton = document.querySelector('.product-card__bag');

const cartItemsContainer = document.querySelector('.cart__items');

const cartTotalElement = document.querySelector('.cart__total');

// Назначаем обработчик события клика на кнопку "в корзину"
addToCartButton.addEventListener('click', function (event) {
  event.preventDefault();

  // Получаем информацию о товаре из data атрибутов попапа
  const popup = document.querySelector('#popup');
  const productName = popup.querySelector('.popup__name').textContent;
  const productPrice = popup.querySelector('.popup__price').textContent;
  const productImageSrc = popup.querySelector('.popup__image').getAttribute('data-image-src');

  // Получаем выбранное количество товара
  const selectedQuantity = parseInt(popup.querySelector('.quantity-input').value);

  // Получаем выбранный размер
  const selectedSize = popup.querySelector('input[name="shoe-size"]:checked').value;

  const selectedAdditionalSizeElement = popup.querySelector('input[name="add-size"]:checked');
  const selectedAdditionalSize = selectedAdditionalSizeElement ? selectedAdditionalSizeElement.value : '';

  // Получаем data атрибуты товара
  const dataAttributes = {
    dataAttribute1: popup.getAttribute('data-attribute1'),
    dataAttribute2: popup.getAttribute('data-attribute2'),
  };

  // Создаем элемент товара для добавления в корзину
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart__item');
  // Создаем HTML-разметку для элемента товара
  cartItem.innerHTML = `
    <img class="cart__item-image" src="${productImageSrc}" alt="Product Image" data-image="${productImageSrc}">
    <div class="cart__item-info">
      <h3 class="cart__item-name" data-name="${productName}">${productName}</h3>
      <p class="cart__item-price" data-price="${productPrice.replace(/\D/g, '')}">${productPrice}</p>
      <p class="cart__item-size" data-size="${selectedSize}">Размер: ${selectedSize}</p>
      ${selectedAdditionalSize ? `<p class="cart__item-additional-size" data-additional-size="${selectedAdditionalSize}">Доп. размер: ${selectedAdditionalSize}</p>` : ''}
      <p class="cart__item-quantity" data-quantity="${selectedQuantity}">Количество: ${selectedQuantity}</p>
      <button class="cart__item-remove">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M17.1514 4.80787C17.1514 4.40275 16.9905 4.01422 16.704 3.72775C16.4176 3.44129 16.029 3.28035 15.6239 3.28035H12.8133C12.673 2.58973 12.2984 1.96883 11.7527 1.52286C11.2071 1.07688 10.524 0.833252 9.81933 0.833252C9.11462 0.833252 8.43158 1.07688 7.88594 1.52286C7.3403 1.96883 6.96562 2.58973 6.82538 3.28035H4.01474C3.63607 3.28352 3.27208 3.42723 2.99338 3.6836C2.71468 3.93997 2.54114 4.29072 2.50643 4.66781C2.47172 5.04489 2.57832 5.42143 2.80554 5.72437C3.03275 6.02731 3.3644 6.23505 3.73612 6.30729L4.22798 16.626C4.25945 17.311 4.554 17.9575 5.05026 18.4308C5.54652 18.9041 6.20623 19.1676 6.89198 19.1666H12.7467C13.4324 19.1676 14.0921 18.9041 14.5884 18.4308C15.0847 17.9575 15.3792 17.311 15.4107 16.626L15.8995 6.30729C16.2504 6.24292 16.5678 6.05773 16.7964 5.78385C17.0251 5.50997 17.1507 5.16467 17.1514 4.80787ZM9.81933 2.05833C10.1971 2.0599 10.5651 2.17814 10.8731 2.39688C11.1811 2.61563 11.414 2.92419 11.5399 3.28035H8.09873C8.22464 2.92419 8.45753 2.61563 8.76552 2.39688C9.07351 2.17814 9.44156 2.0599 9.81933 2.05833ZM14.1899 16.5686C14.1729 16.9397 14.0133 17.2899 13.7444 17.5462C13.4756 17.8026 13.1182 17.9453 12.7467 17.9446H6.89198C6.5205 17.9453 6.16307 17.8026 5.89421 17.5462C5.62534 17.2899 5.46578 16.9397 5.44878 16.5686L4.96119 6.33539H14.6762L14.1899 16.5686ZM15.6239 5.11338H4.01474C3.93372 5.11338 3.85601 5.08119 3.79872 5.0239C3.74142 4.9666 3.70924 4.8889 3.70924 4.80787C3.70924 4.72685 3.74142 4.64914 3.79872 4.59185C3.85601 4.53455 3.93372 4.50237 4.01474 4.50237H15.6239C15.7049 4.50237 15.7826 4.53455 15.8399 4.59185C15.8972 4.64914 15.9294 4.72685 15.9294 4.80787C15.9294 4.8889 15.8972 4.9666 15.8399 5.0239C15.7826 5.08119 15.7049 5.11338 15.6239 5.11338Z"
      fill="#BABAC0"></path>
      <path
        d="M7.98601 15.5006C8.14806 15.5006 8.30347 15.4362 8.41806 15.3216C8.53264 15.207 8.59702 15.0516 8.59702 14.8896V8.77947C8.59702 8.61742 8.53264 8.462 8.41806 8.34742C8.30347 8.23283 8.14806 8.16846 7.98601 8.16846C7.82396 8.16846 7.66855 8.23283 7.55396 8.34742C7.43937 8.462 7.375 8.61742 7.375 8.77947V14.8896C7.375 15.0516 7.43937 15.207 7.55396 15.3216C7.66855 15.4362 7.82396 15.5006 7.98601 15.5006Z"
      fill="#BABAC0"></path>
      <path
        d="M11.652 15.5006C11.8141 15.5006 11.9695 15.4362 12.0841 15.3216C12.1987 15.207 12.263 15.0516 12.263 14.8896V8.77947C12.263 8.61742 12.1987 8.462 12.0841 8.34742C11.9695 8.23283 11.8141 8.16846 11.652 8.16846C11.49 8.16846 11.3346 8.23283 11.22 8.34742C11.1054 8.462 11.041 8.61742 11.041 8.77947V14.8896C11.041 15.0516 11.1054 15.207 11.22 15.3216C11.3346 15.4362 11.49 15.5006 11.652 15.5006Z"
      fill="#BABAC0"></path>
  </svg>
      </button>
    </div>
  `;

  // Добавляем data атрибуты в элементы товара
  for (const key in dataAttributes) {
    const value = dataAttributes[key];
    cartItem.querySelectorAll(`[data-${key}]`).forEach((element) => {
      element.setAttribute(`data-${key}`, value);
    });
  }

  // Добавляем товар в блок cart__items
  cartItemsContainer.appendChild(cartItem);

  totalItems++;

  if (cart.classList.contains('empty')) {
    cart.classList.remove('empty');
  }

  // Вычисляем сумму товаров
  const productPriceNumber = parseFloat(productPrice.replace(/\D/g, '')); // Преобразуем строку цены в число
  const totalPrice = productPriceNumber * selectedQuantity;

  updateCartTotal(totalPrice);

  // Добавляем класс анимации
  addToCartButton.classList.add('pulse-animation');

  // Заменяем текст кнопки на "Добавлено"
  addToCartButton.textContent = 'Добавлено';

  // Задаем фон кнопки
  addToCartButton.style.background = 'rgb(157, 157, 157)';

  // Присваиваем класс _icon-checkmark
  addToCartButton.classList.add('_icon-checkmark');

  // Удаляем класс _icon-search
  addToCartButton.classList.remove('_icon-search');

  // Устанавливаем таймер для возврата текста кнопки в исходное состояние и снятия атрибута disabled
  setTimeout(function () {
    addToCartButton.textContent = 'в корзину';
    addToCartButton.removeAttribute('disabled');

    // Удаляем класс _icon-checkmark
    addToCartButton.classList.remove('_icon-checkmark');

    // Убираем фон кнопки
    addToCartButton.style.background = '';
  }, 3000);


  // полет товара в корзину
  const popupImage = document.querySelector('.popup__image');
  const popupContent = document.querySelector('.popup__content');

  popupImage.classList.add('fly-animation');
  popupContent.style.overflow = 'hidden';
  // Запускаем таймер для удаления элемента после окончания анимации
  setTimeout(function () {
    popupImage.classList.remove('fly-animation');
    popupContent.style.overflow = '';
  }, 800);

  const goCartLink = document.querySelector('.go-cart');
  goCartLink.style.display = 'block';
});

var totalItems = 0;

// Функция обновления суммы товаров в корзине
function updateCartTotal(price) {
  // Получаем текущую сумму товаров из атрибута data-total
  const currentTotal = parseFloat(cartTotalElement.getAttribute('data-total')) || 0;
  // Вычисляем новую сумму товаров
  const newTotal = currentTotal + price;

  // Форматируем новую сумму с пробелами после тысяч
  const formattedTotal = newTotal.toLocaleString('ru-RU');

  // Обновляем атрибут data-total и текстовое содержимое элемента
  cartTotalElement.setAttribute('data-total', newTotal);
  cartTotalElement.textContent = `Общая сумма: ${formattedTotal} сум.`;

  // Обновляем количество товаров в корзине
  const cartLinkCircle = document.querySelector('.cart-link-circle');
  cartLinkCircle.style.display = 'flex';

  if (newTotal === 0) {
    cart.classList.add('empty');
    cartTotalElement.style.display = 'none';
  } else {
    cart.classList.remove('empty');
    cartTotalElement.style.display = 'block';
  }

  // Обновляем текст внутри span с классом cart-link-circle
  cartLinkCircle.textContent = totalItems;
  // Получаем ссылки на кнопки удаления товара
  const removeButtons = document.querySelectorAll('.cart__item-remove');

  // Назначаем обработчик события клика на каждую кнопку удаления
  removeButtons.forEach(function (removeButton) {
    removeButton.addEventListener('click', function () {
      // Получаем родительский элемент кнопки удаления (элемент товара)
      const cartItem = removeButton.closest('.cart__item');

      // Получаем цену и количество товара из элемента товара
      const productPrice = parseFloat(cartItem.querySelector('.cart__item-price').getAttribute('data-price'));
      const productQuantity = parseInt(cartItem.querySelector('.cart__item-quantity').getAttribute('data-quantity'));

      // Вычисляем сумму товара, который был удален
      const totalPrice = productPrice * productQuantity;

      // Удаляем элемент товара из корзины
      cartItemsContainer.removeChild(cartItem);
      totalItems--;

      // Обновляем сумму товаров в корзине
      updateCartTotal(-totalPrice);
    });
  });
}

/*--------------------------------------------Клик на изображении для fullscreen---------------------------------------------*/
const gallery = document.querySelector('.popup__gallery');
const mainImage = gallery.querySelector('.popup__image');
const imagesContainer = gallery.querySelector('.popup__images-container');
const fullscreenDiv = document.querySelector('.fullscreen');
let currentImageIndex = 0; // Индекс текущей фотографии
let isFullscreenOpen = false; // Флаг состояния fullscreen

mainImage.addEventListener('click', () => {
  const imageURLs = Array.from(imagesContainer.querySelectorAll('img')).map(img => img.src);

  fullscreenDiv.innerHTML = imageURLs.map((url, index) => {
    const isFirstImage = index === 0;
    const additionalClass = isFirstImage ? ' active' : '';
    return `<img src="${url}" class="${additionalClass}">`;
  }).join('');
  fullscreenDiv.style.display = 'flex';

  currentImageIndex = 0;

  fullscreenDiv.scrollTop = 0;
  fullscreenDiv.scrollLeft = 0;

  // Добавляем хеш в URL только если fullscreen не открыт
  if (!isFullscreenOpen) {
    history.pushState(null, null, '#fullscreen');
    isFullscreenOpen = true;
  }
});

fullscreenDiv.addEventListener('click', (event) => {
  if (event.target === fullscreenDiv) {
    closeFullscreen();
  }
});

fullscreenDiv.addEventListener('click', (event) => {
  if (event.target.tagName === 'IMG') {
    closeFullscreen();
  }
});

// Обрабатываем событие popstate при изменении хеша в URL
window.addEventListener('popstate', () => {
  const currentHash = window.location.hash;
  if (currentHash !== '#fullscreen') {
    closeFullscreen();
  }
});

// Функция закрытия fullscreen
function closeFullscreen() {
  fullscreenDiv.innerHTML = '';
  fullscreenDiv.style.display = 'none';

  // Удаляем хеш из URL только если fullscreen был открыт
  if (isFullscreenOpen) {
    history.pushState(null, null, window.location.pathname);
    isFullscreenOpen = false;
  }
}


/*--------------------------------------------Одинаковая высота карточек---------------------------------------------*/
var names = document.querySelectorAll('.product-card__name');

// Находим самую большую высоту
var maxHeight = 0;
names.forEach(function (name) {
  var nameHeight = name.offsetHeight;
  if (nameHeight > maxHeight) {
    maxHeight = nameHeight;
  }
});

// Устанавливаем высоту для всех элементов
names.forEach(function (name) {
  name.style.height = maxHeight + 'px';
});

/*--------------------------------------------Избранное---------------------------------------------*/
const wishlistLink = document.querySelector('.wishlist-link');
const wishlist = document.querySelector('.wishlist');
const wishlistCloseButton = document.querySelector('.wishlist__button-close');
const wishlistItems = document.querySelector('.wishlist__items');
const wishlistCountElement = document.querySelector('.wishlist-link-circle');
const productCardLookLinks = document.querySelectorAll('.product-card__look');

// Обработчик клика на ссылку "Открыть избранное"
wishlistLink.addEventListener('click', function (event) {
  event.preventDefault();
  event.stopPropagation(); // Предотвращаем распространение события клика
  toggleWishlist(true); // Показать избранное
  history.pushState(null, null, '#wishlist'); // Добавить хеш в URL
});

// Обработчик клика на кнопку "Закрыть избранное"
wishlistCloseButton.addEventListener('click', function (event) {
  event.preventDefault();
  toggleWishlist(false); // Скрыть избранное
  history.pushState(null, null, document.URL.split('#')[0]); // Удалить хеш из URL
});

// Функция для обновления счетчика избранного
function updateWishlistCount() {
  const count = wishlistItems.childElementCount;
  wishlistCountElement.textContent = count.toString();
  wishlistCountElement.style.display = count > 0 ? 'flex' : 'none';
}

// Функция для добавления в избранное
function addToWishlist(event) {
  event.preventDefault();
  const wishlistLink = event.target;
  wishlistLink.classList.add('clicked');
  const productCard = event.target.closest('.product-card');
  const clonedCard = productCard.cloneNode(true);
  clonedCard.classList.remove('news-card');
  const wishlistButton = clonedCard.querySelector('.product-card__wishlist');
  wishlistButton.classList.remove('product-card__wishlist');
  wishlistButton.classList.add('wishlist__remove');
  wishlistButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M17.1514 4.80787C17.1514 4.40275 16.9905 4.01422 16.704 3.72775C16.4176 3.44129 16.029 3.28035 15.6239 3.28035H12.8133C12.673 2.58973 12.2984 1.96883 11.7527 1.52286C11.2071 1.07688 10.524 0.833252 9.81933 0.833252C9.11462 0.833252 8.43158 1.07688 7.88594 1.52286C7.3403 1.96883 6.96562 2.58973 6.82538 3.28035H4.01474C3.63607 3.28352 3.27208 3.42723 2.99338 3.6836C2.71468 3.93997 2.54114 4.29072 2.50643 4.66781C2.47172 5.04489 2.57832 5.42143 2.80554 5.72437C3.03275 6.02731 3.3644 6.23505 3.73612 6.30729L4.22798 16.626C4.25945 17.311 4.554 17.9575 5.05026 18.4308C5.54652 18.9041 6.20623 19.1676 6.89198 19.1666H12.7467C13.4324 19.1676 14.0921 18.9041 14.5884 18.4308C15.0847 17.9575 15.3792 17.311 15.4107 16.626L15.8995 6.30729C16.2504 6.24292 16.5678 6.05773 16.7964 5.78385C17.0251 5.50997 17.1507 5.16467 17.1514 4.80787ZM9.81933 2.05833C10.1971 2.0599 10.5651 2.17814 10.8731 2.39688C11.1811 2.61563 11.414 2.92419 11.5399 3.28035H8.09873C8.22464 2.92419 8.45753 2.61563 8.76552 2.39688C9.07351 2.17814 9.44156 2.0599 9.81933 2.05833ZM14.1899 16.5686C14.1729 16.9397 14.0133 17.2899 13.7444 17.5462C13.4756 17.8026 13.1182 17.9453 12.7467 17.9446H6.89198C6.5205 17.9453 6.16307 17.8026 5.89421 17.5462C5.62534 17.2899 5.46578 16.9397 5.44878 16.5686L4.96119 6.33539H14.6762L14.1899 16.5686ZM15.6239 5.11338H4.01474C3.93372 5.11338 3.85601 5.08119 3.79872 5.0239C3.74142 4.9666 3.70924 4.8889 3.70924 4.80787C3.70924 4.72685 3.74142 4.64914 3.79872 4.59185C3.85601 4.53455 3.93372 4.50237 4.01474 4.50237H15.6239C15.7049 4.50237 15.7826 4.53455 15.8399 4.59185C15.8972 4.64914 15.9294 4.72685 15.9294 4.80787C15.9294 4.8889 15.8972 4.9666 15.8399 5.0239C15.7826 5.08119 15.7049 5.11338 15.6239 5.11338Z"
      fill="#BABAC0"></path>
      <path
        d="M7.98601 15.5006C8.14806 15.5006 8.30347 15.4362 8.41806 15.3216C8.53264 15.207 8.59702 15.0516 8.59702 14.8896V8.77947C8.59702 8.61742 8.53264 8.462 8.41806 8.34742C8.30347 8.23283 8.14806 8.16846 7.98601 8.16846C7.82396 8.16846 7.66855 8.23283 7.55396 8.34742C7.43937 8.462 7.375 8.61742 7.375 8.77947V14.8896C7.375 15.0516 7.43937 15.207 7.55396 15.3216C7.66855 15.4362 7.82396 15.5006 7.98601 15.5006Z"
      fill="#BABAC0"></path>
      <path
        d="M11.652 15.5006C11.8141 15.5006 11.9695 15.4362 12.0841 15.3216C12.1987 15.207 12.263 15.0516 12.263 14.8896V8.77947C12.263 8.61742 12.1987 8.462 12.0841 8.34742C11.9695 8.23283 11.8141 8.16846 11.652 8.16846C11.49 8.16846 11.3346 8.23283 11.22 8.34742C11.1054 8.462 11.041 8.61742 11.041 8.77947V14.8896C11.041 15.0516 11.1054 15.207 11.22 15.3216C11.3346 15.4362 11.49 15.5006 11.652 15.5006Z"
      fill="#BABAC0"></path>
  </svg>
  `;
  wishlistButton.removeEventListener('click', addToWishlist);
  wishlistButton.addEventListener('click', removeFromWishlist);
  wishlistItems.appendChild(clonedCard);
  updateWishlistCount();
}

// Функция для удаления из избранного
function removeFromWishlist(event) {
  event.preventDefault();
  const productCard = event.target.closest('.product-card');
  productCard.remove();
  updateWishlistCount();
}

// Обработчик события popstate
window.addEventListener('popstate', function (event) {
  const hash = window.location.hash;
  if (hash === '#wishlist') {
    toggleWishlist(true); // Показать избранное
  } else {
    toggleWishlist(false); // Скрыть избранное
  }
});

// Функция для показа/скрытия избранного
function toggleWishlist(show) {
  wishlist.style.display = show ? 'flex' : 'none';
  document.body.classList.toggle('_popup2', show);
}

// Добавляем обработчики событий на ссылки "Добавить в избранное"
const wishlistLinks = document.querySelectorAll('.product-card__wishlist');
wishlistLinks.forEach(function (link) {
  link.addEventListener('click', addToWishlist);
});

// Добавляем обработчики событий на ссылки "Посмотреть товар"
productCardLookLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const productCard = link.closest('.product-card');
    openPopup(productCard);
  });
});

/*--------------------------------------------кнопка наверх---------------------------------------------*/
// Появление кнопки "наверх" при определенном пролистывании страницы
window.onscroll = function () {
  showScrollToTopButton();
};

function showScrollToTopButton() {
  var scrollToTopButton = document.querySelector('.scroll-to-top');
  if (scrollToTopButton) {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  }
}

// Плавная прокрутка страницы вверх при нажатии на кнопку "наверх"
document.querySelector('.scroll-to-top').addEventListener("click", function () {
  scrollToTop();
});
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

/*--------------------------------------------ВОЙТИ---------------------------------------------*/
// Получаем ссылку на модальное окно и кнопку "Войти"
var modal = document.querySelector('.login-modal');
var loginButton = document.querySelector(".log-in");

// Обработчик клика на кнопку "Войти"
loginButton.addEventListener("click", function (event) {
  event.preventDefault();
  openModal();
  window.location.hash = "login-modal"; // Добавляем хеш в URL
});

// Обработчик клика на кнопку "Закрыть"
var closeButton = document.querySelector(".login-modal__close");
closeButton.addEventListener("click", function () {
  closeModal();
  history.pushState("", document.title, window.location.pathname + window.location.search); // Удаляем хеш из URL
});

// Обработчик клика вне модального окна для закрытия
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    closeModal();
    history.pushState("", document.title, window.location.pathname + window.location.search); // Удаляем хеш из URL
  }
  if (event.target == wishlist) {
    toggleWishlist(false); // Скрыть избранное
    history.pushState(null, null, document.URL.split('#')[0]); // Удалить хеш из URL
  }
  if (event.target == cart) {
    closeCart();
    window.location.hash = ""; // Удаляем хеш из URL
  }
  if (event.target == popup) {
    popup.style.display = 'none';
    body.classList.remove('_popup');
    window.removeEventListener('hashchange', handleHashChange);
  }
});

// Обработчик события popstate
window.addEventListener("popstate", function (event) {
  const hash = window.location.hash;
  if (hash === "#login-modal") {
    openModal(); // Открываем модальное окно
  } else {
    closeModal(); // Закрываем модальное окно
  }
});

// Функция для открытия модального окна
function openModal() {
  modal.style.display = "flex";
  body.classList.add('_popup');
}

// Функция для закрытия модального окна
function closeModal() {
  modal.style.display = "none";
  body.classList.remove('_popup');
}

const tabs = document.querySelectorAll('.login-modal__tab');
if (tabs.length > 0) {
  const tabContents = document.querySelectorAll('.tab-content');

  // Первый таб, подтаб и контент активны по умолчанию
  tabs[0].classList.add('active');
  tabContents[0].classList.add('visible');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;

      tabs.forEach(tab => {
        tab.classList.remove('active');
      });
      tab.classList.add('active');

      tabContents.forEach(tabContent => {
        tabContent.classList.remove('visible');
      });

      document.getElementById(tabId).classList.add('visible');
    });
  });
}


/*--------------------------------------------Сброс фильтра---------------------------------------------*/
// Проверяем, есть ли элемент с классом "reset-filter" на странице
if (document.querySelector('.reset-filter')) {
  // Получаем ссылку на кнопку сброса фильтра
  const resetButton = document.querySelector('.reset-filter');

  // Обработчик события для нажатия на кнопку сброса фильтра
  resetButton.addEventListener('click', function () {
    // Сбрасываем выбранные флажки
    const checkboxes = document.querySelectorAll('.filter__container input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
  });
}

/*--------------------------------------------Открытие фильтра---------------------------------------------*/
const filterToggleBtn = document.getElementById('filterToggleBtn');
const closeFilterBtn = document.querySelector('.close-filter');
const catalogFilter = document.querySelector('.catalog__filter');

if (filterToggleBtn && closeFilterBtn && catalogFilter) {
  filterToggleBtn.addEventListener('click', function () {
    catalogFilter.classList.add('visible');
    body.classList.add('filter');
  });

  closeFilterBtn.addEventListener('click', function () {
    catalogFilter.classList.remove('visible');
    body.classList.remove('filter');
  });
}

function toggleFilterVisibility() {
  if (window.innerWidth <= 768) {
    if (filterToggleBtn) {
      filterToggleBtn.style.display = 'flex';
    }
  } else {
    if (filterToggleBtn) {
      filterToggleBtn.style.display = 'none';
      catalogFilter.classList.remove('visible');
      body.classList.remove('filter');
    }
  }
}

window.addEventListener('resize', toggleFilterVisibility);
toggleFilterVisibility();

document.addEventListener('click', function (event) {
  if (catalogFilter && !catalogFilter.contains(event.target) &&
    filterToggleBtn && !filterToggleBtn.contains(event.target) &&
    closeFilterBtn && !closeFilterBtn.contains(event.target)) {
    catalogFilter.classList.remove('visible');
    body.classList.remove('filter');
  }
});

/*--------------------------------------------Цена От/До---------------------------------------------*/
var slider = document.getElementById('price-range');
var inputMin = document.getElementById('input-min');
var inputMax = document.getElementById('input-max');

if (slider && inputMin && inputMax) {
  noUiSlider.create(slider, {
    start: [100000, 1000000],
    connect: true,
    range: {
      'min': 100000,
      'max': 1000000
    },
    step: 10000 // Шаг ползунка
  });

  slider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    if (handle === 0) {
      inputMin.value = formatNumber(Math.round(value));
    } else {
      inputMax.value = formatNumber(Math.round(value));
    }
  });

  function formatNumber(number) {
    return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  }

  inputMin.addEventListener('change', function () {
    if (this.value && inputMax.value) {
      slider.noUiSlider.set([this.value, null]);
    }
  });

  inputMax.addEventListener('change', function () {
    if (this.value && inputMin.value) {
      slider.noUiSlider.set([null, this.value]);
    }
  });
}

/*--------------------------------------------скрыть доп текст---------------------------------------------*/
var showMoreBtn = document.getElementById('showMoreBtn');
if (showMoreBtn) {
  showMoreBtn.addEventListener('click', function () {
    var content = document.querySelector('.welcome__text');
    if (content.style.maxHeight) {
      // Если текст уже полностью показан, скрыть его на половину
      content.style.maxHeight = '';
      this.textContent = 'Показать полностью';
    } else {
      // Если текст скрыт, показать его полностью
      content.style.maxHeight = content.scrollHeight + 'px';
      this.textContent = 'Скрыть';
    }
  });
}
/*--------------------------------------------Доп бренды---------------------------------------------*/
var brandList = document.getElementById('brandlist');
if (brandList) {
  var brandItems = brandList.getElementsByClassName('brandlist-item');
  var showMoreButton = document.getElementById('showMoreBrandButton');

  if (brandItems.length > 0 && showMoreButton) {
    var hiddenItems = Array.from(brandItems).slice(5);

    // Скрываем остальные элементы
    hiddenItems.forEach(function (item) {
      item.style.display = 'none';
    });

    showMoreButton.addEventListener('click', function () {
      // Отображаем или скрываем скрытые элементы
      hiddenItems.forEach(function (item) {
        if (item.style.display === 'none') {
          item.style.display = 'list-item';
          showMoreButton.textContent = 'скрыть';
        } else {
          item.style.display = 'none';
          showMoreButton.textContent = 'еще...';
        }
      });
    });
  }
}


/*--------------------------------------------Пагинация каталога---------------------------------------------*/
// Функция для загрузки товаров на указанной странице с помощью AJAX
/*function loadProducts(page) {
  // Создаем новый AJAX-запрос
  var xhr = new XMLHttpRequest();

  // Настраиваем обработчик успешного выполнения запроса
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Обновляем содержимое блока товаров
      document.getElementById('products').innerHTML = xhr.responseText;
    }
  };

  // Отправляем AJAX-запрос на сервер
  xhr.open('GET', 'load_products.php?page=' + page + '&perPage=9', true);
  xhr.send();
}

// Обработчик клика на ссылке предыдущей страницы
prevLink.addEventListener('click', function (e) {
  e.preventDefault();
  // Получаем текущую активную страницу
  var currentPage = parseInt(document.querySelector('.pagination__page.active').textContent);

  if (currentPage > 1) {
    // Вычитаем 1 из текущей страницы и загружаем товары для предыдущей страницы
    loadProducts(currentPage - 1);
    // Обновляем активную страницу
    updateActivePage(currentPage - 1);
  }
});

// Обработчик клика на ссылке следующей страницы
nextLink.addEventListener('click', function (e) {
  e.preventDefault();
  // Получаем текущую активную страницу
  var currentPage = parseInt(document.querySelector('.pagination__page.active').textContent);

  // Загружаем товары для следующей страницы
  loadProducts(currentPage + 1);
  // Обновляем активную страницу
  updateActivePage(currentPage + 1);
});

// Обработчик клика на ссылке страницы
pageLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var selectedPage = parseInt(link.textContent);
    // Загружаем товары для выбранной страницы
    loadProducts(selectedPage);
    // Обновляем активную страницу
    updateActivePage(selectedPage);
  });
});
*/