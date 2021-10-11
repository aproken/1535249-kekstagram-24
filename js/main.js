//Функция проверки длины комментария
const checkStringLength = (str, maxlength) => (str.length <= maxlength);
checkStringLength('Длина не самого длинного комментария', 10);

//Функция генерации случайного положительного числа в заданном диапазоне
const getRandomNumber = function(rangeFrom, rangeTo) {
  rangeFrom = Math.abs(rangeFrom);
  rangeTo = Math.abs(rangeTo);

  if (rangeTo - rangeFrom < 0) {
    [rangeFrom, rangeTo] = [rangeTo, rangeFrom];
  }

  const rand = rangeFrom - 0.5 + Math.random() * (rangeTo - rangeFrom + 1);
  return Math.round(rand);
};

// создание массива от rangeFrom и до rangeTo
const range = function (rangeFrom, rangeTo) {
  return (new Array(rangeTo - rangeFrom + 1))
    .fill(undefined)
    .map((item, index) => index + rangeFrom);
};

const existsIds = [];

//Функция генерации уникального id
const getUniqueId = function(rangeTo = 9999999) {
  let newId = getRandomNumber(0, rangeTo);

  while (existsIds.includes(newId)){
    newId = getRandomNumber(0, rangeTo);
  }

  existsIds.push(newId);
  return newId;
};

const dataUsername = [
  'Иван Иваныч',
  'Кот Леопольд',
  'Terminator',
  'Васечка',
  'Dmitry Ivanov',
  'DragonFly',
];
const dataMessage = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Функция для создания случайного обьекта коментария
const createComment = function() {
  const commentId = getUniqueId();
  const userId = getRandomNumber(1, 6);
  const avatar = `img/avatar-${userId}.svg`;
  const userName = dataUsername[userId - 1];
  const userMessage = dataMessage[getRandomNumber(0, 5)];

  return {
    id: commentId,
    avatar: avatar,
    message: userMessage,
    name: userName,
  };
};

// Создание списка случайных коментариев
const createCommetsList = function () {
  const quantity = getRandomNumber(3, 12);
  const commetsList = [];

  for (let index = 0; index <= quantity; index++) {
    commetsList.push(createComment());
  }
  return commetsList;
};


// Создание обьекта описания фотографии
const createPhotoDescription = function (photoId) {
  const photoUrl = `photos/${photoId}.jpg`;//могут повторятся
  const photoDescription = 'Натуральный детокс организма обеспечен вам только от одного просмотра';
  const photoLikes = getRandomNumber(15, 200);
  const photoComments = createCommetsList();

  return {
    id: photoId,
    url: photoUrl,
    description: photoDescription,
    likes: photoLikes,
    comments: photoComments,
  };
};


const getRandomPhotoList = function() {
  return range(1, 25).map((index) => createPhotoDescription(index));
};

getRandomPhotoList();
