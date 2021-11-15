// Этот модуль отвечает за редактирование масштаба изображения
const Scale = {
  STEP: 25,
  DEFAULT_VALUE: 100,
  MIN_VALUE: 25,
  MAX_VALUE: 100,
};

const imgUploadForm = document.querySelector('#upload-select-image');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const scale = imgUploadForm.querySelector('.scale');
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const scaleValueShadow = imgUploadForm.querySelector('#scale_value');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');

const transformImgScale = () => imgUploadPreview.style.transform = `scale(${parseInt(scaleControlValue.value, 10) / 100})`;

// Функция редактирования масштаба изображения
const editImgScale = (evt) => {
  let newScaleValue = Scale['DEFAULT_VALUE'];
  if (evt.target === scaleControlSmaller) {
    if (parseInt(scaleControlValue.value, 10) === Scale['MIN_VALUE']) {
      scaleControlValue.value = `${Scale['MIN_VALUE']}%`;
      scaleValueShadow.value = `${Scale['MIN_VALUE']}%`;
    } else {
      newScaleValue = `${parseInt(scaleControlValue.value, 10) - Scale['STEP']}%`;
      scaleControlValue.value = newScaleValue;
      scaleValueShadow.value = newScaleValue;
      transformImgScale();
    }
  }

  if (evt.target === scaleControlBigger) {
    if (parseInt(scaleControlValue.value, 10) === Scale['MAX_VALUE']) {
      scaleControlValue.value = `${Scale['DEFAULT_VALUE']}%`;
      scaleValueShadow.value = `${Scale['DEFAULT_VALUE']}%`;
    } else {
      newScaleValue = `${parseInt(scaleControlValue.value, 10) + Scale['STEP']}%`;
      scaleControlValue.value = newScaleValue;
      scaleValueShadow.value = newScaleValue;
      transformImgScale();
    }
  }
};

const init = () => {
  scale.addEventListener('click', editImgScale);
};

const deactivate = () => {
  scale.removeEventListener('click', editImgScale);
  imgUploadPreview.style.transform = '';
};

export { init, deactivate };
