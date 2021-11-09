//Этот модуль отвечает за форму
import { closeFormDeferred, getCounter, getUniqueArray } from './util.js';

const Heshteg = {
  MIN_SIZE: 2,
  MAX_SIZE: 20,
  QUANTITY: 5,
};

const Scale = {
  STEP: 25,
  DEFAULT_VALUE: 100,
  MIN_VALUE: 25,
  MAX_VALUE: 100,
};

const Effects = {
  'chrome': {
    'className': 'effects__preview--chrome',
    'cssStyle': 'filter: grayscale',
    'step': 0.1,
    'min': 0,
    'max': 1,
    'unit': '',
  },
  'sepia': {
    'className': 'effects__preview--sepia',
    'cssStyle': 'filter: sepia',
    'step': 0.1,
    'min': 0,
    'max': 1,
    'unit': '',
  },
  'marvin': {
    'className': 'effects__preview--marvin',
    'cssStyle': 'filter: invert',
    'step': 1,
    'min': 0,
    'max': 100,
    'unit': '%',
  },
  'phobos': {
    'className': 'effects__preview--phobos',
    'cssStyle': 'filter: blur',
    'step': 0.1,
    'min': 0,
    'max': 3,
    'unit': 'px',
  },
  'heat': {
    'className': 'effects__preview--heat',
    'cssStyle': 'filter: brightness',
    'step': 0.1,
    'min': 1,
    'max': 3,
    'unit': '',
  },
};

const imgUploadForm = document.querySelector('#upload-select-image');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const uploadCancel = imgUploadForm.querySelector('#upload-cancel');
const scale = imgUploadForm.querySelector('.scale');
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const scaleValueShadow = imgUploadForm.querySelector('#scale_value');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const effectsList = imgUploadForm.querySelector('.effects__list');

// Функция показа окна редактирования изображения
const showImgUploadForm = () => {
  uploadFile.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
  });
};

const resetFileUpload = () => uploadFile.value = '';

const transformImgScale = () => imgUploadPreview.style = `transform: scale(${parseInt(scaleControlValue.value, 10) / 100})`;

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

scale.addEventListener('click', editImgScale);

// Функция отрисовки изображения применения эффекта
const renderImgWithEffect = (effect, level) => {
  imgUploadPreview.style = `${effect.cssStyle}( ${level}${effect.unit} )`;
};

// Функция превращения div в слайдер
const turnSlider = (effectType) => {
  const currentEffect = Effects[effectType];

  const options = {
    start: [currentEffect.max],
    range: {
      'min': [0],
      'max': [currentEffect.max],
    },
    step: currentEffect.step,
    connect: 'lower',
  };

  const updateHandler = (value, handle, unencoded) => {
    const level = unencoded[handle];
    effectLevelValue.value = `${level}${currentEffect.unit}`;
    renderImgWithEffect(currentEffect, level);
  };

  // Проверяю, инициализирована у элемента библиотека noUiSlider
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.updateOptions(options);
    effectLevelSlider.noUiSlider.off('update');
    effectLevelSlider.noUiSlider.on('update', updateHandler);

  } else {
    noUiSlider.create(effectLevelSlider, options);
    // Сохранить значение уровня примененного эффекта
    effectLevelSlider.noUiSlider.on('update', updateHandler);
  }
};

// Функция скрывания слайдера
const hideSlider = () => {
  effectLevelSlider.noUiSlider.destroy();
  imgUploadPreview.style = '';
  effectLevelValue.value = '';
};

// Функция - добавить изображению CSS-класс, соответствующий эффекту
const onEffectChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const effectType = evt.target.value;
    if (effectType === 'none') {
      hideSlider();
      imgUploadPreview.className = '';
    }

    if (effectType in Effects) {
      turnSlider(effectType);
      imgUploadPreview.className = '';
      imgUploadPreview.classList.add(Effects[effectType].className);
    }
  }
};

effectsList.addEventListener('change', onEffectChange);

// Закрытие окна редактирования изображения
closeFormDeferred(imgUploadOverlay, uploadCancel, resetFileUpload);

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
