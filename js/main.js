import { createPhotoDescription } from './create-photo-desription.js';
import { getArray } from './utils.js';
import { renderThumbnails } from './rendering-thumbnails.js';

//Получение списка случайных комментариев
const getRandomPhotoList = () => {
  const photos = getArray(1, 25).map((item, index) => createPhotoDescription(index + 1));
  renderThumbnails(photos);
};

getRandomPhotoList();
