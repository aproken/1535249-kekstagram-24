import { isEscapeKey } from './util.js';
import  * as validation from './validation.js';
import { showSuccessMessage, showErrorMessage } from './notifications.js';
import { sendData } from './api.js';
import * as effect from './effect.js';
import * as scale from './scale.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadFile = uploadForm.querySelector('#upload-file');
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('#upload-cancel');


// Сбросить состояние формы
const resetFileUploadForm = () => {
  uploadForm.reset();
  // TODO: Нужно проверить, что больше ничего не нужно
};

// Показать модальное окно
const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

// Скрыть модальное окно
const closeModalForm = () => {
  effect.off();
  validation.off();
  scale.off();
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

// обработчик успешной загрузки формы на сервер
const onSuccess = () => {
  resetFileUploadForm();
  closeModalForm();
  showSuccessMessage();
};

// обработчик ошибки при отправке на сервер формы
const onFail = () => {
  showErrorMessage();
};

// обработчик закрытия окна формы
const onCloseClick = () => {
  resetFileUploadForm();
  closeModalForm();
};

const onEscPress = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalForm();
  }
};

// Обработчик отправки формы
const onSubmite = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(onSuccess, onFail, formData);
};


// Обработчик события выбора файла для загрузки
const onChangeUploadImg = () => {
  openUploadForm();

  effect.init();
  validation.init();
  scale.init();

  uploadCancel.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onEscPress);
  uploadForm.addEventListener('submit', onSubmite);
};

const setListenerUploadImg = () => {
  uploadFile.addEventListener('change', onChangeUploadImg);
};

export {
  setListenerUploadImg
};
