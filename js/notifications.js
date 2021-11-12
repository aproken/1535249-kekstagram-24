import { isEscapeKey } from './util.js';

// Отрисовывает сообщение, что отправка данных прошла успешно
const showSuccessMessage = () => {
  const template = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successButton = template.querySelector('.success__button');
  const fragment = document.createDocumentFragment();

  const successMessage = template.cloneNode(true);
  fragment.appendChild(successMessage);
  document.querySelector('body').append(fragment);
  document.querySelector('body').classList.add('modal-open');

  successButton.addEventListener('click', () => {
    successMessage.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessage.remove();
      document.querySelector('body').classList.remove('modal-open');
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target.className !== 'error__inner') {
      successMessage.remove();
      document.querySelector('body').classList.remove('modal-open');
    }
  });
};

// Отрисовывает сообщение ошибки
const showErrorMessage = (errorText) => {
  const template = document.querySelector('#error')
    .content
    .querySelector('.error');
  const fragment = document.createDocumentFragment();
  const errorMessageElement = template.cloneNode(true);
  const errorMessage = errorMessageElement.querySelector('.errorMessage');
  errorMessage.textContent = errorText;
  fragment.appendChild(errorMessageElement);
  document.querySelector('body').append(fragment);
  document.querySelector('body').classList.add('modal-open');

  const errorButton = template.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    errorMessageElement.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessageElement.remove();
      document.querySelector('body').classList.remove('modal-open');
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target.className !== 'error__inner') {
      errorMessageElement.remove();
      document.querySelector('body').classList.remove('modal-open');
    }
  });
};


export {
  showSuccessMessage,
  showErrorMessage
};
