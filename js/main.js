import { getData } from './api.js';
import { showErrorMessage } from './notifications.js';

import {
  renderThumbnailElements,
  reactThumbnailClick
} from './thumbnails.js';

import { setListenerUploadImg } from './upload.js';

const onSuccess = (photos) => {
  renderThumbnailElements(photos),
  reactThumbnailClick(photos),
  setListenerUploadImg();
};

getData(onSuccess, showErrorMessage);

