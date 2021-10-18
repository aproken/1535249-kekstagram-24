import { getRandomNumber } from './utils.js';

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

const existsIds = [];

const defaultRangeTo = 9999999;
const quantityUsers = 6;
const rangeQuantityComment = [3, 12];

//Функция генерации уникального id
const getUniqueId = (rangeTo = defaultRangeTo) => {
  let newId = getRandomNumber(0, rangeTo);

  while (existsIds.includes(newId)){
    newId = getRandomNumber(0, rangeTo);
  }

  existsIds.push(newId);
  return newId;
};

//Функция для создания случайного комментария
const createComment = () => {
  const commentId = getUniqueId();
  const userId = getRandomNumber(1, quantityUsers);
  const avatar = `img/avatar-${userId}.svg`;
  const userName = dataUsername[userId - 1];
  const userMessage = dataMessage[getRandomNumber(0, quantityUsers - 1)];

  return {
    id: commentId,
    avatar: avatar,
    message: userMessage,
    name: userName,
  };
};

// Создание списка случайных коментариев
const createCommetsList = () => {
  const quantity = getRandomNumber(...rangeQuantityComment);
  const commetsList = [];

  for (let index = 0; index <= quantity; index++) {
    commetsList.push(createComment());
  }
  return commetsList;
};

export { getUniqueId, createComment, createCommetsList };
