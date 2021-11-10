// Этот модуль отвечает за закрытие модального окна
import { isEscapeKey } from './util.js';

// Функция закрытия окна
const closeFormDeferred = (form, buttonClose, afterCallback) => {
  let handlerOnEscape;
  let handlerOnCancel;

  const closeModalForm = () => {
    form.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', handlerOnEscape);
    buttonClose.removeEventListener('click', handlerOnCancel);
  };

  handlerOnEscape = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModalForm();
    }
  };

  handlerOnCancel = () => {
    closeModalForm();
  };

  document.addEventListener('keydown', handlerOnEscape);
  buttonClose.addEventListener('click', handlerOnCancel);

  if (afterCallback) {
    afterCallback();
  }

  return closeModalForm;
};

export { closeFormDeferred };
