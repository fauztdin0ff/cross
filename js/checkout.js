// Получаем элементы формы оплаты
const payForm = document.querySelector('.pay-form');
const cardMethod = document.querySelector('.pay-form__card');
const cashMethod = document.querySelector('.pay-form__cash');

// Добавляем обработчик события на клик по способам оплаты
const payMethods = document.querySelectorAll('.pay-form__method');
payMethods.forEach((method) => {
   method.addEventListener('click', handlePaymentMethod);
});

// Функция обработки события выбора способа оплаты
function handlePaymentMethod(event) {
   // Удаляем класс "active" у всех способов оплаты
   payMethods.forEach((method) => {
      method.classList.remove('active');
   });

   // Добавляем класс "active" к выбранному способу оплаты
   event.target.classList.add('active');

   // Получаем выбранный способ оплаты
   const selectedMethod = event.target.textContent.trim();

   // Скрываем все блоки оплаты
   cardMethod.style.display = 'none';
   cashMethod.style.display = 'none';

   // Отображаем выбранный способ оплаты
   if (selectedMethod === 'Картой') {
      cardMethod.style.display = 'flex';
   } else if (selectedMethod === 'Наличными') {
      cashMethod.style.display = 'flex';
   }
}

/*--------------------------------------------Выбор города табы---------------------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   var tabs = document.querySelectorAll('.delivery-form__tab');
   var tashkentRadio = document.getElementById('tashkent-radio');
   var otherRadio = document.getElementById('other-radio');
   var tashkentDiv = document.getElementById('tashkent-city');
   var otherDiv = document.getElementById('other-city');

   tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
         tabs.forEach(function (tab) {
            tab.classList.remove('active');
         });
         tab.classList.add('active');
      });
   });

   tashkentRadio.addEventListener('change', function () {
      tashkentDiv.classList.add('show');
      otherDiv.classList.remove('show');
   });

   otherRadio.addEventListener('change', function () {
      tashkentDiv.classList.remove('show');
      otherDiv.classList.add('show');
   });

   tashkentDiv.classList.add('show');
});

/*--------------------------------------------Номер телефона---------------------------------------------*/
const phoneInput = document.getElementById('telephone');

phoneInput.addEventListener('input', formatPhoneNumber);
function formatPhoneNumber() {
   let phoneNumber = phoneInput.value;
   // Удаление всех символов, кроме цифр
   phoneNumber = phoneNumber.replace(/\D/g, '');
   // Добавление пробелов в нужных местах
   if (phoneNumber.length > 3) {
      phoneNumber = phoneNumber.replace(/^(\d{3})(\d+)/, '$1 $2');
   }
   if (phoneNumber.length > 5) {
      phoneNumber = phoneNumber.replace(/^(\d{3}) (\d{2})(\d+)/, '$1 $2 $3');
   }
   if (phoneNumber.length > 8) {
      phoneNumber = phoneNumber.replace(/^(\d{3}) (\d{2}) (\d{3})(\d+)/, '$1 $2 $3 $4');
   }
   if (phoneNumber.length > 10) {
      phoneNumber = phoneNumber.replace(/^(\d{3}) (\d{2}) (\d{3}) (\d{2})(\d+)/, '$1 $2 $3 $4 $5');
   }
   if (phoneNumber.length > 12) {
      phoneNumber = phoneNumber.replace(/^(\d{3}) (\d{2}) (\d{3}) (\d{2}) (\d{2})(\d+)/, '$1 $2 $3 $4 $5 $6');
   }
   // Добавление символа "+" в начало номера
   phoneNumber = '+' + phoneNumber;
   phoneInput.value = phoneNumber;
}

/*--------------------------------------------Кнопки Карта---------------------------------------------*/
// Получаем радиокнопки по имени
const paymentRadios = document.getElementsByName("payment");

// Добавляем обработчик события для каждой радиокнопки
paymentRadios.forEach(function (radio) {
   radio.addEventListener("click", function () {
      // Удаляем класс "active" у всех элементов
      document.querySelectorAll('.pay-form__card > div').forEach(function (element) {
         element.classList.remove("active");
      });

      // Добавляем класс "active" для выбранного элемента
      this.parentNode.classList.add("active");
   });
});
