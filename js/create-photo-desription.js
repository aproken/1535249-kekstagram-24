import { createCommetsList } from './create-comment.js';
import { getRandomNumber } from './utils.js';

// Создание объекта описания фотографии
const createPhotoDescription = function (photoId) {
  const photoUrl = `photos/${photoId}.jpg`;
  const photoDescription = 'Натуральный детокс организма обеспечен вам только от одного просмотра';
  const photoLikes = getRandomNumber(15, 200);
  const photoComments = createCommetsList();

  return {
    id: photoId,
    url: photoUrl,
    description: photoDescription,
    likes: photoLikes,
    comments: photoComments,
  };
};

export { createPhotoDescription };