const imgUploadForm = document.querySelector('#upload-select-image');
const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');

// Показать слайдер
const showSlider = (minValue, maxValue, step) => {
  const options = {
    start: maxValue,
    step: step,
    range: {
      'min': minValue,
      'max': maxValue,
    },
    connect: 'lower',
  };

  const updateHandler = (value, handle, unencoded) => {
    const level = unencoded[handle];
    effectLevelValue.value = level;

    // Поднимает событие для синхронизации с изменениями эффектов
    effectLevelValue.dispatchEvent(new Event('change'));
  };

  // Проверяет, иницирована ли была библиотека noUiSlider
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.updateOptions(options);
  } else {
    // Превращает div в слайдер
    noUiSlider.create(effectLevelSlider, options);
    // Сохраняет значение уровня интенсивности эффекта
    effectLevelSlider.noUiSlider.on('update', updateHandler);
  }

  // Выставляет значение уровня интенсивности эффекта в maxValue
  effectLevelValue.value = maxValue;
};

// Скрывает слайдер
const hideSlider = () => {
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }
};

export { showSlider , hideSlider };
