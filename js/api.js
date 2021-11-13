import { showLoader } from './notifications.js';

const Url = {
  GET: 'https://24.javascript.pages.academy/kekstagram/data',
  POST: 'https://24.javascript.pages.academy/kekstagram',
};

const ERROR_MESSAGE = 'Не удалось получить изображения';
const ERROR_SUBMIT_MESSAGE = 'Не удалось отправить форму. Попробуйте ещё раз';

const getData = (onSuccess, onFail) => {
  const hideLoader = showLoader();
  fetch(Url.GET)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail(ERROR_MESSAGE);
    })
    .finally( () => hideLoader() );
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    Url.POST,
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(ERROR_SUBMIT_MESSAGE);
      }
    })
    .catch(() => {
      onFail(ERROR_SUBMIT_MESSAGE);
    });
};

export {getData, sendData};
