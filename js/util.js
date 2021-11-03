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

// Функция закрытия окна
const closeFormDeferred = (form, buttonClose, afterCallback) => {
  const handlerOnEscape = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      form.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', handlerOnEscape);
    }
  };

  const handlerOnCancel = () => {
    form.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    buttonClose.removeEventListener('click', handlerOnCancel);
  };

  document.addEventListener('keydown', handlerOnEscape);
  buttonClose.addEventListener('click', handlerOnCancel);

  if (afterCallback) {
    afterCallback();
  }
};

// Функция подсчета количества одного и того же элемента в массиве
const getCounter = (array) => {
  const count = {};
  array.forEach((item) => count[item] = (count[item] || 0) + 1);
  return count;
};

// Функция удаления дублей из массива
const getUniqueArray = (array) => Array.from(new Set(array));

export {
  getRandomNumber,
  createRandomIdFromRange,
  checkStringLength,
  isEscapeKey,
  closeFormDeferred,
  getCounter,
  getUniqueArray
};
