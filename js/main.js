const getRandomNumber = function(min, max) {
  min = Math.abs(min);
  max = Math.abs(max);

  if (max - min < 0) {
    [min, max] = [max, min];
  }

  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const checkStringLength = (str, maxlength) => (str.length <= maxlength);

getRandomNumber(1, 5);

checkStringLength('Длина не самого длинного комментария', 10);
