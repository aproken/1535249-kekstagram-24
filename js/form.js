//Этот модуль отвечает за форму
import { closeFormDeferred } from './modal-close.js';
import './validation.js';
import './scale-img.js';
import './effect-img.js';
import { showAlert } from './util.js';
import { sendData } from './api.js';

const imgUploadForm = document.querySelector('#upload-select-image');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const uploadCancel = imgUploadForm.querySelector('#upload-cancel');

// Функция показа окна редактирования изображения
const showImgUploadForm = () => {
  uploadFile.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
  });
};

// Функция сбрасывания значений полей
const resetFileUpload = () => {
  uploadFile.value = '';
  imgUploadForm.querySelector('#effect-none').checked = true;
  imgUploadPreview.style = '';
  effectLevelValue.value = '';
  imgUploadPreview.className = '';
  if (effectLevelSlider.noUiSlider){
    effectLevelSlider.noUiSlider.destroy();
  }
};

// Закрытие окна редактирования изображения
const closeModal = closeFormDeferred(imgUploadOverlay, uploadCancel, resetFileUpload);

const onSuccess = () => {
  showAlert('Форма отправлена успешно!');
  resetFileUpload();
  closeModal();
};

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(onSuccess, showAlert, formData);
});

export {
  showImgUploadForm
};
