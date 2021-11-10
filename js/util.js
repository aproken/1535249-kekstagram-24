//Функция-генератор случайного положительного числа в заданном диапазоне
const getRandomNumber = (rangeFrom, rangeTo) => {
  rangeFrom = Math.abs(rangeFrom);
  rangeTo = Math.abs(rangeTo);

  if (rangeTo - rangeFrom < 0) {
    [rangeFrom, rangeTo] = [rangeTo, rangeFrom];
  }

  const randNumber = rangeFrom - 0.5 + Math.random() * (rangeTo - rangeFrom + 1);
  return Math.round(randNumber);
};

// Функция-генератор для получения уникальных идентификаторов из указанного диапазона
const createRandomIdFromRange = (rangeFrom, rangeTo) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomNumber(rangeFrom, rangeTo);

    if (previousValues.length >= (rangeTo - rangeFrom + 1)) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(rangeFrom, rangeTo);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

//Функция проверки длины комментария
const checkStringLength = ( str, maxlength ) => ( str.length <= maxlength );

// Функция-проверка нажатой клавиши
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция подсчета количества одного и того же элемента в массиве
const getCounter = (array) => {
  const count = {};
  array.forEach((item) => count[item] = (count[item] || 0) + 1);
  return count;
};

// Функция удаления дублей из массива
const getUniqueArray = (array) => Array.from(new Set(array));

const ALERT_SHOW_TIME = 5000;

// Функция показывает сообщение с ошибкой на 5 секунд
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {
  getRandomNumber,
  createRandomIdFromRange,
  checkStringLength,
  isEscapeKey,
  getCounter,
  getUniqueArray,
  showAlert
};
