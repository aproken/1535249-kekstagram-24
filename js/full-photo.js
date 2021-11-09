// Этот модуль отвечает за отображение окна с полноразмерным изображением

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentCount  = bigPicture.querySelector('.social__comment-count');
const commentsLoader  = bigPicture.querySelector('.comments-loader');

// Функция отрисовки одного комментария
const renderCommentsItem = (comment) => {
  const commentListItem = document.createElement('li');
  commentListItem.classList.add('social__comment');

  const userAvatar = document.createElement('img');
  userAvatar.classList.add('social__picture');
  userAvatar.src = comment['avatar'];
  userAvatar.alt = comment['name'];
  userAvatar.width = '35';
  userAvatar.height = '35';

  const userMassage = document.createElement('p');
  userMassage.classList.add('social__text');
  userMassage.textContent = comment['message'];

  socialComments.appendChild(commentListItem);
  commentListItem.appendChild(userAvatar);
  commentListItem.appendChild(userMassage);
};

// Функция отрисовки комментариев по экранам
const renderUserComments = (comments) => {
  const COUNT_COMMENTS_ON_SCREEN = 5;
  let countScreens = 0;

  const renderCommentsNextScreen = () => {
    const countCommentFrom = countScreens * COUNT_COMMENTS_ON_SCREEN;
    const countCommentTo = COUNT_COMMENTS_ON_SCREEN + (COUNT_COMMENTS_ON_SCREEN * countScreens);

    const commentsNextScreen = comments.slice(countCommentFrom, countCommentTo);

    commentsNextScreen.forEach(renderCommentsItem);
    countScreens += 1;

    socialCommentCount.textContent = '';
    const socialCommentNewCount = document.createElement('span');
    socialCommentNewCount.classList.add('comments-count');
    socialCommentNewCount.textContent = `${countCommentFrom + commentsNextScreen.length} из ${comments.length}`;
    socialCommentCount.appendChild(socialCommentNewCount);

    if (comments.length === countCommentFrom + commentsNextScreen.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
      commentsLoader.addEventListener('click', renderCommentsNextScreen);
    }
  };

  renderCommentsNextScreen();

  commentsLoader.addEventListener('click', renderCommentsNextScreen);
};

// Функция показа окна с полноразмерным изображением
const showBigPictire = (element) => {
  bigPictureImg.children[0].src = element['url'];
  likesCount.textContent = element['likes'];
  commentsCount.textContent = element['comments'].length;
  socialCaption.textContent = element['description'];
  const userComments = element['comments'];

  socialComments.textContent = '';

  renderUserComments(userComments);

  bigPicture.classList.remove('hidden');

  document.querySelector('body').classList.add('modal-open');
};

export {
  showBigPictire
};


