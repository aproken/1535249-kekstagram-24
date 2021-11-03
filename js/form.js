import { closeFormDeferred, getCounter, getUniqueArray } from './util.js';

//Этот модуль отвечает за форму
const HESHTEG = {
  SYMBOL: '#',
  MIN_SIZE: 2,
  MAX_SIZE: 20,
  QUANTITY: 5,
};

const imgUploadForm = document.querySelector('#upload-select-image');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const uploadCancel = imgUploadForm.querySelector('#upload-cancel');

// Функция показа окна редактирования изображения
const showImgUploadForm = () => {
  uploadFile.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
  });
};

const resetFileUpload = () => {
  uploadFile.value = '';
};

// Закрытие окна редактирования изображения
closeFormDeferred(imgUploadOverlay, uploadCancel, resetFileUpload);

// Функция проверки одного хэштега
const checkHashtagItem = (tag) => {
  const errorMessages = [];
  const valueLength = tag.length;

  if (valueLength < HESHTEG.MIN_SIZE) {
    errorMessages.push(`Тэг должен содержать не менее ${ HESHTEG.MIN_SIZE } симв.`);
  }
  if (valueLength > HESHTEG.MAX_SIZE) {
    errorMessages.push(`Тэг должен содержать не более ${ HESHTEG.MAX_SIZE } симв.`);
  }

  if (!tag.match(/^#[0-9a-zа-яё]+$/)) {
    errorMessages.push('Тэг должен начинаться с "#" и содержать буквы и/или цифры');
  }
  return errorMessages;
};

// Функция проверки строки хэштегов
const checkHashtags = (str) => {
  str = str.toLocaleLowerCase();
  str = str.replace(/\s+/g, ' ');
  let rawKeyword = str.split(/\s/);

  rawKeyword = rawKeyword.filter((item) => item !== '');

  const errorMessages = rawKeyword.map(checkHashtagItem).flat();

  if (rawKeyword.length > HESHTEG.QUANTITY) {
    errorMessages.push(`Тэгов не может быть больше ${HESHTEG.QUANTITY}`);
  }

  const countItems = getCounter(rawKeyword);
  // если каждый тег встречается не по одному разу, то ошибка
  if (! Object.values(countItems).every( (item) => item <= 1 )) {
    errorMessages.push('Тэги должны быть уникальны');
  }

  return errorMessages;
};

// Валидация формы редактирования
imgUploadForm.addEventListener('input', (evt) => {
  let errorMessages = checkHashtags(textHashtags.value);

  if (errorMessages.length > 0) {
    errorMessages = getUniqueArray(errorMessages);
    const errorMessage = errorMessages.join('\n');
    textHashtags.setCustomValidity(errorMessage);
    evt.preventDefault();
  } else {
    textHashtags.setCustomValidity('');
  }

  textHashtags.reportValidity();
});

export {
  showImgUploadForm
};
