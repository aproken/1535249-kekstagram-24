const GET_DATA_URL = 'https://24.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://24.javascript.pages.academy/kekstagram';

const ERROR_MESSAGE = 'Не удалось получить изображения';
const ERROR_SUBMIT_MESSAGE = 'Не удалось отправить форму. Попробуйте ещё раз';

const getData = (onSuccess, onFail) => {
  // TODO показать экран загрузки изображения
  fetch(GET_DATA_URL)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail(ERROR_MESSAGE);
    });

};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_URL,
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
