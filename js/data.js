import {
  getRandomNumber,
  createRandomIdFromRange
} from './util.js';

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const USER_NAMES = [
  'Иван Иваныч',
  'Кот Леопольд',
  'Terminator',
  'Васечка',
  'Dmitry Ivanov',
  'DragonFly',
];

const PHOTO_DESCRIPTIONS = [
  'Натуральный детокс организма обеспечен вам только от одного просмотра',
  'Как будто другую планету рассматриваю.',
  'Нужны ли наши фильтры… Думаю, ответ очевиден.',
  'Просто красота и ничего лишнего.',
  'Кусочек натуральности среди каменных джунглей.',
  'Мощнейший источник положительной энергетики сам напросился вам в ленту. Наслаждайтесь, подзаряжайтесь, оздоравливайтесь!',
  'Время проведенное на природе – бесценно. Для всего остального есть «мастер-кард».',
  'Вот кому в любую погоду и в любое время года хочется сказать: «Вау! Какая ты шикарная!»',
  'Полученную от природы пользу невозможно описать, ее можно только почувствовать. Лайкайте фото и чувствуйте пользу!',
  'Мы открываемся природе так же, как она открывается нам. И в этом акте откровения мы находим что-то новое в себе.',
  'Созерцая эти пейзажи хочется меньше думать и больше жить.',
  'Остановись мгновенье, ты прекрасно!',
  'Вот этот пейзаж – провокатор сегодняшней фотосессии.',
  'Жаль, что камера, запечатлев очарование пейзажа, неспособна запечатлеть и окружающие запахи, шорохи, звуки… Тогда счастье было бы полным.',
  'Сегодняшние обнимашки с природой.',
  'Так выглядит рай для городского человека.',
  'Категорически не рекомендую данное место для посещения, потому что оно – мое!!!',
  'Любая часть дня – лучшая, если вокруг окружающая среда неземной красоты.',
  'Кажется, этот мир не устанет потрясать меня.',
  'Дышу красотой… И пусть весь мир подождет!',
  'Идеальный «интерьер» для прочистки мозгов и выброса накопившейся усталости.',
  'Только когда я смотрю на это, понимаю, что вот сейчас мне всего в жизни достаточно.',
  'Я вижу это! И мне просто – хорошо!',
  'Dream Time.',
  'Вот что не позволяет очерстветь душой.',
  'А над головой распахнутое настежь небо!',
];

const PHOTO_COUNT = 25;
const USER_COUNT = 6;
const MAX_ID_COUNT = 99999;
const COMMENTS_COUNT = [5, 12];
const LIKES_COUNT = [15, 200];

const commentId = createRandomIdFromRange(1, MAX_ID_COUNT);

// Функция-генератор одного элемента-комментария от пользователя
const createСommentItem = () => {
  const userId = getRandomNumber(1, USER_COUNT);
  const avatar = `img/avatar-${userId}.svg`;
  const message = COMMENT_MESSAGES[getRandomNumber(0, COMMENT_MESSAGES.length - 1)];
  const name = USER_NAMES[userId - 1];

  return {
    id: commentId(),
    avatar: avatar,
    message: message,
    name: name,
  };
};

// Функция-генератор массива объектов — списка комментариев, оставленных другими пользователями к этой фотографии
const createComments = () => {
  const quantity = getRandomNumber(...COMMENTS_COUNT);
  const comments = [];

  for (let item = 0; item < quantity; item++) {
    comments.push(createСommentItem());
  }

  return comments;
};

const photoDescriptionId = createRandomIdFromRange(1, PHOTO_COUNT);

// Функция-генератор одного элемента-описания фотографии от пользователя
const createPhotoDescriptionItem = () => {
  const id = photoDescriptionId();
  const url = `photos/${id}.jpg`;
  const description = PHOTO_DESCRIPTIONS[id - 1];
  const likes = getRandomNumber(...LIKES_COUNT);
  const comments = createComments();

  return {
    id: id,
    url: url,
    description: description,
    likes: likes,
    comments: comments,
  };
};

// Функция-генератор массива из 25 объектов-описаний фотографий
const createPhotoDescriptions = () => {
  const photoDescriptions = [];

  for (let item = 0; item < PHOTO_COUNT; item++) {
    photoDescriptions.push(createPhotoDescriptionItem());
  }

  return photoDescriptions;
};

export {
  createPhotoDescriptions
};
