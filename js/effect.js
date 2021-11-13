// Этот модуль отвечает за добавление / удаления эффекта изображению
import { showSlider , hideSlider } from './slider.js';

const Effects = {
  'none': {
    'className': 'effects__preview--none',
    'setFilter': () => '',
    'step': 0,
    'min': 0,
    'max': 0,
  },
  'chrome': {
    'className': 'effects__preview--chrome',
    'setFilter': (value) => `grayscale(${value})`,
    'step': 0.1,
    'min': 0,
    'max': 1,
  },
  'sepia': {
    'className': 'effects__preview--sepia',
    'setFilter': (value) => `sepia(${value})`,
    'step': 0.1,
    'min': 0,
    'max': 1,
  },
  'marvin': {
    'className': 'effects__preview--marvin',
    'setFilter': (value) => `invert(${value}%)`,
    'step': 1,
    'min': 0,
    'max': 100,
  },
  'phobos': {
    'className': 'effects__preview--phobos',
    'setFilter': (value) => `blur(${value}px)`,
    'step': 0.1,
    'min': 0,
    'max': 3,
  },
  'heat': {
    'className': 'effects__preview--heat',
    'setFilter': (value) => `brightness(${value})`,
    'step': 0.1,
    'min': 1,
    'max': 3,
  },
};

const imgUploadForm = document.querySelector('#upload-select-image');
const defaultEffect = imgUploadForm.querySelector('#effect-none');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const effectsList = imgUploadForm.querySelector('.effects__list');

let currentEffectName = 'none';

// Устанавливает для изображения необходимый класс
const setPictureClass = (effectName) => {
  imgUploadPreview.className = Effects[effectName].className;
};

// Применяет изображению выбранный эффект
const setPictureEffect = (effectName) => {
  const currentEffect = Effects[effectName];
  imgUploadPreview.style.filter = currentEffect.setFilter(effectLevelValue.value);
};

// Обработчик события выбора эффекта
const onEffectListChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const selectedEffect = evt.target;
    currentEffectName = selectedEffect.value;
    const currentEffect = Effects[currentEffectName];

    if (selectedEffect === defaultEffect) {
      hideSlider();
    } else {
      showSlider(currentEffect['min'], currentEffect['max'], currentEffect['step']);
    }

    setPictureClass(currentEffectName);
    setPictureEffect(currentEffectName);
  }
};

// Обработчик события выбора глубины эффекта
const onEffectValueChange = () => {
  setPictureClass(currentEffectName);
  setPictureEffect(currentEffectName);
};

// Иницирует модуль работы с эффектами
const init = () => {
  //Устанавливает дефолтные значения выбора эффекта
  defaultEffect.checked = true;
  setPictureClass(defaultEffect.value);
  setPictureEffect(defaultEffect.value);

  effectsList.addEventListener('change', onEffectListChange);
  effectLevelValue.addEventListener('change', onEffectValueChange);
};

// Выключает модуль работы с эффектами
const off = () => {
  effectsList.removeEventListener('change', onEffectListChange);
  effectLevelValue.removeEventListener('change', onEffectValueChange);
  hideSlider();
};

export { init, off };
