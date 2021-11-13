import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const loaderTemplate = document.querySelector('#messages')
  .content
  .querySelector('.img-upload__message--loading');

// Отрисовывает сообщение, что отправка данных прошла успешно
const showSuccessMessage = () => {
  const successButton = successTemplate.querySelector('.success__button');
  const fragment = document.createDocumentFragment();

  const successMessage = successTemplate.cloneNode(true);
  fragment.appendChild(successMessage);
  document.body.append(fragment);
  document.body.classList.add('modal-open');

  successButton.addEventListener('click', () => {
    successMessage.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessage.remove();
      document.body.classList.remove('modal-open');
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
  const fragment = document.createDocumentFragment();
  const errorMessageElement = errorTemplate.cloneNode(true);
  const errorMessage = errorMessageElement.querySelector('.errorMessage');
  errorMessage.textContent = errorText;
  fragment.appendChild(errorMessageElement);
  document.body.append(fragment);
  document.body.classList.add('modal-open');

  const errorButton = errorTemplate.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    errorMessageElement.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessageElement.remove();
      document.body.classList.remove('modal-open');
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target.className !== 'error__inner') {
      errorMessageElement.remove();
      document.body.classList.remove('modal-open');
    }
  });
};

// Функция отображения лоадера
const showLoader = () => {
  const fragment = document.createDocumentFragment();
  const loaderElement = loaderTemplate.cloneNode(true);
  fragment.appendChild(loaderElement);
  document.body.append(fragment);
  document.body.classList.add('modal-open');

  // возвращаем функцию которая скроет лоадер
  return () => {
    document.body.classList.remove('modal-open');
    loaderElement.remove();
  };
};

export {
  showSuccessMessage,
  showErrorMessage,
  showLoader
};
