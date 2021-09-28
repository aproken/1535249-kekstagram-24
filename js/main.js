const randomInteger = function(min, max) {
  if (max - min < 0) {
    const swap = min;
    min = max;
    max = swap;
  }
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const maxLength = function(str, maxlength) {
  return (str.length <= maxlength);
};

randomInteger(1, 5);

maxLength('Длина не самого длинного комментария', 10);

