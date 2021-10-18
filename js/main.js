import { createPhotoDescription } from './create-photo-desription.js';
import { getArray } from './utils.js';

//Получение списка случайных комментариев
const getRandomPhotoList = () => getArray(1, 25).map((item, index) => createPhotoDescription(index));

getRandomPhotoList();
