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
  const errorMessageTemplate = errorTemplate.cloneNode(true);
  const errorMessage = errorMessageTemplate.querySelector('.errorMessage');
  errorMessage.textContent = errorText;
  fragment.appendChild(errorMessageTemplate);
  document.body.append(fragment);
  document.body.classList.add('modal-open');

  const errorButton = errorTemplate.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    errorMessageTemplate.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessageTemplate.remove();
      document.body.classList.remove('modal-open');
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target.className !== 'error__inner') {
      errorMessageTemplate.remove();
      document.body.classList.remove('modal-open');
    }
  });
};

// Функция отображения лоадера
const showLoader = () => {
  const fragment = document.createDocumentFragment();
  const loader = loaderTemplate.cloneNode(true);
  fragment.appendChild(loader);
  document.body.append(fragment);
  document.body.classList.add('modal-open');

  // возвращаем функцию которая скроет лоадер
  return () => {
    document.body.classList.remove('modal-open');
    loader.remove();
  };
};

export {
  showSuccessMessage,
  showErrorMessage,
  showLoader
};
