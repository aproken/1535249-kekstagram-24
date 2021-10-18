import { createCommetsList } from './create-comment.js';
import { getRandomNumber } from './utils.js';

const rangeQuantityLikes = [15, 200];

// Создание объекта описания фотографии
const createPhotoDescription = (photoId) => {
  const photoUrl = `photos/${photoId}.jpg`;
  const photoDescription = 'Натуральный детокс организма обеспечен вам только от одного просмотра';
  const photoLikes = getRandomNumber(...rangeQuantityLikes);
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