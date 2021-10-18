//Функция генерации случайного положительного числа в заданном диапазоне
const getRandomNumber = function(rangeFrom, rangeTo) {
  rangeFrom = Math.abs(rangeFrom);
  rangeTo = Math.abs(rangeTo);

  if (rangeTo - rangeFrom < 0) {
    [rangeFrom, rangeTo] = [rangeTo, rangeFrom];
  }

  const randNumber = rangeFrom - 0.5 + Math.random() * (rangeTo - rangeFrom + 1);
  return Math.round(randNumber);
};

//Функция создания массива от rangeFrom и до rangeTo
const getArray = function (rangeFrom, rangeTo) {
  return (new Array(rangeTo - rangeFrom + 1))
    .fill(undefined)
    .map((item, index) => index + rangeFrom);
};

//Функция проверки длины комментария
const checkStringLength = ( str, maxlength ) => ( str.length <= maxlength );

export { getRandomNumber, getArray, checkStringLength };
