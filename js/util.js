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


const createRandomElementFromArray = (array) => {
  const previousValues = [];

  return () => {
    let currentValueIndex = getRandomNumber(0, array.length);
    let currentValue = array[currentValueIndex];

    if (previousValues.length >= array.length) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValueIndex = getRandomNumber(0, array.length);
      currentValue = array[currentValueIndex];
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

const createRandomElementsFromArray = (array, count) => {
  const randomElements = [];
  const getRandom = createRandomElementFromArray(array);

  for (let item = 0; item < count; item++) {
    randomElements.push(getRandom());
  }
  return randomElements;
};

// Функция перемешивания масива
// взята из интернета и доработана
// Источник - https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => {
  const unsorted = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((aItem, bItem) => aItem.sort - bItem.sort)
    .map(({ value }) => value);
  return unsorted;
};

// Функция получения N случайных элементов из масива
const getNRandomElements = (array, count) => shuffle(array).slice(0, count);

export {
  getRandomNumber,
  createRandomIdFromRange,
  checkStringLength,
  isEscapeKey,
  getCounter,
  getUniqueArray,
  getNRandomElements,
  shuffle,
  createRandomElementsFromArray
};
