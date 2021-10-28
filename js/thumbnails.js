// Этот модуль отвечает за отрисовку миниатюр

const pictures = document.querySelector('.pictures');

// Функция-генератор DOM-элемента, соответствующего одной фотографии, и заполния его данными
const createTrumbnailElement = (template, element) => {
  const trumbnailElement = template.cloneNode(true);

  const pictureImg = trumbnailElement.querySelector('.picture__img');
  pictureImg.src = element['url'];

  const pictureComments = trumbnailElement.querySelector('.picture__comments');
  pictureComments.textContent = element['likes'];

  const pictureLikes = trumbnailElement.querySelector('.picture__likes');
  pictureLikes.textContent = element['comments'].length;

  return trumbnailElement;
};

// Функция отрисовки фото-миниатюр на страницу
const renderTrumbnailElements = (elements) => {
  const template = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const fragment = document.createDocumentFragment();

  elements.forEach((item) => {
    fragment.appendChild(createTrumbnailElement(template, item));
  });

  pictures.appendChild(fragment);

  return pictures;
};

export {
  renderTrumbnailElements
};

