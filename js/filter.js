// Этот модуль отрисовывает фото-миниатюры согласно выбранному
import {
  renderThumbnailElements,
  removeThumbnailElements
} from './thumbnails.js';

import {
  getNRandomElements
} from './util.js';

import { debounce } from './utils/debounce.js';

const COUNT_PHOTOS = 10;
const RERENDER_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const filterDefault =  imgFiltersForm.querySelector('#filter-default');
const filterRandom =  imgFiltersForm.querySelector('#filter-random');
const filterDiscussed =  imgFiltersForm.querySelector('#filter-discussed');

// Показать блок фильтров для загруженных изображений
const showImgFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

// Функция сортировки фотографий по уровню обсуждаемости
const sortPhotosCommentsLength = (photos) => {
  const compareFn = (aItem, bItem) => bItem.comments.length - aItem.comments.length;
  return photos.sort(compareFn);
};

const toggleActiveFilter = (btn) => {
  document.querySelectorAll('.img-filters__button--active').forEach((item) => item.classList.remove('img-filters__button--active'));
  btn.classList.add('img-filters__button--active');
};

// Иницирует модуль работы с фильтрами
const init = (photos) => {
  renderThumbnailElements(photos);

  // Обработчик события выбора фильтра "Обсуждаемые"
  const onFilterDiscussedClick = () => {
    const sortedPhotos = sortPhotosCommentsLength(photos);
    removeThumbnailElements();
    renderThumbnailElements(sortedPhotos);
    toggleActiveFilter(filterDiscussed);
  };

  // Обработчик события выбора фильтра "Случайные"
  const onFilterRandomClick = () => {
    const sortedPhotos = getNRandomElements(photos, COUNT_PHOTOS);
    removeThumbnailElements();
    renderThumbnailElements(sortedPhotos);
    toggleActiveFilter(filterRandom);
  };

  // Обработчик события выбора фильтра "По умолчанию"
  const onFilterDefaultClick = () => {
    renderThumbnailElements(photos);
    toggleActiveFilter(filterDefault);
  };

  filterDefault.addEventListener('click', debounce(onFilterDefaultClick, RERENDER_DELAY));
  filterRandom.addEventListener('click',  debounce(onFilterRandomClick, RERENDER_DELAY));
  filterDiscussed.addEventListener('click',  debounce(onFilterDiscussedClick, RERENDER_DELAY));
};

export { showImgFilters, init};

