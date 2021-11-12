// Этот модуль отвечает за отрисовку миниатюр
import { showBigPictire } from './full-photo.js';
import { isEscapeKey } from './util.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const pictureCancel  = bigPicture.querySelector('#picture-cancel');


// Функция-генератор DOM-элемента, соответствующего одной фотографии, и заполния его данными
const createThumbnailElement = (template, element) => {
  const thumbnailElement = template.cloneNode(true);
  thumbnailElement.dataset.pictureId = element['id'];

  const pictureImg = thumbnailElement.querySelector('.picture__img');
  pictureImg.src = element['url'];

  const pictureComments = thumbnailElement.querySelector('.picture__comments');
  pictureComments.textContent = element['comments'].length;

  const pictureLikes = thumbnailElement.querySelector('.picture__likes');
  pictureLikes.textContent = element['likes'];

  return thumbnailElement;
};

// Функция отрисовки фото-миниатюр на страницу
const renderThumbnailElements = (elements) => {
  const template = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const fragment = document.createDocumentFragment();

  elements.forEach((item) => {
    fragment.appendChild(createThumbnailElement(template, item));
  });

  pictures.appendChild(fragment);

  return pictures;
};

let onEscPress = null;
let onCloseClick = null;

onEscPress = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    pictureCancel.removeEventListener('click', onCloseClick);
    document.removeEventListener('keydown', onEscPress);
  }
};

onCloseClick = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  pictureCancel.removeEventListener('click', onCloseClick);
  document.removeEventListener('keydown', onEscPress);
};


// Функция обработки клика по миниатюре
const reactThumbnailClick = (elements) => {
  const onThumbnailClick = (evt) => {
    if (evt.target && evt.target.closest('.picture')) {
      const pictureId = evt.target.closest('.picture').dataset.pictureId;
      const elementIndex = elements.findIndex((item) => item['id'] === Number(pictureId));
      showBigPictire(elements[elementIndex]);

      pictureCancel.addEventListener('click', onCloseClick);
      document.addEventListener('keydown', onEscPress);
    }
  };

  pictures.addEventListener('click', onThumbnailClick);
};

export {
  renderThumbnailElements,
  reactThumbnailClick
};

