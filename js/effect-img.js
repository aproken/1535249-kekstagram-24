// Этот одуль отвечает за добавление / удаления эффекта изображению

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
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const effectsList = imgUploadForm.querySelector('.effects__list');

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

