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
      console.error(`Использованы все числа из указанного диапазона от ${rangeFrom} до ${rangeTo}`);
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

export {
  getRandomNumber,
  createRandomIdFromRange,
  checkStringLength
};
