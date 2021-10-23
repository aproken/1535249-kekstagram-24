// Функция отображения фотографий других пользователей
const pictures = document.querySelector('.pictures');

// Генерация элемента photo-поста
const getThumbnailsElement = (template, photo) => {
  const thumbnailsElement = template.cloneNode(true);
  const pictureImg = thumbnailsElement.querySelector('.picture__img');

  pictureImg.src = photo['url'];

  const pictureComments = thumbnailsElement.querySelector('.picture__comments');
  pictureComments.textContent = photo['comments'].length;

  const pictureLikes = thumbnailsElement.querySelector('.picture__likes');
  pictureLikes.textContent = photo['likes'];

  return thumbnailsElement;
};

// Выведение photo-постов на страницу
const renderThumbnails = (photos) => {
  const templateFragment = document.querySelector('#picture').content;
  const template = templateFragment.querySelector('a');
  const fragment = document.createDocumentFragment();

  photos.forEach((item) => {
    fragment.appendChild(getThumbnailsElement(template, item));
  });

  pictures.appendChild(fragment);
};

export { renderThumbnails };
