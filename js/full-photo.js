// Этот модуль отвечает за отображение окна с полноразмерным изображением

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentCount  = bigPicture.querySelector('.social__comment-count');
const commentsLoader  = bigPicture.querySelector('.comments-loader');

// Функция показа окна с полноразмерным изображением
const showBigPictire = (element) => {
  bigPictureImg.children[0].src = element['url'];
  likesCount.textContent = element['likes'];
  commentsCount.textContent = element['comments'].length;
  socialCaption.textContent = element['description'];
  const userComments = element['comments'];

  socialComments.textContent = '';

  userComments.forEach((item) => {
    const commentListItem = document.createElement('li');
    commentListItem.classList.add('social__comment');

    const userAvatar = document.createElement('img');
    userAvatar.classList.add('social__picture');
    userAvatar.src = item['avatar'];
    userAvatar.alt = item['name'];
    userAvatar.width = '35';
    userAvatar.height = '35';

    const userMassage = document.createElement('p');
    userMassage.classList.add('social__text');
    userMassage.textContent = item['message'];

    socialComments.appendChild(commentListItem);
    commentListItem.appendChild(userAvatar);
    commentListItem.appendChild(userMassage);
  });

  bigPicture.classList.remove('hidden');

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.querySelector('body').classList.add('modal-open');
};

export {
  showBigPictire
};


