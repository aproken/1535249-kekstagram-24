import { getData } from './api.js';

import {
  renderThumbnailElements,
  reactThumbnailClick
} from './thumbnails.js';

import { showImgUploadForm } from './form.js';


getData(
  (photos) => {
    renderThumbnailElements(photos),
    reactThumbnailClick(photos),
    showImgUploadForm();
  },
);

