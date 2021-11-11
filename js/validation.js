import {
  getCounter,
  getUniqueArray
} from './util.js';

const Heshteg = {
  MIN_SIZE: 2,
  MAX_SIZE: 20,
  QUANTITY: 5,
};

//const ERROR_BORDER = '2px solid tomato';

const imgUploadForm = document.querySelector('#upload-select-image');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');

// Функция проверки одного хэштега
const checkHashtagItem = (tag) => {
  const errorMessages = [];
  const valueLength = tag.length;

  if (valueLength < Heshteg.MIN_SIZE) {
    errorMessages.push(`Тэг должен содержать не менее ${ Heshteg.MIN_SIZE } симв.`);
  }
  if (valueLength > Heshteg.MAX_SIZE) {
    errorMessages.push(`Тэг должен содержать не более ${ Heshteg.MAX_SIZE } симв.`);
  }

  if (!tag.match(/^#[0-9a-zа-яё]+$/)) {
    errorMessages.push('Тэг должен начинаться с "#" и содержать буквы и/или цифры');
  }
  return errorMessages;
};

// Функция проверки строки хэштегов
const checkHashtags = (str) => {
  str = str.toLocaleLowerCase().replace(/\s+/g, ' ');
  let rawKeyword = str.split(/\s/);

  rawKeyword = rawKeyword.filter((item) => item !== '');

  const errorMessages = rawKeyword.map(checkHashtagItem).flat();

  if (rawKeyword.length > Heshteg.QUANTITY) {
    errorMessages.push(`Тэгов не может быть больше ${Heshteg.QUANTITY}`);
  }

  const countItems = getCounter(rawKeyword);

  if (! Object.values(countItems).every( (item) => item <= 1 )) {
    errorMessages.push('Тэги должны быть уникальны');
  }

  return errorMessages;
};

// Функция валидации формы редактирования
const validateForm = (evt) => {
  let errorMessages = checkHashtags(textHashtags.value);

  if (errorMessages.length > 0) {
    errorMessages = getUniqueArray(errorMessages);
    const errorMessage = errorMessages.join('\n');
    textHashtags.setCustomValidity(errorMessage);
    textHashtags.classList.add('input-error');
    evt.preventDefault();
  } else {
    textHashtags.setCustomValidity('');
    textHashtags.classList.remove('input-error');
  }

  textHashtags.reportValidity();
};

const init = () => {
  // Валидация формы редактирования
  imgUploadForm.addEventListener('input', validateForm);
};

const off = () => {
  imgUploadForm.removeEventListener('input', validateForm);
};

export {
  init,
  off
};
