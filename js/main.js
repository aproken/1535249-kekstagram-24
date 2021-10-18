import { createPhotoDescription } from './create-photo-desription.js';
import { getArray } from './utils.js';

//Получение списка случайных комментариев
const getRandomPhotoList = function() {
  return getArray(1, 25).map((index) => createPhotoDescription(index));
};
