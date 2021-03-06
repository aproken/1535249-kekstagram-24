// Этот модуль отвечает за отрисовку миниатюр
import { showBigPictire } from './full-photo.js';
import { isEscapeKey } from './util.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const pictureCancel  = bigPicture.querySelector('#picture-cancel');

// Функция-генератор DOM-элемента, соответствующего одной фотографии, и заполния его данными
const createThumbnailElement = (template, element) => {
  const thumbnail = template.cloneNode(true);
  thumbnail.dataset.pictureId = element['id'];

  const pictureImg = thumbnail.querySelector('.picture__img');
  pictureImg.src = element['url'];

  const pictureComments = thumbnail.querySelector('.picture__comments');
  pictureComments.textContent = element['comments'].length;

  const pictureLikes = thumbnail.querySelector('.picture__likes');
  pictureLikes.textContent = element['likes'];

  return thumbnail;
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

  // Функция обработки клика по миниатюре
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

  return pictures;
};

// Удаление всех отрисованных фото-миниатюр со страницы
const removeThumbnailElements = () => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
};

export { renderThumbnailElements, removeThumbnailElements };

